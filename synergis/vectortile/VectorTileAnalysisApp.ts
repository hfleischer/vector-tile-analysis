const watchUtils = require('esri/core/watchUtils');

import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import GroupLayer from "esri/layers/GroupLayer";
import TileLayer from "esri/layers/TileLayer";

import { LayoutBorder } from "../layout/LayoutBorder";
import { LayoutContent } from "../layout/LayoutContent";
import { LayoutTabs } from "../layout/LayoutTabs";
import { LayoutTree } from "../layout/LayoutTree";
import { LayoutChart } from "../layout/LayoutChart";
import { LayoutToolbar } from "../layout/LayoutToolbar";
import { LayoutHook } from "../layout/LayoutHook";
import { LayoutColorPicker } from "../layout/LayoutColorPicker";
import { VectorTileSelection } from "./selection/VectorTileSelection";
import { MapContent } from "../toc/MapContent";
import { LayoutBlock } from "../layout/LayoutBlock";
import { ILayerSet } from "../layer/ILayerSet";
import { LayerSetImpl } from "../layer/LayerSetImpl";
import { IColor } from "../util/IColor";
import { Color } from "../util/Color";

export class VectorTileAnalysisApp {

    //layout hook onto existing div element
    private static layoutHook: LayoutHook;

    //main page (toolbar, content, statusbar)
    private static layoutMain: LayoutBorder; 

    //primary gui elements
    private static layoutHeader: LayoutContent;    
    private static layoutCenter: LayoutBorder;
    private static layoutStatus: LayoutContent;

    //center gui elements (map in the center, tabs to the right)
    private static layoutMap: LayoutContent;
    private static layoutTab: LayoutTabs;
    private static layoutTabTileSelection: LayoutBorder;

    //indicator for view x-center, y-center, scale, lod
    private static layoutViewY: LayoutBlock;
    private static layoutViewX: LayoutBlock;
    private static layoutScale: LayoutBlock;
    private static layoutLevel: LayoutBlock;

    private static layoutMapColor1: LayoutBlock;
    private static layoutMapColor2: LayoutBlock;

    /**
     * special layout element, a color picker ready to be shown
     */
    static layoutColorPicker: LayoutColorPicker;

    //current map content (feature layers, vectortile layers, overlays)
    static mapContentTree: LayoutTree;

    //functional variables
    static layerSets: ILayerSet[];
    static vectorTileSelection: VectorTileSelection;
    static mapContent: MapContent;

    //map
    static view: MapView;
    private static activeTileLayers: GroupLayer; //corner markers where the currently selected tiles are
    private static boundariesLayers: GroupLayer; //thin markers where tile boundaries are
    static vectorBaseLayers: GroupLayer; //vector tile layers
    static vectorUserLayers: GroupLayer;

    static initLayout(): void {

        //layout hook onto existing div element
        VectorTileAnalysisApp.layoutHook = new LayoutHook('layout_div_main');

        //main page (toolbar, content, statusbar)
        VectorTileAnalysisApp.layoutMain = new LayoutBorder(VectorTileAnalysisApp.layoutHook, LayoutBorder.CENTER, 'main', 'width:100%; height:100%'); 

        //primary gui elements
        VectorTileAnalysisApp.layoutHeader = new LayoutContent(VectorTileAnalysisApp.layoutMain, LayoutBorder.TOP, 'toolbar', 'overflow: hidden; background-color: var(--pane-background); width:100%; height:24px; margin: 6px 6px 6px 6px; color: var(--font-color)');    
        VectorTileAnalysisApp.layoutCenter = new LayoutBorder(VectorTileAnalysisApp.layoutMain, LayoutBorder.CENTER, 'content', 'width:100%; height:100%');
        VectorTileAnalysisApp.layoutStatus = new LayoutContent(VectorTileAnalysisApp.layoutMain, LayoutBorder.BOTTOM, 'statusbar', 'overflow: hidden; background-color: var(--pane-background); width:100%; height:16px; margin: 0px 6px 6px 6px; color: var(--font-color)');

        //center gui elements (map in the center, tabs to the right)
        VectorTileAnalysisApp.layoutMap = new LayoutContent(VectorTileAnalysisApp.layoutCenter, LayoutBorder.CENTER, 'map', 'border:none; width:60%; height:100%; padding: 0px; margin: 0px 0px 6px 6px; background-color: var(--pane-background)');
        VectorTileAnalysisApp.layoutTab = new LayoutTabs(VectorTileAnalysisApp.layoutCenter, LayoutBorder.RIGHT, 'meta', 'width:40%; height:100%');
        VectorTileAnalysisApp.layoutTabTileSelection = new LayoutBorder(VectorTileAnalysisApp.layoutTab, LayoutBorder.CENTER, 'tile details', 'width:100%; height:100%');

        //map contents
        VectorTileAnalysisApp.mapContentTree = new LayoutTree(VectorTileAnalysisApp.layoutTab, LayoutBorder.CENTER, 'map details', 'width:100%; height:100%');

        //setup tile selection
        let tileSelectionTree: LayoutTree = new LayoutTree(VectorTileAnalysisApp.layoutTabTileSelection, LayoutBorder.CENTER, 'tile toc', 'width:100%; height:70%');
        let tileSelectionChart: LayoutChart = new LayoutChart(VectorTileAnalysisApp.layoutTabTileSelection, LayoutBorder.BOTTOM, 'tile chart', 'width:100%; height:30%');
        VectorTileAnalysisApp.vectorTileSelection = new VectorTileSelection(tileSelectionTree, tileSelectionChart);

        VectorTileAnalysisApp.layoutTab.dojoElement.addChild(VectorTileAnalysisApp.layoutTabTileSelection.dojoElement);
        VectorTileAnalysisApp.layoutTab.dojoElement.addChild(VectorTileAnalysisApp.mapContentTree.dojoElement);

        VectorTileAnalysisApp.layoutViewX = new LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder.CENTER, 'pointer-x', 'display:inline-block; width:150px; text-align:right; background-color: var(--pane-background)');
        VectorTileAnalysisApp.layoutViewY = new LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder.CENTER, 'pointer-y', 'display:inline-block; width:150px; text-align:left; background-color: var(--pane-background)');
        VectorTileAnalysisApp.layoutScale = new LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder.CENTER, 'scale', 'display:inline-block; width:200px; text-align:left; background-color: var(--pane-background)');
        VectorTileAnalysisApp.layoutLevel = new LayoutBlock(VectorTileAnalysisApp.layoutStatus, LayoutBorder.CENTER, 'zoom', 'display:inline-block; width:200px; text-align:left; background-color: var(--pane-background)');                

        VectorTileAnalysisApp.addMapBackgroundColorChoice(Color.parseHex('#000000'));
        VectorTileAnalysisApp.addMapBackgroundColorChoice(Color.parseHex('#00384d'));
        VectorTileAnalysisApp.addMapBackgroundColorChoice(Color.parseHex('#0082b3'));
        VectorTileAnalysisApp.addMapBackgroundColorChoice(Color.parseHex('#FFFFFF'));

        VectorTileAnalysisApp.addSpatialBookmark('basemap sample tile', {
            center: [15.11, 48.22],   
            scale: 577790,
        });     
        VectorTileAnalysisApp.addSpatialBookmark('park in saudi arabia', {
            center: [36.48, 29.35],   
            scale: 4622324
        });
        VectorTileAnalysisApp.addSpatialBookmark('berlin detail', {
            center: [13.397827153552527, 52.519563527352574],   
            scale: 9000
        });


        //get the entire layout started
        VectorTileAnalysisApp.layoutHook.startup(); 

        VectorTileAnalysisApp.layoutColorPicker = new LayoutColorPicker();        

    }

    static addSpatialBookmark(title: string, target: any) {
        let spatialBookmarkChoice: LayoutBlock = new LayoutBlock(VectorTileAnalysisApp.layoutHeader, LayoutBorder.CENTER, 'zoom', 'cursor: pointer; display:inline-block; margin: 4px 4px 4px 0px; width:16px; float: right; background-color: var(--pane-background)');  
        spatialBookmarkChoice.getHtmlElement().innerHTML = '<img src="images/sbm16.png" width="16" height="16" title="' + title + '" />';     
        spatialBookmarkChoice.getHtmlElement().onclick = function() {
            VectorTileAnalysisApp.view.goTo(target, {
                duration: 7000
            });
        }        
    };

    static addMapBackgroundColorChoice(color: IColor): void {
        let mapBackgroundColorChoice: LayoutBlock = new LayoutBlock(VectorTileAnalysisApp.layoutHeader, LayoutBorder.CENTER, 'zoom', 'cursor: pointer; display:inline-block; margin: 4px 0px 4px 4px; width:16px; text-align:left; border: 1px solid var(--page-background); background-color: ' + color.getHex());  
        mapBackgroundColorChoice.getHtmlElement().innerHTML = '&nbsp;';     
        mapBackgroundColorChoice.getHtmlElement().onclick = function() {
            VectorTileAnalysisApp.setMapBackground(color);
        }
    }

    static setMapBackground(color: IColor): void {
        VectorTileAnalysisApp.layoutMap.getHtmlElement().style.backgroundColor = color.getHex();
    }

    /**
     * find a tile-boundary-layer-set be the root layer id (no postfixes)
     * @param layerId 
     */
    static findLayerSet(layerId: string): ILayerSet {
        for (let i=0; i<VectorTileAnalysisApp.layerSets.length; i++) {
            if (VectorTileAnalysisApp.layerSets[i].getId() === layerId) {
                return VectorTileAnalysisApp.layerSets[i];
            }
        }
        return null;
    }

    /**
     * add a full layer-set to the applcation<br>
     * - add each layer to it's repective group-layer container<br>
     * - establish the connection between boundary feature layer and vector tile layer
     * @param vectorTileLayerDefinition
     */
    static addLayerSet(vectorTileLayerDefinition: Object): void {
        let layerSet: ILayerSet = new LayerSetImpl(vectorTileLayerDefinition);
        VectorTileAnalysisApp.activeTileLayers.add(layerSet.getActiveTileLayer());
        VectorTileAnalysisApp.boundariesLayers.add(layerSet.getBoundariesLayer());
        VectorTileAnalysisApp.vectorBaseLayers.add(layerSet.getVectorBaseLayer());
        VectorTileAnalysisApp.layerSets.push(layerSet);
        VectorTileAnalysisApp.view.whenLayerView(layerSet.getVectorBaseLayer()).then(layerView => {
            layerSet.getBoundariesLayer().attachToVectorTileLayerView(layerView);
        });        
    }

    static initMap(): void {

        let basemapTerrainLayer: TileLayer = new TileLayer({
            id: 'hillshade',
            visible: true,
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer'
        });

        //build the initial set of group layers
        VectorTileAnalysisApp.layerSets = [];

        VectorTileAnalysisApp.activeTileLayers = new GroupLayer({
            id: 'tile-edge-layers',
            title: 'tile-edges'
        });
        VectorTileAnalysisApp.boundariesLayers = new GroupLayer({
            id: 'tile-border-layers',
            title: 'tile borders'
        });
        VectorTileAnalysisApp.vectorBaseLayers = new GroupLayer({
            id: 'vecor-base-layers',
            title: 'vectortiles'
        });   
        VectorTileAnalysisApp.vectorUserLayers = new GroupLayer({
            id: 'vecor-user-layers',
            title: 'vectortiles'
        });               

        let map = new EsriMap({    
            layers: [
                basemapTerrainLayer,
                VectorTileAnalysisApp.vectorBaseLayers,
                VectorTileAnalysisApp.vectorUserLayers,
                VectorTileAnalysisApp.boundariesLayers,
                VectorTileAnalysisApp.activeTileLayers
            ]
        });
        VectorTileAnalysisApp.view = new MapView({ 
            map: map,
            container: VectorTileAnalysisApp.layoutMap.getHtmlElement().getAttribute('id'),
            constraints: {
                rotationEnabled: false 
            }	
        });
        VectorTileAnalysisApp.view.ui.remove('zoom');

        watchUtils.whenFalse(VectorTileAnalysisApp.view, ['updating', 'interacting', 'animating'], () => {
            VectorTileAnalysisApp.vectorTileSelection.update(VectorTileAnalysisApp.view, VectorTileAnalysisApp.layerSets);
        });

        /*
        VectorTileAnalysisApp.view.watch('center', center => {
            console.log('center', center,  VectorTileAnalysisApp.view.scale);
        });
        */

        VectorTileAnalysisApp.view.on('pointer-move', event => {
            var point = VectorTileAnalysisApp.view.toMap({x: event.x, y: event.y});
            VectorTileAnalysisApp.layoutViewX.getHtmlElement().innerHTML = point.x.toFixed(2);
            VectorTileAnalysisApp.layoutViewY.getHtmlElement().innerHTML = '/' + point.y.toFixed(2);
        });	

        VectorTileAnalysisApp.view.watch('scale', scale => {
            this.updateZoom();
        });		    
      
    }

    static updateZoom(): void {
        VectorTileAnalysisApp.layoutScale.getHtmlElement().innerHTML = 'scale 1:' + VectorTileAnalysisApp.view.scale.toFixed(0); 
        VectorTileAnalysisApp.layoutLevel.getHtmlElement().innerHTML = 'lod: ' + VectorTileAnalysisApp.view.zoom.toFixed(2);
    }

    /**
     * initialize the map-toc (vectortile layers being analyzed, overlays that have been added)
     */
    static initMapDetails(): void {

        VectorTileAnalysisApp.mapContent = new MapContent(VectorTileAnalysisApp.view, VectorTileAnalysisApp.mapContentTree);
        VectorTileAnalysisApp.mapContent.replaceData();

        VectorTileAnalysisApp.view.when(() => {
            VectorTileAnalysisApp.view.goTo({
                center: [16.87, 52.48],   
                scale: 8000000,
            });
        });

    }


}