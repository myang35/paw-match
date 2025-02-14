<script lang="ts">
	import { Button } from '$lib/ui';
</script>

<div class="from-primary-500/50 to-primary-900/50 h-full bg-gradient-to-br p-20">
	<div
		class="bg-light-500 mx-auto flex max-w-lg flex-col gap-4 rounded-xl p-8 shadow-lg shadow-black/20"
	>
		<h1 class="text-center text-3xl font-bold">Tell Us About You!</h1>

		<form action="" class="flex flex-col gap-4">
			<div class="flex flex-col">
				<label for="name">Name:</label>
				<input type="text" id="name" class="bg-light-100 border-dark-500 rounded border p-1" />
			</div>
			<div class="flex flex-col">
				<label for="email">Email:</label>
				<input type="text" id="email" class="bg-light-100 border-dark-500 rounded border p-1" />
			</div>
			<Button color="primary" class="mt-4 w-full rounded p-1 text-lg font-bold"
				>Start Your Search!</Button
			>
		</form>
	</div>
</div>
