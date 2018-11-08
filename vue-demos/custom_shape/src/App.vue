<template>
    <v-stage ref="stage" :config="stageSize">
      <v-layer>
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.beginPath();
          context.moveTo(20, 50);
          context.lineTo(220, 80);
          context.quadraticCurveTo(150, 100, 260, 170);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4
      }"/>
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

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