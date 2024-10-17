title: How to export a canvas into an image from react-konva?
layout: react_page

---

## How to save a drawing from react-konva?

To export any `Konva` node into an image you can either use the [node.toDataURL()](/api/Konva.Node.html#toDataURL) or the [node.toImage()](https://konvajs.org/api/Konva.Node.html#toImage) API. Take a look into the [vanilla Konva image export demo](https://konvajs.org/docs/data_and_serialization/Stage_Data_URL.html).

You will need to use the [Refs API](/docs/react/Access_Konva_Nodes.html) to access a `Konva` node directly in order to call these methods.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/image-export?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-downloads"></iframe>
