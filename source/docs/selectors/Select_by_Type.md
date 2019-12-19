title: HTML5 Canvas Select Shape by Type Tutorial
---

To select shapes by type with Konva, we can use the `find()` method with the name of the type or class name.
The `find()` method returns an array of nodes that match the selector string.
The return array is a `Konva.Collection` array, which is basically a typical JavaScript array with a special `each()` method.
The `each()` method enables us to quickly iterate through every node in the array.

{% iframe /cn.konvajs/downloads/code/selectors/Select_by_Type.html %}

{% include_code Konva Select Shape by Type Demo selectors/Select_by_Type.html %}