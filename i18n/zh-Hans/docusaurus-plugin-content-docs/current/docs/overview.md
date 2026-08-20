---
sidebar_position: 2
title: Konva 框架概览
sidebar_label: 概览
slug: overview.html
description: "了解 Konva.js 的 Stage、Layer、Group 和 Shape 架构，以及元素组织、事件处理、图形样式和拖放功能。"
---

## Konva 是什么？

Konva 是一个 HTML5 Canvas JavaScript 框架。它扩展了 2D 上下文，并为桌面应用和移动应用提供 Canvas 交互功能。

Konva 支持高性能动画、过渡、节点嵌套、图层、滤镜、缓存和事件处理。

## Konva 如何工作？

所有内容都从 `Konva.Stage` 开始。一个舞台包含一个或多个 `Konva.Layer`。

每个图层有两个 `<canvas>` 渲染器：场景渲染器和命中图渲染器。场景渲染器绘制可见内容。

命中图渲染器使用一个隐藏的 Canvas 来高效检测事件。

每个图层可以包含图形、图形组或嵌套组。舞台、图层、组和图形都是虚拟节点，类似 HTML 页面中的 DOM 节点。

下面是一个节点层级示例：

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

所有节点都可以设置样式和变换。`Konva` 提供矩形、圆形、图像、精灵、文本、线条、多边形、正多边形、路径和星形等预置图形。

你也可以实例化 Shape 类，并提供绘制函数来创建自定义图形。

创建舞台、图层和图形后，你可以绑定事件、变换节点、播放动画和应用滤镜。

下面是一个最小代码示例：

```js
// first we need to create a stage
var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: 500,
  height: 500,
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
  strokeWidth: 4,
});

// add the shape to the layer
layer.add(circle);

// add the layer to the stage
stage.add(layer);
```

结果：

![最小代码示例](/assets/overview-circle.png)

## 基本图形

Konva.js 支持以下图形：[Rect](/docs/shapes/Rect.html)、[Circle](/docs/shapes/Circle.html)、[Ellipse](/docs/shapes/Ellipse.html)、[Line](/docs/shapes/Line_-_Simple_Line.html)、[Polygon](/docs/shapes/Line_-_Polygon.html)、[Spline](/docs/shapes/Line_-_Spline.html)、[Blob](/docs/shapes/Line_-_Blob.html)、[Image](/docs/shapes/Image.html)、[Text](/docs/shapes/Text.html)、[TextPath](/docs/shapes/TextPath.html)、[Star](/docs/shapes/Star.html)、[Label](/docs/shapes/Label.html)、[SVG Path](/docs/shapes/Path.html) 和 [RegularPolygon](/docs/shapes/RegularPolygon.html)。

你也可以创建[自定义图形](/docs/shapes/Custom.html)：

```js
var triangle = new Konva.Shape({
  sceneFunc: function (context) {
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
  strokeWidth: 4,
});
```

![自定义图形](/assets/overview-custom.png)

## 样式

每个图形都支持以下样式属性：

- 填充：纯色、渐变或图像
- 描边：颜色和宽度
- 阴影：颜色、偏移、不透明度和模糊程度
- 不透明度

```js
var pentagon = new Konva.RegularPolygon({
  x: stage.width() / 2,
  y: stage.height() / 2,
  sides: 5,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  shadowOffsetX: 20,
  shadowOffsetY: 25,
  shadowBlur: 40,
  opacity: 0.5,
});
```

![样式](/assets/overview-styles.png)

## 事件

`Konva` 可以监听用户输入事件，例如 `click`、`dblclick`、`mouseover`、`tap`、`dbltap` 和 `touchstart`。

它也可以监听属性变化事件和拖放事件。属性变化事件包括 `scaleXChange` 和 `fillChange`。拖放事件包括 `dragstart`、`dragmove` 和 `dragend`。

```js
circle.on('mouseout touchend', function () {
  console.log('user input');
});

circle.on('xChange', function () {
  console.log('position change');
});

circle.on('dragend', function () {
  console.log('drag stopped');
});
```

请查看[可运行示例](/docs/events/Binding_Events.html)。

## 拖放

`Konva` 内置拖动支持。Konva 当前没有 `drop`、`dragenter`、`dragleave` 和 `dragover` 事件。

你可以[使用 Konva 事件实现这些事件](/docs/drag_and_drop/Drop_Events.html)。

将 draggable 属性设置为 true，使图形可以拖动。

```
shape.draggable('true');
```

然后，你可以监听拖放事件，并设置[移动范围](/docs/drag_and_drop/Complex_Drag_and_Drop.html)。

## 滤镜

`Konva` 提供模糊、反色和噪点等滤镜。请在 [Filters API](/api/Konva.Filters.html) 中查看所有滤镜。

示例：

![滤镜](/assets/overview-filter.png)

## 动画

你可以用两种方式创建动画：

1. 使用 `Konva.Animation`。请查看[示例](/docs/animations/Moving.html)：

```js
var anim = new Konva.Animation(function (frame) {
  var time = frame.time,
    timeDiff = frame.timeDiff,
    frameRate = frame.frameRate;
  // update stuff
}, layer);
anim.start();
```

2. 使用 `Konva.Tween`。请查看[示例](/docs/tweens/Linear_Easing.html)：

```js
var tween = new Konva.Tween({
  node: rect,
  duration: 1,
  x: 140,
  rotation: Math.PI * 2,
  opacity: 1,
  strokeWidth: 6,
});
tween.play();

// or new shorter method:
circle.to({
  duration: 1,
  fill: 'green',
});
```

## 选择器

大型应用经常需要查找元素。`Konva` 支持使用选择器查找元素。

使用 `find()` 方法返回集合。使用 `findOne()` 方法返回集合中的第一个元素。

```js
var circle = new Konva.Circle({
  radius: 10,
  fill: 'red',
  id: 'face',
  name: 'red circle',
});
layer.add(circle);

// then try to search

// find by type
layer.find('Circle'); // returns array of all circles

// find by id
layer.findOne('#face');

// find by name (like css class)
layer.find('.red');
```

## 序列化和反序列化

你可以将创建的对象保存为 JSON。你可以将 JSON 保存到服务器或本地存储。

```js
var json = stage.toJSON();
```

你也可以从 JSON 恢复对象：

```js
var json =
  '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"RegularPolygon"}]}]}';

var stage = Konva.Node.create(json, 'container');
```

## 性能

`Konva` 提供多种提高应用速度的工具。下面是最重要的两种方法：

1. 缓存可以将元素绘制到缓冲 Canvas。之后，Konva 从该 Canvas 绘制元素。缓存可以明显提高复杂文本、阴影和描边图形的性能。

```js
shape.cache();
```

[查看示例](/docs/performance/Shape_Caching.html)

2. 使用多个图层。Konva 支持多个 `<canvas>` 元素，因此你可以按更新频率组织对象。

例如，应用可以包含复杂背景和多个移动图形。将背景放在一个图层中，并将移动图形放在另一个图层中。

更新图形时，不需要更新背景 Canvas。请查看[示例](/docs/performance/Layer_Management.html)。

请在以下页面中查看所有性能建议：
[https://konvajs.org/docs/performance/All_Performance_Tips.html](/docs/performance/All_Performance_Tips.html)

## 延伸阅读

- [为什么使用 Konva？— 何时为项目选择 Konva](/docs/guides/why-konva.html)
- [最佳 JavaScript Canvas 库 — 对比指南](/docs/guides/best-canvas-library.html)
- [Canvas 库对比](/docs/guides/best-canvas-library.html)
- [常见问题](/docs/faq.html)
- [关于 Konva — 主要信息和使用情况](/docs/about.html)
