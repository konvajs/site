import jsdoc2md from "jsdoc-to-markdown";
import { promises as fs } from "node:fs";
import { rm, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

/* input and output paths */
const inputFile = "konva.js";

/* get template data */
const templateData = await jsdoc2md.getTemplateData({ files: inputFile });

/* reduce templateData to an array of class names */
const classNames = templateData
  .filter((i) => i.kind === "class")
  .map((i) => i.name);

const kinds = [];
templateData.forEach((i) => {
  if (kinds.indexOf(i.kind) === -1) {
    kinds.push(i.kind);
  }
});

const kindsToRender = ["class", "member"];

// Remove ./docs/api if it exists
if (existsSync("./docs/api")) {
  await rm("./docs/api", { recursive: true, force: true });
}

// Create a new ./docs/api folder
await mkdir("./docs/api", { recursive: true });

/* create a documentation file for each class */
for (const item of templateData) {
  const kind = item.kind;
  const name = item.name;
  if (kindsToRender.indexOf(kind) === -1) {
    continue;
  }
  const template = `{{#${kind} name="${name}"}}{{>docs}}{{/${kind}}}`;
  console.log(`rendering ${name}, template: ${template}`);
  const output = await jsdoc2md.render({
    data: templateData,
    template: template,
    partial: [
      "./partials/scope.hbs",
      "./partials/inherit-link.hbs",
      "./partials/overrides.hbs",
    ],
    helper: ["./helpers/replace.js"],
  });
  await fs.writeFile(`./docs/api/Konva.${name}.mdx`, output);
}
