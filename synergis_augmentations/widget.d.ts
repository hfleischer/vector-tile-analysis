declare namespace dojox {
	namespace widget {

		/**
		 * @author h.fleischer
		 * @since 05.10.2019
		 */
		interface ColorPicker {

			setColor(hex: string): void;

			onChange: Function;

		}

		/**
		 * @author h.fleischer
		 * @since 05.10.2019
		 */
		interface ColorPickerConstructor extends dijit._WidgetBaseConstructor<ColorPicker> { }		

	}

}
