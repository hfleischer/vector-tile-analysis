var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/request"], function (require, exports, request_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    request_1 = __importDefault(request_1);
    var promiseUtils = require('esri/core/promiseUtils');
    /**
     * utility type for loading an array of bytes from a given url
     *
     * @author h.fleischer
     * @since 21.07.2019
     */
    var ByteLoader = /** @class */ (function () {
        function ByteLoader() {
        }
        /**
         * load from the given url and return a promise resolving to an instance of Uint8Array
         * @param url
         */
        ByteLoader.prototype.load = function (url) {
            var props = {
                responseType: 'array-buffer'
            };
            return promiseUtils.create(function (resolve, reject) {
                request_1.default(url, props).then(function (response) {
                    resolve(new Uint8Array(response.data));
                }, function (failure) {
                    reject(failure);
                });
            });
        };
        return ByteLoader;
    }());
    exports.ByteLoader = ByteLoader;
});
