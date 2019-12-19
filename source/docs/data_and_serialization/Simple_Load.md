title: Load Stage with JSON String
---

To deserialize a JSON string with Konva, we can use the `Konva.Node.create()`
method which creates a node from a JSON string.  If we want to deserialize
a stage node, we can also pass in an optional `container` parameter.


**That methods works for very small apps. For more complex cases take a look into [Complex Load](/docs/data_and_serialization/Complex_Load.html) or even better to [Best Practices](/docs/data_and_serialization/Best_Practices.html)**

{% iframe /cn.konvajs/downloads/code/data_and_serialization/Simple_Load.html %}

{% include_code Konva Simple Load Demo data_and_serialization/Simple_Load.html %}
