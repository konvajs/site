title: HTML5 Canvas How to avoid Memory leaks Tip
---

### Deleting shape

There are two very close methods `remove()` and `destroy()`. If you need to completely delete node you need to use `destroy()` method.
If you are going to reuse node you should `remove()` it then later you may add it again to any container.
Don't reuse node after `destroy()`. As `destroy()` delete all references to node from KonvaJS engine.

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

Or if you don't need to reuse tween you may use new `to()` method:
```javascript
// tween will be automatically started and destroyed on finish
circle.to({
    x : 0,
    duration : 0.5
});
```
