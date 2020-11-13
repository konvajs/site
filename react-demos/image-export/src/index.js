import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect } from 'react-konva';

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const App = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stageRef = React.useRef(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, 'stage.png');
  };

  return (
    <Fragment>
      <button onClick={handleExport}>Click here to save stage as image</button>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          <Rect x={0} y={0} width={80} height={80} fill="red" />
          <Rect x={width - 80} y={0} width={80} height={80} fill="red" />
          <Rect
            x={width - 80}
            y={height - 80}
            width={80}
            height={80}
            fill="red"
          />
          <Rect x={0} y={height - 80} width={80} height={80} fill="red" />
        </Layer>
      </Stage>
    </Fragment>
  );
};

render(<App />, document.getElementById('root'));
