import BorderContainer from 'dijit/layout/BorderContainer';
import { Uid } from '../util/Uid';

/**
 * implementation of ILayout around a dojo BorderContainer element<br>
 * 
 * @author h.fleischer
 * @since 10.09.2019
 */
export class LayoutBorder implements ILayout {

    static readonly TOP: string = 'top';
    static readonly CENTER: string = 'center';
    static readonly BOTTOM: string = 'bottom';
    static readonly RIGHT: string = 'right';
    static readonly LEFT: string = 'left';

    readonly dojoElement: BorderContainer;
    readonly htmlElement: HTMLDivElement;

    constructor(parent: ILayout, region: string, title: string, style?: string) {

        this.htmlElement = document.createElement('div');
        this.htmlElement.setAttribute('id', 'layout_div_' + Uid.random16());
        parent.getHtmlElement().appendChild(this.htmlElement);

        var dojoElementArgs = {
            region: region,
            title: title,
            gutters: false,
            liveSplitters: true,
            style: style,
            splitter: false
        };
        this.dojoElement = new BorderContainer(dojoElementArgs, this.htmlElement);

    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }

}