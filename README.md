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

This command checks the canonical English site. It checks code fences, the demo
gallery, Sandpack dependencies, TypeScript, the build, the sitemap, and generated
Markdown pages.

Use the separate commands when you must isolate a failure:

```bash
npm run typecheck
npm run build:core
node checksitemap.js
```

`npm run build` builds English and every installed locale for deployment.
`scripts/generate-llms.js` then writes a Markdown twin of each documentation page.

## Add content

- Add tutorials and reference articles to `content/docs/`.
- Add complete application guides to `content/docs/`.
- Do not edit files in `content/api/` by hand.
- Run `node create-api-docs.js` after an API input change.

Each document must have a title, sidebar label, slug, and description. Internal links must use the full `.html` route.

## Translate content

Chinese is an optional addition. English files are canonical and do not import it.
Delete `i18n/zh-Hans/` to remove the locale; no English file or build command needs
another change.

Test the installed translation separately:

```bash
npm run check:i18n
```

Run this command after you add translatable interface text:

```bash
npm run write-translations -- --locale zh-Hans
```

Translated documents are in `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`.
