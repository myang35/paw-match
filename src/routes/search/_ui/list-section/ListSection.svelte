<script lang="ts">
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
	{:else if errorMessage}
		<p>{errorMessage}</p>
	{:else}
		<p>Fetching...</p>
	{/if}
</section>
