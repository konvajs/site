---
title: 如何使用 svelte-konva 更改节点的 zIndex？
sidebar_label: zIndex
hide_table_of_contents: true
slug: zIndex.html
description: "了解如何使用 node.moveToTop() 等原生 Konva 方法，在 svelte-konva 中管理 zIndex 并调整 Canvas 图形顺序。"
---

如果使用过 `vue-konva` 或 `react-konva` 等其他 Konva 包装器，可能习惯用数据顺序表示组件在 Canvas 上的绘制顺序。svelte-konva 目前未实现此功能。

请改用 Konva 原生函数动态调整 Canvas 上的组件顺序，例如 `node.zIndex(5)`、`node.moveToTop()` 等。请参阅[教程](/docs/groups_and_layers/Layering.html)。

### 使用 if 块

svelte-konva 会按照组件的初始顺序在 Canvas 上绘制图形。如果不需要在运行时动态更改顺序，此方法可以正常工作。使用 Svelte if 块显示或隐藏特定组件时，请注意以下限制。请看以下示例：

```
<Stage {...stageConfig}>
    <Layer>
        <Rect {...rectConfig} />
        {#if showRing}
            <Ring {...ringConfig} />
        {/if}
        <Circle {...circleConfig} />
    </Layer>
</Stage>
```

根据该顺序，圆形应绘制在 Canvas 的最上方，圆环位于其下，矩形位于最下方。但是，由于使用了 if 块，圆环最终可能位于 Canvas 的最上方，具体取决于 `showRing` 的初始值和后续变化。这是因为 Svelte 会挂载或卸载 if 块中的组件，而 svelte-konva 会在挂载时将图形绘制到 Canvas 的最上方。要避免此行为，请不要使用 Svelte if 块。请使用 `visible` prop 控制图形是否可见。这样，组件不会被挂载或卸载，并能保留它在 Canvas 上的初始绘制顺序。

操作说明：尝试拖动圆形。观察它如何移动到最上方。这是通过对拖动图形的引用调用 `moveToTop()` 完成的。

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/new/svelte-demos/zIndex?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
