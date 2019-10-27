import { ProtocolTypes } from "./ProtocolTypes";
import { ProtocolTypeVarint32 } from "./ProtocolTypeVarint32";
import { ProtocolTypeVarintPacked } from "./ProtocolTypeVarintPacked";
import { ProtocolTypeString } from "./ProtocolTypeString";
import { ProtocolTypeDouble } from "./ProtocolTypeDouble";
import { ProtocolTypeSint64 } from "./ProtocolTypeSint64";

/**
 * type-definitions for some primitive types defined in the prtobuf-standard<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypesPrimitives {

    static TYPE_UID______VARINT32: string = 'd87c82ff-5dea-4bdd-9589-64073dadca22';
    static TYPE_UID________SINT64: string = '14d0f1c9-b264-4d72-99a2-35d637cc69a9';
    static TYPE_UID________DOUBLE: string = '0391f666-0911-440d-8a08-09e576cfe0a6';
    static TYPE_UID________STRING: string = '81470f91-dc95-4668-8746-1e698e51e57a';
    static TYPE_UID_VARINT_PACKED: string = 'cde7a995-a930-41e9-bc33-ef4417021564';

    //TODO supply all primitve types

    static init(): void {
        ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID______VARINT32] = new ProtocolTypeVarint32();
        ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID________SINT64] = new ProtocolTypeSint64();
        ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID________DOUBLE] = new ProtocolTypeDouble();
        ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID________STRING] = new ProtocolTypeString();
        ProtocolTypes.ALL[ProtocolTypesPrimitives.TYPE_UID_VARINT_PACKED] = new ProtocolTypeVarintPacked();
    }

}