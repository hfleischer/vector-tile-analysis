import { GeomType } from "./GeomType";
import { IProtocolType } from "../base/decode/IProtocolType";
import { ISubSource } from "../base/source/ISubSource";
import { WireTypeVarint32, WireType } from "../WireType";
import { IGeomType } from "./IGeomType";

/**
 * protocol type specific to geometry-type as defined in the mapbox vector tile specification
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypeGeomType implements IProtocolType<IGeomType, WireTypeVarint32> {

    decode(source: ISubSource): IGeomType {
        let raw = source.readRawVarint32();
        return GeomType.get(raw);
    }

    getWireType(): WireTypeVarint32 {
        return WireType.get(WireType.INDEX_________VARINT32);
    }

}