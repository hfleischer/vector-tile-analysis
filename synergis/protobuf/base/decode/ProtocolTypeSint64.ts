import { IProtocolType } from "./IProtocolType";
import { WireTypeVarint32, WireType } from "../../WireType";
import { ISubSource } from "../source/ISubSource";
import { CodedInputStream } from "../source/CodedInputStream";


/**
 * protocol type specific to a 64-bit signed numeric value (concerning output, may be shorter when encoded)<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypeSint64 implements IProtocolType<number, WireTypeVarint32> {

    decode(source: ISubSource): number {
        return CodedInputStream.decodeZigZag(source.readRawVarint64());
    }

    getWireType(): WireTypeVarint32 {
        return WireType.get(WireType.INDEX_________VARINT32);
    }

}