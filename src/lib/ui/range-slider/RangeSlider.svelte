<script lang="ts">
	import { createSlider, melt } from '@melt-ui/svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		min: number;
		max: number;
		defaultValue: [number, number];
		value?: [number, number];
		class?: ClassValue;
	};

	let { min, max, defaultValue, value = $bindable(), class: classProp }: Props = $props();

	const {
		elements: { root, range, thumbs }
	} = createSlider({
		defaultValue,
		min,
		max,
		onValueChange: ({ curr, next }) => {
			value = [next[0], next[1]];
			return next;
		}
	});
</script>

<div use:melt={$root} class={classProp}>
	<div class="flex flex-col">
		<div class="relative flex h-5 items-center">
			<div class="bg-dark-100 h-2 w-full rounded-full">
				<div use:melt={$range} class="bg-dark-500 h-2"></div>
			</div>
			{#each $thumbs as thumb}
				<div
					use:melt={thumb}
					class="bg-dark-500 border-dark-100 size-5 rounded-full border-2"
				></div>
			{/each}
		</div>
		<div class="flex justify-between">
			<span>{min}</span>
			<span>{max}</span>
		</div>
	</div>
</div>
