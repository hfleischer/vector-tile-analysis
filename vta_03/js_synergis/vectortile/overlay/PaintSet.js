define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * static aspects regarding IPaintSet<br>
     *
     * @author h.fleischer
     * @since 12.10.2019
     */
    var PaintSet = /** @class */ (function () {
        function PaintSet() {
        }
        PaintSet.getItemName = function (item) {
            var valueFilter = item.getValueFilter();
            var itemName = valueFilter.getSourceLayer();
            if (valueFilter.getKey() != null && valueFilter.getValue() != null) {
                itemName += ' ' + valueFilter.getKey() + '  🠚 ' + valueFilter.getValue();
            }
            itemName += ' (overlay)';
            return itemName;
        };
        PaintSet.getSourceLayer = function (item) {
            return item.getValueFilter().getSourceLayer();
        };
        PaintSet.getFilter = function (item) {
            var valueFilter = item.getValueFilter();
            var result = [];
            if (valueFilter.getKey() != null && valueFilter.getValue() != null) {
                result.push('==');
                result.push(valueFilter.getKey());
                result.push(valueFilter.getValue());
            }
            return result;
        };
        return PaintSet;
    }());
    exports.PaintSet = PaintSet;
});
