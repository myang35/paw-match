import { config } from '$lib/api/config/config';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export async function logout(): Promise<string> {
	const response = await fetchWrapper(`${config.apiBaseUrl}/auth/logout`, {
		method: 'POST'
	});
	return response.text();
}
