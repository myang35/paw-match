<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { apiClient } from '$lib/api';
	import type { Dog } from '$lib/api/types/dog';
	import { DogCard } from '$lib/feats';
	import { Button } from '$lib/ui';
	import { getErrorMessage, getFavorites } from '$lib/utils';
	import { onMount } from 'svelte';

	let dogs = $state<Dog[]>();
	let errorMessage = $state('');

	onMount(() => {
		const favorites = getFavorites();
		apiClient.dogs
			.get({ ids: favorites })
			.then((res) => {
				dogs = res.toSorted((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0;
				});
			})
			.catch((error) => {
				errorMessage = getErrorMessage(error);
			});
	});

	async function onMatchClick() {
		const response = await apiClient.dogs.match({ ids: getFavorites() });
		const searchParams = new URLSearchParams();
		searchParams.append('dogId', response.match);
		goto(`${base}/match?${searchParams.toString()}`);
	}
</script>

<div class="space-y-20 p-4">
	<h1 class="text-center text-5xl font-bold">Review Your List</h1>

	{#if dogs}
		{#if dogs.length > 0}
			<div class="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
				{#each dogs as dog}
					<DogCard {dog} />
				{/each}
			</div>

			<div class="border-secondary-500 flex flex-col items-center gap-4 border-t-4 py-4">
				<p class="w-full max-w-120 text-center text-lg">
					By clicking the button below, we will match you with one of the dogs from your favorited
					list.
				</p>
				<Button
					color="primary"
					onclick={onMatchClick}
					class="rounded-lg px-4 py-2 text-lg font-bold">Find my Match</Button
				>
			</div>
		{:else}
			<p class="p-4 text-center">You have no favorites.</p>
		{/if}
	{:else if errorMessage}
		<p class="p-4 text-center">{errorMessage}</p>
	{:else}
		<p class="p-4 text-center">Fetching...</p>
	{/if}
</div>
