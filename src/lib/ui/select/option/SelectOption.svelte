<script lang="ts">
	import { Select } from 'melt/builders';
	import { getContext, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		value: string;
		children: Snippet;
		class?: ClassValue;
	};

	let { value, children, class: classProp }: Props = $props();

	const select = getContext<Select<string>>('select');
</script>

<button
	type="button"
	{...select.getOption(value)}
	class={[
		'border-dark-100/25 w-full border-t px-2 py-1 text-start',
		select.highlighted === value && 'bg-primary-200',
		classProp
	]}>{@render children()}</button
>
