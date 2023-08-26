title: How to cache canvas shapes with Svelte
layout: svelte_page

---

If you want to cache a node in a Svelte app, you need to have an access to Konva node and use `node.cache()` function.

To get access to a node you can use the `handle` prop. See [Konva Node](/docs/svelte/Konva_Node.html) for more information.

**Instruction: try to drag whole stage. Then try again with cached group.**

You should see much better performance.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/cache?hidenavigation=1&view=split&fontsize=10&module=/src/App.svelte" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
