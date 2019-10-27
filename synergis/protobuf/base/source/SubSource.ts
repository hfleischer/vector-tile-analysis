import { CodedInputStream } from "./CodedInputStream";
import { SubSourceWrapped } from "./SubSourceWrapped";
import { ISubSource } from "./ISubSource";

/**
 * accessor util to ISubSource instances<br>
 * 
 * @author h.fleischer
 * @since 22.07.2019
 */
export class SubSource {

    /**
     * create a new instance of ISubSource around the given CodedInputStream<br>
     * @param input 
     */
    static wrapped(input: CodedInputStream): ISubSource {
        return new SubSourceWrapped(input);
    }

}