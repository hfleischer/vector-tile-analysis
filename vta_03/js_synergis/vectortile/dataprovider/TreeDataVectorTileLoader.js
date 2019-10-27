define(["require", "exports", "../VectorTileLoader", "./TreeDataProviderImplVectorTile"], function (require, exports, VectorTileLoader_1, TreeDataProviderImplVectorTile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var promiseUtils = require('esri/core/promiseUtils');
    /**
     * loader type that provides a DataItemVectorTile ready to be displayed in the tile-selection (tree / chart)
     *
     * @author h.fleischer
     * @since 29.09.2019
     */
    var TreeDataVectorTileLoader = /** @class */ (function () {
        function TreeDataVectorTileLoader(tileUrl, layerTitle, layerSetId, tileKey, color, extent, filterKeysByLayerName) {
            this.tileUrl = tileUrl;
            this.layerTitle = layerTitle;
            this.layerSetId = layerSetId;
            this.tileKey = tileKey;
            this.color = color;
            this.extent = extent;
            this.filterKeysByLayerName = filterKeysByLayerName;
        }
        TreeDataVectorTileLoader.prototype.load = function () {
            var _this = this;
            return promiseUtils.create(function (resolve, reject) {
                new VectorTileLoader_1.VectorTileLoader().load(_this.tileUrl).then(function (vectorTile) {
                    resolve(new TreeDataProviderImplVectorTile_1.TreeDataProviderImplVectorTile(_this.layerTitle, _this.layerSetId, _this.tileKey, _this.color, _this.extent, vectorTile, _this.filterKeysByLayerName));
                }, function (failure) {
                    reject(failure);
                });
            });
        };
        return TreeDataVectorTileLoader;
    }());
    exports.TreeDataVectorTileLoader = TreeDataVectorTileLoader;
});
