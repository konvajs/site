---
title: HTML5 Canvas Shape select, resize and rotate
sidebar_label: Transform and Select
hide_table_of_contents: true
slug: Basic_demo.html
---

`Transformer` is a special kind of `Konva.Group`. It allows you easily resize and rotate any node or set of nodes.

To enable it you need to:

1. Create new instance with `new Konva.Transformer()`
2. Add it to layer
3. attach to node with `transformer.nodes([shape]);`
4. Update the layer with `layer.batchDraw()`

_Note:_ Transforming tool is not changing `width` and `height` properties of nodes when you resize them. Instead it changes `scaleX` and `scaleY` properties.

**Instructions: Try to resize and rotate shapes. Click on empty area to remove selection. Use SHIFT or CTRL to add/remove shapes into/from selection. Try to select area on a canvas.**

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="Vanilla" default>
```js live vanilla
// Code from old_code/select_and_transform/Basic_demo.html should go here
```
  </TabItem>
  <TabItem value="React">
```js live react
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { useState, useEffect } from 'react';

const App = () => {
const [selectedIds, setSelectedIds] = useState([]);

return (
<Stage
width={window.innerWidth}
height={window.innerHeight}
onMouseDown={(e) => {
// deselect when clicked on empty area
const clickedOnEmpty = e.target === e.target.getStage();
if (clickedOnEmpty) {
setSelectedIds([]);
}
}} >
<Layer>
{/_ Shapes go here _/}
{selectedIds.length > 0 && <Transformer />}
</Layer>
</Stage>
);
};

export default App;

````
  </TabItem>
  <TabItem value="Vue">
```js live vue
<template>
  <v-stage
    :config="stageSize"
    @mousedown="checkDeselect"
  >
    <v-layer>
      <v-rect
        v-for="shape in shapes"
        :key="shape.id"
        :config="shape"
        @transformend="handleTransformEnd"
      />
      <v-transformer
        v-if="selectedIds.length"
        :config="transformerConfig"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const selectedIds = ref([]);
const shapes = ref([]); // Add your shapes here

const checkDeselect = (e) => {
  const clickedOnEmpty = e.target === e.target.getStage();
  if (clickedOnEmpty) {
    selectedIds.value = [];
  }
};
</script>
````

  </TabItem>
</Tabs>
