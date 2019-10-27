import { IColor } from "../../util/IColor";
import { IValueFilter } from "./IValueFilter";
import { Extent } from "esri/geometry";
import { IColored } from "../../util/IColored";

/**
 * definition for types that can contribute to, especially a dojo tree, but also to i.e an amcharts chart<br>
 * 
 * @author h.fleischer
 * @since 08.10.2019
 */
export interface ITreeData extends IColored {

    /**
     * get the unique id of this item
     */
    getId(): string;

    /**
     * get a readable name for this item
     */
    getName(): string;

    /**
     * get a "value" (like a bytecount) for this item
     */
    getValue(): number;

    /**
     * set the parent-id of this item (when being added as child to that parent)
     * @param id 
     */
    setParent(id: string): void;

    /**
     * get the parent id of this item
     */
    getParent(): string;

    /**
     * add a child to this item
     * @param treeData 
     */
    addChild(treeData: ITreeData): void;

    /**
     * get the children of this item
     */
    getChildren(): ITreeData[];

    /**
     * get all children of this item and subchildren / ... in a flat list
     */
    getChildrenRecursive(): ITreeData[]

    /**
     * get the extent of this item (so the map can be zoomed to that extent, if required)
     */
    getExtent(): Extent;

    /**
     * get an IValueFilter, if any, applicable to this item
     */
    getValueFilter(): IValueFilter;

}