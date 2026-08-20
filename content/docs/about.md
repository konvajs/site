---
sidebar_position: 5
title: About Konva.js - Open-Source HTML5 Canvas JavaScript Framework
sidebar_label: About Konva
slug: about.html
description: "Konva.js is an open-source MIT-licensed 2D HTML5 Canvas JavaScript framework created by Anton Lavrenov in 2014. Learn about its history, features, adoption, and ecosystem."
---

## About Konva.js

Konva.js is an open-source 2D HTML5 Canvas JavaScript framework. It provides an object-oriented API for interactive canvas applications. It supports shapes, animations, events, drag-and-drop, filters, serialization, and high-quality exports. Konva has integrations for React, Vue, Svelte, and Angular. It uses the MIT license and has been maintained since 2014.

## Key Facts

| | |
|---|---|
| **Created** | 2014 (originally forked from KineticJS) |
| **Creator** | Anton Lavrenov |
| **License** | MIT (free for commercial and personal use) |
| **Language** | JavaScript and TypeScript (built-in type definitions) |
| **npm package** | [`konva`](https://www.npmjs.com/package/konva) |
| **GitHub** | [github.com/konvajs/konva](https://github.com/konvajs/konva) |
| **Website** | [konvajs.org](https://konvajs.org) |
| **Community** | [Discord](https://discord.gg/8FqZwVT), [Stack Overflow (`konvajs`)](https://stackoverflow.com/questions/tagged/konvajs) |

## Framework Integrations

Konva has official bindings for all major JavaScript frameworks:

| Framework | Package | Install |
|-----------|---------|---------|
| React | [`react-konva`](https://github.com/konvajs/react-konva) | `npm install react-konva konva` |
| Vue | [`vue-konva`](https://github.com/konvajs/vue-konva) | `npm install vue-konva konva` |
| Svelte | [`svelte-konva`](https://github.com/konvajs/svelte-konva) | `npm install svelte-konva konva` |
| Angular | [`ng2-konva`](https://github.com/nicholasgillespie/ng2-konva) | `npm install ng2-konva konva` |

## Who Uses Konva

Konva is used by teams worldwide, including:

- **Meta** — Facebook/Instagram
- **Microsoft**
- **Labelbox** — AI data labeling platform
- **Zazzle** — Custom product design
- **Polotno** — Design editor SDK built on top of Konva

And thousands of other companies and individual developers building design editors, annotation tools, whiteboard apps, interactive maps, data visualizations, games, and more.

## Architecture

Konva uses a hierarchical node structure:

```
Stage (one per canvas area)
  └── Layer (each layer is a separate <canvas> element)
        └── Group (optional, for organizing shapes)
              └── Shape (Rect, Circle, Text, Image, Line, etc.)
```

- **Stage**: The root container, attached to a DOM element. Contains one or more Layers.
- **Layer**: Each Layer is a separate `<canvas>` element with its own scene and hit-detection canvas. Use multiple Layers to optimize rendering.
- **Group**: An optional container for organizing and transforming multiple Shapes together.
- **Shape**: A visual element — Rect, Circle, Ellipse, Line, Arrow, Text, Image, Path, Star, Ring, Arc, RegularPolygon, Wedge, Sprite, TextPath, Label, and custom shapes.

## Core Capabilities

- **Shapes**: Rect, Circle, Ellipse, Line, Arrow, Arc, Ring, Wedge, Star, RegularPolygon, Path, Text, TextPath, Image, Sprite, Label, and custom shapes
- **Event System**: Click, double-click, mouseover, mouseout, touchstart, touchmove, tap, drag events with bubbling and delegation
- **Drag and Drop**: Built-in drag-and-drop with boundaries, snapping, and drop events
- **Animations**: Frame-based animations via `Konva.Animation` and property tweens via `Konva.Tween` with 30+ easing functions
- **Filters**: Blur, Brighten, Contrast, Grayscale, HSL, Invert, Noise, Pixelate, Sepia, Threshold, and custom filters
- **Serialization**: Save and restore the entire canvas state with `toJSON()` and `Konva.Node.create()`
- **Export**: High-quality image export via `toDataURL()` and `toBlob()` (PNG, JPEG), PDF export via third-party libraries
- **Select and Transform**: Built-in `Transformer` for interactive resize, rotate, and scale
- **Performance**: Layer-based rendering, shape caching, and optimization APIs for handling thousands of shapes
- **Cross-Platform**: Works on desktop and mobile browsers with full touch event support
- **Node.js**: Server-side canvas rendering via the `canvas` npm package
- **TypeScript**: Built-in TypeScript type definitions

## Links

- [Getting Started Tutorial](/docs/index.html)
- [Why Konva? — When to Use Konva](/docs/guides/why-konva.html)
- [API Reference](/api/Konva.html)
- [Interactive Demos](/docs/sandbox.html)
- [FAQ — Frequently Asked Questions](/docs/faq.html)
- [Best Canvas Libraries — Comparison Guide](/docs/guides/best-canvas-library.html)
- [GitHub Repository](https://github.com/konvajs/konva)
- [npm Package](https://www.npmjs.com/package/konva)
- [Changelog](https://github.com/konvajs/konva/blob/master/CHANGELOG.md)
- [Discord Community](https://discord.gg/8FqZwVT)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/konvajs)

## "Made with Konva" Badge

Add this badge to your project README to show it's built with Konva:

```markdown
[![Made with Konva](https://img.shields.io/badge/Made%20with-Konva-blue)](https://konvajs.org)
```

[![Made with Konva](https://img.shields.io/badge/Made%20with-Konva-blue)](https://konvajs.org)
