title: How to use portals in react-konva?
layout: react_page
---

## How react-konva control zIndex?

`react-konva` strictly follow the order of element in a way how you define them in your render. For more info take a look into [zIndex demo](/docs/react/zIndex.html).

## Is it possible to move a node into another container with `react-konva`?

Currently `react-konva` doesn't support `React.createPortal` API.

But we can use a simple trick and manual Konva methods to move any node into another container on whole stage.

Such portal can be useful when you want to temporary move a node into another container. The common use cases are:
1. Move dragging shape into another layer for better performance
2. Show an element on top of other elements, but still keep in deep down in components tree

**Instructions: try to drag a rectangle. You will see that it is visible on top, but in render it is still the first element.**

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/canvas_portal?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
