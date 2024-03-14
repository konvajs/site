<template>
    <v-stage ref="stage" :config="stageSize">
      <v-layer>
        <v-shape :config="{
        width: 260,
        height: 170,
        sceneFunc: function (context, shape) {
          const width = shape.width();
          const height = shape.height();
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(width - 40, height - 90);
          context.quadraticCurveTo(width - 110, height - 70, width, height);
          context.closePath();

          // (!) Konva specific method, it is very important
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