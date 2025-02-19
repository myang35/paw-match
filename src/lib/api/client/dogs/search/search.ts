import { config } from '$lib/api/config/config';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export type DogsSearchParams = {
	breeds?: string[];
	zipCodes?: string[];
	ageMin?: number;
	ageMax?: number;
	size?: number;
	from?: number;
	sort?: string;
};

export type DogsSearchResponse = {
	resultIds: string[];
	total: number;
	next: string;
	prev: string;
};

export async function search(params: DogsSearchParams): Promise<DogsSearchResponse> {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value instanceof Array) {
			for (const item of value) {
				searchParams.append(key, item);
			}
		} else if (typeof value === 'number') {
			searchParams.append(key, value.toString());
		} else {
			searchParams.append(key, value);
		}
	}

	const response = await fetchWrapper(
		`${config.apiBaseUrl}/dogs/search?${searchParams.toString()}`
	);

	return response.json();
}
