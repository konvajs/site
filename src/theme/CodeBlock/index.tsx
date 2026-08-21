import React, {Suspense, useEffect, useRef, useState} from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type { WrapperProps } from '@docusaurus/types';
import dependencyVersions from './dependencies.json';

type Props = WrapperProps<typeof CodeBlockType>;
type SandpackComponent = (typeof import('@codesandbox/sandpack-react'))['Sandpack'];
type SandpackComponentProps = React.ComponentProps<SandpackComponent>;

const Sandpack: React.LazyExoticComponent<SandpackComponent> = React.lazy(() =>
  import('@codesandbox/sandpack-react').then((module) => ({
    default: module.Sandpack,
  }))
);

function DeferredSandpack({
  code,
  language,
  ...props
}: SandpackComponentProps & {code: string; language: string}): JSX.Element {
  const markerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      {rootMargin: '600px 0px'}
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  const staticCode = <CodeBlock language={language}>{code}</CodeBlock>;
  return (
    <div ref={markerRef}>
      {shouldLoad ? (
        <Suspense fallback={staticCode}>
          <Sandpack {...props} />
        </Suspense>
      ) : (
        staticCode
      )}
    </div>
  );
}

function packageVersion(packageName: keyof typeof dependencyVersions): string {
  return dependencyVersions[packageName];
}

// Extract npm package names from import statements.
function extractDeps(code: string): Record<string, string> {
  const deps: Record<string, string> = {};
  const patterns = [
    /\bfrom\s*['"]([^'"]+)['"]/g,
    /\bimport\s*['"]([^'"]+)['"]/g,
    /\b(?:import|require)\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of code.matchAll(pattern)) {
      const specifier = match[1];
      if (specifier.startsWith('.') || specifier.startsWith('/')) continue;
      const pkg = specifier.startsWith('@')
        ? specifier.split('/').slice(0, 2).join('/')
        : specifier.split('/')[0];
      if (!(pkg in dependencyVersions)) {
        throw new Error(`No Sandpack dependency version is set for "${pkg}".`);
      }
      deps[pkg] = dependencyVersions[pkg as keyof typeof dependencyVersions];
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
    <DeferredSandpack
      code={code}
      language="js"
      options={editorOptions}
      template="vanilla"
      customSetup={{
        dependencies: {
          konva: packageVersion('konva'),
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
    <DeferredSandpack
      code={code}
      language="jsx"
      template="react"
      options={editorOptions}
      customSetup={{
        dependencies: {
          ...extractDeps(code),
          react: packageVersion('react'),
          'react-dom': packageVersion('react-dom'),
          konva: packageVersion('konva'),
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
    <DeferredSandpack
      code={code}
      language="typescript"
      template="angular"
      options={editorOptions}
      customSetup={{
        dependencies: {
          ...extractDeps(code),
          '@angular/common': packageVersion('@angular/common'),
          '@angular/compiler': packageVersion('@angular/compiler'),
          '@angular/core': packageVersion('@angular/core'),
          '@angular/platform-browser': packageVersion('@angular/platform-browser'),
          rxjs: packageVersion('rxjs'),
          'zone.js': packageVersion('zone.js'),
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
    <DeferredSandpack
      code={code}
      language="vue"
      template="vue"
      options={editorOptions}
      customSetup={{
        dependencies: {
          ...extractDeps(code),
          vue: packageVersion('vue'),
          'vue-konva': packageVersion('vue-konva'),
          konva: packageVersion('konva'),
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
    <DeferredSandpack
      code={code}
      language="svelte"
      template="svelte"
      options={editorOptions}
      customSetup={{
        dependencies: {
          ...extractDeps(code),
          'svelte-konva': packageVersion('svelte-konva'),
          konva: packageVersion('konva'),
          svelte: packageVersion('svelte'),
        },
      }}
      files={{
        'App.svelte': { code },
        'styles.css': { code: resetCss, hidden: true },
        'main.js': {
          code: `import { mount } from 'svelte';
import App from './App.svelte';
import './styles.css';

const app = mount(App, {
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
