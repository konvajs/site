title: Saving and loading canvas with Svelte and Konva
layout: svelte_page

---

## How to serialize and deserialize Konva stage with Svelte?

Pure `Konva` has special mechanizm to save/load full canvas stage with `node.toJSON()` and `Node.create(json)` functions.
[See demo](/docs/data_and_serialization/Simple_Load.html).

But we don't recommend to use these methods if you are using `svelte-konva`. In `svelte-konva` you should have a state of the app defined in your vue components. That state maps into nodes with templates. To save/load full stage you just need to save/load state of the app and you **don't need to save Konva internals and nodes**.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/save-load?hidenavigation=1&view=split&fontsize=10&module=%2Fsrc%2FApp.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
