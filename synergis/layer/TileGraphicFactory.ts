import Graphic from 'esri/Graphic';
import Polygon from 'esri/geometry/Polygon';
import { SpatialReference } from 'esri/geometry';

import { IQuadTree } from '../vectortile/tilemap/IQuadTree';
import { IQuadKey } from '../vectortile/tilemap/IQuadKey';
import *  as BF from './BoundaryFields';

/**
 * helper type that creates tile-boundary-graphics ready to be added to a tile-boundary layer
 * 
 * @author h.fleischer
 * @since 22.09.2019
 */
export class TileGraphicFactory {

    readonly layerId: string;
    readonly layerUrl: string;
    readonly tileServers: string[];

    constructor(layerId: string, layerUrl: string, tileServers: string[]) {
        this.layerId = layerId;
        this.layerUrl = layerUrl;
        this.tileServers = tileServers;
    }

    createGraphic(quadKey: IQuadKey, quadTree: IQuadTree): Graphic {

        let tileRing: number[][] = quadTree.getRing(quadKey);
        let geometry: Polygon = new Polygon({
            spatialReference: new SpatialReference({
                wkid: 3857
            }),
            rings: [
                tileRing
            ]
        })
        //console.log('geometry', geometry);

        let randomTileServerIndex: number = Math.floor(Math.random() * this.tileServers.length);
        let randomTileServer = this.tileServers[randomTileServerIndex];
        let tileUrl = randomTileServer.replace('{z}', quadKey.getLod().toString()).replace('{x}', quadKey.getCol().toString()).replace('{y}', quadKey.getRow().toString());

        let attributes: Object = {};
        attributes[BF.BOUNDARY_FIELD_REF_LAYER_ID.name] = this.layerId;
        attributes[BF.BOUNDARY_FIELD_REF_TILE_URL.name] = tileUrl,
        attributes[BF.BOUNDARY_FIELD_REF_TILE_ID.name] = quadKey.getId(),
        attributes[BF.BOUNDARY_FIELD_REF_TILE_LOD.name] = quadKey.getLod(),
        attributes[BF.BOUNDARY_FIELD_REF_TILE_ROW.name] = quadKey.getRow(),
        attributes[BF.BOUNDARY_FIELD_REF_TILE_COL.name] = quadKey.getCol()
        
        //console.log('attributes', attributes);
        return new Graphic({
            attributes: attributes,
            geometry: geometry
        });

    }    

}