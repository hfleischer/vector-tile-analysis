import { CodedInputStream } from "./CodedInputStream";
import { ISubSource } from "./ISubSource";

/**
 * implementation of ISubSource wrapping a single message as defined in the protocol-buffer standard<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class SubSourceMessage implements ISubSource {

    /**
     * the input that is being read from
     */
    input: ISubSource;

    constructor(input: ISubSource) {
        this.input = input;
        let messageLength = input.readMessageLength();
        input.pushLimit(messageLength);
    }

    pushLimit(messageLength: number): void {
        this.input.pushLimit(messageLength);
    }

    peekLimit(): number {
        return this.input.peekLimit();
    }

    popLimit(): void {
        this.input.popLimit();
    }
    
    hasReachedLimit(): boolean {
        return this.input.hasReachedLimit();
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
        return this.input.getBytesUntilLimit();
    }    

    readMessageLength(): number {
        return this.readRawVarint32();
    }

}