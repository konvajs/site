// Workaround for vite-plugin-iso-import (see: https://github.com/bluwy/vite-plugin-iso-import readme)

// default export
declare module '$lib/canvas/KonvaCanvas.svelte?client' {
  import all from '$lib/canvas/KonvaCanvas.svelte'
  export = all
}

// fallback
declare module '*?client'
declare module '*?server'