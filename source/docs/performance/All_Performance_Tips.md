title: HTML5 Canvas All Konva performance tips list

---
 
## HTML5 Canvas All Konva performance tips list

Don't want to spend your time with performance issues? Request a [performance review](https://lavrton.com/consulting).


There is a full list of useful performance tips:

1. [Shape Caching](/docs/performance/Shape_Caching.html)
2. [Layer Management](/docs/performance/Layer_Management.html)
3. [`batchDraw` method](/docs/performance/Batch_Draw.html)
4. [Optimize Animation](/docs/performance/Optimize_Animation.html)
5. [Shape Redraw](/docs/performance/Shape_Redraw.html)
6. If your shape has only position transformation (`x` and `y`, no `scale`, `rotation`) set `transformsEnabled = 'position'`
7. If you don't need event on layer set `layer.hitGraphEnabled(false)`. Or use [Konva.FastLayer](/api/Konva.FastLayer.html). See [Demo](/docs/sandbox/Animation_Stress_Test.html)
8. For mobile application set viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">`
9. If you have bad performance on retina devices set `Konva.pixelRatio = 1`. Make sure that quality of result is ok for you.
10. While dragging a node you can move it on separate layer. Then move it back to original layer. See [Demo](/docs/sandbox/Drag_and_Drop_Stress_Test.html)
11. [Optimize Stroke Drawing](/docs/performance/Optimize_Strokes.html)
12. If a shape has fill, stroke and opacity you may set `shape.perfectDrawEnabled(false)`. See demo for more information [Disable Perfect Drawing](/docs/performance/Disable_Perfect_Draw.html).
13. Try to set `shape.listening(false)` where possible. For more info read [Listening false](/docs/performance/Listening_False.html).
14. [Avoid Memory Leaks](/docs/performance/Avoid_Memory_Leaks.html).
15. Don't create large stages. Try to make canvases as small, as possible. 8000px wide canvas is blah 🤢. [use this tip instead](/docs/sandbox/Canvas_Scrolling.html)
16. Do not create too many layers. Usually 3-5 is max.
17. Hide (or remove from layer) invisible objects (or objects that go out of the screen).

