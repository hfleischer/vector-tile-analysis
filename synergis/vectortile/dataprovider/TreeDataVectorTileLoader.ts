const promiseUtils =  require('esri/core/promiseUtils');

import { ByteLoader } from "../../util/ByteLoader";
import { Vectortile } from "../../protobuf/vectortile/Vectortile";
import { VectorTileLoader } from "../VectorTileLoader";
import { IColor } from "../../util/IColor";
import { ITreeDataProvider } from "./ITreeDataProvider";
import { TreeDataProviderImplVectorTile } from "./TreeDataProviderImplVectorTile";
import { Extent } from "esri/geometry";
import { IQuadKey } from "../tilemap/IQuadKey";

/**
 * loader type that provides a DataItemVectorTile ready to be displayed in the tile-selection (tree / chart)
 * 
 * @author h.fleischer
 * @since 29.09.2019
 */
export class TreeDataVectorTileLoader {

    private readonly byteLoader: ByteLoader;
    private readonly tileUrl: string;
    private readonly layerTitle: string;
    private readonly layerSetId: string;
    private readonly tileKey: IQuadKey;
    private readonly color: IColor;
    private readonly extent: Extent;
    private readonly filterKeysByLayerName: Object;

    constructor(tileUrl: string, layerTitle: string, layerSetId: string, tileKey: IQuadKey, color: IColor, extent: Extent, filterKeysByLayerName: Object) {
        this.tileUrl = tileUrl;
        this.layerTitle = layerTitle;
        this.layerSetId = layerSetId;
        this.tileKey = tileKey;
        this.color = color;
        this.extent = extent;
        this.filterKeysByLayerName = filterKeysByLayerName;
    }

    load(): IPromise<ITreeDataProvider> {
        let _this = this;
        return promiseUtils.create(function(resolve:any, reject:any) {
            new VectorTileLoader().load(_this.tileUrl).then(
                function(vectorTile: Vectortile) {
                    resolve(new TreeDataProviderImplVectorTile(_this.layerTitle, _this.layerSetId, _this.tileKey, _this.color, _this.extent, vectorTile, _this.filterKeysByLayerName));
                },
                function(failure: any) {
                    reject(failure);
                }
            );
        });
    }

}