var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/GroupLayer", "esri/layers/TileLayer", "../layout/LayoutBorder", "../layout/LayoutContent", "../layout/LayoutTabs", "../layout/LayoutTree", "../layout/LayoutChart", "../layout/LayoutToolbar", "../layout/LayoutHook", "../layout/LayoutColorPicker", "./selection/VectorTileSelection", "../toc/MapContent", "../layout/LayoutBlock", "../layer/LayerSetImpl"], function (require, exports, Map_1, MapView_1, GroupLayer_1, TileLayer_1, LayoutBorder_1, LayoutContent_1, LayoutTabs_1, LayoutTree_1, LayoutChart_1, LayoutToolbar_1, LayoutHook_1, LayoutColorPicker_1, VectorTileSelection_1, MapContent_1, LayoutBlock_1, LayerSetImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = __importDefault(Map_1);
    MapView_1 = __importDefault(MapView_1);
    GroupLayer_1 = __importDefault(GroupLayer_1);
    TileLayer_1 = __importDefault(TileLayer_1);
    var watchUtils = require('esri/core/watchUtils');
    var VectorTileAnalysisApp = /** @class */ (function () {
        function VectorTileAnalysisApp() {
        }
        VectorTileAnalysisApp.initLayout = function () {
            //layout hook onto existing div element
            VectorTileAnalysisApp.layoutHook = new LayoutHook_1.LayoutHook('layout_div_main');
            //main page (toolbar, content, statusbar)
            VectorTileAnalysisApp.layoutMain = new LayoutBorder_1.LayoutBorder(VectorTileAnalysisApp.layoutHook, LayoutBorder_1.LayoutBorder.CENTER, 'main', 'width:100%; height:100%');
            //primary gui elements
            VectorTileAnalysisApp.layoutHeader = new LayoutToolbar_1.LayoutToolbar(VectorTileAnalysisApp.layoutMain, LayoutBorder_1.LayoutBorder.TOP, 'toolbar', 'width:100%; height:20px');
            VectorTileAnalysisApp.layoutCenter = new LayoutBorder_1.LayoutBorder(VectorTileAnalysisApp.layoutMain, LayoutBorder_1.LayoutBorder.CENTER, 'content', 'width:100%; height:100%');
            VectorTileAnalysisApp.layoutStatus = new LayoutContent_1.LayoutContent(VectorTileAnalysisApp.layoutMain, LayoutBorder_1.LayoutBorder.BOTTOM, 'statusbar', 'width:100%; height:16px; margin: 0px 6px 6px 6px; border: 1px solid var(--gui-border-color); color: var(--font-color)');
            //center gui elements (map in the center, tabs to the right)
            VectorTileAnalysisApp.layoutMap = new LayoutContent_1.LayoutContent(VectorTileAnalysisApp.layoutCenter, LayoutBorder_1.LayoutBorder.CENTER, 'map', 'width:60%; height:100%; border: 1px solid var(--gui-border-color); padding: 0px; margin: 0px 0px 6px 6px');
            VectorTileAnalysisApp.layoutTab = new LayoutTabs_1.LayoutTabs(VectorTileAnalysisApp.layoutCenter, LayoutBorder_1.LayoutBorder.RIGHT, 'meta', 'width:40%; height:100%');
            VectorTileAnalysisApp.layoutTabTileSelection = new LayoutBorder_1.LayoutBorder(VectorTileAnalysisApp.layoutTab, LayoutBorder_1.LayoutBorder.CENTER, 'tile details', 'width:100%; height:100%');
            //map contents
            VectorTileAnalysisApp.mapContentTree = new LayoutTree_1.LayoutTree(VectorTileAnalysisApp.layoutTab, LayoutBorder_1.LayoutBorder.CENTER, 'map details', 'width:100%; height:100%');
            //setup tile selection
            var tileSelectionTree = new LayoutTree_1.LayoutTree(VectorTileAnalysisApp.layoutTabTileSelection, LayoutBorder_1.LayoutBorder.CENTER, 'tile toc', 'width:100%; height:70%');
            var tileSelectionChart = new LayoutChart_1.LayoutChart(VectorTileAnalysisApp.layoutTabTileSelection, LayoutBorder_1.LayoutBorder.BOTTOM, 'tile chart', 'width:100%; height:30%');
            VectorTileAnalysisApp.vectorTileSelection = new VectorTileSelection_1.VectorTileSelection(tileSelectionTree, tileSelectionChart);
            VectorTileAnalysisApp.layoutTab.dojoElement.addChild(VectorTileAnalysisApp.layoutTabTileSelection.dojoElement);
            VectorTileAnalysisApp.layoutTab.dojoElement.addChild(VectorTileAnalysisApp.mapContentTree.dojoElement);
            VectorTileAnalysisApp.layoutViewX = new LayoutBlock_1.LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder_1.LayoutBorder.CENTER, 'pointer-x', 'display:inline-block;width:150px;text-align:right');
            VectorTileAnalysisApp.layoutViewY = new LayoutBlock_1.LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder_1.LayoutBorder.CENTER, 'pointer-y', 'display:inline-block;width:150px;text-align:left');
            VectorTileAnalysisApp.layoutScale = new LayoutBlock_1.LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder_1.LayoutBorder.CENTER, 'scale', 'display:inline-block;width:200px;text-align:left');
            VectorTileAnalysisApp.layoutLevel = new LayoutBlock_1.LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder_1.LayoutBorder.CENTER, 'zoom', 'display:inline-block;width:200px;text-align:left');
            //get the entire layout started
            VectorTileAnalysisApp.layoutHook.startup();
            VectorTileAnalysisApp.layoutColorPicker = new LayoutColorPicker_1.LayoutColorPicker();
        };
        /**
         * find a tile-boundary-layer-set be the root layer id (no postfixes)
         * @param layerId
         */
        VectorTileAnalysisApp.findLayerSet = function (layerId) {
            for (var i = 0; i < VectorTileAnalysisApp.layerSets.length; i++) {
                if (VectorTileAnalysisApp.layerSets[i].getId() === layerId) {
                    return VectorTileAnalysisApp.layerSets[i];
                }
            }
            return null;
        };
        /**
         * add a full layer-set to the applcation<br>
         * - add each layer to it's repective group-layer container<br>
         * - establish the connection between boundary feature layer and vector tile layer
         * @param vectorTileLayerDefinition
         */
        VectorTileAnalysisApp.addLayerSet = function (vectorTileLayerDefinition) {
            var layerSet = new LayerSetImpl_1.LayerSetImpl(vectorTileLayerDefinition);
            VectorTileAnalysisApp.activeTileLayers.add(layerSet.getActiveTileLayer());
            VectorTileAnalysisApp.boundariesLayers.add(layerSet.getBoundariesLayer());
            VectorTileAnalysisApp.vectorBaseLayers.add(layerSet.getVectorBaseLayer());
            VectorTileAnalysisApp.layerSets.push(layerSet);
            VectorTileAnalysisApp.view.whenLayerView(layerSet.getVectorBaseLayer()).then(function (layerView) {
                layerSet.getBoundariesLayer().attachToVectorTileLayerView(layerView);
            });
        };
        VectorTileAnalysisApp.initMap = function () {
            var _this = this;
            var basemapTerrainLayer = new TileLayer_1.default({
                id: 'hillshade',
                visible: true,
                url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer'
            });
            //build the initial set of group layers
            VectorTileAnalysisApp.layerSets = [];
            VectorTileAnalysisApp.activeTileLayers = new GroupLayer_1.default({
                id: 'tile-edge-layers',
                title: 'tile-edges'
            });
            VectorTileAnalysisApp.boundariesLayers = new GroupLayer_1.default({
                id: 'tile-border-layers',
                title: 'tile borders'
            });
            VectorTileAnalysisApp.vectorBaseLayers = new GroupLayer_1.default({
                id: 'vecor-base-layers',
                title: 'vectortiles'
            });
            VectorTileAnalysisApp.vectorUserLayers = new GroupLayer_1.default({
                id: 'vecor-user-layers',
                title: 'vectortiles'
            });
            var map = new Map_1.default({
                layers: [
                    basemapTerrainLayer,
                    VectorTileAnalysisApp.vectorBaseLayers,
                    VectorTileAnalysisApp.vectorUserLayers,
                    VectorTileAnalysisApp.boundariesLayers,
                    VectorTileAnalysisApp.activeTileLayers
                ]
            });
            VectorTileAnalysisApp.view = new MapView_1.default({
                map: map,
                container: VectorTileAnalysisApp.layoutMap.getHtmlElement().getAttribute('id'),
                constraints: {
                    rotationEnabled: false
                }
            });
            VectorTileAnalysisApp.view.ui.remove('zoom');
            watchUtils.whenFalse(VectorTileAnalysisApp.view, ['updating', 'interacting', 'animating'], function () {
                console.log('updating selection');
                VectorTileAnalysisApp.vectorTileSelection.update(VectorTileAnalysisApp.view, VectorTileAnalysisApp.layerSets);
            });
            VectorTileAnalysisApp.view.on('pointer-move', function (event) {
                var point = VectorTileAnalysisApp.view.toMap({ x: event.x, y: event.y });
                VectorTileAnalysisApp.layoutViewX.getHtmlElement().innerHTML = point.x.toFixed(2);
                VectorTileAnalysisApp.layoutViewY.getHtmlElement().innerHTML = '/' + point.y.toFixed(2);
            });
            VectorTileAnalysisApp.view.watch('scale', function (scale) {
                _this.updateZoom();
            });
        };
        VectorTileAnalysisApp.updateZoom = function () {
            VectorTileAnalysisApp.layoutScale.getHtmlElement().innerHTML = 'scale 1:' + VectorTileAnalysisApp.view.scale.toFixed(0);
            VectorTileAnalysisApp.layoutLevel.getHtmlElement().innerHTML = 'lod: ' + VectorTileAnalysisApp.view.zoom.toFixed(2);
        };
        /**
         * initialize the map-toc (vectortile layers being analyzed, overlays that have been added)
         */
        VectorTileAnalysisApp.initMapDetails = function () {
            VectorTileAnalysisApp.mapContent = new MapContent_1.MapContent(VectorTileAnalysisApp.view, VectorTileAnalysisApp.mapContentTree);
            VectorTileAnalysisApp.mapContent.replaceData();
            VectorTileAnalysisApp.view.when(function () {
                VectorTileAnalysisApp.view.goTo({
                    center: [16.3, 48.2],
                    scale: 8000000
                });
            });
        };
        return VectorTileAnalysisApp;
    }());
    exports.VectorTileAnalysisApp = VectorTileAnalysisApp;
});
