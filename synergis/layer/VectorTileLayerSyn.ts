import VectorTileLayer from 'esri/layers/VectorTileLayer';
import { IColoredLayer } from './IColoredLayer';
import { IColor } from '../util/IColor';

/**
 * extension of arcgis vectortile layer, adding the IColoredLayer functionality
 * 
 * @author h.fleischer
 * @since 05.10.2019
 */
export class VectorTileLayerSyn extends VectorTileLayer implements IColoredLayer { 

    readonly color: IColor;

    constructor(vectorTileLayerProps: Object, color: IColor) {
        super(vectorTileLayerProps);
        this.color = color;
    }

    getColor(): IColor {
        return this.color;
    }

}