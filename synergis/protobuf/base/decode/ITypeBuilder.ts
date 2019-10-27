/**
 * definition for builder-types that act as temporary value-holders while deserializing encoded protobuf-types<br>
 * 
 * @author h.fleischer
 * @since 26.07.2019
 */
interface ITypeBuilder<T, F extends ITypeBuilder<T, F>> {

    /**
     * set the bytecount consumed by the message that is the source to this builder<br>
     *
     * @param bytecount
     * @return
     */
    setByteCount(byteCount: number): F;

    /**
     * build an instance of the type that this builder produces
     */
    build(): T;

}