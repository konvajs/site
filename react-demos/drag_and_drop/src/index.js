import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';

class App extends Component {
  state = {
    isDragging: false
  };

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            text="Draggable Text"
            x={50}
            y={50}
            draggable
            fill={this.state.isDragging ? 'green' : 'black'}
            onDragStart={() => {
              this.setState({
                isDragging: true
              });
            }}
            onDragEnd={() => {
              this.setState({
                isDragging: false
              });
            }}
          />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
