title: Binding the config prop
layout: svelte_page

---

By default svelte-konva keeps the provided config prop object in sync with the internal state of Konva. This means that the supplied config object will be updated to the correct values (position, rotation, scale, ...) after `dragend` and `transformend` events. svelte-konva will only update the keys you provided in your config object and not add any additional keys which might have changed.

### Binding the config prop
By binding the config prop any reactive statements depending on your config object will be triggered once svelte-konva updates the config values. If not bound the values of the config object will still be updated by svelte-konva but not trigger any reactive blocks depending on it. Generally, you should bind the config prop if possible, not only to keep reactivity but to also make it more explicit that the passed config object can be changed by svelte-konva.

### Disabling automatic syncing
In most cases this default behavior is what you want as you usually want to keep your Svelte state consistent with the actual state of the canvas. In some cases this might not be beneficial though. In such cases you can opt out of this behavior by passing the `staticConfig` prop to the component:
```
<script>
  import { Stage, Layer, Rect } from 'svelte-konva';

  // x and y values will not be synced with actual position after dragend
  const config = { x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true };
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
    <Rect {config} staticConfig />
  </Layer>
</Stage>
```
Keep in mind that svelte-konva will evaluate the `staticConfig` prop only once during component mounting. Changing the `staticConfig` prop after the component has mounted will not have any effect.

Drag the different rings and observe the reactive changes triggered by Svelte. Note how dragging the red ring does not trigger a reactive change but still changes the actual value of the config due to not being bound.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/svelte-demos/bindings?hidenavigation=1&view=split&fontsize=10&module=/src/App.svelte" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
