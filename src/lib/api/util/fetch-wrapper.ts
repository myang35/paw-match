import { goto } from '$app/navigation';
import { base } from '$app/paths';

export async function fetchWrapper(url: string, options: RequestInit = {}) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		...options
	});
	if (!response.ok) {
		if (response.status === 401) {
			goto(`${base}/login`);
		}
		throw new Error(`API error: ${response.statusText}`);
	}
	return response;
}
