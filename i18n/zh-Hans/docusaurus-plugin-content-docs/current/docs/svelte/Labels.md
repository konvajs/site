---
title: 在 Svelte 中使用标签
sidebar_label: 标签
hide_table_of_contents: true
slug: Labels.html
description: "了解如何使用 svelte-konva 的 Label、Tag 和 Text 组件，在 Canvas 上创建标签和工具提示。"
---

在 Konva 中，创建标签需要多个步骤，因为 Label 实例必须包含 Tag 和 Text 实例才能正常工作。在 svelte-konva 中，可以将 Tag 和 Text 组件嵌套在 Label 组件中。这样无需手动连接各部分，也能自动创建正确的 Label。

将鼠标悬停在圆形上以显示工具提示：

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/labels?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
