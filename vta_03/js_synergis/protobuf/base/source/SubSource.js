define(["require", "exports", "./SubSourceWrapped"], function (require, exports, SubSourceWrapped_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * accessor util to ISubSource instances<br>
     *
     * @author h.fleischer
     * @since 22.07.2019
     */
    var SubSource = /** @class */ (function () {
        function SubSource() {
        }
        /**
         * create a new instance of ISubSource around the given CodedInputStream<br>
         * @param input
         */
        SubSource.wrapped = function (input) {
            return new SubSourceWrapped_1.SubSourceWrapped(input);
        };
        return SubSource;
    }());
    exports.SubSource = SubSource;
});
