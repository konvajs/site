---
title: 如何在 SvelteKit 中使用 svelte-konva？
sidebar_label: SvelteKit
hide_table_of_contents: true
slug: SvelteKit.html
description: "了解如何通过 browser 检查或动态导入，在 SvelteKit SSR 和预渲染中使用 svelte-konva。"
---

通常，svelte-konva 是仅供客户端使用的库。在预渲染组件和服务端渲染（SSR）组件中使用 svelte-konva 或 Konva 功能时，需要特别处理。预渲染和 SSR 在 Node.js 环境中执行。如果在此上下文中使用任何 svelte-konva 功能，服务器会引发以下错误：

> Error: svelte-konva: Library can only be used in a browser context but is currently used in a server environment.

此问题有多种解决方法：

### 使用 browser 检查包裹 svelte-konva 组件

一种基本方法是使用 SvelteKit browser 检查包裹所有 svelte-konva 代码。只建议在小型项目中使用此方法，因为大量 if 块会很快变得混乱。对于较大的项目，请使用后文介绍的动态导入。

```html
<script>
  import { browser } from "$app/environment";
  import { Stage, Layer, Rect } from "svelte-konva";
</script>

{#if browser}
<Stage width="{1000}" height="{1000}">
  <Layer>
    <Rect x="{100}" y="{100}" width="{400}" height="{200}" fill="blue" />
  </Layer>
</Stage>
{/if}
```

### 动态导入 svelte-konva 舞台：

更好的方法是仅在客户端动态导入 svelte-konva Canvas。假设有一个 Svelte 组件，其中的舞台包含多个 svelte-konva 组件：

_MyCanvas.svelte_

```html
<script>
  import { Stage, Layer, Rect } from "svelte-konva";
  import OtherComponentUsingSvelteKonva from "./OtherComponentUsingSvelteKonva.svelte";

  const rectangleConfig = {
    /*...*/
  };
</script>

<Stage width="{1000}" height="{1000}">
  <Layer>
    <Rect {...rectangleConfig} />

    <OtherComponentUsingSvelteKonva />
  </Layer>
</Stage>
```

要在 SvelteKit 预渲染或 SSR 页面中使用此组件，可以在 `onMount()` 中动态导入。然后在组件定义完成后进行渲染：

_+page.svelte_

```html
<script>
  import { browser } from "$app/environment";

  const MyCanvas = browser
    ? import("./MyCanvas.svelte").then((module) => module.default)
    : new Promise(() => {});
</script>

<div>
  <p>This is my fancy server side rendered (or prerendered) page.</p>

  <!-- Use your dynamically imported svelte-konva canvas component once it becomes defined, you can pass any component props as usual -->
  {#await MyCanvas}
  <p>Loading...</p>
  {:then Component}
  <Component someProp="someString" />
  {:catch error}
  <p>Something went wrong: {error.message}</p>
  {/await}
</div>
```

操作说明：此 SvelteKit 应用中的每个可用页面都使用不同的渲染方式，并包含一个 `svelte-konva` Canvas。示例展示了两种动态导入方法。预渲染页面通过 SvelteKit browser 检查仅在客户端使用 Canvas，SSR 页面则动态导入 svelte-konva Canvas。检查每次导航产生的网络请求，以了解 SvelteKit 中不同的渲染方法。

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/new/svelte-demos/sveltekit?file=/src/routes/%2Bpage.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
