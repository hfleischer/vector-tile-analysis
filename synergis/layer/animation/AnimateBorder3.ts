import { AnimateBorderBase } from './AnimateBorderBase';
import { Extent } from 'esri/geometry';

/**
 * 'border 3' --> left lower
 * 
 * @author h.fleischer
 * @since 06.10.2019
 * 
 */
export class AnimateBorder3 extends AnimateBorderBase {

    constructor()  {
        super(Number.MIN_VALUE, Number.MIN_VALUE);
    }

    animateToExtent(extent: Extent): void {
        this.animateTo([extent.xmin, extent.ymin]);
    }

    drawAt(context: any, dispCoord: number[]): void {

        context.moveTo(dispCoord[0] + AnimateBorderBase.dim, dispCoord[1]);
        context.lineTo(dispCoord[0], dispCoord[1]);
        context.lineTo(dispCoord[0], dispCoord[1] - AnimateBorderBase.dim);
        context.stroke();    

    }

}