var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/layout/ContentPane"], function (require, exports, ContentPane_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ContentPane_1 = __importDefault(ContentPane_1);
    /**
     * implementation of ILayout used to "hook" an entire layout to an existing div element in the content<br>
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var LayoutHook = /** @class */ (function () {
        function LayoutHook(htmlElementId) {
            this.htmlElement = document.getElementById(htmlElementId);
            this.dojoElement = new ContentPane_1.default({}, this.htmlElement);
        }
        LayoutHook.prototype.startup = function () {
            this.dojoElement.startup();
        };
        LayoutHook.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        return LayoutHook;
    }());
    exports.LayoutHook = LayoutHook;
});
