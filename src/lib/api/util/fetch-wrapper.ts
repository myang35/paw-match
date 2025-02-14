export async function fetchWrapper(url: string, options: RequestInit = {}) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		},
		...options
	});
	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`);
	}
	return response;
}
