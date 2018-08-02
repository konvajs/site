title: How to resize and rotate canvas shapes with react and konva?
layout: react_page
---

Currently there is no good pure declarative "react-way" to use Transformer tool.
But you still can use it with some small manual requests to the Konva nodes.
And it will work just fine.

Idea: you need to create `Konva.Transformer` node, and attach it into required node manually.

Instructions: click on shape to select it.
Currently that demo doesn't hadle saving of new node's props into the state. It will be your homework.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/transformer?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



