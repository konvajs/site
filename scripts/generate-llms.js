#!/usr/bin/env node

/**
 * Post-build generator for the machine-readable surfaces.
 *
 * Three things happen here, and all must run AFTER `docusaurus build`:
 *
 *   1. build/zh-Hans/llms.txt  — a real Chinese index.
 *   2. build/**\/*.md          — a markdown twin of every documentation page.
 *   3. build/llms-full.txt     — the index followed by every page, one file.
 *      build/llms-small.txt    — the same without the sandbox demos.
 *
 * Why post-build: Docusaurus copies static/ verbatim into every locale
 * directory, so anything written to static/ before the build lands in
 * build/zh-Hans/ as English. That is exactly the bug this fixes — the shipped
 * /zh-Hans/llms.txt was byte-identical to the English one.
 *
 * The English llms.txt stays hand-curated in static/. Its intro is written
 * prose and its 34 links are chosen, not enumerated; generating it from
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
const ZH_CODE = path.join(ROOT, 'i18n', 'zh-Hans', 'code.json');

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

function isEscaped(input, index) {
  let backslashes = 0;
  for (let cursor = index - 1; cursor >= 0 && input[cursor] === '\\'; cursor--) {
    backslashes++;
  }
  return backslashes % 2 === 1;
}

/** Remove MDX tags without removing JSX names inside inline code. */
function stripMdxTagsOutsideInlineCode(line, tagState = {
  inTag: false,
  quote: null,
  braceDepth: 0,
}) {
  let output = '';
  let inlineFence = null;

  for (let index = 0; index < line.length;) {
    if (tagState.inTag) {
      const character = line[index];

      if (tagState.quote !== null) {
        if (character === tagState.quote && !isEscaped(line, index)) {
          tagState.quote = null;
        }
      } else if (character === '"' || character === "'" || character === '`') {
        tagState.quote = character;
      } else if (character === '{') {
        tagState.braceDepth++;
      } else if (character === '}' && tagState.braceDepth > 0) {
        tagState.braceDepth--;
      } else if (character === '>' && tagState.braceDepth === 0) {
        tagState.inTag = false;
      }

      index++;
      continue;
    }

    if (line[index] === '`') {
      let end = index + 1;
      while (line[end] === '`') end++;
      const length = end - index;

      if (inlineFence === null) inlineFence = length;
      else if (inlineFence === length) inlineFence = null;

      output += line.slice(index, end);
      index = end;
      continue;
    }

    if (inlineFence === null && line[index] === '<') {
      const fragment = line.slice(index).match(/^<\/?\s*>/);
      if (fragment) {
        index += fragment[0].length;
        continue;
      }

      const tagStart = line.slice(index).match(
        /^<\/?[A-Za-z][A-Za-z0-9._:-]*(?=[\s/>]|$)/
      );
      if (tagStart) {
        tagState.inTag = true;
        tagState.quote = null;
        tagState.braceDepth = 0;
        index += tagStart[0].length;
        continue;
      }
    }

    output += line[index];
    index++;
  }

  return output;
}

/**
 * MDX -> plain markdown. Drops imports and JSX component tags but keeps
 * everything inside them, and never touches the inside of a code fence.
 */
function mdxToMarkdown(body) {
  const out = [];
  let fence = null;
  let skipHead = false;
  let iframe = null;
  const tagState = { inTag: false, quote: null, braceDepth: 0 };

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
      if (
        marker.length >= fence.length &&
        marker[0] === fence[0] &&
        line.slice(fenceMatch[0].length).trim() === ''
      ) {
        fence = null;
      }
      out.push(line);
      continue;
    }
    if (fence !== null) { out.push(line); continue; }

    if (/^\s*<Head>\s*$/.test(line)) {
      skipHead = true;
      continue;
    }
    if (skipHead) {
      if (/^\s*<\/Head>\s*$/.test(line)) skipHead = false;
      continue;
    }

    if (iframe !== null || /<iframe\b/.test(line)) {
      iframe = iframe === null ? line : `${iframe}\n${line}`;
      if (/<\/iframe>|\/>/.test(line)) {
        const source = iframe.match(/\bsrc=(['"])(.*?)\1/);
        if (source) out.push(`[Open the interactive demo](${source[2]})`);
        iframe = null;
      }
      continue;
    }

    if (/^\s*import\s.+from\s.+;?\s*$/.test(line)) continue;
    if (/^\s*export\s+(const|default)\s/.test(line)) continue;

    const image = line.match(/<img\b([^>]*)\/?>/);
    if (image) {
      const source = image[1].match(/\bsrc=(['"])(.*?)\1/);
      const alt = image[1].match(/\balt=(['"])(.*?)\1/);
      if (source) out.push(`![${alt ? alt[2] : ''}](${source[2]})`);
      continue;
    }

    const stripped = stripMdxTagsOutsideInlineCode(line, tagState).trimEnd();
    if (stripped.trim() === '' && line.trim() !== '') continue;
    out.push(stripped);
  }

  if (skipHead) throw new Error('Unclosed <Head> in MDX source.');
  if (iframe !== null) throw new Error('Unclosed <iframe> in MDX source.');
  if (tagState.inTag) throw new Error('Unclosed MDX tag in source.');

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

function buildChineseIndex(enIndex, zhPages, runtimePages = new Map()) {
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
    const runtimePage = runtimePages.get(route);

    if (!page) {
      if (runtimePage) {
        translated++;
        lines.push(
          `- [${runtimePage.title}](${SITE}/zh-Hans/${route}): ${runtimePage.description}`
        );
        continue;
      }
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

    const markdown =
      buildRoot === BUILD
        ? page.markdown
        : page.markdown.replace(
            /\]\(\/(docs|api)\//g,
            '](/zh-Hans/$1/'
          );
    fs.writeFileSync(html.replace(/\.html$/, '.md'), header + markdown + '\n', 'utf-8');
    written++;
  }

  console.log(`  ${label}: wrote ${written} markdown twins`);
  if (unbuilt.length) {
    console.warn(`  ${label}: ${unbuilt.length} page(s) had no built HTML: ${unbuilt.slice(0, 3).join(', ')}`);
  }
  return written;
}

/* ------------------------------------- 3. llms-full.txt / llms-small.txt */

/**
 * The llmstxt.org companion file: the curated index first, then the full text
 * of every page. Pages the index links to come first, in index order; the
 * rest follow alphabetically, so the file is stable between builds.
 *
 * The sandbox demos are 69 full applications, each in up to three frameworks,
 * and make up almost half of the tokens. llms-small.txt leaves them out so the
 * tutorials and guides fit a single model context.
 */
const SMALL_EXCLUDES = (route) => route.startsWith('docs/sandbox/');

function writeFullIndex(pages, buildRoot, label, fileName = 'llms-full.txt', exclude = () => false) {
  const indexPath = path.join(buildRoot, 'llms.txt');
  if (!fs.existsSync(indexPath)) {
    console.warn(`  ${label}: no llms.txt in build, skipping ${fileName}`);
    return 0;
  }
  const index = fs.readFileSync(indexPath, 'utf-8').trim();
  const localized = buildRoot !== BUILD;
  const prefix = localized ? 'zh-Hans/' : '';

  const ordered = [];
  for (const match of index.matchAll(/\]\(https:\/\/konvajs\.org\/(?:zh-Hans\/)?([^)#?]+)\)/g)) {
    const route = match[1].replace(/\/$/, '');
    if (pages.has(route) && !exclude(route) && !ordered.includes(route)) ordered.push(route);
  }
  for (const route of [...pages.keys()].sort()) {
    if (!exclude(route) && !ordered.includes(route)) ordered.push(route);
  }

  const sections = [index];
  for (const route of ordered) {
    const page = pages.get(route);
    const html = resolveBuiltPage(buildRoot, route);
    const source = html
      ? path.relative(buildRoot, html).split(path.sep).join('/')
      : route;
    const markdown = localized
      ? page.markdown.replace(/\]\(\/(docs|api)\//g, '](/zh-Hans/$1/')
      : page.markdown;
    sections.push(
      [
        `# ${page.title}`,
        page.description ? `\n> ${page.description}` : '',
        `\nSource: ${SITE}/${prefix}${source}`,
        '',
        markdown,
      ].join('\n')
    );
  }

  fs.writeFileSync(
    path.join(buildRoot, fileName),
    sections.join('\n\n---\n\n') + '\n',
    'utf-8'
  );
  console.log(`  ${label}: wrote ${fileName} with ${ordered.length} pages`);
  return ordered.length;
}

/** Advertise only locale sitemaps that this build actually contains. */
function writeRobotsSitemaps() {
  const robotsPath = path.join(BUILD, 'robots.txt');
  if (!fs.existsSync(robotsPath)) return;

  const base = fs
    .readFileSync(robotsPath, 'utf8')
    .split('\n')
    .filter((line) => !line.startsWith('Sitemap:'))
    .join('\n')
    .trimEnd();
  const sitemapRoutes = ['sitemap.xml'];
  for (const entry of fs.readdirSync(BUILD, { withFileTypes: true })) {
    if (
      entry.isDirectory() &&
      fs.existsSync(path.join(BUILD, entry.name, 'sitemap.xml'))
    ) {
      sitemapRoutes.push(`${entry.name}/sitemap.xml`);
    }
  }
  const lines = sitemapRoutes
    .sort()
    .map((route) => `Sitemap: ${SITE}/${route}`);
  fs.writeFileSync(robotsPath, `${base}\n\n${lines.join('\n')}\n`, 'utf8');
}

/* ------------------------------------------------------------------ main */

function main() {
  if (!fs.existsSync(BUILD)) {
    console.error('build/ does not exist — run docusaurus build first.');
    process.exitCode = 1;
    return;
  }

  const enPages = collect(EN_CONTENT);
  console.log(`Collected ${enPages.size} English pages.`);
  writeMarkdownTwins(enPages, BUILD, 'en');
  writeFullIndex(enPages, BUILD, 'en');
  writeFullIndex(enPages, BUILD, 'en', 'llms-small.txt', SMALL_EXCLUDES);
  writeRobotsSitemaps();

  const localeIndex = process.argv.indexOf('--locale');
  const requestedLocale = localeIndex === -1 ? null : process.argv[localeIndex + 1];
  if (requestedLocale === 'en') return;

  if (!fs.existsSync(ZH_CONTENT)) {
    console.log('Chinese translation is not installed; skipping localized output.');
    return;
  }
  if (!fs.existsSync(ZH_BUILD)) {
    console.error('Chinese sources exist, but build/zh-Hans does not.');
    process.exitCode = 1;
    return;
  }

  const zhPages = collect(ZH_CONTENT);
  console.log(`Collected ${zhPages.size} Chinese pages.`);

  // Overwrite the English index that Docusaurus copied into the locale build.
  const enIndex = fs.readFileSync(path.join(BUILD, 'llms.txt'), 'utf-8');
  const zhCode = fs.existsSync(ZH_CODE)
    ? JSON.parse(fs.readFileSync(ZH_CODE, 'utf8'))
    : {};
  const runtimePages = new Map([
    [
      'docs/sandbox.html',
      {
        title: zhCode['demos.title']?.message ?? 'Demos',
        description: zhCode['demos.description']?.message ?? '',
      },
    ],
  ]);
  const { text, translated, passedThrough } = buildChineseIndex(
    enIndex,
    zhPages,
    runtimePages
  );
  const header = fs.existsSync(ZH_HEADER) ? fs.readFileSync(ZH_HEADER, 'utf-8').trim() : null;
  const localizedBody = header
    ? header + '\n\n' + text.slice(text.indexOf('\n## '))
    : text;

  fs.writeFileSync(
    path.join(ZH_BUILD, 'llms.txt'),
    localizedBody.trimEnd() + '\n',
    'utf-8'
  );
  console.log(
    `  zh-Hans/llms.txt: ${translated} entries localised, ${passedThrough} left in English` +
      (header ? ', translated intro applied' : ', NO translated intro (i18n/zh-Hans/llms-header.md missing)')
  );
  writeMarkdownTwins(zhPages, ZH_BUILD, 'zh-Hans');
  writeFullIndex(zhPages, ZH_BUILD, 'zh-Hans');
  writeFullIndex(zhPages, ZH_BUILD, 'zh-Hans', 'llms-small.txt', SMALL_EXCLUDES);
}

if (require.main === module) main();

module.exports = {
  collect,
  routeFor,
  parseFrontmatter,
  mdxToMarkdown,
  resolveBuiltPage,
  stripMdxTagsOutsideInlineCode,
};
