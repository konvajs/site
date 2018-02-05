title: What is the difference between position and offset in Konva
---

There are several properties in Konva that looks similar and may lead some confusion but have a different effect and purpose. 

In the post I will explain the difference between position (x and y coordinates) and offset (offsetX and offsetY).

So x and y properties define position of Node on canvas. If you set `draggable = true` property and start dragging, Konva will change x and y properties of the node. That logic will be applied for all nodes (even Konva.Line).

{% iframe /downloads/code/posts/Position_vs_Offset_Basic_x_y.html %}


Why do we need an `offset` property? When you are changing the offset property it may looks like you are changing position of the node. But actually not. You are changing ORIGIN of the shape. 

What is it origin? You may think of it as “point from where we start drawing of a shape” or “center of the shape” or “the point around which we rotating a shape”.

Just a small note, long time ago offset property was called “center” in Konva codebase. But later it was refactored to “offset". 

Take a look into this animation tutorial. All rectangles here have the same `y` position, but a different `offset` property.

{% iframe /downloads/code/animations/Rotation.html %}

And you should understand that Konva has two main methods to define origin of the shape.
So “circle-like” shapes have origin at actual center of the shape (Circle, Ellipse, Wedge, Star, Ring ,etc).
When you set {x, y} of a circle you are defying “where will be the center of the circle”.

And “rectangle-like” shapes has origin at TOP LEFT (Rectangle, Sprite, Text, Image, etc)
When you set {x, y} of a rectangle you are defying “where will be the top-left point of the rect”.

So a shape will be rotated around its origin point (around its “center”). So if you set rotation 45 deg of a star it will be rotated around its actual center.

But if you set rotation 45 deg of rectangle, it will be rotated around top-left. But in some cases it is not convenient. Sometimes you may want to rotate the shape around its center.

In this case you can set `offset` property. By using it we will tell konva: “Hey, use this point as the new origin of the shape”.


Still have a question? Ask in comments.