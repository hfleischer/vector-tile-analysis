import Geometry from 'esri/geometry/Geometry';
import Graphic from 'esri/Graphic';

import { IColor } from '../util/IColor';
import { Color } from '../util/Color';
import { TreeDataVectorTileLoader } from "../vectortile/dataprovider/TreeDataVectorTileLoader";
import { VectorTileLayerSyn } from './VectorTileLayerSyn';
import { ActiveTileLayerSyn } from "./ActiveTileLayerSyn";
import { BoundariesLayerSyn } from './BoundariesLayerSyn';
import { Extent } from "esri/geometry";
import { IQuadKey } from "../vectortile/tilemap/IQuadKey";
import { VectorTileAnalysisApp } from "../vectortile/VectorTileAnalysisApp";
import { ITreeData } from "../vectortile/data/ITreeData";
import { TreeDataImpl } from "../vectortile/data/TreeDataImpl";
import { DataType } from "../vectortile/data/DataType";
import { IPaint } from "../vectortile/overlay/IPaint";
import { IPaintSet } from "../vectortile/overlay/IPaintSet";
import { ILayerSet } from "./ILayerSet";
import { QuadKeyImpl } from '../vectortile/tilemap/QuadKeyImpl';
import { BOUNDARY_FIELD_REF_TILE_LOD, BOUNDARY_FIELD_REF_TILE_ROW, BOUNDARY_FIELD_REF_TILE_COL } from './BoundaryFields';

/**
 * logical grouping of a vectortile layer with an associated featurelayer<br>
 * the featurelayer is used to hold tile-boundaries and is being populated during map navigation<br>
 * 
 * @author h.fleischer
 * @since 05.10.2019
 * 
 */
export class LayerSetImpl implements ILayerSet  {

    readonly title: string;
    readonly id: string;
    readonly vectorBaseLayer: VectorTileLayerSyn;  
    vectorUserLayer: VectorTileLayerSyn;  
    readonly boundariesLayer: BoundariesLayerSyn;
    readonly activeTileLayer: ActiveTileLayerSyn;
    readonly color: IColor;
    private visible: boolean;
    private crop: boolean;
    private filterKeysByLayerName: Object;

    readonly paintSets: IPaintSet[];

    constructor(vectorTileLayerProps: Object) {

        this.title = vectorTileLayerProps['title'];
        this.id = vectorTileLayerProps['id'];

        this.filterKeysByLayerName = {};
        this.paintSets = [];
        this.color = Color.nextLayerColor();

        vectorTileLayerProps['title'] = this.title + ' (vb)';
        vectorTileLayerProps['id'] = this.id + '_vb'

        //original vector tile layer
        this.vectorBaseLayer = new VectorTileLayerSyn(vectorTileLayerProps, this.color); 

        //thin tile border
        this.boundariesLayer = new BoundariesLayerSyn(this.id, this.title + ' (tb)', this.color); 

        //tile corners
        this.activeTileLayer = new ActiveTileLayerSyn(this.title + ' (tm)', this.color);

        this.visible = vectorTileLayerProps['visible'];

        this.crop = false;

    }

    isCrop(): boolean {
        return this.crop;
    }

    toggleCrop(): boolean {

        this.crop = !this.crop;
        if (this.crop) {

            this.getBoundariesLayer().queryActiveTile(VectorTileAnalysisApp.view.center).then(activeTile => {
                let lod: number = activeTile.getAttribute(BOUNDARY_FIELD_REF_TILE_LOD.name);
                let col: number = activeTile.getAttribute(BOUNDARY_FIELD_REF_TILE_COL.name);
                let row: number = activeTile.getAttribute(BOUNDARY_FIELD_REF_TILE_ROW.name);
                let cropKey: IQuadKey = new QuadKeyImpl(lod, col, row);
                this.getBoundariesLayer().setCropKey(cropKey);
            });

        } else {
            this.getBoundariesLayer().clearCropKey();
        }
        return this.crop;

    }

    setFilterKey(layerName: string, filterKey: string): void {
        this.filterKeysByLayerName[layerName] = filterKey;
    }

    hasPaintSets(): boolean {
        return this.paintSets.length > 0;
    }

    getActiveTileLayer(): ActiveTileLayerSyn {
        return this.activeTileLayer;
    }

    getVectorUserLayer(): VectorTileLayerSyn {
        return this.vectorUserLayer;
    }

    getVectorBaseLayer(): VectorTileLayerSyn {
        return this.vectorBaseLayer;
    }

    getBoundariesLayer(): BoundariesLayerSyn {
        return this.boundariesLayer;
    }

    getId(): string {
        return this.id;
    }

    /**
     * get the tree data of this item<br>
     * this may include user-overlay, if present
     * boundaries and borders are not included, these are always on, unless the entire layer-set is turned off completely
     */
    getTreeData(): ITreeData {
        let treeData: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX_______LAYER_SET), this.id, this.title, -1, Color.mapContentIconNode(), this.vectorBaseLayer.fullExtent, null);
        if (this.vectorUserLayer != null) {
            let treeDataVectorUser = new TreeDataImpl(DataType.get(DataType.INDEX______MAP__LAYER), this.vectorUserLayer.id, this.vectorUserLayer.title, -1, Color.mapContentIconNode(), this.vectorUserLayer.fullExtent, null);
            treeData.addChild(treeDataVectorUser);
            this.paintSets.forEach(paintSet => treeDataVectorUser.addChild(paintSet.getTreeData()));
        }
        let treeDataVectorBase: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX______MAP__LAYER), this.vectorBaseLayer.id, this.vectorBaseLayer.title, -1, Color.mapContentIconNode(), this.vectorBaseLayer.fullExtent, null);
        treeData.addChild(treeDataVectorBase);
        return treeData;
    }    

    findPaintSet(paintSetId: string): IPaintSet {
        for (let i=0; i<this.paintSets.length; i++) {
            let paintSet: IPaintSet = this.paintSets[i];
            if (paintSet.getId() === paintSetId) {
                return paintSet;
            }
        }
        return null;
    }

    findPaint(paintId: string): IPaint {
        for (let i=0; i<this.paintSets.length; i++) {
            let paintSet: IPaintSet = this.paintSets[i];
            let paint: IPaint = paintSet.findPaint(paintId);
            if (paint != null) {
                return paint;
            }
        }
        return null;
    }

    removePaintSet(paintSetId: string): void {
        let paintSet: IPaintSet = this.findPaintSet(paintSetId);
        if (paintSet != null) {
            let paintSetIndex: number = this.paintSets.indexOf(paintSet);
            this.paintSets.splice(paintSetIndex, 1);
            this.updateVectorUserLayer();
        }
    }

    addPaintSet(paintSet: IPaintSet): void {
        this.paintSets.push(paintSet);
        this.updateVectorUserLayer();
    }

    updateVectorUserLayer(): void {

        if (this.vectorUserLayer != null) {
            VectorTileAnalysisApp.vectorUserLayers.remove(this.vectorUserLayer);
            this.vectorUserLayer = null;
        }

        //if there are remaining paintsets, re-create the layer
        if (this.paintSets.length > 0) {

            //collect all active style layers
            let styleLayers: Object[] = [];
            for (let i=0; i<this.paintSets.length; i++) {
                let _styleLayers: Object[] = this.paintSets[i].getStyleLayers();
                _styleLayers.forEach(_styleLayer => styleLayers.push(_styleLayer));
            }

            //TODO collect paints by type, then add polygons / polylines / points

            //build a full layerDefinition
            let layerDefinition = {
                id: this.id + '_vu',
                title: this.title + ' (user overlays)',
                style: {
                    layers: styleLayers,
                    sources: {
                        syn: {
                            url: this.vectorBaseLayer['serviceUrl'], 
                            type: 'vector'
                        }
                    }                  
                },
            };
            
            //console.log('layerDefinition', JSON.stringify(layerDefinition));

            this.vectorUserLayer = new VectorTileLayerSyn(layerDefinition, this.color);
            VectorTileAnalysisApp.vectorUserLayers.add(this.vectorUserLayer);

            //lets listen to the user layer's tiles as well
            let _this = this;
            VectorTileAnalysisApp.view.whenLayerView(this.vectorUserLayer).then(layerView => {
                //console.log('layerView', layerView);
                _this.boundariesLayer.attachToVectorTileLayerView(layerView);
            });

        }

    }

    isVisible(): boolean {
        return this.visible;
    }

    toggleVisibility(): boolean {
        this.visible = !this.visible;
        this.vectorBaseLayer.visible = this.visible;
        if (this.vectorUserLayer != null) {
            this.vectorUserLayer.visible = this.visible;
        }
        this.boundariesLayer.visible = this.visible;
        this.activeTileLayer.visible = this.visible;
        return this.visible;
    }

    createTileLoader(tileUrl: string, tileKey: IQuadKey, extent: Extent): TreeDataVectorTileLoader {
        return new TreeDataVectorTileLoader(tileUrl, this.title, this.id, tileKey, this.color, extent, this.filterKeysByLayerName);
    }

    queryActiveTile(geometry: Geometry): IPromise<Graphic> {
        return this.boundariesLayer.queryActiveTile(geometry);
    }

}