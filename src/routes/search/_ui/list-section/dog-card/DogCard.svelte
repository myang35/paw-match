<script lang="ts">
	import type { Dog } from '$lib/api/types/dog';

	type Props = { dog: Dog };

	let { dog }: Props = $props();
</script>

<button
	class="bg-light-500 relative flex h-80 overflow-hidden rounded-lg shadow-lg shadow-black/25 transition hover:scale-105 hover:shadow-2xl hover:shadow-black/50"
>
	<img src={dog.img} alt={dog.name} class="h-full min-w-40" />
	<div class="text-light-500 absolute right-0 bottom-0 left-0 bg-black/50 p-4 text-start">
		<h1 class="text-2xl font-bold">{dog.name}</h1>
		<p>
			{dog.breed},
			<span class="text-light-700 text-sm">{dog.age} months</span>
		</p>
	</div>
</button>
