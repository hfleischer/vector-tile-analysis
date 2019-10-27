define(["require", "exports", "../data/DataType", "../../util/Uid", "../data/TreeDataImpl"], function (require, exports, DataType_1, Uid_1, TreeDataImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITreeDataProvider around an instance of IVectorTileValue
     *
     * @author h.fleischer
     * @since 04.10.2019
     */
    var TreeDataProviderImplVectorTileValue = /** @class */ (function () {
        function TreeDataProviderImplVectorTileValue(color, value, extent) {
            this.id = Uid_1.Uid.random16();
            this.color = color;
            this.value = value;
            this.extent = extent;
        }
        TreeDataProviderImplVectorTileValue.prototype.getId = function () {
            return this.id;
        };
        TreeDataProviderImplVectorTileValue.prototype.getTreeData = function () {
            return new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX___________VALUE), this.getId(), this.value.getValue(), this.value.getByteCount(), this.color, this.extent, null);
        };
        return TreeDataProviderImplVectorTileValue;
    }());
    exports.TreeDataProviderImplVectorTileValue = TreeDataProviderImplVectorTileValue;
});
