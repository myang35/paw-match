<script lang="ts">
	import { base } from '$app/paths';
	import { Anchor } from '$lib/ui';
	import { favorites, initializeFavorites } from '$lib/utils';
	import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { FilterOptions } from '../../_types/filter-options';
	import type { SortOptions } from '../../_types/sort-options';
	import FilterSection from './filter-section/FilterSection.svelte';
	import SortSection from './sort-section/SortSection.svelte';

	type Props = {
		filterOptions: FilterOptions;
		sortOptions: SortOptions;
		onFilterClick?: (e: MouseEvent) => void;
		onSortClick?: (e: MouseEvent) => void;
	};

	let {
		filterOptions = $bindable(),
		sortOptions = $bindable(),
		onFilterClick,
		onSortClick
	}: Props = $props();

	onMount(() => {
		initializeFavorites();
	});
</script>

<section class="bg-secondary-500/50 border-secondary-500 flex justify-between gap-8 border-b-4 p-4">
	<div class="flex items-center">
		<Anchor
			href="{base}/login"
			color="transparent"
			class="flex items-center gap-2 rounded p-2 text-lg"
		>
			<Fa icon={faLessThan} />
			<span>Update Profile</span>
		</Anchor>
	</div>
	<div class="flex justify-center gap-8">
		<FilterSection bind:filterOptions {onFilterClick} />
		<SortSection bind:sortOptions {onSortClick} />
	</div>
	<div class="flex items-center">
		<Anchor
			href="{base}/favorites"
			color="transparent"
			class="flex items-center gap-2 rounded p-2 text-lg"
		>
			<span>View Favorites</span>
			{#if $favorites?.length > 0}
				({$favorites.length})
			{/if}
			<Fa icon={faGreaterThan} />
		</Anchor>
	</div>
</section>
