import React from "react";
import { Group, Line } from "react-konva";

class Sash extends React.Component {
  render() {
    const { width, height, size } = this.props;

    const lineProps = {
      closed: true,
      stroke: "black",
      strokeWidth: 1,
      fill: "white"
    };
    return (
      <Group>
        <Line
          {...lineProps}
          points={[0, 0, width, 0, width - size, size, size, size]}
        />
        <Line
          {...lineProps}
          points={[0, 0, size, size, size, height - size, 0, height]}
        />
        <Line
          {...lineProps}
          points={[
            0,
            height,
            size,
            height - size,
            width - size,
            height - size,
            width,
            height
          ]}
        />
        <Line
          {...lineProps}
          points={[
            width,
            0,
            width,
            height,
            width - size,
            height - size,
            width - size,
            size
          ]}
        />
      </Group>
    );
  }
}

export default Sash;
