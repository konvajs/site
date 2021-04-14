title: Render DOM elements inside a canvas stage
layout: react_page

---

## How to put DOM elements (like inputs or divs) inside of a Konva stage?

If you want to have some DOM nodes as part of your canvas tree you can use `<Html />` component from [react-konva-utils package](https://github.com/konvajs/react-konva-utils).

Remember that DOM nodes are not direct children of Konva containers. `<Html />` is just a special wrapper to work with a Portal-like API. Also components inside `<Html />` may not have access to upper context (so you have to bridge contexts manually).

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/dom_portal?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
