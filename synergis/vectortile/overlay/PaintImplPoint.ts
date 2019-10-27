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



export class PaintImplPoint extends BasePaint implements IPaint {

    readonly styleLayer: Object;
    readonly treeDataItem: ITreeData;
    private color: IColor;

    constructor(layerSet: ILayerSet, paintSet: IPaintSet, radius: number, opacity: number) {

        super(layerSet, paintSet);

        this.color = paintSet.getColor();

        this.styleLayer = {
            id: this.getId(),
            type: 'circle',
            source: 'syn',
            'source-layer': paintSet.getSourceLayer(),
            filter: paintSet.getFilter(),
            layout: {
                'visibility': 'visible',
                'syn_visibility': 0b11 //paintset and paint visible
            },
            paint: {
                'circle-radius': radius,
                'circle-color': this.color.getHex(),
                'circle-opacity': opacity,
                'circle-blur': 1
            }
        }

        this.treeDataItem = new TreeDataImpl(DataType.get(DataType.INDEX___________PAINT), this.getId(), 'vertices', -1, Color.white(), paintSet.getExtent(), null);

        let colorTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX_____STYLE_COLOR), Uid.random16(), this.color.getHex(), -1, this.color, paintSet.getExtent(), null);
        this.treeDataItem.addChild(colorTreeDataItem);        

        let opacityTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX___STYLE_OPACITY), Uid.random16(), 'opacity', opacity, Color.white(), paintSet.getExtent(), null);
        this.treeDataItem.addChild(opacityTreeDataItem);

        let dimensionTreeDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX_STYLE_DIMENSION), Uid.random16(), 'radius', radius, Color.white(), paintSet.getExtent(), null);
        this.treeDataItem.addChild(dimensionTreeDataItem);

    }


    setDimension(dimension: number): void {
        this.styleLayer['paint']['circle-radius'] = dimension;
        this.updatePaintProperties();
    }

    getDimension(): number {
        return this.styleLayer['paint']['circle-radius'];
    }    

    setOpacity(opacity: number): void {
        this.styleLayer['paint']['circle-opacity'] = opacity;
        this.updatePaintProperties();
    }

    getOpacity(): number {
        return this.styleLayer['paint']['circle-opacity'];
    }        

    setColor(color: IColor): void {
        this.color = color;
        this.styleLayer['paint']['circle-color'] = this.color.getHex();
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