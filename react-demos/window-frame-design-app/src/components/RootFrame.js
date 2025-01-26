import React from "react";
import { Provider } from "mobx-react";
import { Stage, Layer, Rect } from "react-konva";
import { observer, inject } from "mobx-react";

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
      this.props.store.selectedSectionId = null;
    }
  };
  render() {
    const padding = 150;

    const { root } = this.props.store;
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
          <Provider store={window.store}>
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
          </Provider>
        </Stage>
      </div>
    );
  }
}

export default inject("store")(observer(RootFrame));
