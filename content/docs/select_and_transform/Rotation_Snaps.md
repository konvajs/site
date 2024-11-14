title: HTML5 Canvas Shape Snap Rotation
---

In some application, you may want to snap rotation near some values. Snapping makes a shape "sticky" near provided values and works like rounding.

Most common snaps are 0, 45, 90, 135, 180, etc decreases. Snaps we allow to simpler set rotation it exactly these values.

For instance, if you have snap point at 45 deg, a user will be not able to set rotation to 43 deg. It will be rounded to 45 deg. But a user still will be able to set rotation to 35 deg, as it is too far from 45 so it will be not snapped.

Instructions: Try to rotate a shape. See snapping at 0, 90, 180 and 270 deg.

<!-- {% iframe /downloads/code/select_and_transform/Rotation_Snaps.html %} -->

<!-- {% include_code Konva Shape transform and selection Demo select_and_transform/Rotation_Snaps.html %} -->