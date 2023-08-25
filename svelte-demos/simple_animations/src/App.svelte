<script>
    import { Stage, Layer, Rect, RegularPolygon } from "svelte-konva";
    import Konva from "konva";
    import { tick, onMount } from "svelte";

    let stage;
    let rect;
    let hexagon;

    onMount(async () => {
        const amplitude = 100;
        const period = 5000; // ms

        // Wait for all handles to become defined
        await tick();

        const centerX = stage.getWidth() / 2;

        // example of Konva.Animation
        const anim = new Konva.Animation(function (frame) {
            hexagon.setX(
                amplitude * Math.sin((frame.time * 2 * Math.PI) / period) +
                    centerX
            );
        }, hexagon.getLayer());

        anim.start();
    });

    function changeSize(e) {
        const konvaEvent = e.detail;
        // to() is a method of `Konva.Node` instances
        konvaEvent.target.to({
            scaleX: Math.random() + 0.8,
            scaleY: Math.random() + 0.8,
            duration: 0.2,
        });
    }
</script>

<Stage
    config={{ width: window.innerWidth, height: window.innerHeight }}
    bind:handle={stage}
>
    <Layer>
        <Rect
            config={{
                width: 50,
                height: 50,
                fill: "green",
                draggable: true,
            }}
            bind:handle={rect}
            on:dragstart={changeSize}
            on:dragend={changeSize}
        />
        <RegularPolygon
            config={{
                x: 200,
                y: 200,
                sides: 6,
                radius: 20,
                fill: "red",
                stroke: "black",
                strokeWidth: 4,
            }}
            bind:handle={hexagon}
        />
    </Layer>
</Stage>
