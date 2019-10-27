define(["require", "exports", "../../vectortile/data/DataType"], function (require, exports, DataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GeomTypePoint = /** @class */ (function () {
        function GeomTypePoint() {
        }
        GeomTypePoint.prototype.getName = function () {
            return 'point';
        };
        GeomTypePoint.prototype.getDataType = function () {
            return DataType_1.DataType.get(DataType_1.DataType.INDEX___________POINT);
        };
        return GeomTypePoint;
    }());
    var GeomTypeLinestring = /** @class */ (function () {
        function GeomTypeLinestring() {
        }
        GeomTypeLinestring.prototype.getName = function () {
            return 'line';
        };
        GeomTypeLinestring.prototype.getDataType = function () {
            return DataType_1.DataType.get(DataType_1.DataType.INDEX________POLYLINE);
        };
        return GeomTypeLinestring;
    }());
    var GeomTypePolygon = /** @class */ (function () {
        function GeomTypePolygon() {
        }
        GeomTypePolygon.prototype.getName = function () {
            return 'polygon';
        };
        GeomTypePolygon.prototype.getDataType = function () {
            return DataType_1.DataType.get(DataType_1.DataType.INDEX_________POLYGON);
        };
        return GeomTypePolygon;
    }());
    var GeomTypeUnknown = /** @class */ (function () {
        function GeomTypeUnknown() {
        }
        GeomTypeUnknown.prototype.getName = function () {
            return 'unknown';
        };
        GeomTypeUnknown.prototype.getDataType = function () {
            return DataType_1.DataType.get(DataType_1.DataType.INDEX_________UNKNOWN);
        };
        return GeomTypeUnknown;
    }());
    /**
     * accessor util to IGeomType instances<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var GeomType = /** @class */ (function () {
        function GeomType() {
        }
        /**
         * resolves a raw geometry type enum value to an instance of IGeomType<br>
         * @param index
         * @throws an error if the index is out of the valid value range (1-point, 2-polyline, 3-polygon)
         */
        GeomType.get = function (index) {
            if (index >= 1 && index <= GeomType.ALL.length) {
                return this.ALL[index - 1];
            }
            else {
                var message = "failed to resolve geomtype (index: " + index + ")";
                console.log(message);
                return this.ALL[this.INDEX____UNKNOWN];
            }
        };
        GeomType.INDEX______POINT = 1;
        GeomType.INDEX_LINESTRING = 2;
        GeomType.INDEX____POLYGON = 3;
        GeomType.INDEX____UNKNOWN = 4;
        GeomType.ALL = [
            new GeomTypePoint(),
            new GeomTypeLinestring(),
            new GeomTypePolygon(),
            new GeomTypeUnknown()
        ];
        return GeomType;
    }());
    exports.GeomType = GeomType;
});
