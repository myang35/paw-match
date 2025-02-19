<script lang="ts">
	import DogCard from './dog-card/DogCard.svelte';

	import { apiClient } from '$lib/api';
	import { getErrorMessage } from '$lib/utils';
	import type { FilterOptions } from '../../_types/filter-options';
	import type { SortOptions } from '../../_types/sort-options';

	type Props = {
		filterOptions: FilterOptions;
		sortOptions: SortOptions;
	};

	let { filterOptions, sortOptions }: Props = $props();

	let data = $state<Awaited<ReturnType<typeof fetchData>>>();
	let errorMessage = $state('');

	$effect(() => {
		data = undefined;
		fetchData({ filterOptions, sortOptions })
			.then((res) => {
				data = res;
			})
			.catch((error) => {
				errorMessage = getErrorMessage(error);
			});
	});

	async function fetchData(params: { filterOptions: FilterOptions; sortOptions: SortOptions }) {
		const searchResponse = await apiClient.dogs.search({
			from: 0,
			size: 18,
			breeds: params.filterOptions.breeds,
			ageMin: params.filterOptions.age.min,
			ageMax: params.filterOptions.age.max,
			sort: `${sortOptions.prop}:${params.sortOptions.desc ? 'desc' : 'asc'}`
		});
		const dogs = await apiClient.dogs.get({ ids: searchResponse.resultIds });
		return {
			searchResponse,
			dogs
		};
	}
</script>

<section class="p-8">
	{#if data}
		<div class="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
			{#each data.dogs as dog}
				<DogCard {dog} />
			{/each}
		</div>
	{:else if errorMessage}
		<p>{errorMessage}</p>
	{:else}
		<p>Fetching...</p>
	{/if}
</section>
