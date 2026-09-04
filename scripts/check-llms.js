#!/usr/bin/env node

/**
 * Verifies the post-build machine-readable surfaces.
 *
 * checksitemap.js only validates URLs that appear in sitemap.xml, and the .md
 * twins never enter the sitemap. Without this check a new page ships without
 * its markdown twin forever, and nothing says so.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const failures = [];
const checkTranslations = process.argv.includes('--translations');

const {
  collect,
  mdxToMarkdown,
  resolveBuiltPage,
  stripMdxTagsOutsideInlineCode,
} = require('./generate-llms');

function textOutsideCode(markdown) {
  const output = [];
  let fence = null;

  for (const line of markdown.split('\n')) {
    const markerMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (markerMatch) {
      const marker = markerMatch[1];
      if (fence === null) {
        fence = marker;
        continue;
      }
      if (
        marker[0] === fence[0] &&
        marker.length >= fence.length &&
        line.slice(markerMatch[0].length).trim() === ''
      ) {
        fence = null;
      }
      continue;
    }
    if (fence !== null) continue;

    let inlineFence = null;
    let prose = '';
    for (let index = 0; index < line.length;) {
      if (line[index] === '`') {
        let end = index + 1;
        while (line[end] === '`') end++;
        const length = end - index;
        if (inlineFence === null) inlineFence = length;
        else if (inlineFence === length) inlineFence = null;
        index = end;
        continue;
      }
      if (inlineFence === null) prose += line[index];
      index++;
    }
    output.push(prose);
  }

  return output.join('\n');
}

const inlineCodeExample = '**`data-testid` on `<Stage>` does not work.**';
if (stripMdxTagsOutsideInlineCode(inlineCodeExample) !== inlineCodeExample) {
  failures.push('The markdown generator removes MDX names from inline code.');
}

const jsxExample = [
  '<Head>',
  '  <script>{JSON.stringify({ value: true })}</script>',
  '</Head>',
  '<div><img src="/logo.png" alt="Logo" /></div>',
  '<iframe src="https://example.com/demo"></iframe>',
].join('\n');
const convertedJsxExample = mdxToMarkdown(jsxExample);
if (
  /<(?:Head|script|div|img|iframe)\b|JSON\.stringify/.test(convertedJsxExample) ||
  !convertedJsxExample.includes('[Open the interactive demo](https://example.com/demo)')
) {
  failures.push('The markdown generator leaves MDX or JSX outside code fences.');
}

const selfClosingIframeExample = [
  '<iframe',
  '  src="https://example.com/self-closing"',
  '  style={{ width: "100%" }}',
  '/>',
  '',
  'Prose after the demo.',
].join('\n');
const convertedSelfClosingIframe = mdxToMarkdown(selfClosingIframeExample);
if (
  !convertedSelfClosingIframe.includes(
    '[Open the interactive demo](https://example.com/self-closing)'
  ) ||
  !convertedSelfClosingIframe.includes('Prose after the demo.')
) {
  failures.push(
    'The markdown generator drops content after a self-closing iframe.'
  );
}

const multilineTagExample = [
  '<Callout',
  '  type="note"',
  '  action={() => value > 0}',
  '>',
  'Prose inside the callout.',
  '</Callout>',
  '<img alt="Logo" src="/logo.png" />',
].join('\n');
const convertedMultilineTag = mdxToMarkdown(multilineTagExample);
if (
  /<\/?Callout\b|<img\b/.test(convertedMultilineTag) ||
  !convertedMultilineTag.includes('Prose inside the callout.') ||
  !convertedMultilineTag.includes('![Logo](/logo.png)')
) {
  failures.push('The markdown generator does not safely convert multiline MDX tags.');
}

for (const [label, source] of [
  ['Head', '<Head>\n<meta name="test" content="value" />\n'],
  ['MDX tag', '<Callout\n  type="note"\n'],
]) {
  try {
    mdxToMarkdown(source);
    failures.push(`The markdown generator accepts an unclosed ${label}.`);
  } catch {
    // Expected: incomplete MDX must fail instead of dropping the remaining page.
  }
}

const fenceExample = [
  '~~~~js',
  '<Component prop={{ value: true }} />',
  '~~~~~',
  'Use `<Stage>` in prose.',
].join('\n');
if (/<[A-Za-z]/.test(textOutsideCode(fenceExample))) {
  failures.push('The Markdown check reads code fences or inline code as raw MDX.');
}

const ambiguousFenceExample = [
  '```js',
  '<InsideCode />',
  '````not-a-closing-fence',
  '<StillInsideCode />',
  '```',
  '<OutsideTag>Prose after the fence.</OutsideTag>',
].join('\n');
const convertedAmbiguousFence = mdxToMarkdown(ambiguousFenceExample);
if (
  !convertedAmbiguousFence.includes('<StillInsideCode />') ||
  !convertedAmbiguousFence.includes('Prose after the fence.') ||
  /<OutsideTag>/.test(convertedAmbiguousFence) ||
  /<[A-Za-z]/.test(textOutsideCode(convertedAmbiguousFence))
) {
  failures.push('The Markdown tools close a code fence that has trailing content.');
}

const fragmentExample = [
  '<>',
  'Text in a multiline fragment.',
  '</>',
  '<>Text in an inline fragment.</>',
].join('\n');
const convertedFragment = mdxToMarkdown(fragmentExample);
if (
  convertedFragment.includes('<>') ||
  !convertedFragment.includes('Text in a multiline fragment.') ||
  !convertedFragment.includes('Text in an inline fragment.')
) {
  failures.push('The markdown generator drops content inside JSX fragments.');
}

// Check against the pages that actually have an MDX source, not against every
// built HTML file — routes like /docs/sandbox.html come from a React page in
// src/pages/ and have no markdown to twin.
const localizedContentRoot = path.join(
  ROOT,
  'i18n',
  'zh-Hans',
  'docusaurus-plugin-content-docs',
  'current'
);
const locales = [
  ['en', path.join(ROOT, 'content'), path.join(ROOT, 'build')],
];
if (checkTranslations && fs.existsSync(localizedContentRoot)) {
  locales.push([
    'zh-Hans',
    localizedContentRoot,
    path.join(ROOT, 'build', 'zh-Hans'),
  ]);
}

for (const [label, contentRoot, buildRoot] of locales) {
  const routes = [...collect(contentRoot).keys()];
  const missing = routes.filter((route) => {
    const html = resolveBuiltPage(buildRoot, route);
    return !html || !fs.existsSync(html.replace(/\.html$/, '.md'));
  });
  if (missing.length) {
    failures.push(
      `${label}: ${missing.length} of ${routes.length} pages have no .md twin, e.g. ${missing[0]}`
    );
  } else {
    console.log(`${label}: ${routes.length} pages, each with a markdown twin.`);
  }

  const withoutSandbox = routes.filter((route) => !route.startsWith('docs/sandbox/')).length;
  for (const [fileName, expected] of [['llms-full.txt', routes.length], ['llms-small.txt', withoutSandbox]]) {
    const file = path.join(buildRoot, fileName);
    if (!fs.existsSync(file)) {
      failures.push(`${label}: ${fileName} was not generated.`);
      continue;
    }
    const sources = (fs.readFileSync(file, 'utf8').match(/^Source: /gm) || []).length;
    if (sources !== expected) {
      failures.push(`${label}: ${fileName} has ${sources} pages, expected ${expected}.`);
    } else {
      console.log(`${label}: ${fileName} carries ${sources} pages.`);
    }
  }

  for (const route of routes) {
    const html = resolveBuiltPage(buildRoot, route);
    if (!html) continue;
    const markdownPath = html.replace(/\.html$/, '.md');
    if (!fs.existsSync(markdownPath)) continue;
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const outsideFences = textOutsideCode(markdown);
    if (
      /<\/?[A-Za-z][A-Za-z0-9._:-]*(?=[\s/>])|<\/?>(?=\s|$)|style=\{\{|JSON\.stringify/.test(
        outsideFences
      )
    ) {
      failures.push(`${label}: ${route} has raw MDX or JSX in its markdown twin.`);
      break;
    }
    if (label === 'zh-Hans' && /\]\(\/(?:docs|api)\//.test(outsideFences)) {
      failures.push(`${label}: ${route} has a link that leaves the locale.`);
      break;
    }
  }
}

// The Chinese index must not be the English one.
if (checkTranslations && fs.existsSync(localizedContentRoot)) {
  const zhIndex = path.join(ROOT, 'build', 'zh-Hans', 'llms.txt');
  const enIndex = path.join(ROOT, 'build', 'llms.txt');
  if (!fs.existsSync(zhIndex) || !fs.existsSync(enIndex)) {
    failures.push('llms.txt missing from one or both locale builds.');
  } else {
  const zh = fs.readFileSync(zhIndex, 'utf-8');
  if (zh === fs.readFileSync(enIndex, 'utf-8')) {
    failures.push('zh-Hans/llms.txt is byte-identical to the English one.');
  } else {
    const cjk = (zh.match(/[一-鿿]/g) || []).length;
    if (cjk < 200) failures.push(`zh-Hans/llms.txt has only ${cjk} CJK characters — not localised.`);
    else console.log(`zh-Hans/llms.txt is localised (${cjk} CJK characters).`);
  }
  }
}

if (failures.length) {
  failures.forEach((f) => console.error(f));
  process.exitCode = 1;
}
