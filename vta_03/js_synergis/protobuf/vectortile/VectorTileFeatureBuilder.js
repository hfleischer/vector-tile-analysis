define(["require", "exports", "./VectorTileFeature"], function (require, exports, VectorTileFeature_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITypeBuilder for deserializing a Feature from an encoded vectortile<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var VectorTileFeatureBuilder = /** @class */ (function () {
        function VectorTileFeatureBuilder() {
            this.tags = []; //be sure to at least have an empty array
        }
        VectorTileFeatureBuilder.prototype.setByteCount = function (byteCount) {
            this.byteCount = byteCount;
            return this;
        };
        VectorTileFeatureBuilder.prototype.setTags = function (tags) {
            this.tags = tags;
            return this;
        };
        VectorTileFeatureBuilder.prototype.setGeomType = function (geomType) {
            this.geomType = geomType;
            return this;
        };
        VectorTileFeatureBuilder.prototype.setCoordCount = function (coordCount) {
            this.coordCount = coordCount;
            return this;
        };
        VectorTileFeatureBuilder.prototype.build = function () {
            return new VectorTileFeature_1.VectorTileFeature(this.byteCount, this.tags, this.geomType, this.coordCount);
        };
        return VectorTileFeatureBuilder;
    }());
    exports.VectorTileFeatureBuilder = VectorTileFeatureBuilder;
});
