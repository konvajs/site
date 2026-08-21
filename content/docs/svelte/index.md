---
title: Getting started with Svelte and canvas via Konva
sidebar_label: Getting Started
hide_table_of_contents: true
slug: index.html
description: "Get started with svelte-konva, the official Svelte binding for Konva.js. Draw shapes, handle events, and build interactive canvas applications with Svelte components."
---

## How to use canvas with Svelte?

[svelte-konva](https://github.com/konvajs/svelte-konva) is a JavaScript library for drawing complex canvas graphics using Svelte. It provides declarative and reactive bindings to the [Konva Framework](https://konvajs.org/). All `svelte-konva` components correspond to `Konva` components of the same name. All the parameters available for `Konva` objects can be added as individual props for corresponding `svalte-konva` components.

In order to use svelte-konva a basic understanding of `Konva` is required. You can consult the [Konva overview](https://konvajs.org/docs/overview.html) for that.

## Quick Start

### 1 Install via npm

```npm
npm i svelte-konva konva
```

### 2 Import and use svelte konva components

```js
<script>
  import { Stage, Layer, Rect } from 'svelte-konva';
</script>

<Stage width={window.innerWidth} height={window.innerHeight}>
  <Layer>
    <Rect x={100} y={100} width={400} height={200} fill="blue" />
  </Layer>
</Stage>
```

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/basic_demo?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
