# Review targets

A hunting guide for a deep review of konvajs.org. Every class below was found at
least once in this repo, so none of it is hypothetical. Items marked **(extend)**
are places the same class of bug is likely to exist but nobody has checked yet.

Read [CLAUDE.md](./CLAUDE.md) first for the two verification rules — they matter
more than anything in this file.

---

## 0. How to look, or you will find the wrong things

**Exclude `content/api/` from every content grep.** Those pages are generated,
and their inherited-method block was byte-identical across ~20 shape pages until
recently. A raw `grep -rl` over `content/` invents coverage: a term reading
"23 files" was **1 documentation page + 22 generated duplicates**, and that
phantom number killed a real work item. Use `content/docs`.

**Check the live site, not just the repo.** Committed is not deployed. During
this work `static/llms-full.txt` was 1.46 MB locally and 157 KB in production
for hours.

**Do not trust a check that shares the generator's assumption.** A coverage
check written against the same route logic as the generator passed while both
were wrong. Anchor verification to observable output — the built HTML — not to a
recomputation of what the output should be.

**Verify against Konva's source, not against the docs.** The library is at
`../konva`. Four separate roadmap items changed scope once the source was read.
Docs describing the library are the thing under review; they cannot also be the
evidence.

---

## 1. Docs that contradict the code

The highest-value class. All of these were real.

- **Deprecated APIs taught as current.** `getTextHeight()` warns and is
  deprecated. `hitGraphEnabled` warns and just calls `listening()`. `faq.md`
  recommended `batchDraw()` over `draw()`, obsolete since Konva 8.
- **Prose contradicting the same page's own sample.** `Stage_Data_URL.mdx`
  claimed `toDataURL()` "requires a callback function for `Stage`" directly
  above a sample that used the return value.
- **Pages contradicting each other.** Two guides said "Konva can't do this"
  about SVG import while `SVG_On_Canvas.mdx` documented three working routes.
- **The site contradicting its own README.** `docs/tools.md`, titled "Tools and
  Plugins", omitted `konvajs/konva-devtool` while `konva/README.md` told users
  to install it.
- **(extend)** Sweep every `@deprecated` and `Util.warn` in `../konva/src` and
  grep the docs for each name. That is a mechanical, high-yield pass nobody has
  run in full.
- **(extend)** Check that documented defaults match `Global.ts` — e.g.
  `dragDistance: 3`, `pixelRatio: devicePixelRatio`, `hitOnDragEnabled: false`,
  `pointerEventsEnabled: true`, `autoDrawEnabled: true`.

## 2. Code samples that teach the wrong habit

- **Superseded patterns at scale.** 40 redundant `layer.draw()` calls sat across
  six demo pages. Models emit `draw()` in most samples partly because the corpus,
  including this site, is full of it. Keep the genuinely necessary ones — a
  `Konva.Image` backed by a `<video>`, GIF or raw canvas has no attribute change
  for auto-draw to notice.
- **Approximations presented as technique.** React and Vue tabs contained
  `offsetX={60} // Approximate half width` and `height={200} // Approximate
  height` — the page was demonstrating the guess it should have been arguing
  against.
- **Plain typos.** A one-argument `Math.max(node.height() * scaleY)` that was
  meant to mirror the `Math.max(5, …)` on the line above.
- **(extend)** Do the framework tabs agree? A page's Vanilla, React and Vue tabs
  are maintained by hand and can drift into doing different things.
- **(extend)** Do samples reference external CDNs or third-party libraries that
  have moved or died? One historical case pointed at `cdn.rawgit.com`, shut down
  in 2019.
- **(extend)** Do samples use APIs that exist? Cross-check every `Konva.X` and
  `.method()` in fenced blocks against the real surface.

## 3. Links, anchors and structured data

- **Structured data pointing at 404s.** A hand-built `BreadcrumbList` composed
  section URLs as `/docs/<section>/index.html`, which exists only for the four
  framework sections. **264 built pages** shipped a breadcrumb containing an
  invalid item; Google discards the whole trail. It also competed with the one
  Docusaurus already emits.
- **Links to anchors that stopped existing.** Three pages linked
  `/api/Konva.Node.html#on` after a Konva change removed that anchor.
  `onBrokenAnchors: 'throw'` catches these **only for pages in the build** —
  it will not catch a link to an anchor on a page that regenerates later.
- **Duplicate `<title>` tags.** Two pairs, one byte-identical and one differing
  only in letter case. The Chinese mirrors were duplicates too.
- **Content pointing at a branch about to be deleted.** 16 CodeSandbox iframes
  referenced `tree/new/`; those pages are iframe-only, so they would have gone
  blank rather than degraded.
- **(extend)** `onBrokenLinks: 'throw'` validates **internal links only**. Every
  external URL on the site is unchecked. Sweep them for 404s, redirects and
  dead domains.
- **(extend)** Anchors in prose that point at headings later renamed.
- **(extend)** Redirect chains and loops in `static/_redirects`, and rules that
  no longer match any real URL.

## 4. Generated output

- **Duplicate boilerplate at scale.** Each shape's API page carried the full body
  of all 177 inherited methods, byte-identical across ~20 pages — 96% of a page,
  ~9 MB of the build, and in any retrieval index it outweighed each shape's own
  content roughly 25:1.
- **Missing metadata.** All 34 API pages lacked `description` frontmatter, so
  search engines wrote their own snippets.
- **Generators that silently mis-parse.** 54 files are stored with CRLF; a
  frontmatter regex expecting `\n` failed on them without error and every slug
  fell back to the filename.
- **Slug conventions are inconsistent** — absolute (`/docs/react/index.html`),
  relative (`Rect.html`), bare (`nodejs-setup`), and absent. A page with no slug
  is built as a directory with `index.html` inside. Anything deriving URLs must
  handle all four, and guessing is how twins ended up beside the wrong page.
- **(extend)** Is `create-api-docs.js` idempotent against a Konva bump? A past
  regeneration broke the build on anchor casing.
- **(extend)** Does `docs.json` (tracked, multi-MB) match the installed Konva?

## 5. i18n

The Chinese mirror is a full file copy with no build-time link to its source, so
it drifts in ways the drift check cannot see.

- **Static files land in every locale.** Docusaurus copies `static/` verbatim,
  so `/zh-Hans/llms.txt` was byte-identical English. Anything locale-specific
  must be generated **after** the build.
- **Surfaces no check covers.** `check-code-drift.js` exempts the
  `demos.item.*` and `demos.section.*` runtime ids, and the demo gallery's
  English labels are hardcoded in `src/pages/docs/sandbox.html.tsx`. Retitling a
  demo page leaves the gallery showing the old name **in both locales, with the
  build green**.
- **English content under Chinese URLs.** The 34 `/zh-Hans/api/` pages are
  generated from English JSDoc.
- **(extend)** Are code fences and `Tabs value=` attributes byte-identical in the
  mirrors? Translating fence metadata kills the live demo, and
  `MAINTAINING-I18N.md §4` lists nine other "never" rules worth auditing.
- **(extend)** Do Chinese pages link to English URLs, or vice versa? Several did.
- **(extend)** `hreflang` reciprocity and `x-default` across every page.

## 6. Build, deploy and assets

- **No CI existed.** `npm run check` is thorough and nothing ran it.
- **Zero asset caching.** Everything, including content-hashed bundles, was
  served `max-age=0, must-revalidate`.
- **Live demos pinned to a stale library.** Sandpack ran Konva 10.0.12 while the
  site built against `^10.3.1` — so a bug fixed upstream still reproduced in the
  docs' own demos. Framework bindings resolve to `'latest'`, which can break with
  no build signal.
- **Dead files served 200.** `.well-known/ai-plugin.json` for a spec retired in
  2024, and a 1.3 MB `*.png~` editor backup.
- **(extend)** Are all referenced images present, and are any unreferenced?
  `static/assets/demos/` is hand-maintained.
- **(extend)** Does every sandbox page appear in the gallery, and does every
  gallery entry point at a page that exists? At least one page was missing.
- **(extend)** Is any page absent from every sidebar and reachable only by URL?

## 7. Claims about the world

- **Unverifiable social proof.** Named users that could not be confirmed from
  public sources, while four projects declaring Konva in a public
  `package.json` went unmentioned.
- **Wrong facts.** The founding year was wrong in prose, in a table, and in a
  now-deleted JSON file.
- **Stale third-party citations.** The comparison guide linked a benchmark whose
  `package.json` pins Konva 8.1.4 and PixiJS 6.1.3, both from September 2021.
- **(extend)** Re-check every statistic, star count, download figure and "as of"
  claim. They rot silently.

## 8. Process traps that produced wrong work

Recorded because they caused real errors here, not as general advice.

- **Accepting a research claim without checking it.** Sixteen claims that shaped
  a work plan turned out false or already implemented — "no page covers X" when
  a page did, "documented nowhere" when a README covered it. §3 of
  [CONTENT-ROADMAP.md](./CONTENT-ROADMAP.md) lists them; treat that list as
  evidence about *method*, not just about those items.
- **`git add -A` sweeping in work that was not yours.** It happened twice: once
  publishing a sensitive file to a public repo, once committing another agent's
  unverified changes. Stage explicit paths.
- **Drawing a conclusion contradicted by output in the same message.** A claim
  that "Konva alone is pinned" was made directly below a paste showing PixiJS
  pinned too.
