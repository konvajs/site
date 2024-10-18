import jsdoc2md from "jsdoc-to-markdown";
import { promises as fs } from "node:fs";
import { rm, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

/* input and output paths */
const inputFile = "konva.js";

/* get template data */
const templateData = await jsdoc2md.getTemplateData({ files: inputFile });

const kinds = [];
templateData.forEach((i) => {
  if (kinds.indexOf(i.kind) === -1) {
    kinds.push(i.kind);
  }
});

const kindsToRender = ["class", "member", "namespace"];

// Remove ./docs/api if it exists
if (existsSync("./docs/api")) {
  await rm("./docs/api", { recursive: true, force: true });
}

fs.writeFile(`./data.json`, JSON.stringify(templateData, null, 2));

// Create a new ./docs/api folder
await mkdir("./docs/api", { recursive: true });

/* create a documentation file for each class */
for (const item of templateData) {
  const kind = item.kind;
  const name = item.name;
  if (kindsToRender.indexOf(kind) === -1) {
    continue;
  }
  let data = [...templateData];
  if (name === 'Konva') {
    data = templateData.filter((i) => i.kind === 'class' ||i.kind === 'namespace' || i.memberof === 'Konva');
  }
  const template = `{{#${kind} name="${name}"}}{{>docs}}{{/${kind}}}`;
  console.log(`rendering ${name}, template: ${template}`);
  const output = await jsdoc2md.render({
    data,
    template: template,
    partial: [
      "./partials/scope.hbs",
      "./partials/inherit-link.hbs",
      "./partials/overrides.hbs",
      "./partials/docs.hbs",
      "./partials/header.hbs",
      "./partials/augments.hbs",
      "./partials/link.hbs"
    ],
    helper: ["./helpers/replace.js"],
  });
  await fs.writeFile(`./docs/api/Konva.${name}.mdx`, `---
title: Konva.${name}
sidebar_label: ${name}
slug: /docs/api/${name}.html
---

${output}
  `);
}
