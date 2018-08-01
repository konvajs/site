import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';

import { Trail, animated, Globals } from 'react-spring/dist/konva';

Globals.injectFrame(
  x => requestAnimationFrame(x),
  x => cancelAnimationFrame(x)
);

class App extends Component {
  state = {
    toggle: true,
    items: ['item1', 'item2', 'item3', 'item4', 'item5']
  };
  toggle = () => this.setState(state => ({ toggle: !state.toggle }));

  render() {
    const { toggle, items } = this.state;
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Trail
            native
            from={{ opacity: 0, x: -100 }}
            to={{ opacity: toggle ? 1 : 0.25, x: toggle ? 0 : 100 }}
            keys={items}
          >
            {items.map((item, i) => ({ x, opacity }) => (
              <animated.Rect
                x={x}
                y={50 * i}
                width={50}
                height={50}
                fill="red"
                opacity={opacity}
                onClick={this.toggle}
              />
            ))}
          </Trail>
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
