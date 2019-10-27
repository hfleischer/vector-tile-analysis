import MapView from 'esri/views/MapView';
import Graphic from 'esri/Graphic';
import { Extent } from 'esri/geometry';
const promiseUtils =  require('esri/core/promiseUtils');

import { TreeDataVectorTileLoader } from "../dataprovider/TreeDataVectorTileLoader";
import { VectorTileAnalysisApp } from '../VectorTileAnalysisApp';
import { ITreeData } from '../data/ITreeData';
import { ITreeDataProvider } from '../dataprovider/ITreeDataProvider';
import { LayoutChart } from '../../layout/LayoutChart';
import { LayoutTree } from '../../layout/LayoutTree';
import { BOUNDARY_FIELD_REF_TILE_URL, BOUNDARY_FIELD_REF_LAYER_ID, BOUNDARY_FIELD_REF_TILE_LOD, BOUNDARY_FIELD_REF_TILE_ROW, BOUNDARY_FIELD_REF_TILE_COL } from '../../layer/BoundaryFields';
import { TreeDataImpl } from '../data/TreeDataImpl';
import { DataType } from '../data/DataType';
import { Uid } from '../../util/Uid';
import { Color } from '../../util/Color';
import { IQuadKey } from '../tilemap/IQuadKey';
import { QuadKeyImpl } from '../tilemap/QuadKeyImpl';
import { ILayerSet } from '../../layer/ILayerSet';


export class VectorTileSelection {

    private readonly layoutTree: LayoutTree;
    private readonly layoutChart: LayoutChart;

    /**
     * the currently selected tile-url's, needed to compare to selections being made during navigation (to avoid reloading when the set of active tiles remains unchanged)
     */
    currentTileUrls: string[];
    private currentTreeData: ITreeData[];

    constructor(layoutTree: LayoutTree, layoutChart: LayoutChart) {

        this.layoutTree = layoutTree;
        this.layoutChart = layoutChart;

        this.currentTileUrls = [];
        this.currentTreeData = [];

        //link tile-selection-chart and tile-selection-tree to each other
        let _this = this;
        this.layoutTree.itemSelectCallback = function(itemId: string) {
            _this.layoutChart.focusItem(itemId);
            _this.focusItem(itemId);
        }
        this.layoutChart.itemSelectCallback = function(itemId: string) {
            _this.layoutTree.focusItem(itemId);
            _this.focusItem(itemId);
        }    

    }

    focusItem(itemId: string):void {
        
        let treeData: ITreeData = VectorTileAnalysisApp.vectorTileSelection.findTreeData(itemId);
        let treeDataExtent: Extent = treeData.getExtent();
        if (treeDataExtent != null) {
            let expandableExtent: Extent = new Extent({
                xmin: treeDataExtent.xmin,
                ymin: treeDataExtent.ymin,
                xmax: treeDataExtent.xmax,
                ymax: treeDataExtent.ymax,
                spatialReference: treeDataExtent.spatialReference
            }).expand(1.2);
            VectorTileAnalysisApp.view.goTo(expandableExtent, {
                duration: 1000
            });
        }
        
    }    

    /**
     * query all tile layers for their active (currently displayed tile)
     * single result is IPromise<Graphic> TODO extend Grahic and add some source-layer to it
     * 
     * @param view 
     * @param tileBoundaryLayers 
     */
    queryActiveTiles(view: MapView, layerSets: ILayerSet[]): IPromise<any> {
        return  promiseUtils.eachAlways(layerSets.map(layerSet => layerSet.queryActiveTile(view.center)));
    }

    findTreeData(itemId: string) {
        for (let i=0; i<this.currentTreeData.length; i++) {
            let recursiveTreeData: ITreeData[] = this.currentTreeData[i].getChildrenRecursive();
            for (let j=0; j<recursiveTreeData.length; j++) {
                if (recursiveTreeData[j].getId() === itemId) {
                    return recursiveTreeData[j];
                }
            }
        }
        return null;
    }

    getLoadableTiles(subPromises: any): IPromise<any> {

        let activeTiles: Graphic[] = [];
        subPromises.forEach((subPromise: { value: Graphic }) => {
            if (subPromise.value) {
                activeTiles.push(subPromise.value);
            }
            //TODO handle error
        });

        //from tile-url judge if a reload is required
        let reloadRequired: boolean = false;
        let pendingTileUrls: string[] = activeTiles.map(activeTile => activeTile.attributes[BOUNDARY_FIELD_REF_TILE_URL.name]);
        if (pendingTileUrls.length == this.currentTileUrls.length) { 
            for (let i=0; i<pendingTileUrls.length; i++) { 
                if (pendingTileUrls[i] !== this.currentTileUrls[i]) {
                    reloadRequired = true;
                }
            }
        } else {
            reloadRequired = true;
        }
        this.currentTileUrls = pendingTileUrls;
        
        if (reloadRequired) {

            let tileLoaders: TreeDataVectorTileLoader[] = [];
            for (let i=0; i<activeTiles.length; i++) {

                let layerId: string = activeTiles[i].attributes[BOUNDARY_FIELD_REF_LAYER_ID.name];
                let tileUrl: string = activeTiles[i].attributes[BOUNDARY_FIELD_REF_TILE_URL.name];

                //build a tileKey from the graohic attributes
                let tileLod: number = activeTiles[i].attributes[BOUNDARY_FIELD_REF_TILE_LOD.name];
                let tileCol: number = activeTiles[i].attributes[BOUNDARY_FIELD_REF_TILE_COL.name];
                let tileRow: number = activeTiles[i].attributes[BOUNDARY_FIELD_REF_TILE_ROW.name];
                let tileKey: IQuadKey = new QuadKeyImpl(tileLod, tileCol, tileRow);

                //load tile to be displayed in tree and chart and set active marker locations
                let layerSet: ILayerSet = VectorTileAnalysisApp.findLayerSet(layerId);

                //console.log('activeTiles[i].geometry.extent', activeTiles[i].geometry.extent);
                tileLoaders.push(layerSet.createTileLoader(tileUrl, tileKey, activeTiles[i].geometry.extent));
                layerSet.getActiveTileLayer().setTile(activeTiles[i]); 

            }       
            return promiseUtils.eachAlways(tileLoaders.map(tileLoader => tileLoader.load()));
            
        } else {
            return promiseUtils.eachAlways([]);
        }

    }

    /**
     * receives the loaded TreeDataProviderImplVectorTile instances<br>
     * TODO these instances are the ones that should be kept internally
     * when resorting, or even more generally, when fetching the tree data, the respective filter keys could be applie
     * if that works the filter key would not have to be passes around while loading
     * @param subPromises 
     */
    getTreeDataItems(subPromises: any): IPromise<ITreeData[]> {

        let dataItemsVectortile: ITreeDataProvider[] = [];
        subPromises.forEach((subPromise: { value: ITreeDataProvider; error: any}) => {
            if (subPromise.value) {
                dataItemsVectortile.push(subPromise.value);
            } else if (subPromise.error) {
                console.log('subPromise.error', subPromise.error);
            }
        });

        let treeDataItems: ITreeData[] = [];
        dataItemsVectortile.forEach(dataItemVectortile => {
            treeDataItems.push(dataItemVectortile.getTreeData());
        });

        return promiseUtils.create(function(resolve:any, reject:any) {
            resolve(treeDataItems);
        });

    }

    clearTreeeData(): void {

        let emptyData: ITreeData[] = [
            new TreeDataImpl(DataType.get(DataType.INDEX_________UNKNOWN), Uid.random16(), 'no active tiles found', -1, Color.parseHex('#457786'), null, null)
        ];
        //apply the evaluated active tiles to tree / chart / and this instance
        this.layoutTree.replaceData(emptyData);
        this.layoutChart.replaceData(emptyData);
        this.currentTreeData = emptyData;         
        this.currentTileUrls = [];

    }


    update(view: MapView, layerSets: ILayerSet[]): void {

        let _this = this;

        let reversedLayerSets: ILayerSet[] = [];
        for (let i=layerSets.length-1; i>=0; i--) {
            if (layerSets[i].isVisible()) {
                reversedLayerSets.push(layerSets[i])
            }
        };

        //see what is currently displayed
        this.queryActiveTiles(view, reversedLayerSets).then(subPromises => {

            if (subPromises.length == 0) {

                this.clearTreeeData();

            } else {

                //load if anything needs to be loaded
                _this.getLoadableTiles(subPromises).then(subPromises => {

                    if (subPromises.length > 0) {

                        //convert loaded tiles to displayable tree items
                        _this.getTreeDataItems(subPromises).then(treeData => {
    
                            if (treeData.length > 0) { //empty array need to reflect as well
                                //apply the evaluated active tiles to tree / chart / and this instance
                                //console.log('treeData', treeData);
                                this.layoutTree.replaceData(treeData);
                                this.layoutChart.replaceData(treeData);
                                this.currentTreeData = treeData;
                            }
    
                        }).catch(ex => {
                            console.log('failed to update tree-data-items due to', ex)
                        });

                    } else {
                        //skipping conversion to tree data items due to empty result
                    }

                }).catch(ex => {
                    console.log('failed to handle loadable tiles due to', ex)
                });                

            }

        }).catch(ex => {
            console.log('failed to handle active tiles due to', ex)
        });

    } 

}