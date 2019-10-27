import { IconConstants } from "../../layout/IconConstants";
import { ITreeIconNode } from "../../layout/ITreeIconNode";
import { LayoutSlider } from "../../layout/LayoutSlider";
import { TreeIconNode } from "../../layout/TreeIconNode";
import { TreeIconNodeImpl } from "../../layout/TreeIconNodeImpl";
import { Color } from "../../util/Color";
import { IColor } from "../../util/IColor";
import { PaintType } from "../overlay/PaintType";
import { VectorTileAnalysisApp } from "../VectorTileAnalysisApp";
import { IDataType } from "./IDataType";
import { ITreeData } from "./ITreeData";
import { IPaint } from "../overlay/IPaint";
import { IValueFilter } from "./IValueFilter";
import { ILayerSet } from "../../layer/ILayerSet";

export class DataTypeVectorTile implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_QR_CODE, 'scale(0.8)', '-2px 0px 0px -2px', treeData.getColor());
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {}
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('crop', IconConstants.ICON_CROP, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            let layerSet: ILayerSet = VectorTileAnalysisApp.mapContent.findLayerSet(treeData);
            layerSet.toggleCrop();
        });
    }
}

export class DataTypeVectorTileLayer implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_TACHOGRAPH, 'scale(0.8)', '0px', treeData.getColor());
    }     
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {}    getStyleTransform(): string {
        return 'scale(0.8)';
    }
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('add ' + treeData.getName() + ' overlay', IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType.get(PaintType.INDEX______POLYGON));
        });
    }
}

export class DataTypePolygon implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_POLYGON, 'scale(0.8)', '0px 0px 0px -2px', treeData.getColor());
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('add ' + treeData.getName() + ' polygon overlay', IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType.get(PaintType.INDEX______POLYGON));
        });
    }
}

export class DataTypePolyline implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_POLYLINE, 'scale(0.8) rotate(-60deg)', '0px', treeData.getColor());
    }  
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('add ' + treeData.getName() + ' polyline overlay', IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType.get(PaintType.INDEX_____POLYLINE));
        });
    }
}

export class DataTypePoint implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_POINTS, 'scale(0.8)', '0px', treeData.getColor());
    }  
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('add ' + treeData.getName() + ' point overlay', IconConstants.ICON_ADD_LAYER, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.addPaintSet(treeData, PaintType.get(PaintType.INDEX________POINT));
        });
    }
}

export class DataTypeVersion implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_CODE_BRANCH, 'scale(0.7)', '0px', treeData.getColor());
    }   
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeName implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_SIGNATURE, 'scale(0.8)', '3px 0px 0px 0px', treeData.getColor());
    }  
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeKeys implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_KEY, 'scale(0.7)', '0px', treeData.getColor());
    }  
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeKey implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_KEY, 'scale(0.7)', '0px', treeData.getColor());
    }  
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        let valueFilter: IValueFilter = treeData.getValueFilter();
        if (valueFilter != null) {
            return new TreeIconNodeImpl('group ' + valueFilter.getSourceLayer() + ' features by ' + valueFilter.getKey(), IconConstants.ICON_FILTER, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
                VectorTileAnalysisApp.mapContent.setFilterKey(treeData);
            });
        }
    }
}

export class DataTypeValues implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_MISC, 'scale(0.7)', '0px', treeData.getColor());
    }    
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeValue implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_MISC, 'scale(0.7)', '0px', treeData.getColor());
    }   
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeTags implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_TAGS, 'scale(0.8)', '0px', treeData.getColor());
    }   
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeExtent implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_EXPAND, 'scale(0.8)', '0px', treeData.getColor());
    }  
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeMapLayer implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        let visible: boolean = VectorTileAnalysisApp.mapContent.findMapLayer(treeData.getId()).visible;
        let iconHtml = VectorTileAnalysisApp.mapContent.getIconHtml(visible);
        return new TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.toggleMapLayerVisibility(iconNode, treeData.getId());
        });
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeLayerSet implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        let visible: boolean = VectorTileAnalysisApp.mapContent.findLayerSet(treeData).isVisible();
        let iconHtml = VectorTileAnalysisApp.mapContent.getIconHtml(visible);
        return new TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.toggleLayerSetVisibility(iconNode, treeData.getId());
        });
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypePaintSet implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        let visible = VectorTileAnalysisApp.mapContent.findPaintSet(treeData.getId()).isVisible();
        let iconHtml = VectorTileAnalysisApp.mapContent.getIconHtml(visible);
        return new TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.togglePaintSetVisibility(iconNode, treeData.getId());
        });
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_REMOVE_LAYER, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.removePaintSet(treeData.getId());
        });
    }
}

export class DataTypeStyleLayer implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        let visible: boolean = VectorTileAnalysisApp.mapContent.findPaint(treeData.getId()).isVisible();
        let iconHtml = VectorTileAnalysisApp.mapContent.getIconHtml(visible);
        return new TreeIconNodeImpl('', iconHtml, 'scale(0.8)', '0px', treeData.getColor(), (iconNode: HTMLDivElement) => {
            VectorTileAnalysisApp.mapContent.togglePaintVisibility(iconNode, treeData.getId());
        });
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

/**
 * the color of a specific style-layer
 */
export class DataTypeStyleColor implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        let paint: IPaint =  VectorTileAnalysisApp.mapContent.findPaint(treeData.getParent());
        return new TreeIconNodeImpl('', IconConstants.ICON_PALETTE, 'scale(0.8)', '0px', paint.getColor(), (iconNode: HTMLDivElement) => {
            let treeNode: any = VectorTileAnalysisApp.mapContentTree.findItem(treeData.getId()); //find the node in the map-content tree, so we can change it's innerHTML to the new color
            let onChange: Function = (hex: string) => {
                let color: IColor = Color.parseHex(hex);
                TreeIconNode.updateColor(color, iconNode); //apply to icon node (mouseover, ... included)
                treeNode.labelNode.innerHTML = color.getHex(); //apply to label
                paint.setColor(color); //apply to paint
            }
            VectorTileAnalysisApp.layoutColorPicker.showColorPicker(iconNode, paint.getColor(), onChange);
        });
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

/**
 * the opacity of a specific style-layer
 */
export class DataTypeStyleOpacity implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_LOW_VISION, 'scale(0.8)', '0px', Color.white());
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {
        let paint: IPaint =  VectorTileAnalysisApp.mapContent.findPaint(treeData.getParent());
        labelNode.innerHTML = paint.getOpacity().toFixed(2);
        let onChange: Function = (value: number) => {
            paint.setOpacity(value);
            labelNode.innerHTML = value.toFixed(2);
        }
        let layoutSlider: LayoutSlider = new LayoutSlider('opacity', 0, 1, paint.getOpacity(), onChange);
        contentNode.appendChild(layoutSlider.getHtmlElement());
    }
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

/**
 * the opacity of a specific style-layer
 */
export class DataTypeStyleDimension implements IDataType {
    getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_ARROW_UP_DOWN, 'scale(0.38) translate(0px, -10px)', '0px', Color.white());
    }
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {
        let paint: IPaint =  VectorTileAnalysisApp.mapContent.findPaint(treeData.getParent());
        labelNode.innerHTML = paint.getDimension().toFixed(2);
        let onChange: Function = (value: number) => {
            paint.setDimension(value);
            labelNode.innerHTML = value.toFixed(2);
        }
        let layoutSlider: LayoutSlider = new LayoutSlider('dimension', 0, 20, paint.getDimension(), onChange);
        contentNode.appendChild(layoutSlider.getHtmlElement());
    }
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

export class DataTypeUnknown implements IDataType {
     getIconNode(treeData: ITreeData): ITreeIconNode {
        return new TreeIconNodeImpl('', IconConstants.ICON_MISC, 'scale(0.7)', '0px', treeData.getColor());
    }  
    visitLabelNode(treeData: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void {} 
    getActionNode(treeData: ITreeData): ITreeIconNode {
        return null;
    }
}

/**
 * accessor to the various data-types as defined in the protocol-buffer standard
 * 
 * @author h.fleischer
 * @since 22.09.2019
 */
export class DataType {

    static INDEX____________TILE: number = 0;
    static INDEX________VT_LAYER: number = 1;
    static INDEX_________POLYGON: number = 2;
    static INDEX________POLYLINE: number = 3;
    static INDEX___________POINT: number = 4;
    static INDEX_________VERSION: number = 5;
    static INDEX____________NAME: number = 6;
    static INDEX____________KEYS: number = 7;
    static INDEX_____________KEY: number = 8;
    static INDEX__________VALUES: number = 9;
    static INDEX___________VALUE: number = 10;
    static INDEX____________TAGS: number = 11;
    static INDEX__________EXTENT: number = 12;
    static INDEX______MAP__LAYER: number = 13;
    static INDEX_______LAYER_SET: number = 14;
    static INDEX_______PAINT_SET: number = 15;
    static INDEX___________PAINT: number = 16;
    static INDEX_____STYLE_COLOR: number = 17;
    static INDEX___STYLE_OPACITY: number = 18;
    static INDEX_STYLE_DIMENSION: number = 19;
    static INDEX_________UNKNOWN: number = 20;

    static ALL: IDataType[] = [
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
    ]

    static get(index: number): IDataType {
        if (index >= 0 && index < DataType.ALL.length) {
            return this.ALL[index];
        } else {
            throw new Error("failed to resolve data-type (index: " + index + ")");
        }
    }

}

