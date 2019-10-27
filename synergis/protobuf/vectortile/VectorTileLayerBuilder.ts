import { VectorTileLayer } from "./VectorTileLayer";
import { VectorTileFeature } from "./VectorTileFeature";
import { IVectorTileValue } from "./IVectorTileValue";
import { ValueLookupImpl } from "./value/ValueLookupImpl";
import { IValueLookup } from "../../vectortile/data/IValueLookup";

/**
 * implementation of ITypeBuilder usable while deserializing a VectorTileLayer from an encoded vectortile<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class VectorTileLayerBuilder implements ITypeBuilder<VectorTileLayer, VectorTileLayerBuilder> {

    byteCount: number;
    name: string;
    features: VectorTileFeature[];
    keys: string[];
    values: IVectorTileValue[];
    extent: number;
    version: number;

    constructor() {
        this.features = [];
        this.keys = [];
        this.values = [];
    }

    setByteCount(byteCount: number): VectorTileLayerBuilder {
        this.byteCount = byteCount;
        return this;
    } 

    setName(name: string): VectorTileLayerBuilder {
        this.name = name;
        return this;
    }
    
    addFeature(feature: VectorTileFeature): VectorTileLayerBuilder {
        this.features.push(feature);
        return this;
    }

    addKey(key: string): VectorTileLayerBuilder {
        this.keys.push(key);
        return this;
    }

    addValue(value: IVectorTileValue): VectorTileLayerBuilder {
        this.values.push(value);
        return this;
    }    

    setExtent(extent: number) {
        this.extent = extent;
        return this;
    }

    setVersion(version: number) {
        this.version = version;
        return this;
    }    

    build(): VectorTileLayer {
        let valueLookup: IValueLookup = new ValueLookupImpl(this.keys, this.values);
        this.features.forEach(feature => {
            feature.valueLookup = valueLookup;
        });
        return new VectorTileLayer(this.byteCount, this.name, this.features, this.keys, this.values, this.extent, this.version, valueLookup);
    }

}