define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QuadKeyImpl = /** @class */ (function () {
        function QuadKeyImpl(lod, col, row) {
            this.lod = lod;
            this.col = col;
            this.row = row;
        }
        QuadKeyImpl.prototype.getId = function () {
            return 'L' + this.getPadded(this.lod, 2) + '-C' + this.getPadded(this.col, 7) + '-R' + this.getPadded(this.row, 7);
        };
        QuadKeyImpl.prototype.getPadded = function (value, size) {
            var raw = '0000000000' + value;
            return raw.substr(raw.length - size);
        };
        QuadKeyImpl.prototype.getLod = function () {
            return this.lod;
        };
        QuadKeyImpl.prototype.getCol = function () {
            return this.col;
        };
        QuadKeyImpl.prototype.getRow = function () {
            return this.row;
        };
        return QuadKeyImpl;
    }());
    exports.QuadKeyImpl = QuadKeyImpl;
});
