import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Text } from 'react-konva';

class App extends Component {
  state = {
    isDragging: false,
    x: 50,
    y: 50,
  };

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            text="Draggable Text"
            x={this.state.x}
            y={this.state.y}
            draggable
            fill={this.state.isDragging ? 'green' : 'black'}
            onDragStart={() => {
              this.setState({
                isDragging: true,
              });
            }}
            onDragEnd={(e) => {
              this.setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />
        </Layer>
      </Stage>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
