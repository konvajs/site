---
sidebar_position: 1
title: Getting Started with Konva — HTML5 Canvas 2D Framework
sidebar_label: Intro
hide_table_of_contents: true
slug: index.html
description: "Get started with Konva.js, a 2D HTML5 Canvas JavaScript framework. Learn to draw shapes, handle events, drag-and-drop, and animate with framework integrations."
---

## What's Konva?

Konva is an HTML5 Canvas JavaScript framework for building interactive 2D graphics. It gives you an object model on top of the canvas — you create shapes, group them, add event listeners, drag them, animate them, and the framework handles rendering, hit detection, and state management.

Konva works on desktop and mobile, supports thousands of shapes with high-performance rendering, and has official integrations for **React**, **Vue**, **Svelte**, and **Angular**.

## Quick Example

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

That's it — a draggable rectangle that changes color on click. No boilerplate, no render loops.

## Install Konva

If you are using package managers:

```bash
npm install konva
```

Or just use a script tag:

```html
<script src="https://unpkg.com/konva@10/konva.min.js"></script>
```

Or download from CDN:

- [Full version konva.js](https://unpkg.com/konva@10/konva.js)
- [Min version konva.min.js](https://unpkg.com/konva@10/konva.min.js)

## Use Konva with Your Framework

Konva has official bindings for all major frameworks:

| Framework | Package | Install |
|-----------|---------|---------|
| **React** | [`react-konva`](https://github.com/konvajs/react-konva) | `npm install react-konva konva` |
| **Vue** | [`vue-konva`](https://github.com/konvajs/vue-konva) | `npm install vue-konva konva` |
| **Svelte** | [`svelte-konva`](https://github.com/konvajs/svelte-konva) | `npm install svelte-konva konva` |
| **Angular** | [`ng2-konva`](https://github.com/konvajs/ng2-konva) | `npm install ng2-konva konva` |

Get started with your framework: [React](/docs/react/index.html) · [Vue](/docs/vue/index.html) · [Svelte](/docs/svelte/index.html) · [Angular](/docs/angular/index.html)

## Why Konva?

- **Shapes as objects** — Create rectangles, circles, lines, text, images, paths, and more. Each shape is a JavaScript object you can manipulate independently.
- **Full event system** — `click`, `dblclick`, `mouseover`, `mouseout`, `touchstart`, `dragstart`, `dragend`, and more. Events bubble from shapes through groups and layers, just like the DOM.
- **Drag and drop** — Set `draggable: true` on any shape. Add drag boundaries, snapping, and drop events.
- **Resize and rotate** — The built-in [`Transformer`](/docs/select_and_transform/Basic_demo.html) component adds resize and rotate handles to any shape.
- **Multi-layer rendering** — Each Layer is a separate `<canvas>` element. Static backgrounds don't re-render when interactive shapes change.
- **Serialization** — Save the node tree and its serializable attributes with `stage.toJSON()`. Restore them with `Konva.Node.create(json)`. Restore images, event handlers, and custom drawing functions separately.
- **Filters and effects** — Blur, brighten, contrast, grayscale, pixelate, and more — applied per shape.
- **High performance** — Handles thousands of shapes. See [performance tips](/docs/performance/All_Performance_Tips.html) and [stress test demos](/docs/sandbox/10000_Shapes_with_Tooltip.html).

## What Can You Build?

Developers use Konva for design editors, drawing apps, annotation tools, interactive maps, data visualizations, and more. Here are some examples:

- [Canvas Design Editor](/docs/sandbox/Canvas_Editor.html) — Canva-style design tool
- [Free Drawing App](/docs/sandbox/Free_Drawing.html) — Whiteboard / freehand drawing
- [Image Annotation](/docs/sandbox/Image_Labeling.html) — ML labeling tool
- [Seat Reservation Map](/docs/sandbox/Seats_Reservation.html) — Interactive seat booking
- [Interactive Building Map](/docs/sandbox/Interactive_Building_Map.html) — Floor plan visualization
- [Connected Objects](/docs/sandbox/Connected_Objects.html) — Diagram / flowchart builder

[See all 60+ demos →](/docs/sandbox.html)

Need a complete design editor rather than a canvas library? [Polotno](https://polotno.com/?utm_source=konvajs&utm_medium=docs&utm_content=getting-started) is a commercial design editor SDK built on Konva by the Konva maintainers: `npm install polotno`.

## Next Steps

- [Konva Overview](/docs/overview.html) — Understand the architecture (Stage → Layer → Shape)
- [Shapes](/docs/shapes/Rect.html) — Learn about all available shapes
- [Events](/docs/events/Binding_Events.html) — Handle clicks, hovers, touches, and more
- [Drag and Drop](/docs/drag_and_drop/Drag_and_Drop.html) — Make shapes draggable
- [Animations](/docs/animations/Create_an_Animation.html) — Animate shape properties
- [About Konva](/docs/about.html) — Who uses Konva, key facts, and links
