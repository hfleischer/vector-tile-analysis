define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * defined property / key associatable with a specific IProtocolTypeDefined instance<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolKeyDefined = /** @class */ (function () {
        function ProtocolKeyDefined(name, key, typeUid, keyConsumer) {
            this.name = name;
            this.key = key;
            this.typeUid = typeUid;
            this.keyConsumer = keyConsumer;
        }
        ProtocolKeyDefined.prototype.getName = function () {
            return this.name;
        };
        ProtocolKeyDefined.prototype.getKey = function () {
            return this.key;
        };
        ProtocolKeyDefined.prototype.getTypeUid = function () {
            return this.typeUid;
        };
        /**
         * applies the given property to the given builder as defined by the key consumer held by this instance
         * @param builder
         * @param property
         */
        ProtocolKeyDefined.prototype.apply = function (builder, property) {
            return this.keyConsumer.call(builder, builder, property);
        };
        return ProtocolKeyDefined;
    }());
    exports.ProtocolKeyDefined = ProtocolKeyDefined;
});
