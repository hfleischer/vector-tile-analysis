import VectorTileLayer from 'esri/layers/VectorTileLayer';
import LayerView from 'esri/views/layers/LayerView';
import request from 'esri/request';
const promiseUtils =  require('esri/core/promiseUtils');


import { IQuadLevel } from './IQuadLevel';
import { QuadLevelImpl } from './QuadLevelImpl';
import { IQuadTree } from './IQuadTree';
import { QuadTreeImpl } from './QuadTreeImpl';

/**
 * helper type loading a vector tile layer index from properties provided by vetor-tile-layer view<br>
 * the index is later used to determine if a single tile actually exists<br>
 * 
 * @borrows undocumented properties from the layer-view
 * 
 * @author h.fleischer
 * @since 12.10.2019
 */
export class QuadTreeLoader  {

    readonly tilemapUrl: string;
    readonly quadLevels: IQuadLevel[];

    constructor(vectorTileLayerView: LayerView) {

        let vectorTileLayer = <VectorTileLayer> vectorTileLayerView.layer;
        let infoByLevel: Object = vectorTileLayerView['_tileInfoView']['_infoByLevel'];

        let _tilemapUrl: string = vectorTileLayer['serviceUrl'];
        if (!_tilemapUrl.endsWith('/')) {
            _tilemapUrl = _tilemapUrl + '/';
        };
        _tilemapUrl = _tilemapUrl + 'tilemap';
        this.tilemapUrl = _tilemapUrl;

        this.quadLevels = [];
        for (let i in infoByLevel) {
            this.quadLevels.push(new QuadLevelImpl(parseInt(i), infoByLevel[i].origin, infoByLevel[i].norm));
        }

    }
    load(): IPromise<IQuadTree> {

        let _this = this;
        return promiseUtils.create(function(resolve:any, reject:any) {
            request(_this.tilemapUrl, {
                responseType: 'json'
            }).then(
                function (response: any) {
                    resolve(new QuadTreeImpl(_this.quadLevels, response.data.index));
                },
                function (failure: any) {
                    //TODO maybe an indexed cache
                    reject(failure);
                }
            )
        });
    }

}
