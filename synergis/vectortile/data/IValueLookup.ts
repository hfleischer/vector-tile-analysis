import { IVectorTileValue } from "../../protobuf/vectortile/IVectorTileValue";

/**
 * definition for types that can resolve keys and value with repect to the key/value store as specified in the mapbox protocol buffer<br>
 * 
 * @author h.fleischer
 * @since 18.1.2019
 */
export interface IValueLookup {

    /**
     * check if there is a key-index for the given key<br>
     * @param key 
     */
    hasKey(key: string): boolean

    /**
     * resolve the key (i.e. '_symbol')
     * @param key 
     */
    getKeyPointer(key: string): number;

    getValue(index: number): IVectorTileValue;

}