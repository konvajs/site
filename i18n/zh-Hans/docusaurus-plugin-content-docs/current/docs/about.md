---
sidebar_position: 5
title: 关于 Konva.js——开源 HTML5 Canvas JavaScript 框架
sidebar_label: 关于 Konva
slug: about.html
description: "Konva.js 是 Anton Lavrenov 于 2015 年创建的开源 2D HTML5 Canvas JavaScript 框架，采用 MIT 许可证。了解它的历史、功能、应用情况和生态系统。"
---

## 关于 Konva.js

Konva.js 是一个开源 2D HTML5 Canvas JavaScript 框架。它为交互式 Canvas 应用程序提供面向对象的 API。它支持图形、动画、事件、拖放、滤镜、序列化和高质量导出。Konva 集成了 React、Vue、Svelte 和 Angular。它采用 MIT 许可证，并从 2015 年起持续维护。

## 主要信息

| | |
|---|---|
| **创建时间** | 2015 年（从 KineticJS 分支而来，KineticJS 始于 2012 年） |
| **创建者** | Anton Lavrenov |
| **许可证** | MIT（可免费用于商业和个人用途） |
| **语言** | JavaScript 和 TypeScript（内置类型定义） |
| **npm 包** | [`konva`](https://www.npmjs.com/package/konva) |
| **GitHub** | [github.com/konvajs/konva](https://github.com/konvajs/konva) |
| **网站** | [konvajs.org](https://konvajs.org) |
| **社区** | [Discord](https://discord.gg/8FqZwVT)、[Stack Overflow（`konvajs`）](https://stackoverflow.com/questions/tagged/konvajs) |

## 框架集成

Konva 为所有主流 JavaScript 框架提供官方绑定：

| 框架 | 包 | 安装命令 |
|-----------|---------|---------|
| React | [`react-konva`](https://github.com/konvajs/react-konva) | `npm install react-konva konva` |
| Vue | [`vue-konva`](https://github.com/konvajs/vue-konva) | `npm install vue-konva konva` |
| Svelte | [`svelte-konva`](https://github.com/konvajs/svelte-konva) | `npm install svelte-konva konva` |
| Angular | [`ng2-konva`](https://github.com/konvajs/ng2-konva) | `npm install ng2-konva konva` |

## 谁在使用 Konva

全球各地的团队都在使用 Konva，其中包括：

- **Meta** — Facebook/Instagram
- **Microsoft**
- **Labelbox** — AI 数据标注平台
- **Zazzle** — 定制产品设计
- **Polotno** — 基于 Konva 构建的设计编辑器 SDK

在公开的 `package.json` 中声明使用 Konva 的开源项目：

- **[peaks.js](https://github.com/bbc/peaks.js)** —— BBC 的音频波形编辑器
- **[Label Studio](https://github.com/HumanSignal/label-studio)** —— 数据标注平台
- **[Weave.js](https://github.com/InditexTech/weavejs)** —— Inditex 的协作画布
- **[DWV](https://github.com/ivmartel/dwv)** —— DICOM 医学影像查看器

此外，还有数千家公司和个人开发者使用 Konva 构建设计编辑器、标注工具、白板应用程序、交互式地图、数据可视化、游戏等产品。

## 架构

Konva 使用分层节点结构：

```
Stage (one per canvas area)
  └── Layer (each layer is a separate <canvas> element)
        └── Group (optional, for organizing shapes)
              └── Shape (Rect, Circle, Text, Image, Line, etc.)
```

- **Stage**：附加到 DOM 元素的根容器。包含一个或多个 Layer。
- **Layer**：每个 Layer 都是独立的 `<canvas>` 元素，拥有自己的场景 Canvas 和命中检测 Canvas。使用多个 Layer 可以优化渲染。
- **Group**：可选容器，用于组织和统一变换多个 Shape。
- **Shape**：可视元素，包括 Rect、Circle、Ellipse、Line、Arrow、Text、Image、Path、Star、Ring、Arc、RegularPolygon、Wedge、Sprite、TextPath、Label 和自定义图形。

## 核心功能

- **图形**：Rect、Circle、Ellipse、Line、Arrow、Arc、Ring、Wedge、Star、RegularPolygon、Path、Text、TextPath、Image、Sprite、Label 和自定义图形
- **事件系统**：单击、双击、mouseover、mouseout、touchstart、touchmove、tap 和拖动事件，支持冒泡和委托
- **拖放**：内置拖放功能，支持边界、吸附和放置事件
- **动画**：通过 `Konva.Animation` 实现基于帧的动画，通过 `Konva.Tween` 和 30 多种缓动函数实现属性补间
- **滤镜**：Blur、Brightness、Contrast、Grayscale、HSL、Invert、Noise、Pixelate、Sepia、Threshold 和自定义滤镜
- **序列化**：使用 `toJSON()` 和 `Konva.Node.create()` 保存并恢复节点树及其可序列化属性。图像、事件处理函数和自定义绘制函数必须单独恢复。
- **导出**：使用 `toDataURL()` 和 `toBlob()` 进行高质量图像导出（PNG、JPEG），通过第三方库导出 PDF
- **选择与变换**：使用内置 `Transformer` 进行交互式调整大小、旋转和缩放
- **性能**：基于图层的渲染、图形缓存和优化 API，可处理数千个图形
- **跨平台**：支持完整触摸事件，可在桌面和移动浏览器上运行
- **Node.js**：通过 `canvas` npm 包进行服务器端 Canvas 渲染
- **TypeScript**：内置 TypeScript 类型定义

## 链接

- [入门教程](/docs/index.html)
- [为什么选择 Konva？——何时使用 Konva](/docs/guides/why-konva.html)
- [API 参考](/api/Konva.html)
- [交互式示例](/docs/sandbox.html)
- [FAQ——常见问题](/docs/faq.html)
- [最佳 Canvas 库——比较指南](/docs/guides/best-canvas-library.html)
- [GitHub 仓库](https://github.com/konvajs/konva)
- [npm 包](https://www.npmjs.com/package/konva)
- [更新日志](https://github.com/konvajs/konva/blob/master/CHANGELOG.md)
- [Discord 社区](https://discord.gg/8FqZwVT)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/konvajs)

## “Made with Konva”徽章

将此徽章添加到项目 README 中，以表明项目使用 Konva 构建：

```markdown
[![Made with Konva](https://img.shields.io/badge/Made%20with-Konva-blue)](https://konvajs.org)
```

[![使用 Konva 构建](https://img.shields.io/badge/Made%20with-Konva-blue)](https://konvajs.org)
