define(["require", "exports", "./TreeIconNode"], function (require, exports, TreeIconNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITreeIconNode
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var TreeIconNodeImpl = /** @class */ (function () {
        function TreeIconNodeImpl(label, iconHtml, transform, margin, color, action) {
            this.htmlElement = document.createElement('div');
            this.htmlElement.style['float'] = 'right';
            this.htmlElement.style.width = '16px';
            this.htmlElement.style.height = '16px';
            var iconNode = document.createElement('div');
            iconNode.style.cursor = 'pointer';
            iconNode.style.position = 'relative';
            iconNode.style.color = color.getHex(), //'var(--gui-border-color)';
                iconNode.style.width = '16px';
            iconNode.style.height = '16px';
            iconNode.style.transform = transform;
            iconNode.style.margin = margin;
            iconNode.innerHTML = iconHtml;
            iconNode.title = label;
            this.htmlElement.appendChild(iconNode);
            if (action != null) {
                TreeIconNode_1.TreeIconNode.updateColor(color, iconNode);
                iconNode.onclick = function () {
                    action.call(null, iconNode);
                };
            }
        }
        TreeIconNodeImpl.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        return TreeIconNodeImpl;
    }());
    exports.TreeIconNodeImpl = TreeIconNodeImpl;
});
