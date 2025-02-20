import { STORAGE_KEY } from './constants';

let favorites: string[];

export function getFavorites() {
	if (favorites) return favorites;

	const stored = localStorage.getItem(STORAGE_KEY);

	if (!stored) {
		favorites = [];
		return favorites;
	}

	try {
		const parsed = JSON.parse(stored);

		if (!(parsed instanceof Array)) {
			favorites = [];
			return favorites;
		}

		favorites = parsed.filter((item) => typeof item === 'string');
		return favorites;
	} catch {
		favorites = [];
		return favorites;
	}
}
