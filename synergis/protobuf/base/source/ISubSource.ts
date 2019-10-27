export interface ISubSource {

    /**
     * sets a new limit on this instance and returns the limit that was set prior to this call
     * @param newLimit 
     */
    pushLimit(messageLength: number): void;

    /**
     * restore the limit prior prior to the last call to pushLimit
     */
    popLimit(): void;

    /**
     * get (but do not pop) the current limit
     */
    peekLimit(): number;

    /**
     * check whether this instance has reached its current limit
     */
    hasReachedLimit(): boolean;

    /**
     * get the number of remaining bytes until the current limit of this source is reached
     */
    getBytesUntilLimit(): number; 

    /**
     * read a single varint32 from the underlying data-source
     */
    readRawVarint32(): number;

    /**
     * read a single varint64 from the underlying data-source
     */
    readRawVarint64(): number;    

    /**
     * read a single double value from the underlying data source
     */
    readDouble(): number;

    /**
     * read length of string, then string itself
     */
    readString(): string;    

    /**
     * read the length of the message associated with this ISubSource instance
     */
    readMessageLength(): number;      

}