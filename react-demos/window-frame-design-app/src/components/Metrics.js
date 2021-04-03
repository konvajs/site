import React from "react";
import { Group, Line, Arrow, Label, Text, Tag } from "react-konva";
import { observer, inject } from "mobx-react";

const METRIC_SIZE = 100;

function VerticalMetric({ x, y, width, height }) {
  return (
    <Group x={x} y={y}>
      <Arrow
        points={[METRIC_SIZE / 2, 0, METRIC_SIZE / 2, height]}
        stroke="black"
        fill="black"
        pointerAtBeginning
      />
      <Line points={[0, 0, METRIC_SIZE, 0]} stroke="black" />
      <Line points={[0, height, METRIC_SIZE, height]} stroke="black" />
      <Label x={METRIC_SIZE / 2 - 50} y={height / 2}>
        <Tag fill="white" stroke="black" />
        <Text text={height + " mm"} padding={10} />
      </Label>
    </Group>
  );
}

function HorizontalMetric({ x, y, width, height }) {
  return (
    <Group x={x} y={y}>
      <Arrow
        points={[0, METRIC_SIZE / 2, width, METRIC_SIZE / 2]}
        stroke="black"
        fill="black"
        pointerAtBeginning
      />
      <Line points={[0, 0, 0, METRIC_SIZE]} stroke="black" />
      <Line points={[width, 0, width, METRIC_SIZE]} stroke="black" />
      <Label x={width / 2} y={METRIC_SIZE / 2}>
        <Tag fill="white" stroke="black" />
        <Text text={width + " mm"} padding={10} />
      </Label>
    </Group>
  );
}

class Metrics extends React.Component {
  render() {
    const { width, height } = this.props.store.root;

    let totalOffsetX = 0;
    let totalIffsetY = 0;

    const verticalComponents = [];
    const horizontalComponents = [];

    function processSection(sec, verticalPos, horizontalPos) {
      verticalComponents.push(
        <VerticalMetric
          height={sec.height}
          x={verticalPos.x}
          y={verticalPos.y}
        />
      );
      horizontalComponents.push(
        <HorizontalMetric
          x={horizontalPos.x}
          y={horizontalPos.y}
          width={sec.width}
        />
      );

      const isVertical = sec.splitDirection === "vertical";
      const isHorizontal = sec.splitDirection === "horizontal";
      const hasSections = sec.sections.length > 0;

      let childOffset = 0;
      if (isHorizontal) {
        for (const child of sec.sections) {
          processSection(
            child,
            {
              x: verticalPos.x + METRIC_SIZE,
              y: verticalPos.y + childOffset
            },
            horizontalPos
          );
          childOffset += child.height;
        }
      }
      if (isVertical) {
        for (const child of sec.sections) {
          processSection(child, verticalPos, {
            x: horizontalPos.x + childOffset,
            y: horizontalPos.y + METRIC_SIZE
          });
          childOffset += child.width;
        }
      }
      if (!isVertical && !isHorizontal && hasSections) {
        processSection(
          sec.sections[0],
          {
            x: verticalPos.x + METRIC_SIZE,
            y: verticalPos.y + sec.frameSize
          },
          {
            x: horizontalPos.x + sec.frameSize,
            y: horizontalPos.y + METRIC_SIZE
          }
        );
      }
    }

    processSection(this.props.store.root, { x: 0, y: 0 }, { x: 0, y: 0 });

    return (
      <Group>
        <Group x={width}>{verticalComponents}</Group>
        <Group y={height}>{horizontalComponents}</Group>
      </Group>
    );
  }
}

export default inject("store")(observer(Metrics));
