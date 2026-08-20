---
title: 使用 Svelte 和 Konva 保存及加载 Canvas
sidebar_label: 保存和加载
hide_table_of_contents: true
slug: Save_Load.html
description: "了解如何在 Svelte 中使用 Konva 保存和加载 Canvas state，以及如何序列化应用 state 而不是 Konva 内部数据。"
---

原生 Konva 提供了使用 `node.toJSON()` 和 `node.create(json)` 函数保存或加载完整 Canvas 舞台的专用机制[（参阅示例）](/docs/data_and_serialization/Simple_Load.html)。

使用 svelte-konva 时，不建议使用此方法。应改为保存应用的 state，其中也包含所需的完整舞台数据。因此，不需要保存任何 Konva 内部数据和节点。

此示例以 JSON 格式在 localstorage 中保存和读取数据，但你可以使用任意保存方法。

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/new/svelte-demos/save_load?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
