<script>
    import { Stage, Layer, Rect, Transformer } from "svelte-konva";
    import Konva from "konva";

    const rectangles = [
        {
            rotation: 0,
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            scaleX: 1,
            scaleY: 1,
            fill: "red",
            name: "rect1",
            draggable: true,
        },
        {
            rotation: 0,
            x: 150,
            y: 150,
            width: 100,
            height: 100,
            scaleX: 1,
            scaleY: 1,
            fill: "green",
            name: "rect2",
            draggable: true,
        },
    ];

    let transformer;
    let selectedShapeName = "";

    function handleStageMouseDown(e) {
        const konvaEvent = e.detail;
        // clicked on stage - clear selection
        if (konvaEvent.target === konvaEvent.target.getStage()) {
            selectedShapeName = "";
            updateTransformer();
            return;
        }

        // clicked on transformer - do nothing
        const clickedOnTransformer =
            konvaEvent.target.getParent().className === "Transformer";
        if (clickedOnTransformer) {
            return;
        }

        // find clicked rect by its name
        const name = konvaEvent.target.name();
        const rect = rectangles.find((r) => r.name === name);
        if (rect) {
            selectedShapeName = name;
        } else {
            selectedShapeName = "";
        }

        updateTransformer();
    }

    function handleTransformEnd() {
        // find element in our state
        const rect = rectangles.find((r) => r.name === selectedShapeName);

        // change fill
        rect.fill = Konva.Util.getRandomColor();
    }

    function updateTransformer() {
        if (!transformer) return;

        // here we need to manually attach or detach Transformer node
        const stage = transformer.getStage();

        const selectedNode = stage.findOne("." + selectedShapeName);

        // do nothing if selected node is already attached
        if (selectedNode === transformer.node()) {
            return;
        }

        if (selectedNode) {
            // attach to another node
            transformer.nodes([selectedNode]);
        } else {
            // remove transformer
            transformer.nodes([]);
        }
    }
</script>

<Stage
    config={{ width: window.innerWidth, height: window.innerHeight }}
    on:mousedown={handleStageMouseDown}
    on:touchstart={handleStageMouseDown}
>
    <Layer>
        {#each rectangles as rectangle}
            <Rect config={rectangle} on:transformend={handleTransformEnd} />
        {/each}
        <Transformer bind:handle={transformer} />
    </Layer>
</Stage>
