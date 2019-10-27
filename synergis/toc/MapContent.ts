import MapView from "esri/views/MapView";
import Layer from 'esri/layers/Layer';
import GroupLayer from 'esri/layers/GroupLayer';

import { LayoutTree } from "../layout/LayoutTree";
import { ITreeDataProvider } from "../vectortile/dataprovider/ITreeDataProvider";
import { VectorTileAnalysisApp } from "../vectortile/VectorTileAnalysisApp";
import { IPaintType } from "../vectortile/overlay/IPaintType";
import { IconConstants } from "../layout/IconConstants";
import { ITreeData } from "../vectortile/data/ITreeData";
import { TreeDataProviderImplMapLayer } from "../vectortile/dataprovider/TreeDataProviderImplMapLayer";
import { IPaint } from "../vectortile/overlay/IPaint";
import { IPaintSet } from "../vectortile/overlay/IPaintSet";
import { PaintSetImpl } from "../vectortile/overlay/PaintSetImpl";
import { ILayerSet } from "../layer/ILayerSet";
import { IValueFilter } from "../vectortile/data/IValueFilter";


export class MapContent {

    readonly view: MapView;
    readonly mapContentTree: LayoutTree;
    readonly treeDataProviders: ITreeDataProvider[];

    constructor(view: MapView, mapContentTree: LayoutTree) {

        this.view = view;
        this.mapContentTree = mapContentTree;
        this.treeDataProviders = [];

        let layerSets: ILayerSet[] = VectorTileAnalysisApp.layerSets;
        for (let i=layerSets.length-1; i>=0; i--) {
            this.treeDataProviders.push(layerSets[i]);
        }
        VectorTileAnalysisApp.view.map.layers.forEach(layer => {
            if (!(layer instanceof GroupLayer)) {
                let layerDataItem = new TreeDataProviderImplMapLayer(layer);
                this.treeDataProviders.push(layerDataItem);
            }
        });

    }

    replaceData(): void {
        let treeDataList: ITreeData[] = [];
        this.treeDataProviders.forEach(treeDataProvider => {
            treeDataList.push(treeDataProvider.getTreeData());
        });
        this.mapContentTree.replaceData(treeDataList);
    }

    /**
     * get an svg-fragment for the given visibility
     * @param visible 
     */
    getIconHtml(visible: boolean) {
        if (visible) {
            return IconConstants.ICON_EYE;
        } else {
            return IconConstants.ICON_EYE_SLASH;
        }   
    }

    toggleMapLayerVisibility(iconNode: HTMLDivElement, layerId: string): void {
        let layer: Layer = this.findMapLayer(layerId);
        layer.visible = !layer.visible;
        iconNode.innerHTML = this.getIconHtml(layer.visible);
    }

    toggleLayerSetVisibility(iconNode: HTMLDivElement, layerId: string): void {
        let layerSet: ILayerSet = VectorTileAnalysisApp.findLayerSet(layerId);
        let visible: boolean = layerSet.toggleVisibility();
        iconNode.innerHTML = this.getIconHtml(visible);
    }   

    togglePaintSetVisibility(iconNode: HTMLDivElement, paintSetId: string): void {
        let paintSet: IPaintSet = this.findPaintSet(paintSetId);
        let visible: boolean = paintSet.toggleVisibility();
        iconNode.innerHTML = this.getIconHtml(visible);
    }    
    
    togglePaintVisibility(iconNode: HTMLDivElement, paintId: string): void {
        let paint: IPaint = this.findPaint(paintId);
        let visible: boolean = paint.toggleVisibility();
        iconNode.innerHTML = this.getIconHtml(visible);
    }

    findPaintSet(paintSetId: string): IPaintSet {
        for (let i=0; i<VectorTileAnalysisApp.layerSets.length; i++) {
            let layerSet: ILayerSet = VectorTileAnalysisApp.layerSets[i];
            let paintSet: IPaintSet = layerSet.findPaintSet(paintSetId);
            if (paintSet != null) {
                return paintSet;
            }
        }
        console.warn('failed to find paint-set', paintSetId);
    }

    findPaint(paintId: string): IPaint {
        for (let i=0; i<VectorTileAnalysisApp.layerSets.length; i++) {
            let layerSet: ILayerSet = VectorTileAnalysisApp.layerSets[i];
            let paint: IPaint = layerSet.findPaint(paintId);
            if (paint != null) {
                return paint;
            }
        }
        return null;
    }   

    findMapLayer(layerId: string): Layer {
        return this.view.map.findLayerById(layerId);
    }

    findLayerSet(treeData: ITreeData): ILayerSet {

        //TODO clarify whats happening where (in the selection tree, and or in map content)

        let idsSearched: string[] = [];
        while (treeData != null) {

            idsSearched.push(treeData.getId());

            let layerSet: ILayerSet = VectorTileAnalysisApp.findLayerSet(treeData.getId());
            if (layerSet != null) {
                return layerSet;
            }

            //iterate up the tree
            treeData = VectorTileAnalysisApp.vectorTileSelection.findTreeData(treeData.getParent());

        }
        throw new Error('failed to find tile-boundary-layer-set from tree-data-ids: ' + idsSearched);

    }

    addPaintSet(treeData: ITreeData, paintType: IPaintType): void {

        //find the tile boundary layer set containing the vector-tile-layer that we want to add paints for
        let layerSet: ILayerSet = this.findLayerSet(treeData);
        let paintSet: IPaintSet = new PaintSetImpl(layerSet, treeData, paintType);
        layerSet.addPaintSet(paintSet);

        //replace tree data to ensure consistency of tree (removal is incremental)
        this.replaceData();

    }

    removePaintSet(paintSetId: string): void {

        for (let i=0; i<VectorTileAnalysisApp.layerSets.length; i++) {
            let layerSet: ILayerSet = VectorTileAnalysisApp.layerSets[i];
            let paintSet: IPaintSet = layerSet.findPaintSet(paintSetId);
            if (paintSet != null) {

                let vectorUserLayerId: string = layerSet.getVectorUserLayer().id;
                layerSet.removePaintSet(paintSet.getId());
                if (layerSet.hasPaintSets()) { //some paint sets remaining
                    this.mapContentTree.remove(paintSet.getId());
                } else {
                    this.mapContentTree.remove(vectorUserLayerId); //overlay layer empty -> remove from TOC
                }
                //no full map content update, just removing 
                return;

            }
        }
        console.warn('failed to remove paint set by id', paintSetId);

    }    

    setFilterKey(treeData: ITreeData): void {

        let layerSet: ILayerSet = this.findLayerSet(treeData);
        let valueFilter: IValueFilter = treeData.getValueFilter();
        layerSet.setFilterKey(valueFilter.getSourceLayer(), valueFilter.getKey());
        
        //somewhat brute force, TODO implement in a more explicit way
        VectorTileAnalysisApp.vectorTileSelection.currentTileUrls = [];
        VectorTileAnalysisApp.vectorTileSelection.update(VectorTileAnalysisApp.view, VectorTileAnalysisApp.layerSets);

    }



}