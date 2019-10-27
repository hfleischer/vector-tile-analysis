import { IQuadLevel } from "./IQuadLevel";
import { IQuadTree } from "./IQuadTree";
import { IQuadKey } from "./IQuadKey";
import { QuadKeyImpl } from "./QuadKeyImpl";

/**
 * implementation of IQuadTree
 * 
 * @author h.fleischer
 * @since 10.10.2019
 */
export class QuadTreeImpl implements IQuadTree {

    private readonly quadLevels: IQuadLevel[];
    private readonly index: any;

    constructor(quadLevels: IQuadLevel[], index: any) {
        this.quadLevels = quadLevels;
        this.index = index;
    }

    private hasKey(searchKey: IQuadKey): boolean {
        let foundKey: IQuadKey = this.findKey(searchKey);
        return (foundKey != null && foundKey.getLod() == searchKey.getLod() && foundKey.getCol() == searchKey.getCol() && foundKey.getRow() == searchKey.getRow());
    }

    findLevel(quadKey: IQuadKey): IQuadLevel {
        return this.quadLevels[quadKey.getLod()];
    }

    findKey(searchKey: IQuadKey): IQuadKey {
                	
        if (this.index != null) {
        
            let _index = this.index;
            let col: number;
            let row: number;
            let quadIndex: number;
            for (let lod = 1; lod < searchKey.getLod(); lod++) {
                
                col = searchKey.getCol() >> searchKey.getLod() - lod;
                row = searchKey.getRow() >> searchKey.getLod() - lod;
                quadIndex = (col % 2) + (row % 2) * 2; //the quad-index in that lod (a value between 0 and 3)
                
                let qValue: any;
                
                try {
                    qValue = _index[quadIndex];
                } catch(err) {
                    console.log('caught an error while reading index ' + quadIndex + ' from index');
                }
                
                if (qValue === 0) { //that entire branch missing
                    return null;
                } else if (qValue === 1) { //that entire branch ending, this is the best match we can provide for the given search key
                    return new QuadKeyImpl(lod, col, row);
                } 
                _index = _index[quadIndex];
                
            } 
            
        }
        
        return searchKey;
        
    } 
    
    getRing(quadKey: IQuadKey): number[][] {
                	
        //evalutate bounds from  lod/column/row
        let norm: number[] = this.quadLevels[quadKey.getLod()].getNorm();
        let xMin = this.quadLevels[quadKey.getLod()].getOrigin()[0] + quadKey.getCol() * norm[0];
        let xMax = xMin + norm[0];
        let yMin = this.quadLevels[quadKey.getLod()].getOrigin()[1] - quadKey.getRow() * norm[1];
        let yMax = yMin - norm[1];

        //build a ring from the x-y values
        return [
            [xMax, yMin], //upper right
            [xMin, yMin], //upper left
            [xMin, yMax], //lower left
            [xMax, yMax], //lower right
            [xMax, yMin] //upper right
        ];                   	
        
    }    

}