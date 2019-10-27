var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/Toolbar", "../util/Uid"], function (require, exports, Toolbar_1, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Toolbar_1 = __importDefault(Toolbar_1);
    /**
     * implementation of ILayout around a dojo-toolbar
     *
     * @author h.fleischer
     * @since 17.09.2019
     *
     */
    var LayoutToolbar = /** @class */ (function () {
        function LayoutToolbar(parent, region, title, style) {
            this.htmlElement = document.createElement('div');
            this.htmlElement.setAttribute('id', 'layout_div_toolbar_' + Uid_1.Uid.random16());
            parent.getHtmlElement().appendChild(this.htmlElement);
            var dojoElementArgs = {
                region: region,
                title: title,
                style: style,
                splitter: false
            };
            this.dojoElement = new Toolbar_1.default(dojoElementArgs, this.htmlElement);
        }
        LayoutToolbar.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        return LayoutToolbar;
    }());
    exports.LayoutToolbar = LayoutToolbar;
});
