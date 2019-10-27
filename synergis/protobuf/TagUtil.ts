/**
 * utility for converting between tags (composed of key and type) and keys
 * 
 * @author h.fleischer
 * @since 22.07.2019
 */
export class TagUtil {

    static TAG_SHIFT_KEY: number = 3;
    static TAG_MASK_TYPE: number = 0x7; //0b00000111

    /**
     * convert key and type to a tag composed of 0bKKKKKTTT bytes
     * @param key 
     * @param type 
     */
    static toTag(key: number, type: number): number { //TODO enum type
        return key << TagUtil.TAG_SHIFT_KEY | type;
    }  

    /**
     * 
     * @param tag convert a tag to a key
     */
    static toKey(tag: number): number {
        return tag >>> TagUtil.TAG_SHIFT_KEY;
    } 

    /**
     * 
     * @param tag convert a tag to a code
     */
    static toCode(tag: number): number {
        return tag & TagUtil.TAG_MASK_TYPE;
    }     
   

}