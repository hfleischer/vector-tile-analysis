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
     * 'border 2' --> right lower
     *
     * @author h.fleischer
     * @since 06.10.2019
     *
     */
    var AnimateBorder2 = /** @class */ (function (_super) {
        __extends(AnimateBorder2, _super);
        function AnimateBorder2() {
            return _super.call(this, Number.MAX_VALUE, Number.MIN_VALUE) || this;
        }
        AnimateBorder2.prototype.animateToExtent = function (extent) {
            this.animateTo([extent.xmax, extent.ymin]);
        };
        AnimateBorder2.prototype.drawAt = function (context, dispCoord) {
            context.moveTo(dispCoord[0], dispCoord[1] - AnimateBorderBase_1.AnimateBorderBase.dim);
            context.lineTo(dispCoord[0], dispCoord[1]);
            context.lineTo(dispCoord[0] - AnimateBorderBase_1.AnimateBorderBase.dim, dispCoord[1]);
            context.stroke();
        };
        return AnimateBorder2;
    }(AnimateBorderBase_1.AnimateBorderBase));
    exports.AnimateBorder2 = AnimateBorder2;
});
