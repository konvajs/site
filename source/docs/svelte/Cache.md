title: How to cache canvas shapes with Svelte
layout: svelte_page

---

If you want to cache a node in `vue` app, you need to have an access to Konva node and use `node.cache()` function.

To get an access to a node you can use references and `component.getNode()` method:

**Instruction: try to drag whole stage. Then try again with cached group.**

You should see much better performance.

```javascript
// in template:
<v-group ref="group">
// later in the code:
this.$refs.group.getNode().cache();
```

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/cache?hidenavigation=1&view=split&fontsize=10&module=/App.svelte" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
