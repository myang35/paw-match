<script lang="ts">
	import type { Dog } from '$lib/api/types/dog';
	import type { Location } from '$lib/api/types/location';
	import { favorites, initializeFavorites } from '$lib/utils';
	import { faHeart } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	type Props = { dog: Dog; location: Location; hideFavoriteButton?: boolean };

	let { dog, location, hideFavoriteButton = false }: Props = $props();
	let favorited = $state($favorites.includes(dog.id));

	onMount(() => {
		initializeFavorites();
		favorites.subscribe((value) => {
			favorited = value.includes(dog.id);
		});
	});
</script>

<div
	class="bg-light-500 relative flex h-80 max-w-fit overflow-hidden rounded-lg shadow-lg shadow-black/25 transition hover:scale-105 hover:shadow-2xl hover:shadow-black/50"
>
	<img src={dog.img} alt={dog.name} class="h-full min-w-40" />
	<div
		class="text-light-500 absolute right-0 bottom-0 left-0 flex items-end justify-between bg-black/50 p-4 text-start"
	>
		<div>
			<h1 class="text-2xl font-bold">{dog.name}</h1>
			<p>
				<span>{dog.breed},</span>
				<span class="text-light-700 text-sm">{dog.age} months</span>
			</p>
			<p>
				{location.city},
				{location.state}
				{location.zip_code}
			</p>
		</div>

		{#if !hideFavoriteButton}
			<button
				onclick={() => favorites.toggle(dog.id)}
				class={[
					'text-light-100 size-12 rounded-full text-3xl transition',
					favorited && 'text-primary-100 bg-secondary-500'
				]}
			>
				<Fa icon={faHeart} class="m-auto" />
			</button>
		{/if}
	</div>
</div>
