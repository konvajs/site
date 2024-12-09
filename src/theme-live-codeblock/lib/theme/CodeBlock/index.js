/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import CodeBlock from '@theme-init/CodeBlock';
import { Sandpack } from '@codesandbox/sandpack-react';

export const Vanilla = ({ code }) => {
  return (
    <Sandpack
      template="vanilla"
      customSetup={{
        dependencies: {
          konva: 'latest',
        },
      }}
      files={{
        'index.html': {
          code: "<div id='container'></div>",
        },
        '/index.js': {
          code,
        },
      }}
    />
  );
};

export const ReactKonva = ({ code, metastring }) => {
  const deps = {};
  if (metastring.includes('use-image')) {
    // deps["use-image"] = "latest";
  }
  return (
    <Sandpack
      template="react"
      customSetup={{
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          'react-konva': '^19.0.1',
          konva: 'latest',
          'use-image': 'latest',
          ...deps,
        },
      }}
      files={{
        '/App.js': {
          code,
        },
      }}
    />
  );
};

export const VueKonva = ({ code }) => {
  return (
    <Sandpack
      template="vue"
      customSetup={{
        dependencies: {
          'vue-konva': '3.2.0',
          konva: 'latest',
        },
      }}
      files={{
        'src/App.vue': {
          code,
        },
        'src/main.js': {
          code: `
      import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva';

createApp(App).use(VueKonva).mount('#app')
      `,
        },
      }}
    />
  );
};

const SvelteKonva = ({ code }) => {
  return (
    <Sandpack
      template="svelte"
      customSetup={{
        dependencies: {
          'svelte-konva': 'latest',
          konva: 'latest',
        },
      }}
      files={{
        'App.svelte': {
          code,
        },
      }}
    />
  );
};

const withLiveEditor = (Component) => {
  function WrappedComponent(props) {
    if (props.live && props.metastring.includes('vanilla')) {
      return <Vanilla {...props} code={props.children} />;
    }
    if (props.live && props.metastring.includes('react')) {
      return (
        <ReactKonva
          {...props}
          code={props.children}
          metastring={props.metastring}
        />
      );
    }
    if (props.live && props.metastring.includes('vue')) {
      return <VueKonva {...props} code={props.children} />;
    }
    if (props.live && props.metastring.includes('svelte')) {
      return <SvelteKonva {...props} code={props.children} />;
    }
    return <Component {...props} />;
  }
  return WrappedComponent;
};
export default withLiveEditor(CodeBlock);
