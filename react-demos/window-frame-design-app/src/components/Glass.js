import React from "react";
import { Group, Rect } from "react-konva";

class Glass extends React.Component {
  render() {
    const { padding, width, height } = this.props;

    return (
      <Group>
        <Rect
          x={padding}
          y={padding}
          width={width - padding * 2}
          width={width - padding * 2}
          height={height - padding * 2}
          fill="lightblue"
        />
      </Group>
    );
  }
}

export default Glass;
