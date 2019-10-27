import { IGeomType } from "./IGeomType";
import { IVectorTileValue } from "./IVectorTileValue";
import { VectorTileValueEmpty } from "./value/VectorTileValueEmpty";
import { IValueLookup } from "../../vectortile/data/IValueLookup";

/**
 * Feature type deserialized from an encoded vectortile<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class VectorTileFeature {
    
    readonly byteCount: number;
    readonly tags: number[];
    readonly geomType: IGeomType;
    readonly coordCount: number;
    valueLookup: IValueLookup; //set by layer builder (after the layer is complete, key and values and everything)

    constructor(byteCount: number, tags: number[], geomType: IGeomType, coordCount: number) {
        this.byteCount = byteCount;
        this.tags = tags;
        this.geomType = geomType;
        this.coordCount = coordCount;
    }

    /**
     * try to resolve a key-index from this instance's value-lookup<br>
     * if such a key-index is found, try to find an even indexed tag having that key-value<br>
     * if such a tag is found return the subsequent odd tag-index (which is pointing to a value in this instance's value-lookup)<br>
     * @param key 
     */
    getValuePointer(key: string) {
        let keyPointer: number = this.valueLookup.getKeyPointer(key); //check if this key resolves to a key index
        if (keyPointer >= 0) {
            //check if the resolved key index resolves to a tag withing this feature, if so, that index then points into the layers values
            for (let tagIndex = 0; tagIndex < this.tags.length; tagIndex += 2) {
                if (this.tags[tagIndex] == keyPointer) {
                    return this.tags[tagIndex + 1];
                }
            }
        }
        return -1;
    }    

    /**
     * try to resolve a value-pointer from the given key<br>
     * if such a pointer is found, get the associated value, if any, from this instance's value-llokup
     * @param key 
     */
    getValue(key: string) {
        let valuePointer: number = this.getValuePointer(key);
        if (valuePointer >= 0) {
            return this.valueLookup.getValue(valuePointer);
        } else {
            return new VectorTileValueEmpty();
        }
    }

    /**
     * resolve the feature's value for the given value, then compare that value to the given value
     * @param key 
     * @param value 
     */
    hasValue(key: string, value: IVectorTileValue): boolean {
        return this.getValue(key).getValue() === value.getValue();
    }


}