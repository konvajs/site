<script>
    import { Stage, Layer, Text, Circle } from "svelte-konva";

    // Will be holding the Konva node reference of the circle
    let circle;

    function pulseShape(shape) {
        // use Konva node methods to animate a shape
        shape.to({
            scaleX: 1.5,
            scaleY: 1.5,
            onFinish: () => {
                shape.to({
                    scaleX: 1,
                    scaleY: 1,
                });
            },
        });
    }

    function handleStageClick() {
        // this event demonstrates how to access the Konva node by binding the handle prop
        pulseShape(circle);
    }

    function handleCircleClick(e) {
        // another way to access Konva nodes is to just use the event payload
        pulseShape(e.detail.target);
        // prevent bubbling of the click event to the stage
        e.detail.cancelBubble = true;
    }
</script>

<Stage
    config={{ width: window.innerWidth, height: window.innerHeight }}
    on:click={handleStageClick}
    on:tap={handleStageClick}
>
    <Layer>
        <Text
            config={{
                x: 10,
                y: 10,
                text: "Click on any place to see an animation",
            }}
        />

        <Circle
            config={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                radius: 80,
                fill: "red",
            }}
            on:click={handleCircleClick}
            on:tap={handleCircleClick}
            on:dblclick={handleCircleClick}
            bind:handle={circle}
        />
    </Layer>
</Stage>
