---
title: HTML5 Canvas Set Shape Opacity Tutorial
sidebar_label: Opacity
hide_table_of_contents: true
slug: Opacity.html
---

To set a shape opacity with Konva, we can set the `opacity` property when we instantiate the node, or we can use the `opacity()` method.

Shapes can have an opacity value between 0 and 1, where 0 is fully transparent, and 1 is fully opaque.  Unless otherwise specified, all shapes are defaulted with an opacity value of 1.

If you want to apply transparency for several shapes without seen overlapping areas, take a look into [Transparent Group Demo](/docs/sandbox/Transparent_Group.html)

Instructions: Mouseover the pentagon to change its opacity.

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="Vanilla" default>

```js live vanilla
import Konva from 'konva';

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});
var layer = new Konva.Layer();

var pentagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    opacity: 0.5,
});

pentagon.on('mouseover', function () {
    this.opacity(1);
});

pentagon.on('mouseout', function () {
    this.opacity(0.5);
});

// add the shape to the layer
layer.add(pentagon);

// add the layer to the stage
stage.add(layer);
```

  </TabItem>
  <TabItem value="React">

```jsx live react
import React, { useState } from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';

const App = () => {
  const [opacity, setOpacity] = useState(0.5);
  const [cursor, setCursor] = useState('default');

  const handleMouseEnter = () => {
    setOpacity(1);
    setCursor('pointer');
  };

  const handleMouseLeave = () => {
    setOpacity(0.5);
    setCursor('default');
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} style={{ cursor: cursor }}>
      <Layer>
        <RegularPolygon
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          sides={5}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
          opacity={opacity}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Layer>
    </Stage>
  );
};

export default App;
```

  </TabItem>
  <TabItem value="Vue">

```vue live vue
<template>
  <v-stage :config="stageSize" :style="{ cursor: cursor }">
    <v-layer>
      <v-regular-polygon
        :config="{
          x: stageSize.width / 2,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fill: 'red',
          stroke: 'black',
          strokeWidth: 4,
          opacity: opacity,
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
      opacity: 0.5,
      cursor: 'default',
    };
  },
  methods: {
    onMouseEnter() {
      this.opacity = 1;
      this.cursor = 'pointer';
    },
    onMouseLeave() {
      this.opacity = 0.5;
      this.cursor = 'default';
    },
  },
};
</script>
```

  </TabItem>
</Tabs>