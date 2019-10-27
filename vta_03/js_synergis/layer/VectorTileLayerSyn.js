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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/layers/VectorTileLayer"], function (require, exports, VectorTileLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VectorTileLayer_1 = __importDefault(VectorTileLayer_1);
    /**
     * extension of arcgis vectortile layer, adding the IColoredLayer functionality
     *
     * @author h.fleischer
     * @since 05.10.2019
     */
    var VectorTileLayerSyn = /** @class */ (function (_super) {
        __extends(VectorTileLayerSyn, _super);
        function VectorTileLayerSyn(vectorTileLayerProps, color) {
            var _this = _super.call(this, vectorTileLayerProps) || this;
            _this.color = color;
            return _this;
        }
        VectorTileLayerSyn.prototype.getColor = function () {
            return this.color;
        };
        return VectorTileLayerSyn;
    }(VectorTileLayer_1.default));
    exports.VectorTileLayerSyn = VectorTileLayerSyn;
});
