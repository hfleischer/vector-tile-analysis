define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * helper type that holds a layer's keys and values
     *
     * @author h.fleischer
     * @since 23.09.2019
     */
    var ValueLookupImpl = /** @class */ (function () {
        function ValueLookupImpl(keys, values) {
            //console.log('keys, values', keys, values);
            //collect key indices by value (so later a key can be used to lookup an index)
            this.keyPointersByName = {};
            for (var i = 0; i < keys.length; i++) {
                this.keyPointersByName[keys[i]] = i;
            }
            this.values = values;
        }
        /**
         * check if there is a key-index for the given key<br>
         * @param key
         */
        ValueLookupImpl.prototype.hasKey = function (key) {
            return this.getKeyPointer(key) >= 0;
        };
        /**
         * check if the given key (i.e. '_symbol') resolves to an index in this lookup
         * @param key
         */
        ValueLookupImpl.prototype.getKeyPointer = function (key) {
            if (this.keyPointersByName[key] != null) {
                return this.keyPointersByName[key];
            }
            else {
                return -1;
            }
        };
        ValueLookupImpl.prototype.getValue = function (index) {
            if (index >= 0 && index < this.values.length) {
                return this.values[index];
            }
            else {
                return null;
            }
        };
        return ValueLookupImpl;
    }());
    exports.ValueLookupImpl = ValueLookupImpl;
});
