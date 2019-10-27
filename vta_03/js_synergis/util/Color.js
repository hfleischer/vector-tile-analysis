define(["require", "exports", "./ColorImpl"], function (require, exports, ColorImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * utility type for parsing / providing / conerting colors<br>
     *
     * @author h.fleischer
     * @since 10.10.2019
     */
    var Color = /** @class */ (function () {
        function Color() {
        }
        Color.nextLayerColor = function () {
            Color.tileHsv[0] += Color.HUE_STEP_LAYER + (0.5 - Math.random()) * 0.1;
            return new ColorImpl_1.ColorImpl([Color.tileHsv[0], Color.tileHsv[1], Color.tileHsv[2]]);
        };
        Color.white = function () {
            return new ColorImpl_1.ColorImpl([1, 0, 1]);
        };
        Color.parseHex = function (hex) {
            //console.log('hex', hex);
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            var rgb = [];
            rgb[0] = parseInt(result[1], 16) / 255;
            rgb[1] = parseInt(result[2], 16) / 255;
            rgb[2] = parseInt(result[3], 16) / 255;
            var hsv = [0, 0, 0];
            Color.rgbToHsv(rgb, hsv);
            var color = new ColorImpl_1.ColorImpl(hsv);
            //console.log('color', color);
            return color;
        };
        /**
         * convert a normalized (0-1) hsv (hue-saturation-value) color to a normalized (0-1) rgb (red-green-bluea) color<br>
         * rather then returning a value this method stores the result in the given rgb parameter, this is to enable caller to re-use the same object and reduce allocation pressure during conversion<br>
         *
         * @param hsv the hsv "in" params
         * @param rgb the rgb "out" params
         */
        Color.hsvToRgb = function (hsv, rgb) {
            if (hsv[ColorImpl_1.ColorImpl.INDEX_S] == 0) {
                rgb[ColorImpl_1.ColorImpl.INDEX_R] = rgb[ColorImpl_1.ColorImpl.INDEX_G] = rgb[ColorImpl_1.ColorImpl.INDEX_B] = hsv[ColorImpl_1.ColorImpl.INDEX_V];
            }
            else {
                var a = (hsv[ColorImpl_1.ColorImpl.INDEX_H] - Math.floor(hsv[ColorImpl_1.ColorImpl.INDEX_H])) * 6.0;
                var f = a - Math.floor(a);
                var p = hsv[ColorImpl_1.ColorImpl.INDEX_V] * (1.0 - hsv[ColorImpl_1.ColorImpl.INDEX_S]);
                var q = hsv[ColorImpl_1.ColorImpl.INDEX_V] * (1.0 - hsv[ColorImpl_1.ColorImpl.INDEX_S] * f);
                var t = hsv[ColorImpl_1.ColorImpl.INDEX_V] * (1.0 - hsv[ColorImpl_1.ColorImpl.INDEX_S] * (1.0 - f));
                switch (Math.floor(a)) {
                    case 0:
                        rgb[ColorImpl_1.ColorImpl.INDEX_R] = hsv[ColorImpl_1.ColorImpl.INDEX_V];
                        rgb[ColorImpl_1.ColorImpl.INDEX_G] = t;
                        rgb[ColorImpl_1.ColorImpl.INDEX_B] = p;
                        break;
                    case 1:
                        rgb[ColorImpl_1.ColorImpl.INDEX_R] = q;
                        rgb[ColorImpl_1.ColorImpl.INDEX_G] = hsv[ColorImpl_1.ColorImpl.INDEX_V];
                        rgb[ColorImpl_1.ColorImpl.INDEX_B] = p;
                        break;
                    case 2:
                        rgb[ColorImpl_1.ColorImpl.INDEX_R] = p;
                        rgb[ColorImpl_1.ColorImpl.INDEX_G] = hsv[ColorImpl_1.ColorImpl.INDEX_V];
                        rgb[ColorImpl_1.ColorImpl.INDEX_B] = t;
                        break;
                    case 3:
                        rgb[ColorImpl_1.ColorImpl.INDEX_R] = p;
                        rgb[ColorImpl_1.ColorImpl.INDEX_G] = q;
                        rgb[ColorImpl_1.ColorImpl.INDEX_B] = hsv[ColorImpl_1.ColorImpl.INDEX_V];
                        break;
                    case 4:
                        rgb[ColorImpl_1.ColorImpl.INDEX_R] = t;
                        rgb[ColorImpl_1.ColorImpl.INDEX_G] = p;
                        rgb[ColorImpl_1.ColorImpl.INDEX_B] = hsv[ColorImpl_1.ColorImpl.INDEX_V];
                        break;
                    case 5:
                        rgb[ColorImpl_1.ColorImpl.INDEX_R] = hsv[ColorImpl_1.ColorImpl.INDEX_V];
                        rgb[ColorImpl_1.ColorImpl.INDEX_G] = p;
                        rgb[ColorImpl_1.ColorImpl.INDEX_B] = q;
                        break;
                }
            }
        };
        Color.rgbToHsv = function (rgb, hsv) {
            var r_replace = rgb[ColorImpl_1.ColorImpl.INDEX_R];
            var g_replace = rgb[ColorImpl_1.ColorImpl.INDEX_G];
            var b_replace = rgb[ColorImpl_1.ColorImpl.INDEX_B];
            var h;
            var s;
            var v;
            var cmax = r_replace > g_replace ? r_replace : g_replace;
            if (b_replace > cmax) {
                cmax = b_replace;
            }
            var cmin = r_replace < g_replace ? r_replace : g_replace;
            if (b_replace < cmin) {
                cmin = b_replace;
            }
            v = cmax;
            if (cmax != 0) {
                s = (cmax - cmin) / cmax;
            }
            else {
                s = 0;
            }
            if (s == 0) {
                h = 0;
            }
            else {
                var rc = (cmax - r_replace) / (cmax - cmin);
                var gc = (cmax - g_replace) / (cmax - cmin);
                var bc = (cmax - b_replace) / (cmax - cmin);
                if (r_replace == cmax) {
                    h = bc - gc;
                }
                else if (g_replace == cmax) {
                    h = 2.0 + rc - bc;
                }
                else {
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
        };
        Color.HUE_STEP_LAYER = 0.20;
        //initial tile color
        Color.tileHsv = [Math.random(), 1, 1];
        return Color;
    }());
    exports.Color = Color;
});
