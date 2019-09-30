<template>
  <div>
    <div id="container" style="position:absolute;"></div>
    <v-stage ref="stage" :config="stageSize">
      <v-layer>
        <v-line v-for="(item, index) in VerticalLines" :key="index" :config="item"/>
      </v-layer>
      <v-layer>
        <v-line v-for="(item, index) in HorizontalLines" :key="index" :config="item"/>
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  props: {
    _blocksMaxCount: {
      type: Number,
      default: 0
    },
    _scenarioCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      stageSize: null,
      VerticalLines: [],
      HorizontalLines: [],
      labelConf: {},
      stage: null,
      stageConf: null,
      layer: null,
      tagConf: {
        fill: "#828282",
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: "round",
        shadowColor: "black",
        shadowBlur: 0,
        shadowOpacity: 0
      },
      tooltip: null,
      labelsArray: ["Output scenario"]
    };
  },
  methods: {
    getWidthOfVerticalLines() {
      const width = this.width / this._blocksMaxCount;
      return width < 150 ? 150 : width;
    },
    getHeightOfHorizontalLines() {
      const height = this.height / this._scenarioCount;
      return height < 150 ? 150 : height;
    },
    getModelWidth() {
      this.width = window.innerWidth - 15;
    },
    getModelHeight() {
      this.height = window.innerHeight - 17;
    },
    init() {
      this.stageSize = {
        width: this.width,
        height: this.height
      };
      this.stageConf = {
        container: "container",
        width: this.width,
        height: this.height
      };
      for (let i = 1; i <= this._scenarioCount; i++) {
        this.labelsArray.push("Scenario " + i);
      }
    },
    getVerticalLines() {
      const widthSize = this.getWidthOfVerticalLines();
      for (let i = widthSize; i < this.width; i += widthSize) {
        this.VerticalLines.push({
          x: i,
          y: 0,
          points: [0, 0, 0, this.height],
          tension: 1,
          closed: false,
          stroke: "#666",
          strokeWidth: 3,
          lineCap: "round",
          lineJoin: "round",
          dash: [10, 10]
        });
      }
    },
    getHorizontalLines() {
      const heightSize = this.getHeightOfHorizontalLines();
      for (let i = heightSize; i < this.height; i += heightSize) {
        this.HorizontalLines.push({
          x: 0,
          y: i,
          points: [0, 0, this.width, 0],
          tension: 1,
          closed: false,
          stroke: "#666",
          strokeWidth: 3,
          lineCap: "round",
          lineJoin: "round",
          dash: [10, 10]
        });
      }
    },
    createHorizontalLabels() {
      const countHorizontalLines = this.getHeightOfHorizontalLines();
      for (
        let i = 0, index = 0;
        i < this.height;
        i += countHorizontalLines, index++
      ) {
        this.tooltip = new Konva.Label({
          x: 0,
          y: i + 5,
          opacity: 1
        });

        this.tooltip.add(new Konva.Tag(this.tagConf));

        this.tooltip.add(
          new Konva.Text({
            text: this.labelsArray[index],
            fontFamily: "Calibri",
            fontSize: 18,
            padding: 2,
            fill: "white"
          })
        );

        this.layer.add(this.tooltip);
      }
    },
    createverticalLabels() {
      const countVerticalLines = this.getWidthOfVerticalLines();
      for (
        let i = countVerticalLines, index = 1;
        i < this.width;
        i += countVerticalLines, index++
      ) {
        this.tooltip = new Konva.Label({
          x: i + 5,
          y: 5,
          opacity: 1
        });

        this.tooltip.add(new Konva.Tag(this.tagConf));

        this.tooltip.add(
          new Konva.Text({
            text: "Coll " + index,
            fontFamily: "Calibri",
            fontSize: 18,
            padding: 2,
            fill: "white"
          })
        );

        this.layer.add(this.tooltip);
      }
    }
  },
  created() {
    this.getModelWidth();
    this.getModelHeight();
    this.init();
  },
  mounted() {
    this.getVerticalLines();
    this.getHorizontalLines();

    this.layer = new Konva.Layer();
    this.stage = new Konva.Stage(this.stageConf);
    // cretate labels on layer
    this.createHorizontalLabels();
    this.createverticalLabels();
    // add layer to the stage
    this.stage.add(this.layer);
  }
};
</script>