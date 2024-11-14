title: Multi-touch Canvas scale with pinch zoom
layout: demo_page
---

## How to enable pan and pinch zoom for canvas stage?

Inside `touchmove` callback we can get access to all native properties of touch events with `e.evt.touches`. So we just need to manually calculate position and scale properties of the stage, when two pointers are used in `touchmove`.

Note: This lab only works on devices that support multi-touch gestures  because it makes use of multiple touch events.

Instructions: Using a mobile device that supports multi-touch gestures, use two fingers to zoom in or out of the stage

<!-- {% iframe /downloads/code/sandbox/Multi-touch_Scale_Stage.html %} -->

<!-- {% include_code Konva Multi-touch Scale Stage sandbox/Multi-touch_Scale_Stage.html %} -->