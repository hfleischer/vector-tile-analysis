import { IProtocolTypeDefined } from "./IProtocolTypeDefined";
import { ProtocolKeyDefined } from "./ProtocolKeyDefined";
import { SubSourceMessage } from "../source/SubSourceMessage";
import { ProtocolTypes } from "./ProtocolTypes";
import { WireTypeLengthDelimited, WireType } from "../../WireType";
import { ISubSource } from "../source/ISubSource";
import { TagUtil } from "../../TagUtil";

/**
 * generic implementation of IProtocolTypeDefined<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypeDefined<T, F extends ITypeBuilder<T, F>> implements IProtocolTypeDefined<T, F> {
 
    private readonly name: string;
    private readonly supplierOfFactory: Function;
    private readonly definedKeys: ProtocolKeyDefined<T, F>[];

    constructor(name: string, supplierOfFactory: Function) {
        this.name = name;
        this.supplierOfFactory = supplierOfFactory;
        this.definedKeys = [];
    }

    getName(): string {
        return this.name;
    }

    /**
     * get the wire-type that this type is expcting to deserialize
     */
    getWireType(): WireTypeLengthDelimited {
        return WireType.get(WireType.INDEX_LENGTH_DELIMITED);
    }    

    /**
     * defines, and add, a type key to this protocol type
     * @param name 
     * @param key 
     * @param typeUid 
     * @param consumer 
     */
    defineKey(name: string, key: number, typeUid: string, consumer: Function): void {
        this.definedKeys.push(new ProtocolKeyDefined<T, F>(name, key, typeUid, consumer));
    }
    
    /**
     * create a new builder instance ready to deserialize an instance of this type
     */
    newTypeBuilder(): F {
        return this.supplierOfFactory.apply(null);
    }

    /**
     * decode an instance of the type describes by this instance from the given source
     * @param source 
     */
    decode(source: ISubSource): T {

        //create a new builder suitable for this type
        let builder: F = this.newTypeBuilder();

        //create a new subsource for this message
        let subSource: SubSourceMessage;

        try {

            //create a subsource (which will know its byte limit) and apply that size to builder
            subSource = new SubSourceMessage(source);
            builder.setByteCount(subSource.getBytesUntilLimit());

            //keep reading until the limit of the subsource has been reached
            while (!subSource.hasReachedLimit()) {

                let tag: number = subSource.readRawVarint32();
                let key: number = TagUtil.toKey(tag);
                let wireType: any = WireType.toWireType(tag);

                //find a defined key
                let definedKey: ProtocolKeyDefined<T, F> = this.findDefinedKey(key);

                //get the protocol-type as defined by the key and decode the property
                let property: any = ProtocolTypes.fromTypeUid(definedKey.getTypeUid()).decode(subSource);
                
                //apply the property as defined in the builder instantiated at the very beginning of this method
                definedKey.apply(builder, property);
    
            }

            //now (all bytes decoded) let the builder create an appropriate instance
            return builder.build();          

        } finally {
            if (subSource) {
                subSource.popLimit();
            }
        }

    }

    /**
     * from the key defined in this instances (corrsponding to message keys in a *.proto file, find one that matches the given key)
     * @param key 
     */
    findDefinedKey(key: number): ProtocolKeyDefined<T, F> {
        for (let i=0; i<this.definedKeys.length; i++) {
            if (this.definedKeys[i].getKey() == key) {
                return this.definedKeys[i];
            }
        }
        let message: string = "failed to resolve defined key (type: " + this.getName() + ", key: " + key +  ")";
        console.log(message);
        throw new Error(message);
    }

}