title: How to change the zIndex of nodes with Vue?
layout: vue_page

---

## How to change the zIndex and reorder components in `vue-konva`?

When you are working with `Konva` directly you have many methods to change the order of nodes like `node.zIndex(5)`, `node.moveToTop()`, etc. [Tutorial](/docs/groups_and_layers/Layering.html).

But it is not recommended to use these methods when you are working with the `vue` framework.

`vue-konva` is trying to follow the order of the nodes exactly as you described them in your `<template>`. So instead of changing the `zIndex` manually, you just need to update the data of the app correctly, so the components inside your `<template>` maintain the correct order.

Don't use the `zIndex` for your canvas components.

Instructions: Try to drag a circle. See how it goes to the top. We are doing this by manipulating the data of the app so that the circles inside the `<template>` maintain the correct order.

<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/vue-demos/zIndex?hidenavigation=1&view=preview&fontsize=10&file=/src/App.vue" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
