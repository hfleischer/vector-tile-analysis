import popup from 'dijit/popup';
import TooltipDialog from 'dijit/TooltipDialog';
import ColorPicker from 'dojox/widget/ColorPicker';

import { Uid } from '../util/Uid';
import { IColor } from '../util/IColor';

/**
 * utility type around a dojo ColorPicker element<br>
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class LayoutColorPicker {

    readonly colorPicker: ColorPicker;
    readonly colorPickerDialog: TooltipDialog;

    constructor() {

        //prepare a color picker
        this.colorPicker = new ColorPicker({}, 'colorPicker');
        this.colorPickerDialog = new TooltipDialog({
            id: Uid.random16(),
            content: this.colorPicker,
            onMouseLeave: function(){
                popup.close(this.colorPickerDialog);
            }
        });    
                
    }

    showColorPicker(iconNode: HTMLDivElement, color: IColor, onChange?: Function): void {

        //prepare the color picker
        this.colorPicker.setColor(color.getHex());
        this.colorPicker.onChange = onChange;
        
        //open the popup
        popup.open({
            popup: this.colorPickerDialog,
            around: iconNode
        });                                

    }    
    
}