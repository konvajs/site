title: HTML5 Canvas Select Shape by id Tutorial
---

To select a shape by id with Konva, we can use the `find()` method using the # selector.
The `find()` method always returns an array of elements, even if we are expecting it to return one element.
if you need only one element you can use `findOne()` method.
The `find()` method works for any node, including the stage, layers, groups, and shapes.

Instructions: press the "Activate Rectangle" button to select the rectangle by id and perform a transition.  You can also drag and drop the rectangle.

{% iframe /cn.konvajs/downloads/code/selectors/Select_by_id.html %}

{% include_code Konva Select Shape by id Demo selectors/Select_by_id.html %}