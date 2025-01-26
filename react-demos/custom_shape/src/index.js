import React, { Component } from 'react';
import Konva from 'konva';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Shape } from 'react-konva';

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Shape
            width={260}
            height={170}
            sceneFunc={function (context, shape) {
              const width = shape.width();
              const height = shape.height();
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(width - 40, height - 90);
              context.quadraticCurveTo(width - 110, height - 70, width, height);
              context.closePath();

              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            fill="#00D2FF"
            stroke="black"
            strokeWidth={4}
          />
        </Layer>
      </Stage>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
