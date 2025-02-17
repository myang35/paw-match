<script lang="ts">
	import { RangeSlider } from '$lib/ui';
	import BreedField from './breed-field/BreedField.svelte';

	let breedValue = $state<string>();
	let ageValue = $state<[number, number]>([0, 12]);
</script>

<section class="bg-secondary-500/50 px-8 py-4">
	<form class="mx-auto flex w-fit gap-8">
		<div class="flex flex-col">
			<label for="breed">Breed:</label>
			<BreedField bind:value={breedValue} />
		</div>
		<div class="flex flex-col">
			<label for="age">Age: {ageValue[0]} - {ageValue[1]} months</label>
			<RangeSlider min={0} max={24} defaultValue={[0, 12]} class="w-40" bind:value={ageValue} />
		</div>
	</form>
</section>
