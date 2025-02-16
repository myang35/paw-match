import { config } from '$lib/api/config/config';
import type { Dog } from '$lib/api/types/dog';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export type DogsGetParams = {
	ids: string[];
};

export async function get(params: DogsGetParams): Promise<Dog[]> {
	const response = await fetchWrapper(`${config.apiBaseUrl}/dogs`, {
		method: 'POST',
		body: JSON.stringify(params.ids)
	});
	return response.json();
}
