define(["require", "exports", "../source/SubSourceMessage", "../../WireType"], function (require, exports, SubSourceMessage_1, WireType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * protocol type specific to a packed set of 32-bit values<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypeVarintPacked = /** @class */ (function () {
        function ProtocolTypeVarintPacked() {
        }
        ProtocolTypeVarintPacked.prototype.decode = function (source) {
            var results = [];
            var subSource;
            try {
                subSource = new SubSourceMessage_1.SubSourceMessage(source);
                while (!subSource.hasReachedLimit()) {
                    results.push(subSource.readRawVarint32());
                }
            }
            finally {
                if (subSource) {
                    subSource.popLimit();
                }
            }
            //console.log("packed int results", results);
            return results;
        };
        ProtocolTypeVarintPacked.prototype.getWireType = function () {
            return WireType_1.WireType.get(WireType_1.WireType.INDEX_LENGTH_DELIMITED);
        };
        return ProtocolTypeVarintPacked;
    }());
    exports.ProtocolTypeVarintPacked = ProtocolTypeVarintPacked;
});
