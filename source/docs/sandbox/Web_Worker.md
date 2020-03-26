title: Offscreen canvas inside Web Worker
layout: demo_page
---

## How to run Konva in a Web Worker?

**Warning! This demo is VERY EXPERIMENTAL! It may not work in many browsers.** Check [Offscreen canvas capability tabletv](https://caniuse.com/#feat=offscreencanvas).

With some extra work we can render `Konva` stage inside a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) using [Offscreen Canvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) for performance reasons or for some crazy ideas.

You can use a webworker to make some visualizations with `Konva`.

But one of the main features of `Konva` is its interactivity (full events support for canvas shapes). And there are no DOM events inside a web worker. So we have to write some kind of "proxy" to pass all DOM events inside Konva engine. That way we can have interactive objects inside web worker too.

This demo is adopted from [Jumping bunnies](/docs/sandbox/Jumping_Bunnies.htm) performance stress test.

You may need to write more code to cover more functions and different edge cases (such as HDPI screen support).

**Instructions: there are two interactive objects on the stage. "Add buttons" and a draggable red circle. Try to add more bunnies or drag the circle.**

All you see on that screen is **rendered inside another javascript thread**!. So it should not block main JS thread of the current page.


{% iframe /downloads/code/sandbox/Web_Worker.html %}

{% include_code sandbox/Web_Worker.html %}

And the code of the worker:

{% include_code Worker Code sandbox/Web_Worker.js %}
