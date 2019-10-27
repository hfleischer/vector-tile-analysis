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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
define(["require", "exports", "esri/views/2d/layers/BaseLayerView2D", "esri/core/accessorSupport/decorators", "./animation/AnimateBorder0", "./animation/AnimateBorder1", "./animation/AnimateBorder2", "./animation/AnimateBorder3"], function (require, exports, BaseLayerView2D_1, asd, AnimateBorder0_1, AnimateBorder1_1, AnimateBorder2_1, AnimateBorder3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    BaseLayerView2D_1 = __importDefault(BaseLayerView2D_1);
    asd = __importStar(asd);
    /**
     * extension to BaseLayerView2D for rendering the edges of the currently active tile<br>
     * https://developers.arcgis.com/javascript/latest/api-reference/esri-views-2d-layers-BaseLayerView2D.html
     *
     * @author h.fleischer
     * @since 18.10.2019
     */
    var ActiveTileLayerViewSyn = /** @class */ (function (_super) {
        __extends(ActiveTileLayerViewSyn, _super);
        function ActiveTileLayerViewSyn(props, actileTileLayer) {
            var _this = _super.call(this, props) || this;
            _this.activeTileLayer = actileTileLayer;
            _this.animateableBorders = [
                new AnimateBorder0_1.AnimateBorder0(),
                new AnimateBorder1_1.AnimateBorder1(),
                new AnimateBorder2_1.AnimateBorder2(),
                new AnimateBorder3_1.AnimateBorder3()
            ];
            return _this;
        }
        ActiveTileLayerViewSyn.prototype.attach = function () {
        };
        ActiveTileLayerViewSyn.prototype.detach = function () {
        };
        // Called every time a frame is rendered.
        ActiveTileLayerViewSyn.prototype.render = function (renderParameters) {
            //is there a new tile?
            if (this.activeTileLayer.getTile() == null) {
                return;
            }
            var requiresFurtherRendering = false;
            var state = renderParameters.state;
            var context = renderParameters.context;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            if (this.activeTileLayer.isNeedsTileUpdate()) {
                //console.log("tile update needed", this.layer.color);
                //set updates on the corners
                var tileExtent_1 = this.activeTileLayer.getTile().geometry.extent;
                this.animateableBorders.forEach(function (animateableBorder) { return animateableBorder.animateToExtent(tileExtent_1); });
                this.activeTileLayer.setNeedsTileUpdate(false);
                requiresFurtherRendering = true; //new animations pending
            }
            else {
                var rgb = this.activeTileLayer.getColor().getRgb();
                var r = rgb[0] * 255;
                var g = rgb[1] * 255;
                var b = rgb[2] * 255;
                context.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.1)';
                context.lineWidth = 8;
                this.animateableBorders.forEach(function (animateableBorder) { return animateableBorder.drawTo(renderParameters); });
                context.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.9)';
                context.lineWidth = 1;
                this.animateableBorders.forEach(function (animateableBorder) { return animateableBorder.drawTo(renderParameters); });
                //if not done yet, draw another time
                this.animateableBorders.forEach(function (animateableBorder) {
                    if (!animateableBorder.isDone()) {
                        requiresFurtherRendering = true;
                    }
                });
            }
            if (requiresFurtherRendering) {
                this.requestRender();
            }
        };
        ActiveTileLayerViewSyn = __decorate([
            asd.subclass("ActiveTileLayerViewSyn")
        ], ActiveTileLayerViewSyn);
        return ActiveTileLayerViewSyn;
    }(asd.declared(BaseLayerView2D_1.default)));
    exports.ActiveTileLayerViewSyn = ActiveTileLayerViewSyn;
});
