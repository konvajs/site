import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import { observer } from "mobx-react";

import store from "../store";
import Section from "./Section";
import Sash from "./Sash";
import Metrics from "./Metrics";

class RootFrame extends React.Component {
  state = {
    width: 100,
    height: 500
  };
  componentDidMount() {
    this.setState({
      width: this.container.offsetWidth
    });
  }

  handleClick = (e) => {
    if (e.target.nodeType === "Stage") {
      store.selectedSectionId = null;
    }
  };
  render() {
    const padding = 150;

    const { root } = store;
    const scale = (this.state.width - padding * 2) / root.width;

    const height = padding * 2 + root.height * scale;
    return (
      <div
        ref={(node) => {
          this.container = node;
        }}
      >
        <Stage
          width={this.state.width}
          height={height}
          ref={(ref) => {
            this.stageRef = ref;
          }}
          onClick={this.handleClick}
        >
          <Layer scaleX={scale} scaleY={scale} y={20} x={20}>
            <Section
              section={root.sections[0]}
              x={root.frameSize}
              y={root.frameSize}
            />
            <Sash
              width={root.width}
              height={root.height}
              size={root.frameSize}
            />
            <Metrics />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default observer(RootFrame);
