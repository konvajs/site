title: How to draw image on canvas with React?
layout: react_page
---

If you take a look into image [tutorial](/docs/shapes/Image.html) and [API docs](/api/Konva.Image.html) you will see that you need to use `window.Image` instance as `image` attribute for `Konva.Image`. So you need to create and download it manually.


You can use brand new react hook [use-image](https://github.com/konvajs/use-image) to handle loading of images or you can use life-circle methods of React and create your own custom component.


<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/images?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



