<script>
    import { Stage, Layer, Star } from "svelte-konva";

    let width = window.innerWidth;
    let height = window.innerHeight;
    let list = [];
    for (let n = 0; n < 30; n++) {
        list.push({
            id: n.toString(),
            x: Math.random() * width,
            y: Math.random() * height,
            rotation: Math.random() * 180,
            scale: Math.random(),
        });
    }
    let dragItemId = null;

    let handleDragStart = (e) => {
        // save drag element:
        dragItemId = e.detail.target.id();
        // move current element to the top:
        const item = list.find((i) => i.id === dragItemId);
        item.handle.moveToTop();
    };
    let handleDragEnd = (e) => {
        const item = list.find((i) => i.id === dragItemId);
        if (!item) {
            return;
        }
        item.x = e.detail.target.x();
        item.y = e.detail.target.y();
        dragItemId = null;
    };
</script>

<Stage config={{ width, height }}>
    <Layer>
        {#each list as item (item.id)}
            <Star
                config={{
                    x: item.x,
                    y: item.y,
                    rotation: item.rotation,
                    id: item.id,
                    numPoints: 5,
                    innerRadius: 30,
                    outerRadius: 50,
                    fill: "#89b717",
                    opacity: 0.8,
                    draggable: true,
                    scaleX:
                        dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    scaleY:
                        dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    shadowColor: "black",
                    shadowBlur: 10,
                    shadowOffsetX: dragItemId === item.id ? 15 : 5,
                    shadowOffsetY: dragItemId === item.id ? 15 : 5,
                    shadowOpacity: 0.6,
                }}
                bind:handle={item.handle}
                on:dragstart={handleDragStart}
                on:dragend={handleDragEnd}
            />
        {/each}
    </Layer>
</Stage>
