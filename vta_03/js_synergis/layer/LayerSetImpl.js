define(["require", "exports", "../util/Color", "../vectortile/dataprovider/TreeDataVectorTileLoader", "./VectorTileLayerSyn", "./ActiveTileLayerSyn", "./BoundariesLayerSyn", "../vectortile/VectorTileAnalysisApp", "../vectortile/data/TreeDataImpl", "../vectortile/data/DataType", "../vectortile/tilemap/QuadKeyImpl", "./BoundaryFields"], function (require, exports, Color_1, TreeDataVectorTileLoader_1, VectorTileLayerSyn_1, ActiveTileLayerSyn_1, BoundariesLayerSyn_1, VectorTileAnalysisApp_1, TreeDataImpl_1, DataType_1, QuadKeyImpl_1, BoundaryFields_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * logical grouping of a vectortile layer with an associated featurelayer<br>
     * the featurelayer is used to hold tile-boundaries and is being populated during map navigation<br>
     *
     * @author h.fleischer
     * @since 05.10.2019
     *
     */
    var LayerSetImpl = /** @class */ (function () {
        function LayerSetImpl(vectorTileLayerProps) {
            this.title = vectorTileLayerProps['title'];
            this.id = vectorTileLayerProps['id'];
            this.filterKeysByLayerName = {};
            this.paintSets = [];
            this.color = Color_1.Color.nextLayerColor();
            vectorTileLayerProps['title'] = this.title + ' (vb)';
            vectorTileLayerProps['id'] = this.id + '_vb';
            //original vector tile layer
            this.vectorBaseLayer = new VectorTileLayerSyn_1.VectorTileLayerSyn(vectorTileLayerProps, this.color);
            //thin tile border
            this.boundariesLayer = new BoundariesLayerSyn_1.BoundariesLayerSyn(this.id, this.title + ' (tb)', this.color);
            //tile corners
            this.activeTileLayer = new ActiveTileLayerSyn_1.ActiveTileLayerSyn(this.title + ' (tm)', this.color);
            this.visible = vectorTileLayerProps['visible'];
            this.crop = false;
        }
        LayerSetImpl.prototype.isCrop = function () {
            return this.crop;
        };
        LayerSetImpl.prototype.toggleCrop = function () {
            var _this_1 = this;
            this.crop = !this.crop;
            if (this.crop) {
                this.getBoundariesLayer().queryActiveTile(VectorTileAnalysisApp_1.VectorTileAnalysisApp.view.center).then(function (activeTile) {
                    var lod = activeTile.getAttribute(BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_LOD.name);
                    var col = activeTile.getAttribute(BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_COL.name);
                    var row = activeTile.getAttribute(BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_ROW.name);
                    var cropKey = new QuadKeyImpl_1.QuadKeyImpl(lod, col, row);
                    _this_1.getBoundariesLayer().setCropKey(cropKey);
                });
            }
            else {
                this.getBoundariesLayer().clearCropKey();
            }
            return this.crop;
        };
        LayerSetImpl.prototype.setFilterKey = function (layerName, filterKey) {
            this.filterKeysByLayerName[layerName] = filterKey;
        };
        LayerSetImpl.prototype.hasPaintSets = function () {
            return this.paintSets.length > 0;
        };
        LayerSetImpl.prototype.getActiveTileLayer = function () {
            return this.activeTileLayer;
        };
        LayerSetImpl.prototype.getVectorUserLayer = function () {
            return this.vectorUserLayer;
        };
        LayerSetImpl.prototype.getVectorBaseLayer = function () {
            return this.vectorBaseLayer;
        };
        LayerSetImpl.prototype.getBoundariesLayer = function () {
            return this.boundariesLayer;
        };
        LayerSetImpl.prototype.getId = function () {
            return this.id;
        };
        /**
         * get the tree data of this item<br>
         * this may include user-overlay, if present
         * boundaries and borders are not included, these are always on, unless the entire layer-set is turned off completely
         */
        LayerSetImpl.prototype.getTreeData = function () {
            var treeData = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX_______LAYER_SET), this.id, this.title, -1, Color_1.Color.white(), this.vectorBaseLayer.fullExtent, null);
            if (this.vectorUserLayer != null) {
                var treeDataVectorUser_1 = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX______MAP__LAYER), this.vectorUserLayer.id, this.vectorUserLayer.title, -1, Color_1.Color.white(), this.vectorUserLayer.fullExtent, null);
                treeData.addChild(treeDataVectorUser_1);
                this.paintSets.forEach(function (paintSet) { return treeDataVectorUser_1.addChild(paintSet.getTreeData()); });
            }
            var treeDataVectorBase = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX______MAP__LAYER), this.vectorBaseLayer.id, this.vectorBaseLayer.title, -1, Color_1.Color.white(), this.vectorBaseLayer.fullExtent, null);
            treeData.addChild(treeDataVectorBase);
            return treeData;
        };
        LayerSetImpl.prototype.findPaintSet = function (paintSetId) {
            for (var i = 0; i < this.paintSets.length; i++) {
                var paintSet = this.paintSets[i];
                if (paintSet.getId() === paintSetId) {
                    return paintSet;
                }
            }
            return null;
        };
        LayerSetImpl.prototype.findPaint = function (paintId) {
            for (var i = 0; i < this.paintSets.length; i++) {
                var paintSet = this.paintSets[i];
                var paint = paintSet.findPaint(paintId);
                if (paint != null) {
                    return paint;
                }
            }
            return null;
        };
        LayerSetImpl.prototype.removePaintSet = function (paintSetId) {
            var paintSet = this.findPaintSet(paintSetId);
            if (paintSet != null) {
                var paintSetIndex = this.paintSets.indexOf(paintSet);
                this.paintSets.splice(paintSetIndex, 1);
                this.updateVectorUserLayer();
            }
        };
        LayerSetImpl.prototype.addPaintSet = function (paintSet) {
            this.paintSets.push(paintSet);
            this.updateVectorUserLayer();
        };
        LayerSetImpl.prototype.updateVectorUserLayer = function () {
            if (this.vectorUserLayer != null) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.vectorUserLayers.remove(this.vectorUserLayer);
                this.vectorUserLayer = null;
            }
            //if there are remaining paintsets, re-create the layer
            if (this.paintSets.length > 0) {
                //collect all active style layers
                var styleLayers_1 = [];
                for (var i = 0; i < this.paintSets.length; i++) {
                    var _styleLayers = this.paintSets[i].getStyleLayers();
                    _styleLayers.forEach(function (_styleLayer) { return styleLayers_1.push(_styleLayer); });
                }
                //TODO collect paints by type, then add polygons / polylines / points
                //build a full layerDefinition
                var layerDefinition = {
                    id: this.id + '_vu',
                    title: this.title + ' (user overlays)',
                    style: {
                        layers: styleLayers_1,
                        sources: {
                            syn: {
                                url: this.vectorBaseLayer['serviceUrl'],
                                type: 'vector'
                            }
                        }
                    },
                };
                console.log('layerDefinition', JSON.stringify(layerDefinition));
                this.vectorUserLayer = new VectorTileLayerSyn_1.VectorTileLayerSyn(layerDefinition, this.color);
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.vectorUserLayers.add(this.vectorUserLayer);
                //lets listen to the user layer's tiles as well
                var _this_2 = this;
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.view.whenLayerView(this.vectorUserLayer).then(function (layerView) {
                    //console.log('layerView', layerView);
                    _this_2.boundariesLayer.attachToVectorTileLayerView(layerView);
                });
            }
        };
        LayerSetImpl.prototype.isVisible = function () {
            return this.visible;
        };
        LayerSetImpl.prototype.toggleVisibility = function () {
            this.visible = !this.visible;
            this.vectorBaseLayer.visible = this.visible;
            if (this.vectorUserLayer != null) {
                this.vectorUserLayer.visible = this.visible;
            }
            this.boundariesLayer.visible = this.visible;
            this.activeTileLayer.visible = this.visible;
            return this.visible;
        };
        LayerSetImpl.prototype.createTileLoader = function (tileUrl, tileKey, extent) {
            return new TreeDataVectorTileLoader_1.TreeDataVectorTileLoader(tileUrl, this.title, this.id, tileKey, this.color, extent, this.filterKeysByLayerName);
        };
        LayerSetImpl.prototype.queryActiveTile = function (geometry) {
            return this.boundariesLayer.queryActiveTile(geometry);
        };
        return LayerSetImpl;
    }());
    exports.LayerSetImpl = LayerSetImpl;
});
