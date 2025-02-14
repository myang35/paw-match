<script lang="ts">
	import { base } from '$app/paths';
	import '$lib/app/styles/app.css';
	import logo from '$lib/assets/images/logo.png';
	import { Anchor } from '$lib/ui';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-screen flex-col">
	<navbar class="bg-light-500 flex items-center justify-between px-8 py-1">
		<a href="{base}/" class="flex items-center gap-2">
			<h1 class="text-3xl font-bold">PawMatch</h1>
			<img src={logo} alt="Logo" class="size-6" />
		</a>
		<Anchor href="{base}/login" color="light" class="h-fit rounded-full px-4 font-bold"
			>Adopt a Dog</Anchor
		>
	</navbar>

	<main class="h-full">
		{@render children()}
	</main>

	<footer class="bg-dark-500 flex justify-center gap-8 px-8 py-3">
		<Anchor href="{base}/" class="text-light-500 rounded-full px-4 font-bold">Home</Anchor>
		<Anchor href="{base}/login" color="dark" class="rounded-full px-4 font-bold">Adopt a Dog</Anchor
		>
	</footer>
</div>
