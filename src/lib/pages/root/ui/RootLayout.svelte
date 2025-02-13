<script lang="ts">
	import '$lib/app/styles/app.css';
	import type { Snippet } from 'svelte';
	import Footer from './footer/Footer.svelte';
	import Navbar from './navbar/Navbar.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-screen flex-col">
	<navbar>
		<Navbar />
	</navbar>

	<main class="h-full">
		{@render children()}
	</main>

	<footer>
		<Footer />
	</footer>
</div>
