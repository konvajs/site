import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';

class App extends Component {
  state = {
    text1: 'black',
    text2: 'black',
    text3: 'black',
    text3x: 10,
    text3y: 60
  };
  handleDragEnd = e => {
    const name = e.target.name();
    this.setState({
      [name]: Konva.Util.getRandomColor()
    });
  };

  handleThirdDragEnd = e => {
    // correctly save node position
    this.setState({
      text3: Konva.Util.getRandomColor(),
      text3x: e.target.x(),
      text3y: e.target.y()
    });
  };
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            text="Uncontrolled text"
            name="text1"
            fill={this.state.text1}
            draggable
            onDragEnd={this.handleDragEnd}
          />

          <Text
            text="Badly controlled text"
            name="text2"
            fill={this.state.text2}
            x={10}
            y={30}
            draggable
            onDragEnd={this.handleDragEnd}
          />

          <Text
            text="Correctly controlled text"
            name="text3"
            fill={this.state.text3}
            x={this.state.text3x}
            y={this.state.text3y}
            draggable
            onDragEnd={this.handleThirdDragEnd}
          />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
