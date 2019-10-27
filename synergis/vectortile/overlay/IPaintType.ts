import { Extent } from 'esri/geometry';

import { IPaint } from './IPaint';
import { IPaintSet } from './IPaintSet';
import { ILayerSet } from '../../layer/ILayerSet';


/**
 * definition of 'paint-types' like a fill-type which may hold paints for fill, outline, and vertices, while a point-type may only have a single paint for vertices
 * 
 * @author h.fleischer
 * @since 05.10.2019
 */
export interface IPaintType {

    /**
     * create paints as suitable for this paint-type
     * @param sourceLayer
     * @param color 
     * @param filter 
     */
    createPaints(layerSet: ILayerSet, paintSet: IPaintSet): IPaint[]; 

}