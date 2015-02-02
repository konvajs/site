title: Shape Groups
---

To group multiple shapes together with Konva, we can instantiate
a `Konva.Group()` object and then add shapes to it with the `add()` method.
Grouping shapes together is really handy when we want to transform multiple
shapes together, e.g. if we want to move, rotate, or scale multiple shapes
at once.  Groups can also be added to other groups to create more complex
Node trees.  For a full list of attributes and methods, check out the [Konva.Group documentation](http://konva.github.io/api/Konva.Group.html).

{% iframe /downloads/code/groups_and_layers/Groups.html %}

{% include_code Konva Groups Demo groups_and_layers/Groups.html %}