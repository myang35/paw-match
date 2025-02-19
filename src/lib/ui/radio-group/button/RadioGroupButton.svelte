<script lang="ts">
	import type { RadioGroup } from 'melt/builders';
	import { getContext, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		value: string;
		class?: ClassValue;
		children?: Snippet<[{ item: typeof item }]>;
	};

	let { value, class: classProp, children }: Props = $props();

	const radioGroup = getContext<RadioGroup>('radioGroup');
	const item = radioGroup.getItem(value);
</script>

<button {...item.attrs} type="button" class={['flex items-center gap-2', classProp]}>
	<div
		class={[
			'bg-light-100 border-dark-500 flex size-3 items-center justify-center rounded-full border'
		]}
	>
		{#if item.checked}
			<div class="bg-secondary-500 size-2 rounded-full"></div>
		{/if}
	</div>
	{@render children?.({ item })}
</button>
