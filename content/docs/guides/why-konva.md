---
title: Why Konva? When to Use Konva.js for Your Project
sidebar_label: Why Konva
sidebar_position: 5
slug: why-konva.html
description: "When should you use Konva.js? Learn what problems Konva solves, what it's NOT designed for, ideal use cases with real examples, and when to choose a different library."
---

## Why Konva?

Konva.js solves a specific problem: **building interactive 2D graphics on HTML5 Canvas**. If users need to click, drag, resize, or manipulate shapes on a canvas, Konva gives you all of that out of the box.

## What Problems Konva Solves

The HTML5 Canvas API is low-level. It gives you a drawing surface and nothing else — no objects, no events on shapes, no drag-and-drop. You draw pixels, and the canvas immediately forgets what you drew.

Konva adds what's missing:

- **Object model** — Every shape is a JavaScript object. You can move, hide, animate, and destroy shapes independently.
- **Event system** — Click a rectangle, hover over a circle, drag a group. Events bubble from shapes through groups and layers, just like the DOM.
- **Drag and drop** — Set `draggable: true` on any shape. Done. Add boundaries, snapping, and drop zones as needed.
- **Selection and transformation** — The built-in `Transformer` adds resize and rotate handles to any shape.
- **Serialization** — Save the node tree and serializable attributes to JSON. Restore images, event handlers, and custom drawing functions separately.
- **Multi-layer architecture** — Each Layer is a separate `<canvas>` element. Static backgrounds don't re-render when interactive shapes change.
- **Framework integration** — Official bindings for React (`react-konva`), Vue (`vue-konva`), Svelte (`svelte-konva`), and Angular (`ng2-konva`).

## Ideal Use Cases

Konva is the right choice when your application needs **interactive canvas graphics with user manipulation**:

- **Design editors** — Canva-style tools where users place, move, resize, and style objects ([demo](/docs/sandbox/Canvas_Editor.html))
- **Annotation / labeling tools** — Drawing bounding boxes, polygons, or markers on images for ML training or review ([demo](/docs/sandbox/Image_Labeling.html))
- **Drawing / whiteboard apps** — Freehand drawing, shapes, and collaborative canvases ([demo](/docs/sandbox/Free_Drawing.html))
- **Interactive diagrams** — Flowcharts, org charts, network diagrams with draggable, connected nodes ([demo](/docs/sandbox/Connected_Objects.html))
- **Seat maps and floor plans** — Interactive maps where users click areas to select or book ([demo](/docs/sandbox/Seats_Reservation.html))
- **Data visualization dashboards** — Custom visualizations beyond what charting libraries offer, with interactive tooltips and click-through
- **Form builders and configurators** — Drag-and-drop layout editors, product configurators ([demo](/docs/sandbox/Window_Frame_Designer.html))

If the design editor is a feature of your product rather than the product itself, [Polotno](https://polotno.com/?utm_source=konvajs&utm_medium=docs&utm_content=why-konva) is a commercial design editor SDK built on Konva by the Konva maintainers. It ships templates, text editing, and export, so you integrate an editor instead of building one. The [Canvas Editor demo](/docs/sandbox/Canvas_Editor.html#build-or-integrate) covers when to build and when to integrate.

## What Konva is NOT

Konva is a focused tool. It doesn't try to do everything:

- **Not a game engine** — Konva uses Canvas 2D, not WebGL. For 2D games with thousands of animated sprites at 60fps, use [PixiJS](https://pixijs.com/). Konva can handle simple games, but it's optimized for interactive applications, not game loops.
- **Not a 3D library** — For 3D graphics, use Three.js or Babylon.js.
- **Not a charting library** — For standard charts (bar, line, pie), use Chart.js, D3, or Recharts. Use Konva when you need **custom interactive visualizations** that go beyond what charting libraries offer.
- **Not an SVG library** — Konva renders to Canvas, not SVG. It can [draw SVG onto a canvas](/docs/sandbox/SVG_On_Canvas.html), but it cannot export SVG. If you need SVG output, consider Fabric.js or Paper.js.
- **Not a CSS replacement** — If your UI can be built with HTML/CSS, don't use Canvas. Canvas is for graphics that HTML can't handle — freeform shapes, pixel-level manipulation, complex layered visuals.

## When to Use Something Else

We believe in recommending the right tool:

| If you need... | Use instead |
|---|---|
| 2D games with WebGL performance | [PixiJS](https://pixijs.com/) |
| SVG export | [Fabric.js](https://fabricjs.com/) |
| Vector graphics / Bezier math | [Paper.js](https://paperjs.org/) |
| Creative coding / generative art | [p5.js](https://p5js.org/) |
| 3D graphics | [Three.js](https://threejs.org/) |
| Standard charts | [Chart.js](https://www.chartjs.org/) or [D3](https://d3js.org/) |

For a full comparison, see [Best JavaScript Canvas Libraries](/docs/guides/best-canvas-library.html).

## Why Developers Choose Konva Over Alternatives

Compared to other Canvas 2D frameworks:

1. **Most downloaded** — The highest-downloaded Canvas 2D framework on npm.
2. **Best framework support** — The only canvas library with official React, Vue, Svelte, and Angular bindings. `react-konva` is the most downloaded React canvas library.
3. **Multi-layer rendering** — Other frameworks use a single canvas. Konva's multi-layer approach means better performance for complex applications.
4. **Complete interaction system** — Drag-and-drop, Transformer (resize/rotate handles), event bubbling, hit detection — all built in. With alternatives, you build these from scratch.
5. **MIT licensed** — Free for commercial use, no restrictions.
6. **Actively maintained** — Regular releases, responsive issue tracker. See the [changelog](https://github.com/konvajs/konva/blob/master/CHANGELOG.md).

## Get Started

- [Installation and Quick Example](/docs/index.html)
- [Framework Overview](/docs/overview.html)
- [React Tutorial](/docs/react/index.html)
- [60+ Interactive Demos](/docs/sandbox.html)
