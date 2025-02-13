<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Button } from '$lib/shared/components';
</script>

<div
	class="flex w-full flex-col items-center gap-20 bg-[url('$lib/assets/images/hero-background.jpg')] bg-cover bg-center bg-no-repeat p-20"
>
	<h1 class="text-fill-light-500 text-fill text-center text-5xl font-extrabold tracking-wide">
		Start your journey today!
	</h1>
	<p class="text-fill-light-500 text-fill max-w-3xl text-center text-3xl font-extrabold">
		Find your new best friend among our adorable shelter dogs waiting for a loving home
	</p>
	<Button
		color="primary"
		onclick={() => goto(`${base}/login`)}
		class="w-fit rounded-2xl border-2 px-8 py-2 text-lg font-bold">Let's Go!</Button
	>
</div>
