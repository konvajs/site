title: How to show a context menu for HTML5 canvas shape?
layout: demo_page
---

## Do you want to show a context menu for a canvas shape?

To show a context menu we have to:

1. Listen to `contextmenu` event on canvas container (stage)
2. Prevent default browser behavior, so we don't see native context menu
3. Create our own context menu with `Konva` tools or regular html

**Instructions: double click on the stage to create a circle. Try right click (context menu) on shapes for a menu.**

<!-- {% iframe /downloads/code/sandbox/Canvas_Context_Menu.html %} -->

<!-- {% include_code sandbox/Canvas_Context_Menu.html %} -->
