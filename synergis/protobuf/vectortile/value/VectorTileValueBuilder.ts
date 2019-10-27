import { VectorTileValueString } from "./VectorTileValueString";
import { VectorTileValueNumber } from "./VectorTileValueNumber";
import { IVectorTileValue } from "../IVectorTileValue";

/**
 * implementation of ITypeBuilder usable while deserializing an IVectorTileValue from an encoded vectortile<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class VectorTileValueBuilder implements ITypeBuilder<IVectorTileValue, VectorTileValueBuilder> {

    byteCount: number;
    value: IVectorTileValue;

    setByteCount(byteCount: number): VectorTileValueBuilder {
        this.byteCount = byteCount;
        return this;
    }

    setStringValue(value: string): VectorTileValueBuilder {
        this.value = new VectorTileValueString(this.byteCount, value);
        return this;
    }

    setNumberValue(value: number): VectorTileValueBuilder {
        this.value = new VectorTileValueNumber(this.byteCount, value);
        return this;
    }
    
    build(): IVectorTileValue {
        return this.value;
    }
    
}