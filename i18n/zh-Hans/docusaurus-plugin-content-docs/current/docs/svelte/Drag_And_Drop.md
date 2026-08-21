---
title: 使用 Svelte 拖放 Canvas 图形
sidebar_label: 拖放
hide_table_of_contents: true
slug: Drag_And_Drop.html
description: "了解如何使用 draggable prop 和绑定，通过 svelte-konva 为 Svelte 中的 Canvas 图形启用拖放功能。"
---

要为 Canvas 上的任意节点启用拖放，只需向组件传入 `draggable=true` prop。

svelte-konva 可以在 `dragend` 时自动使受影响的 props（x、y）与 Konva 节点保持同步。有关详细信息，请参阅[绑定](/docs/svelte/Bindings.html)页面。

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/drag_and_drop?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
