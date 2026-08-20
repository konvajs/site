---
title: 如何使用 Svelte 和 Konva 应用 Canvas 动画？
sidebar_label: 简单动画
hide_table_of_contents: true
slug: Simple_Animations.html
description: "了解如何使用 Konva 补间、node.to() 方法和 Konva.Animation，为 Svelte 中的 Canvas 图形应用动画。"
---

Konva 本身提供两种动画方法：[Tween](/docs/tweens/Linear_Easing.html) 和 [Animation](/docs/animations/Rotation.html)。可以手动将二者应用于节点。

对于简单场景，建议使用 `node.to()` 方法。

操作说明：尝试移动矩形。

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/simple_animations?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
