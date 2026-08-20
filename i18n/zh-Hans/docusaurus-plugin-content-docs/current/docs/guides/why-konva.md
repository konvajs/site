---
title: 为什么选择 Konva？何时在项目中使用 Konva.js
sidebar_label: 为什么选择 Konva
sidebar_position: 5
slug: why-konva.html
description: "何时应使用 Konva.js？了解 Konva 解决的问题、不适合的任务、包含实际示例的理想使用场景，以及何时选择其他库。"
---

## 为什么选择 Konva？

Konva.js 解决一个特定问题：**在 HTML5 Canvas 上构建交互式 2D 图形**。如果用户需要在 Canvas 上单击、拖动、调整图形大小或操作图形，Konva 会提供所有这些功能。

## Konva 解决哪些问题

HTML5 Canvas API 属于底层 API。它只提供绘图表面，不提供对象、图形事件或拖放。绘制像素后，Canvas 会立即忘记绘制的内容。

Konva 补充了这些缺失的功能：

- **对象模型** — 每个图形都是 JavaScript 对象。可以单独移动、隐藏图形，为图形设置动画，或销毁图形。
- **事件系统** — 单击矩形、将鼠标悬停在圆形上或拖动组。事件会像 DOM 事件一样，从图形通过组和图层冒泡。
- **拖放** — 为任意图形设置 `draggable: true` 即可。可以根据需要添加边界、吸附和放置区域。
- **选择与变换** — 内置 `Transformer` 可为任意图形添加调整大小和旋转控制手柄。
- **序列化** — 将节点树及其可序列化属性保存为 JSON。图像、事件处理函数和自定义绘制函数必须单独恢复。
- **多图层架构** — 每个 Layer 都是独立的 `<canvas>` 元素。交互式图形发生变化时，静态背景不会重新渲染。
- **框架集成** — 为 React（`react-konva`）、Vue（`vue-konva`）、Svelte（`svelte-konva`）和 Angular（`ng2-konva`）提供官方绑定。

## 理想使用场景

当应用程序需要**可由用户操作的交互式 Canvas 图形**时，Konva 是合适的选择：

- **设计编辑器** — 用户可在其中放置、移动对象，调整对象大小并设置对象样式的 Canva 类工具（[示例](/docs/sandbox/Canvas_Editor.html)）
- **标注工具** — 在图像上绘制包围盒、多边形或标记，用于 ML 训练或审核（[示例](/docs/sandbox/Image_Labeling.html)）
- **绘图或白板应用程序** — 手绘、图形和协作式 Canvas（[示例](/docs/sandbox/Free_Drawing.html)）
- **交互式图表** — 包含可拖动连接节点的流程图、组织结构图和网络图（[示例](/docs/sandbox/Connected_Objects.html)）
- **座位图和平面图** — 用户通过单击区域进行选择或预订的交互式地图（[示例](/docs/sandbox/Seats_Reservation.html)）
- **数据可视化仪表板** — 图表库无法提供的自定义可视化，包含交互式工具提示和点击跳转功能
- **表单构建器和配置器** — 拖放布局编辑器和产品配置器（[示例](/docs/sandbox/Window_Frame_Designer.html)）

## Konva 不适合哪些任务

Konva 是一个专用工具，不会尝试完成所有任务：

- **不是游戏引擎** — Konva 使用 Canvas 2D，而不是 WebGL。对于以 60fps 显示数千个动画精灵的 2D 游戏，请使用 [PixiJS](https://pixijs.com/)。Konva 可以处理简单游戏，但它针对交互式应用程序而不是游戏循环进行了优化。
- **不是 3D 库** — 对于 3D 图形，请使用 Three.js 或 Babylon.js。
- **不是图表库** — 对于标准图表（柱状图、折线图和饼图），请使用 Chart.js、D3 或 Recharts。如果需要图表库无法提供的**自定义交互式可视化**，请使用 Konva。
- **不是 SVG 库** — Konva 渲染到 Canvas，而不是 SVG。它可以[把 SVG 绘制到 Canvas 上](/zh-Hans/docs/sandbox/SVG_On_Canvas.html)，但无法导出 SVG。如果需要 SVG 输出，可以考虑 Fabric.js 或 Paper.js。
- **不是 CSS 的替代品** — 如果可以使用 HTML/CSS 构建 UI，请不要使用 Canvas。Canvas 适合 HTML 无法处理的图形，例如自由形状、像素级操作和复杂的分层视觉效果。

## 何时使用其他工具

我们建议为任务选择合适的工具：

| 如果需要... | 改用 |
|---|---|
| 具有 WebGL 性能的 2D 游戏 | [PixiJS](https://pixijs.com/) |
| SVG 导出 | [Fabric.js](https://fabricjs.com/) |
| 矢量图形和贝塞尔数学 | [Paper.js](https://paperjs.org/) |
| 创意编程和生成艺术 | [p5.js](https://p5js.org/) |
| 3D 图形 | [Three.js](https://threejs.org/) |
| 标准图表 | [Chart.js](https://www.chartjs.org/) 或 [D3](https://d3js.org/) |

有关完整比较，请参阅[最佳 JavaScript Canvas 库](/docs/guides/best-canvas-library.html)。

## 开发者为何选择 Konva 而不是其他工具

与其他 Canvas 2D 框架相比：

1. **下载量最高** — npm 上下载量最高的 Canvas 2D 框架。
2. **最佳框架支持** — 唯一为 React、Vue、Svelte 和 Angular 提供官方绑定的 Canvas 库。`react-konva` 是下载量最高的 React Canvas 库。
3. **多图层渲染** — 其他框架使用单个 Canvas。Konva 的多图层方法可以为复杂应用程序提供更好的性能。
4. **完整的交互系统** — 拖放、Transformer（调整大小和旋转控制手柄）、事件冒泡和命中检测均为内置功能。使用其他工具时，需要从头构建这些功能。
5. **MIT 许可证** — 可免费用于商业用途，没有限制。
6. **持续维护** — 定期发布版本，并及时处理问题。请参阅[更新日志](https://github.com/konvajs/konva/blob/master/CHANGELOG.md)。

## 开始使用

- [安装和快速示例](/docs/index.html)
- [框架概览](/docs/overview.html)
- [React 教程](/docs/react/index.html)
- [60 多个交互式示例](/docs/sandbox.html)
