title: How to resize and rotate canvas shapes with vue and konva?
layout: svelte_page

---

Currently there is no good pure declarative "vue-way" to use Transformer tool.
But you still can use it with some small manual requests to the Konva nodes.
And it will work just fine.

Idea: you need to create `Konva.Transformer` node, and attach it into required node manually.

Instructions: click on shape to select it.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/transformer?hidenavigation=1&view=split&fontsize=10&module=/App.svelte" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
