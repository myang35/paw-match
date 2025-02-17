<script lang="ts">
	import { apiClient } from '$lib/api';
	import { Select, SelectContent, SelectOption, SelectTrigger } from '$lib/ui';
	import { getErrorMessage } from '$lib/utils';
	import { onMount } from 'svelte';

	type Props = { value?: string };

	let { value = $bindable() }: Props = $props();

	let breedsRequest = $state<Promise<string[]>>();

	onMount(async () => {
		breedsRequest = apiClient.dogs.getBreeds();
	});
</script>

{#if breedsRequest}
	{#await breedsRequest}
		<Select>
			<SelectTrigger disabled class="w-40"><div class="truncate">Fetching...</div></SelectTrigger>
		</Select>
	{:then breeds}
		<Select bind:value defaultValue="- Any -">
			{#snippet children(select)}
				<SelectTrigger class="w-40"><div class="truncate">{select.value}</div></SelectTrigger>
			{/snippet}
			{#snippet content()}
				<SelectContent>
					<SelectOption value="- Any -">- Any -</SelectOption>
					{#each breeds ?? [] as breed}
						<SelectOption value={breed} class="w-40"
							><div class="truncate">{breed}</div></SelectOption
						>
					{/each}
				</SelectContent>
			{/snippet}
		</Select>
	{:catch error}
		<div>
			<Select>
				<SelectTrigger disabled class="w-40">Error!</SelectTrigger>
			</Select>
			<p class="w-40 rounded bg-red-500/25 px-2 py-1 text-red-900">{getErrorMessage(error)}</p>
		</div>
	{/await}
{:else}
	<Select>
		<SelectTrigger disabled class="w-40"><div class="truncate">Fetching...</div></SelectTrigger>
	</Select>
{/if}
