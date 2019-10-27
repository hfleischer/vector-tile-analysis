import { AnimateBorderBase } from './AnimateBorderBase';
import { Extent } from 'esri/geometry';

/**
 * 'border 2' --> right lower
 * 
 * @author h.fleischer
 * @since 06.10.2019
 * 
 */
export class AnimateBorder2 extends AnimateBorderBase {

    constructor()  {
        super(Number.MAX_VALUE, Number.MIN_VALUE);
    }

    animateToExtent(extent: Extent): void {
        this.animateTo([extent.xmax, extent.ymin])
    }

    drawAt(context: any, dispCoord: number[]): void {

        context.moveTo(dispCoord[0], dispCoord[1] - AnimateBorderBase.dim);
        context.lineTo(dispCoord[0], dispCoord[1]);
        context.lineTo(dispCoord[0] - AnimateBorderBase.dim, dispCoord[1]);
        context.stroke();    

    }

}