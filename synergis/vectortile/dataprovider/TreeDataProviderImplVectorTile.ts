import { ITreeDataProvider } from "./ITreeDataProvider";
import { Vectortile } from "../../protobuf/vectortile/Vectortile";
import { DataType } from "../data/DataType";
import { VectorTileLayer } from "../../protobuf/vectortile/VectorTileLayer";
import { IColor } from "../../util/IColor";
import { ITreeData } from "../data/ITreeData";
import { TreeDataImpl } from "../data/TreeDataImpl";
import { TreeDataProviderImplVectorTileLayer } from "./TreeDataProviderImplVectorTileLayer";
import { Extent } from "esri/geometry";
import { VectorTileAnalysisApp } from "../VectorTileAnalysisApp";
import { IQuadTree } from "../tilemap/IQuadTree";
import { IQuadKey } from "../tilemap/IQuadKey";
import { IQuadLevel } from "../tilemap/IQuadLevel";
import { ILayerSet } from "../../layer/ILayerSet";

export class TreeDataProviderImplVectorTile implements ITreeDataProvider {

    private readonly layerTitle: string;
    private readonly layerSetId: string;
    private readonly tileId: string;
    private readonly color: IColor;
    private readonly vectorTile: Vectortile;
    private readonly filterKeysByLayerName: Object;
    private readonly extent: Extent;
    private readonly quadLevel: IQuadLevel;

    constructor(layerTitle: string, layerSetId: string, tileKey: IQuadKey, color: IColor, extent: Extent, vectorTile: Vectortile, filterKeysByLayerName: Object) {

        this.layerTitle = layerTitle;
        this.layerSetId = layerSetId;
        this.tileId = tileKey.getId();
        this.color = color;
        this.extent = extent;
        this.vectorTile = vectorTile;
        this.filterKeysByLayerName = filterKeysByLayerName;

        let layerSet: ILayerSet = VectorTileAnalysisApp.findLayerSet(layerSetId);
        let tilemap: IQuadTree = layerSet.getBoundariesLayer().getTilemap();
        this.quadLevel = tilemap.findLevel(tileKey);

    }

    getId(): string {
        return this.layerSetId;
    }

    getFilterKey(layer: VectorTileLayer) {
        if (this.filterKeysByLayerName[layer.name]) {
            //user anything that is already set
            return this.filterKeysByLayerName[layer.name];
        } else {
            //check if the layer has any of the following keys, in the given order
            let filterKeys: string[] = ['_symbol', '_name', '_name_global', '_name_en', '_minzoom'];   
            for (let i=0; i<filterKeys.length; i++) {
                if (layer.valueLookup.hasKey(filterKeys[i]) && layer.getValueSet(filterKeys[i]).length > 0) {
                    return filterKeys[i];
                }
            }
        } 
        return null;
    }

    getTreeData(): ITreeData {
        //the map-layer-id is used on the vectortile, so the layer can be found later, i.e. when adding an overlay
        let vectortileDataItem: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX____________TILE), this.getId(), this.layerTitle + ' 🠚 ' + this.tileId, this.vectorTile.byteCount, this.color, this.extent, null);
        for (let i=0; i<this.vectorTile.layers.length; i++) {
            let layer: VectorTileLayer = this.vectorTile.layers[i];
            let layerColor: IColor = this.color.deriveColor(i, this.vectorTile.layers.length);
            let dataItemLayer: ITreeDataProvider = new TreeDataProviderImplVectorTileLayer(layerColor, layer, this.extent, this.quadLevel, this.getFilterKey(layer));
            vectortileDataItem.addChild(dataItemLayer.getTreeData());
        }
        return vectortileDataItem;
    }

}