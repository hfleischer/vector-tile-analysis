import { IPaintType } from "./IPaintType";
import { IPaint } from "./IPaint";
import { DataType } from '../data/DataType';
import { Uid } from '../../util/Uid';
import { Color } from '../../util/Color';
import { ITreeData } from '../data/ITreeData';
import { TreeDataImpl } from '../data/TreeDataImpl';
import { Extent } from "esri/geometry";
import { IColor } from "../../util/IColor";
import { IPaintSet } from "./IPaintSet";
import { PaintSet } from "./PaintSet";
import { ILayerSet } from "../../layer/ILayerSet";

export class PaintSetImpl implements IPaintSet {

    private readonly id: string;
    private readonly treeDataItem: ITreeData;
    private readonly sourceLayer: string;
    private readonly paints: IPaint[];
    private readonly filter: string[];
    private readonly extent: Extent;
    private readonly color: IColor;
    private layerDefinition: Object;
    private visible: boolean;

    constructor(layerSet: ILayerSet, treeData: ITreeData, paintType: IPaintType) {

        this.id = Uid.random16();
        this.paints = [];
        this.visible = true;

        //TODO create groups of paints managed internally, each having a unique name
        let title: string = PaintSet.getItemName(treeData);        
        this.filter = PaintSet.getFilter(treeData);
        this.sourceLayer = PaintSet.getSourceLayer(treeData);
        this.color = treeData.getColor();

        this.paints = paintType.createPaints(layerSet, this);

        this.treeDataItem = new TreeDataImpl(DataType.get(DataType.INDEX_______PAINT_SET), this.getId(), title, -1, Color.white(), treeData.getExtent(), null);
        for (let i=0; i<this.paints.length; i++) {
            this.treeDataItem.addChild(this.paints[i].getTreeData());
        }     

    }

    isVisible(): boolean {
        return this.visible;
    }

    getColor(): IColor {
        return this.color;
    }

    getFilter(): string[] {
        return this.filter;
    }

    getExtent(): Extent {
        return this.extent;
    }

    toggleVisibility(): boolean {
        this.visible = !this.visible;
        this.paints.forEach(paint => paint.renderVisibility());
        return this.visible;
    }

    getStyleLayers(): Object[] {
        let styleLayers: Object[] = [];
        this.paints.forEach(paint => styleLayers.push(paint.getStyleLayer()));
        return styleLayers;
    }

    getSourceLayer(): string {
        return this.sourceLayer;
    }

    getId(): string {
        return this.id;
    }

    findPaint(paintId: string): IPaint {
        for (let i=0; i<this.paints.length; i++) {
            if (this.paints[i].getId() === paintId) {
                return this.paints[i];
            }
        }
        return null;
    }

    getTreeData(): ITreeData {
        return this.treeDataItem;
    }

}