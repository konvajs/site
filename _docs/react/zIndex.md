title: How to change the zIndex of nodes with React?
layout: react_page
---

## How to change the zIndex and reorder components in `react-konva`?

When you are working with `Konva` directly you have many methods to change the order of nodes like `node.zIndex(5)`, `node.moveToTop()`, etc. [Tutorial](/docs/groups_and_layers/Layering.html).

But it is not recommended to use these methods when you are working with the React framework.

`react-konva` is trying to follow the order of the nodes exactly as you described them in `render()`. So instead of changing the zIndex manually, you just need to update the state of the app correctly, so the `render()` returns the correct order.

Don't use the `zIndex` for your canvas components.

If you want to temporarily move a node into another container, for example when you want to show an overlay, take a look into the [Canvas Portal demo](/docs/react/Canvas_Portal.html).

Instructions: Try to drag a circle. See how it goes to the top. We are doing this by manipulating the state so that the `render()` method returns the correct order.


<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/zIndex?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



