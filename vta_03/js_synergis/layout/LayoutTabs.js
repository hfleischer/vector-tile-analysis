var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/layout/TabContainer", "../util/Uid"], function (require, exports, TabContainer_1, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TabContainer_1 = __importDefault(TabContainer_1);
    /**
     * implementation of ILayout around a dojo-tab-container
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var LayoutTabs = /** @class */ (function () {
        function LayoutTabs(parent, region, title, style) {
            this.htmlElement = document.createElement('div');
            this.htmlElement.setAttribute('id', 'layout_div_tabs_' + Uid_1.Uid.random16());
            parent.getHtmlElement().appendChild(this.htmlElement);
            var dojoElementArgs = {
                region: region,
                title: title,
                style: style,
                splitter: true
            };
            this.dojoElement = new TabContainer_1.default(dojoElementArgs, this.htmlElement);
        }
        LayoutTabs.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        return LayoutTabs;
    }());
    exports.LayoutTabs = LayoutTabs;
});
