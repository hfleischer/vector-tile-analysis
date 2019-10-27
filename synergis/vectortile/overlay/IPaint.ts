import { ITreeDataProvider } from "../dataprovider/ITreeDataProvider";
import { IColor } from "../../util/IColor";
import { IDisplayable } from "../../util/IDisplayable";

/**
 * definition for types that resemble a mapbox spec'd style (a fill/line/point/...)
 * 
 * @author h.fleischer
 * @since 05.10.2019
 */
export interface IPaint extends ITreeDataProvider, IDisplayable { 

    /**
     * get this instance's id
     */
    getId(): string;

    /**
     * set radius, line-width as suitable
     * @param dimension
     */
    setDimension(dimension: number): void;

    /**
     * get the radius, line-width as suitable
     */
    getDimension(): number;

    /**
     * set the opacity in the underlying paint instance, as suitable for this instance (fill-opacity, ...)
     * @param opacity 
     */
    setOpacity(opacity: number): void;

    /**
     * get the current opacity setting of this paint
     */
    getOpacity(): number;

    /**
     * get the current color of this paint
     */
    getColor(): IColor;

    /**
     * apply the given color as suitable for this instance (fill-color, line-color, ...)
     * @param color 
     */
    setColor(color: IColor): void;

    /**
     * render the current visibility (considering paint-set visibility)
     */
    renderVisibility(): void;

    /**
     * get a mapbox style object
     */
    getStyleLayer(): Object;

}