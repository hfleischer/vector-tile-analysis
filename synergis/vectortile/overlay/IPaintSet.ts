import { ITreeDataProvider } from "../dataprovider/ITreeDataProvider";
import { IPaint } from "./IPaint";
import { Extent } from "esri/geometry";
import { IDisplayable } from "../../util/IDisplayable";
import { IColored } from "../../util/IColored";

export interface IPaintSet extends ITreeDataProvider, IDisplayable, IColored {

    getSourceLayer(): string;

    findPaint(paintId: string): IPaint;

    getFilter(): string[];

    getExtent(): Extent; 

    getStyleLayers(): Object[];

}