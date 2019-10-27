
import { SubSourceMessage } from "../source/SubSourceMessage";
import { ISubSource } from "../source/ISubSource";
import { IProtocolType } from "./IProtocolType";
import { WireTypeLengthDelimited, WireType } from "../../WireType";

/**
 * protocol type specific to a packed set of 32-bit values<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypeVarintPacked implements IProtocolType<number[], WireTypeLengthDelimited> {
    
    decode(source: ISubSource): number[] {
        var results: number[] = [];
        let subSource: SubSourceMessage;
        try {
            subSource = new SubSourceMessage(source);
            while (!subSource.hasReachedLimit()) {
                results.push(subSource.readRawVarint32());
            }
        } finally {
            if (subSource) {
                subSource.popLimit();
            }
        }
        //console.log("packed int results", results);
        return results;
    }

    getWireType(): WireTypeLengthDelimited {
        return WireType.get(WireType.INDEX_LENGTH_DELIMITED);
    }

}