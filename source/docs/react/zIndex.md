title: How to change zIndex of nodes with React?
layout: react_page
---

## How to change zIndex and reorder components in `react-konva`?

When you are working with `Konva` directly you have many methods to change order of nodes line `node.zIndex(5)`, `node.moveToTop()`, etc. [Tutorial](/docs/groups_and_layers/Layering.html).

But it is not recommended to use that methods when you are working from the React framework.

`react-konva` is trying to follow the order of the nodes exactly how you described them in `render()`. So instead of changing zIndex manually, you just need to update state of the app correctly, so the `render()` returns correct order.

Don't use `zIndex` for your canvas components.

Instructions: try to drag a circle. See how it goes to the top. We are doing this by manipulating the state (so the `render()` returns correct order)


<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/zIndex?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



