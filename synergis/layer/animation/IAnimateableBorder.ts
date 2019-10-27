/**
 * definition for types that implement things which can be drawn with regard to a certain coordinate in the context of<br>
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-views-2d-layers-BaseLayerView2D.html<br>
 * 
 * @author h.fleischer
 * @since 18.10.2019
 */
export interface IAnimateableBorder {

    /**
     * check if this animation has reached it's target
     */
    isDone(): boolean;

    /**
     * sets this animation to animate to the given coordinate, regardless to current state<br>
     * calling this method while the animation is running shall start a new animation starting at the current temporary position
     * @param coord 
     */
    animateTo(coord: number[]): void;

    /**
     * let this instance draw its state<br>
     * for render parameters see https://developers.arcgis.com/javascript/latest/api-reference/esri-views-2d-layers-BaseLayerView2D.html#render
     * @param renderParameters 
     */
    drawTo(renderParameters: any): void;

}