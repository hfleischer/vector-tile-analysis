/**
 * definition for types that describe a tree's icon node<br>
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export interface ITreeIconNode {

    /**
     * get an element, ready to be added to the respective parent element
     */
    getHtmlElement(): HTMLDivElement;

}