import { IVectorTileValue } from "../IVectorTileValue";
import { IValueFilter } from "../../../vectortile/data/IValueFilter";

export class ValueFilterImpl implements IValueFilter {

    readonly sourceLayer: string;
    readonly filterKey: string;
    readonly filterValue: IVectorTileValue;

    constructor(sourceLayer: string, filterKey?: string, filterValue?: IVectorTileValue) {
        this.sourceLayer = sourceLayer;
        this.filterKey = filterKey;
        this.filterValue = filterValue;
    }

    getSourceLayer(): string {
        return this.sourceLayer;
    }

    getKey(): string {
        return this.filterKey;
    }

    getValue(): any {
        return this.filterValue.getValue();
    }

}