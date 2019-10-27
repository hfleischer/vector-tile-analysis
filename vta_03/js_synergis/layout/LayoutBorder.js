var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/layout/BorderContainer", "../util/Uid"], function (require, exports, BorderContainer_1, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    BorderContainer_1 = __importDefault(BorderContainer_1);
    /**
     * implementation of ILayout around a dojo BorderContainer element<br>
     *
     * @author h.fleischer
     * @since 10.09.2019
     */
    var LayoutBorder = /** @class */ (function () {
        function LayoutBorder(parent, region, title, style) {
            this.htmlElement = document.createElement('div');
            this.htmlElement.setAttribute('id', 'layout_div_' + Uid_1.Uid.random16());
            parent.getHtmlElement().appendChild(this.htmlElement);
            var dojoElementArgs = {
                region: region,
                title: title,
                gutters: false,
                liveSplitters: true,
                style: style,
                splitter: false
            };
            this.dojoElement = new BorderContainer_1.default(dojoElementArgs, this.htmlElement);
        }
        LayoutBorder.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        LayoutBorder.TOP = 'top';
        LayoutBorder.CENTER = 'center';
        LayoutBorder.BOTTOM = 'bottom';
        LayoutBorder.RIGHT = 'right';
        LayoutBorder.LEFT = 'left';
        return LayoutBorder;
    }());
    exports.LayoutBorder = LayoutBorder;
});
