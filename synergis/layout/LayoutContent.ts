import ContentPane from 'dijit/layout/ContentPane';
import { Uid } from '../util/Uid';

/**
 * implementation of ILayout around a simple div-element
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class LayoutContent implements ILayout {

    readonly dojoElement: ContentPane;
    readonly htmlElement: HTMLDivElement;

    constructor(parent: ILayout, region: string, title: string, style?: string) {

        this.htmlElement = document.createElement('div');
        this.htmlElement.setAttribute('id', 'layout_div_' + Uid.random16());
        parent.getHtmlElement().appendChild(this.htmlElement);

        var dojoElementArgs = {
            region: region,
            title: title,
            style: style,
            splitter: false
        };
        this.dojoElement = new ContentPane(dojoElementArgs, this.htmlElement);

    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }

}