title: Free Drawing Konva Demo
layout: demo_page
---

There are many ways to implement free drawing tools in Konva.

The simplest way (object oriented) is to:
1. Start a new `Konva.Line` on mousedown/touchstart
2. Add new point into the line while mousemove/touchmove

But that way has limitation if we want to use some low-level 2d canvas API.

So we will use another approach.
We will create special offscreen canvas where we will add all drawings.
With native access to the canvas we can use low-level 2d context functions.
To display the canvas on the stage we will use `Konva.Image`.

Instructions: Try on draw inside stroked area.

{% iframe /downloads/code/sandbox/Free_Drawing.html %}

{% include_code Konva Elastic Stars Demo sandbox/Free_Drawing.html %}
