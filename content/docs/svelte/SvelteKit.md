---
title: How to use svelte-konva with SvelteKit?
sidebar_label: SvelteKit
hide_table_of_contents: true
slug: SvelteKit.html
description: "Learn how to use svelte-konva with SvelteKit SSR and prerendering using browser checks or dynamic imports."
---

Generally, svelte-konva is a client-side only library. When using SvelteKit, special care needs to be taken if svelte-konva/Konva functionality is used on prerendered and server side rendered (SSR) components. Prerendering and SSR happens in a Node.js environment. In case you use any svelte-konva functionality in such a context it will throw an error on the server:

> Error: svelte-konva: Library can only be used in a browser context but is currently used in a server environment.

There are multiple solutions to this problem:

### Wrap your svelte-konva Components into browser checks

A rudimental solution is to wrap all your svelte-konva code into SvelteKit browser checks. This is only recommended in case your project is small as all the if-blocks can get messy quickly. For larger projects use dynamic imports outlined below.

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

### Dynamically import your svelte-konva stage:

A better approach is to dynamically import your svelte-konva canvas on the client-side only. Suppose you have a Svelte component containing your stage with various svelte-konva components:

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

To use this component inside a SvelteKit prerendered/SSR page you can dynamically import it inside `onMount()` and render it once it becomes defined:

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

Instructions: Each page available in this SvelteKit App is rendered differently containing a `svelte-konva` canvas. Both dynamic import approaches are shown. Client-side only use of the canvas using SvelteKit browser checks on the prerendered page and dynamic importing of the svelte-konva canvas on the SSR page. Try to inspect the network requests made on each navigation to understand the different approaches of rendering in SvelteKit.

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/sveltekit?file=/src/routes/%2Bpage.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
