<template>
<v-stage ref="stage" :config="stageSize">
      <v-layer ref="layer">
        <v-regular-polygon
          @mousemove="handleMouseMove"
          @mouseout="handleMouseOut"
          :config="{
            x: 80,
            y: 120,
            sides: 3,
            radius: 80,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 4
          }"
        />
        <v-text ref="text" :config="{
          x: 10,
          y: 10,
          fontFamily: 'Calibri',
          fontSize: 24,
          text: text,
          fill: 'black'
        }" />
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
      },
      text: ''
    };
  },
  methods: {
    writeMessage(message) {
      this.text = message;
    },
    handleMouseOut(vueComponent, event) {
      this.writeMessage('Mouseout triangle');
    },
    handleMouseMove(vueComponent, event) {
      const mousePos = this.$refs.stage.getStage().getPointerPosition();
      const x = mousePos.x - 190;
      const y = mousePos.y - 40;
      this.writeMessage('x: ' + x + ', y: ' + y);
    }
  }
};
</script>