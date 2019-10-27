export interface IQuadLevel {

    /**
     * get the resolution of this quadlevel (the size of a single pixel)
     */
    getNorm(): number[];

    /**
     * get the origin of this quad-level as a two element number array
     */
    getOrigin(): number[];

}