<script>
    import { Stage, Layer, Shape } from "svelte-konva";
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
    <Layer>
        <Shape
            config={{
                sceneFunc: function (context, shape) {
                    context.beginPath();
                    context.moveTo(20, 50);
                    context.lineTo(220, 80);
                    context.quadraticCurveTo(150, 100, 260, 170);
                    context.closePath();

                    // special Konva.js method
                    context.fillStrokeShape(shape);
                },
                fill: "#00D2FF",
                stroke: "black",
                strokeWidth: 4,
            }}
        />
    </Layer>
</Stage>
