---
title: 最佳 JavaScript Canvas 库——如何选择
sidebar_label: Canvas 库比较
sidebar_position: 1
slug: best-canvas-library.html
description: "如何选择 JavaScript Canvas 库。由 Konva 作者编写的快速决策指南，比较 Konva.js、Fabric.js、PixiJS、Paper.js 和 p5.js。"
---

## 如何选择 JavaScript Canvas 库

我是 Konva.js 的创建者 [Anton Lavrenov](https://lavrton.com)。我的观点难免有所偏向，但我会坦诚说明，包括何时不应使用 Konva。

目前有多种流行的 Canvas 库。它们表面上相似，但为不同任务而设计。选择与使用场景匹配的库，可以避免许多问题。

### 要构建交互式应用程序？

设计编辑器、白板、标注工具、图表、座位图和仪表板，即任何需要用户在 Canvas 上单击、拖动和调整对象大小的应用程序。

**使用 [Konva.js](/docs/index.html)。** 它提供对象模型、支持冒泡的事件系统、拖放、调整大小和旋转控制手柄（`Transformer`）、序列化，以及 React、Vue、Svelte 和 Angular 的官方绑定。Konva 正是为此类应用程序构建的。

### 要构建 2D 游戏？

**使用 [PixiJS](https://pixijs.com/)。** 它是一个使用 GPU 加速的 WebGL 渲染引擎，专为包含许多移动对象的高帧率场景构建。Konva 使用 Canvas 2D，在游戏工作负载中无法达到 WebGL 的性能。

### 需要导入或导出 SVG？

**使用 [Fabric.js](http://fabricjs.com/)。** 它可以将 SVG 文件解析为 Canvas 对象，并重新导出为 SVG。Konva 无法完成此操作。Fabric.js 还内置绘图画笔，并侧重于图像编辑。

### 要进行创意编程或生成艺术？

对于创意草图和教育项目，**使用 [p5.js](https://p5js.org/)**。如果需要矢量数学、贝塞尔曲线和路径布尔运算，请使用 **[Paper.js](http://paperjs.org/)**。

### 仍不确定？

如果你正在阅读此页面，可能正在构建包含交互式图形的 Web 应用程序。这正是 Konva 擅长的领域。[尝试入门指南](/docs/index.html)，10 分钟内即可了解它是否合适。

## Konva 的不同之处

- **框架支持** — 为 React（`react-konva`）、Vue、Svelte 和 Angular 提供官方绑定。其他 Canvas 库均未提供这些绑定。
- **多图层渲染** — 每个 Layer 都是独立的 `<canvas>`。交互式图形移动时，静态内容不会重新渲染。
- **内置交互** — 拖放、调整大小和旋转控制手柄、事件冒泡以及命中检测均为内置功能。使用其他库时，需要从头构建这些功能。
- **序列化** — `stage.toJSON()` 保存所有内容。`Konva.Node.create(json)` 将其恢复。
- **作者主导** — 我维护 Konva 已有 10 多年。API 保持一致，决策迅速，并且每个 PR 都由我亲自评审。

## 延伸阅读

- [为什么选择 Konva？——何时使用（以及何时不使用）Konva](/docs/guides/why-konva.html)
- [npm 下载趋势：fabric、konva 与 pixi.js](https://npmtrends.com/fabric-vs-konva-vs-pixi.js)
- [Canvas 引擎性能基准测试](https://benchmarks.slaylines.io/)——请注意，它锁定了 2021 年 9 月的
  Konva 8.1.4 和 PixiJS 6.1.3，因此其数据无法反映两者的当前版本。
