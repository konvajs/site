---
title: 绑定 config prop
sidebar_label: 绑定
hide_table_of_contents: true
slug: Bindings.html
description: "了解 svelte-konva 如何在拖放和变换事件发生后，使 config props 与 Konva 节点的 state 保持同步。"
---

如果绑定了 prop，Svelte-Konva 可以在 `dragend` 和 `transformend` 事件结束后，使部分 props 与 Konva 的内部 state（位置、旋转、缩放等）保持同步。

### 禁用自动同步

多数情况下，svelte-konva 监听 `dragend` 和 `transformend` 事件的默认行为正是你需要的行为。但是，在某些情况下（主要出于性能考虑），此行为可能没有帮助。这时，可以向组件传入 `staticConfig` prop 以禁用此行为。此时，svelte-konva 不会监听这些事件，也不会更新绑定的 props：

```
<script>
  import { Stage, Layer, Rect } from 'svelte-konva';

  // x and y values will not be synced with actual position after dragend even if bound
  const config = { x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true };
</script>

<Stage width={window.innerWidth} height={window.innerHeight}>
  <Layer>
    <Rect {...config} staticConfig />
  </Layer>
</Stage>
```

请注意，svelte-konva 只在组件初始化期间计算一次 `staticConfig` prop。组件初始化后，再更改 `staticConfig` prop 不会产生任何效果。

拖动不同的圆环并观察 Svelte 触发的响应式变化。请注意，只有绑定的圆环（黄色）会在 `dragend` 时自动更改坐标。

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/bindings?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
