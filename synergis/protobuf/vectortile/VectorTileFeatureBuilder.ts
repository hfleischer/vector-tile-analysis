import { VectorTileFeature } from "./VectorTileFeature";
import { IGeomType } from "./IGeomType";

/**
 * implementation of ITypeBuilder for deserializing a Feature from an encoded vectortile<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class VectorTileFeatureBuilder implements ITypeBuilder<VectorTileFeature, VectorTileFeatureBuilder> {

    byteCount: number;
    tags: number[];
    geomType: IGeomType;
    coordCount: number;

    constructor() {
        this.tags = []; //be sure to at least have an empty array
    }

    setByteCount(byteCount: number): VectorTileFeatureBuilder {
        this.byteCount = byteCount;
        return this;
    } 

    setTags(tags: number[]): VectorTileFeatureBuilder {
        this.tags = tags;
        return this;
    }

    setGeomType(geomType: IGeomType): VectorTileFeatureBuilder {
        this.geomType = geomType;
        return this;
    }

    setCoordCount(coordCount: number): VectorTileFeatureBuilder {
        this.coordCount = coordCount;
        return this;
    }
    
    build(): VectorTileFeature {
        return new VectorTileFeature(this.byteCount, this.tags, this.geomType, this.coordCount);
    }

}