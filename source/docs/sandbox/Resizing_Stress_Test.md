title: Resizing Stress Test with Konva
layout: demo_page
---

This is a stress test demo to select and resize many shapes at the same time.

The demo is using two core `Konva` features to boost the performance:

### 1. Layers

Resizing shapes are moved into another layer (another canvas element). So while you resize selected shapes, we don't need to redraw other shapes.

### 2. Caching

On `select`, I am moving all selected shapes into a group and cache that group. The cache action will convert group into bitmap image. It is mush faster to redraw such group on the screen.

**Instructions: try to select several shapes and resize/rotate them.**

{% iframe /downloads/code/sandbox/REsizing_Stress_Test.html %}

{% include_code Konva Resizing Stress Test Demo sandbox/REsizing_Stress_Test.html %}