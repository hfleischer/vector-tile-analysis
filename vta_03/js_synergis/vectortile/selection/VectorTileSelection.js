define(["require", "exports", "esri/geometry", "../VectorTileAnalysisApp", "../../layer/BoundaryFields", "../data/TreeDataImpl", "../data/DataType", "../../util/Uid", "../../util/Color", "../tilemap/QuadKeyImpl"], function (require, exports, geometry_1, VectorTileAnalysisApp_1, BoundaryFields_1, TreeDataImpl_1, DataType_1, Uid_1, Color_1, QuadKeyImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var promiseUtils = require('esri/core/promiseUtils');
    var VectorTileSelection = /** @class */ (function () {
        function VectorTileSelection(layoutTree, layoutChart) {
            this.layoutTree = layoutTree;
            this.layoutChart = layoutChart;
            this.currentTileUrls = [];
            this.currentTreeData = [];
            //link tile-selection-chart and tile-selection-tree to each other
            var _this = this;
            this.layoutTree.itemSelectCallback = function (itemId) {
                _this.layoutChart.focusItem(itemId);
                _this.focusItem(itemId);
            };
            this.layoutChart.itemSelectCallback = function (itemId) {
                _this.layoutTree.focusItem(itemId);
                _this.focusItem(itemId);
            };
        }
        VectorTileSelection.prototype.focusItem = function (itemId) {
            var treeData = VectorTileAnalysisApp_1.VectorTileAnalysisApp.vectorTileSelection.findTreeData(itemId);
            var treeDataExtent = treeData.getExtent();
            if (treeDataExtent != null) {
                var expandableExtent = new geometry_1.Extent({
                    xmin: treeDataExtent.xmin,
                    ymin: treeDataExtent.ymin,
                    xmax: treeDataExtent.xmax,
                    ymax: treeDataExtent.ymax,
                    spatialReference: treeDataExtent.spatialReference
                }).expand(1.2);
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.view.goTo(expandableExtent, {
                    duration: 1000
                });
            }
        };
        /**
         * query all tile layers for their active (currently displayed tile)
         * single result is IPromise<Graphic> TODO extend Grahic and add some source-layer to it
         *
         * @param view
         * @param tileBoundaryLayers
         */
        VectorTileSelection.prototype.queryActiveTiles = function (view, layerSets) {
            return promiseUtils.eachAlways(layerSets.map(function (layerSet) { return layerSet.queryActiveTile(view.center); }));
        };
        VectorTileSelection.prototype.findTreeData = function (itemId) {
            for (var i = 0; i < this.currentTreeData.length; i++) {
                var recursiveTreeData = this.currentTreeData[i].getChildrenRecursive();
                for (var j = 0; j < recursiveTreeData.length; j++) {
                    if (recursiveTreeData[j].getId() === itemId) {
                        return recursiveTreeData[j];
                    }
                }
            }
            return null;
        };
        VectorTileSelection.prototype.getLoadableTiles = function (subPromises) {
            var activeTiles = [];
            subPromises.forEach(function (subPromise) {
                if (subPromise.value) {
                    activeTiles.push(subPromise.value);
                }
                //TODO handle error
            });
            //from tile-url judge if a reload is required
            var reloadRequired = false;
            var pendingTileUrls = activeTiles.map(function (activeTile) { return activeTile.attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_URL.name]; });
            if (pendingTileUrls.length == this.currentTileUrls.length) {
                for (var i = 0; i < pendingTileUrls.length; i++) {
                    if (pendingTileUrls[i] !== this.currentTileUrls[i]) {
                        reloadRequired = true;
                    }
                }
            }
            else {
                reloadRequired = true;
            }
            this.currentTileUrls = pendingTileUrls;
            if (reloadRequired) {
                var tileLoaders = [];
                for (var i = 0; i < activeTiles.length; i++) {
                    var layerId = activeTiles[i].attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_LAYER_ID.name];
                    var tileUrl = activeTiles[i].attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_URL.name];
                    //build a tileKey from the graohic attributes
                    var tileLod = activeTiles[i].attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_LOD.name];
                    var tileCol = activeTiles[i].attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_COL.name];
                    var tileRow = activeTiles[i].attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_ROW.name];
                    var tileKey = new QuadKeyImpl_1.QuadKeyImpl(tileLod, tileCol, tileRow);
                    //load tile to be displayed in tree and chart and set active marker locations
                    var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.findLayerSet(layerId);
                    //console.log('activeTiles[i].geometry.extent', activeTiles[i].geometry.extent);
                    tileLoaders.push(layerSet.createTileLoader(tileUrl, tileKey, activeTiles[i].geometry.extent));
                    layerSet.getActiveTileLayer().setTile(activeTiles[i]);
                }
                return promiseUtils.eachAlways(tileLoaders.map(function (tileLoader) { return tileLoader.load(); }));
            }
            else {
                return promiseUtils.eachAlways([]);
            }
        };
        /**
         * receives the loaded TreeDataProviderImplVectorTile instances<br>
         * TODO these instances are the ones that should be kept internally
         * when resorting, or even more generally, when fetching the tree data, the respective filter keys could be applie
         * if that works the filter key would not have to be passes around while loading
         * @param subPromises
         */
        VectorTileSelection.prototype.getTreeDataItems = function (subPromises) {
            var dataItemsVectortile = [];
            subPromises.forEach(function (subPromise) {
                if (subPromise.value) {
                    dataItemsVectortile.push(subPromise.value);
                }
                else if (subPromise.error) {
                    console.log('subPromise.error', subPromise.error);
                }
            });
            var treeDataItems = [];
            dataItemsVectortile.forEach(function (dataItemVectortile) {
                treeDataItems.push(dataItemVectortile.getTreeData());
            });
            return promiseUtils.create(function (resolve, reject) {
                resolve(treeDataItems);
            });
        };
        VectorTileSelection.prototype.clearTreeeData = function () {
            var emptyData = [
                new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX_________UNKNOWN), Uid_1.Uid.random16(), 'no active tiles found', -1, Color_1.Color.parseHex('#FF0000'), null, null)
            ];
            //apply the evaluated active tiles to tree / chart / and this instance
            this.layoutTree.replaceData(emptyData);
            this.layoutChart.replaceData(emptyData);
            this.currentTreeData = emptyData;
            this.currentTileUrls = [];
        };
        VectorTileSelection.prototype.update = function (view, layerSets) {
            var _this_1 = this;
            var _this = this;
            var reversedLayerSets = [];
            for (var i = layerSets.length - 1; i >= 0; i--) {
                if (layerSets[i].isVisible()) {
                    reversedLayerSets.push(layerSets[i]);
                }
            }
            ;
            //see what is currently displayed
            this.queryActiveTiles(view, reversedLayerSets).then(function (subPromises) {
                if (subPromises.length == 0) {
                    _this_1.clearTreeeData();
                }
                else {
                    //load if anything needs to be loaded
                    _this.getLoadableTiles(subPromises).then(function (subPromises) {
                        if (subPromises.length > 0) {
                            //convert loaded tiles to displayable tree items
                            _this.getTreeDataItems(subPromises).then(function (treeData) {
                                if (treeData.length > 0) { //empty array need to reflect as well
                                    //apply the evaluated active tiles to tree / chart / and this instance
                                    //console.log('treeData', treeData);
                                    _this_1.layoutTree.replaceData(treeData);
                                    _this_1.layoutChart.replaceData(treeData);
                                    _this_1.currentTreeData = treeData;
                                }
                            }).catch(function (ex) {
                                console.log('failed to update tree-data-items due to', ex);
                            });
                        }
                        else {
                            //skipping conversion to tree data items due to empty result
                        }
                    }).catch(function (ex) {
                        console.log('failed to handle loadable tiles due to', ex);
                    });
                }
            }).catch(function (ex) {
                console.log('failed to handle active tiles due to', ex);
            });
        };
        return VectorTileSelection;
    }());
    exports.VectorTileSelection = VectorTileSelection;
});
