title: How to use portals in react-konva?
layout: react_page
---

## How does react-konva control the zIndex?

`react-konva` strictly follows the order of elements in the way that you define them in your render. For more info take a look into the [zIndex demo](/docs/react/zIndex.html).

## Is it possible to move a node into another container with `react-konva`?

Currently `react-konva` doesn't support the `React.createPortal` API.

But we can use a simple trick and manual Konva methods to move any node into another container on the whole stage.

Such a portal can be useful when you want to temporarily move a node into another container. The common use cases are:
1. Move a dragging shape into another layer for better performance
2. Show an element on top of other elements, but still keep it deep down in the components tree

**Instructions: try to drag a rectangle. You will see that it is visible on top, but in render it is still the first element.**

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/canvas_portal?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
