define(["require", "exports", "../../WireType", "../source/CodedInputStream"], function (require, exports, WireType_1, CodedInputStream_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * protocol type specific to a 64-bit signed numeric value (concerning output, may be shorter when encoded)<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypeSint64 = /** @class */ (function () {
        function ProtocolTypeSint64() {
        }
        ProtocolTypeSint64.prototype.decode = function (source) {
            return CodedInputStream_1.CodedInputStream.decodeZigZag(source.readRawVarint64());
        };
        ProtocolTypeSint64.prototype.getWireType = function () {
            return WireType_1.WireType.get(WireType_1.WireType.INDEX_________VARINT32);
        };
        return ProtocolTypeSint64;
    }());
    exports.ProtocolTypeSint64 = ProtocolTypeSint64;
});
