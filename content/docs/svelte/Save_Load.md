---
title: Saving and loading canvas with Svelte and Konva
sidebar_label: Save and Load
hide_table_of_contents: true
slug: Save_Load.html
description: "Learn how to save and load canvas state in Svelte with Konva by serializing your app state instead of Konva internals."
---

Native Konva can serialize a node tree and its serializable attributes with `node.toJSON()`. It can restore them with `Konva.Node.create(json)` [(see demo)](/docs/data_and_serialization/Simple_Load.html). Restore images, event handlers, and custom drawing functions separately.

With svelte-konva, save the application state instead. The state must contain the data that the stage needs. Do not save Konva internals and nodes.

The demo saves and retrieves JSON data from `localStorage`. You can use a different storage method.

<iframe src="https://codesandbox.io/p/sandbox/github/konvajs/site/tree/master/svelte-demos/save_load?file=/src/App.svelte" style={{width: '100%', height:'800px', border: '0px', borderRadius: '4px', overflow: 'hidden'}} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
