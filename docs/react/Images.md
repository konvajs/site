title: How to draw images on canvas with React?
layout: react_page
---

If you take a look into the image [tutorial](/docs/shapes/Image.html) and [API docs](/api/Konva.Image.html) you will see that you need to use a `window.Image` instance as the `image` attribute for `Konva.Image`. So you need to create and download it manually.


Also, you can use the brand new react hook [use-image](https://github.com/konvajs/use-image) to handle loading your images or you can use the lifecycle methods of React and create your own custom component.


<iframe 
  src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/images?hidenavigation=1&view=split&fontsize=10" 
  style={{
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden"
  }}
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>
