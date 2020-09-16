title: How to implement free drawing canvas with react?
layout: react_page
---

The demo shows how to implement free drawing app is "react-way" with full vector representation.

Such implementation should work ok for many whiteboard apps. It will allows you to simply add [undo/redo functions](/docs/react/Undo-Redo.html) and save full state into backend.

But it will start work slowly if you have too many lines in the state. So you will have to do some extra optimizations if you want to enable drawings of hundreds or thousands of lines.


<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/free-drawing?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
