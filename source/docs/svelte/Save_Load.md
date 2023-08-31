title: Saving and loading canvas with Svelte and Konva
layout: svelte_page

---

Native Konva has special mechanizm to save/load a full canvas stage with `node.toJSON()` and `node.create(json)` functions [(see demo)](/docs/data_and_serialization/Simple_Load.html).

This approach is not recommended when using svelte-konva. In svelte-konva you should instead save the state of your app which also resembles the full stage data required. So there is no need to save any Konva internals and nodes.

The demo saves and retrieves the data from localstorage as JSON but you're free to use any way of saving you'd like.

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/save_load?file=/src/App.svelte" style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
