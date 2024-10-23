title: How to use svelte-konva with SvelteKit?
layout: svelte_page

---

Generally, svelte-konva is a client-side only library. When using SvelteKit, special care needs to be taken if svelte-konva/Konva functionality is used on prerendered and server side rendered (SSR) components. Prerendering and SSR happens in a Node.js environment which causes Konva to require the [canvas](https://www.npmjs.com/package/canvas) library as Konva can also be used in Node.js environments. When you use svelte-konva in such conditions you'll likely run into the following error:

> Error: Cannot find module 'canvas'

There are multiple solutions to this problem:

### Installing canvas:

Simplest solution is to install canvas:

```npm
npm i canvas
```

This will satisfy the canvas dependency of Konva and you can use svelte-konva components in prerendered and SSR SvelteKit pages. The solution is a bit messy though, as you now have installed a package you don't really need which adds unnecessary overhead. Alternatively use one of the following solutions:

### Dynamically import your svelte-konva stage:

A better approach is to dynamically import your svelte-konva canvas on the client-side only. Suppose you have a Svelte component containing your stage with various svelte-konva components:

_MyCanvas.svelte_

```html
<script>
  import { Stage, Layer, Rect } from 'svelte-konva';
  import OtherComponentUsingSvelteKonva from './OtherComponentUsingSvelteKonva.svelte';

  const rectangleConfig = {
    /*...*/
  };
</script>

<Stage config={{ width: 1000, height: 1000 }}>
  <Layer>
    <Rect bind:config={rectangleConfig} />

    <OtherComponentUsingSvelteKonva />
  </Layer>
</Stage>
```

To use this component inside a SvelteKit prerendered/SSR page you can dynamically import it inside `onMount()` and render it using `<svelte:component>`:

_+page.svelte_

```html
<script>
  import { onMount } from 'svelte';
  // typescript:
  // import type MyCanvasComponent from '$lib/MyCanvas.svelte';

  let MyCanvas;
  // typescript:
  // let MyCanvas: typeof MyCanvasComponent;

  onMount(async () => {
    // Dynamically import your canvas component encapsulating all svelte-konva functionality inside onMount()
    MyCanvas = (await import('$lib/MyCanvas.svelte')).default;
  });
</script>

<div>
  <p>This is my fancy server side rendered (or prerendered) page.</p>

  <!-- Use your dynamically imported svelte-konva canvas component with a svelte:component block, you can pass any component props as usual -->
  <svelte:component this={MyCanvas} someProp="SomeString" />
</div>
```

### Dynamically import svelte-konva using vite:

The [vite-plugin-iso-import](https://www.npmjs.com/package/vite-plugin-iso-import) allows you to make client-side only imports without needing the manual approach in `onMount()` described above. Please follow the installation instructions in the [README](https://www.npmjs.com/package/vite-plugin-iso-import) then you can dynamically import your component like so:

_+page.svelte_

```html
<script>
  import MyCanvasComponent from '$lib/MyCanvas.svelte?client'; // Client-side only import

  // Set component variable to null if page is rendered in SSR, otherwise use client-side only import
  let MyCanvas = import.meta.env.SSR ? null : MyCanvasComponent;
</script>

<div>
  <p>This is my fancy server side rendered (or prerendered) page.</p>

  <!-- Use your dynamically imported svelte-konva canvas component with a svelte:component block, you can pass any component props as usual -->
  <svelte:component this={MyCanvas} someProp="SomeString" />
</div>
```

Currently vite-plugin-iso-import cannot automatically fix intellisense inside .svelte files with TypeScript. Consult the [README](https://www.npmjs.com/package/vite-plugin-iso-import) for a workaround to this problem. Or have a look at the demo below.


Instructions: Each page available in this SvelteKit App is rendered differently containing a `svelte-konva` canvas. Both dynamic import approaches are shown. Dynamic loading using `onMount()` on the prerendered page and dynamic loading with [vite-plugin-iso-import](https://www.npmjs.com/package/vite-plugin-iso-import) on the SSR page. Try to inspect the network requests made on each navigation to understand the different approaches of rendering in SvelteKit.

<iframe 
  src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/sveltekit?file=/src/routes/%2Bpage.svelte" 
  style={{
    width: "100%",
    height: "800px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
