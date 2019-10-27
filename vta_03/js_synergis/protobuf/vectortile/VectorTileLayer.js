define(["require", "exports", "./GeomType"], function (require, exports, GeomType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Layer type deserialized from an encoded vectortile<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectorTileLayer = /** @class */ (function () {
        function VectorTileLayer(byteCount, name, features, keys, values, extent, version, valueLookup) {
            this.byteCount = byteCount;
            this.name = name;
            this.features = features;
            this.keys = keys;
            this.values = values;
            this.extent = extent;
            this.version = version;
            this.valueLookup = valueLookup;
        }
        /**
         * get all features that provide the given value for the given key<br>
         * i.e. all features that have a specific value for the '_symbol' key<br>
         * @param filterKey
         * @param value
         */
        VectorTileLayer.prototype.getFeatures = function (filterKey, value) {
            var results = [];
            for (var i = 0; i < this.features.length; i++) {
                var feature = this.features[i];
                if (feature.hasValue(filterKey, value)) {
                    results.push(feature);
                }
            }
            return results;
        };
        VectorTileLayer.prototype.getValueSet = function (key) {
            var helperSet = new Set();
            var valueSet = [];
            for (var i = 0; i < this.features.length; i++) {
                var value = this.features[i].getValue(key);
                if (value != null && !value.isEmpty() && !helperSet.has(value.getValue())) {
                    helperSet.add(value.getValue());
                    valueSet.push(value);
                }
            }
            return valueSet;
        };
        VectorTileLayer.prototype.getVertexCount = function () {
            var vertexCount = 0;
            for (var i = 0; i < this.features.length; i++) {
                vertexCount += this.features[i].coordCount;
            }
            return vertexCount;
        };
        VectorTileLayer.prototype.getGeometryType = function () {
            if (this.features.length > 0) {
                return this.features[0].geomType;
            }
            else {
                return GeomType_1.GeomType.get(GeomType_1.GeomType.INDEX____UNKNOWN);
            }
        };
        return VectorTileLayer;
    }());
    exports.VectorTileLayer = VectorTileLayer;
});
