var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../util/Uid", "../data/DataType", "../../util/Color", "../data/TreeDataImpl", "./BasePaint"], function (require, exports, Uid_1, DataType_1, Color_1, TreeDataImpl_1, BasePaint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PaintImplFill = /** @class */ (function (_super) {
        __extends(PaintImplFill, _super);
        function PaintImplFill(layerSet, paintSet, opacity) {
            var _this = _super.call(this, layerSet, paintSet) || this;
            //initial color
            _this.color = paintSet.getColor();
            _this.styleLayer = {
                id: _this.getId(),
                type: 'fill',
                source: 'syn',
                'source-layer': paintSet.getSourceLayer(),
                filter: paintSet.getFilter(),
                layout: {
                    'visibility': 'visible'
                },
                paint: {
                    'fill-color': _this.color.getHex(),
                    'fill-opacity': opacity
                }
            };
            _this.treeDataItem = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX___________PAINT), _this.getId(), 'fill', -1, Color_1.Color.white(), paintSet.getExtent(), null);
            var colorTreeDataItem = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX_____STYLE_COLOR), Uid_1.Uid.random16(), _this.color.getHex(), -1, _this.color, paintSet.getExtent(), null);
            _this.treeDataItem.addChild(colorTreeDataItem);
            var opacityTreeDataItem = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX___STYLE_OPACITY), Uid_1.Uid.random16(), 'opacity', opacity, Color_1.Color.white(), paintSet.getExtent(), null);
            _this.treeDataItem.addChild(opacityTreeDataItem);
            return _this;
        }
        PaintImplFill.prototype.setDimension = function (dimension) {
            //do nothing
        };
        PaintImplFill.prototype.getDimension = function () {
            return -1;
        };
        PaintImplFill.prototype.setOpacity = function (opacity) {
            this.styleLayer['paint']['fill-opacity'] = opacity;
            this.updatePaintProperties();
        };
        PaintImplFill.prototype.getOpacity = function () {
            return this.styleLayer['paint']['fill-opacity'];
        };
        PaintImplFill.prototype.setColor = function (color) {
            this.color = color;
            this.styleLayer['paint']['fill-color'] = this.color.getHex();
            this.updatePaintProperties();
        };
        PaintImplFill.prototype.getColor = function () {
            return this.color;
        };
        PaintImplFill.prototype.getStyleLayer = function () {
            return this.styleLayer;
        };
        PaintImplFill.prototype.getTreeData = function () {
            return this.treeDataItem;
        };
        return PaintImplFill;
    }(BasePaint_1.BasePaint));
    exports.PaintImplFill = PaintImplFill;
});
