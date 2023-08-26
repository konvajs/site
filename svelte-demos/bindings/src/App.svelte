<script>
    import { Stage, Layer, Ring } from "svelte-konva";

    let yellowRingConfig = {
        x: 150,
        y: 150,
        innerRadius: 80,
        outerRadius: 120,
        fill: "yellow",
        draggable: true,
    };

    let redRingConfig = {
        x: 350,
        y: 150,
        innerRadius: 80,
        outerRadius: 120,
        fill: "red",
        draggable: true,
    };

    const greenRingConfig = {
        x: 250,
        y: 350,
        innerRadius: 80,
        outerRadius: 120,
        fill: "green",
        draggable: true,
    };

    let redRingConfigActual = {
        x: redRingConfig.x,
        y: redRingConfig.y,
    };

    function getActualConfigValues() {
        redRingConfigActual.x = redRingConfig.x;
        redRingConfigActual.y = redRingConfig.y;
    }
</script>

<div>
    <Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
        <Layer>
            <Ring bind:config={yellowRingConfig} />
            <Ring config={redRingConfig} on:dragend={getActualConfigValues} />
            <Ring config={greenRingConfig} staticConfig />
        </Layer>
    </Stage>

    <div class="positions">
        <p>
            <b>yellow ring (bound):</b> x: {yellowRingConfig.x}, y: {yellowRingConfig.y}
        </p>
        <p>
            <b>red ring (not bound):</b> reactive x: {redRingConfig.x}, reactive
            y: {redRingConfig.y}, actual x: {redRingConfigActual.x}, actual y: {redRingConfigActual.y}
        </p>
        <p>
            <b>green ring (staticConfig):</b> x: {greenRingConfig.x}, y: {greenRingConfig.y}
        </p>
    </div>
</div>

<style>
    .positions {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
