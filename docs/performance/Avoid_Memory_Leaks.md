title: HTML5 Canvas How to avoid Memory leaks Tip
---

### Deleting shapes

There are two very close methods `remove()` and `destroy()`. If you need to completely delete a node you should `destroy()` it. The `destroy()` method deletes all references to node from the KonvaJS engine. If you are going to reuse a node you should `remove()` it then later you can add it again to any container.


### Tweening

When you are using `Konva.Tween` instance you have to destroy it after usage.

```javascript
var tween = new Konva.Tween({
    node : circle,
    x : 0,
    duration : 0.5,
    onFinish : function() {
        // remove all references from Konva
        tween.destroy();
    }
});
tween.play();
```

Or if you don't need to reuse the tween you can use the new `to()` method:
```javascript
// the tween will be automatically started and destroyed on finish
circle.to({
    x : 0,
    duration : 0.5
});
```
