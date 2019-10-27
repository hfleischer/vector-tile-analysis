import TabContainer from 'dijit/layout/TabContainer';
import { Uid } from '../util/Uid';

/**
 * implementation of ILayout around a dojo-tab-container
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class LayoutTabs implements ILayout {

    readonly dojoElement: TabContainer;
    readonly htmlElement: HTMLDivElement;

    constructor(parent: ILayout, region: string, title: string, style?: string) {

        this.htmlElement = document.createElement('div');
        this.htmlElement.setAttribute('id', 'layout_div_tabs_' + Uid.random16());
        parent.getHtmlElement().appendChild(this.htmlElement);

        var dojoElementArgs = {
            region: region,
            title: title,
            style: style,
            splitter: true
        };
        this.dojoElement = new TabContainer(dojoElementArgs, this.htmlElement);

    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }

}