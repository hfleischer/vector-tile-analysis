define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * single string value as defined in the mapbox vectortile specification
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectorTileValueString = /** @class */ (function () {
        function VectorTileValueString(byteCount, value) {
            this.byteCount = byteCount;
            this.value = value;
        }
        VectorTileValueString.prototype.isEmpty = function () {
            return false;
        };
        VectorTileValueString.prototype.getByteCount = function () {
            return this.byteCount;
        };
        VectorTileValueString.prototype.getValue = function () {
            return this.value;
        };
        return VectorTileValueString;
    }());
    exports.VectorTileValueString = VectorTileValueString;
});
