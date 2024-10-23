title: HTML5 Canvas Set Shape Stroke Color and Width Tutorial
sidebar_label: Stroke
hide_table_of_contents: true
slug: /docs/styling/Stroke.html
---

To set a shape stroke and stroke width with Konva, we can set the `stroke` and `strokeWidth` properties when we instantiate a shape, or we can use the `stroke()` and `strokeWidth()` methods.

Instructions: Mouseover the pentagon to change its stroke color and width.

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="Vanilla" default>

```js live vanilla
// ... (code from code/styling/Stroke.html)
```

  </TabItem>
  <TabItem value="React">

```jsx live
import React from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RegularPolygon
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          sides={5}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
          onMouseEnter={(e) => {
            e.target.stroke('blue');
            e.target.strokeWidth(20);
            e.target.getStage().container().style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            e.target.stroke('black');
            e.target.strokeWidth(4);
            e.target.getStage().container().style.cursor = 'default';
          }}
        />
      </Layer>
    </Stage>
  );
};

export default App;
```

  </TabItem>
  <TabItem value="Vue">

```vue live
<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-regular-polygon
        :config="{
          x: stageSize.width / 2,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fill: 'red',
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      />
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  data() {
    return {
      stageSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      strokeColor: 'black',
      strokeWidth: 4,
    };
  },
  methods: {
    onMouseEnter(e) {
      this.strokeColor = 'blue';
      this.strokeWidth = 20;
      e.target.getStage().container().style.cursor = 'pointer';
    },
    onMouseLeave(e) {
      this.strokeColor = 'black';
      this.strokeWidth = 4;
      e.target.getStage().container().style.cursor = 'default';
    },
  },
};
</script>
```

  </TabItem>
</Tabs>
