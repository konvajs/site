title: Stage Data URL
---

To get the data URL of the stage with Konva, we can use the `toDataURL()`
method which requires a callback function for `Stage` (for other nodes callback is not required).
In addition, we can also pass in a mime type such as image/jpeg and a quality value that ranges between 0 and 1.
We can also get the data URLs of specific nodes, including layers, groups, and shapes.

*Note: The `toDataURL()` method requires that any images drawn onto the canvas
are hosted on a web server with the same domain as the code executing it.
If this condition is not met, a SECURITY_ERR exception is thrown.*

Instructions: Drag and drop the rectangle and then click on the save button to get the composite data url and open the resulting image in a new window

{% iframe /downloads/code/data_&_serialization/Stage_Data_URL.html %}

{% include_code Konva Stage Data URL Demo data_&_serialization/Stage_Data_URL.html %}
