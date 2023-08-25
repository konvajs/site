title: Using labels with Svelte
layout: svelte_page

---

Creating a label is a multi-step process in Konva, as a Label instance needs to contain a Tag and Text instance to function. In svelte-konva the Tag and Text components can be easily nested inside the Label component to automatically create a correct Label without having to wire things up manually.

Hover over the circles to show the tooltips,

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/labels?hidenavigation=1&view=split&fontsize=10&module=/src/App.svelte" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
