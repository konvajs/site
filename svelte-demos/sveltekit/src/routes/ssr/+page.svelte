<script lang="ts">
	import Counter from "../Counter.svelte";
	import KonvaCanvas from "$lib/canvas/KonvaCanvas.svelte?client"; // Client-side only import

	// Set component variable to null if page is rendered in SSR, otherwise use client-side only import
	let MyCanvas = import.meta.env.SSR ? null : KonvaCanvas;

	let count = 10;
</script>

<svelte:head>
	<title>SSR</title>
	<meta name="description" content="svelte-konva in SSR pages" />
</svelte:head>

<section>
	<h2>change the counter or drag the stars for party mode 🥳</h2>

	<p>
		this page is server side rendered with svelte-konva being dynamically
		imported using <a
			href="https://www.npmjs.com/package/vite-plugin-iso-import"
		>
			vite-plugin-iso-import
		</a>
	</p>

	<Counter bind:count />

	<!-- Use your dynamically imported svelte-konva canvas component with a svelte:component block -->
	<svelte:component this={MyCanvas} starCount={count} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
