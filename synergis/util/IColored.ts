import { IColor } from "./IColor";

/**
 * definition for types that have a unique color<br>
 * 
 * @author h.fleischer
 * @since  18.10.2019
 */
export interface IColored {

    getColor(): IColor;

}