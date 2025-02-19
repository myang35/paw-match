<script lang="ts">
	import { Select } from 'melt/builders';
	import { getContext } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		value: string;
		label: string;
		class?: ClassValue;
	};

	let { value, label, class: classProp }: Props = $props();

	const select = getContext<Select<string>>('select');
	const labelMap = getContext<Record<string, string>>('labelMap');
	labelMap[value] = label;
</script>

<button
	type="button"
	{...select.getOption(value)}
	class={[
		'border-dark-100/25 w-full border-t px-2 py-1 text-start',
		select.highlighted === value && 'bg-primary-200',
		classProp
	]}>{label}</button
>
