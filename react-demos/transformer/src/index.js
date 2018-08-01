import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

class Rectangle extends React.Component {
  handleChange = e => {
    const shape = e.target;
    // take a look into width and height properties
    // by default Transformer will change scaleX and scaleY
    // while transforming
    // so we need to adjust that properties to width and height
    this.props.onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation()
    });
  };
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        // force no scaling
        // otherwise Transformer will change it
        scaleX={1}
        scaleY={1}
        fill={this.props.fill}
        name={this.props.name}
        // save state on dragend or transformend
        onDragEnd={this.handleChange}
        onTransformEnd={this.handleChange}
        draggable
      />
    );
  }
}

class TransformerComponent extends React.Component {
  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    // here we need to manually attach or detach Transformer node
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;

    const selectedNode = stage.findOne('.' + selectedShapeName);
    // do nothing if selected node is already attached
    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      // attach to another node
      this.transformer.attachTo(selectedNode);
    } else {
      // remove transformer
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
    rectangles: [
      {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'red',
        name: 'rect1'
      },
      {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'green',
        name: 'rect2'
      }
    ],
    selectedShapeName: ''
  };
  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ''
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    const rect = this.state.rectangles.find(r => r.name === name);
    if (rect) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ''
      });
    }
  };
  handleRectChange = (index, newProps) => {
    const rectangles = this.state.rectangles.concat();
    rectangles[index] = {
      ...rectangles[index],
      ...newProps
    };

    this.setState({ rectangles });
  };
  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={this.handleStageMouseDown}
      >
        <Layer>
          {this.state.rectangles.map((rect, i) => (
            <Rectangle
              key={i}
              {...rect}
              onTransform={newProps => {
                this.handleRectChange(i, newProps);
              }}
            />
          ))}
          <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}
          />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
