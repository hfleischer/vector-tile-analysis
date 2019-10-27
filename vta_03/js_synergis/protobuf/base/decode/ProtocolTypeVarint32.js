define(["require", "exports", "../../WireType"], function (require, exports, WireType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * protocol type specific to 32-bit numeric values (concerning output, may be shorter when encoded)<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypeVarint32 = /** @class */ (function () {
        function ProtocolTypeVarint32() {
        }
        ProtocolTypeVarint32.prototype.decode = function (source) {
            return source.readRawVarint32();
        };
        ProtocolTypeVarint32.prototype.getWireType = function () {
            return WireType_1.WireType.get(WireType_1.WireType.INDEX_________VARINT32);
        };
        return ProtocolTypeVarint32;
    }());
    exports.ProtocolTypeVarint32 = ProtocolTypeVarint32;
});
