<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Button } from '$lib/shared/components';
</script>

<div class="bg-dark-500 flex justify-center gap-8 px-8 py-3">
	<Button onclick={() => goto(`${base}/`)} class="text-light-500 rounded-full px-4 font-bold"
		>Home</Button
	>
	<Button color="dark" onclick={() => goto(`${base}/login`)} class="rounded-full px-4 font-bold"
		>Adopt a Dog</Button
	>
</div>
