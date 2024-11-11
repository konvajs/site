---
title: HTML5 Canvas Shadows Tutorial
sidebar_label: Shadow
hide_table_of_contents: true
slug: Shadow.html
---

To apply shadows with Konva, we can set the `shadowColor`, `shadowOffset`, `shadowBlur`, and `shadowOpacity` properties when we instantiate a shape.

We can adjust the shadow properties after instantiation by using the `shadowColor()`, `shadowOffset()`, `shadowBlur()`, and `shadowOpacity()` methods.

Instructions: Mouseover the star to change its shadow properties.

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

var star = new Konva.Star({
    x: stage.width() / 2,
    y: stage.height() / 2,
    numPoints: 5,
    innerRadius: 30,
    outerRadius: 70,
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 4,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: { x: 5, y: 5 },
    shadowOpacity: 0.5,
});

star.on('mouseover', function () {
    this.shadowColor('red');
    this.shadowBlur(20);
    this.shadowOffset({ x: 10, y: 10 });
    this.shadowOpacity(0.8);
});

star.on('mouseout', function () {
    this.shadowColor('black');
    this.shadowBlur(10);
    this.shadowOffset({ x: 5, y: 5 });
    this.shadowOpacity(0.5);
});

layer.add(star);
stage.add(layer);
```

  </TabItem>
  <TabItem value="React">

```jsx live react
import React, { useState } from 'react';
import { Stage, Layer, Star } from 'react-konva';

const App = () => {
  const [shadow, setShadow] = useState({
    color: 'black',
    blur: 10,
    offset: { x: 5, y: 5 },
    opacity: 0.5,
  });
  const [cursor, setCursor] = useState('default');

  const handleMouseEnter = () => {
    setShadow({
      color: 'red',
      blur: 20,
      offset: { x: 10, y: 10 },
      opacity: 0.8,
    });
    setCursor('pointer');
  };

  const handleMouseLeave = () => {
    setShadow({
      color: 'black',
      blur: 10,
      offset: { x: 5, y: 5 },
      opacity: 0.5,
    });
    setCursor('default');
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} style={{ cursor: cursor }}>
      <Layer>
        <Star
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          numPoints={5}
          innerRadius={30}
          outerRadius={70}
          fill="yellow"
          stroke="black"
          strokeWidth={4}
          shadowColor={shadow.color}
          shadowBlur={shadow.blur}
          shadowOffset={shadow.offset}
          shadowOpacity={shadow.opacity}
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
      <v-star
        :config="{
          x: stageSize.width / 2,
          y: stageSize.height / 2,
          numPoints: 5,
          innerRadius: 30,
          outerRadius: 70,
          fill: 'yellow',
          stroke: 'black',
          strokeWidth: 4,
          shadowColor: shadow.color,
          shadowBlur: shadow.blur,
          shadowOffset: shadow.offset,
          shadowOpacity: shadow.opacity,
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
      shadow: {
        color: 'black',
        blur: 10,
        offset: { x: 5, y: 5 },
        opacity: 0.5,
      },
      cursor: 'default',
    };
  },
  methods: {
    onMouseEnter() {
      this.shadow = {
        color: 'red',
        blur: 20,
        offset: { x: 10, y: 10 },
        opacity: 0.8,
      };
      this.cursor = 'pointer';
    },
    onMouseLeave() {
      this.shadow = {
        color: 'black',
        blur: 10,
        offset: { x: 5, y: 5 },
        opacity: 0.5,
      };
      this.cursor = 'default';
    },
  },
};
</script>
```

  </TabItem>
</Tabs>

<!-- {% iframe /downloads/code/styling/Shadow.html %} -->

<!-- {% include_code Konva Shadows Demo styling/Shadow.html %} -->
