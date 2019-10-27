import { ProtocolTypesPrimitives } from "./protobuf/base/decode/ProtocolTypesPrimitives";
import { ProtocolTypesVectortile } from "./protobuf/vectortile/ProtocolTypesVectortile";
import { VectorTileAnalysisApp } from "./vectortile/VectorTileAnalysisApp";

//page title(as in version 1)

//be sure the protocol-buffer-types are ready
ProtocolTypesPrimitives.init();
ProtocolTypesVectortile.init();

//get the app initialized
VectorTileAnalysisApp.initLayout();
VectorTileAnalysisApp.initMap();

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

VectorTileAnalysisApp.addLayerSet({
    visible: true,
    id: 'ags_basemap',
    title: 'World_Basemap_v2',
    url: 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer'
});
VectorTileAnalysisApp.addLayerSet({
    visible: false,
    id: 'syn_basemap_20181220',
    title: 'bmapv_20181220',
    url: 'http://w-lap-fleischer.synergis.intern/vt_20181220/p12/resources/styles/root.json' 
});
VectorTileAnalysisApp.addLayerSet({
    visible: false,
    id: 'syn_basemap_20190220',
    title: 'bmapv_20190220',
    url: 'http://w-lap-fleischer.synergis.intern/vt_20190220/p12/resources/styles/root.json'
});


VectorTileAnalysisApp.initMapDetails();







