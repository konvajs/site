import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

const Rect1 = () => (
  <Rect
    name="rectange1"
    x={20}
    y={20}
    width={50}
    height={50}
    fill="red"
    draggable
  />
);

const Rect2 = () => (
  <Rect
    name="rectange2"
    x={60}
    y={120}
    width={50}
    height={50}
    fill="green"
    draggable
  />
);

class TransformerComponent extends React.Component {
  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;
    const selectedNode = stage.findOne('.' + selectedShapeName);
    if (selectedNode === this.transformer.node()) {
      return;
    }
    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
      />
    );
  }
}

class App extends Component {
  state = {
    selectedShapeName: ''
  };
  handleStageClick = e => {
    this.setState({
      selectedShapeName: e.target.name()
    });
  };
  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={this.handleStageClick}
      >
        <Layer>
          <Rect1 />
          <Rect2 />
          <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}
          />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
