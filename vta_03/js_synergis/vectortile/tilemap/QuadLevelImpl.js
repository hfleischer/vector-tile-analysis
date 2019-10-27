define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QuadLevelImpl = /** @class */ (function () {
        function QuadLevelImpl(level, origin, norm) {
            this.level = level;
            this.origin = origin;
            this.norm = norm;
        }
        QuadLevelImpl.prototype.getOrigin = function () {
            return this.origin;
        };
        QuadLevelImpl.prototype.getNorm = function () {
            return this.norm;
        };
        return QuadLevelImpl;
    }());
    exports.QuadLevelImpl = QuadLevelImpl;
});
