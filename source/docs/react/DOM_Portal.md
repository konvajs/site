title: Render DOM elements inside canvas stage
layout: react_page
---

# How to draw DOM elements (like inputs or divs) inside Konva stage?

Currently `react-konva` doesn't support `React.createPortal` API. If you want to have some DOM nodes as part of your canvas tree you can create your own custom `Portal` component that will draw DOM nodes outside of `Konva.Stage`.

But you may still looks like a part of canvas if you place you DOM nodes on top of canvas element with absolute position.


<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/dom_portal?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
