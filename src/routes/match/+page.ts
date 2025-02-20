import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	return {
		dogId: url.searchParams.get('dogId')
	};
}) satisfies PageLoad;
