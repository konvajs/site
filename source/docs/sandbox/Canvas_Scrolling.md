title: HTML5 Canvas Scrolling Demo
layout: demo_page
---

Imagine we have this scenario. There are a very large stage 3000x3000 with many nodes inside.
User wants to take a look into all nodes, but they are not visible at once.

## How to scroll html5 canvas?

Lets think you have a very large canvas and you want to add ability to navigate on it.

I will show your 4 different approaches to achieve that:

### 1. Just make large stage

This is the simplest approach. But it is very slow, because large canvases are slow.
User will be able to scroll with native scrollbars.

Pros:
* Simple implementation

Cons:
* Slow

{% iframe /downloads/code/sandbox/Canvas_Scrolling_Large.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Large sandbox/Canvas_Scrolling_Large.html %}
</p>
</details>


### 2. Make stage draggable (navigate with drag&drop)

That one is better because stage is much smaller.

Pros:
* Simple implementation
* Fast

Cons
* Sometimes drag&drop navigation is not the best UX

{% iframe /downloads/code/sandbox/Canvas_Scrolling_Drag.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Drag sandbox/Canvas_Scrolling_Drag.html %}
</p>
</details>

## 3. Emulate scrollbars.

You will have to draw them manually and implement all moving functionality.
That is quite a lot of work. But works good for many apps.

Instruction: try to scroll with bars.

Pros:
- Works ok
- Intuitive scroll
- Fast

Cons
- Scrollbars are not native, so you have to implement many things manually (like scroll with keyboard)

{% iframe /downloads/code/sandbox/Canvas_Scrolling_Manual.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Bars sandbox/Canvas_Scrolling_Manual.html %}
</p>
</details>

## 4. Emulate screen moving with transform.

That demo works really good, but it may be tricky.
The idea is:
- We will use small canvas with the size of the screen
- We will create container with required size (3000x3000), so native scrollbars will be visible
- When user is trying to scroll, we will apply css transform for the stage container so it will be still in the center of user's screen
- We will move all nodes so it looks like you scroll (by changing stage position)

Props:
- Works perfect and fast
- Native scrolling

Cons:
- You have to understand what is going on.

Instruction: try to scroll with native bars.

{% iframe /downloads/code/sandbox/Canvas_Scrolling_Transform.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Transform sandbox/Canvas_Scrolling_Transform.html %}
</p>
</details>
