import { config } from '$lib/api/config/config';
import { fetchWrapper } from '$lib/api/util/fetch-wrapper';

export const auth = {
	login: async (name: string, email: string): Promise<string> => {
		const response = await fetchWrapper(`${config.apiBaseUrl}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				email
			})
		});
		return response.text();
	},
	logout: async (): Promise<string> => {
		const response = await fetch(`${config.apiBaseUrl}/auth/logout`, {
			method: 'POST'
		});
		return response.text();
	}
};
