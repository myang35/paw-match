<script lang="ts">
	import { Button } from '$lib/ui';
	import { faPen, faX } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { FilterOptions } from '../../../_types/filter-options';

	type Props = {
		filterOptions: FilterOptions;
		onFilterClick?: (e: MouseEvent) => void;
	};

	let { filterOptions = $bindable(), onFilterClick }: Props = $props();
</script>

<div>
	<h1 class="font-bold">Filters:</h1>
	{#if filterOptions.breeds.length > 0}
		<div>
			<p class="max-w-40 truncate">Breeds:</p>
			<ul>
				{#each filterOptions.breeds as breed}
					<li class="flex items-center gap-1 pl-4">
						<span>- {breed}</span>
						<button
							onclick={() => {
								const index = filterOptions.breeds.indexOf(breed);
								filterOptions.breeds.splice(index, 1);
							}}
							class="rounded px-2 text-red-900"><Fa icon={faX} /></button
						>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	{#if filterOptions.age.min || filterOptions.age.max}
		<div class="flex items-center gap-1">
			<p class="max-w-40 truncate">
				{#if filterOptions.age.min === filterOptions.age.max}
					Age = {filterOptions.age.min}
				{:else if !filterOptions.age.min}
					Age &lt; {filterOptions.age.max}
				{:else if !filterOptions.age.max}
					Age &gt; {filterOptions.age.min}
				{:else}
					Age: {filterOptions.age.min} &lt; {filterOptions.age.max}
				{/if}
			</p>
			<button onclick={() => (filterOptions.age = {})} class="rounded px-2 text-red-900"
				><Fa icon={faX} /></button
			>
		</div>
	{/if}
	<Button color="light" onclick={onFilterClick} class="flex items-center gap-2 rounded px-2 py-1">
		<span>Update Filter</span>
		<Fa icon={faPen} class="inline" />
	</Button>
</div>
