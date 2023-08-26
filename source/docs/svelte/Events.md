title: How to listen to an event on a canvas shape with Svelte and Konva?
layout: svelte_page

---

With `svelte-konva` you can easily listen to user input events (`click`, `dblclick`, `mouseover`, `tap`, `dbltap`, `touchstart`, etc...) and drag&drop events (`dragstart`, `dragmove`, `dragend`).

```js
<script>
  import { Stage, Layer, Rect } from 'svelte-konva';

  function handleClick(e) {
    const konvaEvent = e.detail;
    window.alert(`Clicked on rectangle: ${konvaEvent.type}`);
  }
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
    <Rect
      config={{ x: 100, y: 100, width: 400, height: 200, fill: 'blue' }}
      on:pointerclick={handleClick}
    />
  </Layer>
</Stage>
```

For the full list of events take a look into [on() method documentation](/api/Konva.Node.html#on).

## Bubbling
Konva events bubble up by default. To prevent this you can call `preventDefault()` on the event object or set the `cancelBubble` property of the Konva event to `false`:

```js
  function handleClick(e) {
    const konvaEvent = e.detail;
    
    // Cancel bubbling
    e.preventDefault();

    // or alternatively
    konvaEvent.cancelBubble = true;
  }
```

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/events?hidenavigation=1&view=split&fontsize=10&module=/src/App.svelte" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
```
