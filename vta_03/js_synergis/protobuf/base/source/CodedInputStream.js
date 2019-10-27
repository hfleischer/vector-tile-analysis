define(["require", "exports", "../../TagUtil", "../../WireType"], function (require, exports, TagUtil_1, WireType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * partial javascript port of:
     * https://github.com/miracle2k/protobuf/blob/master/java/src/main/java/com/google/protobuf/CodedInputStream.java
     *
     * @author h.fleischer
     * @since 21.07.2019
     */
    var CodedInputStream = /** @class */ (function () {
        function CodedInputStream(input) {
            this.input = input;
            this.totalBytesRead = 0;
        }
        CodedInputStream.prototype.available = function () {
            return this.input.byteLength;
        };
        CodedInputStream.prototype.readRawByte = function () {
            return this.input[this.totalBytesRead++];
        };
        CodedInputStream.prototype.readRawVarint32 = function () {
            return this.readRawVarint(32);
        };
        CodedInputStream.prototype.readRawVarint64 = function () {
            return this.readRawVarint(64);
        };
        CodedInputStream.prototype.readRawVarint = function (maxShift) {
            var shift = 0;
            var result = 0;
            while (shift < maxShift) {
                var b = this.readRawByte();
                result |= (b & 0x7F) << shift;
                if ((b & 0x80) == 0) {
                    return result;
                }
                shift += 7;
            }
            throw new Error('malformed varint' + maxShift);
        };
        CodedInputStream.prototype.readDouble = function () {
            var dataBuff = new ArrayBuffer(8);
            var dataView = new DataView(dataBuff);
            for (var i = 0; i < 8; i++) {
                dataView.setUint8(i, this.readRawByte());
            }
            return dataView.getFloat64(0);
        };
        CodedInputStream.prototype.readString = function () {
            var stringByteCount = this.readRawVarint32();
            var iA = this.totalBytesRead;
            var iB = iA + stringByteCount;
            this.totalBytesRead += stringByteCount;
            return new TextDecoder().decode(this.input.slice(iA, iB));
        };
        CodedInputStream.prototype.getTotalBytesRead = function () {
            return this.totalBytesRead;
        };
        /**
         * get the number of remaining bytes until the current limit of this source is reached
         */
        CodedInputStream.prototype.getBytesUntilLimit = function () {
            return this.input.byteLength - this.totalBytesRead;
        };
        /**
         * get the bytecount that the given string value would consume, when encoded
         * @param value
         */
        CodedInputStream.computeStringSizeNoTag = function (value) {
            return new TextEncoder().encode(value).length;
        };
        /**
         * https://github.com/protocolbuffers/protobuf/blob/master/java/core/src/main/java/com/google/protobuf/CodedOutputStream.java
         * @param value
         */
        CodedInputStream.computeUInt32SizeNoTag = function (value) {
            if ((value & (~0 << 7)) == 0) {
                return 1;
            }
            if ((value & (~0 << 14)) == 0) {
                return 2;
            }
            if ((value & (~0 << 21)) == 0) {
                return 3;
            }
            if ((value & (~0 << 28)) == 0) {
                return 4;
            }
            return 5;
        };
        CodedInputStream.computeTagSize = function (fieldNumber) {
            return CodedInputStream.computeUInt32SizeNoTag(TagUtil_1.TagUtil.toTag(fieldNumber, WireType_1.WireType.get(WireType_1.WireType.INDEX_________VARINT32).getRaw()));
        };
        CodedInputStream.computeUInt32Size = function (fieldNumber, value) {
            return CodedInputStream.computeTagSize(fieldNumber) + CodedInputStream.computeUInt32SizeNoTag(value);
        };
        CodedInputStream.decodeZigZag = function (n) {
            return (n >>> 1) ^ -(n & 1);
        };
        return CodedInputStream;
    }());
    exports.CodedInputStream = CodedInputStream;
});
