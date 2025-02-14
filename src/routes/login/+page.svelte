<script lang="ts">
	import { Button } from '$lib/ui';

	let { form } = $props();
</script>

<div class="from-primary-500/50 to-primary-900/50 h-full bg-gradient-to-br p-20">
	<div
		class="bg-light-500 mx-auto flex max-w-lg flex-col gap-4 rounded-xl p-8 shadow-lg shadow-black/20"
	>
		<h1 class="text-center text-3xl font-bold">Tell Us About You!</h1>

		<form method="POST" class="flex flex-col gap-4">
			<div class="flex flex-col">
				<label for="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={form?.name ?? ''}
					class="bg-light-100 border-dark-500 rounded border p-1"
				/>
				{#if form && !form.name}
					<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">Name is required!</p>
				{/if}
			</div>
			<div class="flex flex-col">
				<label for="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={form?.email ?? ''}
					class="bg-light-100 border-dark-500 rounded border p-1"
				/>
				{#if form && !form.email}
					<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">Email is required!</p>
				{/if}
			</div>
			<Button color="primary" class="mt-4 w-full rounded p-1 text-lg font-bold"
				>Start Your Search!</Button
			>
			{#if form && form.errorMessage}
				<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">{form.errorMessage}</p>
			{/if}
		</form>
	</div>
</div>
