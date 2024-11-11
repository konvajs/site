---
title: HTML5 Canvas Set Fill Tutorial
sidebar_label: Fill
hide_table_of_contents: true
slug: Fill.html
---

To fill a shape with Konva, we can set the fill property when we instantiate a shape, or we can use the `fill()` method.

Konva supports colors, patterns, linear gradients, and radial gradients.

Instructions: Mouseover each pentagon to change its fill. You can also drag and drop the shapes.

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="Vanilla" default>

```js live vanilla
// ... (code from code/styling/Fill.html)
```

  </TabItem>
  <TabItem value="React">

```jsx live react use-image
import React from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import useImage from 'use-image';

const App = () => {
  const [darthVader] = useImage('https://konvajs.org/assets/darth-vader.jpg');
  const [yoda] = useImage('https://konvajs.org/assets/yoda.jpg');
  const [isPointer, setIsPointer] = React.useState(false);
  const stageRef = React.useRef(null);

  const commonProps = {
    sides: 5,
    radius: 30,
    stroke: 'black',
    strokeWidth: 4,
    draggable: true,
  };

  React.useEffect(() => {
    if (stageRef.current) {
      stageRef.current.getStage().container().style.cursor = isPointer ? 'pointer' : 'default';
    }
  }, [isPointer]);

  const ColorPolygon = () => {
    const [fill, setFill] = React.useState('red');
    return (
      <RegularPolygon
        {...commonProps}
        x={80}
        y={window.innerHeight / 2}
        fill={fill}
        onMouseEnter={() => {
          setFill('blue');
          setIsPointer(true);
        }}
        onMouseLeave={() => {
          setFill('red');
          setIsPointer(false);
        }}
      />
    );
  };

  const PatternPolygon = () => {
    const [image, setImage] = React.useState(darthVader);
    const [offset, setOffset] = React.useState({ x: -220, y: 70 });
    return (
      <RegularPolygon
        {...commonProps}
        x={220}
        y={window.innerHeight / 2}
        fillPatternImage={image}
        fillPatternOffset={offset}
        onMouseEnter={() => {
          setImage(yoda);
          setOffset({ x: -100, y: 70 });
          setIsPointer(true);
        }}
        onMouseLeave={() => {
          setImage(darthVader);
          setOffset({ x: -220, y: 70 });
          setIsPointer(false);
        }}
      />
    );
  };

  const LinearGradientPolygon = () => {
    const [colorStops, setColorStops] = React.useState([0, 'red', 1, 'yellow']);
    return (
      <RegularPolygon
        {...commonProps}
        x={360}
        y={window.innerHeight / 2}
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={colorStops}
        onMouseEnter={() => {
          setColorStops([0, 'green', 1, 'yellow']);
          setIsPointer(true);
        }}
        onMouseLeave={() => {
          setColorStops([0, 'red', 1, 'yellow']);
          setIsPointer(false);
        }}
      />
    );
  };

  const RadialGradientPolygon = () => {
    const [colorStops, setColorStops] = React.useState([0, 'red', 0.5, 'yellow', 1, 'blue']);
    return (
      <RegularPolygon
        {...commonProps}
        x={500}
        y={window.innerHeight / 2}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndRadius={70}
        fillRadialGradientColorStops={colorStops}
        onMouseEnter={() => {
          setColorStops([0, 'red', 0.5, 'yellow', 1, 'green']);
          setIsPointer(true);
        }}
        onMouseLeave={() => {
          setColorStops([0, 'red', 0.5, 'yellow', 1, 'blue']);
          setIsPointer(false);
        }}
      />
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
      <Layer>
        <ColorPolygon />
        <PatternPolygon />
        <LinearGradientPolygon />
        <RadialGradientPolygon />
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
  <v-stage :config="stageSize">
    <v-layer>
      <v-regular-polygon
        :config="{
          x: 80,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fill: colorFill,
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
        }"
        @mouseenter="onColorEnter"
        @mouseleave="onColorLeave"
      />
      <v-regular-polygon
        :config="{
          x: 220,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fillPatternImage: patternImage,
          fillPatternOffset: patternOffset,
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
        }"
        @mouseenter="onPatternEnter"
        @mouseleave="onPatternLeave"
      />
      <v-regular-polygon
        :config="{
          x: 360,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fillLinearGradientStartPoint: { x: -50, y: -50 },
          fillLinearGradientEndPoint: { x: 50, y: 50 },
          fillLinearGradientColorStops: linearGradientStops,
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
        }"
        @mouseenter="onLinearGradientEnter"
        @mouseleave="onLinearGradientLeave"
      />
      <v-regular-polygon
        :config="{
          x: 500,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fillRadialGradientStartPoint: { x: 0, y: 0 },
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: { x: 0, y: 0 },
          fillRadialGradientEndRadius: 70,
          fillRadialGradientColorStops: radialGradientStops,
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
        }"
        @mouseenter="onRadialGradientEnter"
        @mouseleave="onRadialGradientLeave"
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
      colorFill: 'red',
      patternImage: null,
      patternOffset: { x: -220, y: 70 },
      linearGradientStops: [0, 'red', 1, 'yellow'],
      radialGradientStops: [0, 'red', 0.5, 'yellow', 1, 'blue'],
      images: {},
    };
  },
  mounted() {
    this.loadImages();
  },
  methods: {
    loadImages() {
      const sources = {
        darthVader: '/assets/darth-vader.jpg',
        yoda: '/assets/yoda.jpg',
      };

      Object.keys(sources).forEach((src) => {
        const image = new Image();
        image.onload = () => {
          this.images[src] = image;
          if (src === 'darthVader') {
            this.patternImage = image;
          }
        };
        image.src = sources[src];
      });
    },
    onColorEnter(e) {
      this.colorFill = 'blue';
      e.target.getStage().container().style.cursor = 'pointer';
    },
    onColorLeave(e) {
      this.colorFill = 'red';
      e.target.getStage().container().style.cursor = 'default';
    },
    onPatternEnter(e) {
      this.patternImage = this.images.yoda;
      this.patternOffset = { x: -100, y: 70 };
      e.target.getStage().container().style.cursor = 'pointer';
    },
    onPatternLeave(e) {
      this.patternImage = this.images.darthVader;
      this.patternOffset = { x: -220, y: 70 };
      e.target.getStage().container().style.cursor = 'default';
    },
    onLinearGradientEnter(e) {
      this.linearGradientStops = [0, 'green', 1, 'yellow'];
      e.target.getStage().container().style.cursor = 'pointer';
    },
    onLinearGradientLeave(e) {
      this.linearGradientStops = [0, 'red', 1, 'yellow'];
      e.target.getStage().container().style.cursor = 'default';
    },
    onRadialGradientEnter(e) {
      this.radialGradientStops = [0, 'red', 0.5, 'yellow', 1, 'green'];
      e.target.getStage().container().style.cursor = 'pointer';
    },
    onRadialGradientLeave(e) {
      this.radialGradientStops = [0, 'red', 0.5, 'yellow', 1, 'blue'];
      e.target.getStage().container().style.cursor = 'default';
    },
  },
};
</script>
```

  </TabItem>
</Tabs>
