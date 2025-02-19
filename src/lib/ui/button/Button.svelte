<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		color?: 'transparent' | 'primary' | 'secondary' | 'light' | 'dark';
		children?: Snippet;
	} & HTMLButtonAttributes;

	let { color = 'transparent', children, ...buttonProps }: Props = $props();
</script>

<button
	{...buttonProps}
	class={[
		color === 'transparent' && 'transition-colors hover:bg-black/20',
		color === 'primary' &&
			'border-dark-500 from-primary-500 to-primary-900 hover:from-primary-400 hover:to-primary-800 border bg-gradient-to-b transition-colors',
		color === 'secondary' &&
			'border-light-500 text-light-500 from-secondary-500 to-secondary-900 hover:from-secondary-400 hover:to-secondary-800 border bg-gradient-to-b transition-colors',
		color === 'light' && 'border-dark-500 bg-light-500 hover:bg-light-600 border transition-colors',
		color === 'dark' &&
			'border-light-500 text-light-500 bg-dark-500 hover:bg-dark-400 border transition-colors',
		buttonProps.class
	]}
>
	{@render children?.()}
</button>
