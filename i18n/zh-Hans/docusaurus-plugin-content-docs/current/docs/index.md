---
sidebar_position: 1
title: Konva 入门 — HTML5 Canvas 2D 框架
sidebar_label: 简介
hide_table_of_contents: true
slug: index.html
description: "开始使用 Konva.js 2D HTML5 Canvas JavaScript 框架。学习绘制图形、处理事件、拖放和动画，以及在 React、Vue、Svelte 和 Angular 中使用 Konva。"
---

## Konva 是什么？

Konva 是一个用于创建交互式 2D 图形的 HTML5 Canvas JavaScript 框架。它在 Canvas 之上提供对象模型。

你可以创建图形、组合图形、添加事件监听器、拖动图形和播放动画。Konva 负责渲染、命中检测和状态管理。

Konva 支持桌面设备和移动设备。它可以高效渲染数千个图形，并为 **React**、**Vue**、**Svelte** 和 **Angular** 提供官方集成。

## 快速示例

```javascript
// Create a stage (container for all layers)
const stage = new Konva.Stage({
  container: 'container',
  width: 500,
  height: 400,
});

// Create a layer
const layer = new Konva.Layer();
stage.add(layer);

// Create a draggable rectangle
const rect = new Konva.Rect({
  x: 50,
  y: 50,
  width: 100,
  height: 80,
  fill: 'cornflowerblue',
  shadowBlur: 5,
  cornerRadius: 4,
  draggable: true,
});
layer.add(rect);

// Add event listener
rect.on('click tap', () => {
  rect.fill(Konva.Util.getRandomColor());
});
```

这段代码创建一个可拖动的矩形。单击矩形时，它会改变颜色。代码不需要额外模板或渲染循环。

## 安装 Konva

如果你使用包管理器，请运行：

```bash
npm install konva
```

你也可以使用脚本标签：

```html
<script src="https://unpkg.com/konva@10/konva.min.js"></script>
```

你还可以从 CDN 下载文件：

- [完整版本 konva.js](https://unpkg.com/konva@10/konva.js)
- [压缩版本 konva.min.js](https://unpkg.com/konva@10/konva.min.js)

## 在框架中使用 Konva

Konva 为主要前端框架提供官方绑定：

| 框架 | 包 | 安装命令 |
|-----------|---------|---------|
| **React** | [`react-konva`](https://github.com/konvajs/react-konva) | `npm install react-konva konva` |
| **Vue** | [`vue-konva`](https://github.com/konvajs/vue-konva) | `npm install vue-konva konva` |
| **Svelte** | [`svelte-konva`](https://github.com/konvajs/svelte-konva) | `npm install svelte-konva konva` |
| **Angular** | [`ng2-konva`](https://github.com/konvajs/ng2-konva) | `npm install ng2-konva konva` |

从对应框架的指南开始：[React](/docs/react/index.html) · [Vue](/docs/vue/index.html) · [Svelte](/docs/svelte/index.html) · [Angular](/docs/angular/index.html)

## 为什么使用 Konva？

- **图形是对象** — 你可以创建矩形、圆形、线条、文本、图像和路径。每个图形都是可独立修改的 JavaScript 对象。
- **完整的事件系统** — 支持 `click`、`dblclick`、`mouseover`、`mouseout`、`touchstart`、`dragstart` 和 `dragend` 等事件。事件会像 DOM 事件一样经过组和图层冒泡。
- **拖放** — 为任意图形设置 `draggable: true`。你还可以添加拖动边界、吸附和放置事件。
- **缩放和旋转** — 内置的 [`Transformer`](/docs/select_and_transform/Basic_demo.html) 组件可以为任意图形添加缩放和旋转控制柄。
- **多图层渲染** — 每个 Layer 都是独立的 `<canvas>` 元素。交互图形变化时，静态背景不需要重新渲染。
- **序列化** — 使用 `stage.toJSON()` 保存节点树及其可序列化属性。使用 `Konva.Node.create(json)` 恢复这些内容。图像、事件处理函数和自定义绘制函数必须单独恢复。
- **滤镜和效果** — 可以对单个图形应用模糊、亮度、对比度、灰度和像素化等效果。
- **高性能** — Konva 可以处理数千个图形。请参阅[性能建议](/docs/performance/All_Performance_Tips.html)和[压力测试示例](/docs/sandbox/10000_Shapes_with_Tooltip.html)。

## 可以创建什么？

开发者使用 Konva 创建设计编辑器、绘图应用、标注工具、交互式地图和数据可视化。下面是一些示例：

- [Canvas 设计编辑器](/docs/sandbox/Canvas_Editor.html) — 类似 Canva 的设计工具
- [自由绘图应用](/docs/sandbox/Free_Drawing.html) — 白板和自由绘图
- [图像标注](/docs/sandbox/Image_Labeling.html) — 机器学习标注工具
- [座位预订图](/docs/sandbox/Seats_Reservation.html) — 交互式座位预订
- [交互式建筑地图](/docs/sandbox/Interactive_Building_Map.html) — 楼层平面图可视化
- [连接对象](/docs/sandbox/Connected_Objects.html) — 图表和流程图编辑器

[查看 60 多个示例 →](/docs/sandbox.html)

## 后续步骤

- [Konva 概览](/docs/overview.html) — 了解 Stage → Layer → Shape 架构
- [图形](/docs/shapes/Rect.html) — 了解所有可用图形
- [事件](/docs/events/Binding_Events.html) — 处理单击、悬停和触摸等事件
- [拖放](/docs/drag_and_drop/Drag_and_Drop.html) — 使图形可以拖动
- [动画](/docs/animations/Create_an_Animation.html) — 为图形属性添加动画
- [关于 Konva](/docs/about.html) — 了解使用者、主要信息和相关链接
