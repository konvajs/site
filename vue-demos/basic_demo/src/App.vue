<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
    >
      <v-layer ref="layer">
        <v-line v-for="item in listPolygonScreen" :key="item.id" :config="item"></v-line>
        <v-line v-for="item in listSegment" :key="item.id" :config="item"></v-line>
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
      listPolygon: [],
      listPolygonScreen: [],
      listCon: [],
      listSegment: [],
      configKonva: {
        width: width,
        height: height
      }
    };
  },

  mounted() {
    vm = this;
    const stage = vm.$refs.stage.getStage();

    const nSides = 5;
    const midPointLen = 0.1;
    const initX = stage.width() / 1.5;
    const initY = stage.height() / 4;
    const scale = 250;
    let nRings = 2;
    
    vm.listPolygonScreen.length = 0;
    console.log("before 1 polygon", vm.listPolygonScreen);

    //first lines
    
    this.polygon(0, nSides, scale, initX, initY);
    for (let n = 1; n < nSides; n++) {
      this.polygon(n, nSides, scale);
    }
    vm.listPolygonScreen.push.apply(vm.listPolygonScreen, vm.listPolygon);
    console.log("after 1 polygon", 1, vm.listPolygonScreen);

    // add rings
    for (let r = 1; r < nRings; r++) {
      console.log("in r loop", r);
      this.midPoints(0, scale, nSides, r);
      //this.midPoints(1, scale, nSides, 2);
      for (let n = 1; n < nSides; n++) {
        this.midPoints(n, scale, nSides, r);
        this.conPoints(n, nSides, r);
      }
      // // last line
      this.conPoints(nSides, nSides, r);
      vm.listPolygonScreen.push.apply(vm.listPolygonScreen, vm.listCon);
    }
    console.log("hold", this.listPolygonScreen);

    // console.log("after loop polygon", vm.listPolygon);
    // console.log("after loop seg", vm.listSegment);
    // console.log("after loop con", vm.listCon);
    console.log("map", this.listPolygonScreen.map(tmp => tmp.i));
    console.log("map", this.listPolygonScreen.map(tmp => tmp.ringNum));
    // officers.map(officer => officer.id)
  },

  methods: {
    polygon(n, nSides, scale, initX, initY) {
      const xStart = n == 0 ? initX : vm.listPolygon[n - 1].xEnd;
      const yStart = n == 0 ? initY : vm.listPolygon[n - 1].yEnd;
      const xOffset = Math.cos(((n + 1) * 2 * Math.PI) / nSides) * scale;
      const yOffset = Math.sin(((n + 1) * 2 * Math.PI) / nSides) * scale;

      vm.listPolygon.push({
        x: xStart,
        y: yStart,
        xEnd: xStart + xOffset,
        yEnd: yStart + yOffset,
        points: [0, 0, xOffset, yOffset],
        ringNum: 0,
        i: n,
        stroke: "red",
        source: "polygon"
      });
    },
    midPoints(n, scale, nSides, ringNum) {
      const i = n + nSides * (ringNum - 1);
      console.log("in midPoints", n, i);
      var xEndSegmentOffset = null;
      var yEndSegmentOffset = null;
      const angle =
        Math.atan2(
          vm.listPolygonScreen[i].yEnd - vm.listPolygonScreen[i].y,
          vm.listPolygonScreen[i].xEnd - vm.listPolygonScreen[i].x
        ) +
        Math.PI / 2;
      if (ringNum > 1) {
        xEndSegmentOffset = -0.1 * Math.cos(angle) * scale; // not sure why this is necessary
        yEndSegmentOffset = -0.1 * Math.sin(angle) * scale;
      } else {
        xEndSegmentOffset = 0.1 * Math.cos(angle) * scale;
        yEndSegmentOffset = 0.1 * Math.sin(angle) * scale;
      }
      const xSeg =
        0.5 * vm.listPolygonScreen[i].x + 0.5 * vm.listPolygonScreen[i].xEnd;
      const ySeg =
        0.5 * vm.listPolygonScreen[i].y + 0.5 * vm.listPolygonScreen[i].yEnd;

      vm.listSegment.push({
        angle: angle,
        x: xSeg,
        y: ySeg,
        xEndSegmentOffset: xEndSegmentOffset,
        yEndSegmentOffset: yEndSegmentOffset,
        xEnd: xSeg + xEndSegmentOffset,
        yEnd: ySeg + yEndSegmentOffset,
        points: [0, 0, xEndSegmentOffset, yEndSegmentOffset],
        ringNum: ringNum,
        stroke: "green",
        source: "midPoints"
      });
    },
    conPoints(n, nSides, ringNum) {
      const i = n + nSides * (ringNum - 1);
      var xSegOffset = null;
      var ySegOffset = null;

      if (n == nSides) {
        xSegOffset = -(
          vm.listSegment[nSides * (ringNum - 1)].xEnd -
          vm.listSegment[i - 1].xEnd
        );
        ySegOffset = -(
          vm.listSegment[nSides * (ringNum - 1)].yEnd -
          vm.listSegment[i - 1].yEnd
        );
        vm.listCon.push({
          x: vm.listSegment[nSides * (ringNum - 1)].xEnd,
          y: vm.listSegment[nSides * (ringNum - 1)].yEnd,
          points: [0, 0, xSegOffset, ySegOffset],
          xEnd: vm.listSegment[nSides * (ringNum - 1)].xEnd + xSegOffset,
          yEnd: vm.listSegment[nSides * (ringNum - 1)].yEnd + ySegOffset,
          ringNum: ringNum,
          i: i,
          stroke: "blue",
          source: "conPoints2"
        });
      } else {
        xSegOffset = -(vm.listSegment[i].xEnd - vm.listSegment[i - 1].xEnd);
        ySegOffset = -(vm.listSegment[i].yEnd - vm.listSegment[i - 1].yEnd);

        vm.listCon.push({
          x: vm.listSegment[i].xEnd,
          y: vm.listSegment[i].yEnd,
          points: [0, 0, xSegOffset, ySegOffset],
          xEnd: vm.listSegment[i].xEnd + xSegOffset,
          yEnd: vm.listSegment[i].yEnd + ySegOffset,
          ringNum: ringNum,
          i: i,
          stroke: "blue",
          source: "conPoints1"
        });
      }
    },
    handleDragstart(e) {
      const shape = e.target;
      const dragLayer = vm.$refs.dragLayer.getNode();
      const stage = vm.$refs.stage.getNode();
      // moving to another layer will improve dragging performance
      shape.moveTo(dragLayer);
      stage.draw();
      shape.setAttrs({
        shadowOffsetX: 15,
        shadowOffsetY: 15,
        scaleX: shape.getAttr("startScale") * 1.2,
        scaleY: shape.getAttr("startScale") * 1.2
      });
    },
    handleDragend(e) {
      const shape = e.target;
      const layer = vm.$refs.layer.getNode();
      const stage = vm.$refs.stage.getNode();
      shape.moveTo(layer);
      stage.draw();
      shape.to({
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: shape.getAttr("startScale"),
        scaleY: shape.getAttr("startScale"),
        shadowOffsetX: 5,
        shadowOffsetY: 5
      });
    }
  }
};
</script>