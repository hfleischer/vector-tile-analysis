var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/popup", "dijit/TooltipDialog", "dojox/widget/ColorPicker", "../util/Uid"], function (require, exports, popup_1, TooltipDialog_1, ColorPicker_1, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    popup_1 = __importDefault(popup_1);
    TooltipDialog_1 = __importDefault(TooltipDialog_1);
    ColorPicker_1 = __importDefault(ColorPicker_1);
    /**
     * utility type around a dojo ColorPicker element<br>
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var LayoutColorPicker = /** @class */ (function () {
        function LayoutColorPicker() {
            //prepare a color picker
            this.colorPicker = new ColorPicker_1.default({}, 'colorPicker');
            this.colorPickerDialog = new TooltipDialog_1.default({
                id: Uid_1.Uid.random16(),
                content: this.colorPicker,
                onMouseLeave: function () {
                    popup_1.default.close(this.colorPickerDialog);
                }
            });
        }
        LayoutColorPicker.prototype.showColorPicker = function (iconNode, color, onChange) {
            //prepare the color picker
            this.colorPicker.setColor(color.getHex());
            this.colorPicker.onChange = onChange;
            //open the popup
            popup_1.default.open({
                popup: this.colorPickerDialog,
                around: iconNode
            });
        };
        return LayoutColorPicker;
    }());
    exports.LayoutColorPicker = LayoutColorPicker;
});
