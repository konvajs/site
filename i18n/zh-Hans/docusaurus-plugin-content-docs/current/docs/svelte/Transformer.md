---
title: 如何使用 Svelte 和 Konva 调整 Canvas 图形大小并旋转图形？
sidebar_label: Transformer
hide_table_of_contents: true
slug: Transformer.html
description: "了解如何使用支持选择功能的 svelte-konva Transformer 组件，在 Svelte 中调整 Canvas 图形的大小并旋转图形。"
---

可以通过 svelte-konva Transformer 组件使用 Transformer 工具。通常，此方法需要使用原生 Konva API。可以手动将图形的引用传给 Transformer，并使用 `nodes()` 函数将图形附加到 Transformer。绑定相关 props 后，svelte-konva 还会在 `transformend` 时自动使这些 props 与 Konva 节点保持同步。有关详细信息，请参阅[绑定](/docs/svelte/Bindings.html)页面。

有关选择与变换功能的更详细示例，请参阅 svelte-konva 仓库中的[示例](https://github.com/konvajs/svelte-konva/blob/master/src/routes/examples/transform/Transform.svelte)。

操作说明：单击图形以将其选中。

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/transformer?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
