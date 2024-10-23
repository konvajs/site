title: How to apply canvas filters with vue and konva?
layout: vue_page

---

To apply filters you need to cache `Konva.Node` manually. You can do it `created()` method.
Probably you will need to recache nodes every time you update their styles in `updated()`.

Instructions: click on the rectangle to see changes

<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/vue-demos/filters?hidenavigation=1&view=preview&fontsize=10&file=/src/App.vue" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
