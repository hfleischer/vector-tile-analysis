import { VectorTileLayer } from "./VectorTileLayer";
import { Uid } from "../../util/Uid";

/**
 * Layer type deserialized from an encoded vectortile<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class Vectortile {
    
    readonly uid: string;
    readonly byteCount: number;
    readonly layers: VectorTileLayer[];

    constructor(byteCount: number, layers: VectorTileLayer[]) {
        this.uid = Uid.random16();
        this.byteCount = byteCount;
        this.layers = layers;
    }

}