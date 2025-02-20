import { getFavorites } from './get-favorites';

export function isFavorited(dogId: string) {
	const favorites = getFavorites();
	return favorites.includes(dogId);
}
