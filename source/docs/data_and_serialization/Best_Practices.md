title: Save and Load HTML5 Canvas Stage Best Practices
---

## What is the best way to save/load full stage content and how to implement undo/redo?

If you want to save/load simple canvas content you can built-in `Konva` methods: `node.toJSON()` and `Node.create(json)`.
See [simple](/docs/data_and_serialization/Simple_Load.html) and [complex](/docs/data_and_serialization/Complex_Load.html) demos.

But those methods are useful only in very small apps. In bigger apps it is VERY hard to use those methods. Why? Because the tree structure is usually very complex in larger apps, you may have a lot of event listeners, images, filters, etc. That data is not serializable into JSON (or it is very hard to do that).

Also it is very common that nodes in a tree have a lot information that is not directly related to the state of your app, but just used to describe visual view of your app.

For instance, let's think we have a game, that draws several balls in canvas. The balls are not just circles, but the complex visual groups of objects with shadows and texts inside them (like "Made in China"). Now let's think you want to serialize state of your app and use it somewhere else. Like send to another computer or implement undo/redo. Almost all the visual information (shadows, texts, sizes) is not critical and may be you don't need to save it. Because all balls have the same shadows, sizes, etc. But what is critical? In that case it is just a number of balls and their coordinates. You need to save/load only that information. It will be just a simple array:

```javascript
var state = [{x: 10, y: 10}, { x: 160, y: 1041}]
```

Now when you have that information, you need to have a function, that can create the whole canvas structure.
If you want to update your canvas, for instance, you want to create a new ball, you don't need to create a new canvas node directly (like creating new instance of `Konva.Cirlce`), you just need to push a new object into a state and update (or recreate) canvas.

In that case you don't need to care about image loading, filters, event listeners, etc in saving/loading phases. Because you do all these actions in your `create` or `update` functions.

You should better understand what I am talking about if you know how many modern frameworks work (like `Rect`, `Vue`, `Angular` and many other).

Also take a look into these demos to have a better idea:
1. [Undo/redo with react](/docs/react/Undo-Redo.html)
1. [Save/load with Vue](/docs/vue/Save-Load.html)

How to implement that `create` and `update` functions? It depends. From my point of view it will be easier to use frameworks that can do that job for you, like [react-konva](/docs/react/).

If you don't want to use such frameworks you need to think in terms of your own app. Here I will try to make a small demo to give you an idea.

The super naive method is to implement just one function `create(state)` that will do all the complex job of loading.
If you have some changes in your app you just need to destroy the canvas and create a new one. But the drawback of such approach is possibly a bad performance.

A bit smarter implementation is to create two functions `create(state)` and `update(state)`. `create` will make instances of all required objects, attach events and load images. `update` will update properties of nodes. If number of objects is changed - destroy all and create from scratch. If only some properties changed - call `update`.

Instructions: In that demo we will have a bunch of images with filters, and you can add more, move them, apply a new filter by clicking on images and use undo/redo.


{% iframe /downloads/code/data_and_serialization/Best_Practices.html %}

{% include_code Konva Load Complex Stage Demo data_and_serialization/Best_Practices.html %}
