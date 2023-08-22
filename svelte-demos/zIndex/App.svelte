<script>
  import { Stage, Layer, Circle } from "svelte-konva";
  import Konva from "konva";

  const items = [];

  for (let i = 0; i < 10; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 50,
      id: i.toString(),
      fill: Konva.Util.getRandomColor(),
      draggable: true,
    });
  }

  function handleDragstart(e) {
    const konvaEvent = e.detail;

    const dragItemId = konvaEvent.target.id();
    const item = items.find((i) => i.id === dragItemId);

    // move dragged element to the top using Konva functions
    item.handle.moveToTop();
  }
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
    {#each items as config}
      <Circle
        bind:config
        bind:handle={config.handle}
        on:dragstart={handleDragstart}
      />
    {/each}
  </Layer>
</Stage>
