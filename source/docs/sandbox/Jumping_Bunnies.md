title: Jumping bunnies performance stress test
layout: demo_page
---

That is adopted [demo](https://www.goodboydigital.com/pixijs/bunnymark/) from the [PixiJS framework](https://www.pixijs.com/).

You will notice that `Konva` version is much slower than `PixiJS` version.

So first of all I am hiding that other frameworks may work better in some situations. PixiJS is very optimized for such types of graphics and animations.

There is a work in progress for optimizing some `Konva` internals to make it work faster for that demo too.

{% iframe /downloads/code/sandbox/Jumping_Bunnies.html %}

{% include_code Konva 20000 Nodes Demo sandbox/Jumping_Bunnies.html %}
