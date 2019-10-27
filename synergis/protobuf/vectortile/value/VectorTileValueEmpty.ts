import { IVectorTileValue } from "../IVectorTileValue";

/**
 * implementation of IValue proprietary to an empty / not found value
 */
export class VectorTileValueEmpty implements IVectorTileValue {

    isEmpty(): boolean {
        return true;
    }

    getByteCount(): number {
        return 0;
    }

    getValue(): any {
        return null;
    }

}