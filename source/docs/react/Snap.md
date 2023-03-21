title: How to enable snapping in Konva?
layout: react_page

---

## How to enable snapping in Konva?

To enable snapping in Konva, you can apply custom logic when moving or transforming nodes. You can achieve this by listening to the dragmove or transform events on nodes and adjusting their positions accordingly. Here's a working example using react-konva:

<iframe src="https://codesandbox.io/embed/react-konva-snap-1mq1g2?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-konva-snap"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
In this example, we're using the dragmove event to adjust the node's position to the nearest grid point. You can customize the snapping behavior by modifying the event handler's logic.