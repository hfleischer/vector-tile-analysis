import { ITreeData } from "../data/ITreeData";

/**
 * definition for type that can supply ITreeData instance's
 * 
 * @author h.fleischer
 * @since 11.10.2019
 */
export interface ITreeDataProvider {

    getId(): string;

    getTreeData(): ITreeData;

}