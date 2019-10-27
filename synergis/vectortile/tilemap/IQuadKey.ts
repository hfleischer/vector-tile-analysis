/**
 * definition for types that point into a certain lod and there to a specific cell<br>
 * 
 * @author h.fleischer
 * @since 10.10.2019
 */
export interface IQuadKey {

    /**
     * get a unique id for this key
     */
    getId(): string;

    /**
     * get the lod / level of this key
     */
    getLod(): number;

    /**
     * get the column / x of this key
     */
    getCol(): number;

    /**
     * get the row / y of this key
     */
    getRow(): number;

}