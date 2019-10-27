import MapView from "esri/views/MapView";
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import * as asd from "esri/core/accessorSupport/decorators";

import { IColor } from '../util/IColor';
import { ActiveTileLayerViewSyn } from "./ActiveTileLayerViewSyn";
import { IColoredLayer } from "./IColoredLayer";

/**
 * extension to GraphicsLayer for drawing the boundaries of the currently active tile<br>
 * 
 * @author h.fleischer
 * @since 18.10.2019
 */
@asd.subclass("ActiveTileLayerSyn")
export class ActiveTileLayerSyn extends asd.declared(GraphicsLayer) implements IColoredLayer {

    private readonly color: IColor;
    private tile: Graphic;
    private needsTileUpdate: boolean;

    constructor(title: string, color: IColor) {
        super({
            title: title
        });
        this.needsTileUpdate = false;
        this.color = color;
    }
    setTile(tile: Graphic): void {
        this.needsTileUpdate = true;
        this.tile = tile;
    }    
    getTile(): Graphic {
        return this.tile;
    }
    getColor(): IColor {
        return this.color;
    }
    isNeedsTileUpdate(): boolean {
        return this.needsTileUpdate;
    }
    setNeedsTileUpdate(needsTileUpdate: boolean): void {
        this.needsTileUpdate = needsTileUpdate;
    }
    createLayerView(view: MapView): ActiveTileLayerViewSyn {
        if (view.type === "2d") {
            return new ActiveTileLayerViewSyn({
                view: view, 
                layer: this
            }, this);
        }
    }


}