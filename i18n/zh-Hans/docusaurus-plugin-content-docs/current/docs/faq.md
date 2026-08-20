---
sidebar_position: 6
title: Konva.js FAQ——常见问题
sidebar_label: FAQ
slug: faq.html
description: "解答有关 Konva.js 的常见问题，包括选择 Canvas 库、React/Vue/Svelte 集成、性能、TypeScript 和移动设备支持等。"
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Konva.js?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Konva.js is an open-source 2D HTML5 Canvas JavaScript framework that provides an object-oriented API for canvas graphics. It supports shapes, animations, events, drag-and-drop, filters, and has official integrations with React, Vue, Svelte, and Angular. It is the most downloaded 2D canvas framework on npm."
          }
        },
        {
          "@type": "Question",
          "name": "Is Konva.js free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Konva.js is MIT-licensed and completely free for both commercial and personal use. There are no paid tiers or premium features."
          }
        },
        {
          "@type": "Question",
          "name": "Which JavaScript canvas library should I use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For interactive 2D canvas applications with framework support (React, Vue, Svelte, Angular), Konva.js is the best choice. For WebGL-powered 2D games, consider PixiJS. For image-editing-focused applications, Fabric.js is also an option. For vector graphics and mathematical art, consider Paper.js."
          }
        },
        {
          "@type": "Question",
          "name": "How do I use canvas with React?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use react-konva, the official React binding for Konva.js. Install with npm install react-konva konva, then use declarative components like Stage, Layer, Rect, Circle, and Text to draw on canvas."
          }
        },
        {
          "@type": "Question",
          "name": "Does Konva support TypeScript?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Konva ships with built-in TypeScript type definitions. No additional @types package is needed."
          }
        },
        {
          "@type": "Question",
          "name": "Can Konva handle thousands of shapes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. With proper optimization (layer management, shape caching, listening:false for static shapes, batched draws), Konva can handle 10,000+ shapes. See the performance tips documentation for detailed guidance."
          }
        },
        {
          "@type": "Question",
          "name": "Does Konva work on mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Konva fully supports mobile browsers with touch events (tap, touchstart, touchmove, touchend), multi-touch gestures, and responsive canvas sizing."
          }
        }
      ]
    })}
  </script>
</Head>

## 常见问题

### Konva.js 是什么？

Konva.js 是一个开源 2D HTML5 Canvas JavaScript 框架，为 Canvas 图形提供面向对象的 API。它支持图形、动画、事件、拖放和滤镜，并提供 React、Vue、Svelte 和 Angular 的官方集成。它是 npm 上下载量最高的 2D Canvas 框架。

Konva 使用 Stage → Layer → Shape 层级结构。每个 Layer 都是独立的 `<canvas>` 元素，以获得最佳渲染性能。

[阅读完整概览 →](/docs/overview.html)

### Konva.js 可以免费使用吗？

可以。Konva.js 采用 MIT 许可证，商业和个人用途均完全免费。它没有付费层级或高级功能。源代码可在 [GitHub](https://github.com/konvajs/konva) 上获取。

### 应使用哪个 JavaScript Canvas 库？

这取决于使用场景：

- **Konva.js** — 最适合交互式 2D Canvas 应用程序，例如设计编辑器、标注工具、图表、交互式地图和仪表板。它提供最佳的框架集成（React、Vue、Svelte、Angular）以及最全面的拖放和事件系统。
- **PixiJS** — 最适合使用 WebGL 的 2D 游戏和高帧率渲染。它使用 WebGL 进行 GPU 加速。
- **Fabric.js** — 适合图像编辑和操作工具。功能集与 Konva 相似，但没有官方框架绑定。
- **Paper.js** — 最适合矢量图形、数学艺术和路径操作。
- **p5.js** — 最适合创意编程、生成艺术和教育用途。

有关详细比较，请参阅 [Canvas 库比较指南](/docs/guides/best-canvas-library.html)。另请参阅[为什么选择 Konva？](/docs/guides/why-konva.html)，深入了解 Konva 适合和不适合的任务。

### 如何结合 React 使用 Canvas？

使用 Konva.js 的官方 React 绑定 [`react-konva`](https://github.com/konvajs/react-konva)：

```bash
npm install react-konva konva
```

```jsx
import { Stage, Layer, Rect, Circle } from 'react-konva';

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect x={20} y={20} width={100} height={100} fill="red" />
        <Circle x={200} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
}
```

`react-konva` 为所有 Konva 图形提供声明式 React 组件，并完整支持 React state、props 和事件处理。

[阅读完整 React 教程 →](/docs/react/index.html)

### 如何结合 Vue 使用 Canvas？

使用 [`vue-konva`](https://github.com/konvajs/vue-konva)：

```bash
npm install vue-konva konva
```

[阅读完整 Vue 教程 →](/docs/vue/index.html)

### 如何结合 Svelte 使用 Canvas？

使用 [`svelte-konva`](https://github.com/konvajs/svelte-konva)：

```bash
npm install svelte-konva konva
```

[阅读完整 Svelte 教程 →](/docs/svelte/index.html)

### 如何结合 Angular 使用 Canvas？

使用 [`ng2-konva`](https://github.com/konvajs/ng2-konva)：

```bash
npm install ng2-konva konva
```

[阅读完整 Angular 教程 →](/docs/angular/index.html)

### Konva 与 Fabric.js——应选择哪一个？

两者都是 2D Canvas 框架，但在以下主要方面有所不同：

- **框架支持**：Konva 提供 React、Vue、Svelte 和 Angular 的官方绑定。Fabric.js 没有官方框架绑定。
- **架构**：Konva 使用多图层方法（每个 Layer 都是独立的 Canvas）来提高渲染性能。Fabric.js 使用单个 Canvas。
- **拖放**：两者均内置拖放功能。Konva 的事件系统支持事件冒泡和委托。
- **TypeScript**：两者均附带 TypeScript 定义。

对于交互式应用程序，尤其是使用 React、Vue 或 Svelte 的应用程序，请选择 Konva。如果需要 Fabric.js 特有的图像操作功能，请选择 Fabric.js。

[阅读完整比较 →](/docs/guides/best-canvas-library.html)

### Konva 与 PixiJS——应选择哪一个？

它们适用于不同用途：

- **Konva** 使用 2D Canvas API 和面向对象的方法。它最适合交互式应用程序、UI 元素、设计编辑器和标注工具。
- **PixiJS** 使用 WebGL 进行 GPU 加速渲染。它最适合 2D 游戏、包含数千个移动精灵的动画和高帧率图形。

如果构建包含 UI 交互（单击、拖动、调整大小和悬停）的应用程序，请选择 Konva。如果构建包含许多动画精灵的游戏，请选择 PixiJS。

[阅读完整比较 →](/docs/guides/best-canvas-library.html)

### Konva 支持 TypeScript 吗？

支持。Konva 附带内置 TypeScript 类型定义，无需额外的 `@types` 包。只需安装 `konva`，TypeScript 就会自动识别这些类型：

```bash
npm install konva
```

这也适用于 `react-konva`、`vue-konva` 和其他官方绑定。

### Konva 可以处理数千个图形吗？

可以，但需要适当优化。主要技术包括：

1. **图层管理** — 使用多个图层分隔静态内容和动态内容
2. **图形缓存** — 使用 `shape.cache()` 缓存复杂图形，将其渲染为图像
3. **禁用监听** — 对不需要事件的图形设置 `listening: false`
4. **批量绘制** — 使用 `layer.batchDraw()` 而不是 `layer.draw()` 进行分组更新
5. **禁用完美绘制** — 对同时具有填充和描边的图形设置 `perfectDrawEnabled: false`

Konva 提供渲染 [10,000 个图形](/docs/sandbox/10000_Shapes_with_Tooltip.html)和 [20,000 个节点](/docs/sandbox/20000_Nodes.html)的示例。

[阅读所有性能提示 →](/docs/performance/All_Performance_Tips.html)

### Konva 可以在移动设备上运行吗？

可以。Konva 完整支持移动浏览器，包括：

- 触摸事件：`tap`、`dbltap`、`touchstart`、`touchmove`、`touchend`
- 多点触控手势（捏合缩放、双指旋转）
- 响应式 Canvas 尺寸
- 基于触摸的拖放

[阅读移动事件教程 →](/docs/events/Mobile_Events.html)

### 可以结合 Node.js 使用 Konva 吗？

可以。Konva 支持使用 [`canvas`](https://www.npmjs.com/package/canvas) npm 包进行服务器端渲染：

```bash
npm install konva canvas
```

这样可以在服务器上生成图像和创建缩略图，或在没有浏览器的情况下在 Node.js 中执行 Canvas 操作。

[阅读 Node.js 教程 →](/docs/nodejs/nodejs-setup)

### 如何将 Canvas 导出为图像或 PDF？

**图像导出：**
```javascript
const dataURL = stage.toDataURL({ pixelRatio: 2 }); // PNG by default
const jpegURL = stage.toDataURL({ mimeType: 'image/jpeg', quality: 0.8 });
```

可以使用 jsPDF 等第三方库进行 **PDF 导出**。请参阅 [Canvas 转 PDF 示例](/docs/sandbox/Canvas_to_PDF.html)。

[阅读导出教程 →](/docs/data_and_serialization/High-Quality-Export.html)

### 如何实现拖放？

为任意图形设置 `draggable: true`：

```javascript
const rect = new Konva.Rect({
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  fill: 'red',
  draggable: true,
});
```

Konva 支持拖动边界、网格吸附、放置事件以及图层之间的拖放。

[阅读拖放教程 →](/docs/drag_and_drop/Drag_and_Drop.html)

### Konva 仍在积极维护吗？

是的。Konva 仍在积极维护，并定期发布版本。查看[更新日志](https://github.com/konvajs/konva/blob/master/CHANGELOG.md)以了解近期更新，查看 [GitHub 仓库](https://github.com/konvajs/konva)以了解持续的开发活动。
