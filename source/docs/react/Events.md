title: How to listen to an event on a canvas shape with React and Konva?
layout: react_page
---

With `react-konva` you can attach any events to canvas nodes that `Konva` supports.

To do that you can use `onEventName` property, like `onMouseDown` for `mousedown`, `onDragEnd` for `dragend`, etc.

For the full list of events take a look into [on() method documentation](/cn.konvajs/api/Konva.Node.html#on).

In this demo you see how we are using `dragstart` and `dragend` events.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/basic_demo?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



