import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Portal from './Portal';
import { Stage, Layer, Rect, Text } from 'react-konva';

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Portal>
            <input
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: '200px'
              }}
              placeholder="DOM input from Konva nodes"
            />
          </Portal>
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

ReactDOM.render(<App />, document.getElementById('root'));
