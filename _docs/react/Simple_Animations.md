title: How to apply canvas animations with react and konva?
layout: react_page
---

Konva itself has two methods for animations: [Tween](/docs/tweens/Linear_Easing.html) and [Animation](/docs/animations/Rotation.html). You can apply both of them to nodes manually.

For simple use cases we recommend to use the `node.to()` method. For more complex animations take a look at the [Complex react-konva animation demo](/docs/react/Complex_Animations.html).

The demo is using the [refs API](/docs/react/Access_Konva_Nodes.html) to access shape instances directly.

Instructions: Try to move a rectangle.

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/simple_animations?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



