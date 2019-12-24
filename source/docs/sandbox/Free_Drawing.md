title: Free Drawing Konva Demo
layout: demo_page
---

There are many ways to implement free drawing tools in Konva.

I see two most common and simple ways:

1. Konva-based vector graphics (simple)
2. Manual drawing into 2d canvas (advanced)


## Free drawing with Konva nodes

So the first and probably the simplest ways is:

1. Start a new `Konva.Line` on `mousedown`/`touchstart`
2. Add new point into the line while `mousemove`/`touchmove`

That way works ok for many applications. Also it is simple to store the state of the drawing somewhere in vector representation (like React store or JSON saving into database).

{% iframe /downloads/code/sandbox/Free_Drawing_Vector.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Large sandbox/Free_Drawing_Vector.html %}
</p>
</details>


## Free drawing manually

The first approach has limitation if we want to use some low-level 2d canvas API directly. If you need advanced access to the canvas it is better to use [Native Context Access](/docs/sandbox/Native_Context_Access.html)

We will create special offscreen canvas where we will add all drawings.
With native access to the canvas we can use low-level 2d context functions.
To display the canvas on the stage we will use `Konva.Image`.

{% iframe /downloads/code/sandbox/Free_Drawing_Manual.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Large sandbox/Free_Drawing_Manual.html %}
</p>
</details>
