<script lang="ts">
	import { apiClient } from '$lib/api';
	import { getErrorMessage } from '$lib/utils';
	import { onMount } from 'svelte';

	let request = $state<ReturnType<typeof fetchData>>();

	onMount(() => {
		request = fetchData();
	});

	async function fetchData() {
		const searchResponse = await apiClient.dogs.search({
			from: 0,
			size: 18
		});
		const dogs = await apiClient.dogs.get({ ids: searchResponse.resultIds });
		return {
			searchResponse,
			dogs
		};
	}
</script>

<section class="p-8">
	{#if request}
		{#await request}
			<p>Fetching...</p>
		{:then response}
			<div class="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
				{#each response.dogs as dog}
					<button
						class="bg-light-500 relative flex h-80 overflow-hidden rounded-lg shadow-lg shadow-black/25 transition hover:scale-105 hover:shadow-2xl hover:shadow-black/50"
					>
						<img src={dog.img} alt={dog.name} class="h-full min-w-40" />
						<div class="text-light-500 absolute right-0 bottom-0 left-0 bg-black/50 p-4 text-start">
							<h1 class="text-2xl font-bold">{dog.name}</h1>
							<p>
								{dog.breed},
								<span class="text-light-700 text-sm">{dog.age} months</span>
							</p>
						</div>
					</button>
				{/each}
			</div>
		{:catch error}
			<p>{getErrorMessage(error)}</p>
		{/await}
	{:else}
		<p>Fetching...</p>
	{/if}
</section>
