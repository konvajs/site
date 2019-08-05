title: How to apply canvas filters with react and konva?
layout: react_page
---

To apply filters you need to cache `Konva.Node` manually. You can do it `componentDidMount`.
Probably you will need to recache nodes every time you update their styles in `componentDidUpdate` or `React.useEffect`.

Instructions: click on the rectangle to see changes

<iframe src="https://codesandbox.io/embed/github/konvajs/site/tree/master/react-demos/filters?hidenavigation=1&view=split&fontsize=10" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



