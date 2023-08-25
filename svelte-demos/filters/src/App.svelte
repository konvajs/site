<script>
    import Konva from "konva";
    import { Stage, Layer, Rect } from "svelte-konva";
    import { onMount, tick } from "svelte";

    let rectangle;
    let color = "green";

    function handleMouseMove() {
        color = Konva.Util.getRandomColor();
        // may need to redraw layer manually due to possible color change
        rectangle.cache();
    }

    onMount(async () => {
        // wait for the rectangle handle to be rendered and become defined
        await tick();

        rectangle.cache();
    });
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
    <Layer>
        <Rect
            config={{
                filters: [Konva.Filters.Noise],
                noise: 1,
                x: 10,
                y: 10,
                width: 50,
                height: 50,
                fill: color,
                shadowBlur: 10,
            }}
            bind:handle={rectangle}
            on:mousemove={handleMouseMove}
        />
    </Layer>
</Stage>
