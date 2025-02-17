<script lang="ts">
	import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
	import type { Select } from 'melt/builders';
	import { getContext, type Snippet } from 'svelte';
	import Fa from 'svelte-fa';
	import type { ClassValue } from 'svelte/elements';

	type Props = { children?: Snippet; disabled?: boolean; class?: ClassValue };

	let { children, disabled, class: classProp }: Props = $props();

	const select = getContext<Select<string>>('select');
</script>

<button
	{disabled}
	{...select.trigger}
	class={[
		'bg-light-100 border-dark-500 flex items-center justify-between gap-2 rounded border px-2 py-1 text-start',
		disabled && 'opacity-50',
		classProp
	]}
	>{@render children?.()}
	{#if !disabled}
		<Fa icon={faCaretDown} />
	{/if}
</button>
