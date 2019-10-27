import { IQuadKey } from "./IQuadKey";
import { IQuadLevel } from "./IQuadLevel";

/**
 * definition of a quadtree, where an initial single cell is split up to 4 subcells recusively<br>
 * 
 * @argument h.fleischer
 * @since 05.10.2019
 */
export interface IQuadTree {

    /**
     * find the quad-level matching the lod / level specified by the given key
     * @param quadKey 
     */
    findLevel(quadKey: IQuadKey): IQuadLevel;

    /**
     * check if this instance contains a tile for the given key
     * @param searchKey 
     */
    findKey(searchKey: IQuadKey): IQuadKey;

    /**
     * get ring coordinates as defined by lod, col, row of the given key
     * the ring may be returned no matter if this instance defines an appropriate tile
     * @param tileKey 
     */
    getRing(tileKey: IQuadKey): number[][];
    
}