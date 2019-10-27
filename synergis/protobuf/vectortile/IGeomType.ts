import { IDataType } from "../../vectortile/data/IDataType";

/**
 * definition for types holding geometry-type information
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export interface IGeomType {

    getName(): string;

    getDataType(): IDataType;

}