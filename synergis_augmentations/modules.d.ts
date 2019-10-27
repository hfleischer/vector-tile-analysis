/// <reference path="index.d.ts" />

/**
 * @author h.fleischer
 * @since 18.09.2019
 */
declare module 'dijit/Tree' {
	type Tree = dijit.Tree;
	const Tree: dijit.TreeConstructor;
	export = Tree;
}

/**
 * @author h.fleischer
 * @since 18.09.2019
 */
declare module 'dijit/tree/ObjectStoreModel' {
	type ObjectStoreModel = dijit.tree.ObjectStoreModel;
	const ObjectStoreModel: dijit.tree.ObjectStoreModelConstructor;
	export = ObjectStoreModel;
}

/**
 * @author h.fleischer
 * @since 21.09.2019
 */
declare module 'dijit/tree/ForestStoreModel' {
	type ForestStoreModel = dijit.tree.ForestStoreModel;
	const ForestStoreModel: dijit.tree.ForestStoreModelConstructor;
	export = ForestStoreModel;
}


/**
 * @author h.fleischer
 * @since 05.10.2019
 */
declare module 'dojox/widget/ColorPicker' {
	type ColorPicker = dojox.widget.ColorPicker;
	const ColorPicker: dojox.widget.ColorPickerConstructor;
	export = ColorPicker;
}