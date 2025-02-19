<script lang="ts">
	import { melt, type Combobox } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = { value?: string; class?: ClassValue };

	let { value = $bindable(), class: classProp }: Props = $props();

	const {
		elements: { input }
	} = getContext<Combobox>('combobox');
</script>

<input
	use:melt={$input}
	bind:value
	class={['bg-light-100 border-dark-500 w-full rounded border py-1 pr-8 pl-2', classProp]}
/>
