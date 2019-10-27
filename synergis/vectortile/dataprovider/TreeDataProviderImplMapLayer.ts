import Layer from 'esri/layers/Layer';

import { ITreeDataProvider } from './ITreeDataProvider';
import { DataType } from '../data/DataType';
import { Color } from '../../util/Color';
import { TreeDataImpl } from '../data/TreeDataImpl';
import { ITreeData } from '../data/ITreeData';

/**
 * implementation of ITreeDataProvider specific to a basic map-layer<br>
  * 
 * @author h.fleischer
 * @since 04.10.2019
 * @deprecated
 */
export class TreeDataProviderImplMapLayer implements ITreeDataProvider {

    private readonly layer: Layer;

    constructor(layer: Layer) {
        this.layer = layer;
    }

    getId(): string {
        return this.layer.id;
    }

    getTreeData(): ITreeData {
        return new TreeDataImpl(DataType.get(DataType.INDEX______MAP__LAYER), this.getId(), this.layer.title, -1, Color.white(), this.layer.fullExtent, null);
    }

}