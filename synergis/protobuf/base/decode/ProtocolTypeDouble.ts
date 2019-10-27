import { IProtocolType } from "./IProtocolType";
import { WireTypeVarint32, WireType, WireTypeFixed64 } from "../../WireType";
import { ISubSource } from "../source/ISubSource";


/**
 * protocol type specific to double values<br>
 * 
 * @author h.fleischer
 * @since 10.10.2019
 */
export class ProtocolTypeDouble implements IProtocolType<number, WireTypeFixed64> {

    decode(source: ISubSource): number {
        return source.readDouble();
    }

    /**
     * https://github.com/protocolbuffers/protobuf/blob/master/java/core/src/main/java/com/google/protobuf/WireFormat.java
     * DOUBLE(JavaType.DOUBLE, WIRETYPE_FIXED64),
     */
    getWireType(): WireTypeFixed64 {
        return WireType.get(WireType.INDEX__________FIXED64);
    }

}