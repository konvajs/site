<script>
    import { onMount } from "svelte";
    import { Stage, Layer, Star } from "svelte-konva";

    const list = $state([]);
    let dragItemId = $state(null);

    const config = $state({
        width: 0,
        height: 0,
    });

    onMount(() => {
        config.width = window.innerWidth;
        config.height = window.innerHeight;

        for (let n = 0; n < 30; n++) {
            list.push({
                component: null,
                id: n.toString(),
                x: Math.random() * config.width,
                y: Math.random() * config.height,
                rotation: Math.random() * 180,
                scale: Math.random(),
            });
        }
    });

    let handleDragStart = (e) => {
        // save drag element:
        dragItemId = e.target.id();
        // move current element to the top:
        const item = list.find((i) => i.id === dragItemId);
        item.component.node.moveToTop();
    };
    let handleDragEnd = () => {
        dragItemId = null;
    };
</script>

<Stage {...config}>
    <Layer>
        {#each list as item (item.id)}
            <Star
                bind:x={item.x}
                bind:y={item.y}
                rotation={item.rotation}
                id={item.id}
                numPoints={5}
                innerRadius={30}
                outerRadius={50}
                fill="#89b717"
                opacity={0.8}
                draggable
                scaleX={dragItemId === item.id ? item.scale * 1.2 : item.scale}
                scaleY={dragItemId === item.id ? item.scale * 1.2 : item.scale}
                shadowColor="black"
                shadowBlur={10}
                shadowOffsetX={dragItemId === item.id ? 15 : 5}
                shadowOffsetY={dragItemId === item.id ? 15 : 5}
                shadowOpacity={0.6}
                bind:this={item.component}
                ondragstart={handleDragStart}
                ondragend={handleDragEnd}
            />
        {/each}
    </Layer>
</Stage>
