define(["require", "exports", "./ProtocolTypeDefined"], function (require, exports, ProtocolTypeDefined_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * central collection of IProtocolType instances currently stored in scope<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypes = /** @class */ (function () {
        function ProtocolTypes() {
        }
        ProtocolTypes.define = function (name, supplierOfFactory) {
            return new ProtocolTypeDefined_1.ProtocolTypeDefined(name, supplierOfFactory);
        };
        ProtocolTypes.fromTypeUid = function (typeUid) {
            var protocolType = ProtocolTypes.ALL[typeUid];
            if (protocolType) {
                return protocolType;
            }
            else {
                var message = "failed to find protocol type (typeUid: " + typeUid + ")";
                console.log(message);
                throw new Error(message);
            }
        };
        ProtocolTypes.ALL = {};
        return ProtocolTypes;
    }());
    exports.ProtocolTypes = ProtocolTypes;
});
