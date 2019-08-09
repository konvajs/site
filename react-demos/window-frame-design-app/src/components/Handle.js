import React from "react";
import { Group, Shape } from "react-konva";

class Handle extends React.Component {
  render() {
    const { width, height, type, padding } = this.props;

    if (type === "none") {
      return null;
    }

    let x, y;

    if (type.indexOf("left") >= 0) {
      x = width - padding / 2;
      y = height / 2;
    } else if (type.indexOf("right") >= 0) {
      x = padding / 2;
      y = height / 2;
    } else {
      console.error("???");
    }

    return (
      <Shape
        x={x}
        y={y}
        fill="rgba(0,0,0,0.2)"
        sceneFunc={(ctx, shape) => {
          ctx.beginPath();
          ctx.rect(-20, -20, 40, 50);
          ctx.rect(-14, -5, 28, 80);
          ctx.fillStrokeShape(shape);
        }}
        stroke="black"
        strokeWidth={1}
      />
    );
  }
}

export default Handle;
