# Working in this repo

konvajs.org — the Konva.js documentation site. Docusaurus 3.9, content in `content/`,
Chinese translation in `i18n/zh-Hans/`.

**Read [CONTENT-ROADMAP.md](./CONTENT-ROADMAP.md) before proposing or writing new pages.**
It records what was decided, what was rejected, and — importantly — several plausible
ideas that were checked and found to be based on false premises. It exists so that work
is not redone or re-argued after a context reset.

## Hard constraints

**Every edit to `content/` must be mirrored in `i18n/zh-Hans/`.**
The Chinese docs are full file copies, not string extractions. `scripts/check-i18n-drift.js`
hashes every English source and fails the build when one changes without its mirror.
After a legitimate paired edit, re-stamp with `npm run update:i18n-sources`.

To land an English page before its translation, add its path to `I18N_PENDING` in
`scripts/check-i18n-drift.js`. The check then reports it as pending instead of failing —
and warns when the entry goes stale, so the backlog cannot rot silently. This excuses a
*missing* mirror only: a page that has a mirror still fails when its English source drifts.

**Run `npm run check` before committing.** It runs, in order: i18n drift, interface-string
drift, fence balance, typecheck, a build of both locales, and both sitemaps. It is the only
gate; nothing else validates these.

**Never commit internal strategy documents.** A file containing commercial positioning was
once swept in by `git add -A` and pushed to this public repo; removing it required a history
rewrite, and the old commit is still fetchable by SHA. Check *what* you are staging, not just
whether it is generated.

## Things that are easy to get wrong

- **Never `grep -rl` over `content/` without excluding `content/api/`.** Those pages are
  generated, and their inherited-method block is byte-identical across ~20 shape pages
  (`Konva.Rect`, `Konva.Circle` and `Konva.Star` all hash the same). A raw count invents
  coverage that does not exist: `getRelativePointerPosition` looks like "23 files" and is
  really **one** documentation page plus 22 generated duplicates. Use
  `grep -rl PATTERN content/docs` instead.
- **Check the live site before concluding something ships.** Committed is not deployed —
  several files in `static/` differ from what konvajs.org serves.

- **`<Translate>` resolves by id, not by message.** Changing English text behind an existing
  id silently leaves the old Chinese in place. `scripts/check-code-drift.js` catches this.
- **`docusaurus write-translations` keeps messages already on disk.** A stale `i18n/en/`
  freezes the baseline and hides drift, so the drift script deletes it before regenerating.
  `i18n/en/` is generated and gitignored — never edit it.
- **Slugs are written two ways**: absolute (`/docs/react/index.html`) and relative to the
  page's own directory (`nodejs-setup`). Anything deriving URLs must handle both.
- **Four-backtick fences validly close three-backtick fences.** Fence checks must count
  depth, not match pairs.
- **MDX parses bare `<canvas>` as JSX.** Wrap it in backticks in prose.
- **The dev server serves one locale at a time**: `npm start -- --locale zh-Hans`.
- **Live code blocks** are the swizzled `src/theme/CodeBlock/`, not the deleted
  `src/theme-live-codeblock/`. Sandpack's React bundler is remote and cannot be verified
  headlessly.

## Repo layout

| Path | Purpose |
|---|---|
| `content/docs/` | Tutorials, guides, posts, and the 68 sandbox demos |
| `content/api/` | Generated from `docs.json` by `create-api-docs.js` — do not hand-edit |
| `i18n/zh-Hans/` | Full mirror of `content/`, plus interface strings |
| `scripts/` | Drift checks, fence check, and the llms.txt generator |
| `static/llms*.txt` | Generated at build time by `generate-llms-full.js` |
