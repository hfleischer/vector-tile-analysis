import { ITreeIconNode } from "./ITreeIconNode";
import { IColor } from "../util/IColor";
import { TreeIconNode } from "./TreeIconNode";

/**
 * implementation of ITreeIconNode
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class TreeIconNodeImpl implements ITreeIconNode {

    private readonly htmlElement: HTMLDivElement;

    constructor(label: string, iconHtml: string, transform: string, margin: string, color: IColor, action?: Function) {

        this.htmlElement = document.createElement('div');
        this.htmlElement.style['float'] = 'right';
        this.htmlElement.style.width = '16px';
        this.htmlElement.style.height = '16px';
        
        let iconNode: HTMLDivElement = document.createElement('div');
        iconNode.style.cursor = 'pointer';
        iconNode.style.position = 'relative';
        iconNode.style.color = color.getHex(), //'var(--gui-border-color)';
        iconNode.style.width = '16px';
        iconNode.style.height = '16px';
        iconNode.style.transform =  transform;
        iconNode.style.margin =  margin;
        iconNode.innerHTML = iconHtml;
    
        iconNode.title = label;
        this.htmlElement.appendChild(iconNode);    	

        if (action != null) {
            TreeIconNode.updateColor(color, iconNode);
            iconNode.onclick = () => {
                action.call(null, iconNode);
            };            
        }

    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }

}