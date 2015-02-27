title: All KonvaJS performance tips list
---

1. [`batchDraw` method](http://konvajs.github.io/docs/performance/Batch_Draw.html)
2. [Layer Management](http://konvajs.github.io/docs/performance/Layer_Management.html)
3. [Shape Caching](http://konvajs.github.io/docs/performance/Shape_Caching.html)
4. [Optimize Animation](http://konvajs.github.io/docs/performance/Optimize_Animation.html)
5. [Shape Redraw](http://konvajs.github.io/docs/performance/Shape_Redraw.html)
6. If your shape has only position transformation (`x` and `y`, no `scale`, `rotation`) set `transformsEnabled = 'position'`
7. If you don't need event on layer set `layer.hitGraphEnabled(false)`. Or use [Konva.FastLayer](http://konvajs.github.io/api/Konva.Group.html). See [Demo](http://konvajs.github.io/docs/sandbox/Animation_Stress_Test.html)
8. For mobile application set viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">`
9. If you have bad performance on retina devices set `Konva.pixelRatio = 1`. Make sure that quality of result is ok for you.
10. While dragging a node you can move it on separate layer. Then move it back to original layer.
11. Set `shape.strokeHitEnabled(false)`. In case where stroke is small and not useful for hit detection. For more info read [Shape API doc](http://konvajs.github.io/api/Konva.Shape.html).
12. If a shape has fill, stroke and opacity you may set `shape.perfectDrawEnabled(false)`. See demo for more information [Disable Perfect Drawing](http://konvajs.github.io/docs/performance/Disable_Perfect_Draw.html).
13. Try set `shape.listening(false)` where possible. For more info read [Listening false](http://konvajs.github.io/docs/performance/Listening_False.html).
14. [Avoid Memory Leaks](http://konvajs.github.io/docs/performance/Avoid_Memory_Leaks.html).


