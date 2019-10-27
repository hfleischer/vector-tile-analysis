import Layer from 'esri/layers/Layer';

import { IColor } from '../util/IColor';
import { IColored } from '../util/IColored';

/**
 * extension to an arcgis-layer combined with the IColored interface
 * 
 * @author h.fleischer
 * @since 05.10.2019
 */
export interface IColoredLayer extends Layer, IColored {

}