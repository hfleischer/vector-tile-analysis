define(["require", "exports", "../data/DataType", "../../util/Uid", "../../util/Color", "../data/TreeDataImpl", "./PaintSet"], function (require, exports, DataType_1, Uid_1, Color_1, TreeDataImpl_1, PaintSet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PaintSetImpl = /** @class */ (function () {
        function PaintSetImpl(layerSet, treeData, paintType) {
            this.id = Uid_1.Uid.random16();
            this.paints = [];
            this.visible = true;
            //TODO create groups of paints managed internally, each having a unique name
            var title = PaintSet_1.PaintSet.getItemName(treeData);
            this.filter = PaintSet_1.PaintSet.getFilter(treeData);
            this.sourceLayer = PaintSet_1.PaintSet.getSourceLayer(treeData);
            this.color = treeData.getColor();
            this.paints = paintType.createPaints(layerSet, this);
            this.treeDataItem = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX_______PAINT_SET), this.getId(), title, -1, Color_1.Color.white(), treeData.getExtent(), null);
            for (var i = 0; i < this.paints.length; i++) {
                this.treeDataItem.addChild(this.paints[i].getTreeData());
            }
        }
        PaintSetImpl.prototype.isVisible = function () {
            return this.visible;
        };
        PaintSetImpl.prototype.getColor = function () {
            return this.color;
        };
        PaintSetImpl.prototype.getFilter = function () {
            return this.filter;
        };
        PaintSetImpl.prototype.getExtent = function () {
            return this.extent;
        };
        PaintSetImpl.prototype.toggleVisibility = function () {
            this.visible = !this.visible;
            this.paints.forEach(function (paint) { return paint.renderVisibility(); });
            return this.visible;
        };
        PaintSetImpl.prototype.getStyleLayers = function () {
            var styleLayers = [];
            this.paints.forEach(function (paint) { return styleLayers.push(paint.getStyleLayer()); });
            return styleLayers;
        };
        PaintSetImpl.prototype.getSourceLayer = function () {
            return this.sourceLayer;
        };
        PaintSetImpl.prototype.getId = function () {
            return this.id;
        };
        PaintSetImpl.prototype.findPaint = function (paintId) {
            for (var i = 0; i < this.paints.length; i++) {
                if (this.paints[i].getId() === paintId) {
                    return this.paints[i];
                }
            }
            return null;
        };
        PaintSetImpl.prototype.getTreeData = function () {
            return this.treeDataItem;
        };
        return PaintSetImpl;
    }());
    exports.PaintSetImpl = PaintSetImpl;
});
