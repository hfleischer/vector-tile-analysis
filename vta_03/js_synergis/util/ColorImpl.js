define(["require", "exports", "./Color"], function (require, exports, Color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColorImpl = /** @class */ (function () {
        function ColorImpl(hsv) {
            this.hsv = [hsv[0], hsv[1], hsv[2]];
            this.rgb = [0, 0, 0];
            Color_1.Color.hsvToRgb(this.hsv, this.rgb);
            this.hex = this.getHexRgb(this.rgb);
        }
        ColorImpl.prototype.getHex = function () {
            return this.hex;
        };
        ColorImpl.prototype.getRgb = function () {
            return this.rgb;
        };
        ColorImpl.prototype.getHexRgb = function (rgb) {
            return '#' + this.getHexChannel(rgb[ColorImpl.INDEX_R]) + this.getHexChannel(rgb[ColorImpl.INDEX_G]) + this.getHexChannel(rgb[ColorImpl.INDEX_B]);
        };
        /**
         * get a hex string from a normalized (0-1) channel value
         * @param channel
         */
        ColorImpl.prototype.getHexChannel = function (channel) {
            var hex = Number(Math.floor(channel * 255)).toString(16);
            if (hex.length < 2) {
                return "0" + hex;
            }
            else {
                return hex.substring(0, 2);
            }
        };
        ;
        ColorImpl.prototype.deriveInactiveColor = function () {
            var derivedHsv = [this.hsv[0], this.hsv[1] * 0.5, this.hsv[2] * 0.5];
            return new ColorImpl(derivedHsv);
        };
        ColorImpl.prototype.deriveColor = function (index, total) {
            var rBase = ColorImpl.BLEND_WEIGHT_DERIVE;
            var rDerived = 1 - rBase;
            var fraction = index * 1.0 / total;
            //create a color of some hue away of this color
            var derivedHsv = [this.hsv[0] + ColorImpl.HUE_RANGE_DERIVE * fraction, 1.0, 0.75];
            var derivedRgb = [];
            //convert to rgb
            Color_1.Color.hsvToRgb(derivedHsv, derivedRgb);
            //mix that rgb with the base rgb
            for (var i = 0; i < 3; i++) {
                derivedRgb[i] = derivedRgb[i] * rDerived + this.rgb[i] * rBase;
            }
            //back to hsv
            Color_1.Color.rgbToHsv(derivedRgb, derivedHsv);
            //full saturation
            //derivedHsv[1] = 1
            //derivedHsv[2] = 0.5;
            return new ColorImpl(derivedHsv);
        };
        ColorImpl.HUE_RANGE_DERIVE = 0.4;
        ColorImpl.BLEND_WEIGHT_DERIVE = 0.6;
        ColorImpl.INDEX_H = 0;
        ColorImpl.INDEX_S = 1;
        ColorImpl.INDEX_V = 2;
        ColorImpl.INDEX_R = 0;
        ColorImpl.INDEX_G = 1;
        ColorImpl.INDEX_B = 2;
        return ColorImpl;
    }());
    exports.ColorImpl = ColorImpl;
});
