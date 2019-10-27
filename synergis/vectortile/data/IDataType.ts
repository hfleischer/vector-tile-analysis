import { ITreeIconNode } from "../../layout/ITreeIconNode";
import { ITreeData } from "./ITreeData";

/**
 * definition for "data-types", these types define that display and actions provided by nodes display in either the "tile-details" or "map-details" view
 * 
 * @author h.fleischer
 * @since 22.07.2019
 */
export interface IDataType {
    
    getIconNode(treeDataItem: ITreeData): ITreeIconNode;

    visitLabelNode(treeDataItem: ITreeData, labelNode: HTMLDivElement, contentNode: HTMLDivElement): void;

    getActionNode(treeDataItem: ITreeData): ITreeIconNode;

}