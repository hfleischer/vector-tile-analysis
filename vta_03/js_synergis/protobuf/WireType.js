define(["require", "exports", "./TagUtil"], function (require, exports, TagUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WireTypeVarint32 = /** @class */ (function () {
        function WireTypeVarint32() {
        }
        WireTypeVarint32.prototype.getRaw = function () {
            return 0;
        };
        return WireTypeVarint32;
    }());
    exports.WireTypeVarint32 = WireTypeVarint32;
    var WireTypeFixed64 = /** @class */ (function () {
        function WireTypeFixed64() {
        }
        WireTypeFixed64.prototype.getRaw = function () {
            return 1;
        };
        return WireTypeFixed64;
    }());
    exports.WireTypeFixed64 = WireTypeFixed64;
    var WireTypeLengthDelimited = /** @class */ (function () {
        function WireTypeLengthDelimited() {
        }
        WireTypeLengthDelimited.prototype.getRaw = function () {
            return 2;
        };
        return WireTypeLengthDelimited;
    }());
    exports.WireTypeLengthDelimited = WireTypeLengthDelimited;
    var WireTypeStartGroup = /** @class */ (function () {
        function WireTypeStartGroup() {
        }
        WireTypeStartGroup.prototype.getRaw = function () {
            return 3;
        };
        return WireTypeStartGroup;
    }());
    exports.WireTypeStartGroup = WireTypeStartGroup;
    var WireTypeEndGroup = /** @class */ (function () {
        function WireTypeEndGroup() {
        }
        WireTypeEndGroup.prototype.getRaw = function () {
            return 4;
        };
        return WireTypeEndGroup;
    }());
    exports.WireTypeEndGroup = WireTypeEndGroup;
    var WireTypeFixed32 = /** @class */ (function () {
        function WireTypeFixed32() {
        }
        WireTypeFixed32.prototype.getRaw = function () {
            return 5;
        };
        return WireTypeFixed32;
    }());
    exports.WireTypeFixed32 = WireTypeFixed32;
    /**
     * accessor to the various wire-types as defined in the protocol-buffer standard
     *
     * @author h.fleischer
     * @since 26.07.2019
     */
    var WireType = /** @class */ (function () {
        function WireType() {
        }
        WireType.get = function (index) {
            if (index >= 0 && index < WireType.ALL.length) {
                return this.ALL[index];
            }
            else {
                throw new Error("failed to resolve geomtype (index: " + index + ")");
            }
        };
        /**
         * resolves an instance of IWireType from the given tag-value
         *
         * @param tag
         */
        WireType.toWireType = function (tag) {
            return this.get(TagUtil_1.TagUtil.toCode(tag));
        };
        WireType.INDEX_________VARINT32 = 0;
        WireType.INDEX__________FIXED64 = 1;
        WireType.INDEX_LENGTH_DELIMITED = 2;
        WireType.INDEX______START_GROUP = 3;
        WireType.INDEX________END_GROUP = 4;
        WireType.INDEX__________FIXED32 = 5;
        WireType.ALL = [
            new WireTypeVarint32(),
            new WireTypeFixed64(),
            new WireTypeLengthDelimited(),
            new WireTypeStartGroup(),
            new WireTypeEndGroup(),
            new WireTypeFixed32() //5
        ];
        return WireType;
    }());
    exports.WireType = WireType;
});
