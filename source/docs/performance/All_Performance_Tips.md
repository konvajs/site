title: HTML5 Canvas All Konva performance tips list

---
 
## HTML5 Canvas All Konva performance tips list

Stop worrying about the performance at all and let me help you boost your project.
Just drop me a message to <mailto:anton@lavrton.com> (only for large projects).

Here is list of useful performance tips:

1. [`batchDraw` method](https://konvajs.github.io/docs/performance/Batch_Draw.html)
2. [Layer Management](https://konvajs.github.io/docs/performance/Layer_Management.html)
3. [Shape Caching](https://konvajs.github.io/docs/performance/Shape_Caching.html)
4. [Optimize Animation](https://konvajs.github.io/docs/performance/Optimize_Animation.html)
5. [Shape Redraw](https://konvajs.github.io/docs/performance/Shape_Redraw.html)
6. If your shape has only position transformation (`x` and `y`, no `scale`, `rotation`) set `transformsEnabled = 'position'`
7. If you don't need event on layer set `layer.hitGraphEnabled(false)`. Or use [Konva.FastLayer](https://konvajs.github.io/api/Konva.FastLayer.html). See [Demo](https://konvajs.github.io/docs/sandbox/Animation_Stress_Test.html)
8. For mobile application set viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">`
9. If you have bad performance on retina devices set `Konva.pixelRatio = 1`. Make sure that quality of result is ok for you.
10. While dragging a node you can move it on separate layer. Then move it back to original layer. See [Demo](https://konvajs.github.io/docs/sandbox/Drag_and_Drop_Stress_Test.html)
11. [Optimize Stroke Drawing](https://konvajs.github.io/docs/performance/Optimize_Strokes.html)
12. If a shape has fill, stroke and opacity you may set `shape.perfectDrawEnabled(false)`. See demo for more information [Disable Perfect Drawing](https://konvajs.github.io/docs/performance/Disable_Perfect_Draw.html).
13. Try to set `shape.listening(false)` where possible. For more info read [Listening false](https://konvajs.github.io/docs/performance/Listening_False.html).
14. [Avoid Memory Leaks](https://konvajs.github.io/docs/performance/Avoid_Memory_Leaks.html).
15. Don't create large stages. Try to make canvases as small, as possible. 8000px wide canvas is blah 🤢. [use this tip instead](https://konvajs.github.io/docs/sandbox/Canvas_Scrolling.html)
16. Hide (or remove from layer) invisible objects (or objects that go out of the screen).
