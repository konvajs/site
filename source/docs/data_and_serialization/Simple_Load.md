title: Load Stage with JSON String
---

To deserialize a JSON string with Konva, we can use the `Konva.Node.create()`
method which creates a node from a JSON string.  If we want to deserialize
a stage node, we can also pass in an optional `container` parameter.

{% iframe /downloads/code/data_and_serialization/Simple_Load.html %}

{% include_code Konva Simple Load Demo data_and_serialization/Simple_Load.html %}
