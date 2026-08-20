# Konva website

This repository contains the Konva documentation website. Docusaurus builds the site from files in `content/`.

## Set up the project

Use Node.js 18 or a later version.

```bash
npm install
npm start
```

The development server reloads most changes without a restart.

## Run checks

```bash
npm run check
```

This command checks TypeScript, builds each locale, and checks the generated sitemap.

Use the separate commands when you must isolate a failure:

```bash
npm run typecheck
npm run build
node checksitemap.js
```

After the build, `scripts/generate-llms.js` writes the Chinese `llms.txt` and a markdown twin of every documentation page.

## Add content

- Add tutorials and reference articles to `content/docs/`.
- Add complete application guides to `content/build/`.
- Do not edit files in `content/api/` by hand.
- Run `node create-api-docs.js` after an API input change.

Each document must have a title, sidebar label, slug, and description. Internal links must use the full `.html` route.

## Translate content

Run this command after you add translatable interface text:

```bash
npm run write-translations -- --locale zh-Hans
```

Translated documents are in `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`.
