import { ISubSource } from "../source/ISubSource";
import { IProtocolType } from "./IProtocolType";
import { WireType, WireTypeLengthDelimited } from "../../WireType";

/**
 * protocol type specific to string values<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypeString implements IProtocolType<string, WireTypeLengthDelimited> {

    decode(source: ISubSource): string {
        return source.readString();
    }

    getWireType(): WireTypeLengthDelimited {
        return WireType.get(WireType.INDEX_LENGTH_DELIMITED);
    }

}