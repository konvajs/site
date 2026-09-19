import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer } from 'react-konva';
import { useTrail, animated } from '@react-spring/konva';

const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

const App = () => {
  const [toggle, setToggle] = React.useState(true);

  const trail = useTrail(items.length, {
    from: { opacity: 0, x: -100 },
    opacity: toggle ? 1 : 0.25,
    x: toggle ? 0 : 100,
  });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {trail.map((props, i) => (
          <animated.Rect
            key={items[i]}
            {...props}
            y={50 * i}
            width={50}
            height={50}
            fill="red"
            onClick={() => setToggle((prev) => !prev)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
