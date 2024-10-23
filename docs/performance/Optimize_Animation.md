title: HTML5 Canvas Optimize Animation Performance Tip
---

If you animation have frames without any updates (no nodes are changed) you may `return false` from animation function.

In this case Konva wouldn't update layers.

<!-- {% iframe /downloads/code/performance/Optimize_Animation.html %}

{% include_code Konva Optimize Animation Demo performance/Optimize_Animation.html %} -->
