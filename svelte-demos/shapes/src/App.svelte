<script>
    import { Stage, Layer, Text, Rect, Circle, Line } from "svelte-konva";
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
    <Layer>
        <Text config={{ text: "Some text on canvas", fontSize: 15 }} />
        <Rect
            config={{
                x: 20,
                y: 50,
                width: 100,
                height: 100,
                fill: "red",
                shadowBlur: 10,
            }}
        />
        <Circle
            config={{
                x: 200,
                y: 100,
                radius: 50,
                fill: "green",
            }}
        />
        <Line
            config={{
                x: 20,
                y: 200,
                points: [0, 0, 100, 0, 100, 100],
                tension: 0.5,
                closed: true,
                stroke: "black",
                fillLinearGradientStartPoint: { x: -50, y: -50 },
                fillLinearGradientEndPoint: { x: 50, y: 50 },
                fillLinearGradientColorStops: [0, "red", 1, "yellow"],
            }}
        />
    </Layer>
</Stage>
