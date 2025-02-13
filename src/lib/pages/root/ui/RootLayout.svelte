<script lang="ts">
	import '$lib/app/styles/app.css';
	import type { Snippet } from 'svelte';
	import Footer from './footer/Footer.svelte';
	import Navbar from './navbar/Navbar.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div>
	<navbar>
		<Navbar />
	</navbar>

	<main>
		{@render children()}
	</main>

	<footer>
		<Footer />
	</footer>
</div>
