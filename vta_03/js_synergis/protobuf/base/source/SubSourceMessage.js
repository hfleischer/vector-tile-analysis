define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ISubSource wrapping a single message as defined in the protocol-buffer standard<br>
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var SubSourceMessage = /** @class */ (function () {
        function SubSourceMessage(input) {
            this.input = input;
            var messageLength = input.readMessageLength();
            input.pushLimit(messageLength);
        }
        SubSourceMessage.prototype.pushLimit = function (messageLength) {
            this.input.pushLimit(messageLength);
        };
        SubSourceMessage.prototype.peekLimit = function () {
            return this.input.peekLimit();
        };
        SubSourceMessage.prototype.popLimit = function () {
            this.input.popLimit();
        };
        SubSourceMessage.prototype.hasReachedLimit = function () {
            return this.input.hasReachedLimit();
        };
        SubSourceMessage.prototype.readRawVarint32 = function () {
            return this.input.readRawVarint32();
        };
        SubSourceMessage.prototype.readRawVarint64 = function () {
            return this.input.readRawVarint64();
        };
        SubSourceMessage.prototype.readDouble = function () {
            return this.input.readDouble();
        };
        SubSourceMessage.prototype.readString = function () {
            return this.input.readString();
        };
        SubSourceMessage.prototype.getBytesUntilLimit = function () {
            return this.input.getBytesUntilLimit();
        };
        SubSourceMessage.prototype.readMessageLength = function () {
            return this.readRawVarint32();
        };
        return SubSourceMessage;
    }());
    exports.SubSourceMessage = SubSourceMessage;
});
