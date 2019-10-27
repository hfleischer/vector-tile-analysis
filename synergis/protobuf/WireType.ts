import { TagUtil } from "./TagUtil";
import { IWireType } from "./IWireType";

export class WireTypeVarint32 implements IWireType {
    getRaw(): number {
        return 0;
    }    
}

export class WireTypeFixed64 implements IWireType {
    getRaw(): number {
        return 1;
    }
}

export class WireTypeLengthDelimited implements IWireType {
    getRaw(): number {
        return 2;
    }
}

export class WireTypeStartGroup implements IWireType {
    getRaw(): number {
        return 3;
    }
}

export class WireTypeEndGroup implements IWireType {
    getRaw(): number {
        return 4;
    }
}
 
export class WireTypeFixed32 implements IWireType {
    getRaw(): number {
        return 5;
    }

}

/**
 * accessor to the various wire-types as defined in the protocol-buffer standard
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class WireType {

    static INDEX_________VARINT32: number = 0;
    static INDEX__________FIXED64: number = 1;
    static INDEX_LENGTH_DELIMITED: number = 2;
    static INDEX______START_GROUP: number = 3;
    static INDEX________END_GROUP: number = 4;
    static INDEX__________FIXED32: number = 5;

    static ALL: any[] = [
        new WireTypeVarint32(), //0
        new WireTypeFixed64(), //1
        new WireTypeLengthDelimited(), //2
        new WireTypeStartGroup(), //3
        new WireTypeEndGroup(), //4
        new WireTypeFixed32() //5
    ]

    static get(index: number): IWireType {
        if (index >= 0 && index < WireType.ALL.length) {
            return this.ALL[index];
        } else {
            throw new Error("failed to resolve geomtype (index: " + index + ")");
        }
    }

    /**
     * resolves an instance of IWireType from the given tag-value
     * 
     * @param tag 
     */
    static toWireType(tag: number): any {
        return this.get(TagUtil.toCode(tag));
    } 

}

