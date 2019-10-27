import { Vectortile } from "./Vectortile";
import { VectorTileLayer } from "./VectorTileLayer";

/**
 * implementation of ITypeBuilder usable while deserializing an Vectortile from an encoded vectortile<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class VectortileBuilder implements ITypeBuilder<Vectortile, VectortileBuilder> {

    byteCount: number;
    layers: VectorTileLayer[];

    constructor() {
        this.layers = [];
    }

    setByteCount(byteCount: number): VectortileBuilder {
        this.byteCount = byteCount;
        return this;
    } 

    addLayer(layer: VectorTileLayer): VectortileBuilder {
        this.layers.push(layer);
        return this;
    }

    build(): Vectortile {
        return new Vectortile(this.byteCount, this.layers);
    }


}