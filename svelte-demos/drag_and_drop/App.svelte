<script>
  import { Stage, Layer, Text } from "svelte-konva";

  let isDragging = false;

  let config = {
    text: "Draggable Text",
    x: 50,
    y: 50,
    draggable: true,
  };

  $: config.fill = isDragging ? "green" : "black";
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
    <Text
      {config}
      on:dragstart={() => (isDragging = true)}
      on:dragend={() => (isDragging = false)}
    />
  </Layer>
</Stage>
