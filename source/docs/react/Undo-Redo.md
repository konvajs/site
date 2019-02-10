title: How to implement undo/react on canvas with React?
layout: react_page
---

To implement undo/redo functionality with `React` you don't need to use `Konva`'s serialization and deserealizations methods.

You just need to save history of all state changes of your app. There are many ways to do it. It may be simpler do to that if you use immutable structures.

Instructions: try to move square. Then undo/redo your actions.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/undo_redo?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



