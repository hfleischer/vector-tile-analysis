import MapView from "esri/views/MapView";
import BaseLayerView2D from 'esri/views/2d/layers/BaseLayerView2D';
import { Extent } from 'esri/geometry';
import * as asd from "esri/core/accessorSupport/decorators";

import { AnimateBorder0 } from './animation/AnimateBorder0';
import { AnimateBorder1 } from './animation/AnimateBorder1';
import { AnimateBorder2 } from './animation/AnimateBorder2';
import { AnimateBorder3 } from './animation/AnimateBorder3';
import { ActiveTileLayerSyn } from './ActiveTileLayerSyn';
import { AnimateBorderBase } from "./animation/AnimateBorderBase";

/**
 * extension to BaseLayerView2D for rendering the edges of the currently active tile<br>
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-views-2d-layers-BaseLayerView2D.html
 * 
 * @author h.fleischer
 * @since 18.10.2019
 */
@asd.subclass("ActiveTileLayerViewSyn")
export class ActiveTileLayerViewSyn extends asd.declared(BaseLayerView2D) {

    private readonly animateableBorders: AnimateBorderBase[];
    private readonly activeTileLayer: ActiveTileLayerSyn;

    constructor(props: Object, actileTileLayer: ActiveTileLayerSyn) {
        super(props);
        this.activeTileLayer = actileTileLayer;
        this.animateableBorders = [
            new AnimateBorder0(),
            new AnimateBorder1(),
            new AnimateBorder2(),
            new AnimateBorder3()
        ];
    }

    attach() {

    }

    detach() {

    }

    // Called every time a frame is rendered.
    render(renderParameters: any) {

        //is there a new tile?
        if (this.activeTileLayer.getTile() == null) {
            return;
        }
        
        let requiresFurtherRendering = false;

        var state = renderParameters.state;
        var context = renderParameters.context;

        context.lineCap = 'round';
        context.lineJoin = 'round';

        if (this.activeTileLayer.isNeedsTileUpdate()) {

            //console.log("tile update needed", this.layer.color);

            //set updates on the corners
            let tileExtent: Extent = this.activeTileLayer.getTile().geometry.extent;
            this.animateableBorders.forEach(animateableBorder => animateableBorder.animateToExtent(tileExtent));
            this.activeTileLayer.setNeedsTileUpdate(false);
            requiresFurtherRendering = true; //new animations pending

        } else {

            let rgb: number[] = this.activeTileLayer.getColor().getRgb();
            let r = rgb[0] * 255;
            let g = rgb[1] * 255;
            let b = rgb[2] * 255;

            context.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.1)';
            context.lineWidth = 8;
            this.animateableBorders.forEach(animateableBorder => animateableBorder.drawTo(renderParameters));

            context.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.9)';
            context.lineWidth = 1;
            this.animateableBorders.forEach(animateableBorder => animateableBorder.drawTo(renderParameters));

            //if not done yet, draw another time
            this.animateableBorders.forEach(animateableBorder => {
                if (!animateableBorder.isDone()) {
                    requiresFurtherRendering = true;
                }
            });

        }

        if (requiresFurtherRendering) {
            this.requestRender();
        }
        
    }

}