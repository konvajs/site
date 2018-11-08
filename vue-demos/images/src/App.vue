<template>
<v-stage ref="stage" :config="stageSize">
      <v-layer ref="layer">
        <v-image
          :config="{
            image: image
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
      image: null
    };
  },
  methods: {
    created() {
      const image = new window.Image();
      image.src = 'http://konvajs.github.io/assets/yoda.jpg';
      image.onload = () => {
        // set image only when it is loaded
        this.image = image;
      };
    }
  }
};
</script>