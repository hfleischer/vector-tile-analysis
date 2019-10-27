define(["require", "exports", "./VectorTileLayer", "./value/ValueLookupImpl"], function (require, exports, VectorTileLayer_1, ValueLookupImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITypeBuilder usable while deserializing a VectorTileLayer from an encoded vectortile<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectorTileLayerBuilder = /** @class */ (function () {
        function VectorTileLayerBuilder() {
            this.features = [];
            this.keys = [];
            this.values = [];
        }
        VectorTileLayerBuilder.prototype.setByteCount = function (byteCount) {
            this.byteCount = byteCount;
            return this;
        };
        VectorTileLayerBuilder.prototype.setName = function (name) {
            this.name = name;
            return this;
        };
        VectorTileLayerBuilder.prototype.addFeature = function (feature) {
            this.features.push(feature);
            return this;
        };
        VectorTileLayerBuilder.prototype.addKey = function (key) {
            this.keys.push(key);
            return this;
        };
        VectorTileLayerBuilder.prototype.addValue = function (value) {
            this.values.push(value);
            return this;
        };
        VectorTileLayerBuilder.prototype.setExtent = function (extent) {
            this.extent = extent;
            return this;
        };
        VectorTileLayerBuilder.prototype.setVersion = function (version) {
            this.version = version;
            return this;
        };
        VectorTileLayerBuilder.prototype.build = function () {
            var valueLookup = new ValueLookupImpl_1.ValueLookupImpl(this.keys, this.values);
            this.features.forEach(function (feature) {
                feature.valueLookup = valueLookup;
            });
            return new VectorTileLayer_1.VectorTileLayer(this.byteCount, this.name, this.features, this.keys, this.values, this.extent, this.version, valueLookup);
        };
        return VectorTileLayerBuilder;
    }());
    exports.VectorTileLayerBuilder = VectorTileLayerBuilder;
});
