<script lang="ts">
    import { Layer, Star, type KonvaDragTransformEvent } from "svelte-konva";
    import ResponsiveStage from "./ResponsiveStage.svelte";
    import Konva from "konva";
    import { browser } from "$app/environment";

    export let starCount: number;

    let stage: Konva.Stage;
    let container: HTMLDivElement;

    let list: Array<Partial<Konva.StarConfig>> = [];
    let dragItemId: string | null = null;

    let width: number;
    let height: number;

    $: if (browser && width && height) handleCount(starCount);

    function handleCount(count: number) {
        if (count < 0) return;

        let diff = count - list.length;

        if (diff < 0) {
            // remove stars
            list.splice(list.length + diff, Math.abs(diff));
        } else if (diff > 0) {
            // add stars
            for (let idx = 0; idx < diff; idx++) {
                addStar(list.length);
            }
        }

        list = list; // trigger reactivity
    }

    function addStar(id: number) {
        const scale = Math.random();

        list.push({
            id: id.toString(),
            x: Math.random() * width,
            y: Math.random() * height,
            rotation: Math.random() * 180,
            scale: {
                x: scale,
                y: scale,
            },
        });
    }

    let handleDragStart = (e: KonvaDragTransformEvent) => {
        // save drag element:
        dragItemId = e.detail.target.id();
        // move current element to the top:
        const item = list.find((i) => i.id === dragItemId);

        if (!item) return;

        item.handle.moveToTop();
    };

    let handleDragEnd = (e: KonvaDragTransformEvent) => {
        const item = list.find((i) => i.id === dragItemId);
        if (!item) {
            return;
        }
        item.x = e.detail.target.x();
        item.y = e.detail.target.y();
        dragItemId = null;
    };
</script>

<ResponsiveStage bind:handle={stage} bind:container bind:width bind:height>
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
                    fill: Konva.Util.getRandomColor(),
                    opacity: 0.8,
                    draggable: true,
                    scaleX:
                        dragItemId === item.id
                            ? item.scale?.x ?? 1 * 1.2
                            : item.scale?.x,
                    scaleY:
                        dragItemId === item.id
                            ? item.scale?.y ?? 1 * 1.2
                            : item.scale?.y,
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
</ResponsiveStage>
