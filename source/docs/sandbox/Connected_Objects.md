title: Connect objects HTML5 canvas with Konva
layout: demo_page
---

## How to connect two objects with a line or arrow?

`Konva` can't connect two objects with a line and update its position automatically. You have to update a line manually as you need it. Usually we need to update line position when a user drag one of the connected objects. In simple cases in can be that:


```javascript
const obj1 = new Konva.Circle({ ...obj1Props })
const obj2= new Konva.Circle({ ...obj2Props });

const line = new Konva.Line({ ...lineProps });

obj1.on('dragmove', updateLine);
obj2.on('dragmove', updateLine);

function updateLine() {
  line.points([obj1.x(), obj1.y(), obj2.x(), obj2.y]);
  layer.batchDraw();
}
```

But in that demo I will create a more complex case with the state of the app and many connected objects.

**Instructions: try to drag a circle**.

{% iframe /downloads/code/sandbox/Connected_Objects.html %}

{% include_code Konva 20000 Nodes Demo sandbox/Connected_Objects.html %}
