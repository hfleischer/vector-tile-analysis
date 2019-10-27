import { ISubSource } from "../source/ISubSource";
import { IProtocolType } from "./IProtocolType";
import { WireTypeVarint32, WireType } from "../../WireType";

/**
 * protocol type specific to 32-bit numeric values (concerning output, may be shorter when encoded)<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypeVarint32 implements IProtocolType<number, WireTypeVarint32> {

    decode(source: ISubSource): number {
        return source.readRawVarint32();
    }

    getWireType(): WireTypeVarint32 {
        return WireType.get(WireType.INDEX_________VARINT32);
    }

}