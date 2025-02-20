import { getFavorites } from './get-favorites';

export function toggleFavorite(dogId: string) {
	const favorites = getFavorites();

	const favoritedIndex = favorites.findIndex((value) => value === dogId);
	if (favoritedIndex === -1) {
		favorites.push(dogId);
	} else {
		favorites.splice(favoritedIndex, 1);
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));
}
