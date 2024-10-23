title: Drag and drop canvas shapes
layout: react_page
---

To enable drag&drop for any node on the canvas you just need to pass the `draggable` property into the component.

When you drag&drop a shape it is recommended to save its position into your app store. You can use the `onDragMove` and `onDragEnd` events for that purpose.


<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/drag_and_drop?hidenavigation=1&view=split&fontsize=10" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
