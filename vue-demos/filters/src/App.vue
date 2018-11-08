<template>
<v-stage ref="stage" :config="stageSize">
      <v-layer ref="layer">
        <v-rect
          ref="rect"
          @mousemove="handleClick"
          :config="{
            filters: [Konva.Filters.Noise],
            noise: 1,
            x: 10,
            y: 10,
            width: 50,
            height: 50,
            fill: color,
            shadowBlur: 10
          }"
        />
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
      color: green
    };
  },
  methods: {
    handleClick() {
      this.color = Konva.Util.getRandomColor();
    }
  },
  created() {
    const rectNode = this.refs.rect.getStage();
    rectNode.cache();
  },
  updated() {
    // recache
    const rectNode = this.refs.rect.getStage();
    rectNode.cache();
  }
};
</script>