export type FilterOptions = {
	breeds: string[];
	age: {
		min?: number;
		max?: number;
	};
};
