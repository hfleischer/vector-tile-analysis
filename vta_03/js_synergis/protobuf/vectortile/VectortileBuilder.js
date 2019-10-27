define(["require", "exports", "./Vectortile"], function (require, exports, Vectortile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITypeBuilder usable while deserializing an Vectortile from an encoded vectortile<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectortileBuilder = /** @class */ (function () {
        function VectortileBuilder() {
            this.layers = [];
        }
        VectortileBuilder.prototype.setByteCount = function (byteCount) {
            this.byteCount = byteCount;
            return this;
        };
        VectortileBuilder.prototype.addLayer = function (layer) {
            this.layers.push(layer);
            return this;
        };
        VectortileBuilder.prototype.build = function () {
            return new Vectortile_1.Vectortile(this.byteCount, this.layers);
        };
        return VectortileBuilder;
    }());
    exports.VectortileBuilder = VectortileBuilder;
});
