const promiseUtils =  require('esri/core/promiseUtils');
import request from 'esri/request';

/**
 * utility type for loading an array of bytes from a given url
 * 
 * @author h.fleischer
 * @since 21.07.2019
 */
export class ByteLoader {

    /**
     * load from the given url and return a promise resolving to an instance of Uint8Array
     * @param url 
     */
    load (url:string): IPromise<Uint8Array> {
        let props = {
            responseType: 'array-buffer'
        };
        return promiseUtils.create(function(resolve:any, reject:any) {
            request(url, props).then(
                function(response:any) {
                    resolve(new Uint8Array(response.data));
                },
                function(failure:any) {
                    reject(failure);
                }
            );            
        });
    }

}