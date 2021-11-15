title: HTML5 Canvas Shape Resize Snapping

---

In some application, you may want to snap rotation near some values. Snapping makes a shape "sticky" near provided values and works like rounding.
You can control anchor position behavior with [anchorDragBoundFunc](https://konvajs.org/api/Konva.Transformer.html#anchorDragBoundFunc__anchor) method.

```js
transformer.anchorDragBoundFunc(function (oldAbsPos, newAbsPos, event) {
  // limit any another position on the x axis
  return {
    x: 0,
    y: newAbsolutePosition.y,
  };
});
```

{% iframe /downloads/code/select_and_transform/Resize_Snaps.html %}

{% include_code Konva Shape transform and selection Demo select_and_transform/Resize_Snaps.html %}
