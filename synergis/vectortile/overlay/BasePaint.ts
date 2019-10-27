import VectorTileLayer from 'esri/layers/VectorTileLayer'

import { IPaint } from "./IPaint";
import { Uid } from "../../util/Uid";
import { IColor } from "../../util/IColor";
import { ITreeData } from "../data/ITreeData";
import { IPaintSet } from './IPaintSet';
import { ILayerSet } from '../../layer/ILayerSet';

/**
 * base implementation of IPaint<br>
 * takes care of paint visibility
 * 
 * @author h.fleischer
 * @since 12.10.2019
 */
export abstract class BasePaint implements IPaint {

    private readonly layerSet: ILayerSet;
    private readonly paintSet: IPaintSet;
    private readonly id: string;
    private visible: boolean;

    constructor(layerSet: ILayerSet, paintSet: IPaintSet) {
        this.id = Uid.random16();
        this.layerSet = layerSet;
        this.paintSet = paintSet;
        this.visible = true;
    }

    updatePaintProperties(): void {
        let vectorTileLayer: VectorTileLayer = this.layerSet.getVectorUserLayer();
        let paintProperties: any = vectorTileLayer.getPaintProperties(this.getId());
        vectorTileLayer.setPaintProperties(this.getId(), paintProperties);
    }

    getId(): string {
        return this.id;
    }    

    isVisible(): boolean {
        return this.visible;
    }

    toggleVisibility(): boolean {
        this.visible = !this.visible;
        this.renderVisibility();
        return this.visible;
    }    

    renderVisibility(): void {
        let styleLayer: Object = this.getStyleLayer();
        if (this.visible && this.paintSet.isVisible()) {
            styleLayer['layout']['visibility'] = 'visible';
        } else {
            styleLayer['layout']['visibility'] = 'none';
        }
        let vectorTileLayer: VectorTileLayer = this.layerSet.getVectorUserLayer();
        let layoutProperties: any = vectorTileLayer.getLayoutProperties(this.getId());
        vectorTileLayer.setLayoutProperties(this.getId(), layoutProperties);
    }

    abstract getStyleLayer(): Object;

    /**
     * set radius, line-width as suitable
     * @param dimension
     */
    abstract setDimension(dimension: number): void;

    /**
     * get the radius, line-width as suitable
     */
    abstract getDimension(): number;

    /**
     * set the opacity in the underlying paint instance, as suitable for this instance (fill-opacity, ...)
     * @param opacity 
     */
    abstract setOpacity(opacity: number): void;

    /**
     * get the current opacity setting of this paint
     */
    abstract getOpacity(): number;

    /**
     * get the color of this tree-item
     */
    abstract getColor(): IColor;
    
    /**
     * apply the given color as suitable for this instance (fill-color, line-color, ...)
     * @param color 
     */
    abstract setColor(color: IColor): void;    

    /**
     * redeclare
     */
    abstract getTreeData(): ITreeData;

}