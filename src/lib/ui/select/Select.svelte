<script lang="ts">
	import { Select } from 'melt/builders';
	import { setContext, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		children?: Snippet<[{ select: Select<string>; selectedLabel?: string }]>;
		content?: Snippet<[{ select: Select<string>; selectedLabel?: string }]>;
		defaultValue?: string;
		sameWidth?: boolean;
		value?: string;
	};

	let { children, content, defaultValue, sameWidth, value = $bindable() }: Props = $props();

	let selectedLabel = $state<string>();
	const labelMap: Record<string, string> = {};
	const select = new Select<string>({
		value: defaultValue,
		computePositionOptions: {
			placement: 'top-start'
		},
		sameWidth,
		onValueChange: (newValue) => {
			value = newValue;
			selectedLabel = value ? labelMap[value] : undefined;
		}
	});

	value = defaultValue;
	setContext('select', select);
	setContext('labelMap', labelMap);
</script>

<div {...select}>
	{@render children?.({ select, selectedLabel })}
	{#if select.open}
		<div
			{...select.content}
			transition:fade={{ duration: 100 }}
			class="bg-light-100 border-dark-500 flex max-h-80 flex-col overflow-y-auto rounded border"
		>
			{@render content?.({ select, selectedLabel })}
		</div>
	{/if}
</div>
