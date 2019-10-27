var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/request", "./QuadLevelImpl", "./QuadTreeImpl"], function (require, exports, request_1, QuadLevelImpl_1, QuadTreeImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    request_1 = __importDefault(request_1);
    var promiseUtils = require('esri/core/promiseUtils');
    /**
     * helper type loading a vector tile layer index from properties provided by vetor-tile-layer view<br>
     * the index is later used to determine if a single tile actually exists<br>
     *
     * @borrows undocumented properties from the layer-view
     *
     * @author h.fleischer
     * @since 12.10.2019
     */
    var QuadTreeLoader = /** @class */ (function () {
        function QuadTreeLoader(vectorTileLayerView) {
            var vectorTileLayer = vectorTileLayerView.layer;
            var infoByLevel = vectorTileLayerView['_tileInfoView']['_infoByLevel'];
            var _tilemapUrl = vectorTileLayer['serviceUrl'];
            if (!_tilemapUrl.endsWith('/')) {
                _tilemapUrl = _tilemapUrl + '/';
            }
            ;
            _tilemapUrl = _tilemapUrl + 'tilemap';
            this.tilemapUrl = _tilemapUrl;
            this.quadLevels = [];
            for (var i in infoByLevel) {
                this.quadLevels.push(new QuadLevelImpl_1.QuadLevelImpl(parseInt(i), infoByLevel[i].origin, infoByLevel[i].norm));
            }
        }
        QuadTreeLoader.prototype.load = function () {
            var _this = this;
            return promiseUtils.create(function (resolve, reject) {
                request_1.default(_this.tilemapUrl, {
                    responseType: 'json'
                }).then(function (response) {
                    resolve(new QuadTreeImpl_1.QuadTreeImpl(_this.quadLevels, response.data.index));
                }, function (failure) {
                    //TODO maybe an indexed cache
                    reject(failure);
                });
            });
        };
        return QuadTreeLoader;
    }());
    exports.QuadTreeLoader = QuadTreeLoader;
});
