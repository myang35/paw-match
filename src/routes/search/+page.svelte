<script lang="ts">
	import type { FilterOptions } from './_types/filter-options';
	import type { SortOptions } from './_types/sort-options';
	import ControlSection from './_ui/control-section/ControlSection.svelte';
	import FilterModal from './_ui/filter-modal/FilterModal.svelte';
	import ListSection from './_ui/list-section/ListSection.svelte';
	import SortModal from './_ui/sort-modal/SortModal.svelte';

	let filterOptions = $state<FilterOptions>({
		breeds: [],
		age: {}
	});
	let sortOptions = $state<SortOptions>({
		prop: 'breed',
		desc: false
	});
	let filterModalOpened = $state(false);
	let sortModalOpened = $state(false);
</script>

<div>
	<ControlSection
		bind:filterOptions
		bind:sortOptions
		onFilterClick={() => (filterModalOpened = true)}
		onSortClick={() => (sortModalOpened = true)}
	/>
	<ListSection {filterOptions} {sortOptions} />
</div>

{#if filterModalOpened}
	<FilterModal
		{filterOptions}
		onSubmit={(data) => {
			filterOptions = data;
			filterModalOpened = false;
		}}
		onCancel={() => (filterModalOpened = false)}
	/>
{/if}

{#if sortModalOpened}
	<SortModal
		{sortOptions}
		onSubmit={(data) => {
			sortOptions = data;
			sortModalOpened = false;
		}}
		onCancel={() => (sortModalOpened = false)}
	/>
{/if}
