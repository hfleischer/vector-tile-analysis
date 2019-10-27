define(["require", "exports", "../../WireType"], function (require, exports, WireType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * protocol type specific to double values<br>
     *
     * @author h.fleischer
     * @since 10.10.2019
     */
    var ProtocolTypeDouble = /** @class */ (function () {
        function ProtocolTypeDouble() {
        }
        ProtocolTypeDouble.prototype.decode = function (source) {
            return source.readDouble();
        };
        /**
         * https://github.com/protocolbuffers/protobuf/blob/master/java/core/src/main/java/com/google/protobuf/WireFormat.java
         * DOUBLE(JavaType.DOUBLE, WIRETYPE_FIXED64),
         */
        ProtocolTypeDouble.prototype.getWireType = function () {
            return WireType_1.WireType.get(WireType_1.WireType.INDEX__________FIXED64);
        };
        return ProtocolTypeDouble;
    }());
    exports.ProtocolTypeDouble = ProtocolTypeDouble;
});
