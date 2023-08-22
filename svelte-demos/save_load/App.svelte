<script>
  import { Stage, Layer, Circle } from "svelte-konva";
  import { onMount } from "svelte";

  const LOCALSTORAGE_KEY = "storage";
  const DEFAULT_DATA = { x: 100, y: 100, radius: 50, fill: "blue" };

  let list = [{ ...DEFAULT_DATA }];

  onMount(() => {
    load();
  });

  function handleClick(e) {
    const konvaEvent = e.detail;
    const stage = konvaEvent.target.getStage();

    const pos = stage.getPointerPosition();

    list.push({
      radius: 50,
      fill: "red",
      ...pos,
    });

    list = list; // Trigger Svelte reactivity

    save();
  }

  function load() {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (data) list = JSON.parse(data);
  }

  function save() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(list));
  }

  function clear() {
    list = [{ ...DEFAULT_DATA }];
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
</script>

<div>
  <Stage
    config={{
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true,
    }}
    on:click={handleClick}
    on:tap={handleClick}
  >
    <Layer>
      {#each list as config}
        <Circle {config} />
      {/each}
    </Layer>
  </Stage>

  <div class="reload">
    Click on canvas to create a cirlce.
    <a href=".">Reload the page</a>. Circles should stay here.
    <button on:click={clear}>clear saved data</button>
  </div>
</div>

<style>
  .reload {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
