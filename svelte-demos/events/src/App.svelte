<script>
    import { Stage, Layer, Rect } from "svelte-konva";

    function handleClick(e) {
        const konvaEvent = e.detail;
        window.alert(`Clicked on rectangle: ${konvaEvent.type}`);
    }
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
    <Layer>
        <Rect
            config={{ x: 100, y: 100, width: 400, height: 200, fill: "blue" }}
            on:pointerclick={handleClick}
        />
    </Layer>
</Stage>
