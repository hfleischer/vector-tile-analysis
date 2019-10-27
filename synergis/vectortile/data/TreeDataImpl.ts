import Item from 'dojo/data/api/Item';

import { IDataType } from './IDataType';
import { IColor } from '../../util/IColor';
import { ITreeData } from './ITreeData';
import { IValueFilter } from './IValueFilter';
import { Extent } from 'esri/geometry';

/**
 * this is a type asssignable to a dojo-tree
 * 
 * @author h.fleischer
 * @since 04.10.2019
 */
export class TreeDataImpl extends Item implements ITreeData {

    private readonly id: string;
    private readonly type: IDataType;
    private readonly name: string;
    private readonly value: number
    private color: IColor; 
    private readonly hex: string;
    private readonly extent: Extent;
    private readonly valueFilter: IValueFilter;

    private children: ITreeData[];
    private parent: string;

    constructor(type: IDataType, id: string, name: string, value: number, color: IColor, extent: Extent, valueFilter: IValueFilter) {
        super();
        this.id = id;
        this.type = type; 
        this.name = name;
        this.value = value
        this.color = color;
        this.extent = extent;
        this.hex = color.getHex(); //needed for reference in LayoutChart, referenced as string prop, which will not evaluate until runtime, so private is OK
        this.children = null; //dont initialize until addition of a child (chart wants to zoom in on empty children otherwise)
        this.valueFilter = valueFilter;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getValue(): number {
        return this.value;
    }

    setColor(color: IColor): void {
        this.color = color;
    }

    getColor(): IColor {
        return this.color;
    }

    setParent(id: string): void {
        this.parent = id;
    }

    getParent(): string {
        return this.parent;
    }

    addChild(child: ITreeData): void {
        child.setParent(this.id);
        if (this.children == null) {
            this.children = [];
        }
        this.children.push(child);
    }

    getChildren(): ITreeData[] {
        return this.children;
    }

    getChildrenRecursive(): ITreeData[] {
        let results: ITreeData[] = [];
        results.push(this);
        if (this.children != null) {
            this.children.forEach(function (child) {
                results = results.concat(child.getChildrenRecursive());
            });
        }
        return results;
    };    

    getExtent(): Extent {
        return this.extent;
    }

    getValueFilter(): IValueFilter {
        return this.valueFilter;
    }

}