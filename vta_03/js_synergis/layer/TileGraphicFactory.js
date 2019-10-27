var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "esri/Graphic", "esri/geometry/Polygon", "esri/geometry", "./BoundaryFields"], function (require, exports, Graphic_1, Polygon_1, geometry_1, BF) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Graphic_1 = __importDefault(Graphic_1);
    Polygon_1 = __importDefault(Polygon_1);
    BF = __importStar(BF);
    /**
     * helper type that creates tile-boundary-graphics ready to be added to a tile-boundary layer
     *
     * @author h.fleischer
     * @since 22.09.2019
     */
    var TileGraphicFactory = /** @class */ (function () {
        function TileGraphicFactory(layerId, layerUrl, tileServers) {
            this.layerId = layerId;
            this.layerUrl = layerUrl;
            this.tileServers = tileServers;
        }
        TileGraphicFactory.prototype.createGraphic = function (quadKey, quadTree) {
            var tileRing = quadTree.getRing(quadKey);
            var geometry = new Polygon_1.default({
                spatialReference: new geometry_1.SpatialReference({
                    wkid: 3857
                }),
                rings: [
                    tileRing
                ]
            });
            //console.log('geometry', geometry);
            var randomTileServerIndex = Math.floor(Math.random() * this.tileServers.length);
            var randomTileServer = this.tileServers[randomTileServerIndex];
            var tileUrl = randomTileServer.replace('{z}', quadKey.getLod().toString()).replace('{x}', quadKey.getCol().toString()).replace('{y}', quadKey.getRow().toString());
            var attributes = {};
            attributes[BF.BOUNDARY_FIELD_REF_LAYER_ID.name] = this.layerId;
            attributes[BF.BOUNDARY_FIELD_REF_TILE_URL.name] = tileUrl,
                attributes[BF.BOUNDARY_FIELD_REF_TILE_ID.name] = quadKey.getId(),
                attributes[BF.BOUNDARY_FIELD_REF_TILE_LOD.name] = quadKey.getLod(),
                attributes[BF.BOUNDARY_FIELD_REF_TILE_ROW.name] = quadKey.getRow(),
                attributes[BF.BOUNDARY_FIELD_REF_TILE_COL.name] = quadKey.getCol();
            //console.log('attributes', attributes);
            return new Graphic_1.default({
                attributes: attributes,
                geometry: geometry
            });
        };
        return TileGraphicFactory;
    }());
    exports.TileGraphicFactory = TileGraphicFactory;
});
