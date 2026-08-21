---
title: 如何使用 Svelte 缓存 Canvas 图形
sidebar_label: 缓存
hide_table_of_contents: true
slug: Cache.html
description: "了解如何在 Svelte 中通过 svelte-konva 缓存 Canvas 图形，并使用 node.cache() 提高渲染性能。"
---

要在 Svelte 应用中缓存节点，必须访问 Konva 节点并使用 `node.cache()` 函数。

可以使用组件实例的 `node` 属性访问节点。有关详细信息，请参阅 [Konva 节点](/docs/svelte/Konva_Node.html)。

**操作说明：尝试拖动整个舞台。然后使用缓存的组再试一次。**

你会看到性能明显提高。

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/cache?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
