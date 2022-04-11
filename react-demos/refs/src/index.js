import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Circle, Text } from 'react-konva';

const pulseShape = (shape) => {
  // use Konva methods to animate a shape
  shape.to({
    scaleX: 1.5,
    scaleY: 1.5,
    onFinish: () => {
      shape.to({
        scaleX: 1,
        scaleY: 1,
      });
    },
  });
};

const App = () => {
  const circleRef = React.useRef(null);

  const handleStageClick = () => {
    // this event demonstrates how to access Konva node using ref
    const shape = circleRef.current;
    pulseShape(shape);
  };

  const handleCircleClick = (e) => {
    // another way to access Konva nodes is to just use event object
    const shape = e.target;
    pulseShape(shape);
    // prevent click on stage
    e.cancelBubble = true;
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleStageClick}
      onTap={handleStageClick}
    >
      <Layer>
        <Text text="Click on any place to see an animation" />
        <Circle
          ref={circleRef}
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={80}
          fill="red"
          onClick={handleCircleClick}
          onTap={handleCircleClick}
        />
      </Layer>
    </Stage>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
