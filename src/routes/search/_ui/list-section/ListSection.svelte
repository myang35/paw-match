<script lang="ts">
	import { apiClient, type DogsSearchResponse } from '$lib/api';
	import type { Dog } from '$lib/api/types/dog';
	import { Pagination } from '$lib/ui';
	import { getErrorMessage } from '$lib/utils';
	import { onMount } from 'svelte';
	import type { FilterOptions } from '../../_types/filter-options';
	import type { SortOptions } from '../../_types/sort-options';
	import DogCard from './dog-card/DogCard.svelte';

	type Props = {
		filterOptions: FilterOptions;
		sortOptions: SortOptions;
	};

	const ITEMS_PER_PAGE = 25;

	let { filterOptions, sortOptions }: Props = $props();
	let data = $state<{
		searchResponse: DogsSearchResponse;
		dogs: Dog[];
	}>();
	let paginationState = $state<{
		page: number;
		start: number;
		end: number;
	}>({
		page: 1,
		start: 0,
		end: ITEMS_PER_PAGE
	});
	let totalEntries = $derived(data?.searchResponse.total);
	let totalPages = $derived(totalEntries ? totalEntries / ITEMS_PER_PAGE : undefined);
	let favoritedList = $state<string[]>();
	let errorMessage = $state('');

	$effect(() => {
		if (filterOptions && sortOptions) {
			paginationState = {
				page: 1,
				start: 0,
				end: ITEMS_PER_PAGE
			};
			loadData({ from: 0 });
		}
	});

	onMount(() => {
		favoritedList = (() => {
			const stored = localStorage.getItem('favoritedList');
			if (!stored) return [];
			try {
				const parsed = JSON.parse(stored);
				if (!(parsed instanceof Array)) return [];
				return parsed.filter((item) => typeof item === 'string');
			} catch (error) {
				return [];
			}
		})();
	});

	async function loadData(params: { from: number }) {
		try {
			data = undefined;
			const searchResponse = await apiClient.dogs.search({
				from: params.from,
				size: ITEMS_PER_PAGE,
				breeds: filterOptions.breeds,
				ageMin: filterOptions.age.min,
				ageMax: filterOptions.age.max,
				sort: `${sortOptions.prop}:${sortOptions.desc ? 'desc' : 'asc'}`
			});
			const dogs = await apiClient.dogs.get({ ids: searchResponse.resultIds });
			data = {
				searchResponse,
				dogs
			};
		} catch (error) {
			errorMessage = getErrorMessage(error);
		}
	}

	function updateFavoritedList(dogId: string) {
		if (!favoritedList) {
			favoritedList = [dogId];
		} else {
			const favoritedIndex = favoritedList.findIndex((value) => value === dogId);
			if (favoritedIndex === -1) {
				favoritedList.push(dogId);
			} else {
				favoritedList.splice(favoritedIndex, 1);
			}
		}
		localStorage.setItem('favoritedList', JSON.stringify(favoritedList));
	}

	async function onPageChange(params: { page: number; start: number; end: number }) {
		paginationState = params;
		loadData({ from: params.start });
	}
</script>

<section>
	{#if data}
		<div class="space-y-8 px-8 py-4">
			{#if paginationState}
				<p class="text-center">
					Page {paginationState.page} of {totalPages}, Showing {paginationState.start} - {paginationState.end}
					of {totalEntries} entries
				</p>
			{/if}
			<div class="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
				{#each data.dogs as dog}
					<DogCard
						{dog}
						favorited={favoritedList?.includes(dog.id)}
						onClick={() => updateFavoritedList(dog.id)}
					/>
				{/each}
			</div>
			<div class="mx-auto w-fit">
				<Pagination
					count={data.searchResponse.total}
					perPage={ITEMS_PER_PAGE}
					defaultPage={paginationState.page}
					{onPageChange}
				/>
			</div>
		</div>
	{:else if errorMessage}
		<p>{errorMessage}</p>
	{:else}
		<p>Fetching...</p>
	{/if}
</section>
