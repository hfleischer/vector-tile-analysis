define(["require", "exports", "../../layout/IconConstants", "../../layout/LayoutSlider", "../../layout/TreeIconNode", "../../layout/TreeIconNodeImpl", "../../util/Color", "../overlay/PaintType", "../VectorTileAnalysisApp"], function (require, exports, IconConstants_1, LayoutSlider_1, TreeIconNode_1, TreeIconNodeImpl_1, Color_1, PaintType_1, VectorTileAnalysisApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataTypeVectorTile = /** @class */ (function () {
        function DataTypeVectorTile() {
        }
        DataTypeVectorTile.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_QR_CODE, 'scale(0.8)', '-2px 0px 0px -2px', treeData.getColor());
        };
        DataTypeVectorTile.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeVectorTile.prototype.getActionNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('crop', IconConstants_1.IconConstants.ICON_CROP, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                var layerSet = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findLayerSet(treeData);
                layerSet.toggleCrop();
            });
        };
        return DataTypeVectorTile;
    }());
    exports.DataTypeVectorTile = DataTypeVectorTile;
    var DataTypeVectorTileLayer = /** @class */ (function () {
        function DataTypeVectorTileLayer() {
        }
        DataTypeVectorTileLayer.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_TACHOGRAPH, 'scale(0.8)', '0px', treeData.getColor());
        };
        DataTypeVectorTileLayer.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeVectorTileLayer.prototype.getStyleTransform = function () {
            return 'scale(0.8)';
        };
        DataTypeVectorTileLayer.prototype.getActionNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('add ' + treeData.getName() + ' overlay', IconConstants_1.IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType_1.PaintType.get(PaintType_1.PaintType.INDEX______POLYGON));
            });
        };
        return DataTypeVectorTileLayer;
    }());
    exports.DataTypeVectorTileLayer = DataTypeVectorTileLayer;
    var DataTypePolygon = /** @class */ (function () {
        function DataTypePolygon() {
        }
        DataTypePolygon.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_POLYGON, 'scale(0.8)', '0px 0px 0px -2px', treeData.getColor());
        };
        DataTypePolygon.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypePolygon.prototype.getActionNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('add ' + treeData.getName() + ' polygon overlay', IconConstants_1.IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType_1.PaintType.get(PaintType_1.PaintType.INDEX______POLYGON));
            });
        };
        return DataTypePolygon;
    }());
    exports.DataTypePolygon = DataTypePolygon;
    var DataTypePolyline = /** @class */ (function () {
        function DataTypePolyline() {
        }
        DataTypePolyline.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_POLYLINE, 'scale(0.8) rotate(-60deg)', '0px', treeData.getColor());
        };
        DataTypePolyline.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypePolyline.prototype.getActionNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('add ' + treeData.getName() + ' polyline overlay', IconConstants_1.IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType_1.PaintType.get(PaintType_1.PaintType.INDEX_____POLYLINE));
            });
        };
        return DataTypePolyline;
    }());
    exports.DataTypePolyline = DataTypePolyline;
    var DataTypePoint = /** @class */ (function () {
        function DataTypePoint() {
        }
        DataTypePoint.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_POINTS, 'scale(0.8)', '0px', treeData.getColor());
        };
        DataTypePoint.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypePoint.prototype.getActionNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('add ' + treeData.getName() + ' point overlay', IconConstants_1.IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType_1.PaintType.get(PaintType_1.PaintType.INDEX________POINT));
            });
        };
        return DataTypePoint;
    }());
    exports.DataTypePoint = DataTypePoint;
    var DataTypeVersion = /** @class */ (function () {
        function DataTypeVersion() {
        }
        DataTypeVersion.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_CODE_BRANCH, 'scale(0.7)', '0px', treeData.getColor());
        };
        DataTypeVersion.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeVersion.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeVersion;
    }());
    exports.DataTypeVersion = DataTypeVersion;
    var DataTypeName = /** @class */ (function () {
        function DataTypeName() {
        }
        DataTypeName.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_SIGNATURE, 'scale(0.8)', '3px 0px 0px 0px', treeData.getColor());
        };
        DataTypeName.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeName.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeName;
    }());
    exports.DataTypeName = DataTypeName;
    var DataTypeKeys = /** @class */ (function () {
        function DataTypeKeys() {
        }
        DataTypeKeys.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_KEY, 'scale(0.7)', '0px', treeData.getColor());
        };
        DataTypeKeys.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeKeys.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeKeys;
    }());
    exports.DataTypeKeys = DataTypeKeys;
    var DataTypeKey = /** @class */ (function () {
        function DataTypeKey() {
        }
        DataTypeKey.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_KEY, 'scale(0.7)', '0px', treeData.getColor());
        };
        DataTypeKey.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeKey.prototype.getActionNode = function (treeData) {
            var valueFilter = treeData.getValueFilter();
            if (valueFilter != null) {
                return new TreeIconNodeImpl_1.TreeIconNodeImpl('group ' + valueFilter.getSourceLayer() + ' features by ' + valueFilter.getKey(), IconConstants_1.IconConstants.ICON_FILTER, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                    VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.setFilterKey(treeData);
                });
            }
        };
        return DataTypeKey;
    }());
    exports.DataTypeKey = DataTypeKey;
    var DataTypeValues = /** @class */ (function () {
        function DataTypeValues() {
        }
        DataTypeValues.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_MISC, 'scale(0.7)', '0px', treeData.getColor());
        };
        DataTypeValues.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeValues.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeValues;
    }());
    exports.DataTypeValues = DataTypeValues;
    var DataTypeValue = /** @class */ (function () {
        function DataTypeValue() {
        }
        DataTypeValue.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_MISC, 'scale(0.7)', '0px', treeData.getColor());
        };
        DataTypeValue.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeValue.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeValue;
    }());
    exports.DataTypeValue = DataTypeValue;
    var DataTypeTags = /** @class */ (function () {
        function DataTypeTags() {
        }
        DataTypeTags.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_TAGS, 'scale(0.8)', '0px', treeData.getColor());
        };
        DataTypeTags.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeTags.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeTags;
    }());
    exports.DataTypeTags = DataTypeTags;
    var DataTypeExtent = /** @class */ (function () {
        function DataTypeExtent() {
        }
        DataTypeExtent.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_EXPAND, 'scale(0.8)', '0px', treeData.getColor());
        };
        DataTypeExtent.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeExtent.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeExtent;
    }());
    exports.DataTypeExtent = DataTypeExtent;
    var DataTypeMapLayer = /** @class */ (function () {
        function DataTypeMapLayer() {
        }
        DataTypeMapLayer.prototype.getIconNode = function (treeData) {
            var visible = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findMapLayer(treeData.getId()).visible;
            var iconHtml = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.getIconHtml(visible);
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.toggleMapLayerVisibility(iconNode, treeData.getId());
            });
        };
        DataTypeMapLayer.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeMapLayer.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeMapLayer;
    }());
    exports.DataTypeMapLayer = DataTypeMapLayer;
    var DataTypeLayerSet = /** @class */ (function () {
        function DataTypeLayerSet() {
        }
        DataTypeLayerSet.prototype.getIconNode = function (treeData) {
            var visible = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findLayerSet(treeData).isVisible();
            var iconHtml = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.getIconHtml(visible);
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.toggleLayerSetVisibility(iconNode, treeData.getId());
            });
        };
        DataTypeLayerSet.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeLayerSet.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeLayerSet;
    }());
    exports.DataTypeLayerSet = DataTypeLayerSet;
    var DataTypePaintSet = /** @class */ (function () {
        function DataTypePaintSet() {
        }
        DataTypePaintSet.prototype.getIconNode = function (treeData) {
            var visible = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findPaintSet(treeData.getId()).isVisible();
            var iconHtml = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.getIconHtml(visible);
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.togglePaintSetVisibility(iconNode, treeData.getId());
            });
        };
        DataTypePaintSet.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypePaintSet.prototype.getActionNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_REMOVE_LAYER, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.removePaintSet(treeData.getId());
            });
        };
        return DataTypePaintSet;
    }());
    exports.DataTypePaintSet = DataTypePaintSet;
    var DataTypeStyleLayer = /** @class */ (function () {
        function DataTypeStyleLayer() {
        }
        DataTypeStyleLayer.prototype.getIconNode = function (treeData) {
            var visible = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findPaint(treeData.getId()).isVisible();
            var iconHtml = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.getIconHtml(visible);
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), function (iconNode) {
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.togglePaintVisibility(iconNode, treeData.getId());
            });
        };
        DataTypeStyleLayer.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeStyleLayer.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeStyleLayer;
    }());
    exports.DataTypeStyleLayer = DataTypeStyleLayer;
    /**
     * the color of a specific style-layer
     */
    var DataTypeStyleColor = /** @class */ (function () {
        function DataTypeStyleColor() {
        }
        DataTypeStyleColor.prototype.getIconNode = function (treeData) {
            var paint = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findPaint(treeData.getParent());
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_PALETTE, 'scale(0.8)', '0px', paint.getColor(), function (iconNode) {
                var treeNode = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContentTree.findItem(treeData.getId()); //find the node in the map-content tree, so we can change it's innerHTML to the new color
                var onChange = function (hex) {
                    var color = Color_1.Color.parseHex(hex);
                    TreeIconNode_1.TreeIconNode.updateColor(color, iconNode); //apply to icon node (mouseover, ... included)
                    treeNode.labelNode.innerHTML = color.getHex(); //apply to label
                    paint.setColor(color); //apply to paint
                };
                VectorTileAnalysisApp_1.VectorTileAnalysisApp.layoutColorPicker.showColorPicker(iconNode, paint.getColor(), onChange);
            });
        };
        DataTypeStyleColor.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeStyleColor.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeStyleColor;
    }());
    exports.DataTypeStyleColor = DataTypeStyleColor;
    /**
     * the opacity of a specific style-layer
     */
    var DataTypeStyleOpacity = /** @class */ (function () {
        function DataTypeStyleOpacity() {
        }
        DataTypeStyleOpacity.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_LOW_VISION, 'scale(0.8)', '0px', Color_1.Color.white());
        };
        DataTypeStyleOpacity.prototype.visitLabelNode = function (treeData, labelNode, contentNode) {
            var paint = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findPaint(treeData.getParent());
            labelNode.innerHTML = paint.getOpacity().toFixed(2);
            var onChange = function (value) {
                paint.setOpacity(value);
                labelNode.innerHTML = value.toFixed(2);
            };
            var layoutSlider = new LayoutSlider_1.LayoutSlider('opacity', 0, 1, paint.getOpacity(), onChange);
            contentNode.appendChild(layoutSlider.getHtmlElement());
        };
        DataTypeStyleOpacity.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeStyleOpacity;
    }());
    exports.DataTypeStyleOpacity = DataTypeStyleOpacity;
    /**
     * the opacity of a specific style-layer
     */
    var DataTypeStyleDimension = /** @class */ (function () {
        function DataTypeStyleDimension() {
        }
        DataTypeStyleDimension.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_ARROW_UP_DOWN, 'scale(0.38) translate(0px, -10px)', '0px', Color_1.Color.white());
        };
        DataTypeStyleDimension.prototype.visitLabelNode = function (treeData, labelNode, contentNode) {
            var paint = VectorTileAnalysisApp_1.VectorTileAnalysisApp.mapContent.findPaint(treeData.getParent());
            labelNode.innerHTML = paint.getDimension().toFixed(2);
            var onChange = function (value) {
                paint.setDimension(value);
                labelNode.innerHTML = value.toFixed(2);
            };
            var layoutSlider = new LayoutSlider_1.LayoutSlider('dimension', 0, 20, paint.getDimension(), onChange);
            contentNode.appendChild(layoutSlider.getHtmlElement());
        };
        DataTypeStyleDimension.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeStyleDimension;
    }());
    exports.DataTypeStyleDimension = DataTypeStyleDimension;
    var DataTypeUnknown = /** @class */ (function () {
        function DataTypeUnknown() {
        }
        DataTypeUnknown.prototype.getIconNode = function (treeData) {
            return new TreeIconNodeImpl_1.TreeIconNodeImpl('', IconConstants_1.IconConstants.ICON_MISC, 'scale(0.7)', '0px', treeData.getColor());
        };
        DataTypeUnknown.prototype.visitLabelNode = function (treeData, labelNode, contentNode) { };
        DataTypeUnknown.prototype.getActionNode = function (treeData) {
            return null;
        };
        return DataTypeUnknown;
    }());
    exports.DataTypeUnknown = DataTypeUnknown;
    /**
     * accessor to the various data-types as defined in the protocol-buffer standard
     *
     * @author h.fleischer
     * @since 22.09.2019
     */
    var DataType = /** @class */ (function () {
        function DataType() {
        }
        DataType.get = function (index) {
            if (index >= 0 && index < DataType.ALL.length) {
                return this.ALL[index];
            }
            else {
                throw new Error("failed to resolve data-type (index: " + index + ")");
            }
        };
        DataType.INDEX____________TILE = 0;
        DataType.INDEX________VT_LAYER = 1;
        DataType.INDEX_________POLYGON = 2;
        DataType.INDEX________POLYLINE = 3;
        DataType.INDEX___________POINT = 4;
        DataType.INDEX_________VERSION = 5;
        DataType.INDEX____________NAME = 6;
        DataType.INDEX____________KEYS = 7;
        DataType.INDEX_____________KEY = 8;
        DataType.INDEX__________VALUES = 9;
        DataType.INDEX___________VALUE = 10;
        DataType.INDEX____________TAGS = 11;
        DataType.INDEX__________EXTENT = 12;
        DataType.INDEX______MAP__LAYER = 13;
        DataType.INDEX_______LAYER_SET = 14;
        DataType.INDEX_______PAINT_SET = 15;
        DataType.INDEX___________PAINT = 16;
        DataType.INDEX_____STYLE_COLOR = 17;
        DataType.INDEX___STYLE_OPACITY = 18;
        DataType.INDEX_STYLE_DIMENSION = 19;
        DataType.INDEX_________UNKNOWN = 20;
        DataType.ALL = [
            new DataTypeVectorTile(),
            new DataTypeVectorTileLayer(),
            new DataTypePolygon(),
            new DataTypePolyline(),
            new DataTypePoint(),
            new DataTypeVersion(),
            new DataTypeName(),
            new DataTypeKeys(),
            new DataTypeKey(),
            new DataTypeValues(),
            new DataTypeValues(),
            new DataTypeTags(),
            new DataTypeExtent(),
            new DataTypeMapLayer(),
            new DataTypeLayerSet(),
            new DataTypePaintSet(),
            new DataTypeStyleLayer(),
            new DataTypeStyleColor(),
            new DataTypeStyleOpacity(),
            new DataTypeStyleDimension(),
            new DataTypeUnknown()
        ];
        return DataType;
    }());
    exports.DataType = DataType;
});
