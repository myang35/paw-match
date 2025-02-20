<script lang="ts">
	import { apiClient } from '$lib/api';
	import { Combobox, ComboboxContent, ComboboxInput, ComboboxOption } from '$lib/ui';
	import { getErrorMessage } from '$lib/utils';
	import { onMount } from 'svelte';

	type Props = {
		selectedBreedsList?: string[];
	};

	let { selectedBreedsList = $bindable([]) }: Props = $props();
	let selectedList = $state(
		selectedBreedsList.map((breed) => ({
			value: breed,
			label: breed
		}))
	);
	let breeds = $state<string[]>();
	let breedsInputValue = $state('');
	let filteredBreeds = $derived.by(() => {
		if (!breeds) return [];
		if (!breedsInputValue) return [...breeds];
		const normalizedInput = breedsInputValue.toLowerCase();
		return breeds.filter((breed) => breed.toLowerCase().includes(normalizedInput));
	});
	let errorMessage = $state('');

	$effect(() => {
		selectedBreedsList = selectedList.map((item) => item.value);
	});

	onMount(async () => {
		try {
			breeds = await apiClient.dogs.getBreeds();
		} catch (error) {
			errorMessage = getErrorMessage(error);
		}
	});
</script>

<fieldset class="border-secondary-900 rounded border p-4">
	<legend class="text-secondary-900 font-bold">Breeds:</legend>

	{#if errorMessage}
		<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">{errorMessage}</p>
	{/if}

	<Combobox bind:selectedList>
		<ComboboxInput
			bind:value={breedsInputValue}
			placeholder="Select breeds"
			class="rounded-b-none"
		/>
		{#snippet content()}
			<ComboboxContent>
				{#each filteredBreeds as breed}
					<ComboboxOption value={breed} label={breed} />
				{/each}
			</ComboboxContent>
		{/snippet}
	</Combobox>

	{#if selectedList.length > 0}
		<ul class="border-dark-100 h-20 max-h-80 resize-y overflow-y-auto rounded-b border p-2">
			{#each selectedList as selectedItem}
				<li class="ml-5 list-disc">{selectedItem.label}</li>
			{/each}
		</ul>
	{/if}
</fieldset>
