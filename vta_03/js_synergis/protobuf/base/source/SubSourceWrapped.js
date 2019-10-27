define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ISubSource<br>
     * this type is the "root" type of ISubSource and implements the limits logic,
     * all actual read calls are delegated to an instance of CodedInputStream<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var SubSourceWrapped = /** @class */ (function () {
        function SubSourceWrapped(input) {
            this.input = input;
            this.limits = [];
            this.limits.push(input.available());
        }
        SubSourceWrapped.prototype.pushLimit = function (messageLength) {
            this.limits.push(this.input.getTotalBytesRead() + messageLength);
        };
        SubSourceWrapped.prototype.peekLimit = function () {
            return this.limits[this.limits.length - 1];
        };
        SubSourceWrapped.prototype.popLimit = function () {
            this.limits.pop();
        };
        SubSourceWrapped.prototype.hasReachedLimit = function () {
            return this.input.getTotalBytesRead() >= this.peekLimit();
        };
        SubSourceWrapped.prototype.readRawVarint32 = function () {
            return this.input.readRawVarint32();
        };
        SubSourceWrapped.prototype.readRawVarint64 = function () {
            return this.input.readRawVarint64();
        };
        SubSourceWrapped.prototype.readDouble = function () {
            return this.input.readDouble();
        };
        SubSourceWrapped.prototype.readString = function () {
            return this.input.readString();
        };
        SubSourceWrapped.prototype.getBytesUntilLimit = function () {
            return this.peekLimit() - this.input.getTotalBytesRead();
        };
        SubSourceWrapped.prototype.readMessageLength = function () {
            return this.input.available();
        };
        return SubSourceWrapped;
    }());
    exports.SubSourceWrapped = SubSourceWrapped;
});
