title: How to apply canvas filters with Svelte and Konva?
layout: svelte_page

---

To apply filters you need to cache `Konva.Node` manually. You can do this initially in the `onMount()` method.

In case you dynamically change the style of the nodes you need to recache them manually for the changes to take effect on the canvas. This can be done by calling the `cache()` method on the affected nodes directly after a change (like in the demo) or in the `afterUpdate()` method to automatically recache the node on each state change in the component.

Instructions: hover over the rectangle to see the changes

<iframe 
  src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/filters?file=/src/App.svelte" 
  style={{
    width: "100%",
    height: "800px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
