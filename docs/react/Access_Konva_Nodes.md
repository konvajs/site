title: How to access Konva nodes from react-konva?
layout: react_page
---

In some cases you may need to use the `Konva` API directly. For example for exporting canvases or animations.

There are two ways to access Konva nodes/shapes from `react-konva`. 

## Using the `refs` API.

You can use the [refs API](https://reactjs.org/docs/refs-and-the-dom.html) to get access to a Konva node.

```js
import { Circle } from 'react-konva';
const App = () => {
  const shapeRef = React.useRef(null);
  React.useEffect(() => {
    // it will log `Konva.Circle` instance
    console.log(shapeRef.current);
  });
  return <Circle ref={shapeRef} />;
}
```

## Using an event object inside of the event callback

Another common way to access a Konva node is to just use an event object that you have as an argument in any event:

```js
import { Circle } from 'react-konva';
const App = () => {
  const handleClick = (e) => {
    // logs clicked Konva.Circle instance
    console.log(e.target);
  }
  return <Circle onClick={handleClick} />;
}
```

<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/refs?hidenavigation=1&view=split&fontsize=10" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>



