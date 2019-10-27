define(["require", "exports", "../data/DataType", "../../protobuf/base/source/CodedInputStream", "../../util/Uid", "../data/TreeDataImpl", "../../protobuf/vectortile/value/ValueFilterImpl", "./TreeDataProviderImplVectorTileValue"], function (require, exports, DataType_1, CodedInputStream_1, Uid_1, TreeDataImpl_1, ValueFilterImpl_1, TreeDataProviderImplVectorTileValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implementation of ITreeDataProvider specific to the VectorTileLayer type<br>
     * this type provides tree and chart data related to a single vectortile-layer
     *
     * @author h.fleischer
     * @since 23.09.2019
     */
    var TreeDataProviderImplVectorTileLayer = /** @class */ (function () {
        function TreeDataProviderImplVectorTileLayer(color, layer, extent, quadLevel, filterKey) {
            this.id = Uid_1.Uid.random16();
            this.color = color;
            this.layer = layer;
            this.extent = extent;
            this.quadLevel = quadLevel;
            this.filterKey = filterKey;
        }
        TreeDataProviderImplVectorTileLayer.prototype.getId = function () {
            return this.id;
        };
        TreeDataProviderImplVectorTileLayer.prototype.getFeatureLabel = function (featureCount) {
            if (featureCount === 0) {
                return 'no feature';
            }
            if (featureCount === 1) {
                return '1 feature';
            }
            else {
                return featureCount + ' features';
            }
        };
        TreeDataProviderImplVectorTileLayer.prototype.getTreeData = function () {
            var _this = this;
            var geomType = this.layer.getGeometryType();
            var dataType = geomType.getDataType();
            var layerData = new TreeDataImpl_1.TreeDataImpl(dataType, this.getId(), this.layer.name + ' (' + this.getFeatureLabel(this.layer.features.length) + ', ' + this.layer.getVertexCount() + ' vertices)', this.layer.byteCount, this.color, this.extent, new ValueFilterImpl_1.ValueFilterImpl(this.layer.name));
            var versionData = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX_________VERSION), Uid_1.Uid.random16(), 'version 🠚 ' + this.layer.version, CodedInputStream_1.CodedInputStream.computeUInt32SizeNoTag(this.layer.version), this.color, this.extent, null);
            layerData.addChild(versionData);
            var nameData = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX____________NAME), Uid_1.Uid.random16(), 'name 🠚 ' + this.layer.name, CodedInputStream_1.CodedInputStream.computeStringSizeNoTag(this.layer.name), this.color, this.extent, null);
            layerData.addChild(nameData);
            var totalFeatureByteCount = 0;
            this.layer.features.forEach(function (feature) { return totalFeatureByteCount += feature.byteCount; });
            //get a set of values from the layer for the given filterKey (including the empty value, if some feautures dont have a value for this key)
            //TODO check if the empty-value is contained
            var valueSet = this.layer.getValueSet(this.filterKey);
            if (valueSet.length > 1) {
                //2 or more values sets
                var featureSetsData = new TreeDataImpl_1.TreeDataImpl(dataType, Uid_1.Uid.random16(), 'features grouped by ' + this.filterKey + ' (' + valueSet.length + ' distinct values)', totalFeatureByteCount, this.color, this.extent, new ValueFilterImpl_1.ValueFilterImpl(this.layer.name));
                var _loop_1 = function (i) {
                    var features = this_1.layer.getFeatures(this_1.filterKey, valueSet[i]);
                    var totalFeatureSetByteCount = 0;
                    var totalFeatureSetVertexCount = 0;
                    features.forEach(function (feature) { return totalFeatureSetByteCount += feature.byteCount; });
                    features.forEach(function (feature) { return totalFeatureSetVertexCount += feature.coordCount; });
                    var featureSetColor = this_1.color.deriveColor(i, valueSet.length);
                    var featureSetData = new TreeDataImpl_1.TreeDataImpl(dataType, Uid_1.Uid.random16(), this_1.filterKey + ' 🠚 ' + valueSet[i].getValue() + ' (' + this_1.getFeatureLabel(features.length) + ', ' + totalFeatureSetVertexCount + ' vertices)', totalFeatureSetByteCount, featureSetColor, this_1.extent, new ValueFilterImpl_1.ValueFilterImpl(this_1.layer.name, this_1.filterKey, valueSet[i]));
                    featureSetsData.addChild(featureSetData);
                };
                var this_1 = this;
                for (var i = 0; i < valueSet.length; i++) {
                    _loop_1(i);
                }
                layerData.addChild(featureSetsData);
            }
            else {
                //0 or 1 valuesets
                var features = this.layer.features;
                var totalFeatureSetByteCount_1 = 0;
                features.forEach(function (feature) { return totalFeatureSetByteCount_1 += feature.byteCount; });
                var featuresData = new TreeDataImpl_1.TreeDataImpl(dataType, Uid_1.Uid.random16(), 'features (' + features.length + ')', totalFeatureSetByteCount_1, this.color, this.extent, null);
                layerData.addChild(featuresData);
            }
            var totalKeyByteCount = 0;
            this.layer.keys.forEach(function (key) { return totalKeyByteCount += CodedInputStream_1.CodedInputStream.computeStringSizeNoTag(key); });
            var keysData = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX____________KEYS), Uid_1.Uid.random16(), 'keys (' + this.layer.keys.length + ')', totalKeyByteCount, this.color, this.extent, null);
            this.layer.keys.forEach(function (key) {
                var vectorTileValue = null;
                var alternativeValueSet = _this.layer.getValueSet(key);
                if (alternativeValueSet.length > 1) {
                    vectorTileValue = new ValueFilterImpl_1.ValueFilterImpl(_this.layer.name, key, null);
                }
                keysData.addChild(new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX_____________KEY), Uid_1.Uid.random16(), key, CodedInputStream_1.CodedInputStream.computeStringSizeNoTag(key), _this.color, _this.extent, vectorTileValue));
            });
            layerData.addChild(keysData);
            var totalValueByteCount = 0;
            this.layer.values.forEach(function (value) { return totalValueByteCount += value.getByteCount(); });
            var valuesData = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX__________VALUES), Uid_1.Uid.random16(), 'values (' + this.layer.values.length + ')', totalValueByteCount, this.color, this.extent, null);
            this.layer.values.forEach(function (value) {
                valuesData.addChild(new TreeDataProviderImplVectorTileValue_1.TreeDataProviderImplVectorTileValue(_this.color, value, _this.extent).getTreeData());
            });
            layerData.addChild(valuesData);
            var unitsPerTick = this.quadLevel.getNorm()[0] / this.layer.extent;
            var extentLabel = 'extent 🠚 ' + this.layer.extent + ', resolution 🠚 ' + Math.round(unitsPerTick * 100) / 100.0 + ' m/tick';
            var extentData = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX__________EXTENT), Uid_1.Uid.random16(), extentLabel, CodedInputStream_1.CodedInputStream.computeUInt32SizeNoTag(this.layer.extent), this.color, this.extent, null);
            layerData.addChild(extentData);
            var totalTagCount = 3; //name, version, extent
            totalTagCount += this.layer.features.length;
            totalTagCount += this.layer.keys.length;
            totalTagCount += this.layer.values.length;
            var totalTagByteCount = 0;
            totalTagByteCount += CodedInputStream_1.CodedInputStream.computeUInt32Size(0x1, CodedInputStream_1.CodedInputStream.computeStringSizeNoTag(this.layer.name));
            this.layer.features.map(function (feature) { return totalTagByteCount += CodedInputStream_1.CodedInputStream.computeUInt32Size(0x2, feature.byteCount); });
            this.layer.keys.map(function (key) { return totalTagByteCount += CodedInputStream_1.CodedInputStream.computeUInt32Size(0x3, CodedInputStream_1.CodedInputStream.computeStringSizeNoTag(key)); });
            this.layer.values.map(function (value) { return totalTagByteCount += CodedInputStream_1.CodedInputStream.computeUInt32Size(0x4, value.getByteCount()); });
            totalTagByteCount += CodedInputStream_1.CodedInputStream.computeUInt32Size(0x5, CodedInputStream_1.CodedInputStream.computeUInt32SizeNoTag(this.layer.extent));
            totalTagByteCount += CodedInputStream_1.CodedInputStream.computeUInt32Size(0xF, CodedInputStream_1.CodedInputStream.computeUInt32SizeNoTag(this.layer.version));
            var tagsData = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX____________TAGS), Uid_1.Uid.random16(), 'tags (' + totalTagCount + ')', totalTagByteCount, this.color, this.extent, null);
            layerData.addChild(tagsData);
            return layerData;
        };
        return TreeDataProviderImplVectorTileLayer;
    }());
    exports.TreeDataProviderImplVectorTileLayer = TreeDataProviderImplVectorTileLayer;
});
