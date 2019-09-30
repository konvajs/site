import Vue from "vue";
import App from "./App";

import VueKonva from "vue-konva";

Vue.use(VueKonva);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: '<App :_scenarioCount="4" :_blocksMaxCount="10"/>'
});
