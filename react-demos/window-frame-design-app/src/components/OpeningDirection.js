import React from "react";
import { Group, Line } from "react-konva";

class OpeningDirection extends React.Component {
  render() {
    const { width, height, type, padding } = this.props;

    if (type === "none") {
      return null;
    }

    return (
      <React.Fragment>
        {type.indexOf("left") >= 0 && (
          <Line
            points={[padding, padding, width - padding, height / 2, 0, height]}
            stroke="black"
            strokeWidth={1}
          />
        )}
        {type.indexOf("right") >= 0 && (
          <Line
            points={[
              width - padding,
              padding,
              padding,
              height / 2,
              width - padding,
              height - padding
            ]}
            stroke="black"
            strokeWidth={1}
          />
        )}
        {type.indexOf("tilt") >= 0 && (
          <Line
            points={[
              padding,
              height - padding,
              width / 2,
              padding,
              width - padding,
              height - padding
            ]}
            stroke="black"
            strokeWidth={1}
          />
        )}
      </React.Fragment>
    );
  }
}

export default OpeningDirection;
