<script lang="ts">
	type Props = {
		minAge?: number;
		maxAge?: number;
		errorMessage?: string;
	};

	let {
		minAge: minAgeProp = $bindable(),
		maxAge: maxAgeProp = $bindable(),
		errorMessage
	}: Props = $props();
	let minAge = $state<string>(minAgeProp?.toString() ?? '');
	let maxAge = $state<string>(maxAgeProp?.toString() ?? '');
	const fieldErrorMessages = $state({
		minAge: '',
		maxAge: ''
	});

	$effect(() => {
		minAgeProp = Number(minAge);
	});

	$effect(() => {
		maxAgeProp = Number(maxAge);
	});
</script>

<fieldset class="border-secondary-900 rounded border p-4">
	<legend class="text-secondary-900 font-bold">Age:</legend>

	<div class="flex items-center gap-4">
		<div>
			<input
				id="minAge"
				type="number"
				min="0"
				max="24"
				class="bg-light-100 border-dark-500 rounded border p-2 disabled:opacity-50"
				bind:value={minAge}
			/>
			{#if fieldErrorMessages.minAge}
				<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">
					{fieldErrorMessages.minAge}
				</p>
			{/if}
		</div>

		<span>-</span>

		<div>
			<input
				id="maxAge"
				type="number"
				min="0"
				max="24"
				class="bg-light-100 border-dark-500 rounded border p-2 disabled:opacity-50"
				bind:value={maxAge}
			/>
			{#if fieldErrorMessages.maxAge}
				<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">
					{fieldErrorMessages.maxAge}
				</p>
			{/if}
		</div>
		<span>months</span>
	</div>

	{#if errorMessage}
		<p class="rounded bg-red-500/25 px-2 py-1 text-red-900">{errorMessage}</p>
	{/if}
</fieldset>
