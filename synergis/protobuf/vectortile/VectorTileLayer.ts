import { VectorTileFeature } from "./VectorTileFeature";
import { IVectorTileValue } from "./IVectorTileValue";
import { GeomType } from "./GeomType";
import { IGeomType } from "./IGeomType";
import { IValueLookup } from "../../vectortile/data/IValueLookup";

/**
 * Layer type deserialized from an encoded vectortile<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class VectorTileLayer {
    
    readonly byteCount: number;
    readonly name: string;
    readonly features: VectorTileFeature[];
    readonly keys: string[];
    readonly values: IVectorTileValue[];
    readonly extent: number;
    readonly version: number;
    readonly valueLookup: IValueLookup;

    constructor(byteCount: number, name: string, features: VectorTileFeature[], keys: string[], values: IVectorTileValue[], extent: number, version: number, valueLookup: IValueLookup) {
        this.byteCount = byteCount;
        this.name = name;
        this.features = features;
        this.keys = keys;
        this.values = values;
        this.extent = extent;
        this.version = version;
        this.valueLookup = valueLookup;
    }

    /**
     * get all features that provide the given value for the given key<br>
     * i.e. all features that have a specific value for the '_symbol' key<br>
     * @param filterKey 
     * @param value 
     */
    getFeatures(filterKey: string, value: IVectorTileValue): VectorTileFeature[] {
        let results: VectorTileFeature[] = [];
        for (let i=0; i<this.features.length; i++) {
            let feature = this.features[i];
            if (feature.hasValue(filterKey, value)) {
                results.push(feature);
            }
        }
        return results;
    }

    getValueSet(key: string): IVectorTileValue[] {
        let helperSet: Set<any> = new Set();
        let valueSet: IVectorTileValue[] = [];
        for (let i=0; i<this.features.length; i++) {
            let value: IVectorTileValue = this.features[i].getValue(key);
            if (value != null && !value.isEmpty() && !helperSet.has(value.getValue())) {
                helperSet.add(value.getValue());
                valueSet.push(value);
            }
        }
        return valueSet;
    }

    getVertexCount(): number {
        let vertexCount: number = 0;
        for (let i=0; i<this.features.length; i++) {
            vertexCount += this.features[i].coordCount;
        }
        return vertexCount;
    }

    getGeometryType(): IGeomType {
        if (this.features.length > 0) {
            return this.features[0].geomType;
        } else {
            return GeomType.get(GeomType.INDEX____UNKNOWN);
        }
    }

}