#!/usr/bin/env node

/**
 * Find controlled draggable nodes in React examples without a drag handler.
 *
 * react-konva warns when a draggable node receives x or y without onDragMove
 * or onDragEnd. The node moves during the drag, but a later strict render can
 * restore the position from stale React props.
 *
 * This structural check cannot prove that a handler stores the node's real
 * position. Each handler still needs a semantic review for its demo's state
 * model.
 */

const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const docsDirectory = path.join(root, 'content', 'docs');
const failures = [];
let reactBlockCount = 0;
let draggableNodeCount = 0;

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
    const match = /^\s*(`{3,}|~{3,})(.*)$/.exec(line);
    if (!match) {
      if (active) active.lines.push(line);
      return;
    }

    if (!active) {
      active = {
        marker: match[1][0],
        depth: match[1].length,
        metadata: match[2].trim(),
        line: index + 1,
        lines: [],
      };
      return;
    }

    if (
      match[1][0] === active.marker &&
      match[1].length >= active.depth &&
      match[2].trim() === ''
    ) {
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

function attribute(node, name) {
  return node.attributes.properties.find(
    (property) =>
      ts.isJsxAttribute(property) && property.name.getText() === name
  );
}

function canBeTrue(property) {
  if (!property.initializer) return true;
  if (ts.isStringLiteral(property.initializer)) return true;
  if (!ts.isJsxExpression(property.initializer)) return true;
  return property.initializer.expression?.kind !== ts.SyntaxKind.FalseKeyword;
}

function reactKonvaImports(source) {
  const components = new Set();
  const namespaces = new Set();

  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      statement.moduleSpecifier.text !== 'react-konva'
    ) {
      continue;
    }

    const bindings = statement.importClause?.namedBindings;
    if (ts.isNamedImports(bindings)) {
      bindings.elements.forEach((element) => components.add(element.name.text));
    } else if (ts.isNamespaceImport(bindings)) {
      namespaces.add(bindings.name.text);
    }
  }

  return { components, namespaces };
}

function isKonvaComponent(node, imports) {
  if (ts.isIdentifier(node.tagName)) {
    return (
      imports.components.has(node.tagName.text) ||
      /^[A-Z]/.test(node.tagName.text)
    );
  }
  return (
    ts.isPropertyAccessExpression(node.tagName) &&
    ts.isIdentifier(node.tagName.expression) &&
    imports.namespaces.has(node.tagName.expression.text)
  );
}

function objectDeclarations(source) {
  const declarations = new Map();

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      const matches = declarations.get(node.name.text) || [];
      matches.push(node);
      declarations.set(node.name.text, matches);
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return declarations;
}

function objectHasProperty(expression, name, before, declarations, seen = new Set()) {
  let object = expression;
  if (ts.isIdentifier(expression)) {
    const candidates = (declarations.get(expression.text) || []).filter(
      (declaration) => declaration.getStart() < before
    );
    const declaration = candidates.at(-1);
    if (!declaration || seen.has(declaration)) return false;
    seen.add(declaration);
    object = declaration.initializer;
  }
  if (!ts.isObjectLiteralExpression(object)) return false;

  return object.properties.some((property) => {
    if (ts.isSpreadAssignment(property)) {
      return objectHasProperty(
        property.expression,
        name,
        property.getStart(),
        declarations,
        seen
      );
    }
    if (!property.name || property.name.getText().replace(/^['"]|['"]$/g, '') !== name) {
      return false;
    }
    if (name !== 'draggable' || !ts.isPropertyAssignment(property)) return true;
    return property.initializer.kind !== ts.SyntaxKind.FalseKeyword;
  });
}

function inspectSource(source) {
  const imports = reactKonvaImports(source);
  const declarations = objectDeclarations(source);
  const missingHandlers = [];
  let draggableCount = 0;

  function visit(node) {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      isKonvaComponent(node, imports)
    ) {
      const spreads = node.attributes.properties.filter(ts.isJsxSpreadAttribute);
      const draggable = attribute(node, 'draggable');
      const spreadDraggable = spreads.some((spread) =>
        objectHasProperty(
          spread.expression,
          'draggable',
          node.getStart(source),
          declarations
        )
      );
      if ((draggable && canBeTrue(draggable)) || spreadDraggable) {
        draggableCount++;
        const hasPosition =
          attribute(node, 'x') ||
          attribute(node, 'y') ||
          spreads.some(
            (spread) =>
              objectHasProperty(
                spread.expression,
                'x',
                node.getStart(source),
                declarations
              ) ||
              objectHasProperty(
                spread.expression,
                'y',
                node.getStart(source),
                declarations
              )
          ) ||
          ((draggable || spreadDraggable) && spreads.length > 0);
        const hasDragStateHandler =
          attribute(node, 'onDragMove') ||
          attribute(node, 'onDragEnd') ||
          spreads.some(
            (spread) =>
              objectHasProperty(
                spread.expression,
                'onDragMove',
                node.getStart(source),
                declarations
              ) ||
              objectHasProperty(
                spread.expression,
                'onDragEnd',
                node.getStart(source),
                declarations
              )
          );
        if (hasPosition && !hasDragStateHandler) missingHandlers.push(node);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return { draggableCount, missingHandlers };
}

const fixtureCases = [
  ['explicit position', '<Rect x={10} draggable />;', 1, 1],
  [
    'object spread',
    'const props = { x: 10, draggable: true }; <Rect {...props} />;',
    1,
    1,
  ],
  ['truthy string', '<Rect x={10} draggable="false" />;', 1, 1],
  ['explicit handler', '<Rect x={10} draggable onDragEnd={save} />;', 1, 0],
  [
    'spread handler',
    'const props = { y: 10, draggable: true, onDragMove: save }; <Rect {...props} />;',
    1,
    0,
  ],
  ['custom wrapper', '<Shape x={10} draggable />;', 1, 1],
  ['native element', '<img x="10" draggable="true" />;', 0, 0],
];

for (const [name, body, draggableCount, missingCount] of fixtureCases) {
  const source = ts.createSourceFile(
    `drag-state-${name}.tsx`,
    `import { Rect } from 'react-konva'; ${body}`,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const result = inspectSource(source);
  if (
    result.draggableCount !== draggableCount ||
    result.missingHandlers.length !== missingCount
  ) {
    failures.push(`The React drag-state checker failed its ${name} fixture.`);
  }
}

for (const file of listMarkdownFiles(docsDirectory)) {
  for (const block of fencedBlocks(fs.readFileSync(file, 'utf8'))) {
    const isReactBlock =
      block.metadata.split(/\s+/).includes('react') ||
      /\bfrom\s+['"]react-konva['"]/.test(block.body);
    if (!isReactBlock) continue;
    reactBlockCount++;

    const source = ts.createSourceFile(
      `${path.basename(file)}.tsx`,
      block.body,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    );
    const result = inspectSource(source);
    draggableNodeCount += result.draggableCount;
    for (const node of result.missingHandlers) {
      const line =
        block.line +
        source.getLineAndCharacterOfPosition(node.getStart(source)).line +
        1;
      failures.push(
        `${path.relative(root, file)}:${line} has draggable position props ` +
          'without onDragMove or onDragEnd'
      );
    }
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log(
    `${draggableNodeCount} draggable React nodes in ${reactBlockCount} code blocks ` +
      'have drag handlers when they use position props.'
  );
}
