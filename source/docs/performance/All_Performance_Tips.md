title: HTML5 Canvas All Konva performance tips list

---
 
## HTML5 Canvas All Konva performance tips list

Don't want to spend your time with performance issues? Request a [performance review](https://lavrton.com/consulting).

### Why this is important

The HTML5 canvas is efficient at what it does and internally `Konva` has many features that aim to provide great performance. However, when your project starts to grow in complexity, or when you just have a lot of shapes on the stage, there must inevitably be some negative performance impact.

### Optimization targets

The optimizations here focus on two general rules:

* Compute as little as possible: all computation takes time to complete. Each individual computation may run in a tiny fraction of a second, but the thousands or millions of computations caused by your code, Konva, JavaScript, and the layers below that, will add up to something more observable by the human eye if that super-slick animation or effect  is, in fact, jerky. 

* **Draw as little as possible**: this is important because all drawing has a performance cost. There are two categories of cost - firstly the computation of the drawing which we covered in the point above, and then the movement of the drawing from memory to the screen. Depending on the case, there may also be intermediate off-screen compositing or per-pixel processing. The rule is therefore do as little drawing as possible. 


### The Stage

1. Optimise stage size - following the rule of 'draw as little as possible', try to avoid creating a large stage because moving all those bytes from memory to screen is going to have a negative impact. There are some tips [here](/docs/sandbox/Canvas_Scrolling.html) that offer alternative approaches to the mega-stage problem!

2. Set a viewport on mobile - Scaling images is a significant performance hit, so for mobile applications set viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">` which will avoid unnecessary scaling of your Konva output.

3. Use `Konva.pixelRatio = 1` on retina devices - Konva automatically handles pixel ratio adjustments in order to render crisp drawings
on all devices. But, just in case you have bad performance on retina devices, set `Konva.pixelRatio = 1` to reduce the scaling work Konva has to do. This setting might affect the output in some cases, so make sure that quality of the result is ok for you.

### Layers

1. [Layer Management](/docs/performance/Layer_Management.html) - under the hood, each Konva layer is a separate HTML5 canvas element which gives some useful capabilities, including the ability to refresh only a layer that changed and so avoid the performance cost of refreshing the entire stage. But with great power great responsibility comes, and each layer has an incremental performance overhead so we should keep the number of layers to a minimum.  

2. Use `layer.listening(false)` - Konva gives us mouse and touch event listeners on all the shapes we draw. But there is a performance cost for each one, and for a layer with with many shapes Konva has to expend many cycles checking which listeners might be triggered. If you have a layer on which none of the shapes need to react to events, take this burden away by setting `layer.listening(false)`. See [Demo](/docs/sandbox/Animation_Stress_Test.html). There is a similar point in the shapes section.

4. Optimise dragging costs - while you drag a shape across a layer that layer must be redrawn per cycle of the move event listener. To avoid this performance cost, move the shape to a dedicated layer while dragging, then move it back to original layer at drag end. See [Demo](/docs/sandbox/Drag_and_Drop_Stress_Test.html)

### Shapes

1. [Shape Caching](/docs/performance/Shape_Caching.html) - internally Konva makes an image of your shape and uses that when the shape has to be drawn. Drawing images avoids the overhead of composing the shape from its drawing instructions, and can increase performance impressively for complex shapes and groups. 

2. Keep the shapes tidy - each shape in your stage has a cost just to exist. To optimise performance, hide or remove from the layer any objects that become invisible / opacity = 0, or objects that go out of view.

4. Use `shape.listening(false)` - as with layers (see point 7 above), Konva looks out for when events should be triggered for shapes, which has a performance cost. Telling a shape to stop listening for events reduces this cost, as explained at [Listening false](/docs/performance/Listening_False.html).

5. Switch off perfect drawing - In some cases the result of drawing with the HTML5 canvas is not what you might have expected - see the demo for an example [Disable Perfect Drawing](/docs/performance/Disable_Perfect_Draw.html). Konva does extra work via its perfect drawing feature to put that right, but this comes with a performance cost. By setting `shape.perfectDrawEnabled(false)` this cost can be avoided, with no reduction in output quality, when a shape has fill, stroke and opacity.

6. [Optimize Stroke Drawing](/docs/performance/Optimize_Strokes.html) - To achieve drawing results that look as expected, Konva makes an extra internal drawing when a shape has both stroke and shadow. Avoid this performance burden by switching off the shadow that Konva adds for the stroke.

### Animations

1. [Optimize Animation](/docs/performance/Optimize_Animation.html) - Avoiding unnecessary redraw costs for animation steps that fall between visual changes. 

### Memory

1. [Avoid Memory Leaks](/docs/performance/Avoid_Memory_Leaks.html) - Konva looks after a lot of cases where you might make memory leaks, but bringing shapes and tweens into the world and managing their exit is an area where you can help.

  
