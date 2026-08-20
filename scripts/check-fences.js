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
const ROOTS = [
  path.join(root, 'content'),
  path.join(root, 'i18n', 'zh-Hans', 'docusaurus-plugin-content-docs', 'current'),
];

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

const failures = [];

for (const directory of ROOTS) {
  for (const file of listMarkdownFiles(directory)) {
    const line = unclosedFenceLine(body(fs.readFileSync(file, 'utf8')));
    if (line !== null) {
      failures.push(`${path.relative(root, file)}:${line} code fence is never closed`);
    }
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
  console.log(`${total} pages have balanced code fences.`);
}
