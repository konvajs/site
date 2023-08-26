<script lang="ts">
    import type Konva from "konva";
    import Stage from "svelte-konva/Stage.svelte";
    import { onMount } from "svelte";

    export let handle: null | Konva.Stage = null;
    export let container: HTMLDivElement;

    export let width = 0;
    export let height = 0;

    const STAGE_BASE_WIDTH = 1000; // Base width of the stage used to calculate the required scale at any container width to make sure that the examples are all appropriately scaled on each window size

    let config = {
        width: STAGE_BASE_WIDTH,
        height: 1000,
        scaleX: 1,
        scaleY: 1,
    };

    function updateStageSize() {
        if (!container) {
            return;
        }

        // Subtract 2 px because of 1px border of div container
        width = container.offsetWidth - 2;
        height = container.offsetHeight - 2;
        config.width = width;
        config.height = height;
        let scale = config.width / STAGE_BASE_WIDTH;
        config.scaleX = scale;
        config.scaleY = scale;
    }

    onMount(() => {
        window.addEventListener("resize", updateStageSize);

        updateStageSize();
    });
</script>

<div bind:this={container} style="max-height: 30vh; width: 100%;">
    <Stage
        {config}
        style="border: solid grey 1px;"
        bind:handle
        on:pointerdblclick
        on:pointerdown
        on:pointerup
        on:pointermove
        on:mouseout
    >
        <slot />
    </Stage>
</div>
