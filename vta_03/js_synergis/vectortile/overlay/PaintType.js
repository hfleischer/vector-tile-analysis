define(["require", "exports", "./PaintImplFill", "./PaintImplLine", "./PaintImplPoint"], function (require, exports, PaintImplFill_1, PaintImplLine_1, PaintImplPoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * paint type specific to polygon features, includes:<br>
     * <li>fill
     * <li>outline
     * <li>vertices
     */
    var PaintTypePolygon = /** @class */ (function () {
        function PaintTypePolygon() {
        }
        PaintTypePolygon.prototype.createPaints = function (layerSet, paintSet) {
            return [
                new PaintImplFill_1.PaintImplFill(layerSet, paintSet, 0.5),
                new PaintImplLine_1.PaintImplLine(layerSet, paintSet, 1.5, 0.75),
                new PaintImplPoint_1.PaintImplPoint(layerSet, paintSet, 1.5, 1)
            ];
        };
        return PaintTypePolygon;
    }());
    exports.PaintTypePolygon = PaintTypePolygon;
    /**
     * paint type specific to line features, includes:<br>
     * <li>outline
     * <li>vertices
     */
    var PaintTypePolyline = /** @class */ (function () {
        function PaintTypePolyline() {
        }
        PaintTypePolyline.prototype.createPaints = function (layerSet, paintSet) {
            return [
                new PaintImplLine_1.PaintImplLine(layerSet, paintSet, 2, 0.75),
                new PaintImplPoint_1.PaintImplPoint(layerSet, paintSet, 2.0, 1)
            ];
        };
        return PaintTypePolyline;
    }());
    exports.PaintTypePolyline = PaintTypePolyline;
    /**
     * paint type specific to point features, includes:<br>
     * <li>vertices
     */
    var PaintTypePoint = /** @class */ (function () {
        function PaintTypePoint() {
        }
        PaintTypePoint.prototype.createPaints = function (layerSet, paintSet) {
            return [
                new PaintImplPoint_1.PaintImplPoint(layerSet, paintSet, 2.5, 1)
            ];
        };
        return PaintTypePoint;
    }());
    exports.PaintTypePoint = PaintTypePoint;
    /**
     * accessor type to IPaintType instances
     *
     * @author h.fleischer
     * @since 12.10.2019
     */
    var PaintType = /** @class */ (function () {
        function PaintType() {
        }
        PaintType.get = function (index) {
            if (index >= 0 && index < PaintType.ALL.length) {
                return PaintType.ALL[index];
            }
            else {
                throw new Error("failed to resolve paint-type (index: " + index + ")");
            }
        };
        PaintType.INDEX______POLYGON = 0;
        PaintType.INDEX_____POLYLINE = 1;
        PaintType.INDEX________POINT = 2;
        PaintType.ALL = [
            new PaintTypePolygon(),
            new PaintTypePolyline(),
            new PaintTypePoint()
        ];
        return PaintType;
    }());
    exports.PaintType = PaintType;
});
