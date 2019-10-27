define(["require", "exports", "./VectorTileValueString", "./VectorTileValueNumber"], function (require, exports, VectorTileValueString_1, VectorTileValueNumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITypeBuilder usable while deserializing an IVectorTileValue from an encoded vectortile<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectorTileValueBuilder = /** @class */ (function () {
        function VectorTileValueBuilder() {
        }
        VectorTileValueBuilder.prototype.setByteCount = function (byteCount) {
            this.byteCount = byteCount;
            return this;
        };
        VectorTileValueBuilder.prototype.setStringValue = function (value) {
            this.value = new VectorTileValueString_1.VectorTileValueString(this.byteCount, value);
            return this;
        };
        VectorTileValueBuilder.prototype.setNumberValue = function (value) {
            this.value = new VectorTileValueNumber_1.VectorTileValueNumber(this.byteCount, value);
            return this;
        };
        VectorTileValueBuilder.prototype.build = function () {
            return this.value;
        };
        return VectorTileValueBuilder;
    }());
    exports.VectorTileValueBuilder = VectorTileValueBuilder;
});
