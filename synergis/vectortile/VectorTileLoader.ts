const promiseUtils =  require('esri/core/promiseUtils');

import { ByteLoader } from "../util/ByteLoader";
import { Vectortile } from "../protobuf/vectortile/Vectortile";
import { CodedInputStream } from "../protobuf/base/source/CodedInputStream";
import { SubSource } from "../protobuf/base/source/SubSource";
import { ISubSource } from "../protobuf/base/source/ISubSource";
import { ProtocolTypes } from "../protobuf/base/decode/ProtocolTypes";
import { ProtocolTypesVectortile } from "../protobuf/vectortile/ProtocolTypesVectortile";

/**
 * helper for loading VectorTiles, decoding it from the bytes provided by a ByteLoader
 * 
 * @author h.fleischer
 * @since 12.10.2019
 * 
 */
export class VectorTileLoader {

    load(tileUrl: string): IPromise<Vectortile> {
        return promiseUtils.create(function(resolve:any, reject:any) {
            new ByteLoader().load(tileUrl).then(
                function(byteArray: Uint8Array) {
                    let input = new CodedInputStream(byteArray);
                    let subSource: ISubSource = SubSource.wrapped(input);      
                    let vectorTile: Vectortile = <Vectortile> ProtocolTypes.fromTypeUid(ProtocolTypesVectortile.TYPE_UID____VECTORTILE).decode(subSource);        
                    resolve(vectorTile);
                },
                function(failure: any) {
                    reject(failure);
                }
            );
        });
    }

}