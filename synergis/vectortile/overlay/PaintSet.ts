import { ITreeData } from "../data/ITreeData";
import { IValueFilter } from "../data/IValueFilter";

/**
 * static aspects regarding IPaintSet<br>
 * 
 * @author h.fleischer
 * @since 12.10.2019
 */
export class PaintSet {

    static getItemName(item: ITreeData): string {
        let valueFilter: IValueFilter = item.getValueFilter();
        let itemName = valueFilter.getSourceLayer();
        if (valueFilter.getKey() != null && valueFilter.getValue() != null) {
            itemName += ' ' + valueFilter.getKey() + '  🠚 ' + valueFilter.getValue();
        }
        itemName += ' (overlay)';
        return itemName;
    }

    static getSourceLayer(item: ITreeData): string {
        return item.getValueFilter().getSourceLayer();
    }

    static getFilter(item: ITreeData): string[] {
        let valueFilter: IValueFilter = item.getValueFilter();
        let result: string[] = [];
        if (valueFilter.getKey() != null && valueFilter.getValue() != null) {
            result.push('==');
            result.push(valueFilter.getKey());
            result.push(valueFilter.getValue());
        }
        return result;
    } 

}