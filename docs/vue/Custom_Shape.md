title: How to draw custom canvas shape with Vue?
layout: vue_page

---

To create a custom shape with `vue-konva`, we should use `v-shape` component.

When creating a custom shape, we need to define a drawing function that is passed a Konva.Canvas renderer.

We can use the renderer to access the HTML5 Canvas context, and to use special methods like `context.fillStrokeShape(shape)` which automatically handles filling, stroking, and applying shadows.

<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/vue-demos/custom_shape?hidenavigation=1&view=preview&fontsize=10&file=/src/App.vue" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
