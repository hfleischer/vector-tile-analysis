import BorderContainer from 'dijit/layout/BorderContainer';
import Toolbar from 'dijit/Toolbar';
import { Uid } from '../util/Uid';

/**
 * implementation of ILayout around a dojo-toolbar
 * 
 * @author h.fleischer
 * @since 17.09.2019
 *  
 */
export class LayoutToolbar implements ILayout {

    readonly dojoElement: Toolbar;
    readonly htmlElement: HTMLDivElement;

    constructor(parent: ILayout, region: string, title: string, style?: string) {

        this.htmlElement = document.createElement('div');
        this.htmlElement.setAttribute('id', 'layout_div_toolbar_' + Uid.random16());
        parent.getHtmlElement().appendChild(this.htmlElement);

        var dojoElementArgs = {
            region: region,
            title: title,
            style: style,
            splitter: false
        };
        this.dojoElement = new Toolbar(dojoElementArgs, this.htmlElement);

    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }

}