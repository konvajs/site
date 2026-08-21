---
title: Using labels with Svelte
sidebar_label: Labels
hide_table_of_contents: true
slug: Labels.html
description: "Learn how to create labels and tooltips on canvas with Svelte using svelte-konva Label, Tag, and Text components."
---

Creating a label is a multi-step process in Konva, as a Label instance needs to contain a Tag and Text instance to function. In svelte-konva the Tag and Text components can be easily nested inside the Label component to automatically create a correct Label without having to wire things up manually.

Hover over the circles to show the tooltips:

<iframe loading="lazy" src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/labels?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
