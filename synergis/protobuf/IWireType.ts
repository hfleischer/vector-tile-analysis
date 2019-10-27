/**
 * definition for "wire-types", as specified in the protobuf standard
 * TODO could be converted to enum
 * 
 * @author h.fleischer
 * @since 22.07.2019
 */
export interface IWireType {
    
    /**
     * get the raw code, as encoded in the respective key
     */
    getRaw(): number;

}