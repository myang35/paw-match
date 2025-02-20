<script lang="ts">
	import type { Dog } from '$lib/api/types/dog';
	import { isFavorited, toggleFavorite } from '$lib/utils';
	import { faHeart } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	type Props = { dog: Dog; hideFavoriteButton?: boolean };

	let { dog, hideFavoriteButton = false }: Props = $props();
	let favorited = $state(isFavorited(dog.id));
</script>

<div
	class="bg-light-500 relative flex h-80 max-w-fit overflow-hidden rounded-lg shadow-lg shadow-black/25 transition hover:scale-105 hover:shadow-2xl hover:shadow-black/50"
>
	<button>
		<img src={dog.img} alt={dog.name} class="h-full min-w-40" />
	</button>
	<div
		class="text-light-500 absolute right-0 bottom-0 left-0 flex justify-between bg-black/50 p-4 text-start"
	>
		<div>
			<h1 class="text-2xl font-bold">{dog.name}</h1>
			<p>
				{dog.breed},
				<span class="text-light-700 text-sm">{dog.age} months</span>
			</p>
		</div>

		{#if !hideFavoriteButton}
			<button
				onclick={() => {
					toggleFavorite(dog.id);
					favorited = !favorited;
				}}
				class={[
					'text-light-100 size-12 text-3xl',
					favorited && 'text-primary-100 bg-secondary-500 rounded-full'
				]}
			>
				<Fa icon={faHeart} class="m-auto" />
			</button>
		{/if}
	</div>
</div>
