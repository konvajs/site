title: How to apply transparency for several shapes at once?
layout: demo_page
---

## Is it possible to use opacity for several shapes in the same time?

You can use `opacity` attribute to change alpha channel of any `Konva` node. In the way the canvas works, all shapes have its own independent opacity values.

That mean if you have a group with several shapes inside and that group have `group.opacity(0.5)`. It will look exactly the same as if each shape inside the group has `shape.opacity(0.5)` and the group have `group.opacity(1)`. That means you will see overlapping areas of that shapes.

### What if we don't want to see overlapping areas of transparent shapes?

There is a way to fix such default behavior. You just need to cache the group with `group.cache()`. Caching the group will convert it into bitmap and draw into external canvas. On the next draw call, `Konva` will use that resulted canvas to draw whole group with opacity applied to whole image.

So while `Konva` is making a bitmap cache for such group it will draw internal shapes ignoring transparency of the group. 

**Remember that if a group is cached, it has some limitations of cached nodes. Like if you are doing any internal changes (like changing shapes attributes) you have to recache the group. And that is expensive operation, so it is not recommended to do it frequently like inside animations or on every mousemove.**

Instructions: on the left you see default behavior, on the right you see fixed behavior with cached group.

<!-- {% iframe /downloads/code/sandbox/Transparent_Group.html %} -->

<!-- {% include_code Konva transparent group sandbox/Transparent_Group.html %} -->
