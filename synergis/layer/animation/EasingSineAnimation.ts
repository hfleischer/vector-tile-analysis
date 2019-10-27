import { IAnimation } from "./IAnimation";

export class EasingSineAnimation implements IAnimation {

    readonly start: number;
    readonly duration: number;

    constructor(duration: number) {
        this.start = new Date().getTime() + 1000 + Math.random() * 250;
        this.duration = duration; //a time in milliseconds
    }

    getFraction(): number {

        let elapsed: number = new Date().getTime() - this.start; //ms
        let timeFraction: number = elapsed / this.duration; //0 to 1+

        //fully done
        if (timeFraction < 0) {
            return 0;
        }
        if (timeFraction > 1) {
            return 1;
        }
        //return timeFraction;

        let fraction: number = timeFraction * Math.PI; //0 to PI
        fraction = Math.cos(fraction); //1 to -1
        fraction *= -1; //-1 to 1
        fraction += 1; //0 to 2
        fraction *= 0.5 //0 to 1
        return fraction;

    }

}