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
     * 'border 1' --> right upper
     *
     * @author h.fleischer
     * @since 06.10.2019
     *
     */
    var AnimateBorder1 = /** @class */ (function (_super) {
        __extends(AnimateBorder1, _super);
        function AnimateBorder1() {
            return _super.call(this, Number.MAX_VALUE, Number.MAX_VALUE) || this;
        }
        AnimateBorder1.prototype.animateToExtent = function (extent) {
            this.animateTo([extent.xmax, extent.ymax]);
        };
        AnimateBorder1.prototype.drawAt = function (context, dispCoord) {
            context.moveTo(dispCoord[0] - AnimateBorderBase_1.AnimateBorderBase.dim, dispCoord[1]);
            context.lineTo(dispCoord[0], dispCoord[1]);
            context.lineTo(dispCoord[0], dispCoord[1] + AnimateBorderBase_1.AnimateBorderBase.dim);
            context.stroke();
        };
        return AnimateBorder1;
    }(AnimateBorderBase_1.AnimateBorderBase));
    exports.AnimateBorder1 = AnimateBorder1;
});
