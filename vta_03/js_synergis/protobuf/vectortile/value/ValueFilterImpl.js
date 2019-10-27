define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValueFilterImpl = /** @class */ (function () {
        function ValueFilterImpl(sourceLayer, filterKey, filterValue) {
            this.sourceLayer = sourceLayer;
            this.filterKey = filterKey;
            this.filterValue = filterValue;
        }
        ValueFilterImpl.prototype.getSourceLayer = function () {
            return this.sourceLayer;
        };
        ValueFilterImpl.prototype.getKey = function () {
            return this.filterKey;
        };
        ValueFilterImpl.prototype.getValue = function () {
            return this.filterValue.getValue();
        };
        return ValueFilterImpl;
    }());
    exports.ValueFilterImpl = ValueFilterImpl;
});
