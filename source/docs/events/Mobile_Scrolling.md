title: HTML5 Mobile Scrolling and Native Events with Konva
---

By default `Konva` will prevent default behaviour off all pointer interactions with a stage.
That will prevent unexpected scrolling of a page when you are trying to drag&drop a shape on a mobile device.

But in some cases you may want to keep default behaviour of browser events. In that case you may set `preventDefault` property of a shape to `false`.

Note: `preventDefault` property is available only for `Konva.Shape` instances.

Instructions: if you are on mobile device try to scroll a page by each rectangle.
Green - should prevent default behaviour (no page scrolling).
Red - will keep default behaviour (scrolling should work).

{% iframe /downloads/code/events/Mobile_Scrolling.html %}

{% include_code Konva Mobile Scrolling Demo events/Mobile_Scrolling.html %}
