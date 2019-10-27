declare namespace dojo {
	namespace store {

		interface MemoryOptions<T extends Object> {
			getChildren?: (parent: T) => void;
		}

	}
}
