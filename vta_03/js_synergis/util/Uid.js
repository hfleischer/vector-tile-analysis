define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Uid = /** @class */ (function () {
        function Uid() {
        }
        Uid.random16 = function () {
            return Uid.random4() + Uid.random4() + Uid.random4() + Uid.random4();
        };
        Uid.random4 = function () {
            return Uid.random1() + Uid.random1() + Uid.random1() + Uid.random1();
        };
        Uid.random1 = function () {
            return Math.floor((Math.random() * 16)).toString(16);
        };
        return Uid;
    }());
    exports.Uid = Uid;
});
