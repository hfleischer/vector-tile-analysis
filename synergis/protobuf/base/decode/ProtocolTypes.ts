import { ProtocolTypeDefined } from "./ProtocolTypeDefined";
import { IProtocolTypeDefined } from "./IProtocolTypeDefined";

/**
 * central collection of IProtocolType instances currently stored in scope<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolTypes {

    static ALL: any = {};


    static define<T, F extends ITypeBuilder<T,F>>(name: string, supplierOfFactory: Function): IProtocolTypeDefined<T,F> {
        return new ProtocolTypeDefined<T,F>(name, supplierOfFactory);
    }

    static fromTypeUid<T, F extends ITypeBuilder<T,F>>(typeUid: string): IProtocolTypeDefined<T,F> {
        let protocolType = ProtocolTypes.ALL[typeUid];
        if (protocolType) {
            return protocolType;
        } else {
            let message: string = "failed to find protocol type (typeUid: " + typeUid + ")";
            console.log(message);
            throw new Error(message);
        }
    }

}