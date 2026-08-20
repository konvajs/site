#!/usr/bin/env node

/**
 * Generates the machine-readable documentation sets:
 *
 *   static/llms-full.txt    index + every docs page + full API reference
 *   static/llms-medium.txt  index + guides, posts and the most-retrieved pages
 *
 * The prose comes from content/docs/**, the API reference from docs.json.
 * Shipping signatures alone taught models method names and no patterns, so
 * the tutorial bodies are inlined here rather than linked.
 *
 * Each Konva class only lists its OWN methods (not inherited),
 * so the output stays manageable despite the large API surface.
 *
 * Run: node scripts/generate-llms-full.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS_PATH = path.join(ROOT, 'docs.json');
const LLMS_TXT_PATH = path.join(ROOT, 'static', 'llms.txt');
const OUTPUT_PATH = path.join(ROOT, 'static', 'llms-full.txt');
const MEDIUM_PATH = path.join(ROOT, 'static', 'llms-medium.txt');

function formatParams(params) {
  if (!params || params.length === 0) return '';
  return params
    .map((p) => {
      const type = p.type ? p.type.names.join(' | ') : 'any';
      const opt = p.optional ? '?' : '';
      return `${p.name}${opt}: ${type}`;
    })
    .join(', ');
}

function formatReturns(returns) {
  if (!returns || returns.length === 0) return '';
  return returns
    .map((r) => (r.type ? r.type.names.join(' | ') : 'any'))
    .join(' | ');
}

function formatMethod(m) {
  const params = formatParams(m.params);
  const ret = formatReturns(m.returns);
  const desc = m.description ? ` — ${m.description.replace(/\n/g, ' ').trim()}` : '';
  const retStr = ret ? ` → ${ret}` : '';
  return `  ${m.name}(${params})${retStr}${desc}`;
}

function formatConstructorParams(params) {
  if (!params || params.length === 0) return '';

  // Filter to only top-level config params (not nested like config.x)
  // and the config object itself
  const topLevel = params.filter(
    (p) => p.name && !p.name.includes('.')
  );
  const nested = params.filter(
    (p) => p.name && p.name.includes('.')
  );

  if (topLevel.length === 0 && nested.length === 0) return '';

  let lines = [];

  // Show key config properties (the nested ones like config.x, config.y)
  const configParams = nested.map((p) => {
    const name = p.name.replace('config.', '');
    const type = p.type ? p.type.names.join(' | ') : 'any';
    const opt = p.optional ? ' (optional)' : '';
    const desc = p.description ? ` — ${p.description.replace(/\n/g, ' ').trim()}` : '';
    return `    ${name}: ${type}${opt}${desc}`;
  });

  if (configParams.length > 0) {
    lines.push('  Constructor config:');
    lines.push(...configParams);
  }

  return lines.join('\n');
}

function formatProperty(p) {
  const type = p.type ? p.type.names.join(' | ') : 'any';
  const desc = p.description ? ` — ${p.description.replace(/\n/g, ' ').trim()}` : '';
  const def = p.defaultvalue !== undefined ? ` (default: ${p.defaultvalue})` : '';
  return `  ${p.name}: ${type}${def}${desc}`;
}

/* ---------- documentation prose (appended by the docs-section patch) ---------- */

const DOCS_ROOT = path.join(ROOT, 'content', 'docs');

/**
 * Pages that go into llms-medium.txt, in order. Chosen from the CrawlChat
 * retrieval log (the pages models actually pull) plus every guide and post,
 * which are the format LLMs cite most.
 */
const MEDIUM_PRIORITY = [
  'docs/index.html',
  'docs/overview.html',
  'docs/react/index.html',
  'docs/vue/index.html',
  'docs/svelte/index.html',
  'docs/angular/index.html',
  'docs/shapes/Image.html',
  'docs/react/Images.html',
  'docs/select_and_transform/Basic_demo.html',
  'docs/data_and_serialization/High-Quality-Export.html',
  'docs/data_and_serialization/Stage_Data_URL.html',
  'docs/react/Transformer.html',
  'docs/nodejs/nodejs-setup',
  'docs/performance/All_Performance_Tips.html',
  'docs/sandbox/Custom_Font.html',
  'docs/sandbox/Objects_Snapping.html',
  'docs/sandbox/Infinite_Canvas.html',
  'docs/faq.html',
];

function walkDocs(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDocs(full, out);
    else if (/\.mdx?$/.test(entry.name) && !entry.name.startsWith('_')) out.push(full);
  }
  return out;
}

function parseFrontmatter(raw) {
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
 * MDX -> plain markdown. Drops import statements and JSX component tags but
 * keeps everything inside them, and never touches the inside of a code fence.
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

    // Strip standalone JSX component tags (<Tabs>, </TabItem>, <Demo ... />)
    const stripped = line.replace(/<\/?[A-Z][A-Za-z0-9]*(\s[^>]*?)?\/?>/g, '').trimEnd();
    if (stripped.trim() === '' && line.trim() !== '') continue;
    out.push(stripped);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function collectDocPages() {
  const pages = [];
  for (const file of walkDocs(DOCS_ROOT)) {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data, body } = parseFrontmatter(raw);

    const rel = path.relative(path.join(ROOT, 'content'), file);
    const dir = path.dirname(rel).split(path.sep).join('/');
    const slug = data.slug || path.basename(file).replace(/\.mdx?$/, '') + '.html';
    // Slugs are written both ways in this repo: absolute ("/docs/react/index.html")
    // and relative to the page's own directory ("nodejs-setup").
    const route = slug.startsWith('/') ? slug.slice(1) : `${dir}/${slug}`;

    pages.push({
      route,
      url: `https://konvajs.org/${route}`,
      title: data.title || path.basename(file).replace(/\.mdx?$/, '').replace(/_/g, ' '),
      description: data.description || '',
      content: mdxToMarkdown(body),
    });
  }

  // Stable, human-sensible order: top-level docs first, then by path.
  pages.sort((a, b) => {
    const depth = (p) => p.route.split('/').length;
    return depth(a) - depth(b) || a.route.localeCompare(b.route);
  });
  return pages;
}

function renderDocPages(pages) {
  const lines = ['# Documentation', ''];
  for (const p of pages) {
    lines.push(`## ${p.title}`);
    lines.push(`Source: ${p.url}`);
    if (p.description) lines.push(`Summary: ${p.description}`);
    lines.push('');
    lines.push(p.content);
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

function main() {
  // Read inputs
  const docs = JSON.parse(fs.readFileSync(DOCS_PATH, 'utf-8'));
  const llmsTxt = fs.readFileSync(LLMS_TXT_PATH, 'utf-8');

  const lines = [];

  // Start with the curated llms.txt content
  lines.push(llmsTxt.trim());
  lines.push('');
  lines.push('---');
  lines.push('');

  // Documentation prose, before the API reference: models need the patterns
  // more than the signatures.
  const docPages = collectDocPages();
  lines.push(renderDocPages(docPages));
  lines.push('');

  lines.push('# Full API Reference');
  lines.push('');

  // Process the Konva namespace first (static methods and properties)
  const konvaNs = docs['Konva'];
  if (konvaNs) {
    lines.push('## Konva (namespace)');
    lines.push('');

    if (konvaNs.properties && konvaNs.properties.length > 0) {
      lines.push('### Static Properties');
      for (const p of konvaNs.properties) {
        lines.push(formatProperty(p));
      }
      lines.push('');
    }

    if (konvaNs.methods && konvaNs.methods.length > 0) {
      lines.push('### Static Methods');
      for (const m of konvaNs.methods) {
        lines.push(formatMethod(m));
      }
      lines.push('');
    }

    if (konvaNs.classes) {
      lines.push(`### Classes: ${konvaNs.classes.join(', ')}`);
      lines.push('');
    }

    if (konvaNs.namespaces) {
      lines.push(`### Namespaces: ${konvaNs.namespaces.join(', ')}`);
      lines.push('');
    }
  }

  // Desired order: base classes first, then shapes
  const classOrder = [
    'Konva.Node',
    'Konva.Container',
    'Konva.Stage',
    'Konva.Layer',
    'Konva.FastLayer',
    'Konva.Group',
    'Konva.Shape',
    'Konva.Rect',
    'Konva.Circle',
    'Konva.Ellipse',
    'Konva.Line',
    'Konva.Arrow',
    'Konva.Arc',
    'Konva.Ring',
    'Konva.Wedge',
    'Konva.Star',
    'Konva.RegularPolygon',
    'Konva.Path',
    'Konva.Text',
    'Konva.TextPath',
    'Konva.Image',
    'Konva.Sprite',
    'Konva.Label',
    'Konva.Tag',
    'Konva.Transformer',
    'Konva.Animation',
    'Konva.Tween',
    'Konva.Canvas',
    'Konva.Context',
    'Konva.Transform',
  ];

  // Namespaces are handled separately at the end — exclude them from class processing
  const namespaceKeys = new Set(konvaNs?.namespaces || []);

  // Collect any classes not in the explicit order
  const allClassKeys = Object.keys(docs).filter(
    (k) => k !== 'Konva' && k.startsWith('Konva.') && !namespaceKeys.has(k)
  );
  const remaining = allClassKeys.filter((k) => !classOrder.includes(k));
  const orderedKeys = [
    ...classOrder.filter((k) => docs[k] && !namespaceKeys.has(k)),
    ...remaining,
  ];

  // Process each class
  for (const key of orderedKeys) {
    const cls = docs[key];
    if (!cls) continue;

    const name = cls.name || key.replace('Konva.', '');
    const extendsStr = cls.augments ? ` extends ${cls.augments.join(', ')}` : '';
    const desc = cls.classdesc || cls.description || '';

    lines.push(`## ${key}${extendsStr}`);
    if (desc) {
      lines.push('');
      lines.push(desc.replace(/\n/g, ' ').trim());
    }
    lines.push('');

    // Constructor params (only for classes with config-style params)
    const ctorParams = formatConstructorParams(cls.params);
    if (ctorParams) {
      lines.push(ctorParams);
      lines.push('');
    }

    // Methods
    if (cls.methods && cls.methods.length > 0) {
      // Separate getter/setter properties from real methods
      const realMethods = [];
      const getSetters = [];

      for (const m of cls.methods) {
        // Heuristic: if description starts with "get/set" or "get " or "set ",
        // it's a getter/setter property
        const d = (m.description || '').toLowerCase();
        if (d.startsWith('get/set') || d.startsWith('get ') || d.startsWith('set ')) {
          getSetters.push(m);
        } else {
          realMethods.push(m);
        }
      }

      if (getSetters.length > 0) {
        lines.push('### Properties (getter/setter)');
        for (const m of getSetters) {
          const type = m.returns
            ? m.returns.map((r) => r.type?.names?.join(' | ')).join(' | ')
            : m.params?.[0]?.type?.names?.join(' | ') || 'any';
          const desc = m.description ? ` — ${m.description.replace(/\n/g, ' ').trim()}` : '';
          lines.push(`  ${m.name}: ${type}${desc}`);
        }
        lines.push('');
      }

      if (realMethods.length > 0) {
        lines.push('### Methods');
        for (const m of realMethods) {
          lines.push(formatMethod(m));
        }
        lines.push('');
      }
    }

    // Examples (only include first example if present)
    if (cls.examples && cls.examples.length > 0) {
      lines.push('### Example');
      lines.push('```javascript');
      lines.push(cls.examples[0].trim());
      lines.push('```');
      lines.push('');
    }
  }

  // Process namespaces (Konva.Util, Konva.Easings, Konva.Filters)
  for (const nsName of konvaNs?.namespaces || []) {
    const ns = docs[nsName];
    if (!ns) continue;

    lines.push(`## ${nsName}`);
    const desc = ns.description || '';
    if (desc) {
      lines.push('');
      lines.push(desc.replace(/\n/g, ' ').trim());
    }
    lines.push('');

    if (ns.methods && ns.methods.length > 0) {
      lines.push('### Methods');
      for (const m of ns.methods) {
        lines.push(formatMethod(m));
      }
      lines.push('');
    }

    if (ns.properties && ns.properties.length > 0) {
      lines.push('### Properties');
      for (const p of ns.properties) {
        lines.push(formatProperty(p));
      }
      lines.push('');
    }
  }

  // Write output
  const output = lines.join('\n');
  fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');

  const sizeKB = (Buffer.byteLength(output, 'utf-8') / 1024).toFixed(1);
  console.log(`Generated ${OUTPUT_PATH} (${sizeKB} KB, ${docPages.length} doc pages)`);

  // --- medium tier: guides, posts and the pages models retrieve most ---
  const byRoute = new Map(docPages.map((p) => [p.route, p]));
  const medium = [];
  for (const route of MEDIUM_PRIORITY) {
    const page = byRoute.get(route);
    if (page) medium.push(page);
    else console.warn(`  warning: llms-medium priority route not found: ${route}`);
  }
  // Every guide and post: the comparison format is what LLMs cite most.
  for (const page of docPages) {
    if (/^docs\/(guides|posts)\//.test(page.route) && !medium.includes(page)) {
      medium.push(page);
    }
  }

  const mediumOut = [llmsTxt.trim(), '', '---', '', renderDocPages(medium)].join('\n');
  fs.writeFileSync(MEDIUM_PATH, mediumOut, 'utf-8');
  const mediumKB = (Buffer.byteLength(mediumOut, 'utf-8') / 1024).toFixed(1);
  console.log(`Generated ${MEDIUM_PATH} (${mediumKB} KB, ${medium.length} doc pages)`);
}

main();
