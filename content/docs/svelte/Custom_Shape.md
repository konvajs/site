---
title: How to draw a custom canvas shape with Svelte?
sidebar_label: Custom Shape
hide_table_of_contents: true
slug: Custom_Shape.html
description: "Learn how to draw custom canvas shapes in Svelte using the svelte-konva Shape component and canvas drawing functions."
---

To create a custom shape with `svelte-konva`, you should use the `Shape` component.

When creating a custom shape, you need to define a drawing function that is passed a `Konva.Canvas` renderer.

You can then use the renderer to access the HTML5 Canvas context, and to use special methods like `context.fillStrokeShape(shape)` which automatically handles filling, stroking, and applying shadows.

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/custom_shape?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
