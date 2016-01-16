title: Save Stage as JSON String
---

To save the stage as a JSON string with Konva, we can use the `toJSON()`
method which serializes the Konva Node tree into text which can be saved
in web storage or in an offline database. We can also serialize other nodes,
including layers, groups, and shapes.

{% iframe /downloads/code/data_&_serialization/Serialize_a_Stage.html %}

{% include_code Konva Save Stage Demo data_&_serialization/Serialize_a_Stage.html %}
