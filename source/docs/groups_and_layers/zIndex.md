title: How to set correct order of nodes using zIndex?
---


## What is zIndex of a node?

You can get/set zIndex of a node in this way:

```javascript
// get
const zIndex = shape.zIndex();

// set
shape.zIndex(1);
```

zIndex is just index of a node in its parent children array. Please don't confuse `zIndex` in Konva with `z-index` in CSS.

```javascript
const group = new Konva.Group();

const circle = new Konva.Circle({});

group.add(circle);

// it will log 0.
console.log(circle.zIndex());  

// the next line will not work. Because the group have only one child
circle.zIndex(1);  

// still logs 0
console.log(circle.zIndex());  

// for any node that equations will be true:
console.log(circle.zIndex() === circle.getParent().children.indexOf(circle))
```


You can't use `zIndex` to set absolute position of the node, like we do this in CSS.
Konva is drawing nodes in the strict order as they defined in nodes tree.

Let make a demo. I will create a layer with two groups. The first group has two shapes (black rect and red circle). The second group has one shape (green rect).

{% iframe /downloads/code/groups_and_layers/zIndex.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Large sandbox/Canvas_Scrolling_Large.html %}
</p>
</details>

What is `zIndex` of red circle. It is `1` (second element in array of children of the first group).
What is `zIndex` of green rect? It is `0`.

Why we see green rect above red circle? As mentioned above Konva is drawing in strict order of the tree.
So at first it will draw all children of the first group. Then above that picture it will draw all children of the second group (and so on if we have more elements in the layer).

How to draw red circle above green rect? You can move it into the second group. Or you can move it into the layer and make sure it has larger zIndex than previous groups.


