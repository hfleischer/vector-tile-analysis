define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * utility for converting between tags (composed of key and type) and keys
     *
     * @author h.fleischer
     * @since 22.07.2019
     */
    var TagUtil = /** @class */ (function () {
        function TagUtil() {
        }
        /**
         * convert key and type to a tag composed of 0bKKKKKTTT bytes
         * @param key
         * @param type
         */
        TagUtil.toTag = function (key, type) {
            return key << TagUtil.TAG_SHIFT_KEY | type;
        };
        /**
         *
         * @param tag convert a tag to a key
         */
        TagUtil.toKey = function (tag) {
            return tag >>> TagUtil.TAG_SHIFT_KEY;
        };
        /**
         *
         * @param tag convert a tag to a code
         */
        TagUtil.toCode = function (tag) {
            return tag & TagUtil.TAG_MASK_TYPE;
        };
        TagUtil.TAG_SHIFT_KEY = 3;
        TagUtil.TAG_MASK_TYPE = 0x7; //0b00000111
        return TagUtil;
    }());
    exports.TagUtil = TagUtil;
});
