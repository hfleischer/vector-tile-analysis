import { CodedInputStream } from "./CodedInputStream";
import { ISubSource } from "./ISubSource";

/**
 * implementation of ISubSource<br>
 * this type is the "root" type of ISubSource and implements the limits logic,
 * all actual read calls are delegated to an instance of CodedInputStream<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class SubSourceWrapped implements ISubSource {

    /**
     * the input that is being read from
     */
    input:CodedInputStream;

    /**
     * the queue of limits
     */
    limits: number[];     

    constructor(input: CodedInputStream) {
        this.input = input;
        this.limits = [];
        this.limits.push(input.available());
    }

    pushLimit(messageLength: number): void {
        this.limits.push(this.input.getTotalBytesRead() + messageLength);
    }

    peekLimit(): number {
        return this.limits[this.limits.length - 1];
    }

    popLimit(): void {
        this.limits.pop();
    }
    
    hasReachedLimit(): boolean {
        return this.input.getTotalBytesRead() >= this.peekLimit();
    }

    readRawVarint32(): number {
        return this.input.readRawVarint32();
    }

    readRawVarint64(): number {
        return this.input.readRawVarint64();
    }    

    readDouble(): number {
        return this.input.readDouble();
    }

    readString(): string {
        return this.input.readString();
    }

    getBytesUntilLimit(): number {
        return this.peekLimit() - this.input.getTotalBytesRead();
    }    

    readMessageLength(): number {
        return this.input.available();
    }

}