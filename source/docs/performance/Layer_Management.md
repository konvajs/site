title: HTML5 Canvas Layer Management Performance Tip
---

When creating Konva applications, the most important thing to consider,
in regards to performance, is layer management.  One of the things that makes
Konva stand out from other canvas libraries is that it enables us to create
individual layers, each with their own canvas elements.  This means that we can
animate, transition, or update some stage elements, while not redrawing others.
If we inspect the DOM of a Konva stage, we'll see that there is actually one
canvas element per layer.

This tutorial has two layers, one layer that's animated, and another static layer
that contains text.  Since there's no reason to continually redraw the text, it's placed in its own layer.

**Note: Do not create too many layers. Usually 3-5 is max.**

{% iframe /cn.konvajs/downloads/code/performance/Layer_Management.html %}

{% include_code Konva Layer Management Demo performance/Layer_Management.html %}
