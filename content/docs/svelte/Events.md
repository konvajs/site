---
title: How to listen to an event on a canvas shape with Svelte and Konva?
sidebar_label: Events
hide_table_of_contents: true
slug: Events.html
description: "Learn how to handle click, mouse, touch, and drag events on canvas shapes with Svelte and Konva."
---

With `svelte-konva` you can easily listen to user input events (`click`, `dblclick`, `mouseover`, `tap`, `dbltap`, `touchstart`, etc...) and drag&drop events (`dragstart`, `dragmove`, `dragend`). For this you can pass a callback function to the prop named `on<Konva event name>` which is then called by svelte-konva every time the event is fired. You can also access the Konva event payload object inside the callback function as its argument.

```js
<script>
  import { Stage, Layer, Rect } from 'svelte-konva';

  function handleClick(e) {
    window.alert(`Clicked on rectangle: ${e.type}`);
  }
</script>

<Stage width={window.innerWidth} height={window.innerHeight}>
  <Layer>
    <Rect
      x={100}
      y={100}
      width={400}
      height={200}
      fill="blue"
      onpointerclick={handleClick}
    />
  </Layer>
</Stage>
```

For the full list of events take a look into [on() method documentation](/api/Konva.Node.html).

## Bubbling

Konva events bubble up by default. To prevent this you can set the `cancelBubble` property of the Konva event to `true`:

```js
function handleClick(e) {
  // Cancel bubbling
  e.cancelBubble = true;
}
```

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/events?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
