import { IQuadLevel } from "./IQuadLevel";

export class QuadLevelImpl implements IQuadLevel {

    readonly level: number;
    readonly origin: number[];
    readonly norm: number[];

    constructor(level: number, origin: number[], norm: number[]) {
        this.level = level;
        this.origin = origin;
        this.norm = norm;
    }

    getOrigin(): number[] {
        return this.origin;
    }

    getNorm(): number[] {
        return this.norm;
    }

}