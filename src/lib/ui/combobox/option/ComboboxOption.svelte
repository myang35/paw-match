<script lang="ts">
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { melt, type Combobox } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import Fa from 'svelte-fa';

	type Props = {
		value: string;
		label: string;
	};

	let { value, label }: Props = $props();

	const {
		elements: { option },
		helpers: { isSelected }
	} = getContext<Combobox>('combobox');
</script>

<li
	use:melt={$option({
		value,
		label
	})}
	class="data-[highlighted]:bg-primary-200 relative cursor-pointer py-1
        pr-8 pl-2
          data-[disabled]:opacity-50"
>
	{#if $isSelected(value)}
		<div class="text-secondary-500 absolute top-0 right-2 bottom-0 my-auto h-fit">
			<Fa icon={faCheck} class="size-4" />
		</div>
	{/if}
	<span class="">{label}</span>
</li>
