import { IPaintType } from "./IPaintType";
import { IPaint } from "./IPaint";
import { PaintImplFill } from "./PaintImplFill";
import { PaintImplLine } from "./PaintImplLine";
import { PaintImplPoint } from "./PaintImplPoint";
import { IPaintSet } from "./IPaintSet";
import { ILayerSet } from "../../layer/ILayerSet";

/**
 * paint type specific to polygon features, includes:<br>
 * <li>fill
 * <li>outline
 * <li>vertices
 */
export class PaintTypePolygon implements IPaintType {
    createPaints(layerSet: ILayerSet, paintSet: IPaintSet): IPaint[] {
        return [
            new PaintImplFill(layerSet, paintSet, 0.5),
            new PaintImplLine(layerSet, paintSet, 1.5, 0.75),
            new PaintImplPoint(layerSet, paintSet, 1.5, 1)
        ]
    }
}

/**
 * paint type specific to line features, includes:<br>
 * <li>outline
 * <li>vertices
 */
export class PaintTypePolyline implements IPaintType {
    createPaints(layerSet: ILayerSet, paintSet: IPaintSet): IPaint[] {
        return [
            new PaintImplLine(layerSet, paintSet, 2, 0.75),
            new PaintImplPoint(layerSet, paintSet, 2.0, 1)
        ]
    }
}

/**
 * paint type specific to point features, includes:<br>
 * <li>vertices
 */
export class PaintTypePoint implements IPaintType {
    createPaints(layerSet: ILayerSet, paintSet: IPaintSet): IPaint[] {
        return [
            new PaintImplPoint(layerSet, paintSet, 2.5, 1)
        ]
    }
}

/**
 * accessor type to IPaintType instances
 * 
 * @author h.fleischer
 * @since 12.10.2019
 */
export class PaintType { 

    static INDEX______POLYGON: number = 0;
    static INDEX_____POLYLINE: number = 1;
    static INDEX________POINT: number = 2;

    static ALL: IPaintType[] = [
        new PaintTypePolygon(),
        new PaintTypePolyline(),
        new PaintTypePoint()
    ]

    static get(index: number): IPaintType {
        if (index >= 0 && index < PaintType.ALL.length) {
            return PaintType.ALL[index];
        } else {
            throw new Error("failed to resolve paint-type (index: " + index + ")");
        }
    }

}