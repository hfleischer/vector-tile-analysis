/**
 * definition for types that hold a color value<br>
 * the color shall be able to derive similar colors around the hue color-model<br>
 * 
 * @author h.fleischer
 * @since 05.10.2019
 */
export interface IColor {

    /**
     * get this color value as hex string ready to be applied i.e. to a style, eample: '#00FF00'
     */
    getHex(): string;

    /**
     * get this color as rgb number array, the single channels come in the range 0-1, 0 being "no-value", 1 being "full-value"
     */
    getRgb(): number[];

    deriveInactiveColor(): IColor;

    deriveColor(index: number, total: number): IColor;

}