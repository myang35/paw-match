<script lang="ts">
	import { createPagination, melt } from '@melt-ui/svelte';

	type Props = {
		count: number;
		perPage: number;
		defaultPage?: number;
		siblingCount?: number;
		onPageChange?: (params: { page: number; start: number; end: number }) => void;
	};

	let { count, perPage, defaultPage = 1, siblingCount = 1, onPageChange }: Props = $props();

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range }
	} = createPagination({
		count,
		perPage,
		defaultPage,
		siblingCount,
		onPageChange: ({ next }) => {
			onPageChange?.({
				page: next,
				start: next * perPage - perPage,
				end: next * perPage
			});
			return next;
		}
	});
</script>

<nav use:melt={$root}>
	<div class="flex gap-2">
		<button
			use:melt={$prevButton}
			type="button"
			class="bg-light-500 not-disabled:hover:bg-secondary-100 rounded px-3 py-1 shadow shadow-black/10 disabled:opacity-50"
			>Prev</button
		>
		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<span>...</span>
			{:else}
				<button
					use:melt={$pageTrigger(page)}
					type="button"
					class="bg-light-500 not-disabled:not-data-[selected]:hover:bg-secondary-100 data-[selected]:text-light-500 data-[selected]:bg-secondary-500 rounded px-3 py-1 shadow shadow-black/10 disabled:opacity-50"
					>{page.value}</button
				>
			{/if}
		{/each}
		<button
			use:melt={$nextButton}
			type="button"
			class="bg-light-500 not-disabled:hover:bg-secondary-100 rounded px-3 py-1 shadow shadow-black/10 disabled:opacity-50"
			>Next</button
		>
	</div>
</nav>
