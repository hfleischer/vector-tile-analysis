define(["require", "exports", "../../util/Uid"], function (require, exports, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * base implementation of IPaint<br>
     * takes care of paint visibility
     *
     * @author h.fleischer
     * @since 12.10.2019
     */
    var BasePaint = /** @class */ (function () {
        function BasePaint(layerSet, paintSet) {
            this.id = Uid_1.Uid.random16();
            this.layerSet = layerSet;
            this.paintSet = paintSet;
            this.visible = true;
        }
        BasePaint.prototype.updatePaintProperties = function () {
            var vectorTileLayer = this.layerSet.getVectorUserLayer();
            var paintProperties = vectorTileLayer.getPaintProperties(this.getId());
            vectorTileLayer.setPaintProperties(this.getId(), paintProperties);
        };
        BasePaint.prototype.getId = function () {
            return this.id;
        };
        BasePaint.prototype.isVisible = function () {
            return this.visible;
        };
        BasePaint.prototype.toggleVisibility = function () {
            this.visible = !this.visible;
            this.renderVisibility();
            return this.visible;
        };
        BasePaint.prototype.renderVisibility = function () {
            var styleLayer = this.getStyleLayer();
            if (this.visible && this.paintSet.isVisible()) {
                styleLayer['layout']['visibility'] = 'visible';
            }
            else {
                styleLayer['layout']['visibility'] = 'none';
            }
            var vectorTileLayer = this.layerSet.getVectorUserLayer();
            var layoutProperties = vectorTileLayer.getLayoutProperties(this.getId());
            vectorTileLayer.setLayoutProperties(this.getId(), layoutProperties);
        };
        return BasePaint;
    }());
    exports.BasePaint = BasePaint;
});
