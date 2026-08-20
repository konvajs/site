---
title: 如何使用 Svelte 和 Konva 应用 Canvas 滤镜？
sidebar_label: 滤镜
hide_table_of_contents: true
slug: Filters.html
description: "了解如何在 Svelte 中使用 Konva 为图形应用 Canvas 滤镜，并在 onMount 和 afterUpdate 中手动缓存图形。"
---

要应用滤镜，必须手动缓存 `Konva.Node`。可以先在 `onMount()` 方法中完成此操作。

如果动态更改节点的样式，必须手动再次缓存节点，才能在 Canvas 上应用更改。可以在更改后直接对受影响的节点调用 `cache()` 方法（如示例所示）。也可以在 `afterUpdate()` 方法中执行此操作，以便在组件的 state 每次更改时自动再次缓存节点。

操作说明：将鼠标悬停在矩形上以查看变化。

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/new/svelte-demos/filters?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
