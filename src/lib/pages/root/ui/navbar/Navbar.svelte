<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import logo from '$lib/assets/images/logo.png';
	import { Button } from '$lib/shared/components';
</script>

<div class="bg-light-500 flex justify-between px-8 py-1">
	<button onclick={() => goto(`${base}/`)} class="flex items-center gap-2">
		<h1 class="text-3xl font-bold">PawMatch</h1>
		<img src={logo} alt="Logo" class="size-6" />
	</button>
	<Button color="light" onclick={() => goto(`${base}/login`)} class="rounded-full px-4 font-bold"
		>Adopt a Dog</Button
	>
</div>
