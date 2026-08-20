---
title: 使用 Svelte 和 Konva 保存及加载 Canvas
sidebar_label: 保存和加载
hide_table_of_contents: true
slug: Save_Load.html
description: "了解如何在 Svelte 中使用 Konva 保存和加载 Canvas state，以及如何序列化应用 state 而不是 Konva 内部数据。"
---

原生 Konva 可以使用 `node.toJSON()` 序列化节点树及其可序列化属性。它可以使用 `Konva.Node.create(json)` 恢复这些内容[（参阅示例）](/docs/data_and_serialization/Simple_Load.html)。图像、事件处理函数和自定义绘制函数必须单独恢复。

使用 svelte-konva 时，请改为保存应用 state。state 必须包含舞台所需的数据。不要保存 Konva 内部数据和节点。

此示例在 `localStorage` 中保存和读取 JSON 数据。你可以使用其他存储方法。

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/save_load?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
