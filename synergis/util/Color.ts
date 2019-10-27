import { ColorImpl } from "./ColorImpl";
import { IColor } from "./IColor";

/**
 * utility type for parsing / providing / conerting colors<br>
 * 
 * @author h.fleischer
 * @since 10.10.2019
 */
export class Color {

    static readonly HUE_STEP_LAYER: number = 0.20;

    //initial tile color
    static readonly tileHsv: number[] = [ Math.random(), 1, 1 ];

    static nextLayerColor(): IColor {
        Color.tileHsv[0] += Color.HUE_STEP_LAYER + (0.5 - Math.random()) * 0.1;
        return new ColorImpl([ Color.tileHsv[0], Color.tileHsv[1], Color.tileHsv[2] ]);
    }

    static white(): IColor {
        return new ColorImpl([1, 0, 1]);
    }

    static parseHex(hex: string): IColor {
        //console.log('hex', hex);
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var rgb: number[] = [];
        rgb[0] = parseInt(result[1], 16) / 255;
        rgb[1] = parseInt(result[2], 16) / 255;
        rgb[2] = parseInt(result[3], 16) / 255;
        var hsv: number[] = [0, 0, 0];
        Color.rgbToHsv(rgb, hsv);
        let color: IColor = new ColorImpl(hsv);
        //console.log('color', color);
        return color;
    }

    /**
     * convert a normalized (0-1) hsv (hue-saturation-value) color to a normalized (0-1) rgb (red-green-bluea) color<br>
     * rather then returning a value this method stores the result in the given rgb parameter, this is to enable caller to re-use the same object and reduce allocation pressure during conversion<br>
     *
     * @param hsv the hsv "in" params
     * @param rgb the rgb "out" params
     */
    static hsvToRgb(hsv: number[], rgb: number[]): void {

        if (hsv[ColorImpl.INDEX_S] == 0) {

            rgb[ColorImpl.INDEX_R] = rgb[ColorImpl.INDEX_G] = rgb[ColorImpl.INDEX_B] = hsv[ColorImpl.INDEX_V];

        } else {

            let a: number = (hsv[ColorImpl.INDEX_H] - Math.floor(hsv[ColorImpl.INDEX_H])) * 6.0;
            let f: number = a - Math.floor(a);
            let p: number = hsv[ColorImpl.INDEX_V] * (1.0 - hsv[ColorImpl.INDEX_S]);
            let q: number = hsv[ColorImpl.INDEX_V] * (1.0 - hsv[ColorImpl.INDEX_S] * f);
            let t: number = hsv[ColorImpl.INDEX_V] * (1.0 - hsv[ColorImpl.INDEX_S] * (1.0 - f));

            switch (Math.floor(a)) {
            case 0:
                rgb[ColorImpl.INDEX_R] = hsv[ColorImpl.INDEX_V];
                rgb[ColorImpl.INDEX_G] = t;
                rgb[ColorImpl.INDEX_B] = p;
                break;
            case 1:
                rgb[ColorImpl.INDEX_R] = q;
                rgb[ColorImpl.INDEX_G] = hsv[ColorImpl.INDEX_V];
                rgb[ColorImpl.INDEX_B] = p;
                break;
            case 2:
                rgb[ColorImpl.INDEX_R] = p;
                rgb[ColorImpl.INDEX_G] = hsv[ColorImpl.INDEX_V];
                rgb[ColorImpl.INDEX_B] = t;
                break;
            case 3:
                rgb[ColorImpl.INDEX_R] = p;
                rgb[ColorImpl.INDEX_G] = q;
                rgb[ColorImpl.INDEX_B] = hsv[ColorImpl.INDEX_V];
                break;
            case 4:
                rgb[ColorImpl.INDEX_R] = t;
                rgb[ColorImpl.INDEX_G] = p;
                rgb[ColorImpl.INDEX_B] = hsv[ColorImpl.INDEX_V];
                break;
            case 5:
                rgb[ColorImpl.INDEX_R] = hsv[ColorImpl.INDEX_V];
                rgb[ColorImpl.INDEX_G] = p;
                rgb[ColorImpl.INDEX_B] = q;
                break;
            }

        }

    }

    static rgbToHsv(rgb: number[], hsv: number[]): void {

        let r_replace: number = rgb[ColorImpl.INDEX_R];
        let g_replace: number = rgb[ColorImpl.INDEX_G];
        let b_replace: number = rgb[ColorImpl.INDEX_B];

        let h: number;
        let s: number;
        let v: number;

        let cmax: number = r_replace > g_replace ? r_replace : g_replace;
        if (b_replace > cmax) {
            cmax = b_replace;
        }

        let cmin: number = r_replace < g_replace ? r_replace : g_replace;
        if (b_replace < cmin) {
            cmin = b_replace;
        }

        v = cmax;
        if (cmax != 0) {
            s = (cmax - cmin) / cmax;
        } else {
            s = 0;
        }

        if (s == 0) {
            h = 0;
        } else {

            let rc: number = (cmax - r_replace) / (cmax - cmin);
            let gc: number = (cmax - g_replace) / (cmax - cmin);
            let bc: number = (cmax - b_replace) / (cmax - cmin);

            if (r_replace == cmax) {
                h = bc - gc;
            } else if (g_replace == cmax) {
                h = 2.0 + rc - bc;
            } else {
                h = 4.0 + gc - rc;
            }

            h = h / 6.0;
            if (h < 0) {
                h = h + 1.0;
            }

        }

        hsv[0] = h;
        hsv[1] = s;
        hsv[2] = v;

    }

}