title: How to preview large stage on canvas with Konva?
layout: demo_page
---

## Need to generate a small preview of the canvas?

There are many ways to generate small preview. `Konva` doesn't provide any methods to do this automatically.
But we can use `Konva` methods to generate preview area manually.

We will show two options - cloning and using images. In large applications it is better to generate preview from the state of the app.

### Clone nodes from the main stage.

So we can just clone the stage or the layer and update its internal nodes from the state of the main canvas area.

Also it will make sense to simplify shapes on the preview. Like hide texts, remove strokes and shadows, etc.

**Instructions: try to drag a circle. See how the preview is updating. Double click to add a new shape.**

<!-- {% iframe /downloads/code/sandbox/Stage_Preview_Clone.html %} -->

<!-- {% include_code sandbox/Stage_Preview_Clone.html %} -->


### Use image preview

Or we can export the stage to an image and use it as a preview.

For performance reasons we are not updating the preview on every `dragmove` events.

<!-- {% iframe /downloads/code/sandbox/Stage_Preview_Image.html %} -->

<!-- {% include_code sandbox/Stage_Preview_Image.html %} -->