<script lang="ts">
	import { Select } from 'melt/builders';
	import { getContext, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	const select = getContext<Select<string>>('select');
</script>

<div
	{...select.content}
	transition:fade={{ duration: 100 }}
	class="bg-light-100 border-dark-500 flex max-h-80 flex-col overflow-y-scroll rounded border"
>
	{@render children()}
</div>
