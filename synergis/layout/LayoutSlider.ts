import HorizontalSlider from 'dijit/form/HorizontalSlider';
import { Uid } from '../util/Uid';

/**
 * implementation of ILayout around a reduced dojo-slider element
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class LayoutSlider implements ILayout {

    readonly dojoElement: HorizontalSlider;
    readonly htmlElement: HTMLDivElement;

    constructor(title: string, min: number , max: number, value: number, onChange: Function, style?: string) {

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
        this.dojoElement = new HorizontalSlider(dojoElementArgs, 'layout_div_' + Uid.random16());

        this.htmlElement = <HTMLDivElement> this.dojoElement.domNode;
        this.htmlElement.style.display = 'inline-block';
        this.htmlElement.style.width = '120px'; 
        this.htmlElement.style.top = '4px';    	

    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }    

}