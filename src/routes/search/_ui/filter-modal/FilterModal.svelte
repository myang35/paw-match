<script lang="ts">
	import { Button } from '$lib/ui';
	import type { FilterOptions } from '../../_types/filter-options';
	import AgeFieldset from './age-fieldset/AgeFieldset.svelte';
	import BreedFieldset from './breed-fieldset/BreedFieldset.svelte';

	type Props = {
		filter?: FilterOptions;
		onSubmit?: (data: FilterOptions) => void;
		onCancel?: (event: MouseEvent) => void;
	};

	let { filter, onSubmit, onCancel }: Props = $props();
	let selectedBreedsList = $state<string[]>(filter?.breeds ?? []);
	let minAge = $state<number | undefined>(filter?.age.min);
	let maxAge = $state<number | undefined>(filter?.age.max);
	const fieldErrorMessages = $state({
		minAge: '',
		maxAge: ''
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (Object.values(fieldErrorMessages).some((m) => m)) return;

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
		<h1 class="mb-4 text-2xl font-bold">Update Filter</h1>

		<form onsubmit={handleSubmit} class="flex w-80 flex-col gap-4">
			<BreedFieldset bind:selectedBreedsList />

			<AgeFieldset bind:minAge bind:maxAge />

			<div class="flex justify-center gap-4">
				<Button
					type="button"
					color="light"
					onclick={onCancel}
					class="bg-light-600/50 w-full rounded p-2">Cancel</Button
				>
				<Button type="submit" color="primary" class="w-full rounded p-2">Update Filter</Button>
			</div>
		</form>
	</div>
</div>
