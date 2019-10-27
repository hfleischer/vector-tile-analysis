define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EasingSineAnimation = /** @class */ (function () {
        function EasingSineAnimation(duration) {
            this.start = new Date().getTime() + 1000 + Math.random() * 250;
            this.duration = duration; //a time in milliseconds
        }
        EasingSineAnimation.prototype.getFraction = function () {
            var elapsed = new Date().getTime() - this.start; //ms
            var timeFraction = elapsed / this.duration; //0 to 1+
            //fully done
            if (timeFraction < 0) {
                return 0;
            }
            if (timeFraction > 1) {
                return 1;
            }
            //return timeFraction;
            var fraction = timeFraction * Math.PI; //0 to PI
            fraction = Math.cos(fraction); //1 to -1
            fraction *= -1; //-1 to 1
            fraction += 1; //0 to 2
            fraction *= 0.5; //0 to 1
            return fraction;
        };
        return EasingSineAnimation;
    }());
    exports.EasingSineAnimation = EasingSineAnimation;
});
