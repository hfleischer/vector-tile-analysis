define(["require", "exports", "./ProtocolTypes", "./ProtocolTypeVarint32", "./ProtocolTypeVarintPacked", "./ProtocolTypeString", "./ProtocolTypeDouble", "./ProtocolTypeSint64"], function (require, exports, ProtocolTypes_1, ProtocolTypeVarint32_1, ProtocolTypeVarintPacked_1, ProtocolTypeString_1, ProtocolTypeDouble_1, ProtocolTypeSint64_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * type-definitions for some primitive types defined in the prtobuf-standard<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var ProtocolTypesPrimitives = /** @class */ (function () {
        function ProtocolTypesPrimitives() {
        }
        //TODO supply all primitve types
        ProtocolTypesPrimitives.init = function () {
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID______VARINT32] = new ProtocolTypeVarint32_1.ProtocolTypeVarint32();
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID________SINT64] = new ProtocolTypeSint64_1.ProtocolTypeSint64();
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID________DOUBLE] = new ProtocolTypeDouble_1.ProtocolTypeDouble();
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID________STRING] = new ProtocolTypeString_1.ProtocolTypeString();
            ProtocolTypes_1.ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID_VARINT_PACKED] = new ProtocolTypeVarintPacked_1.ProtocolTypeVarintPacked();
        };
        ProtocolTypesPrimitives.TYPE_UID______VARINT32 = 'd87c82ff-5dea-4bdd-9589-64073dadca22';
        ProtocolTypesPrimitives.TYPE_UID________SINT64 = '14d0f1c9-b264-4d72-99a2-35d637cc69a9';
        ProtocolTypesPrimitives.TYPE_UID________DOUBLE = '0391f666-0911-440d-8a08-09e576cfe0a6';
        ProtocolTypesPrimitives.TYPE_UID________STRING = '81470f91-dc95-4668-8746-1e698e51e57a';
        ProtocolTypesPrimitives.TYPE_UID_VARINT_PACKED = 'cde7a995-a930-41e9-bc33-ef4417021564';
        return ProtocolTypesPrimitives;
    }());
    exports.ProtocolTypesPrimitives = ProtocolTypesPrimitives;
});
