<script>
    import { onMount, tick } from "svelte";
    import { Stage, Layer, Image } from "svelte-konva";

    let image = null;
    onMount(() => {
        const img = document.createElement("img");
        img.src = "https://konvajs.org/assets/yoda.jpg";
        img.onload = () => {
            image = img;
        };
    });
</script>

<Stage config={{ width: 1000, height: 1000 }}>
    <Layer>
        <Image config={{ image }} />
    </Layer>
</Stage>
