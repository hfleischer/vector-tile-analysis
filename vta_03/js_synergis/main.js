define(["require", "exports", "./protobuf/base/decode/ProtocolTypesPrimitives", "./protobuf/vectortile/ProtocolTypesVectortile", "./vectortile/VectorTileAnalysisApp"], function (require, exports, ProtocolTypesPrimitives_1, ProtocolTypesVectortile_1, VectorTileAnalysisApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //page title(as in version 1)
    //be sure the protocol-buffer-types are ready
    ProtocolTypesPrimitives_1.ProtocolTypesPrimitives.init();
    ProtocolTypesVectortile_1.ProtocolTypesVectortile.init();
    //get the app initialized
    VectorTileAnalysisApp_1.VectorTileAnalysisApp.initLayout();
    VectorTileAnalysisApp_1.VectorTileAnalysisApp.initMap();
    //items are stacked bottom in insertion order, last item added will be top item in the map
    /*
    VectorTileAnalysisApp.addLayerSet({
        id: 'ags_basemap',
        title: 'World_Basemap_v2',
        url: 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer'
    });
    */
    /*
    VectorTileAnalysisApp.addLayerSet({
        id: 'syn_basemap_20190220',
        title: 'bmapv_20190220',
        url: 'http://w-lap-fleischer.synergis.intern/vt_20190220/p12/resources/styles/root.json'
    });
    */
    VectorTileAnalysisApp_1.VectorTileAnalysisApp.addLayerSet({
        visible: true,
        id: 'ags_basemap',
        title: 'World_Basemap_v2',
        url: 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer'
    });
    VectorTileAnalysisApp_1.VectorTileAnalysisApp.addLayerSet({
        visible: false,
        id: 'syn_basemap_20181220',
        title: 'bmapv_20181220',
        url: 'http://w-lap-fleischer.synergis.intern/vt_20181220/p12/resources/styles/root.json'
    });
    VectorTileAnalysisApp_1.VectorTileAnalysisApp.addLayerSet({
        visible: false,
        id: 'syn_basemap_20190220',
        title: 'bmapv_20190220',
        url: 'http://w-lap-fleischer.synergis.intern/vt_20190220/p12/resources/styles/root.json'
    });
    VectorTileAnalysisApp_1.VectorTileAnalysisApp.initMapDetails();
});
