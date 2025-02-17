<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { apiClient } from '$lib/api';
	import { Button } from '$lib/ui';
	import { getErrorMessage } from '$lib/utils';

	let formErrorMessage = '';
	let fieldErrorMessages = {
		name: '',
		email: ''
	};

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		formErrorMessage = '';
		fieldErrorMessages.name = '';
		fieldErrorMessages.email = '';

		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();

		if (!name) {
			fieldErrorMessages.name = 'Name is required!';
		}

		if (!email) {
			fieldErrorMessages.email = 'Email is required!';
		}

		if (Object.values(fieldErrorMessages).some((m) => m)) return;

		try {
			await apiClient.auth.login({
				name: name as string,
				email: email as string
			});
			goto(`${base}/search`);
		} catch (error) {
			formErrorMessage = getErrorMessage(error);
		}
	}
</script>

<div class="p-20">
	<div
		class="bg-light-500 mx-auto flex max-w-lg flex-col gap-4 rounded-xl p-8 shadow-lg shadow-black/20"
	>
		<h1 class="text-center text-3xl font-bold">Tell Us About You!</h1>

		<form onsubmit={onSubmit} class="flex flex-col gap-4">
			<div class="flex flex-col">
				<label for="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					class="bg-light-100 border-dark-500 rounded border p-1"
				/>
				{#if fieldErrorMessages.name}
					<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">{fieldErrorMessages.name}</p>
				{/if}
			</div>
			<div class="flex flex-col">
				<label for="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					class="bg-light-100 border-dark-500 rounded border p-1"
				/>
				{#if fieldErrorMessages.email}
					<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">{fieldErrorMessages.email}</p>
				{/if}
			</div>
			<Button color="primary" class="mt-4 w-full rounded p-1 text-lg font-bold"
				>Start Your Search!</Button
			>
			{#if formErrorMessage}
				<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">{formErrorMessage}</p>
			{/if}
		</form>
	</div>
</div>
