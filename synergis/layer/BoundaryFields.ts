export const BOUNDARY_FIELD_OBJECTID = {
    name: 'OBJECTID',
    alias: 'OBJECTID',
    type: 'oid'
};
export const BOUNDARY_FIELD_REF_LAYER_ID = {
    name: 'REF_LAYER_ID',
    alias: 'REF_LAYER_ID',
    type: 'string'
};
export const BOUNDARY_FIELD_REF_TILE_ID = {
    name: 'REF_TILE_ID',
    alias: 'REF_TILE_ID',
    type: 'string'
};
export const BOUNDARY_FIELD_REF_TILE_URL = {
    name: 'REF_TILE_URL',
    alias: 'REF_TILE_URL',
    type: 'string'
};
export const BOUNDARY_FIELD_REF_TILE_LOD = {
    name: 'REF_TILE_LOD',
    alias: 'REF_TILE_LOD',
    type: 'integer'
};
export const BOUNDARY_FIELD_REF_TILE_ROW = {
    name: 'REF_TILE_ROW',
    alias: 'REF_TILE_ROW',
    type: 'integer'
};
export const BOUNDARY_FIELD_REF_TILE_COL = {
    name: 'REF_TILE_COL',
    alias: 'REF_TILE_COL',
    type: 'integer'
};

/**
 * array of field definictions ready to be used as field properties for a custom feature layer
 */
export const BOUNDARY_FIELD_PROPS: any[] = [
    BOUNDARY_FIELD_OBJECTID,
    BOUNDARY_FIELD_REF_LAYER_ID,
    BOUNDARY_FIELD_REF_TILE_URL,
    BOUNDARY_FIELD_REF_TILE_LOD,
    BOUNDARY_FIELD_REF_TILE_ROW,
    BOUNDARY_FIELD_REF_TILE_COL,
    BOUNDARY_FIELD_REF_TILE_ID
];