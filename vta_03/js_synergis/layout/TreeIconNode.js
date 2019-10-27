define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * utility for updating the color on an icon node instances
     * the utility adds mouseover and mousout event and creates adapted color for apporopriate hilighting
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var TreeIconNode = /** @class */ (function () {
        function TreeIconNode() {
        }
        TreeIconNode.updateColor = function (color, iconNode) {
            var inactiveColor = color.deriveInactiveColor();
            iconNode.style.color = inactiveColor.getHex(),
                iconNode.onmouseover = function (e) {
                    iconNode.style.color = color.getHex();
                };
            iconNode.onmouseout = function () {
                iconNode.style.color = inactiveColor.getHex();
            };
        };
        return TreeIconNode;
    }());
    exports.TreeIconNode = TreeIconNode;
});
