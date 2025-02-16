import { config } from '$lib/api/config/config';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export type AuthLoginParams = {
	name: string;
	email: string;
};

export async function login(params: AuthLoginParams): Promise<string> {
	const response = await fetchWrapper(`${config.apiBaseUrl}/auth/login`, {
		method: 'POST',
		body: JSON.stringify(params)
	});
	return response.text();
}
