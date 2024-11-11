---
title: HTML5 Canvas Set Shape Stroke Color and Width Tutorial
sidebar_label: Stroke
hide_table_of_contents: true
slug: Stroke.html
---

To set a shape stroke and stroke width with Konva, we can set the `stroke` and `strokeWidth` properties when we instantiate a shape, or we can use the `stroke()` and `strokeWidth()` methods.

Instructions: Mouseover the pentagon to change its stroke color and width.

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
});

pentagon.on('mouseover', function () {
    this.stroke('blue');
    this.strokeWidth(20);
});

pentagon.on('mouseout', function () {
    this.stroke('black');
    this.strokeWidth(4);
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
  const [stroke, setStroke] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [cursor, setCursor] = useState('default');

  const handleMouseEnter = () => {
    setStroke('blue');
    setStrokeWidth(20);
    setCursor('pointer');
  };

  const handleMouseLeave = () => {
    setStroke('black');
    setStrokeWidth(4);
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
          stroke={stroke}
          strokeWidth={strokeWidth}
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
      cursor: 'default',
    };
  },
  methods: {
    onMouseEnter() {
      this.strokeColor = 'blue';
      this.strokeWidth = 20;
      this.cursor = 'pointer';
    },
    onMouseLeave() {
      this.strokeColor = 'black';
      this.strokeWidth = 4;
      this.cursor = 'default';
    },
  },
};
</script>
```

  </TabItem>
</Tabs>
