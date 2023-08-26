<script lang="ts">
	import Counter from "./Counter.svelte";
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";
	import type KonvaCanvas from "$lib/canvas/KonvaCanvas.svelte";
	import { onMount } from "svelte";

	let count = 10;

	let MyCanvas: typeof KonvaCanvas;

	onMount(async () => {
		// Dynamically import your canvas component encapsulating all svelte-konva functionality inside onMount()
		MyCanvas = (await import("$lib/canvas/KonvaCanvas.svelte")).default;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app with svelte-konva
	</h1>

	<h2>change the counter or drag the stars for party mode 🥳</h2>

	<p>
		this page is prerendered with svelte-konva being dynamically imported
		inside <code>onMount()</code>
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

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
