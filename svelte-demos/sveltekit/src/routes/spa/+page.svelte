<script lang="ts">
    import Counter from "../Counter.svelte";
    import MyCanvas from "$lib/canvas/KonvaCanvas.svelte"; // Normal import

    let count = 10;
</script>

<svelte:head>
    <title>SSR</title>
    <meta name="description" content="svelte-konva in SSR pages" />
</svelte:head>

<section>
    <h2>change the counter or drag the stars for party mode 🥳</h2>

    <p>
        this page is loaded in SPA-Mode. In this case svelte-konva works
        natively without having to worry about dynamic imports as everything is
        executed client-side.
    </p>

    <Counter bind:count />

    <!-- You can simply use the component in SPA environments without dynamically importing it -->
    <MyCanvas starCount={count} />
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
