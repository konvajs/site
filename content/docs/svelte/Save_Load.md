---
title: Saving and loading canvas with Svelte and Konva
sidebar_label: Save and Load
hide_table_of_contents: true
slug: Save_Load.html
description: "Learn how to save and load canvas state in Svelte with Konva by serializing your app state instead of Konva internals."
---

Native Konva has special mechanizm to save/load a full canvas stage with `node.toJSON()` and `node.create(json)` functions [(see demo)](/docs/data_and_serialization/Simple_Load.html).

This approach is not recommended when using svelte-konva. In svelte-konva you should instead save the state of your app which also resembles the full stage data required. So there is no need to save any Konva internals and nodes.

The demo saves and retrieves the data from localstorage as JSON but you're free to use any way of saving you'd like.

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/save_load?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
