---
title: 通过 Konva 开始使用 Svelte 和 Canvas
sidebar_label: 入门
hide_table_of_contents: true
slug: index.html
description: "开始使用 svelte-konva，它是 Konva.js 的官方 Svelte 绑定。使用 Svelte 组件绘制图形、处理事件并构建交互式 Canvas 应用。"
---

## 如何在 Svelte 中使用 Canvas？

[svelte-konva](https://github.com/konvajs/svelte-konva) 是一个使用 Svelte 绘制复杂 Canvas 图形的 JavaScript 库。它为 [Konva 框架](https://konvajs.org/) 提供声明式响应式绑定。所有 `svelte-konva` 组件都对应同名的 `Konva` 组件。`Konva` 对象的所有可用参数都可以作为单独的 props 添加到对应的 `svalte-konva` 组件中。

使用 svelte-konva 前，需要基本了解 `Konva`。可以参阅 [Konva 概览](/docs/overview.html)。

## 快速开始

### 1 通过 npm 安装

```npm
npm i svelte-konva konva
```

### 2 导入并使用 svelte-konva 组件

```js
<script>
  import { Stage, Layer, Rect } from 'svelte-konva';
</script>

<Stage width={window.innerWidth} height={window.innerHeight}>
  <Layer>
    <Rect x={100} y={100} width={400} height={200} fill="blue" />
  </Layer>
</Stage>
```

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/basic_demo?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
