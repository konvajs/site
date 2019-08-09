import React from "react";
import { Group, Rect } from "react-konva";

class Devider extends React.Component {
  render() {
    const { x, y, width, height } = this.props;

    return (
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="white"
        stroke="black"
        strokeWidth={1}
      />
    );
  }
}

export default Devider;
