define(["require", "exports", "../util/ByteLoader", "../protobuf/base/source/CodedInputStream", "../protobuf/base/source/SubSource", "../protobuf/base/decode/ProtocolTypes", "../protobuf/vectortile/ProtocolTypesVectortile"], function (require, exports, ByteLoader_1, CodedInputStream_1, SubSource_1, ProtocolTypes_1, ProtocolTypesVectortile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var promiseUtils = require('esri/core/promiseUtils');
    /**
     * helper for loading VectorTiles, decoding it from the bytes provided by a ByteLoader
     *
     * @author h.fleischer
     * @since 12.10.2019
     *
     */
    var VectorTileLoader = /** @class */ (function () {
        function VectorTileLoader() {
        }
        VectorTileLoader.prototype.load = function (tileUrl) {
            return promiseUtils.create(function (resolve, reject) {
                new ByteLoader_1.ByteLoader().load(tileUrl).then(function (byteArray) {
                    var input = new CodedInputStream_1.CodedInputStream(byteArray);
                    var subSource = SubSource_1.SubSource.wrapped(input);
                    var vectorTile = ProtocolTypes_1.ProtocolTypes.fromTypeUid(ProtocolTypesVectortile_1.ProtocolTypesVectortile.TYPE_UID____VECTORTILE).decode(subSource);
                    resolve(vectorTile);
                }, function (failure) {
                    reject(failure);
                });
            });
        };
        return VectorTileLoader;
    }());
    exports.VectorTileLoader = VectorTileLoader;
});
