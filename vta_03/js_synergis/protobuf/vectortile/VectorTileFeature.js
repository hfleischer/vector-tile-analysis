define(["require", "exports", "./value/VectorTileValueEmpty"], function (require, exports, VectorTileValueEmpty_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Feature type deserialized from an encoded vectortile<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectorTileFeature = /** @class */ (function () {
        function VectorTileFeature(byteCount, tags, geomType, coordCount) {
            this.byteCount = byteCount;
            this.tags = tags;
            this.geomType = geomType;
            this.coordCount = coordCount;
        }
        /**
         * try to resolve a key-index from this instance's value-lookup<br>
         * if such a key-index is found, try to find an even indexed tag having that key-value<br>
         * if such a tag is found return the subsequent odd tag-index (which is pointing to a value in this instance's value-lookup)<br>
         * @param key
         */
        VectorTileFeature.prototype.getValuePointer = function (key) {
            var keyPointer = this.valueLookup.getKeyPointer(key); //check if this key resolves to a key index
            if (keyPointer >= 0) {
                //check if the resolved key index resolves to a tag withing this feature, if so, that index then points into the layers values
                for (var tagIndex = 0; tagIndex < this.tags.length; tagIndex += 2) {
                    if (this.tags[tagIndex] == keyPointer) {
                        return this.tags[tagIndex + 1];
                    }
                }
            }
            return -1;
        };
        /**
         * try to resolve a value-pointer from the given key<br>
         * if such a pointer is found, get the associated value, if any, from this instance's value-llokup
         * @param key
         */
        VectorTileFeature.prototype.getValue = function (key) {
            var valuePointer = this.getValuePointer(key);
            if (valuePointer >= 0) {
                return this.valueLookup.getValue(valuePointer);
            }
            else {
                return new VectorTileValueEmpty_1.VectorTileValueEmpty();
            }
        };
        /**
         * resolve the feature's value for the given value, then compare that value to the given value
         * @param key
         * @param value
         */
        VectorTileFeature.prototype.hasValue = function (key, value) {
            return this.getValue(key).getValue() === value.getValue();
        };
        return VectorTileFeature;
    }());
    exports.VectorTileFeature = VectorTileFeature;
});
