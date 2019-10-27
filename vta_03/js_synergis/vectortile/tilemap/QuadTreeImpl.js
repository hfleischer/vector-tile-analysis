define(["require", "exports", "./QuadKeyImpl"], function (require, exports, QuadKeyImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of IQuadTree
     *
     * @author h.fleischer
     * @since 10.10.2019
     */
    var QuadTreeImpl = /** @class */ (function () {
        function QuadTreeImpl(quadLevels, index) {
            this.quadLevels = quadLevels;
            this.index = index;
        }
        QuadTreeImpl.prototype.hasKey = function (searchKey) {
            var foundKey = this.findKey(searchKey);
            return (foundKey != null && foundKey.getLod() == searchKey.getLod() && foundKey.getCol() == searchKey.getCol() && foundKey.getRow() == searchKey.getRow());
        };
        QuadTreeImpl.prototype.findLevel = function (quadKey) {
            return this.quadLevels[quadKey.getLod()];
        };
        QuadTreeImpl.prototype.findKey = function (searchKey) {
            if (this.index != null) {
                var _index = this.index;
                var col = void 0;
                var row = void 0;
                var quadIndex = void 0;
                for (var lod = 1; lod < searchKey.getLod(); lod++) {
                    col = searchKey.getCol() >> searchKey.getLod() - lod;
                    row = searchKey.getRow() >> searchKey.getLod() - lod;
                    quadIndex = (col % 2) + (row % 2) * 2; //the quad-index in that lod (a value between 0 and 3)
                    var qValue = void 0;
                    try {
                        qValue = _index[quadIndex];
                    }
                    catch (err) {
                        console.log('caught an error while reading index ' + quadIndex + ' from index');
                    }
                    if (qValue === 0) { //that entire branch missing
                        return null;
                    }
                    else if (qValue === 1) { //that entire branch ending, this is the best match we can provide for the given search key
                        return new QuadKeyImpl_1.QuadKeyImpl(lod, col, row);
                    }
                    _index = _index[quadIndex];
                }
            }
            return searchKey;
        };
        QuadTreeImpl.prototype.getRing = function (quadKey) {
            //evalutate bounds from  lod/column/row
            var norm = this.quadLevels[quadKey.getLod()].getNorm();
            var xMin = this.quadLevels[quadKey.getLod()].getOrigin()[0] + quadKey.getCol() * norm[0];
            var xMax = xMin + norm[0];
            var yMin = this.quadLevels[quadKey.getLod()].getOrigin()[1] - quadKey.getRow() * norm[1];
            var yMax = yMin - norm[1];
            //build a ring from the x-y values
            return [
                [xMax, yMin],
                [xMin, yMin],
                [xMin, yMax],
                [xMax, yMax],
                [xMax, yMin] //upper right
            ];
        };
        return QuadTreeImpl;
    }());
    exports.QuadTreeImpl = QuadTreeImpl;
});
