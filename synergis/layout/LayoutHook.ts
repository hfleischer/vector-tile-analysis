import ContentPane from 'dijit/layout/ContentPane';

/**
 * implementation of ILayout used to "hook" an entire layout to an existing div element in the content<br>
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class LayoutHook implements ILayout {

    readonly dojoElement: ContentPane;
    readonly htmlElement: HTMLDivElement;

    constructor(htmlElementId: string) {
        this.htmlElement = <HTMLDivElement> document.getElementById(htmlElementId);
        this.dojoElement = new ContentPane({}, this.htmlElement);
    }

    startup(): void {
        this.dojoElement.startup();
    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }

}