#!/usr/bin/env node

/**
 * Make sure that each package imported by an English live demo has an exact
 * Sandpack version. The same manifest supplies the hidden template files.
 */

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const docsDirectory = path.join(root, 'content', 'docs');
const codeBlockFile = path.join(root, 'src', 'theme', 'CodeBlock', 'index.tsx');
const manifestFile = path.join(
  root,
  'src',
  'theme',
  'CodeBlock',
  'dependencies.json'
);
const packageVersions = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
const failures = [];

const REQUIRED_TEMPLATE_DEPENDENCIES = {
  Vanilla: ['konva'],
  ReactKonva: ['react', 'react-dom', 'konva'],
  AngularKonva: [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/platform-browser',
    'rxjs',
    'zone.js',
  ],
  VueKonva: ['vue', 'vue-konva', 'konva'],
  SvelteKonva: ['svelte', 'svelte-konva', 'konva'],
};

function listMarkdownFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(entryPath));
    } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      files.push(entryPath);
    }
  }
  return files.sort();
}

function fencedBlocks(text) {
  const blocks = [];
  let active = null;

  text.split('\n').forEach((line, index) => {
    const match = /^\s*(`{3,})(.*)$/.exec(line);
    if (!match) {
      if (active) active.lines.push(line);
      return;
    }

    if (!active) {
      active = {
        depth: match[1].length,
        metadata: match[2].trim(),
        line: index + 1,
        lines: [],
      };
    } else if (match[1].length >= active.depth) {
      blocks.push({
        metadata: active.metadata,
        body: active.lines.join('\n'),
        line: active.line,
      });
      active = null;
    } else {
      active.lines.push(line);
    }
  });

  return blocks;
}

function packageName(specifier) {
  if (specifier.startsWith('.') || specifier.startsWith('/')) return null;
  return specifier.startsWith('@')
    ? specifier.split('/').slice(0, 2).join('/')
    : specifier.split('/')[0];
}

function importedPackages(code) {
  const packages = new Set();
  const patterns = [
    /\bfrom\s*['"]([^'"]+)['"]/g,
    /\bimport\s*['"]([^'"]+)['"]/g,
    /\b(?:import|require)\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of code.matchAll(pattern)) {
      const name = packageName(match[1]);
      if (name) packages.add(name);
    }
  }
  return packages;
}

for (const [packageName, version] of Object.entries(packageVersions)) {
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
    failures.push(`${packageName} has a non-exact version: ${version}`);
  }
}

const usedPackages = new Set();
let liveDemoCount = 0;

for (const file of listMarkdownFiles(docsDirectory)) {
  for (const block of fencedBlocks(fs.readFileSync(file, 'utf8'))) {
    const metadata = block.metadata.split(/\s+/);
    if (!metadata.includes('live')) continue;
    liveDemoCount++;

    const framework = ['vanilla', 'react', 'vue', 'svelte', 'angular'].find((name) =>
      metadata.includes(name)
    );
    if (!framework) {
      failures.push(
        `${path.relative(root, file)}:${block.line} has live code without a supported framework`
      );
    }

    for (const packageName of importedPackages(block.body)) {
      usedPackages.add(packageName);
      if (!(packageName in packageVersions)) {
        failures.push(
          `${path.relative(root, file)}:${block.line} imports ${packageName}, ` +
            'but the Sandpack manifest has no version'
        );
      }
    }
  }
}

const codeBlockSource = fs.readFileSync(codeBlockFile, 'utf8');

for (const [component, dependencies] of Object.entries(
  REQUIRED_TEMPLATE_DEPENDENCIES
)) {
  const componentBody = codeBlockSource.match(
    new RegExp(`function ${component}\\b[\\s\\S]*?\\n}`)
  )?.[0];
  if (!componentBody) {
    failures.push(`Sandpack component ${component} does not exist`);
    continue;
  }
  for (const dependency of dependencies) {
    if (!componentBody.includes(`packageVersion('${dependency}')`)) {
      failures.push(
        `${component} does not install its required ${dependency} dependency`
      );
    }
  }
}

for (const match of codeBlockSource.matchAll(/packageVersion\('([^']+)'\)/g)) {
  usedPackages.add(match[1]);
  if (!(match[1] in packageVersions)) {
    failures.push(`CodeBlock requests ${match[1]}, but the Sandpack manifest has no version`);
  }
}

const inlineVersion = codeBlockSource.match(
  /['"](?:latest|[~^<>*=]*\d+(?:\.\d+){0,2}(?:\.x)?)['"]/i
);
if (inlineVersion) {
  failures.push(
    `CodeBlock contains the inline version ${inlineVersion[0]}; use the manifest instead`
  );
}

for (const packageName of Object.keys(packageVersions)) {
  if (!usedPackages.has(packageName)) {
    failures.push(`${packageName} is not used by a live demo or a template startup file`);
  }
}

const installedKonvaVersion = JSON.parse(
  fs.readFileSync(path.join(root, 'node_modules', 'konva', 'package.json'), 'utf8')
).version;
if (packageVersions.konva !== installedKonvaVersion) {
  failures.push(
    `Sandpack uses Konva ${packageVersions.konva}, but the site uses ${installedKonvaVersion}`
  );
}

const reactMajor = packageVersions.react.split('.')[0];
if (
  packageVersions['react-dom'].split('.')[0] !== reactMajor ||
  packageVersions['react-konva'].split('.')[0] !== reactMajor
) {
  failures.push('React, react-dom, and react-konva must use the same major version');
}

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log(
    `${liveDemoCount} live demos use ${Object.keys(packageVersions).length} exact package versions.`
  );
}
