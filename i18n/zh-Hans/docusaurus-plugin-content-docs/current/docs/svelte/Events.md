---
title: 如何使用 Svelte 和 Konva 监听 Canvas 图形事件？
sidebar_label: 事件
hide_table_of_contents: true
slug: Events.html
description: "了解如何使用 Svelte 和 Konva 处理 Canvas 图形上的单击、鼠标、触摸和拖放事件。"
---

使用 `svelte-konva` 可以监听用户输入事件（`click`、`dblclick`、`mouseover`、`tap`、`dbltap`、`touchstart` 等）和拖放事件（`dragstart`、`dragmove`、`dragend`）。为此，可以向名为 `on<Konva event name>` 的 prop 传入回调函数。每次事件触发时，svelte-konva 都会调用此函数。还可以在回调函数中通过参数访问 Konva 事件负载对象。

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

有关完整事件列表，请参阅 [on() 方法文档](/api/Konva.Node.html)。

## 冒泡

默认情况下，Konva 事件会向上冒泡。要阻止冒泡，可以将 Konva 事件的 `cancelBubble` 属性设置为 `true`：

```js
function handleClick(e) {
  // Cancel bubbling
  e.cancelBubble = true;
}
```

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/events?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
