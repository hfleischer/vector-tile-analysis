define(["require", "exports", "../../util/Uid"], function (require, exports, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Layer type deserialized from an encoded vectortile<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var Vectortile = /** @class */ (function () {
        function Vectortile(byteCount, layers) {
            this.uid = Uid_1.Uid.random16();
            this.byteCount = byteCount;
            this.layers = layers;
        }
        return Vectortile;
    }());
    exports.Vectortile = Vectortile;
});
