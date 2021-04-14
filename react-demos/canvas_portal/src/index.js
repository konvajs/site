import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import { Portal } from 'react-konva-utils';

const App = () => {
  const [isDragging, setDragging] = React.useState(false);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          text="Try to drag the rectangle. It should be on top while drag."
          fontSize={15}
        />
        <Portal selector=".top-layer" enabled={isDragging}>
          <Rect
            x={20}
            y={50}
            width={150}
            height={150}
            fill="red"
            draggable={true}
            onDragStart={() => {
              setDragging(true);
            }}
            onDragEnd={() => {
              setDragging(false);
            }}
          />
        </Portal>
        <Circle x={200} y={100} radius={50} fill="green" />
        <Line
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.5}
          closed
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
          draggable
        />
      </Layer>
      <Layer name="top-layer" />
    </Stage>
  );
};

render(<App />, document.getElementById('root'));
