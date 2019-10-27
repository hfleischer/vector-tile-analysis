define(["require", "exports", "./ProtocolKeyDefined", "../source/SubSourceMessage", "./ProtocolTypes", "../../WireType", "../../TagUtil"], function (require, exports, ProtocolKeyDefined_1, SubSourceMessage_1, ProtocolTypes_1, WireType_1, TagUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * generic implementation of IProtocolTypeDefined<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypeDefined = /** @class */ (function () {
        function ProtocolTypeDefined(name, supplierOfFactory) {
            this.name = name;
            this.supplierOfFactory = supplierOfFactory;
            this.definedKeys = [];
        }
        ProtocolTypeDefined.prototype.getName = function () {
            return this.name;
        };
        /**
         * get the wire-type that this type is expcting to deserialize
         */
        ProtocolTypeDefined.prototype.getWireType = function () {
            return WireType_1.WireType.get(WireType_1.WireType.INDEX_LENGTH_DELIMITED);
        };
        /**
         * defines, and add, a type key to this protocol type
         * @param name
         * @param key
         * @param typeUid
         * @param consumer
         */
        ProtocolTypeDefined.prototype.defineKey = function (name, key, typeUid, consumer) {
            this.definedKeys.push(new ProtocolKeyDefined_1.ProtocolKeyDefined(name, key, typeUid, consumer));
        };
        /**
         * create a new builder instance ready to deserialize an instance of this type
         */
        ProtocolTypeDefined.prototype.newTypeBuilder = function () {
            return this.supplierOfFactory.apply(null);
        };
        /**
         * decode an instance of the type describes by this instance from the given source
         * @param source
         */
        ProtocolTypeDefined.prototype.decode = function (source) {
            //create a new builder suitable for this type
            var builder = this.newTypeBuilder();
            //create a new subsource for this message
            var subSource;
            try {
                //create a subsource (which will know its byte limit) and apply that size to builder
                subSource = new SubSourceMessage_1.SubSourceMessage(source);
                builder.setByteCount(subSource.getBytesUntilLimit());
                //keep reading until the limit of the subsource has been reached
                while (!subSource.hasReachedLimit()) {
                    var tag = subSource.readRawVarint32();
                    var key = TagUtil_1.TagUtil.toKey(tag);
                    var wireType = WireType_1.WireType.toWireType(tag);
                    //find a defined key
                    var definedKey = this.findDefinedKey(key);
                    //get the protocol-type as defined by the key and decode the property
                    var property = ProtocolTypes_1.ProtocolTypes.fromTypeUid(definedKey.getTypeUid()).decode(subSource);
                    //apply the property as defined in the builder instantiated at the very beginning of this method
                    definedKey.apply(builder, property);
                }
                //now (all bytes decoded) let the builder create an appropriate instance
                return builder.build();
            }
            finally {
                if (subSource) {
                    subSource.popLimit();
                }
            }
        };
        /**
         * from the key defined in this instances (corrsponding to message keys in a *.proto file, find one that matches the given key)
         * @param key
         */
        ProtocolTypeDefined.prototype.findDefinedKey = function (key) {
            for (var i = 0; i < this.definedKeys.length; i++) {
                if (this.definedKeys[i].getKey() == key) {
                    return this.definedKeys[i];
                }
            }
            var message = "failed to resolve defined key (type: " + this.getName() + ", key: " + key + ")";
            console.log(message);
            throw new Error(message);
        };
        return ProtocolTypeDefined;
    }());
    exports.ProtocolTypeDefined = ProtocolTypeDefined;
});
