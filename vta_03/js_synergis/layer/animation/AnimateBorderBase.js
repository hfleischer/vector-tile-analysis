define(["require", "exports", "./EasingSineAnimation"], function (require, exports, EasingSineAnimation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimateBorderBase = /** @class */ (function () {
        function AnimateBorderBase(x, y) {
            this.origCoord = [0, 0];
            this.currCoord = [x, y];
        }
        AnimateBorderBase.prototype.isDone = function () {
            if (this.animation != null) {
                return this.animation.getFraction() >= 1;
            }
            return true; //no animation defined yet
        };
        AnimateBorderBase.prototype.animateTo = function (coord) {
            this.destCoord = coord;
            this.origCoord = this.currCoord;
            this.animation = new EasingSineAnimation_1.EasingSineAnimation(250 + Math.random() * 100);
        };
        AnimateBorderBase.prototype.getCurrCoord = function () {
            var fraction = this.animation.getFraction(); //get the fraction into the animation
            if (fraction < 1) {
                var x = this.origCoord[0] + (this.destCoord[0] - this.origCoord[0]) * fraction;
                var y = this.origCoord[1] + (this.destCoord[1] - this.origCoord[1]) * fraction;
                return [x, y];
            }
            else {
                this.origCoord = this.destCoord;
                return this.destCoord;
            }
        };
        AnimateBorderBase.prototype.drawTo = function (renderParameters) {
            var state = renderParameters.state;
            var context = renderParameters.context;
            //get and store the current coordinate
            this.currCoord = this.getCurrCoord();
            //convert to a display coordinate
            var dispCoord = [];
            state.toScreenNoRotation(dispCoord, this.currCoord[0], this.currCoord[1]);
            //let subclass draw at that screen coordinate
            //context.strokeStyle = this.color.getHex();
            this.drawAt(context, dispCoord);
        };
        AnimateBorderBase.dim = 50;
        return AnimateBorderBase;
    }());
    exports.AnimateBorderBase = AnimateBorderBase;
});
