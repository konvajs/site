import React, { Component } from 'react';
import Konva from 'konva';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Circle } from 'react-konva';

function generateItems() {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: 'node-' + i,
      color: Konva.Util.getRandomColor(),
    });
  }
  return items;
}

class App extends Component {
  state = {
    items: generateItems(),
  };
  handleDragStart = (e) => {
    const id = e.target.name();
    const items = this.state.items.slice();
    const item = items.find((i) => i.id === id);
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);
    this.setState({
      items,
    });
  };
  onDragEnd = (e) => {
    const id = e.target.name();
    const items = this.state.items.slice();
    const item = this.state.items.find((i) => i.id === id);
    const index = this.state.items.indexOf(item);
    // update item position
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y(),
    };
    this.setState({ items });
  };
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {this.state.items.map((item) => (
            <Circle
              key={item.id}
              name={item.id}
              draggable
              x={item.x}
              y={item.y}
              fill={item.color}
              radius={50}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
