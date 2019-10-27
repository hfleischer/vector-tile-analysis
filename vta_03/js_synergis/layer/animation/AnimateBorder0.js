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
define(["require", "exports", "./AnimateBorderBase"], function (require, exports, AnimateBorderBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 'border 0' --> left upper
     *
     * @author h.fleischer
     * @since 06.10.2019
     *
     */
    var AnimateBorder0 = /** @class */ (function (_super) {
        __extends(AnimateBorder0, _super);
        function AnimateBorder0() {
            return _super.call(this, Number.MIN_VALUE, Number.MAX_VALUE) || this;
        }
        AnimateBorder0.prototype.animateToExtent = function (extent) {
            this.animateTo([extent.xmin, extent.ymax]);
        };
        AnimateBorder0.prototype.drawAt = function (context, dispCoord) {
            context.moveTo(dispCoord[0], dispCoord[1] + AnimateBorderBase_1.AnimateBorderBase.dim);
            context.lineTo(dispCoord[0], dispCoord[1]);
            context.lineTo(dispCoord[0] + AnimateBorderBase_1.AnimateBorderBase.dim, dispCoord[1]);
            context.stroke();
        };
        return AnimateBorder0;
    }(AnimateBorderBase_1.AnimateBorderBase));
    exports.AnimateBorder0 = AnimateBorder0;
});
