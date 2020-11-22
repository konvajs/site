title: How to draw custom shapes with React?
layout: react_page
---

To create a custom shape with `react-konva`, we should use the `Shape` component.

When creating a custom shape, we need to define a drawing function that is passed to a Konva.Canvas renderer.

We can use the renderer to access the HTML5 Canvas context, and to use special methods like `context.fillStrokeShape(shape)` which automatically handle filling, stroking, and applying shadows.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/custom_shape?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



