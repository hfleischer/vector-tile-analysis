var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/layout/ContentPane", "../util/Uid"], function (require, exports, ContentPane_1, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ContentPane_1 = __importDefault(ContentPane_1);
    /**
     * implementation of ILayout around a simple span-element
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var LayoutBlock = /** @class */ (function () {
        function LayoutBlock(parent, region, title, style) {
            this.htmlElement = document.createElement('span');
            this.htmlElement.setAttribute('id', 'layout_span_' + Uid_1.Uid.random16());
            parent.getHtmlElement().appendChild(this.htmlElement);
            var dojoElementArgs = {
                region: region,
                title: title,
                style: style,
                splitter: false
            };
            this.dojoElement = new ContentPane_1.default(dojoElementArgs, this.htmlElement);
        }
        LayoutBlock.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        return LayoutBlock;
    }());
    exports.LayoutBlock = LayoutBlock;
});
