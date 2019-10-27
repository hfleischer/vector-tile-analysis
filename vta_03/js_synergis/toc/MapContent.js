var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/layers/GroupLayer", "../vectortile/VectorTileAnalysisApp", "../layout/IconConstants", "../vectortile/dataprovider/TreeDataProviderImplMapLayer", "../vectortile/overlay/PaintSetImpl"], function (require, exports, GroupLayer_1, VectorTileAnalysisApp_1, IconConstants_1, TreeDataProviderImplMapLayer_1, PaintSetImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GroupLayer_1 = __importDefault(GroupLayer_1);
    var MapContent = /** @class */ (function () {
        function MapContent(view, mapContentTree) {
            var _this = this;
            this.view = view;
            this.mapContentTree = mapContentTree;
            this.treeDataProviders = [];
            var layerSets = VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets;
            for (var i = layerSets.length - 1; i >= 0; i--) {
                this.treeDataProviders.push(layerSets[i]);
            }
            VectorTileAnalysisApp_1.VectorTileAnalysisApp.view.map.layers.forEach(function (layer) {
                if (!(layer instanceof GroupLayer_1.default)) {
                    var layerDataItem = new TreeDataProviderImplMapLayer_1.TreeDataProviderImplMapLayer(layer);
                    _this.treeDataProviders.push(layerDataItem);
                }
            });
        }
        MapContent.prototype.replaceData = function () {
            var treeDataList = [];
            this.treeDataProviders.forEach(function (treeDataProvider) {
                treeDataList.push(treeDataProvider.getTreeData());
            });
            this.mapContentTree.replaceData(treeDataList);
        };
        /**
         * get an svg-fragment for the given visibility
         * @param visible
         */
        MapContent.prototype.getIconHtml = function (visible) {
            if (visible) {
                return IconConstants_1.IconConstants.ICON_EYE;
            }
            else {
                return IconConstants_1.IconConstants.ICON_EYE_SLASH;
            }
        };
        MapContent.prototype.toggleMapLayerVisibility = function (iconNode, layerId) {
            var layer = this.findMapLayer(layerId);
            layer.visible = !layer.visible;
            iconNode.innerHTML = this.getIconHtml(layer.visible);
        };
        MapContent.prototype.toggleLayerSetVisibility = function (iconNode, layerId) {
            var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.findLayerSet(layerId);
            var visible = layerSet.toggleVisibility();
            iconNode.innerHTML = this.getIconHtml(visible);
        };
        MapContent.prototype.togglePaintSetVisibility = function (iconNode, paintSetId) {
            var paintSet = this.findPaintSet(paintSetId);
            var visible = paintSet.toggleVisibility();
            iconNode.innerHTML = this.getIconHtml(visible);
        };
        MapContent.prototype.togglePaintVisibility = function (iconNode, paintId) {
            var paint = this.findPaint(paintId);
            var visible = paint.toggleVisibility();
            iconNode.innerHTML = this.getIconHtml(visible);
        };
        MapContent.prototype.findPaintSet = function (paintSetId) {
            for (var i = 0; i < VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets.length; i++) {
                var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets[i];
                var paintSet = layerSet.findPaintSet(paintSetId);
                if (paintSet != null) {
                    return paintSet;
                }
            }
            console.warn('failed to find paint-set', paintSetId);
        };
        MapContent.prototype.findPaint = function (paintId) {
            for (var i = 0; i < VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets.length; i++) {
                var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets[i];
                var paint = layerSet.findPaint(paintId);
                if (paint != null) {
                    return paint;
                }
            }
            return null;
        };
        MapContent.prototype.findMapLayer = function (layerId) {
            return this.view.map.findLayerById(layerId);
        };
        MapContent.prototype.findLayerSet = function (treeData) {
            //TODO clarify whats happening where (in the selection tree, and or in map content)
            var idsSearched = [];
            while (treeData != null) {
                idsSearched.push(treeData.getId());
                var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.findLayerSet(treeData.getId());
                if (layerSet != null) {
                    return layerSet;
                }
                //iterate up the tree
                treeData = VectorTileAnalysisApp_1.VectorTileAnalysisApp.vectorTileSelection.findTreeData(treeData.getParent());
            }
            throw new Error('failed to find tile-boundary-layer-set from tree-data-ids: ' + idsSearched);
        };
        MapContent.prototype.addPaintSet = function (treeData, paintType) {
            //find the tile boundary layer set containing the vector-tile-layer that we want to add paints for
            var layerSet = this.findLayerSet(treeData);
            var paintSet = new PaintSetImpl_1.PaintSetImpl(layerSet, treeData, paintType);
            layerSet.addPaintSet(paintSet);
            //replace tree data to ensure consistency of tree (removal is incremental)
            this.replaceData();
        };
        MapContent.prototype.removePaintSet = function (paintSetId) {
            for (var i = 0; i < VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets.length; i++) {
                var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets[i];
                var paintSet = layerSet.findPaintSet(paintSetId);
                if (paintSet != null) {
                    var vectorUserLayerId = layerSet.getVectorUserLayer().id;
                    layerSet.removePaintSet(paintSet.getId());
                    if (layerSet.hasPaintSets()) { //some paint sets remaining
                        this.mapContentTree.remove(paintSet.getId());
                    }
                    else {
                        this.mapContentTree.remove(vectorUserLayerId); //overlay layer empty -> remove from TOC
                    }
                    //no full map content update, just removing 
                    return;
                }
            }
            console.warn('failed to remove paint set by id', paintSetId);
        };
        MapContent.prototype.setFilterKey = function (treeData) {
            var layerSet = this.findLayerSet(treeData);
            var valueFilter = treeData.getValueFilter();
            layerSet.setFilterKey(valueFilter.getSourceLayer(), valueFilter.getKey());
            //somewhat brute force, TODO implement in a more explicit way
            VectorTileAnalysisApp_1.VectorTileAnalysisApp.vectorTileSelection.currentTileUrls = [];
            VectorTileAnalysisApp_1.VectorTileAnalysisApp.vectorTileSelection.update(VectorTileAnalysisApp_1.VectorTileAnalysisApp.view, VectorTileAnalysisApp_1.VectorTileAnalysisApp.layerSets);
        };
        return MapContent;
    }());
    exports.MapContent = MapContent;
});
