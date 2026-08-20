#!/usr/bin/env node

/**
 * Code-fence balance check.
 *
 * An unbalanced fence at the end of a file renders fine, because nothing
 * follows it — so neither the build nor a review catches it. It only bites
 * later, when someone appends content and it silently disappears into an open
 * code block. 40 files were in that state before 2026-08-20.
 *
 * Note that a ``` block can legitimately be closed by ````, so this counts
 * fence depth rather than pairing backtick runs.
 */

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const checkTranslations = process.argv.includes('--translations');
const ROOTS = [
  path.join(root, 'content'),
  ...(checkTranslations
    ? [path.join(root, 'i18n', 'zh-Hans', 'docusaurus-plugin-content-docs', 'current')]
    : []),
];
const ENGLISH_DOCS = path.join(root, 'content', 'docs');
const CHINESE_DOCS = path.join(
  root,
  'i18n',
  'zh-Hans',
  'docusaurus-plugin-content-docs',
  'current',
  'docs'
);

function listMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  const files = [];

  function visit(currentDirectory) {
    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      const entryPath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
        files.push(entryPath);
      }
    }
  }

  visit(directory);
  return files.sort();
}

/** Strip front matter so a `---` delimiter is never read as content. */
function body(contents) {
  const match = /^---\n[\s\S]*?\n---\n([\s\S]*)$/.exec(contents);
  return match ? match[1] : contents;
}

/** Returns the 1-based line of the fence left open at EOF, or null. */
function unclosedFenceLine(text) {
  let depth = null;
  let openedAt = null;

  text.split('\n').forEach((line, index) => {
    const match = /^\s*(`{3,})/.exec(line);
    if (!match) return;

    if (depth === null) {
      depth = match[1].length;
      openedAt = index + 1;
    } else if (match[1].length >= depth) {
      depth = null;
      openedAt = null;
    }
  });

  return openedAt;
}

/** Return every fenced block, including its exact metadata and body bytes. */
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
        metadata: match[2],
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

/** Return Tabs attributes that control which framework demo is displayed. */
function tabAttributes(text) {
  const attributes = [];
  for (const tag of text.matchAll(/<(?:Tabs|TabItem)\b[^>]*>/g)) {
    for (const attribute of tag[0].matchAll(
      /\b(value|label)\s*=\s*("[^"]*"|'[^']*'|\{[^}]*\})/g
    )) {
      attributes.push(`${attribute[1]}=${attribute[2]}`);
    }
  }
  return attributes;
}

const failures = [];

for (const directory of ROOTS) {
  for (const file of listMarkdownFiles(directory)) {
    const line = unclosedFenceLine(body(fs.readFileSync(file, 'utf8')));
    if (line !== null) {
      failures.push(`${path.relative(root, file)}:${line} code fence is never closed`);
    }
  }
}

let pairedPages = 0;
let checkedTabAttributes = 0;
for (const englishFile of checkTranslations ? listMarkdownFiles(ENGLISH_DOCS) : []) {
  const relativePath = path.relative(ENGLISH_DOCS, englishFile);
  const chineseFile = path.join(CHINESE_DOCS, relativePath);
  if (!fs.existsSync(chineseFile)) continue;
  pairedPages++;

  const englishBlocks = fencedBlocks(body(fs.readFileSync(englishFile, 'utf8')));
  const chineseBlocks = fencedBlocks(body(fs.readFileSync(chineseFile, 'utf8')));
  if (englishBlocks.length !== chineseBlocks.length) {
    failures.push(
      `${relativePath} has ${englishBlocks.length} English code blocks and ` +
        `${chineseBlocks.length} Chinese code blocks`
    );
    continue;
  }

  englishBlocks.forEach((englishBlock, index) => {
    const chineseBlock = chineseBlocks[index];
    if (englishBlock.metadata !== chineseBlock.metadata) {
      failures.push(
        `${relativePath}:${chineseBlock.line} code-fence metadata differs from English`
      );
    }
    if (englishBlock.body !== chineseBlock.body) {
      failures.push(
        `${relativePath}:${chineseBlock.line} fenced code differs from English`
      );
    }
  });

  const englishTabs = tabAttributes(fs.readFileSync(englishFile, 'utf8'));
  const chineseTabs = tabAttributes(fs.readFileSync(chineseFile, 'utf8'));
  checkedTabAttributes += englishTabs.length;
  if (
    englishTabs.length !== chineseTabs.length ||
    englishTabs.some((attribute, index) => attribute !== chineseTabs[index])
  ) {
    failures.push(`${relativePath} has Tabs value or label attributes that differ`);
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  console.error(
    '\nClose the fence, or delete it if it is a stray one at the end of the file.' +
      '\nMake the same change in both locales.'
  );
  process.exitCode = 1;
} else {
  const total = ROOTS.reduce(
    (count, directory) => count + listMarkdownFiles(directory).length,
    0
  );
  const translationResult = checkTranslations
    ? `; ${pairedPages} translated pages have byte-identical fenced code and ` +
      `${checkedTabAttributes} Tabs attributes`
    : '';
  console.log(`${total} pages have balanced code fences${translationResult}.`);
}
