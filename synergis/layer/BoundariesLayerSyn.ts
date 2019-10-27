const promiseUtils =  require('esri/core/promiseUtils');

import FeatureLayer from 'esri/layers/FeatureLayer';
import LayerView from 'esri/views/layers/LayerView';
import VectorTileLayer from 'esri/layers/VectorTileLayer';
import Query from 'esri/tasks/support/Query';
import Graphic from 'esri/Graphic';
import FeatureSet from 'esri/tasks/support/FeatureSet';
import Geometry from 'esri/geometry/Geometry';
import SimpleRenderer from 'esri/renderers/SimpleRenderer';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';

import { TileGraphicFactory } from './TileGraphicFactory';
import { QuadTreeLoader } from '../vectortile/tilemap/QuadTreeLoader';
import { IColoredLayer } from './IColoredLayer';
import { IColor } from '../util/IColor';
import { IQuadTree } from '../vectortile/tilemap/IQuadTree';
import { IQuadKey } from '../vectortile/tilemap/IQuadKey';
import { QuadKeyImpl } from '../vectortile/tilemap/QuadKeyImpl';
import { BOUNDARY_FIELD_PROPS, BOUNDARY_FIELD_OBJECTID, BOUNDARY_FIELD_REF_TILE_LOD, BOUNDARY_FIELD_REF_TILE_ID } from './BoundaryFields';

/**
 * extension to FeatureLayer, attachable to the view of a VectorTileLayer
 * this type will take control of the VectorTileLayer's internal addTile function, thus enabling itself to know which tiles are currently drawn in the map<br>
 * 
 * @author h.fleischer
 * @since 21.09.2019
 * 
 */
export class BoundariesLayerSyn extends FeatureLayer implements IColoredLayer  {

    private readonly parentUid: string;
    private readonly color: IColor;
    private tileGraphicFactory: TileGraphicFactory;
    private quadTree: IQuadTree;
    private maxLod: number; //current lod (max) being displayed for this layer

    private attachedViews: LayerView[];
    private cropKey: IQuadKey;

    constructor(parentUid: string, title: string, color: IColor) {

        //console.log('title', title);

        super({
            title: title,
            visible: true,
            source: [],
            fields: BOUNDARY_FIELD_PROPS,
            objectIdField: BOUNDARY_FIELD_OBJECTID.name,
            spatialReference: {
                wkid: 3857
            },
            geometryType: 'polygon',
            popupEnabled: false,
            renderer: new SimpleRenderer({
                symbol: new SimpleFillSymbol({
                    color: [ 250, 235, 35, 0 ],
                    outline: new SimpleLineSymbol({
                        color: [ color.getRgb()[0] * 255, color.getRgb()[1] * 255, color.getRgb()[2] * 255, 0.1 ],
                        width: 0.1
                    })
                })
            })
        });

        this.parentUid = parentUid;
        this.color = color;

        this.attachedViews = [];

    }

    getTilemap(): IQuadTree {
        return this.quadTree;
    }

    getColor(): IColor {
        return this.color;
    }

    /**
     * query all tiles in this feature layer having a tile-lod less than or equal the current max-lod (tilelod <= maxlod) at the given location<br>
     * from the results a single feature is chosen having the largest lod value in the results
     * 
     * @param geometry 
     */
    queryActiveTile(geometry: Geometry): IPromise<Graphic> {

        let where: string = BOUNDARY_FIELD_REF_TILE_LOD.name + ' <= ' + this.maxLod; // TileBoundaryFieldNames.REF_TILE_ID + ' IN (' + Array.from(this.activeTileIds).map(val => '\'' + val + '\'').join(',') + ')';
        //console.log('where', where);

        this.definitionExpression = where; //with def query it may not even be necessary to apply to query as well (TODO -> verify)

        let query: Query  = this.createQuery();
        query.geometry = geometry;
        query.where = where;

        let _this = this;
        return promiseUtils.create(function(resolve:any, reject:any) {
            _this.queryFeatures(query).then(
                function (results: FeatureSet) {
                    
                    //console.log(results.features, results.features.map(feature => feature.attributes[TileBoundaryFieldNames.REF_TILE_LOD]).join('/'));
                    //it appears that when zooming in, some tiles of larger scale lod's are not discarded right away (maybe an optimization to not have to reload those tile upon zooming back out)
                    //however when zooming out, the smaller scale tiles seem to always be discarded right away
                    //therefore it appears safe to assume that it always is the most detailled active tiles that currently get drawn

                    if (results.features.length > 0) {
                        let maxLodFeature: Graphic = null;
                        for (let i=0; i<results.features.length; i++) {
                            let lod: number  = results.features[i].attributes[BOUNDARY_FIELD_REF_TILE_LOD.name];
                            if (maxLodFeature == null || lod > maxLodFeature.attributes[BOUNDARY_FIELD_REF_TILE_LOD.name]) {
                                maxLodFeature = results.features[i];
                            }
                        }
                        resolve(maxLodFeature);
                    } else {
                        reject('no active feature found');
                    }

                },
                function (failure: any): any {
                    reject(failure);
                }
            )
        });

    }

    handleTileAdd(lod: number, col: number, row: number): void {

        //max lod refers to the original (not corrected) lod -> if there were tiles with that lod, those would display
        this.maxLod = lod;

        //the tile key that is currently added (which may not even exist), and the best match the quad-tree can provide
        let quadKeyQuery: IQuadKey = new QuadKeyImpl(lod, col, row);
        let quadKeyMatch: IQuadKey = this.quadTree.findKey(quadKeyQuery);
        if (quadKeyMatch != null) {
            this.addIfNotPresent(quadKeyMatch);
        }

    }

    addIfNotPresent(quadKey: IQuadKey): void {

        let query: Query  = this.createQuery();
        query.where = BOUNDARY_FIELD_REF_TILE_ID.name + ' = \'' + quadKey.getId() + '\'';
        //console.log('where', query.where);

        let _this = this;
        this.queryFeatureCount(query).then(
            function(count: number) {
                if (count === 0) {
                    let graphic: Graphic = _this.tileGraphicFactory.createGraphic(quadKey, _this.quadTree);
                    let edits = {
                        addFeatures: [
                            graphic
                        ]
                    };
                    _this.applyEdits(edits);
                } 
            },
            function(failure: any) {
                console.log('failed to query for existing features due to ' + failure);
            }
        );

    }

    setCropKey(cropKey: IQuadKey): void {
        this.cropKey = cropKey;
        this.clearAttachedViews();
    }

    clearAttachedViews(): void {
        this.attachedViews.forEach(attachedView => {
            if (attachedView['attached']) {
                // @ts-ignore
                attachedView._tileStrategy.clear();
            } 
        });
    }

    clearCropKey(): void {
        this.clearAttachedViews();
        this.cropKey = null;
    }

    attachToVectorTileLayerView(vectorTileLayerView: LayerView): void {

        let vectorTileLayer = <VectorTileLayer> vectorTileLayerView.layer;
        let _this = this;

        //find loaded lod's (origin, norm, ...)
        if (this.quadTree == null) {
            let quadTreeLoader: QuadTreeLoader = new QuadTreeLoader(vectorTileLayerView);
            quadTreeLoader.load().then(
                function (quadTree: IQuadTree) {
                    _this.quadTree = quadTree;
                }, 
                function (failure: any) {
                    console.log('failed to load quad-tree', failure);
                }
            );
        }

        //boundary factory needs tileServers array which becomes ready at this point
        if (this.tileGraphicFactory == null) {
            this.tileGraphicFactory = new TileGraphicFactory(this.parentUid, vectorTileLayer.url, vectorTileLayer['tileServers']);
        }
        this.attachedViews.push(vectorTileLayerView);

        //kind of a hack, but it needs to be known which tiles are being added to the container so out functionality runs along the standard vectortile api
        let tileContainer: any = vectorTileLayerView['container'];
        let containerAddChild: Function = tileContainer['addChild']; 

        tileContainer['addChild'] = function(tile: any) { 
            
            //while in crop mode, ignore anything but the current crop tile
            if (_this.cropKey != null) {
                if (tile.key.level !== _this.cropKey.getLod() || tile.key.col !== _this.cropKey.getCol() || tile.key.row !== _this.cropKey.getRow()) {
                    return;
                }
            }

            containerAddChild.apply(tileContainer, [tile]); //original call
            _this.handleTileAdd(tile.key.level, tile.key.col, tile.key.row); //injected call

        }

    }

}