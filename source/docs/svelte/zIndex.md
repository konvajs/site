title: How to change the zIndex of nodes with Svelte?
layout: svelte_page

---

## How to change the zIndex and reorder components in `svelte-konva`?

When working with other Konva-Wrappers like `vue-konva` or `react-konva` you might be used to the data order representing the drawing order of the components on the canvas. In svelte-konva such a functionality is currently not implemented as it is not possible to implement in Svelte 3 right now.

Instead you should use the Konva native functions to perform dynamic reordering of components on the canvas like `node.zIndex(5)`, `node.moveToTop()`, etc. [Tutorial](/docs/groups_and_layers/Layering.html).

### Using if-blocks
svelte-konva will follow the initial ordering of the components to draw the shapes on the canvas. This works fine in cases where you do not need to change the ordering dynamically during runtime. When using Svelte if-blocks to show/hide certain components you should know the following caveat. Consider the following example:
```
<Stage bind:config={stageConfig}>
    <Layer>
        <Rect bind:config={rectConfig} />
        {#if showRing}
            <Ring bind:config={ringConfig}/>
        {/if}
        <Circle bind:config={circleConfig} />
    </Layer>
</Stage>
```
Based on the ordering one would expect to see the circle drawn on the top of the canvas, followed by the ring and then the rect shapes. However, due to the if-block the ring might end up at the top of the canvas depending on the initial value and changes of `showRing`. This is caused by Svelte mounting/unmounting components inside if-blocks and svelte-konva drawing the shapes during mounting at the top of the canvas. If you want to avoid this behavior you should avoid Svelte if-blocks and use the `visible` config property to control whether a shape is visible or not. This way the component is not mounted/unmounted and maintains its initial drawing order on the canvas.

Instructions: Try to drag a circle. See how it goes to the top. This is done by calling `moveToTop()` on the dragged shape handle.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/zIndex?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
