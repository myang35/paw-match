<script lang="ts">
	import { Button } from '$lib/ui';
	import { faArrowUp, faPen, faX } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { FilterOptions } from '../../_types/filter-options';

	type Props = {
		filter?: FilterOptions;
		onFilterClick?: (e: MouseEvent) => void;
		onSortClick?: (e: MouseEvent) => void;
	};

	let {
		filter = {
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
			{#if filter.breeds.length > 0}
				<div>
					<div>
						<p class="max-w-40 truncate">Breeds:</p>
						<ul>
							{#each filter.breeds as breed}
								<li class="flex items-center gap-1 pl-4">
									<span>- {breed}</span>
									<button class="rounded px-2 text-red-900"><Fa icon={faX} /></button>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}
			{#if filter.age.min || filter.age.max}
				<div class="flex items-center gap-1">
					<p class="max-w-40 truncate">
						{#if filter.age.min === filter.age.max}
							Age = {filter.age.min}
						{:else if !filter.age.min}
							Age &lt; {filter.age.max}
						{:else if !filter.age.max}
							Age &gt; {filter.age.min}
						{:else}
							Age: {filter.age.min} &lt; {filter.age.max}
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
