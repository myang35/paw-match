<script lang="ts">
	import type { FilterOptions } from './_types/filter-options';
	import ControlSection from './_ui/control-section/ControlSection.svelte';
	import FilterModal from './_ui/filter-modal/FilterModal.svelte';
	import ListSection from './_ui/list-section/ListSection.svelte';

	let filterModalOpened = $state(false);
	let sortModalOpened = $state(false);
	let filterOptions = $state<FilterOptions>();
</script>

<div>
	<ControlSection
		{filterOptions}
		onFilterClick={() => (filterModalOpened = true)}
		onSortClick={() => (sortModalOpened = true)}
	/>
	<ListSection />
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
