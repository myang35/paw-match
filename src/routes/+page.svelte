<script lang="ts">
	import { base } from '$app/paths';
	import { Anchor } from '$lib/ui';
</script>

<div class="from-primary-500/50 to-primary-900/50 h-full bg-gradient-to-br">
	<section
		class="flex w-full flex-col items-center gap-20 bg-[url('$lib/assets/images/hero-background.jpg')] bg-cover bg-center bg-no-repeat p-20"
	>
		<h1 class="text-fill-light-500 text-fill text-center text-5xl font-extrabold tracking-wide">
			Start your journey today!
		</h1>
		<p class="text-fill-light-500 text-fill max-w-3xl text-center text-3xl font-extrabold">
			Find your new best friend among our adorable shelter dogs waiting for a loving home
		</p>
		<Anchor
			href="{base}/login?redirectTo=search"
			color="primary"
			class="w-fit rounded-2xl border-2 px-8 py-2 text-lg font-bold">Let's Go!</Anchor
		>
	</section>

	<section class="mx-auto w-fit p-20">
		<p
			class="border-secondary-500 max-w-2xl border-y-2 p-4 text-center text-lg leading-8 font-bold"
		>
			Our mission is to connect loving homes with shelter dogs in need. By providing a searchable
			database of adoptable dogs, we aim to make the process of finding a forever friend easier and
			more accessible.
		</p>
	</section>
</div>
