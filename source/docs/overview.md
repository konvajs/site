title: 基础
---

## Konva 是什么?

`Konva` 是一个HTML5 Canvas JavaScript 框架，它通过对 2d context 的扩展实现了在桌面端和移动端的可交互性。Konva 提供了高性能的动画，补间，节点嵌套，布局，滤镜，缓存，事件绑定（桌面/移动端）等等功能。你可以使用 Konva 在舞台上绘制图形，给图形添加事件，移动、缩放和旋转图形并且支持高性能的动画即使包含数千个图形。

## 工作原理?

Konva 的对象是以一颗树的形式保存的，`Konva.Stage` 是树的根节点，`Stage` 子节点是用户创建的图层 （`Konva.Layer`）。

每一个 layer 有两个 `<canvas>` 渲染器： 场景渲染器 和 图像命中检测渲染器。场景渲染器输出你所看见的内容，图像命中渲染器在隐藏的 canvas 里用于高性能的检测事件。

图层可以包含图形、嵌套图形的组、嵌套组的组。`Stage`（舞台），`layers`（图层），`groups`（组），和 `shapes`（图形） 都是虚拟节点，类似于 HTML 的 DOM 节点。

节点结构图:

```
                   Stage
                     |
              +------+------+
              |             |
            Layer         Layer
              |             |
        +-----+-----+     Shape
        |           |
      Group       Group
        |           |
        +       +---+---+
        |       |       |
     Shape   Group    Shape
                |
                +
                |
              Shape
```

你可以对所有节点修改样式和变换。`Konva` 内建了很多图形，例如：rectangles, circles, images, sprites, text, lines, polygons, regular polygons, paths, stars等等，也可以通过实例化 Shape class 和自定义 draw function 创建自定义图形。

创建好了stage、layers 和 shapes 后，你就能进行绑定事件，变换节点，运行动画，添加滤镜等等操作了。


简单的例子:

```
// first we need to create a stage
var stage = new Konva.Stage({
  container: 'container',   // id of container <div>
  width: 500,
  height: 500
});

// then create layer
var layer = new Konva.Layer();

// create our shape
var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

// add the shape to the layer
layer.add(circle);

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();
```
Result:
![Minimal code demo](/cn.konvajs/assets/overview-circle.png)

## 基本图形

`Konva` 支持的图形: [Rect](/cn.konvajs/docs/shapes/Rect.html), [Circle](/cn.konvajs/docs/shapes/Circle.html), [Ellipse](/cn.konvajs/docs/shapes/Ellipse.html), [Line](/cn.konvajs/docs/shapes/Line_-_Simple_Line.html), [Polygon](/cn.konvajs/docs/shapes/Line_-_Polygon.html), [Spline](/cn.konvajs/docs/shapes/Line_-_Spline.html), [Blob](/cn.konvajs/docs/shapes/Line_-_Blob.html), [Image](/cn.konvajs/docs/shapes/Image.html), [Text](/cn.konvajs/docs/shapes/Text.html), [TextPath](/cn.konvajs/docs/shapes/TextPath.html), [Star](/cn.konvajs/docs/shapes/Star.html), [Label](/cn.konvajs/docs/shapes/Label.html), [SVG Path](/cn.konvajs/docs/shapes/Path.html), [RegularPolygon](/cn.konvajs/docs/shapes/RegularPolygon.html).
 自定义图形 [custom shape](/cn.konvajs/docs/shapes/Custom.html):

```
var triangle = new Konva.Shape({
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(20, 50);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();

        // special Konva.js method
        context.fillStrokeShape(this);
      },
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 4
});
```
![Custom shape](/cn.konvajs/assets/overview-custom.png)

## 样式

图形支持的样式属性:
* Fill. Solid color, gradients or images
* Stroke (color, width)
* Shadow (color, offset, opacity, blur)
* Opacity

```
var pentagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    shadowOffsetX : 20,
    shadowOffsetY : 25,
    shadowBlur : 40,
    opacity : 0.5
});
```
![Styles](/cn.konvajs/assets/overview-styles.png)

## 事件

你可以轻松的监听输入事件 （`click`, `dblclick`, `mouseover`, `tap`, `dbltap`, `touchstart` 等等），attributes 变化事件 (`scaleXChange`, `fillChange` 等等) 和 拖放事件（`dragstart`, `dragmove`）。

```
circle.on('mouseout touchend', function() {
    console.log('user input');
});

circle.on('xChange', function() {
    console.log('position change');
});

circle.on('dragend', function() {
    console.log('drag stopped');
});
```
See [working example](/cn.konvajs/docs/events/Binding_Events.html).

## 拖放

`Konva` 内置对 drag 的支持，但没有对 `drop` 事件支持 （`drop`, `dragenter`, `dragleave`, `dragover`），但是你可以轻松的实现它们 [via framework](/cn.konvajs/docs/drag_and_drop/Drop_Events.html)。

设置 draggable = true 启用拖放。

```
shape.draggable('true');
```

接下来你就可以订阅 drag&drop 事件和设置[移动限制](/cn.konvajs/docs/drag_and_drop/Complex_Drag_and_Drop.html)


## 滤镜

`Konva` 提供了多种滤镜：blur, invert, noise 等等。 详细请查看 [滤镜API](/cn.konvajs/api/Konva.Filters.html)

示例:
![Filter](/cn.konvajs/assets/overview-filter.png)

## 动画

你可以通过两种方式创建动画:

1. 通过 `Konva.Animation` [Demo](/cn.konvajs/docs/animations/Moving.html):
```
var anim = new Konva.Animation(function(frame) {
    var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;
    // update stuff
}, layer);
anim.start();
```

2. 通过 `Konva.Tween` [Demo](/cn.konvajs/docs/tweens/Linear_Easing.html):
```
var tween = new Konva.Tween({
        node: rect,
        duration: 1,
        x: 140,
        rotation: Math.PI * 2,
        opacity: 1,
        strokeWidth: 6
});
tween.play();

// or new shorter method:
circle.to({
    duration : 1,
    fill : 'green'
});
```

## 选择器

当你的开发大型应用时，选择器可以帮助你快速查找元素。你可以使用 `find()` 和 `findOne`（返回找到的第一个）方法。
```
var circle = new Konva.Circle({
        radius: 10,
        fill: 'red',
        id : 'face',
        name : 'red circle'
});
layer.add(circle);

// then try to search

// find by type
layer.find('Circle'); // all circles

// find by id
layer.findOne('#face');

// find by name (like css class)
layer.find('.red')
```

## 序列化&nbsp;&nbsp;反序列化

所有创建的对象都能保存为 JSON 格式。你可以将它保存在服务端或者 LocalStorage。
```
var json = stage.toJSON();
```
你也可以通过 JSON 创建对象:
```
var json = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"RegularPolygon"}]}]}';

var stage = Konva.Node.create(json, 'container');
```

## 性能

`Konva` 提供了一些提升性能的工具。

主要的方法有：

1. 缓存
`Caching` 允许你在 buffer canvas 里绘制元素，然后再通过 buffer canvas 绘制到场景，它能提升绘制复杂节点例如：文本、包含阴影或者描边的图形。

```
shape.cache();
```
[Demo](/cn.konvajs/docs/performance/Shape_Caching.html)

2. 图层
框架支持创建任意数量的 `<canvas>` 。如果你的应用包含复杂的背景和许多可以移动的图形，你可以使用一个图层显示背景另外要给图层显示图形，从而只更新图形而不更新背景。[Demo](/cn.konvajs/docs/performance/Layer_Management.html)

查看所有提升性能的技巧 [https://konvajs.org/docs/performance/All_Performance_Tips.html](/cn.konvajs/docs/performance/All_Performance_Tips.html)
