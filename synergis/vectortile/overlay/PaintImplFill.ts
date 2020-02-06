import { IPaint } from "./IPaint";
import { Uid } from "../../util/Uid";
import { DataType } from "../data/DataType";
import { Color } from "../../util/Color";
import { IColor } from "../../util/IColor";
import { ITreeData } from "../data/ITreeData";
import { TreeDataImpl } from "../data/TreeDataImpl";
import { BasePaint } from './BasePaint';
import { IPaintSet } from "./IPaintSet";
import { ILayerSet } from "../../layer/ILayerSet";


export class PaintImplFill extends BasePaint implements IPaint {

    readonly styleLayer: Object;
    readonly treeDataItem: ITreeData;
    private color: IColor;

    constructor(layerSet: ILayerSet, paintSet: IPaintSet, opacity: number) {

        super(layerSet, paintSet);

        //initial color
        this.color = paintSet.getColor();

        this.styleLayer = {
            id: this.getId(),
            type: 'fill',
            source: 'syn',
            'source-layer': paintSet.getSourceLayer(),
            filter: paintSet.getFilter(),
            layout: {
                'visibility': 'visible'
            },
            paint: {
                'fill-color': this.color.getHex(),
                'fill-opacity': opacity
            }
        }

        this.treeDataItem = new TreeDataImpl(DataType.get(DataType.INDEX___________PAINT), this.getId(), 'fill', -1, Color.mapContentIconNode(), paintSet.getExtent(), null);

        let colorTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX_____STYLE_COLOR), Uid.random16(), this.color.getHex(), -1, this.color, paintSet.getExtent(), null);
        this.treeDataItem.addChild(colorTreeDataItem);

        let opacityTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX___STYLE_OPACITY), Uid.random16(), 'opacity', opacity, Color.mapContentIconNode(), paintSet.getExtent(), null);
        this.treeDataItem.addChild(opacityTreeDataItem);

    }

    setDimension(dimension: number): void {
        //do nothing
    }

    getDimension(): number {
        return -1;
    }      

    setOpacity(opacity: number): void {
        this.styleLayer['paint']['fill-opacity'] = opacity;
        this.updatePaintProperties();
    }

    getOpacity(): number {
        return this.styleLayer['paint']['fill-opacity'];
    }

    setColor(color: IColor): void {
        this.color = color;
        this.styleLayer['paint']['fill-color'] = this.color.getHex();
        this.updatePaintProperties();
    }

    getColor(): IColor {
        return this.color;
    }

    getStyleLayer(): Object {
        return this.styleLayer;
    }

    getTreeData(): ITreeData {
        return this.treeDataItem;
    }

}