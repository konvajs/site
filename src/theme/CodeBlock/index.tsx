import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type { WrapperProps } from '@docusaurus/types';
import { Sandpack } from '@codesandbox/sandpack-react';

type Props = WrapperProps<typeof CodeBlockType>;

const KONVA_VERSION = '10.3.1';

// Versions for packages that must not float to "latest".
const dependencyVersions: Record<string, string> = {
  yjs: '13.6.32',
};

// Extract non-konva npm package names from import statements
function extractDeps(code: string): Record<string, string> {
  const deps: Record<string, string> = {};
  const re = /import\s+(?:[\s\S]*?\s+from\s+)?['"]([^./][^'"]*)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    const pkg = m[1].startsWith('@')
      ? m[1].split('/').slice(0, 2).join('/')
      : m[1].split('/')[0];
    if (pkg !== 'konva') {
      deps[pkg] = dependencyVersions[pkg] ?? 'latest';
    }
  }
  return deps;
}

const editorOptions = {
  editorHeight: 400, // default - 300
};

const resetCss = `body, html { margin: 0; padding: 0; }`;

function Vanilla({ code }: { code: string }) {
  return (
    <Sandpack
      options={editorOptions}
      template="vanilla"
      customSetup={{
        dependencies: {
          konva: KONVA_VERSION,
          ...extractDeps(code),
        },
      }}
      files={{
        'index.html': {
          code: `<style>${resetCss}</style>
<div id='container'></div>`,
        },
        '/index.js': { code },
      }}
    />
  );
}

function ReactKonva({ code }: { code: string }) {
  return (
    <Sandpack
      template="react"
      options={editorOptions}
      customSetup={{
        dependencies: {
          ...extractDeps(code),
          react: '^18',
          'react-dom': '^18',
          'react-konva': '^18',
          'react-konva-utils': 'latest',
          konva: KONVA_VERSION,
          'use-image': '1.1.4',
        },
      }}
      files={{
        '/App.js': { code },
        '/styles.css': { code: resetCss, hidden: true },
        '/index.js': {
          code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,
          hidden: true,
        },
      }}
    />
  );
}

function AngularKonva({ code }: { code: string }) {
  return (
    <Sandpack
      template="angular"
      options={editorOptions}
      customSetup={{
        dependencies: {
          '@angular/common': '^21.2.1',
          '@angular/compiler': '^21.2.1',
          '@angular/core': '^21.2.1',
          '@angular/platform-browser': '^21.2.1',
          konva: KONVA_VERSION,
          'ng2-konva': '12.0.0',
        },
      }}
      files={{
        'src/main.ts': {
          code: `import 'zone.js';
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import App from './app/app.component';
import './styles.css';

bootstrapApplication(App);`,
        },
        'src/app/app.component.ts': { code },
        'src/styles.css': { code: resetCss, hidden: true },
      }}
    />
  );
}

function VueKonva({ code }: { code: string }) {
  return (
    <Sandpack
      template="vue"
      options={editorOptions}
      customSetup={{
        dependencies: {
          'vue-konva': '3.4.0',
          konva: KONVA_VERSION,
        },
      }}
      files={{
        'src/App.vue': { code },
        'src/styles.css': { code: resetCss, hidden: true },
        'src/main.js': {
          code: `import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva';
import './styles.css';

createApp(App).use(VueKonva).mount('#app')`,
        },
      }}
    />
  );
}

function SvelteKonva({ code }: { code: string }) {
  return (
    <Sandpack
      template="svelte"
      options={editorOptions}
      customSetup={{
        dependencies: {
          'svelte-konva': 'latest',
          konva: KONVA_VERSION,
          svelte: '^4.0.0',
        },
      }}
      files={{
        'App.svelte': { code },
        'styles.css': { code: resetCss, hidden: true },
        'main.js': {
          code: `import App from './App.svelte';
import './styles.css';

const app = new App({
  target: document.getElementById('app')
});

export default app;`,
          hidden: true,
        },
      }}
    />
  );
}

// A code block is a live Sandpack demo when its meta says `live <framework>`,
// for example: ```js live vanilla
const sandboxes = {
  vanilla: Vanilla,
  react: ReactKonva,
  vue: VueKonva,
  svelte: SvelteKonva,
  angular: AngularKonva,
} as const;

export default function CodeBlockWrapper(props: Props): JSX.Element {
  const { live, metastring, children } = props as Props & {
    live?: boolean;
    metastring?: string;
  };

  if (live && metastring) {
    const framework = metastring
      .split(' ')
      .find((token): token is keyof typeof sandboxes => token in sandboxes);
    if (framework) {
      const Sandbox = sandboxes[framework];
      return <Sandbox code={children as string} />;
    }
  }

  return <CodeBlock {...props} />;
}
