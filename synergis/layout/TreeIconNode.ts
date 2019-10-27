import { IColor } from "../util/IColor";

/**
 * utility for updating the color on an icon node instances
 * the utility adds mouseover and mousout event and creates adapted color for apporopriate hilighting
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class TreeIconNode {

    static updateColor(color: IColor, iconNode: HTMLDivElement) {

        let inactiveColor = color.deriveInactiveColor();
        iconNode.style.color = inactiveColor.getHex(),
        iconNode.onmouseover = function(e) {
            iconNode.style.color = color.getHex();
        };
        iconNode.onmouseout = function() {
            iconNode.style.color = inactiveColor.getHex();
        };

    }

}