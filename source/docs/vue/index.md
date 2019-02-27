title: Getting started with vue and canvas via Konva
layout: vue_page
---

# How to use canvas with Vue?

![VueKonva Logo](https://github.com/rafaesc/vue-konva/raw/master/vue-konva.png)

Vue Konva is a JavaScript library for drawing complex canvas graphics using Vue.

It provides declarative and reactive bindings to the [Konva Framework](https://konvajs.org/).

All `vue-konva` components correspond to `Konva` components of the same name with the prefix 'v-'. All the parameters available for `Konva` objects can add as `config` in the prop for corresponding `vue-konva` components.

Core shapes are: v-rect, v-circle, v-ellipse, v-line, v-image, v-text, v-text-path, v-star, v-label, SVG Path, v-regular-polygon.
Also you can create custom shape.

To get more info about `Konva` you can read [Konva Overview](https://konvajs.org/docs/overview.html).


## Quick Start

[Vue.js](https://vuejs.org) version 2.4+ is required.

### 1 Install via npm
```npm
npm install vue-konva konva --save
```

### 2 Import and use VueKonva

```javascript
import Vue from 'vue';
import VueKonva from 'vue-konva'

Vue.use(VueKonva)
```

### 3 Reference in your component templates
```html
<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle :config="configCircle"></v-circle>
    </v-layer>
  </v-stage>
</template>
```
```javascript
<script>
export default {
  data() {
    return {
      configKonva: {
        width: 200,
        height: 200
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    };
  }
};

</script>
```

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/vue-demos/basic_demo?hidenavigation=1&view=split&fontsize=10&module=%2Fsrc%2FApp.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Or use a CDN
```html
<html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
    <meta http-equiv='x-ua-compatible' content='ie=edge'>
  </head>
  <body>
    <div id='app'>
      <v-stage ref="stage" :config="configKonva">
        <v-layer ref="layer">
          <v-circle :config="configCircle"></v-circle>
        </v-layer>
      </v-stage>
    </div>
    <!--1. Link Vue Javascript & Konva-->
    <script src='https://unpkg.com/vue/dist/vue.js'></script>
    <script src='https://unpkg.com/konva@3.1.2/konva.min.js'></script>
    <!--2. Link VueKonva Javascript (Plugin automatically installed)-->
    <script src='./lib/vue-konva.min.js'></script>
    <script>
      // 3. Create the Vue instance
      new Vue({
        el: '#app',
        data: {
          configKonva: {
            width: 200,
            height: 200
          },
          configCircle: {
            x: 100,
            y: 100,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
          }
        }
      })
    </script>
  </body>
</html>
```