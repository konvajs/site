title: Jumping bunnies performance stress test
layout: demo_page
---

That is adopted [demo](https://www.goodboydigital.com/pixijs/bunnymark/) from the [PixiJS framework](https://www.pixijs.com/).

You will notice that `Konva` version is much slower than `PixiJS` version.

So first of all I am not hiding that other frameworks may work better in some situations. PixiJS is very optimized for such types of graphics and animations (it uses WebGL for rendering).

There is a work in progress for optimizing some `Konva` internals to make it work faster for that demo too.

But remember that the demo doesn't represent the performance of typical application made with `Konva`. If you are doing a lot of animations like in the demo with tons of objects you may need to use other solutions like [Native Canvas Access](/docs/sandbox/Native_Context_Access.html) or even a different framework.

So choose wisely the tool for your applications.

{% iframe /downloads/code/sandbox/Jumping_Bunnies.html %}

{% include_code Konva Bunnies Demo sandbox/Jumping_Bunnies.html %}
