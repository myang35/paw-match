import { config } from '$lib/api/config/config';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export type DogsMatchResponse = {
	match: string;
};

export async function match(params: { ids: string[] }): Promise<DogsMatchResponse> {
	const response = await fetchWrapper(`${config.apiBaseUrl}/dogs/match`, {
		method: 'POST',
		body: JSON.stringify(params.ids)
	});
	return response.json();
}
