var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "./TileGraphicFactory", "../vectortile/tilemap/QuadTreeLoader", "../vectortile/tilemap/QuadKeyImpl", "./BoundaryFields"], function (require, exports, FeatureLayer_1, SimpleRenderer_1, SimpleLineSymbol_1, SimpleFillSymbol_1, TileGraphicFactory_1, QuadTreeLoader_1, QuadKeyImpl_1, BoundaryFields_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    FeatureLayer_1 = __importDefault(FeatureLayer_1);
    SimpleRenderer_1 = __importDefault(SimpleRenderer_1);
    SimpleLineSymbol_1 = __importDefault(SimpleLineSymbol_1);
    SimpleFillSymbol_1 = __importDefault(SimpleFillSymbol_1);
    var promiseUtils = require('esri/core/promiseUtils');
    /**
     * extension to FeatureLayer, attachable to the view of a VectorTileLayer
     * this type will take control of the VectorTileLayer's internal addTile function, thus enabling itself to know which tiles are currently drawn in the map<br>
     *
     * @author h.fleischer
     * @since 21.09.2019
     *
     */
    var BoundariesLayerSyn = /** @class */ (function (_super) {
        __extends(BoundariesLayerSyn, _super);
        function BoundariesLayerSyn(parentUid, title, color) {
            //console.log('title', title);
            var _this_1 = _super.call(this, {
                title: title,
                visible: true,
                source: [],
                fields: BoundaryFields_1.BOUNDARY_FIELD_PROPS,
                objectIdField: BoundaryFields_1.BOUNDARY_FIELD_OBJECTID.name,
                spatialReference: {
                    wkid: 3857
                },
                geometryType: 'polygon',
                popupEnabled: false,
                renderer: new SimpleRenderer_1.default({
                    symbol: new SimpleFillSymbol_1.default({
                        color: [250, 235, 35, 0],
                        outline: new SimpleLineSymbol_1.default({
                            color: [color.getRgb()[0] * 255, color.getRgb()[1] * 255, color.getRgb()[2] * 255, 0.1],
                            width: 0.1
                        })
                    })
                })
            }) || this;
            _this_1.parentUid = parentUid;
            _this_1.color = color;
            _this_1.attachedViews = [];
            return _this_1;
        }
        BoundariesLayerSyn.prototype.getTilemap = function () {
            return this.quadTree;
        };
        BoundariesLayerSyn.prototype.getColor = function () {
            return this.color;
        };
        /**
         * query all tiles in this feature layer having a tile-lod less than or equal the current max-lod (tilelod <= maxlod) at the given location<br>
         * from the results a single feature is chosen having the largest lod value in the results
         *
         * @param geometry
         */
        BoundariesLayerSyn.prototype.queryActiveTile = function (geometry) {
            var where = BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_LOD.name + ' <= ' + this.maxLod; // TileBoundaryFieldNames.REF_TILE_ID + ' IN (' + Array.from(this.activeTileIds).map(val => '\'' + val + '\'').join(',') + ')';
            //console.log('where', where);
            this.definitionExpression = where; //with def query it may not even be necessary to apply to query as well (TODO -> verify)
            var query = this.createQuery();
            query.geometry = geometry;
            query.where = where;
            var _this = this;
            return promiseUtils.create(function (resolve, reject) {
                _this.queryFeatures(query).then(function (results) {
                    //console.log(results.features, results.features.map(feature => feature.attributes[TileBoundaryFieldNames.REF_TILE_LOD]).join('/'));
                    //it appears that when zooming in, some tiles of larger scale lod's are not discarded right away (maybe an optimization to not have to reload those tile upon zooming back out)
                    //however when zooming out, the smaller scale tiles seem to always be discarded right away
                    //therefore it appears safe to assume that it always is the most detailled active tiles that currently get drawn
                    if (results.features.length > 0) {
                        var maxLodFeature = null;
                        for (var i = 0; i < results.features.length; i++) {
                            var lod = results.features[i].attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_LOD.name];
                            if (maxLodFeature == null || lod > maxLodFeature.attributes[BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_LOD.name]) {
                                maxLodFeature = results.features[i];
                            }
                        }
                        resolve(maxLodFeature);
                    }
                    else {
                        reject('no active feature found');
                    }
                }, function (failure) {
                    reject(failure);
                });
            });
        };
        BoundariesLayerSyn.prototype.handleTileAdd = function (lod, col, row) {
            //max lod refers to the original (not corrected) lod -> if there were tiles with that lod, those would display
            this.maxLod = lod;
            //the tile key that is currently added (which may not even exist), and the best match the quad-tree can provide
            var quadKeyQuery = new QuadKeyImpl_1.QuadKeyImpl(lod, col, row);
            var quadKeyMatch = this.quadTree.findKey(quadKeyQuery);
            if (quadKeyMatch != null) {
                this.addIfNotPresent(quadKeyMatch);
            }
        };
        BoundariesLayerSyn.prototype.addIfNotPresent = function (quadKey) {
            var query = this.createQuery();
            query.where = BoundaryFields_1.BOUNDARY_FIELD_REF_TILE_ID.name + ' = \'' + quadKey.getId() + '\'';
            //console.log('where', query.where);
            var _this = this;
            this.queryFeatureCount(query).then(function (count) {
                if (count === 0) {
                    var graphic = _this.tileGraphicFactory.createGraphic(quadKey, _this.quadTree);
                    var edits = {
                        addFeatures: [
                            graphic
                        ]
                    };
                    _this.applyEdits(edits);
                }
            }, function (failure) {
                console.log('failed to query for existing features due to ' + failure);
            });
        };
        BoundariesLayerSyn.prototype.setCropKey = function (cropKey) {
            this.cropKey = cropKey;
            this.clearAttachedViews();
        };
        BoundariesLayerSyn.prototype.clearAttachedViews = function () {
            this.attachedViews.forEach(function (attachedView) {
                if (attachedView['attached']) {
                    // @ts-ignore
                    attachedView._tileStrategy.clear();
                }
            });
        };
        BoundariesLayerSyn.prototype.clearCropKey = function () {
            this.clearAttachedViews();
            this.cropKey = null;
        };
        BoundariesLayerSyn.prototype.attachToVectorTileLayerView = function (vectorTileLayerView) {
            var vectorTileLayer = vectorTileLayerView.layer;
            var _this = this;
            //find loaded lod's (origin, norm, ...)
            if (this.quadTree == null) {
                var quadTreeLoader = new QuadTreeLoader_1.QuadTreeLoader(vectorTileLayerView);
                quadTreeLoader.load().then(function (quadTree) {
                    _this.quadTree = quadTree;
                }, function (failure) {
                    console.log('failed to load quad-tree', failure);
                });
            }
            //boundary factory needs tileServers array which becomes ready at this point
            if (this.tileGraphicFactory == null) {
                this.tileGraphicFactory = new TileGraphicFactory_1.TileGraphicFactory(this.parentUid, vectorTileLayer.url, vectorTileLayer['tileServers']);
            }
            this.attachedViews.push(vectorTileLayerView);
            //kind of a hack, but it needs to be known which tiles are being added to the container so out functionality runs along the standard vectortile api
            var tileContainer = vectorTileLayerView['container'];
            var containerAddChild = tileContainer['addChild'];
            tileContainer['addChild'] = function (tile) {
                //while in crop mode, ignore anything but the current crop tile
                if (_this.cropKey != null) {
                    if (tile.key.level !== _this.cropKey.getLod() || tile.key.col !== _this.cropKey.getCol() || tile.key.row !== _this.cropKey.getRow()) {
                        return;
                    }
                }
                containerAddChild.apply(tileContainer, [tile]); //original call
                _this.handleTileAdd(tile.key.level, tile.key.col, tile.key.row); //injected call
            };
        };
        return BoundariesLayerSyn;
    }(FeatureLayer_1.default));
    exports.BoundariesLayerSyn = BoundariesLayerSyn;
});
