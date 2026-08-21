---
title: 如何使用 Svelte 绘制自定义 Canvas 图形？
sidebar_label: 自定义图形
hide_table_of_contents: true
slug: Custom_Shape.html
description: "了解如何使用 Svelte、svelte-konva Shape 组件和 Canvas 绘制函数来绘制自定义 Canvas 图形。"
---

要使用 `svelte-konva` 创建自定义图形，请使用 `Shape` 组件。

创建自定义图形时，需要定义一个绘制函数，并向该函数传入 `Konva.Canvas` 渲染器。

然后，可以使用该渲染器访问 HTML5 Canvas 上下文。还可以使用 `context.fillStrokeShape(shape)` 等特殊方法，自动处理填充、描边和阴影。

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/custom_shape?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
