title: How to resize and rotate canvas shapes with react and konva?
layout: react_page
---

Currently there is no good, pure declarative "react-way" to use the Transformer tool.
But you can still use it with some small manual requests to the Konva nodes.
And it will work just fine.

The Idea: you need to create a `Konva.Transformer` node, and attach it to the required node manually.

Instructions: Click on one of the shapes to select it.

<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/transformer?hidenavigation=1&view=split&fontsize=10" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
