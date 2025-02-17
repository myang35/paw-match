<script lang="ts">
	import { Select } from 'melt/builders';
	import { setContext, type Snippet } from 'svelte';

	type Props = {
		children?: Snippet<[Select<string>]>;
		content?: Snippet<[Select<string>]>;
		defaultValue?: string;
		value?: string;
	};

	let { children, content, defaultValue, value = $bindable() }: Props = $props();

	const select = new Select<string>({
		value: defaultValue,
		computePositionOptions: {
			placement: 'top-start'
		}
	});

	setContext('select', select);
</script>

<div {...select}>
	{@render children?.(select)}
	{#if select.open}
		{@render content?.(select)}
	{/if}
</div>
