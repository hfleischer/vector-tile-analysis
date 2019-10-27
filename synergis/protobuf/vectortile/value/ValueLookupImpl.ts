import { IVectorTileValue } from "../IVectorTileValue";

/**
 * helper type that holds a layer's keys and values
 * 
 * @author h.fleischer
 * @since 23.09.2019
 */
export class ValueLookupImpl {

    readonly keyPointersByName: Object;
    readonly values: IVectorTileValue[];

    constructor(keys: string[], values: IVectorTileValue[]) { 

        //console.log('keys, values', keys, values);
        //collect key indices by value (so later a key can be used to lookup an index)
        this.keyPointersByName = {};
        for (let i=0; i<keys.length; i++) {
            this.keyPointersByName[keys[i]] = i;
        }
        this.values = values;

    }

    /**
     * check if there is a key-index for the given key<br>
     * @param key 
     */
    hasKey(key: string): boolean {
        return this.getKeyPointer(key) >= 0;
    }

    /**
     * check if the given key (i.e. '_symbol') resolves to an index in this lookup
     * @param key 
     */
    getKeyPointer(key: string): number {
        if (this.keyPointersByName[key] != null) {
            return this.keyPointersByName[key];
        } else {
            return -1;
        }
    }

    getValue(index: number): IVectorTileValue {
        if (index >= 0 && index < this.values.length) {
            return this.values[index];
        } else {
            return null;
        }
    }    

}