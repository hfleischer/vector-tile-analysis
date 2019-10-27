import { IAnimateableBorder } from './IAnimateableBorder';
import { IAnimation } from './IAnimation';
import { EasingSineAnimation } from './EasingSineAnimation';
import { IColor } from '../../util/IColor';
import { Extent } from 'esri/geometry';

export abstract class AnimateBorderBase implements IAnimateableBorder {

    static dim: number = 50;
    readonly color: IColor;
    animation: IAnimation;

    origCoord: number[]; //the starting point of the animation
    destCoord: number[]; //the destination point of the animation
    currCoord: number[];

    constructor(x: number, y: number) {
        this.origCoord = [0, 0];
        this.currCoord = [x, y];
    }

    isDone(): boolean {
        if (this.animation != null) {
            return this.animation.getFraction() >= 1;
        }
        return true; //no animation defined yet
    }

    abstract animateToExtent(extent: Extent): void;

    animateTo(coord: number[]): void {
        this.destCoord = coord;
        this.origCoord = this.currCoord;
        this.animation = new EasingSineAnimation(250 + Math.random() * 100);
    }

    getCurrCoord(): number[] {

        let fraction: number = this.animation.getFraction(); //get the fraction into the animation
        if (fraction < 1) {
            let x: number = this.origCoord[0] + (this.destCoord[0] - this.origCoord[0]) * fraction;
            let y: number = this.origCoord[1] + (this.destCoord[1] - this.origCoord[1]) * fraction;
            return [x, y];
        } else {
            this.origCoord = this.destCoord;
            return this.destCoord;
        }

    }

    drawTo(renderParameters: any) {

        let state = renderParameters.state;
        let context = renderParameters.context;

        //get and store the current coordinate
        this.currCoord = this.getCurrCoord();

        //convert to a display coordinate
        let dispCoord: number[] = [];
        state.toScreenNoRotation(dispCoord, this.currCoord[0], this.currCoord[1]);

        //let subclass draw at that screen coordinate
        //context.strokeStyle = this.color.getHex();
        this.drawAt(context, dispCoord);

    }

    abstract drawAt(context: any, dispCoord: number[]): void;

}