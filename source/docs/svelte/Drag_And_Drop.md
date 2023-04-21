title: Drag and drop canvas shapes with vue
layout: svelte_page

---

To enable drag&drop for any node on canvas you just need to pass `draggable: true` property into the component.

When you drag&drop shape it is recommended to save its position into you app store. You can use `dragmove` and `dragend` events for that purpose.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/drag_and_drop?hidenavigation=1&view=split&fontsize=10&module=/App.svelte" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
