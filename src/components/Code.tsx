import { Sandpack } from "@codesandbox/sandpack-react"

export const Code = () => {
  return <Sandpack template="vanilla" 
  customSetup={{ 
    dependencies: { 
      "konva": "latest" 
    }
  }}
  files={{
    "index.html": {
        code: "<div id='container'></div>"
    },
    "/index.js": {
      code: `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);


var arc = new Konva.Arc({
x: stage.width() / 2,
y: stage.height() / 2,
innerRadius: 40,
outerRadius: 70,
angle: 60,
fill: 'yellow',
stroke: 'black',
strokeWidth: 4,
});

layer.add(arc);
`
    }
  }} />
}

export default Code;
