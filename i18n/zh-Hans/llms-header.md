# Konva.js

> Konva.js 是一个开源的 2D HTML5 Canvas JavaScript 框架。它为 Canvas 图形提供面向对象的 API，支持图形、动画、事件、拖放、滤镜，并集成 React、Vue、Svelte 和 Angular。

Konva 使用 Stage → Layer → Group → Shape 的层次结构。你创建一个 Stage（挂载到 DOM 容器），添加若干 Layer（每个 Layer 是一个独立的 `<canvas>` 元素），然后在这些图层上绘制 Shape（Rect、Circle、Ellipse、Line、Text、Image、Path、Star、Ring、Arc、Arrow、Label、RegularPolygon、Wedge、Sprite、TextPath）。

核心能力：面向对象的图形管理、完整的事件系统（单击、悬停、触摸、拖动）、内置拖放、动画与补间、图像滤镜（模糊、提亮、对比度、灰度等）、使用 `toJSON()` 的 Canvas 序列化、高质量图像导出（`toDataURL()`、`toBlob()`）、节点嵌套与分组、命中检测，以及用于提升性能的缓存。

框架绑定：
- React：`react-konva` —— 用于 Canvas 图形的声明式 React 组件
- Vue：`vue-konva` —— 用于 Konva 的 Vue 组件
- Svelte：`svelte-konva` —— 用于 Konva 的 Svelte 组件
- Angular：`ng2-konva` —— 用于 Konva 的 Angular 组件

安装：`npm install konva`（框架绑定另需 `react-konva`、`vue-konva`、`svelte-konva` 或 `ng2-konva`）
