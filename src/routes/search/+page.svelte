<script lang="ts">
	import type { FilterOptions } from './_types/filter-options';
	import ControlSection from './_ui/control-section/ControlSection.svelte';
	import FilterModal from './_ui/filter-modal/FilterModal.svelte';
	import ListSection from './_ui/list-section/ListSection.svelte';

	let filterModalOpened = $state(false);
	let sortModalOpened = $state(false);
	let filter = $state<FilterOptions>();
</script>

<div>
	<ControlSection {filter} onFilterClick={() => (filterModalOpened = true)} />
	<ListSection />
</div>

{#if filterModalOpened}
	<FilterModal
		{filter}
		onSubmit={(data) => {
			filter = data;
			filterModalOpened = false;
		}}
		onCancel={() => (filterModalOpened = false)}
	/>
{/if}
