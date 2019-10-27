import Geometry from 'esri/geometry/Geometry';
import Graphic from 'esri/Graphic';

import { ITreeDataProvider } from "../vectortile/dataprovider/ITreeDataProvider";
import { IPaint } from "../vectortile/overlay/IPaint";
import { IPaintSet } from "../vectortile/overlay/IPaintSet";
import { VectorTileLayerSyn } from "./VectorTileLayerSyn";
import { BoundariesLayerSyn } from "./BoundariesLayerSyn";
import { Extent } from 'esri/geometry';
import { TreeDataVectorTileLoader } from '../vectortile/dataprovider/TreeDataVectorTileLoader';
import { IQuadKey } from '../vectortile/tilemap/IQuadKey';
import { ActiveTileLayerSyn } from './ActiveTileLayerSyn';
import { IDisplayable } from '../util/IDisplayable';

/**
 * definition for types that hold a set of layers logically grouped to visualize aspects of a VectorTile layer that would otherwise not be visible
 * 
 * @author h.fleischer
 * @since 18.10.20129
 */
export interface ILayerSet extends ITreeDataProvider, IDisplayable {

    /////////////////////////////////////////////////////////////////////
    // layers
    /////////////////////////////////////////////////////////////////////

    isCrop(): boolean;
    toggleCrop(): boolean;

    /**
     * a layer that visualized edges of the currently active tile (the tile for which information is shown in the "tile details" tab)
     */
    getActiveTileLayer(): ActiveTileLayerSyn;

    /**
     * a layer the contributes thin boundary lines at the edges of the currently active tile lod
     */
    getBoundariesLayer(): BoundariesLayerSyn;

    /**
     * a layer that containes highlighted vectortile layers
     */
    getVectorUserLayer(): VectorTileLayerSyn;

    /**
     * the vector tile layer being analyzed
     */
    getVectorBaseLayer(): VectorTileLayerSyn;

    /////////////////////////////////////////////////////////////////////
    // paint set (aka "overlay")
    /////////////////////////////////////////////////////////////////////

    addPaintSet(paintSet: IPaintSet): void;

    findPaintSet(paintSetId: string): IPaintSet;

    findPaint(paintId: string): IPaint;

    hasPaintSets(): boolean;

    removePaintSet(paintSetId: string): void;

    /**
     * set a filterkey that shall be used when grouping features in the "tile details" tab
     * @param layerName
     * @param filterKey 
     */
    setFilterKey(layerName: string, filterKey: string): void;

    /**
     * guery the tile that currently intersect the view center<br>
     * @param geometry 
     */
    queryActiveTile(geometry: Geometry): IPromise<Graphic>;

    createTileLoader(tileUrl: string, tileKey: IQuadKey, extent: Extent): TreeDataVectorTileLoader;

}