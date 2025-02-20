<script lang="ts">
	import { base } from '$app/paths';
	import { apiClient } from '$lib/api';
	import type { Dog } from '$lib/api/types/dog';
	import { DogCard } from '$lib/feats';
	import { Anchor } from '$lib/ui';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let dog = $state<Dog>();
	let errorMessage = $state('');

	onMount(() => {
		if (data.dogId) {
			apiClient.dogs.get({ ids: [data.dogId] }).then((res) => {
				dog = res[0];
			});
		}
	});
</script>

<div>
	{#if dog}
		<div class="flex flex-col items-center gap-8 p-8">
			<h1 class="text-5xl font-bold">You have been matched!</h1>
			<DogCard {dog} hideFavoriteButton />
			<p class="text-center text-xl">
				Thank you for opening your heart and home to a shelter dog in need. Your choice to adopt not
				only changes their life forever but also makes room for another animal in need of care and
				love. We wish you and your furry companion a lifetime of joy, love, and tail-wagging
				adventures!
			</p>
			<Anchor href="{base}/search" color="light" class="rounded-lg px-4 py-2"
				>Find More Dogs!</Anchor
			>
		</div>
	{:else if errorMessage}
		<p class="p-4 text-center">{errorMessage}</p>
	{:else}
		<p class="p-4 text-center">Fetching...</p>
	{/if}
</div>
