title: How to implement free drawing on canvas with react?
layout: react_page
---

This demo shows how to implement a free drawing app the "react-way" with full vector representation.

Such an implementation should work ok for many whiteboard apps. It allows you to simply add [undo/redo functions](/docs/react/Undo-Redo.html) and save the full state to the backend.

It will get slower if you have too many lines in the state. So you will have to do some extra optimizations if you want to enable drawings of hundreds or thousands of lines.


<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/free-drawing?hidenavigation=1&view=split&fontsize=10" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
