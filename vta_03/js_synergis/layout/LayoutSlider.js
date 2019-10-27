var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/form/HorizontalSlider", "../util/Uid"], function (require, exports, HorizontalSlider_1, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    HorizontalSlider_1 = __importDefault(HorizontalSlider_1);
    /**
     * implementation of ILayout around a reduced dojo-slider element
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var LayoutSlider = /** @class */ (function () {
        function LayoutSlider(title, min, max, value, onChange, style) {
            var dojoElementArgs = {
                name: title,
                value: value,
                minimum: min,
                maximum: max,
                showButtons: false,
                intermediateChanges: true,
                style: style,
                onChange: onChange
            };
            this.dojoElement = new HorizontalSlider_1.default(dojoElementArgs, 'layout_div_' + Uid_1.Uid.random16());
            this.htmlElement = this.dojoElement.domNode;
            this.htmlElement.style.display = 'inline-block';
            this.htmlElement.style.width = '120px';
            this.htmlElement.style.top = '4px';
        }
        LayoutSlider.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        return LayoutSlider;
    }());
    exports.LayoutSlider = LayoutSlider;
});
