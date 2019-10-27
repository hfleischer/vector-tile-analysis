define(["require", "exports", "../data/DataType", "../data/TreeDataImpl", "./TreeDataProviderImplVectorTileLayer", "../VectorTileAnalysisApp"], function (require, exports, DataType_1, TreeDataImpl_1, TreeDataProviderImplVectorTileLayer_1, VectorTileAnalysisApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeDataProviderImplVectorTile = /** @class */ (function () {
        function TreeDataProviderImplVectorTile(layerTitle, layerSetId, tileKey, color, extent, vectorTile, filterKeysByLayerName) {
            this.layerTitle = layerTitle;
            this.layerSetId = layerSetId;
            this.tileId = tileKey.getId();
            this.color = color;
            this.extent = extent;
            this.vectorTile = vectorTile;
            this.filterKeysByLayerName = filterKeysByLayerName;
            var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.findLayerSet(layerSetId);
            var tilemap = layerSet.getBoundariesLayer().getTilemap();
            this.quadLevel = tilemap.findLevel(tileKey);
        }
        TreeDataProviderImplVectorTile.prototype.getId = function () {
            return this.layerSetId;
        };
        TreeDataProviderImplVectorTile.prototype.getFilterKey = function (layer) {
            if (this.filterKeysByLayerName[layer.name]) {
                //user anything that is already set
                return this.filterKeysByLayerName[layer.name];
            }
            else {
                //check if the layer has any of the following keys, in the given order
                var filterKeys = ['_symbol', '_name', '_name_global', '_name_en', '_minzoom'];
                for (var i = 0; i < filterKeys.length; i++) {
                    if (layer.valueLookup.hasKey(filterKeys[i]) && layer.getValueSet(filterKeys[i]).length > 0) {
                        return filterKeys[i];
                    }
                }
            }
            return null;
        };
        TreeDataProviderImplVectorTile.prototype.getTreeData = function () {
            //the map-layer-id is used on the vectortile, so the layer can be found later, i.e. when adding an overlay
            var vectortileDataItem = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX____________TILE), this.getId(), this.layerTitle + ' 🠚 ' + this.tileId, this.vectorTile.byteCount, this.color, this.extent, null);
            for (var i = 0; i < this.vectorTile.layers.length; i++) {
                var layer = this.vectorTile.layers[i];
                var layerColor = this.color.deriveColor(i, this.vectorTile.layers.length);
                var dataItemLayer = new TreeDataProviderImplVectorTileLayer_1.TreeDataProviderImplVectorTileLayer(layerColor, layer, this.extent, this.quadLevel, this.getFilterKey(layer));
                vectortileDataItem.addChild(dataItemLayer.getTreeData());
            }
            return vectortileDataItem;
        };
        return TreeDataProviderImplVectorTile;
    }());
    exports.TreeDataProviderImplVectorTile = TreeDataProviderImplVectorTile;
});
