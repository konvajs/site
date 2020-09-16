import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Group, Rect, Text, Circle, Line } from 'react-konva';

// make a portal implementation
const Portal = ({ selector, enabled, children }) => {
  const outer = React.useRef(null);
  const inner = React.useRef(null);

  React.useEffect(() => {
    const stage = outer.current.getStage();
    const parent = stage.findOne(selector);
    if (!parent) {
      inner.current.moveTo(outer.current);
    } else if (enabled) {
      inner.current.moveTo(parent);
    } else {
      inner.current.moveTo(outer.current);
    }
    outer.current.getLayer().batchDraw();
    if (parent) {
      parent.getLayer().batchDraw();
    }
  }, [selector, enabled]);

  // for smooth movement we will have to use two group
  // outer - is main container
  // inner - that we will move into another container
  return (
    <Group name="_outer_portal" ref={outer}>
      <Group name="_inner_portal" ref={inner}>
        {children}
      </Group>
    </Group>
  );
};

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
