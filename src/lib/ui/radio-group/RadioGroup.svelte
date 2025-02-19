<script lang="ts">
	import { RadioGroup } from 'melt/builders';
	import { setContext, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		value?: string;
		class?: ClassValue;
		children?: Snippet<[{ radioGroup: RadioGroup }]>;
	};

	let { value = $bindable(), class: classProp, children }: Props = $props();

	const radioGroup = new RadioGroup({
		value: value,
		onValueChange: (newValue) => {
			value = newValue;
		}
	});

	setContext('radioGroup', radioGroup);
</script>

<div {...radioGroup.root} class={[classProp]}>
	{@render children?.({ radioGroup })}
</div>
