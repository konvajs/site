#!/usr/bin/env node

/**
 * Post-build generator for the machine-readable surfaces.
 *
 * Two things happen here, and both must run AFTER `docusaurus build`:
 *
 *   1. build/zh-Hans/llms.txt  — a real Chinese index.
 *   2. build/**\/*.md          — a markdown twin of every documentation page.
 *
 * Why post-build: Docusaurus copies static/ verbatim into every locale
 * directory, so anything written to static/ before the build lands in
 * build/zh-Hans/ as English. That is exactly the bug this fixes — the shipped
 * /zh-Hans/llms.txt was byte-identical to the English one.
 *
 * The English llms.txt stays hand-curated in static/. Its intro is written
 * prose and its 36 links are chosen, not enumerated; generating it from
 * frontmatter would be a downgrade. The Chinese version reuses that structure
 * and substitutes each page's own Chinese title, description and URL.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const ZH_BUILD = path.join(BUILD, 'zh-Hans');
const EN_CONTENT = path.join(ROOT, 'content');
const ZH_CONTENT = path.join(
  ROOT, 'i18n', 'zh-Hans', 'docusaurus-plugin-content-docs', 'current'
);
const ZH_HEADER = path.join(ROOT, 'i18n', 'zh-Hans', 'llms-header.md');

const SITE = 'https://konvajs.org';

// The curated section headings, translated. A heading missing from this map is
// passed through untouched rather than silently dropped.
const ZH_HEADINGS = {
  'Docs': '文档',
  'Guides & Comparisons': '指南与对比',
  'Application Demos': '应用示例',
  'Framework Integrations': '框架集成',
  'Tutorials': '教程',
  'Optional': '可选',
};

/* ---------------------------------------------------------------- helpers */

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(entry.name) && !entry.name.startsWith('_')) out.push(full);
  }
  return out;
}

function parseFrontmatter(input) {
  // Some pages are stored with CRLF. Without normalising, the frontmatter
  // regex silently fails and every slug falls back to the filename, which
  // is how numbered files like 01-Fill.mdx produced the wrong route.
  const raw = input.replace(/\r\n/g, '\n');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: raw.slice(match[0].length) };
}

/**
 * MDX -> plain markdown. Drops imports and JSX component tags but keeps
 * everything inside them, and never touches the inside of a code fence.
 */
function mdxToMarkdown(body) {
  const out = [];
  let fence = null;

  for (const line of body.split('\n')) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (fence === null) {
        fence = marker;
        // ```js live react -> ```js  (the live-block meta is site-specific noise)
        out.push(line.replace(/^(\s*`{3,}|\s*~{3,})\s*(\w+)?.*$/, (m, f, lang) => f + (lang || '')));
        continue;
      }
      if (marker.length >= fence.length && marker[0] === fence[0]) fence = null;
      out.push(line);
      continue;
    }
    if (fence !== null) { out.push(line); continue; }

    if (/^\s*import\s.+from\s.+;?\s*$/.test(line)) continue;
    if (/^\s*export\s+(const|default)\s/.test(line)) continue;

    const stripped = line.replace(/<\/?[A-Z][A-Za-z0-9]*(\s[^>]*?)?\/?>/g, '').trimEnd();
    if (stripped.trim() === '' && line.trim() !== '') continue;
    out.push(stripped);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Slugs are written absolute ("/docs/react/index.html") or relative ("nodejs-setup"). */
function routeFor(file, contentRoot) {
  const { data } = parseFrontmatter(fs.readFileSync(file, 'utf-8'));
  const rel = path.relative(contentRoot, file);
  const dir = path.dirname(rel).split(path.sep).join('/');
  // No slug means Docusaurus uses its default route, which carries no
  // extension and is built as a directory with an index.html inside.
  const slug = data.slug || path.basename(file).replace(/\.mdx?$/, '');
  return slug.startsWith('/') ? slug.slice(1) : `${dir}/${slug}`;
}

function collect(contentRoot) {
  const pages = new Map();
  for (const file of walk(path.join(contentRoot, 'docs'))) {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    pages.set(routeFor(file, contentRoot), {
      title: data.title || path.basename(file).replace(/\.mdx?$/, '').replace(/_/g, ' '),
      description: data.description || '',
      markdown: mdxToMarkdown(body),
    });
  }
  return pages;
}

/* -------------------------------------------------- 1. Chinese llms.txt */

function buildChineseIndex(enIndex, zhPages) {
  const lines = [];
  let translated = 0;
  let passedThrough = 0;

  for (const line of enIndex.split('\n')) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      const zh = ZH_HEADINGS[heading[1].trim()];
      lines.push(zh ? `## ${zh}` : line);
      continue;
    }

    const link = line.match(/^- \[([^\]]+)\]\((https:\/\/konvajs\.org\/([^)]+))\)(?::\s*(.*))?$/);
    if (!link) { lines.push(line); continue; }

    const [, label, , route] = link;
    const page = zhPages.get(route);

    if (!page) {
      // Not an MDX page — a React route such as the demo gallery, or the API
      // reference. Still point at the Chinese build when one exists, so the
      // reader lands on the localised page; keep /api/ English on purpose,
      // since it is generated from English JSDoc and carries noindex.
      const localised = path.join(ZH_BUILD, route);
      if (!route.startsWith('api/') && fs.existsSync(localised)) {
        translated++;
        lines.push(line.replace(`${SITE}/${route}`, `${SITE}/zh-Hans/${route}`));
      } else {
        lines.push(line);
        passedThrough++;
      }
      continue;
    }

    translated++;
    const desc = page.description ? `: ${page.description}` : '';
    lines.push(`- [${page.title}](${SITE}/zh-Hans/${route})${desc}`);
  }

  return { text: lines.join('\n'), translated, passedThrough };
}

/* --------------------------------------------------- 2. .md page twins */

/**
 * Resolve where Docusaurus actually built a page. Slugs are written three ways
 * in this repo — "/docs/react/index.html", "Rect.html", and bare "nodejs-setup"
 * — and a page with no slug at all becomes a directory. Rather than predict the
 * shape, look for the file: the twin then always sits beside its own page.
 */
function resolveBuiltPage(buildRoot, route) {
  const candidates = [
    route.endsWith('.html') ? path.join(buildRoot, route) : null,
    path.join(buildRoot, route, 'index.html'),
    path.join(buildRoot, `${route}.html`),
  ].filter(Boolean);
  return candidates.find((c) => fs.existsSync(c)) || null;
}

function writeMarkdownTwins(pages, buildRoot, label) {
  let written = 0;
  const unbuilt = [];

  for (const [route, page] of pages) {
    const html = resolveBuiltPage(buildRoot, route);
    if (!html) { unbuilt.push(route); continue; }

    const prefix = buildRoot === BUILD ? '' : 'zh-Hans/';
    const header = [
      `# ${page.title}`,
      page.description ? `\n> ${page.description}` : '',
      `\nSource: ${SITE}/${prefix}${path.relative(buildRoot, html).split(path.sep).join('/')}`,
      '',
      '',
    ].join('\n');

    fs.writeFileSync(html.replace(/\.html$/, '.md'), header + page.markdown + '\n', 'utf-8');
    written++;
  }

  console.log(`  ${label}: wrote ${written} markdown twins`);
  if (unbuilt.length) {
    console.warn(`  ${label}: ${unbuilt.length} page(s) had no built HTML: ${unbuilt.slice(0, 3).join(', ')}`);
  }
  return written;
}

/* ------------------------------------------------------------------ main */

function main() {
  if (!fs.existsSync(BUILD)) {
    console.error('build/ does not exist — run docusaurus build first.');
    process.exitCode = 1;
    return;
  }

  const enPages = collect(EN_CONTENT);
  const zhPages = collect(ZH_CONTENT);
  console.log(`Collected ${enPages.size} English and ${zhPages.size} Chinese pages.`);

  // 1. Chinese index, overwriting the English copy Docusaurus placed there.
  const enIndex = fs.readFileSync(path.join(BUILD, 'llms.txt'), 'utf-8');
  const { text, translated, passedThrough } = buildChineseIndex(enIndex, zhPages);

  const header = fs.existsSync(ZH_HEADER) ? fs.readFileSync(ZH_HEADER, 'utf-8').trim() : null;
  const body = header
    ? header + '\n\n' + text.slice(text.indexOf('\n## '))
    : text;

  fs.writeFileSync(path.join(ZH_BUILD, 'llms.txt'), body.trimEnd() + '\n', 'utf-8');
  console.log(
    `  zh-Hans/llms.txt: ${translated} entries localised, ${passedThrough} left in English` +
      (header ? ', translated intro applied' : ', NO translated intro (i18n/zh-Hans/llms-header.md missing)')
  );

  // 2. Markdown twins for both locales.
  writeMarkdownTwins(enPages, BUILD, 'en');
  writeMarkdownTwins(zhPages, ZH_BUILD, 'zh-Hans');
}

if (require.main === module) main();

module.exports = { collect, routeFor, parseFrontmatter, mdxToMarkdown, resolveBuiltPage };
