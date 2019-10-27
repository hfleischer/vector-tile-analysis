define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * single numeric value as defined in the mapbox vectortile specification
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectorTileValueNumber = /** @class */ (function () {
        function VectorTileValueNumber(byteCount, value) {
            this.byteCount = byteCount;
            this.value = value;
        }
        VectorTileValueNumber.prototype.isEmpty = function () {
            return false;
        };
        VectorTileValueNumber.prototype.getByteCount = function () {
            return this.byteCount;
        };
        VectorTileValueNumber.prototype.getValue = function () {
            return this.value;
        };
        return VectorTileValueNumber;
    }());
    exports.VectorTileValueNumber = VectorTileValueNumber;
});
