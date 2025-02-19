<script lang="ts">
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import { createCombobox } from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import Fa from 'svelte-fa';

	type Props = {
		children?: Snippet<[{ combobox: typeof combobox }]>;
		content?: Snippet<[{ combobox: typeof combobox }]>;
		selectedList?: {
			value: string;
			label: string;
		}[];
	};

	let { children, content, selectedList = $bindable() }: Props = $props();

	const combobox = createCombobox({
		forceVisible: true,
		multiple: true
	});
	const {
		states: { open, selected }
	} = combobox;

	selected.set(selectedList);

	selected.subscribe((value) => {
		selectedList =
			value?.map((item) => ({
				label: item.label ?? '',
				value: item.value as string
			})) ?? [];
	});

	setContext('combobox', combobox);
</script>

<div class="relative">
	{@render children?.({ combobox })}
	<div class="pointer-events-none absolute top-0 right-2 bottom-0 my-auto h-fit">
		{#if $open}
			<Fa icon={faChevronUp} class="size-4" />
		{:else}
			<Fa icon={faChevronDown} class="size-4" />
		{/if}
	</div>
</div>
{#if $open}
	{@render content?.({ combobox })}
{/if}
