title: Drag and drop canvas shapes
layout: react_page
---

Drag and drop in `react-konva` is a little bit tricky. So `react-konva` control all properties that you defined in `render` function. It means `react-konva` will force all this properties to the nodes.
So when you drag a shape you need to make sure you update its position in your state.

Instructions:
Here are three texts, We don't control position position of the first text (`x` and `y` are not defined). So it is fully draggable.
The second text is draggable, but we don't update its position in state. So `react-konva` will reset position on `dragend`.
The third text is defined correctly and its position is stored in the text. But we save its position only on `dragend`. In some apps it make sense to save position on every `dragmove` event.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/drag_and_drop?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



