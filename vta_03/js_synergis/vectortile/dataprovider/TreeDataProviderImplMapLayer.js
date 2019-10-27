define(["require", "exports", "../data/DataType", "../../util/Color", "../data/TreeDataImpl"], function (require, exports, DataType_1, Color_1, TreeDataImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITreeDataProvider specific to a basic map-layer<br>
      *
     * @author h.fleischer
     * @since 04.10.2019
     * @deprecated
     */
    var TreeDataProviderImplMapLayer = /** @class */ (function () {
        function TreeDataProviderImplMapLayer(layer) {
            this.layer = layer;
        }
        TreeDataProviderImplMapLayer.prototype.getId = function () {
            return this.layer.id;
        };
        TreeDataProviderImplMapLayer.prototype.getTreeData = function () {
            return new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX______MAP__LAYER), this.getId(), this.layer.title, -1, Color_1.Color.white(), this.layer.fullExtent, null);
        };
        return TreeDataProviderImplMapLayer;
    }());
    exports.TreeDataProviderImplMapLayer = TreeDataProviderImplMapLayer;
});
