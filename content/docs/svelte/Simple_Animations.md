---
title: How to apply canvas animations with Svelte and Konva?
sidebar_label: Simple Animations
hide_table_of_contents: true
slug: Simple_Animations.html
description: "Learn how to animate canvas shapes in Svelte using Konva Tweens, node.to() method, and Konva.Animation."
---

Konva itself has two methods for animations [Tween](/docs/tweens/Linear_Easing.html) and [Animation](/docs/animations/Rotation.html). You can apply both of them to nodes manually.

For simple use cases we recommend to use `node.to()` method.

Instructions: Try to move a rectangle.

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/simple_animations?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
