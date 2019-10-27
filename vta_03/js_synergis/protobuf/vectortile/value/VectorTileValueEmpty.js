define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of IValue proprietary to an empty / not found value
     */
    var VectorTileValueEmpty = /** @class */ (function () {
        function VectorTileValueEmpty() {
        }
        VectorTileValueEmpty.prototype.isEmpty = function () {
            return true;
        };
        VectorTileValueEmpty.prototype.getByteCount = function () {
            return 0;
        };
        VectorTileValueEmpty.prototype.getValue = function () {
            return null;
        };
        return VectorTileValueEmpty;
    }());
    exports.VectorTileValueEmpty = VectorTileValueEmpty;
});
