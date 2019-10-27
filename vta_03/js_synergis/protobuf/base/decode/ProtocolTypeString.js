define(["require", "exports", "../../WireType"], function (require, exports, WireType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * protocol type specific to string values<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypeString = /** @class */ (function () {
        function ProtocolTypeString() {
        }
        ProtocolTypeString.prototype.decode = function (source) {
            return source.readString();
        };
        ProtocolTypeString.prototype.getWireType = function () {
            return WireType_1.WireType.get(WireType_1.WireType.INDEX_LENGTH_DELIMITED);
        };
        return ProtocolTypeString;
    }());
    exports.ProtocolTypeString = ProtocolTypeString;
});
