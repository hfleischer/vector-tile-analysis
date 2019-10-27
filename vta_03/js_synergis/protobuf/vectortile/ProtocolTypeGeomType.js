define(["require", "exports", "./GeomType", "../WireType"], function (require, exports, GeomType_1, WireType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * protocol type specific to geometry-type as defined in the mapbox vector tile specification
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypeGeomType = /** @class */ (function () {
        function ProtocolTypeGeomType() {
        }
        ProtocolTypeGeomType.prototype.decode = function (source) {
            var raw = source.readRawVarint32();
            return GeomType_1.GeomType.get(raw);
        };
        ProtocolTypeGeomType.prototype.getWireType = function () {
            return WireType_1.WireType.get(WireType_1.WireType.INDEX_________VARINT32);
        };
        return ProtocolTypeGeomType;
    }());
    exports.ProtocolTypeGeomType = ProtocolTypeGeomType;
});
