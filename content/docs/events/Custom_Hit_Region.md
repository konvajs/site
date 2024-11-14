title: HTML5 Canvas Custom Hit Detection Function Tutorial
---

There are two ways to change hit region of the shape: `hitFunc` and `hitStrokeWidth` properties.

## 1. What is `hitFunc`?

To create a custom hit draw function for a shape with Konva, we can set
the `hitFunc` property.  A hit draw function is the function that Konva
will use to draw a region used for hit detection.  Using a custom draw hit
function can have several benefits, such as making the hit region larger
so that it's easier for users to interact with a shape, making some portions
of a shape detectable and others not, or simplifying the hit draw function
in order to improve rendering performance.

Also take a look into some [best practices](/docs/shapes/Custom.html) of writing custom `sceneFunc` that can be used for `hitFunc` too.

`hitFunc` is a function with two arguments: [Konva.Context](/api/Konva.Context.html) renderer and a shape instance.

With `hitFunc` you have full control over drawing.

## 2. What is `hitStrokeWidth`?

For some shapes, like `Konva.Line` it is too hard to overwrite `hitFunc`. In some cases you just want to make it thicker for events. In this case it is better to use `hitStrokeWidth` property with a large value.


Instructions: Mouseover, mouseout, mousedown, and mouseup over the star and
observe that the hit region is an over sized circle encompassing the shape. Also try the same for a a line.
Also you can toggle hit canvas too see how it looks. It may be useful for debugging.



<!-- {% iframe /downloads/code/events/Custom_Hit_Region.html %} -->

<!-- {% include_code Konva Custom_Hit_Region Demo events/Custom_Hit_Region.html %} -->
