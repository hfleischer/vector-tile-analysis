import { ITreeDataProvider } from './ITreeDataProvider';
import { IVectorTileValue } from '../../protobuf/vectortile/IVectorTileValue';
import { DataType } from '../data/DataType';
import { Uid } from '../../util/Uid';
import { IColor } from '../../util/IColor';
import { ITreeData } from '../data/ITreeData';
import { TreeDataImpl } from '../data/TreeDataImpl';
import { Extent } from 'esri/geometry';

/**
 * implementation of ITreeDataProvider around an instance of IVectorTileValue
 * 
 * @author h.fleischer
 * @since 04.10.2019
 */
export class TreeDataProviderImplVectorTileValue implements ITreeDataProvider {

    private readonly id: string;
    private readonly color: IColor;
    private readonly value: IVectorTileValue;
    private readonly extent: Extent;

    constructor(color: IColor, value: IVectorTileValue, extent: Extent) {
        this.id = Uid.random16();
        this.color = color;
        this.value = value;
        this.extent = extent;
    }

    getId(): string {
        return this.id;
    }

    getTreeData(): ITreeData {
        return new TreeDataImpl(DataType.get(DataType.INDEX___________VALUE), this.getId(), this.value.getValue(), this.value.getByteCount(), this.color, this.extent, null);
    }

}