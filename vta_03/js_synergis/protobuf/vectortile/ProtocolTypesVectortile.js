define(["require", "exports", "../base/decode/ProtocolTypesPrimitives", "./VectortileBuilder", "./VectorTileLayerBuilder", "./VectorTileFeatureBuilder", "./ProtocolTypeGeomType", "./ProtocolTypeCoordinates", "../base/decode/ProtocolTypes", "./value/VectorTileValueBuilder"], function (require, exports, ProtocolTypesPrimitives_1, VectortileBuilder_1, VectorTileLayerBuilder_1, VectorTileFeatureBuilder_1, ProtocolTypeGeomType_1, ProtocolTypeCoordinates_1, ProtocolTypes_1, VectorTileValueBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * type-definitions derived from the mapbox vectortile .proto definition v2.1<br>
     * <a href="https://github.com/mapbox/vector-tile-spec/blob/master/2.1/vector_tile.proto">https://github.com/mapbox/vector-tile-spec/blob/master/2.1/vector_tile.proto</a><br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypesVectortile = /** @class */ (function () {
        function ProtocolTypesVectortile() {
        }
        ProtocolTypesVectortile.init = function () {
            //vectortile
            var protocolTypeVectortile = ProtocolTypes_1.ProtocolTypes.define('vectortile', function () { return new VectortileBuilder_1.VectortileBuilder(); });
            protocolTypeVectortile.defineKey('key_layer', 0x3, ProtocolTypesVectortile.TYPE_UID_________LAYER, function (builder, layer) { return builder.addLayer(layer); });
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesVectortile.TYPE_UID____VECTORTILE] = protocolTypeVectortile;
            //layer
            var protocolTypeLayer = ProtocolTypes_1.ProtocolTypes.define('layer', function () { return new VectorTileLayerBuilder_1.VectorTileLayerBuilder(); });
            protocolTypeLayer.defineKey('key____name', 0x1, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID________STRING, function (builder, name) { return builder.setName(name); });
            protocolTypeLayer.defineKey('key_feature', 0x2, ProtocolTypesVectortile.TYPE_UID_______FEATURE, function (builder, feature) { return builder.addFeature(feature); });
            protocolTypeLayer.defineKey('key_____key', 0x3, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID________STRING, function (builder, key) { return builder.addKey(key); });
            protocolTypeLayer.defineKey('key___value', 0x4, ProtocolTypesVectortile.TYPE_UID_________VALUE, function (builder, value) { return builder.addValue(value); });
            protocolTypeLayer.defineKey('key__extent', 0x5, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID______VARINT32, function (builder, extent) { return builder.setExtent(extent); });
            protocolTypeLayer.defineKey('key_version', 0xF, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID______VARINT32, function (builder, version) { return builder.setVersion(version); });
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesVectortile.TYPE_UID_________LAYER] = protocolTypeLayer;
            //feature
            var protocolTypeFeature = ProtocolTypes_1.ProtocolTypes.define('feature', function () { return new VectorTileFeatureBuilder_1.VectorTileFeatureBuilder(); });
            protocolTypeFeature.defineKey('key_______tags', 0x2, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID_VARINT_PACKED, function (builder, tags) { return builder.setTags(tags); });
            protocolTypeFeature.defineKey('key___geomType', 0x3, ProtocolTypesVectortile.TYPE_UID______GEOMTYPE, function (builder, geomType) { return builder.setGeomType(geomType); });
            protocolTypeFeature.defineKey('key_coordCount', 0x4, ProtocolTypesVectortile.TYPE_UID___COORDINATES, function (builder, coordCount) { return builder.setCoordCount(coordCount); });
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesVectortile.TYPE_UID_______FEATURE] = protocolTypeFeature;
            //value
            var protocolTypeValue = ProtocolTypes_1.ProtocolTypes.define('value', function () { return new VectorTileValueBuilder_1.VectorTileValueBuilder(); });
            protocolTypeValue.defineKey('key_string_value', 0x1, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID________STRING, function (builder, value) { return builder.setStringValue(value); });
            protocolTypeValue.defineKey('key_double_value', 0x3, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID________DOUBLE, function (builder, value) { return builder.setNumberValue(value); });
            protocolTypeValue.defineKey('key___long_value', 0x6, ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.TYPE_UID________SINT64, function (builder, value) { return builder.setNumberValue(value); });
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesVectortile.TYPE_UID_________VALUE] = protocolTypeValue;
            //geometry-type (simple type, instantiate)
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesVectortile.TYPE_UID______GEOMTYPE] = new ProtocolTypeGeomType_1.ProtocolTypeGeomType();
            //coordinates (simple type, instantiate)
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesVectortile.TYPE_UID___COORDINATES] = new ProtocolTypeCoordinates_1.ProtocolTypeCoordinates();
        };
        ProtocolTypesVectortile.TYPE_UID____VECTORTILE = '3f90b28b-47f2-4fb2-bc9a-4fc2dc215391';
        ProtocolTypesVectortile.TYPE_UID_________LAYER = '9b929e51-4ff0-40d2-a2cf-0ac24c32a9be';
        ProtocolTypesVectortile.TYPE_UID_______FEATURE = '97214e89-2b50-4fd6-a00b-64d16157e256';
        ProtocolTypesVectortile.TYPE_UID______GEOMTYPE = 'd2fce946-fa43-4061-a2b2-2b4d83e99daf';
        ProtocolTypesVectortile.TYPE_UID___COORDINATES = '8beff4cc-64ad-4d21-be1e-0de0b0ec7964';
        ProtocolTypesVectortile.TYPE_UID_________VALUE = 'c9ddfb0f-ca02-4e0b-b1ed-6437e49b87f8';
        return ProtocolTypesVectortile;
    }());
    exports.ProtocolTypesVectortile = ProtocolTypesVectortile;
});
