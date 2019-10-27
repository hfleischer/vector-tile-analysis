import { ITreeDataProvider } from './ITreeDataProvider';
import { VectorTileLayer } from '../../protobuf/vectortile/VectorTileLayer';
import { DataType } from '../data/DataType';
import { IDataType } from '../data/IDataType';
import { IGeomType } from '../../protobuf/vectortile/IGeomType';
import { IVectorTileValue } from '../../protobuf/vectortile/IVectorTileValue';
import { VectorTileFeature } from '../../protobuf/vectortile/VectorTileFeature';
import { CodedInputStream } from '../../protobuf/base/source/CodedInputStream';
import { Uid } from '../../util/Uid';
import { IColor } from '../../util/IColor';
import { ITreeData } from '../data/ITreeData';
import { TreeDataImpl } from '../data/TreeDataImpl';
import { ValueFilterImpl } from '../../protobuf/vectortile/value/ValueFilterImpl';
import { TreeDataProviderImplVectorTileValue } from './TreeDataProviderImplVectorTileValue';
import { Extent } from 'esri/geometry';
import { IQuadLevel } from '../tilemap/IQuadLevel';
import { IValueFilter } from '../data/IValueFilter';

/**
 * implementation of ITreeDataProvider specific to the VectorTileLayer type<br>
 * this type provides tree and chart data related to a single vectortile-layer
 * 
 * @author h.fleischer
 * @since 23.09.2019
 */
export class TreeDataProviderImplVectorTileLayer implements ITreeDataProvider {

    private readonly id: string;
    private readonly color: IColor;
    private readonly layer: VectorTileLayer;
    private readonly extent: Extent;
    private readonly filterKey: string;
    private readonly quadLevel: IQuadLevel;

    constructor(color: IColor, layer: VectorTileLayer, extent: Extent, quadLevel: IQuadLevel, filterKey: string) {
        this.id = Uid.random16();
        this.color = color;
        this.layer = layer;
        this.extent = extent;
        this.quadLevel = quadLevel;
        this.filterKey = filterKey;
    }

    getId(): string {
        return this.id;
    }

    getFeatureLabel(featureCount: number) {
        if (featureCount === 0) {
            return 'no feature';
        } if (featureCount === 1) {
            return '1 feature';
        } else {
            return featureCount + ' features';
        }
    }

    getTreeData(): ITreeData {

        let geomType: IGeomType = this.layer.getGeometryType();
        let dataType: IDataType = geomType.getDataType();

        let layerData: ITreeData = new TreeDataImpl(dataType, this.getId(), this.layer.name + ' (' + this.getFeatureLabel(this.layer.features.length) + ', ' + this.layer.getVertexCount() + ' vertices)', this.layer.byteCount, this.color, this.extent, new ValueFilterImpl(this.layer.name));

        let versionData: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX_________VERSION), Uid.random16(), 'version 🠚 ' + this.layer.version, CodedInputStream.computeUInt32SizeNoTag(this.layer.version), this.color, this.extent, null);
        layerData.addChild(versionData);

        let nameData: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX____________NAME), Uid.random16(), 'name 🠚 ' + this.layer.name, CodedInputStream.computeStringSizeNoTag(this.layer.name), this.color, this.extent, null);
        layerData.addChild(nameData);

        let totalFeatureByteCount: number = 0;
        this.layer.features.forEach(feature => totalFeatureByteCount += feature.byteCount);
        //get a set of values from the layer for the given filterKey (including the empty value, if some feautures dont have a value for this key)
        //TODO check if the empty-value is contained
        let valueSet: IVectorTileValue[] = this.layer.getValueSet(this.filterKey);
        if (valueSet.length > 1) {

            //2 or more values sets

            let featureSetsData: ITreeData = new TreeDataImpl(dataType, Uid.random16(), 'features grouped by ' + this.filterKey + ' (' + valueSet.length + ' distinct values)', totalFeatureByteCount, this.color, this.extent, new ValueFilterImpl(this.layer.name));
            for (let i=0; i<valueSet.length; i++) {
                let features: VectorTileFeature[] = this.layer.getFeatures(this.filterKey, valueSet[i]);
                let totalFeatureSetByteCount: number = 0;
                let totalFeatureSetVertexCount: number = 0;
                features.forEach(feature => totalFeatureSetByteCount += feature.byteCount);
                features.forEach(feature => totalFeatureSetVertexCount += feature.coordCount);
                let featureSetColor: IColor = this.color.deriveColor(i, valueSet.length);
                let featureSetData: ITreeData = new TreeDataImpl(dataType, Uid.random16(), this.filterKey + ' 🠚 ' + valueSet[i].getValue() + ' (' + this.getFeatureLabel(features.length) + ', ' + totalFeatureSetVertexCount + ' vertices)', totalFeatureSetByteCount, featureSetColor, this.extent, new ValueFilterImpl(this.layer.name, this.filterKey, valueSet[i]));
                featureSetsData.addChild(featureSetData);
            }
            layerData.addChild(featureSetsData);

        } else {

            //0 or 1 valuesets

            let features: VectorTileFeature[] = this.layer.features;
            let totalFeatureSetByteCount: number = 0;
            features.forEach(feature => totalFeatureSetByteCount += feature.byteCount);
            let featuresData: ITreeData = new TreeDataImpl(dataType, Uid.random16(), 'features (' + features.length + ')', totalFeatureSetByteCount, this.color, this.extent, null);
            layerData.addChild(featuresData);

        }

        let totalKeyByteCount: number = 0;
        this.layer.keys.forEach(key => totalKeyByteCount += CodedInputStream.computeStringSizeNoTag(key));
        let keysData: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX____________KEYS), Uid.random16(), 'keys (' + this.layer.keys.length + ')', totalKeyByteCount, this.color, this.extent, null);
        this.layer.keys.forEach(key => {

            let vectorTileValue: IValueFilter = null;
            let alternativeValueSet: IVectorTileValue[] = this.layer.getValueSet(key);
            if (alternativeValueSet.length > 1) {
                vectorTileValue = new ValueFilterImpl(this.layer.name, key, null);
            }
            keysData.addChild(new TreeDataImpl(DataType.get(DataType.INDEX_____________KEY), Uid.random16(), key, CodedInputStream.computeStringSizeNoTag(key), this.color, this.extent, vectorTileValue));

        });
        layerData.addChild(keysData);

        let totalValueByteCount: number = 0;
        this.layer.values.forEach(value => totalValueByteCount += value.getByteCount());
        let valuesData: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX__________VALUES), Uid.random16(), 'values (' + this.layer.values.length + ')', totalValueByteCount, this.color, this.extent, null);
        this.layer.values.forEach(value => {
            valuesData.addChild(new TreeDataProviderImplVectorTileValue(this.color, value, this.extent).getTreeData());
        })
        layerData.addChild(valuesData);


        let unitsPerTick: number = this.quadLevel.getNorm()[0] / this.layer.extent;
        let extentLabel: string = 'extent 🠚 ' + this.layer.extent + ', resolution 🠚 ' + Math.round(unitsPerTick * 100) / 100.0 + ' m/tick';
        let extentData: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX__________EXTENT), Uid.random16(), extentLabel, CodedInputStream.computeUInt32SizeNoTag(this.layer.extent), this.color, this.extent, null);
        layerData.addChild(extentData);

        let totalTagCount: number = 3; //name, version, extent
        totalTagCount += this.layer.features.length;
        totalTagCount += this.layer.keys.length;
        totalTagCount += this.layer.values.length;
        let totalTagByteCount: number = 0;
        totalTagByteCount += CodedInputStream.computeUInt32Size(0x1, CodedInputStream.computeStringSizeNoTag(this.layer.name));
        this.layer.features.map(feature => totalTagByteCount += CodedInputStream.computeUInt32Size(0x2, feature.byteCount));
        this.layer.keys.map(key => totalTagByteCount += CodedInputStream.computeUInt32Size(0x3, CodedInputStream.computeStringSizeNoTag(key)));
        this.layer.values.map(value => totalTagByteCount += CodedInputStream.computeUInt32Size(0x4, value.getByteCount()));
        totalTagByteCount += CodedInputStream.computeUInt32Size(0x5, CodedInputStream.computeUInt32SizeNoTag(this.layer.extent));
        totalTagByteCount += CodedInputStream.computeUInt32Size(0xF, CodedInputStream.computeUInt32SizeNoTag(this.layer.version));        
        let tagsData: ITreeData = new TreeDataImpl(DataType.get(DataType.INDEX____________TAGS), Uid.random16(), 'tags (' + totalTagCount + ')', totalTagByteCount, this.color, this.extent, null);
        layerData.addChild(tagsData);

        return layerData;

    }

}