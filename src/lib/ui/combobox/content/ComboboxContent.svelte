<script lang="ts">
	import { type Combobox, createCombobox, melt } from '@melt-ui/svelte';
	import { getContext, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		children?: Snippet<[{ combobox: typeof combobox }]>;
	};

	let { children }: Props = $props();

	const combobox = createCombobox({
		forceVisible: true,
		multiple: true
	});
	const {
		elements: { menu }
	} = getContext<Combobox>('combobox');
</script>

<ul
	class="bg-light-100 flex max-h-80 flex-col overflow-auto rounded"
	use:melt={$menu}
	transition:fade={{ duration: 100 }}
>
	{@render children?.({ combobox })}
</ul>
