<script lang="ts">
	import { Button } from '$lib/ui';
	import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { SortOptions } from '../../../_types/sort-options';

	type Props = {
		sortOptions: SortOptions;
		onSortClick?: (e: MouseEvent) => void;
	};

	let { sortOptions = $bindable(), onSortClick }: Props = $props();
</script>

<div>
	<h1 class="font-bold">Sort By:</h1>
	<Button color="light" onclick={onSortClick} class="rounded px-2 py-1">
		<span>{sortOptions.prop}</span>
		<Fa icon={sortOptions.desc ? faArrowDown : faArrowUp} class="inline" />
	</Button>
</div>
