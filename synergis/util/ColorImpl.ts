import { Color } from "./Color";
import { IColor } from "./IColor";

export class ColorImpl implements IColor {

    static readonly HUE_RANGE_DERIVE: number = 0.4;
    static readonly BLEND_WEIGHT_DERIVE: number = 0.6;

    static readonly INDEX_H: number = 0;
    static readonly INDEX_S: number = 1;
    static readonly INDEX_V: number = 2;

    static readonly INDEX_R: number = 0;
    static readonly INDEX_G: number = 1;
    static readonly INDEX_B: number = 2;

    readonly hsv: number[];
    readonly rgb: number[];
    readonly hex: string;

    constructor(hsv: number[]) {
        this.hsv = [hsv[0], hsv[1], hsv[2] ];
        this.rgb = [0, 0, 0];
        Color.hsvToRgb(this.hsv, this.rgb);
        this.hex = this.getHexRgb(this.rgb);
    }

    getHex(): string {
        return this.hex;
    }

    getRgb(): number[] {
        return this.rgb;
    }

    getHexRgb(rgb: number[]): string {
        return '#' + this.getHexChannel(rgb[ColorImpl.INDEX_R]) + this.getHexChannel(rgb[ColorImpl.INDEX_G]) + this.getHexChannel(rgb[ColorImpl.INDEX_B]);
    }

    /**
     * get a hex string from a normalized (0-1) channel value
     * @param channel 
     */
    getHexChannel(channel: number): string { 
        let hex = Number(Math.floor(channel * 255)).toString(16);
        if (hex.length < 2) {
             return "0" + hex;
        } else {
            return hex.substring(0,2);
        }
    };

    deriveInactiveColor(): IColor {
        let derivedHsv: number[] = [ this.hsv[0], this.hsv[1] * 0.5, this.hsv[2] * 0.5 ];
        return new ColorImpl(derivedHsv);
    }

    deriveColor(index: number, total: number): IColor {

        let rBase: number = ColorImpl.BLEND_WEIGHT_DERIVE;
        let rDerived: number = 1 - rBase;

        let fraction: number = index * 1.0 / total;

        //create a color of some hue away of this color
        let derivedHsv: number[] = [ this.hsv[0] + ColorImpl.HUE_RANGE_DERIVE * fraction, 1.0, 0.75 ];
        let derivedRgb: number[] = [];

        //convert to rgb
        Color.hsvToRgb(derivedHsv, derivedRgb);

        //mix that rgb with the base rgb
        for (let i = 0; i < 3; i++) {
            derivedRgb[i] = derivedRgb[i] * rDerived + this.rgb[i] * rBase;
        }

        //back to hsv
        Color.rgbToHsv(derivedRgb, derivedHsv);

        //full saturation
        //derivedHsv[1] = 1
        //derivedHsv[2] = 0.5;

        return new ColorImpl(derivedHsv);

    }


}