title: Render DOM elements inside a canvas stage
layout: react_page
---

## How to draw Konva elements outside your component tree?

Currently `react-konva` doesn't support the `React.createPortal` API. 

FYI: Here is a community project [react-konva-portal](https://github.com/papahigh/react-konva-portal) which can move your `react-konva` components across groups, layers and canvas elements regardless of the component hierarchy. 


## How to draw DOM elements (like inputs or divs) inside of a Konva stage?

If you want to have some DOM nodes as part of your canvas tree you can create your own custom `Portal` component that will draw DOM nodes outside of a `Konva.Stage`.

DOM nodes may still look like a part of the canvas if you place them on top of the canvas element with an absolute position.

Be careful here. In the current demo components in the portal have access to React contexts. If you need to use them, you have to pass them directly.


<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/dom_portal?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
