declare namespace dijit {

	/**
	 * @author h.fleischer
	 * @since 18.09.2019
	 */
	interface Tree extends _WidgetBase {

		rootNode: any;

		destroy(): void;
		startup(): void;
		_expandNode(node: any): void;

	}

	/**
	 * @author h.fleischer
	 * @since 18.09.2019
	 */
	interface TreeConstructor extends _WidgetBaseConstructor<Tree> { }



}
