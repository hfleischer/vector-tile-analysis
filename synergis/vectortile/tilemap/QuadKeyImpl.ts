import { IQuadKey } from "./IQuadKey";

export class QuadKeyImpl implements IQuadKey {

    readonly lod: number;
    readonly col: number;
    readonly row: number;

    constructor(lod: number, col: number, row: number) {
        this.lod = lod;
        this.col = col;
        this.row = row;
    }

    getId(): string {
        return 'L' + this.getPadded(this.lod, 2) + '-C' + this.getPadded(this.col, 7) + '-R' + this.getPadded(this.row, 7);
    }

    getPadded(value: number, size: number): string {
        let raw = '0000000000' + value;
        return raw.substr(raw.length - size);
    }

    getLod(): number {
        return this.lod;
    }

    getCol(): number {
        return this.col;
    }

    getRow(): number {
        return this.row;
    }

}