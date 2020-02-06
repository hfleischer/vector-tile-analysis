import { IPaint } from "./IPaint";
import { Uid } from "../../util/Uid";
import { DataType } from "../data/DataType";
import { Color } from "../../util/Color";
import { IColor } from "../../util/IColor";
import { TreeDataImpl } from "../data/TreeDataImpl";
import { ITreeData } from "../data/ITreeData";
import { BasePaint } from "./BasePaint";
import { IPaintSet } from "./IPaintSet";
import { ILayerSet } from "../../layer/ILayerSet";


export class PaintImplLine extends BasePaint implements IPaint {

    readonly styleLayer: Object;
    readonly treeDataItem: ITreeData;
    private color: IColor;

    constructor(layerSet: ILayerSet, paintSet: IPaintSet, width: number, opacity: number) {

        super(layerSet, paintSet);

        //initial color
        this.color = paintSet.getColor();

        this.styleLayer = {
            id: this.getId(),
            type: 'line',
            source: 'syn',
            'source-layer': paintSet.getSourceLayer(),
            filter: paintSet.getFilter(),
            layout: {
                'visibility': 'visible',
                'line-cap': 'round',
                'line-join': 'round'							
            },
            paint: {
                'line-width': width,
                'line-color': this.color.getHex(),
                'line-opacity': opacity,
            }
        }

        this.treeDataItem = new TreeDataImpl(DataType.get(DataType.INDEX___________PAINT), this.getId(), 'line', -1, Color.mapContentIconNode(), paintSet.getExtent(), null);

        let colorTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX_____STYLE_COLOR), Uid.random16(), this.color.getHex(), -1, this.color, paintSet.getExtent(), null);
        this.treeDataItem.addChild(colorTreeDataItem);

        let opacityTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX___STYLE_OPACITY), Uid.random16(), 'opacity', opacity, Color.mapContentIconNode(), paintSet.getExtent(), null);
        this.treeDataItem.addChild(opacityTreeDataItem);

        let dimensionTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX_STYLE_DIMENSION), Uid.random16(), 'line-width', width, Color.mapContentIconNode(), paintSet.getExtent(), null);
        this.treeDataItem.addChild(dimensionTreeDataItem);

    }

    setDimension(dimension: number): void {
        this.styleLayer['paint']['line-width'] = dimension;
        this.updatePaintProperties();
    }

    getDimension(): number {
        return this.styleLayer['paint']['line-width'];
    }

    setOpacity(opacity: number): void {
        this.styleLayer['paint']['line-opacity'] = opacity;
        this.updatePaintProperties();
    }

    getOpacity(): number {
        return this.styleLayer['paint']['line-opacity'];
    }    

    setColor(color: IColor): void {
        this.color = color;
        this.styleLayer['paint']['line-color'] = this.color.getHex();
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