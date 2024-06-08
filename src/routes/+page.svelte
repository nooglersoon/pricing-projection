<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main class="h-screen flex">
	<div class="my-auto mx-auto max-w-screen-xl px-8 py-16 flex flex-col gap-8">
		<div class="mx-auto max-w-lg text-center">
			<h1 class="text-2xl font-bold sm:text-3xl">Cattle Price Projection Calculator</h1>

			<p class="mt-4 text-gray-500">
				Fast yet simple calculator to help cattle price projections calculation.
			</p>
		</div>

		<button
			class="inline-block rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white w-32 mx-auto"
			on:click={() => {
				goto('/calculator');
			}}
		>
			Try for free
		</button>
	</div>
</main>
