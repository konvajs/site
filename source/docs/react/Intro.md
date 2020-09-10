title: react-konva - declarative canvas components for React
layout: react_page
---

```bash
npm install react-konva konva
```



<div class="features">
  <div class="feature"><img src="/assets/features/undraw_abstract_x68e.svg" />
    <h3 class="desc">All common shapes for graphical applications</h3>
  </div>
  <div class="feature"><img src="/assets/features/undraw_file_sync_ot38.svg" />
    <h3 class="desc">Support for desktop and mobile devices</h3>
  </div>
  <div class="feature"><img src="/assets/features/undraw_fitting_pieces_cli3.svg" />
    <h3 class="desc">Node nesting, grouping and event bubbling</h3>
  </div>
  <div class="feature"><img src="/assets/features/undraw_image_viewer_wxce.svg" />
    <h3 class="desc">Hight quality exports into data URLs, image data, or image objects</h3>
  </div>
</div>

## How it looks?

```js
import { Stage, Layer, Rect, Circle } from 'react-konva';

export const App = () => {
  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={50} height={50} fill="red" />
        <Circle x={200} y={200} stroke="black" radius={50} />
      </Layer>
    </Stage>
  );
}
```

## Demo

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/basic_demo?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<div id="intro-btn-wrap" style="margin-bottom: 50px"><a id="intro-btn" href="/docs/react/index.html">Get Started</a></div>