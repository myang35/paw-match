<script lang="ts">
	import { Button } from '$lib/ui';
	import { faArrowUp, faPen, faX } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { FilterOptions } from '../../_types/filter-options';

	type Props = {
		filterOptions?: FilterOptions;
		onFilterClick?: (e: MouseEvent) => void;
		onSortClick?: (e: MouseEvent) => void;
	};

	let {
		filterOptions = {
			breeds: [],
			age: {}
		},
		onFilterClick,
		onSortClick
	}: Props = $props();
</script>

<section class="bg-secondary-500/50 border-secondary-500 border-b-4 p-4">
	<div class="flex justify-center gap-20">
		<div>
			<h1 class="font-bold">Filters:</h1>
			{#if filterOptions.breeds.length > 0}
				<div>
					<div>
						<p class="max-w-40 truncate">Breeds:</p>
						<ul>
							{#each filterOptions.breeds as breed}
								<li class="flex items-center gap-1 pl-4">
									<span>- {breed}</span>
									<button class="rounded px-2 text-red-900"><Fa icon={faX} /></button>
								</li>
							{/each}
						</ul>
					</div>
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
					<Button class="rounded p-2 text-red-900"><Fa icon={faX} /></Button>
				</div>
			{/if}
			<Button
				color="light"
				onclick={onFilterClick}
				class="flex items-center gap-2 rounded px-2 py-1"
			>
				<span>Update Filter</span>
				<Fa icon={faPen} class="inline" />
			</Button>
		</div>
		<div>
			<h1 class="font-bold">Sort By:</h1>
			<Button color="light" onclick={onSortClick} class="rounded px-2 py-1"
				>Breed <Fa icon={faArrowUp} class="inline" /></Button
			>
		</div>
	</div>
</section>
