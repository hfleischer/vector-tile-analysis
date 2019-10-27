import { AnimateBorderBase } from './AnimateBorderBase';
import { Extent } from 'esri/geometry';

/**
 * 'border 1' --> right upper
 * 
 * @author h.fleischer
 * @since 06.10.2019
 * 
 */
export class AnimateBorder1 extends AnimateBorderBase {

    constructor()  {
        super(Number.MAX_VALUE, Number.MAX_VALUE);
    }

    animateToExtent(extent: Extent): void {
        this.animateTo([extent.xmax, extent.ymax])
    }

    drawAt(context: any, dispCoord: number[]): void {

        context.moveTo(dispCoord[0] - AnimateBorderBase.dim, dispCoord[1]);
        context.lineTo(dispCoord[0], dispCoord[1]);
        context.lineTo(dispCoord[0], dispCoord[1] + AnimateBorderBase.dim);
        context.stroke();    

    }

}