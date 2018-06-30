import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect } from 'react-konva';

class MyRect extends React.Component {
  state = {
    color: 'green'
  };
  componentDidMount() {
    this.rect.cache();
  }
  handleClick = () => {
    this.setState(
      {
        color: Konva.Util.getRandomColor()
      },
      () => {
        // IMPORTANT
        // recache on update
        this.rect.cache();
      }
    );
  };
  render() {
    return (
      <Rect
        filters={[Konva.Filters.Noise]}
        noise={1}
        x={10}
        y={10}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={10}
        ref={node => {
          this.rect = node;
        }}
        onClick={this.handleClick}
      />
    );
  }
}

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <MyRect />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
