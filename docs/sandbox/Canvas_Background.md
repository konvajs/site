title: How to add background to canvas?
layout: demo_page
---

## How add background to Konva stage?

There are two ways to add a background.

### 1. Adding background with `Konva.Rect` shape.

The Konva-way to add a background to your canvas is just by drawing `Konva.Rect` shape with the size of a stage on the bottom of your scene. You can style that rectangle as you want with [solid color, gradient or pattern image](/docs/styling/Fill.html).

*The only thing that you should be careful about here is the rectangle's position and size. If you are transforming any parent of background shape (such as stage or layer) by moving it, or applying scale you should "reset" background shape position/size to fill whole Stage area.*

### 2. Adding background with CSS

The other solution to add background to your canvas is just use CSS styles to stage container DOM element. That solution is simpler than the first approach, because you don't need to track position, size changes. It also has **a bit** better performance, because you don't need to draw any additional shapes.

**But it has one drawback. The CSS background will be not visible on export when you use methods like `stage.toImage()` and `stage.toDataURL()`.**

Instructions: On the demo I will show two approaches. The green solid background is made with CSS. Yellow-orange gradient will be done with `Konva.Rect` instance. Try to drag a stage. You will see that gradient stay on place.

<!-- {% iframe /downloads/code/sandbox/Canvas_Background.html %} -->

<!-- {% include_code Konva background demo sandbox/Canvas_Background.html %} -->
