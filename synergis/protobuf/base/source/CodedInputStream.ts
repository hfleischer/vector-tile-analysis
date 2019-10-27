import { TagUtil } from "../../TagUtil";
import { WireType } from "../../WireType";
import { viewPortHandler } from "@amcharts/amcharts4/.internal/core/utils/Instance";

/**
 * partial javascript port of:
 * https://github.com/miracle2k/protobuf/blob/master/java/src/main/java/com/google/protobuf/CodedInputStream.java
 * 
 * @author h.fleischer
 * @since 21.07.2019
 */
export class CodedInputStream {

    /**
     * the underlying bytes
     */
    input: Uint8Array;

    /**
     * the current read position
     */
    totalBytesRead: number;

    constructor(input:Uint8Array) {
        this.input = input;
        this.totalBytesRead = 0;
    }

    available():number {
        return this.input.byteLength;
    }

    readRawByte(): number {
        return this.input[this.totalBytesRead++];
    }

    readRawVarint32(): number {
      return this.readRawVarint(32);
    }

    readRawVarint64(): number {
      return this.readRawVarint(64);
    }

    readRawVarint(maxShift: number): number {

      let shift: number = 0;
      let result: number = 0;

      while (shift < maxShift) {
        let b: number = this.readRawByte();
        result |= (b & 0x7F) << shift;
        if ((b & 0x80) == 0) {
          return result;
        }
        shift += 7;
      }
      
      throw new Error('malformed varint' + maxShift);

    }    

    readDouble(): number {

      let dataBuff: ArrayBuffer = new ArrayBuffer(8);
      let dataView: DataView = new DataView(dataBuff);
      for (let i=0; i<8; i++) {
        dataView.setUint8(i, this.readRawByte());
      }
      return dataView.getFloat64(0);

    }

    readString(): string {

      let stringByteCount: number = this.readRawVarint32();
      let iA = this.totalBytesRead;
      let iB = iA + stringByteCount;
      this.totalBytesRead += stringByteCount;
      return new TextDecoder().decode(this.input.slice(iA, iB));

    }

    getTotalBytesRead(): number {
      return this.totalBytesRead;
    }

    /**
     * get the number of remaining bytes until the current limit of this source is reached
     */
    getBytesUntilLimit():number {
      return this.input.byteLength - this.totalBytesRead;
    }

    /**
     * get the bytecount that the given string value would consume, when encoded
     * @param value 
     */
    static computeStringSizeNoTag(value: string) {
      return new TextEncoder().encode(value).length;
    }

    /**
     * https://github.com/protocolbuffers/protobuf/blob/master/java/core/src/main/java/com/google/protobuf/CodedOutputStream.java
     * @param value 
     */
    static computeUInt32SizeNoTag(value: number): number {
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
    }    

    static computeTagSize(fieldNumber: number): number {
      return CodedInputStream.computeUInt32SizeNoTag(TagUtil.toTag(fieldNumber, WireType.get(WireType.INDEX_________VARINT32).getRaw()));
    }    

    static computeUInt32Size(fieldNumber: number, value: number): number {
      return CodedInputStream.computeTagSize(fieldNumber) + CodedInputStream.computeUInt32SizeNoTag(value);
    }    

    static decodeZigZag(n: number) {
      return (n >>> 1) ^ -(n & 1);
    }    

}