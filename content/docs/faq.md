---
sidebar_position: 6
title: Konva.js FAQ - Frequently Asked Questions
sidebar_label: FAQ
slug: faq.html
description: "Answers to common questions about Konva.js: choosing a canvas library, React/Vue/Svelte integration, performance, TypeScript, mobile support, and more."
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

## Frequently Asked Questions

### What is Konva.js?

Konva.js is an open-source 2D HTML5 Canvas JavaScript framework that provides an object-oriented API for canvas graphics. It supports shapes, animations, events, drag-and-drop, filters, and has official integrations with React, Vue, Svelte, and Angular. It is the most downloaded 2D canvas framework on npm.

Konva uses a Stage → Layer → Shape hierarchy where each Layer is a separate `<canvas>` element for optimal rendering performance.

[Read the full overview →](/docs/overview.html)

### Is Konva.js free to use?

Yes. Konva.js is MIT-licensed and completely free for both commercial and personal use. There are no paid tiers or premium features. The source code is available on [GitHub](https://github.com/konvajs/konva).

### Which JavaScript canvas library should I use?

It depends on your use case:

- **Konva.js** — Best for interactive 2D canvas applications (design editors, annotation tools, diagrams, interactive maps, dashboards). Has the best framework integration (React, Vue, Svelte, Angular) and the most comprehensive drag-and-drop and event system.
- **PixiJS** — Best for WebGL-powered 2D games and high-frame-rate rendering. Uses WebGL for GPU acceleration.
- **Fabric.js** — Good for image editing and manipulation tools. Similar feature set to Konva but without official framework bindings.
- **Paper.js** — Best for vector graphics, mathematical art, and path manipulation.
- **p5.js** — Best for creative coding, generative art, and educational purposes.

For a detailed comparison, see our [Canvas Library Comparison Guide](/docs/guides/best-canvas-library.html). See also [Why Konva?](/docs/guides/why-konva.html) for a deeper look at what Konva is (and isn't) designed for.

### How do I use canvas with React?

Use [`react-konva`](https://github.com/konvajs/react-konva), the official React binding for Konva.js:

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

`react-konva` provides declarative React components for all Konva shapes, with full support for React state, props, and event handling.

[Read the full React tutorial →](/docs/react/index.html)

### How do I use canvas with Vue?

Use [`vue-konva`](https://github.com/konvajs/vue-konva):

```bash
npm install vue-konva konva
```

[Read the full Vue tutorial →](/docs/vue/index.html)

### How do I use canvas with Svelte?

Use [`svelte-konva`](https://github.com/konvajs/svelte-konva):

```bash
npm install svelte-konva konva
```

[Read the full Svelte tutorial →](/docs/svelte/index.html)

### How do I use canvas with Angular?

Use [`ng2-konva`](https://github.com/konvajs/ng2-konva):

```bash
npm install ng2-konva konva
```

[Read the full Angular tutorial →](/docs/angular/index.html)

### Konva vs Fabric.js — which should I choose?

Both are 2D Canvas frameworks, but they differ in key areas:

- **Framework support**: Konva has official React, Vue, Svelte, and Angular bindings. Fabric.js has no official framework bindings.
- **Architecture**: Konva uses a multi-layer approach (each Layer is a separate canvas) for better rendering performance. Fabric.js uses a single canvas.
- **Drag and drop**: Both have built-in drag-and-drop. Konva's event system supports event bubbling and delegation.
- **TypeScript**: Both ship with TypeScript definitions.

Choose Konva for interactive applications, especially with React/Vue/Svelte. Choose Fabric.js if you need its specific image manipulation features.

[Read the full comparison →](/docs/guides/best-canvas-library.html)

### Konva vs PixiJS — which should I choose?

They serve different purposes:

- **Konva** uses the 2D Canvas API with an object-oriented approach. Best for interactive applications, UI elements, design editors, annotation tools.
- **PixiJS** uses WebGL for GPU-accelerated rendering. Best for 2D games, animations with thousands of moving sprites, and high-frame-rate graphics.

If you're building an app with UI interactions (click, drag, resize, hover), choose Konva. If you're building a game with many animated sprites, choose PixiJS.

[Read the full comparison →](/docs/guides/best-canvas-library.html)

### Does Konva support TypeScript?

Yes. Konva ships with built-in TypeScript type definitions. No additional `@types` package is needed. Simply install `konva` and TypeScript will pick up the types automatically:

```bash
npm install konva
```

The same applies to `react-konva`, `vue-konva`, and other official bindings.

### Can Konva handle thousands of shapes?

Yes, with proper optimization. Key techniques:

1. **Layer management** — Use multiple layers to separate static and dynamic content
2. **Shape caching** — Cache complex shapes with `shape.cache()` to render them as images
3. **Disable listening** — Set `listening: false` on shapes that don't need events
4. **Let Konva redraw** — Since Konva 8 redraws are automatic and batched, so `layer.draw()` and `layer.batchDraw()` calls after a change are [not needed](/docs/performance/Batch_Draw.html)
5. **Disable perfect drawing** — Set `perfectDrawEnabled: false` for shapes with both fill and stroke

Konva has demos rendering [10,000 shapes](/docs/sandbox/10000_Shapes_with_Tooltip.html) and [20,000 nodes](/docs/sandbox/20000_Nodes.html).

[Read all performance tips →](/docs/performance/All_Performance_Tips.html)

### Does Konva work on mobile?

Yes. Konva fully supports mobile browsers with:

- Touch events: `tap`, `dbltap`, `touchstart`, `touchmove`, `touchend`
- Multi-touch gestures (pinch to zoom, two-finger rotate)
- Responsive canvas sizing
- Touch-based drag and drop

[Read the mobile events tutorial →](/docs/events/Mobile_Events.html)

### Can I use Konva with Node.js?

Yes. Konva supports server-side rendering using the [`canvas`](https://www.npmjs.com/package/canvas) npm package:

```bash
npm install konva canvas
```

This allows you to generate images on the server, create thumbnails, or run canvas operations in Node.js without a browser.

[Read the Node.js tutorial →](/docs/nodejs/nodejs-setup)

### How do I export canvas to an image or PDF?

**Image export:**
```javascript
const dataURL = stage.toDataURL({ pixelRatio: 2 }); // PNG by default
const jpegURL = stage.toDataURL({ mimeType: 'image/jpeg', quality: 0.8 });
```

**PDF export** is possible using third-party libraries like jsPDF. See the [Canvas to PDF demo](/docs/sandbox/Canvas_to_PDF.html).

[Read the export tutorial →](/docs/data_and_serialization/High-Quality-Export.html)

### How do I implement drag and drop?

Set `draggable: true` on any shape:

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

Konva supports drag boundaries, snap-to-grid, drop events, and drag-and-drop between layers.

[Read the drag and drop tutorial →](/docs/drag_and_drop/Drag_and_Drop.html)

### Is Konva still actively maintained?

Yes. Konva is actively maintained with regular releases. Check the [changelog](https://github.com/konvajs/konva/blob/master/CHANGELOG.md) for recent updates and the [GitHub repository](https://github.com/konvajs/konva) for ongoing development activity.
