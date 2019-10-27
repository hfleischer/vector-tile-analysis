import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

import ContentPane from 'dijit/layout/ContentPane';
import { Uid } from '../util/Uid';
import { ITreeData } from "../vectortile/data/ITreeData";

/**
 * implementation of ILayout around an amchart TreeMap element<br>
 * visit https://www.amcharts.com/ for more information
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class LayoutChart implements ILayout { 

    private readonly dojoElement: ContentPane;
    private readonly htmlElement: HTMLDivElement;
    private readonly chartDiv: HTMLDivElement;
    private chart: am4charts.TreeMap;
    itemSelectCallback: Function;

    constructor(parent: ILayout, region: string, title: string, style?: string) {

        this.htmlElement = document.createElement('div');
        this.htmlElement.setAttribute('id', 'layout_div_' + Uid.random16());
        parent.getHtmlElement().appendChild(this.htmlElement);

        this.chartDiv = document.createElement('div');
        this.chartDiv.style.height = '100%';
        this.chartDiv.style.width = '100%';
        this.htmlElement.appendChild(this.chartDiv);

        let dojoElementArgs = {
            region: region,
            title: title,
            style: style,
            splitter: true
        };
        this.dojoElement = new ContentPane(dojoElementArgs, this.htmlElement);

        // @ts-ignore
        am4core = window['am4core'];
        // @ts-ignore
        am4charts = window['am4charts'];
        // @ts-ignore
        am4themes_animated = window['am4themes_animated'];
        // @ts-ignore
        am4themes_dark = window['am4themes_dark'];

        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);

    }

    getHtmlElement(): HTMLDivElement {
        return this.htmlElement;
    }

    focusItem(itemId: string): void {
        let foundItem = this.findItem(itemId);
        if (foundItem != null) {
            this.chart.zoomToChartDataItem(foundItem);
        }
    }

    findRecursive(itemId: string, treeMapDataItem: am4charts.TreeMapDataItem): am4charts.TreeMapDataItem {
        if (treeMapDataItem.id === itemId) {
            return treeMapDataItem;
        } 
        if (treeMapDataItem.children) {
            for (let i: number = 0; i < treeMapDataItem.children.length; i++) {
                let foundItem: am4charts.TreeMapDataItem = this.findRecursive(itemId, treeMapDataItem.children.getIndex(i));
                if (foundItem != null) {
                    return foundItem;
                }
            }
        }
        return null;
    }

    findItem(itemId: string) {
        for (let c0: number = 0; c0 < this.chart.dataItems.length; c0++) {
            let foundItem: am4charts.TreeMapDataItem = this.findRecursive(itemId, this.chart.dataItems.getIndex(c0));
            if (foundItem != null) {
                return foundItem;
            }
        }  
        return null;
    }

    replaceData(dataItems: ITreeData[]) {

        if (this.chart != null) {
            this.chart.dispose();
        }

        /*
        while(this.htmlElement.childNodes.length > 0) {
            this.htmlElement.removeChild(this.htmlElement.childNodes[0]);
        }
        let chartDiv: HTMLDivElement = document.createElement('div');
        chartDiv.style.height = '100%';
        chartDiv.style.width = '100%';
        this.htmlElement.appendChild(chartDiv);
        */

        this.chart = am4core.create(this.chartDiv, am4charts.TreeMap);
        this.chart.maxLevels = 1; //one level at a time
        this.chart.dataFields.value = 'value';
        this.chart.dataFields.name = 'name';
        this.chart.dataFields.children = 'children';
        this.chart.dataFields.color = 'hex';
        this.chart.dataFields.id = 'id';
        this.chart.homeText = 'tiles';
        this.chart.paddingLeft = 0;
        this.chart.paddingRight = 0;
        this.chart.paddingTop = 3;
        this.chart.paddingBottom = 0;
        
        this.chart.zoomOutButton.disabled  = true;
        
        // templates for the 3 levels in the tree chart (tiles|layers|layer-details)
        let level0SeriesTemplate: am4charts.TreeMapSeries = this.configureSeriesTemplate('0');
        let level1SeriesTemplate: am4charts.TreeMapSeries = this.configureSeriesTemplate('1');
        let level2SeriesTemplate: am4charts.TreeMapSeries = this.configureSeriesTemplate('2');
        let level3SeriesTemplate: am4charts.TreeMapSeries = this.configureSeriesTemplate('3');

        this.chart.data = dataItems;   

        //if a single tile was loaded, wait for the chart to become ready, then expand immediately
        let _this = this;
        this.chart.events.on('ready', function(ev) {
            setTimeout(() => {
                if (dataItems.length == 1) {
                    this.focusItem(dataItems[0].getId());
                }
            }, 100);
        }, this);        
        
        //have the tree open the respective node 
        this.chart.events.on('toggled', function(ev) {
            setTimeout(() => {
                
                //collect all ids needed to unfold the tree 
                var zoomableItem = ev.target.currentlyZoomed;
                var uuids = [];
                while (zoomableItem.id) {
                    uuids.push(zoomableItem.id);
                    zoomableItem = zoomableItem.parent;
                    //console.log('zoomable item', zoomableItem);
                }
                uuids.reverse();

                for (var i=0; i<uuids.length; i++) {
                    _this.itemSelectCallback.call(null, uuids[i]);
                }
                
            }, 100)
        }, this.chart);           

    }

    configureSeriesTemplate(pIndex: string): am4charts.TreeMapSeries {
        			
        // level 0 series template
        let seriesTemplate: am4charts.TreeMapSeries = this.chart.seriesTemplates.create(pIndex);
        let columnTemplate: am4charts.Column = seriesTemplate.columns.template;
        
        seriesTemplate.strokeWidth = 2;
        seriesTemplate.strokeOpacity = 0;
        
        columnTemplate.tooltipPosition = 'pointer';
        columnTemplate.tooltipText = '{name}';

        columnTemplate.adapter.add('tooltipText', function(tooltipText, target) {
            let dataItem: am4core.DataItem = target.dataItem;
            let value: number = dataItem['value'];
            if (value > 1048576) {
                return '{name}\n' + Math.round(value * 100 / 1048576) / 100 + ' MB';
            } else if (value > 1024) {
                return '{name}\n' + Math.round(value * 100 / 1024) / 100 + ' kB';
            } else if (value > 1) {
                return '{name}\n'+ value + ' bytes';
            } else {
                return '{name}\n' + value + ' byte';
            }
        });
        
        seriesTemplate.tooltip.fontSize = 12;
        seriesTemplate.tooltip.numberFormatter.numberFormat = '#######.####';
        
        let seriesBullet: am4charts.LabelBullet = seriesTemplate.bullets.push(new am4charts.LabelBullet());
        seriesBullet.locationX = 1;
        seriesBullet.locationY = 1;
        seriesBullet.dx = 5;
        seriesBullet.dy = 5;
        seriesBullet.label.text = '{name}';
        seriesBullet.label.fontSize = 12;
        seriesBullet.label.horizontalCenter = 'left'; 
        seriesBullet.label.verticalCenter = 'top';
 
        return seriesTemplate;
        
    }    

}
