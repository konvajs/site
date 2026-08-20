import jsdoc from 'jsdoc-api';
import { promises as fs } from 'node:fs';
import path from 'path';
import { existsSync } from 'node:fs';
import { rm, mkdir } from 'node:fs/promises';

// Add this function near the top of the file, after the imports
function processDescription(description) {
  // Return empty string if description is undefined or null
  if (!description) return '';

  return (
    description
      // Replace JSDoc link syntax with Markdown link syntax
      .replace(/{@link\s+([^}]+)}/g, (match, p1) => {
        // If it's a filter link (contains two dots)
        if (p1.startsWith('Konva.Filters.')) {
          const filterName = p1.split('.')[2];
          return `[${p1}](/api/Konva.Filters.html#${filterName})`;
        }
        // If it contains a hash, we need to place .html before the hash
        if (p1.includes('#')) {
          const [className, method] = p1.split('#');
          return `[${p1}](/api/${className}.html#${method})`;
        }
        return `[${p1}](/api/${p1}.html)`;
      })
      // Replace newlines with spaces to prevent breaking markdown table rows
      .replace(/\n/g, ' ')
      // Escape pipe characters to prevent breaking markdown table structure
      .replace(/\|/g, '\\|')
      // Escape curly braces to prevent breaking MDX
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}')
  );
}

// Add this function after the processDescription function
function createMethodLink(className, methodName) {
  return `[${className}#${methodName}](/api/${className}.html#${methodName})`;
}

// Add this function near the top of the file, after the imports
function createClassLink(className) {
  return `[${className}](/api/${className}.html)`;
}

const data = await jsdoc.explain({ files: ['node_modules/konva/konva.js'], cache: true });

// Remove ./docs/api if it exists
if (existsSync('./content/api')) {
  await rm('./content/api', { recursive: true, force: true });
}
await mkdir('./content/api', { recursive: true });

// Object to store documentation for each class/namespace
const docs = {};

// first let's create files and name spaces
data.forEach((item) => {
  // Skip undocumented items
  if (item.undocumented) return;

  if (item.kind === 'class' || item.kind === 'namespace') {
    // Create a new entry for the class/namespace if it doesn't exist
    if (!docs[item.longname]) {
      docs[item.longname] = {
        ...item,
        name: item.name,
        description: item.classdesc || item.description,
        params: item.params,
        methods: [],
        classes: [],
        namespaces: [],
      };
    }
  }
});

// Process each item in the data
data.forEach((item) => {
  // Skip undocumented items
  if (item.undocumented) return;

  if (item.kind === 'class' || item.kind === 'namespace') {
    // If it's a class and has a memberof property, add it to the parent namespace
    if (item.kind === 'class' && item.memberof) {
      const parentDoc = docs[item.memberof];
      if (parentDoc) {
        parentDoc.classes.push(item.longname);
      }
    }
    if (item.kind === 'namespace') {
      const parentDoc = docs[item.memberof];
      if (parentDoc) {
        parentDoc.namespaces.push(item.longname);
      }
    }
  } else if (item.kind === 'function') {
    // Add method to its class/namespace
    const parentDoc = docs[item.memberof];
    if (parentDoc) {
      const methodInfo = {
        ...item,
        name: item.name,
        description: item.description,
        params: item.params,
        returns: item.returns,
        examples: item.examples,
        inherited: item.inherited,
        inherits: item.inherits,
      };

      if (item.inherited) {
        parentDoc.inheritedMethods = parentDoc.inheritedMethods || [];
        parentDoc.inheritedMethods.push(methodInfo);
      } else {
        parentDoc.methods = parentDoc.methods || [];
        parentDoc.methods.push(methodInfo);
      }
    } else {
      console.error(`Parent namespace not found for ${item.longname}`);
    }
  } else if (item.kind === 'member' && item.memberof) {
    // Handle static properties
    const parentDoc = docs[item.memberof];
    if (parentDoc) {
      parentDoc.properties = parentDoc.properties || [];
      parentDoc.properties.push({
        name: item.name,
        description: item.description,
        defaultValue: item.defaultvalue,
        examples: item.examples,
        isStatic: item.scope === 'static',
      });
    }
  }
});

fs.writeFile(`./docs.json`, JSON.stringify(docs, null, 2));

// Generate markdown files
for (const [longname, docItem] of Object.entries(docs)) {
  let markdown = `---
title: ${docItem.longname}
sidebar_label: ${docItem.name}
slug: /api/${docItem.longname}.html
${docItem.longname === 'Konva' ? 'sidebar_position: 1' : ''}
---

# ${docItem.name}\n\n`;

  if (docItem.kind === 'class') {
    markdown += `\`\`\`javascript\nnew Konva.${docItem.name}(config)\n\`\`\`\n\n`;
  }

  if (docItem.description) {
    markdown += `${processDescription(docItem.description)}\n\n`;
  }

  if (docItem.kind === 'function') {
    // Handle standalone functions
    markdown += generateFunctionMarkdown(docItem);
  } else {
    if (docItem.classes && docItem.classes.length > 0) {
      markdown += `## Classes\n\n`;
      docItem.classes.forEach((className) => {
        const classDoc = docs[className];
        markdown += `- [${classDoc.name}](/api/${className}.html)\n`;
      });
      markdown += '\n';
    }

    if (docItem.params && docItem.params.length > 0) {
      markdown += `## Parameters\n\n`;
      markdown += `| Name | Type | Description |\n`;
      markdown += `| ---- | ---- | ----------- |\n`;
      docItem.params.forEach((param) => {
        const name = param.name.replace('config.', '');
        const type = param.type ? param.type.names.join('\\|') : 'any';
        const description = param.description
          ? processDescription(param.description)
          : '';
        const optional = param.optional ? ' (optional)' : '';
        markdown += `| ${name}${optional} | \`${type}\` | ${description} |\n`;
      });
      markdown += '\n';
    }

    // Add information about the parent class if it exists
    if (docItem.augments && docItem.augments.length > 0) {
      const parentClass = docItem.augments[0];
      markdown += `**Inherited from:** ${createClassLink(parentClass)}\n\n`;
    }

    if (docItem.namespaces && docItem.namespaces.length > 0) {
      markdown += `## Namespaces\n\n`;
      docItem.namespaces.forEach((namespaceName) => {
        const namespaceDoc = docs[namespaceName];
        markdown += `- [${namespaceDoc.name}](/api/${namespaceName}.html)\n`;
      });
      markdown += '\n';
    }

    if (docItem.properties && docItem.properties.length > 0) {
      markdown += `## Properties\n\n`;
      docItem.properties.forEach((prop) => {
        markdown += `### ${prop.isStatic ? 'static ' : ''}${prop.name}\n\n`;
        markdown += generatePropertyMarkdown(prop);
      });
    }

    if (docItem.methods && docItem.methods.length > 0) {
      markdown += `## Own Methods\n\n`;
      docItem.methods.forEach((method) => {
        const params = method.params
          ? method.params
              .filter((p) => !p.name.includes('.')) // Filter out nested properties
              .map((p) => p.name)
              .join(', ')
          : '';
        markdown += `### ${method.isStatic ? 'static ' : ''}${
          method.name
        }(${params}) {#${method.name}}\n\n`;
        markdown += generateFunctionMarkdown(method);
      });
    }

    if (docItem.inheritedMethods && docItem.inheritedMethods.length > 0) {
      markdown += `## Inherited Methods\n\n`;
      docItem.inheritedMethods.forEach((method) => {
        const params = method.params
          ? method.params
              .filter((p) => !p.name.includes('.'))
              .map((p) => p.name)
              .join(', ')
          : '';
        markdown += `### ${method.isStatic ? 'static ' : ''}${
          method.name
        }(${params})\n\n`;
        markdown += generateFunctionMarkdown(method);
      });
    }
  }

  // Write markdown file
  const filename = path.join('content', 'api', `${longname}.mdx`);
  fs.writeFile(filename, markdown);
}

// Helper function to generate markdown for properties
function generatePropertyMarkdown(prop) {
  let markdown = '';
  if (prop.description) {
    markdown += `${processDescription(prop.description)}\n\n`;
  }
  if (prop.defaultValue !== undefined) {
    markdown += `**Default value:** \`${prop.defaultValue}\`\n\n`;
  }
  if (prop.examples) {
    markdown += `**Example:**\n\n\`\`\`javascript\n${prop.examples.join(
      '\n'
    )}\n\`\`\`\n\n`;
  }
  return markdown;
}

// Helper function to generate markdown for functions/methods
function generateFunctionMarkdown(func) {
  let markdown = '';

  if (func.description) {
    markdown += `${processDescription(func.description)}\n\n`;
  }

  if (func.params && func.params.length > 0) {
    markdown += `**Parameters:**\n\n`;
    func.params.forEach((param) => {
      markdown += `- \`${param.name}\` (${
        param.type ? param.type.names.join('|') : 'any'
      })`;
      if (param.optional) markdown += ' (optional)';
      if (param.description)
        markdown += `: ${processDescription(param.description)}`;
      markdown += '\n';
    });
    markdown += '\n';
  }

  if (func.returns) {
    markdown += `**Returns:** `;
    if (func.returns[0].type) {
      const returnType = func.returns[0].type.names
        .join('|')
        .replace(/\.</g, '<'); // Remove dot before angle bracket
      markdown += `\`${returnType}\` `;
    }
    if (func.returns[0].description) {
      markdown +=
        '<code>' + processDescription(func.returns[0].description) + '</code>';
    }
    markdown += '\n\n';
  }

  if (func.inherited && func.inherits) {
    const [className, methodName] = func.inherits.split('#');
    markdown += `**Inherited from:** ${createMethodLink(
      className,
      methodName
    )}\n\n`;
  }

  if (func.examples && func.examples.length > 0) {
    markdown += `**Example:**\n\n\`\`\`javascript\n${func.examples.join(
      '\n'
    )}\n\`\`\`\n\n`;
  }

  return markdown;
}
