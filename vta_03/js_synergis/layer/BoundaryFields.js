define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BOUNDARY_FIELD_OBJECTID = {
        name: 'OBJECTID',
        alias: 'OBJECTID',
        type: 'oid'
    };
    exports.BOUNDARY_FIELD_REF_LAYER_ID = {
        name: 'REF_LAYER_ID',
        alias: 'REF_LAYER_ID',
        type: 'string'
    };
    exports.BOUNDARY_FIELD_REF_TILE_ID = {
        name: 'REF_TILE_ID',
        alias: 'REF_TILE_ID',
        type: 'string'
    };
    exports.BOUNDARY_FIELD_REF_TILE_URL = {
        name: 'REF_TILE_URL',
        alias: 'REF_TILE_URL',
        type: 'string'
    };
    exports.BOUNDARY_FIELD_REF_TILE_LOD = {
        name: 'REF_TILE_LOD',
        alias: 'REF_TILE_LOD',
        type: 'integer'
    };
    exports.BOUNDARY_FIELD_REF_TILE_ROW = {
        name: 'REF_TILE_ROW',
        alias: 'REF_TILE_ROW',
        type: 'integer'
    };
    exports.BOUNDARY_FIELD_REF_TILE_COL = {
        name: 'REF_TILE_COL',
        alias: 'REF_TILE_COL',
        type: 'integer'
    };
    /**
     * array of field definictions ready to be used as field properties for a custom feature layer
     */
    exports.BOUNDARY_FIELD_PROPS = [
        exports.BOUNDARY_FIELD_OBJECTID,
        exports.BOUNDARY_FIELD_REF_LAYER_ID,
        exports.BOUNDARY_FIELD_REF_TILE_URL,
        exports.BOUNDARY_FIELD_REF_TILE_LOD,
        exports.BOUNDARY_FIELD_REF_TILE_ROW,
        exports.BOUNDARY_FIELD_REF_TILE_COL,
        exports.BOUNDARY_FIELD_REF_TILE_ID
    ];
});
