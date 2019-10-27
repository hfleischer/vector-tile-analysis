/**
 * defined property / key associatable with a specific IProtocolTypeDefined instance<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
export class ProtocolKeyDefined<T, F extends ITypeBuilder<T, F>> {

    private readonly name: string;
    private readonly key: number;
    private readonly typeUid: string;
    private readonly keyConsumer: Function;

    constructor(name: string, key: number, typeUid: string, keyConsumer: Function) {
        this.name = name;
        this.key = key;
        this.typeUid = typeUid;
        this.keyConsumer = keyConsumer;
    }

    getName(): string {
        return this.name;
    }

    getKey(): number {
        return this.key;
    }

    getTypeUid(): string {
        return this.typeUid;
    }

    /**
     * applies the given property to the given builder as defined by the key consumer held by this instance
     * @param builder 
     * @param property 
     */
    apply(builder: F, property: any): F { 
        return this.keyConsumer.call(builder, builder, property);
    }

}