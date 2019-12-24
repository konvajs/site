title: Save HTML5 Canvas Stage as JSON String
---

## How to export canvas to JSON?

To save the stage as a JSON string with Konva, we can use the `toJSON()`
method which serializes the Konva Node tree into text which can be saved
in web storage or in an offline database. We can also serialize other nodes,
including layers, groups, and shapes.

**`toJSON()` method can't save filters, images and event listeners. So it works for very small apps. For more complex cases read [Best Practices](/docs/data_and_serialization/Best_Practices.html)**

{% iframe /downloads/code/data_and_serialization/Serialize_a_Stage.html %}

{% include_code Konva Save Stage Demo data_and_serialization/Serialize_a_Stage.html %}
