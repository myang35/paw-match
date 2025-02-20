import { config } from '$lib/api/config/config';
import type { Location } from '$lib/api/types/location';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export async function getLocations(params: { zipCodes: string[] }): Promise<Location[]> {
	const response = await fetchWrapper(`${config.apiBaseUrl}/locations`, {
		method: 'POST',
		body: JSON.stringify(params.zipCodes)
	});
	return response.json();
}
