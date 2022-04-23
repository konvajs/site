import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Html
            divProps={{
              style: {
                position: 'absolute',
                top: 10,
                left: 10,
              },
            }}
          >
            <input placeholder="DOM input from Konva nodes" />
          </Html>
          <Rect
            x={20}
            y={20}
            width={50}
            height={50}
            fill="red"
            shadowBlur={5}
          />
        </Layer>
      </Stage>
    );
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
