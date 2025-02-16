import { config } from '$lib/api/config/config';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export async function getBreeds(): Promise<string[]> {
	const response = await fetchWrapper(`${config.apiBaseUrl}/dogs/breeds`);
	return response.json();
}
