<template>
  <div>
    <v-stage ref="stage" :config="stageSize">
      <v-layer>
      <v-text :config="{text: 'Some text on canvas', fontSize: 15}"/>
      <v-rect :config="{
          x: 20,
          y: 50,
          width: 100,
          height: 100,
          fill: 'red',
          shadowBlur: 10
        }"
      />
      <v-circle :config="{
          x: 200,
          y: 100,
          radius: 50,
          fill: 'green'
        }"
      />
      <v-line :config="{
        x: 20,
        y: 200,
        points: [0, 0, 100, 0, 100, 100],
        tension: 0.5,
        closed: true,
        stroke: 'black',
        fillLinearGradientStartPoint: { x: -50, y: -50 },
        fillLinearGradientEndPoint: { x: 50, y: 50 },
        fillLinearGradientColorStops: [0, 'red', 1, 'yellow']
      }"/>
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
let vm = {};
export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      }
    };
  }
};
</script>