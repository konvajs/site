import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';

// VERY IMPORTANT NOTES
// at first we will set image state to null
// and then we will set it to native image instanse
// only when image is loaded
class YodaImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    return <Image image={this.state.image} />;
  }
}

// here is another way to update the image
class VaderImage extends React.Component {
  state = {
    image: new window.Image()
  };
  componentDidMount() {
    this.state.image.src = 'http://konvajs.github.io/assets/darth-vader.jpg';
    this.state.image.onload = () => {
      // calling set state here will do nothing
      // because properties of Konva.Image are not changed
      // so we need to update layer manually
      this.imageNode.getLayer().batchDraw();
    };
  }

  render() {
    return (
      <Image
        image={this.state.image}
        y={250}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <YodaImage />
          <VaderImage />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
