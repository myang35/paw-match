<script lang="ts">
	import { Button, RadioGroup, RadioGroupButton } from '$lib/ui';
	import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { SortOptions } from '../../_types/sort-options';

	type Props = {
		sortOptions?: SortOptions;
		onSubmit?: (data: SortOptions) => void;
		onCancel?: (event: MouseEvent) => void;
	};

	let { sortOptions, onSubmit, onCancel }: Props = $props();
	let prop = $state(sortOptions?.prop ?? 'breed');
	let desc = $state(sortOptions?.desc ?? false);

	function handleSubmit(e: SubmitEvent) {
		onSubmit?.({
			prop,
			desc
		});
	}
</script>

<div class="fixed inset-0 m-auto bg-black/25">
	<div
		class="bg-light-500 absolute inset-0 m-auto size-fit max-h-screen overflow-y-auto rounded-lg p-8"
	>
		<h1 class="mb-4 text-2xl font-bold">Sort</h1>

		<form onsubmit={handleSubmit} class="w-80 space-y-6">
			<div class="space-y-4">
				<fieldset class="border-secondary-900 rounded border px-4 py-2">
					<legend class="text-secondary-900 font-bold">Sort By:</legend>

					<RadioGroup bind:value={prop}>
						<RadioGroupButton value="breed">Breed</RadioGroupButton>
						<RadioGroupButton value="age">Age</RadioGroupButton>
					</RadioGroup>
				</fieldset>

				<Button
					type="button"
					color="light"
					onclick={() => (desc = !desc)}
					class="flex w-full items-center justify-center gap-2 rounded-full p-2"
				>
					{#if desc}
						<span>Descending</span>
						<Fa icon={faArrowDown} />
					{:else}
						<span>Ascending</span>
						<Fa icon={faArrowUp} />
					{/if}
				</Button>
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
