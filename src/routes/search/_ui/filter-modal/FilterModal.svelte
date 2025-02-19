<script lang="ts">
	import { Button } from '$lib/ui';
	import type { FilterOptions } from '../../_types/filter-options';
	import AgeFieldset from './age-fieldset/AgeFieldset.svelte';
	import BreedFieldset from './breed-fieldset/BreedFieldset.svelte';

	type Props = {
		filterOptions?: FilterOptions;
		onSubmit?: (data: FilterOptions) => void;
		onCancel?: (event: MouseEvent) => void;
	};

	let { filterOptions = $bindable(), onSubmit, onCancel }: Props = $props();
	let selectedBreedsList = $state([...(filterOptions?.breeds ?? [])]);
	let minAge = $state(filterOptions?.age.min);
	let maxAge = $state(filterOptions?.age.max);
	let errorMessages = $state({
		age: ''
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errorMessages.age = '';
		if (minAge && minAge < 0) {
			minAge = 0;
		}
		if (maxAge && maxAge < 0) {
			maxAge = 0;
		}

		if (minAge && maxAge && minAge > maxAge) {
			errorMessages.age = 'Invalid age range!';
			return;
		}

		onSubmit?.({
			breeds: selectedBreedsList,
			age: {
				min: minAge,
				max: maxAge
			}
		});
	}
</script>

<div class="fixed inset-0 m-auto bg-black/25">
	<div
		class="bg-light-500 absolute inset-0 m-auto size-fit max-h-screen overflow-y-auto rounded-lg p-8"
	>
		<h1 class="mb-4 text-2xl font-bold">Filter</h1>

		<form onsubmit={handleSubmit} class="w-80 space-y-6">
			<div class="space-y-4">
				<BreedFieldset bind:selectedBreedsList />
				<AgeFieldset errorMessage={errorMessages.age} bind:minAge bind:maxAge />
			</div>

			<div class="border-secondary-500 rounded-full border-t-4"></div>

			<div class="flex justify-center gap-4">
				<Button
					type="button"
					color="light"
					onclick={onCancel}
					class="bg-light-600/50 w-full rounded p-2">Cancel</Button
				>
				<Button type="submit" color="primary" class="w-full rounded p-2">Update</Button>
			</div>
		</form>
	</div>
</div>
