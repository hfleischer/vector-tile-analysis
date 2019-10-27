import { WireTypeLengthDelimited, WireType } from "../WireType";
import { SubSourceMessage } from "../base/source/SubSourceMessage";
import { TagUtil } from "../TagUtil";
import { ISubSource } from "../base/source/ISubSource";
import { IProtocolType } from "../base/decode/IProtocolType";

/**
 * protocol type specific to the coordinate / path commands as defined by the mapbox vectortile -> geometry specification<br>
 * this type is a reduced implementation that does not store geometries but rather evaluates coordinate / vertex counts only
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypeCoordinates implements IProtocolType<number, WireTypeLengthDelimited> {

    static CODE____MOVE_TO: number = 1;
    static CODE____LINE_TO: number = 2;
    static CODE_CLOSE_PATH: number = 7;

    decode(source: ISubSource): number {

        let totalCount: number = 0;
        let subSource: SubSourceMessage;

        let xrel: number;
        let yrel: number;
        let x: number = 0;
        let y: number = 0;

        try {

            subSource = new SubSourceMessage(source);
            while (!subSource.hasReachedLimit()) {

                //console.log("reading command", this);

                let tag: number = subSource.readRawVarint32();
                let coordCount: number = TagUtil.toKey(tag);
                let pathCommand: number = TagUtil.toCode(tag);
    
                //console.log("tag", tag);
                //console.log("coordCount", coordCount);
                //console.log("pathCommand", pathCommand);              

                if (pathCommand == ProtocolTypeCoordinates.CODE_CLOSE_PATH) {
                    continue;
                }

                if (pathCommand == ProtocolTypeCoordinates.CODE____MOVE_TO) {
                    //start a new PART
                }
    
                for (let coordIndex: number = 0; coordIndex < coordCount; coordIndex++) {
    
                    xrel = source.readRawVarint32(); //read x (if value needed --> zigzag decode)
                    yrel = source.readRawVarint32(); //read y (if value needed --> zigzag decode)
                    totalCount++;

                    //x = x + xrel;
                    //y = y + yrel;
                    //store a coordinate from xy
    
                }                

            }
        } finally {
            if (subSource) {
                subSource.popLimit();
            }
        }
        return totalCount;
    }

    getWireType(): WireTypeLengthDelimited {
        return WireType.get(WireType.INDEX_LENGTH_DELIMITED);
    }

}