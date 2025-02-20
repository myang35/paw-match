import { get, writable } from 'svelte/store';

const FAVORITES_STORAGE_KEY = 'favorites';

export const favorites = (() => {
	const { subscribe, set, update } = writable<string[]>();

	return {
		subscribe,
		set,
		toggle: (dogId: string) =>
			update((favorites) => {
				const favoritedIndex = favorites.findIndex((value) => value === dogId);

				if (favoritedIndex === -1) {
					favorites.push(dogId);
				} else {
					favorites.splice(favoritedIndex, 1);
				}

				localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));

				return favorites;
			})
	};
})();

export function initializeFavorites() {
	if (get(favorites)) return;

	const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

	if (!stored) {
		return favorites.set([]);
	}

	try {
		const parsed = JSON.parse(stored);

		if (!(parsed instanceof Array)) {
			return favorites.set([]);
		}

		const filtered = parsed.filter((item) => typeof item === 'string');
		return favorites.set(filtered);
	} catch {
		return favorites.set([]);
	}
}
