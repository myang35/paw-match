import { base } from '$app/paths';
import { apiClient } from '$lib/api';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async (e) => {
		const data = await e.request.formData();
		const name = data.get('name')?.toString();
		const email = data.get('email')?.toString();

		if (!name || !email) {
			return fail(400, { name, email, errorMessage: undefined });
		}

		try {
			await apiClient.auth.login(name, email);
		} catch (e) {
			if (e instanceof Error) {
				return fail(500, { name, email, errorMessage: `Internal Server Error: ${e.message}` });
			} else {
				return fail(500, { name, email, errorMessage: 'Internal Server Error' });
			}
		}

		if (e.url.searchParams.has('redirectTo')) {
			redirect(303, `${base}/${e.url.searchParams.get('redirectTo')}`);
		} else {
			redirect(303, `${base}/`);
		}
	}
} satisfies Actions;
