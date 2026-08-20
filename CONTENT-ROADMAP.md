# Site roadmap

Decision log for konvajs.org. Each item records **what**, **why**, the **evidence**, and the
**decision**, so work can resume after a context reset without re-running research or
re-arguing settled calls.

Version 2, 2026-08-20. Rewritten after a five-reviewer audit invalidated much of version 1.
Version 1 is recoverable from git history.

---

## 1. How to use this document

Read §2 (the scoring principle) and §3 (things already checked and found false) before
proposing anything. §3 exists because the same mistake was made twelve times: **claiming a
page was needed without running the grep**.

**Two verification rules, learned the hard way:**

1. **Never `grep -rl` over `content/` without excluding `content/api/`.** The API pages are
   generated, and the inherited-method block is byte-identical across ~20 shape pages
   (verified: `Konva.Rect`, `Konva.Circle`, `Konva.Star` all hash to `ae99de1925b4`). A raw
   count manufactures phantom coverage — `getRelativePointerPosition` reads as "23 files" but
   is **1 documentation page + 22 generated duplicates**. That phantom number killed a real item.
2. **Check the live site, not just the repo.** Several "completed" items are committed and
   unpushed; several "missing" features are already deployed.

---

## 2. The scoring principle

From the maintainer, and it governs everything below:

> In the era of AI all "tech questions" traffic is going down. Developers don't search.
> They use AI. But our posts still go into AI searches. Our own post "best js canvas
> library" is a possible proof. No traffic, still very used by AI.

And: *"we focus on docs. LLMs will consume and adapt over time."* — no special LLM artifacts
(no `SKILL.md`, no cheatsheet). Write good documentation; let models pick it up.

| | Weight |
|---|---|
| Search volume | weak — a bad proxy for value |
| Comparison / build-vs-buy guides | high — the format models cite |
| Content that makes models emit **correct** Konva | highest |
| Backlink-chasing, tool pages for volume | obsolete |
| Titles matching literal phrasing | still matters — retrieval needs it |

**Retained nuance:** Perplexity is near-pure retrieval, so a missing literal phrase means
non-citation. But title-matching is *necessary, not sufficient* — `Connected_Objects.mdx` is
titled verbatim "React Flowchart…" and still scores zero on the category prompt, while being
cited as source [1] the moment a query names Konva. **Category-shaped pages get cited on
category queries.**

---

## 3. Checked and found FALSE

Every row was produced by a research agent and contradicted by direct inspection.

| Claim | Reality |
|---|---|
| "Next.js/SSR is documented nowhere" | `react-konva/README.md:143` has a full section, correctly stating v10 works out of the box |
| "v10 breaking changes have no migration page" | `konva/CHANGELOG.md` documents all three with before/after code |
| "The React docs are a strict subset of the vanilla docs" | **204 of 227 demo pages (89%) already include React tabs** |
| "No page tells you to stop calling `draw()`" | `Batch_Draw.mdx` opens with exactly that note |
| "No scaling/performance guide exists" | `All_Performance_Tips.mdx` (1,370 words) is thorough |
| "No page mentions `pixelRatio`" | 40 files do (15 docs + 24 generated API) |
| "The `new.konvajs.org` redirect is undeployed" | It is deployed; every path 301s correctly |
| "Pages lose because of titling" | False for `Infinite_Canvas` and `Connected_Objects` — both already titled verbatim |
| "`FAQPage` JSON-LD is missing" | **Already live** on `faq.html`, alongside `SoftwareApplication` and `Organization` |
| "Nothing answers 'can I use this commercially'" | `faq.md:90` answers it verbatim, and it is inside the live `FAQPage` block |
| "No eraser demo exists" | `Free_Drawing.mdx` (1,543 words) ships a working `destination-out` eraser in all three framework tabs |
| "There is no canonical anchored filter list" | `Konva.Filters.mdx` is exactly that — 20 anchored entries, 580 inbound links |
| "Konva ranks #4-7 for seat maps behind SaaS" | Konva is **#1** for "seat map javascript". The real gap is **floor plans**, where it does not rank at all |
| "No page contains the word whiteboard" | 8 files do; `Multiplayer_Whiteboard.mdx` has it in the title, and the site ranks **#5** for "javascript whiteboard library" |
| "`best-canvas-library` is missing D3 and Paper.js" | Paper.js is covered twice. Only **D3** is missing |
| "Konva alone is frozen in the benchmark" | **`pixi.js` is also hard-pinned** at `6.1.3`, released two days before konva 8.1.4. The comparison is same-week-2021, not unfair. Konva is mid-pack in that table, beating Fabric, Paper, Three and CanvasKit |

**Corrections to the evidence base itself:**

- The CrawlChat log is **9,395 messages, 2025-12-17 to 2026-08-20** — not "2,637 in 90 days".
  Per-topic counts quoted in v1 reproduce against a **~11% low-relevance subsample**, so treat
  them as **lower bounds**.
- **Chinese is 18.2-18.5% of language-tagged questions**, not 9.6%. Roughly double.
- **Retrieval sources are 95.9% GitHub issues**, 3.3% the docs site. "Most-cited Konva URL" is
  a statement about that index, not about konvajs.org.
- **98.5% of answers cite `new.konvajs.org`** — see P1-1.
- The v1 backlink figures ("74% of 931") do not reconcile with DataForSEO's **447 referring
  domains**. Re-measure before quoting.

### Settled — do not re-propose

**H3 "what Konva does not do" — built, then reverted.** Written and committed,
then dropped on review. The demand was ~13 log queries with **zero human
askers**, and `why-konva.md` already carries "What Konva is NOT" plus a "When to
Use Something Else" table. A page whose subject is absent features reads as
defensive, and the only genuinely useful section (lasso selection, with working
point-in-polygon code) had **1** query behind it — thinner than the evidence the
page was rejected for, so relocating it was not justified either. Reconsider only
if the prompt panel or Search Console shows real demand.

**A6 "add React tabs to seven demos" — rejected after checking each.** The
premise was that React users cannot find React versions. 204 of 227 demo pages
already have React tabs, and every one of the seven fails for its own reason:
`Image_Resize` already links to `select_and_transform/Basic_demo`, which has a
React tab, and `react/Transformer.mdx` exists — so its React need is served by a
better page it already points at. `Rich_Text` is a `render-tag` integration and
`Editable_Text` already has React. **`Web_Worker` cannot have a React tab at
all** — react-konva cannot drive a stage inside a worker, so one would mislead.
`Physics_Simulator` in React is the same loop inside `useEffect`. `Gestures`
binds an external library identically. `Wheel_of_Fortune` and `Image_Border` are
decorative.


`/build` section (deleted, no demand, duplicated demos) · React Native support (no DOM) ·
a dedicated Konva-vs-Fabric page (`faq.html` already holds #2; the live AI Overview already
cites konvajs.org six times) · consumer "free online tool" pages (KD 47-77, tool farms) ·
a Yjs/CRDT package (Weave.js occupies it) · `SKILL.md` (superseded by `.md` variants) ·
per-method API pages (zero `/api/` pages rank; the fix is deduplication, not more pages) ·
dark mode (deliberately disabled) · a changelog page (the release feed answers it; bot logs
show 2 hits for version/upgrade keywords across 241 strings) · SO answer campaign (tag
collapsed: 184 questions in 2019, 2 in 2026) · guest posts · `/tools/*` (cannibalises Polotno).

---

## 4. Priority 0 — defects — **ALL DONE 2026-08-20**

These are broken now. None is strategy. Every one was found by the audit, not the original
research, and together they outrank most of the content plan.

| ID | Defect | Evidence | Fix |
|---|---|---|---|
| **P0-1** | **Zero asset caching.** Every asset, including content-hashed bundles, is served `cache-control: public,max-age=0,must-revalidate`. Every repeat visit revalidates everything, including 1.5 MB of gallery thumbnails. | Verified live: `/assets/js/main.4d534c7e.js` — a hash-named file that can never change — carries `max-age=0`. Netlify's default when `_headers` does not override. | ~10 lines in `static/_headers` |
| **P0-2** | **Live demos run Konva 10.0.12** (published 2025-11-21, 11 releases behind) while the site builds against `^10.3.1`. Bugs fixed in 10.1-10.3 still reproduce in the docs' own demos. `react-konva`/`vue-konva`/`svelte-konva` resolve to `'latest'` — unpinned, no build signal. | `src/theme/CodeBlock/index.tsx:9,26` | 1 line + a version check in `npm run check` |
| **P0-3** | **264 built pages emit a `BreadcrumbList` containing a 404.** The hand-built block points its section item at `/docs/<section>/index.html`, which does not exist for most sections. Google discards a trail with an invalid item. | Verified: `/docs/shapes/index.html` and `/docs/tweens/index.html` both 404, while the theme block's `/category/shapes` returns 200. 264 of 544 built pages affected. **v1 had this backwards** — the custom block is the broken one. | ~1h in `src/theme/DocItem/index.tsx` |
| **P0-4** | **16 svelte pages embed CodeSandbox iframes pointing at the `new` branch**, which is about to merge into `master` and be deleted. Those pages are iframe-only (76-200 words), so they will not degrade — they will go blank. | `grep -rho "tree/[a-z]*/" content/` gives 16 x `tree/new/`, all in `content/docs/svelte/`. Both branches exist on origin. | ~10 min |
| **P0-5** | **`best-canvas-library.md:49` links to the stale benchmark** — the site's strongest citation asset sends readers to the "Konva 23fps" table. | Verified. Independent of whether the upstream PR lands. | 1 min |
| **P0-6** | **A 1.3 MB stray backup is served publicly.** | `static/assets/demos/canvas-background.png~` returns 200, 1,325,815 bytes | 1 min |
| **P0-7** | **Two duplicate title tags.** `shapes/Line.mdx` and `Line_-_Simple_Line.mdx` share "HTML5 canvas Line Tutorial" exactly; the react animations pair differs only in letter case. | Verified | ~5 min |
| **P0-8** | **`ai-plugin.json` serves 200** for a spec retired in 2024, its `api.url` is not an OpenAPI document, `ai_tools.md:93` advertises it, and its `description_for_model` still says "created 2014" (contradicting the 2015 correction). | Verified | ~15 min |
| **P0-9** | **No CI.** `npm run check` is genuinely good — i18n drift, code drift, fences, typecheck, both builds, both sitemaps — and **nothing runs it**. No `.github/workflows`, no `netlify.toml`. | Verified | ~30 min |

---

## 5. Priority 1 — the Chinese locale (about 3 hours)

**272 well-maintained translated pages that nobody can find or search.** Both drift checks
pass clean; the translation is not the problem. This was the single largest blind spot — no
original research agent looked at it, and the audience is roughly double what v1 recorded.

| ID | Item | Evidence | Fix |
|---|---|---|---|
| **P1-1** | **Re-point the CrawlChat crawl off `new.konvajs.org`** | **762 of 770** konvajs.org URL occurrences are staging; **198 of 201 answers (98.5%)** cite at least one staging URL; all 10 top-cited pages are staging. Filed in v1 as "any time" — the magnitude makes it blocking, because every widget and MCP citation is currently wrong. | **Maintainer-owned**, dashboard |
| **P1-2** | **Index zh-Hans in Algolia** — *maintainer will handle separately; removed from this queue* | The `konvajs` index holds `lang: {"en": 11808}` — **zero Chinese records** across 4,421 documents. A Chinese query (拖拽) returns **0 hits**. `contextualSearch: false`, so English queries on Chinese pages eject users to English URLs. | ~1h, dashboard + config |
| **P1-3** | ~~Skip Disqus on `/zh-Hans/*`~~ **DONE** | Disqus is **hard-blocked in mainland China** — measured TLS reset then two 15.0s timeouts from CHINANET probes; OONI 89.9% anomaly rate; 100% blocked 2018-2026. It is on all 272 doc pages via `src/theme/DocItem/index.tsx:5`. It is the **only** hard-blocked dependency; Google Fonts, Algolia, Netlify and CodeSandbox all work, merely slower. | ~15 min |
| **P1-4** | **`noindex` on the 34 zh-Hans API pages — DONE.** The title-suffix half was *not* done: `siteConfig.title` is global, not per-locale, and adding a `title` to the homepage `<Layout>` would change the English homepage title too. Docs pages already carry Chinese titles; only the brand suffix is English, which is normal. Judged not worth the risk to the highest-authority page. | Every Chinese page ends with the English site tagline; the zh homepage title is 100% English with zero CJK. The zh API pages serve English content (73 CJK vs 3,046 Latin characters). | ~30 min |

**Known and accepted:** `konva.zhcndoc.com` — a 309-URL scrape of this site — ranks **#1** for
konva 中文文档 and is self-canonical. It is ICP-filed on Alibaba Cloud, which a solo foreign
maintainer cannot match. **Do not chase it.** Do the cheap half above; the mirror holds #1 on
exact-match content with a two-backlink moat.

**Also known:** LeaferJS owns the Chinese comparison narrative — `benchmark.leaferjs.com/konva`
claims 60fps vs 0fps for dragging and its launch video has 86,643 Bilibili plays against
10,901 for the best Konva video. Same problem as the English benchmark, on a site that cannot
be PR'd. No action identified.

---

## 6. Priority 2 — make the work possible and reviewable (about 1 day)

| ID | Item | Why |
|---|---|---|
| **P2-1** | ~~`I18N_PENDING` allowlist~~ **DONE** | The check has no escape hatch, so **an English-only page cannot ship at all**. ~20 lines converts a hard build gate into a deferrable backlog and makes everything downstream ~26% cheaper. |
| **P2-2** | **A frozen prompt panel, committed to the repo** | The plan's own thesis is that payoff appears as LLM citations — and **nothing measures citations**. The tell: v1 deferred an item on "re-run the prompt in 60-90 days", but the original answers were never recorded reproducibly, so the trigger could never fire. 10-12 prompts x 3 providers, verbatim answers, day 0 / 45 / 90. Without this the whole plan is unfalsifiable. |
| **P2-3** | **30 minutes in Search Console** | The 1,456 to 292 ranked-keyword drop is unexplained. Search Console is verified (DNS TXT confirmed) and unread. The URL-deletion hypothesis is already eliminated — Wayback CDX shows only 2 of 267 archived paths absent, both redirected. Check the **Breadcrumbs** enhancement report: P0-3 invalidates structured data on 264 pages, and "most losses were positions 51-100" is consistent with that. |

**Instrumentation reality:** 4 custom events exist, all on the homepage. Nothing measures
search queries, Ask-AI usage, demo runs across 227 pages, or 404s. In CrawlChat, 100% of
messages categorise as "Other", `get_data_gaps` returns `[]`, and there is 1 downvote across
2,677 messages — the richest dataset in the audit runs with its analysis pipeline off.

---

## 7. Priority 3 — retrieval infrastructure (about 1.5 days)

All of these touch the same generator and build step. **One pass, or the work repeats.**

| ID | Item | Notes |
|---|---|---|
| **P3-1** | **Per-locale `llms.txt`, generated from title + description** | All 272 pages already have both, and the zh mirrors have translated ones. Today `/llms.txt` and `/zh-Hans/llms.txt` are byte-identical English. Docusaurus copies `static/` into every locale, so **this must run after `docusaurus build`**, not before. |
| **P3-2** | **`.md` variants of every page** | `/docs/overview.md` currently 404s. Must also be post-build, or `/zh-Hans/docs/overview.md` serves English — the same defect P3-1 fixes. Needs a coverage check in `npm run check` (`checksitemap.js` only validates sitemap URLs) and a `/docs/*.md` rule in `_headers`. **Will not fix the API reference unless chunked** — `Konva.Text.html` is 553 KB raw, about 140k tokens for one class. |
| **P3-3** | **Drop `llms-full.txt` and `llms-medium.txt`** | With `.md` variants, an agent fetches the index then pulls what it needs. Nobody loads 1.46 MB. **Note:** the v1 rebuild is committed but **never deployed** — live `llms-full.txt` is still the old 157 KB file and `llms-medium.txt` 404s. So this reverses work that never shipped. Clean up 6 references (`static/llms.txt`, `_headers` x2, `ai_tools.md` plus its mirror, `README.md`, `CLAUDE.md`). |
| **P3-4** | **Deduplicate the API reference** | About 9 MB of byte-identical boilerplate: `Konva.Rect.mdx` is 3,548 lines of which **3,429 (96%) are inherited methods**, identical across ~20 shape pages. Replace the inherited block in `create-api-docs.js` with a link table to `Konva.Node`/`Konva.Shape`. Collapses 500 KB pages to ~20 KB and stops the same boilerplate outweighing each shape's real content 25:1 in any index. **~1h, and it costs zero Chinese edits** — `SOURCES.json` has 0 entries under `api/`. |
| **P3-5** | **Pull `react-konva/README.md` and `konva/CHANGELOG.md` content into the llms sets** | **v1 called this "no dependencies, ship first" and that was wrong.** `react-konva` is not a dependency of this repo and `node_modules/konva/` ships no CHANGELOG, so "it auto-updates" is false — it needs vendored copies, which then inherit the i18n gate. **Re-decide before doing.** Note four pages already link to the CHANGELOG and four to the react-konva repo; what is missing is the content on-domain, not the links. |

---

## 8. Priority 4 — content

Reduced from 22 items to what survived verification. Each still needs its Chinese mirror
(see §9).

**Strongest evidence — do these first:**

| ID | Item | Evidence |
|---|---|---|
| **A9** | Blurry canvas / crisp rendering | "blurry" appears in **0** files, `devicePixelRatio` in **2**. Developer SERP verified: SO #1, Medium #2, MDN #3, dev.to #8. MCP queries match the proposed scope almost line for line, including `0.5px offset crisp stroke anti-aliasing`. The one item both scorings agree on. Volume is now 1,000/mo — treat with the §3 contamination caution; the case rests on the SERP and the logs. |
| **C5** | Strengthen `shapes/Text.mdx` | 455 words, ranks p22 for a clean 390/mo KD 9 term, and opens with `Konva.Text()` instantiation instead of answering the question. **Text measurement is the largest verified MCP cluster (14-27 queries)** — larger than v1 claimed. |
| **A10** | Zoom-invariant UI (constant screen size while zooming) | No page covers it. 6 MCP queries, one nearly the page title, **2 of them human**. This is exactly where a model invented `stage.on('scale change')` — a documented hallucination with a documented cause. |
| **A8** | Reframe `Batch_Draw.mdx` **plus clean 9 demo pages** | The page opens with the "Update:" note then teaches the superseded technique for 300 words. **And 9 doc pages still call `layer.draw()` in their own samples** (`faq.md`, `Connected_Objects`, `Canvas_Crop_Image`, `Video_On_Canvas` and five more) — reframing one page leaves the training signal intact. |

**Sound, lower urgency:** A4 testing (react-konva/jsdom only — models are already correct for
Node and Playwright; justified on *severity*, since jsdom tests pass green while asserting
nothing; note `react-konva/vitest.config.ts` already runs the prescribed browser-mode setup,
so this is distillation not research) · A11+A12 performance additions (`hitGraphEnabled` and
culling are absent; **reconcile with the untracked `posts/Canvas_Performance.mdx`, which
already covers hit canvases**) · A7 mobile tap/click · A6 seven React tabs · H5 34 API
descriptions (needs a plain-text/YAML sanitiser — the existing `processDescription()` emits
markdown links) · H3 "what Konva does not do" (**lead with perspective warp**, 7-8 queries;
boolean 3, lasso 1, flood fill 1) · H1 add BBC/Label Studio/Inditex/DWV logos, **keeping the
existing entries** · D8 `<RelatedPages>` then D1 internal linking · D2 retitle demos
(**rebuild the target list** — `Quantum_Squiggle` and `Jumping_Bunnies` are already done;
`Shape_Tango`, `Elastic_Stars`, `Star_Spinner`, `Planets_Image_Map`,
`Animals_on_the_Beach_Game` are not).

**Shrunk to sections on existing pages:** B7+B8 add **D3 only** plus a whiteboard paragraph,
a year, and a metrics table — **one pass on one 418-word file** · B4 annotation comparison ·
B9 give the existing license answer its own URL · C8 install friction only (`registerFont`,
Docker, Lambda, node-gyp — the v10 backend change is already documented) · C10 *object-level*
erasing that survives transforms, on `Free_Drawing.mdx` · A5 TypeScript, rescoped to
**config-object types** (`CircleConfig`, `ImageConfig`) — the MCP log asks for those, not the
event-handler types the 544k-view SO question covers, and that question is already answered.

**Re-argue before doing:** B1 Konva vs React Flow — **v1 deferred this to Nov 2026 and the
deferral rationale was disproved by measurement**: a live category prompt returns 0 of 20
sources from konvajs.org while a Konva-named prompt cites the same page as source [1].
Live retrieval, so corpus lag cannot explain it. B3 floor plans — Konva does not rank at all,
so this is a from-zero play, not a push-up. B5 `/fabric-js-alternative` — note konvajs.org's
homepage already ranks **#3, above img.ly at #4**, and **polotno.com holds #8** on that SERP.

**Cut:** C11 data grid (2 MCP queries; `20000_Nodes.mdx` already demonstrates the scale claim;
`rowsncolumns/grid` dormant since 2023-10) · C12 timeline (1 query; "several other repos"
unsupported — GitHub search returns only `melfore/konva-timeline`) · E3 filters explorer
(`Konva.Filters.mdx` is already the anchored list — instead **write the two missing filter
pages, `Posterize` and `RGBA`, about 30 min**) · D3 showcase (homepage sections are already
server-rendered and crawlable; the content wanted is H1, a 20-minute edit) · G8 FAQPage
(already live) · H9 as scoped — **only the 15 svelte pages are genuinely empty**; every
react/vue/angular page under 200 words contains a complete runnable `live` block, so the word
count is a measurement artifact.

**Reversed from v1's rejections:** **F1 — document `konva-devtool`.** It was swept up in a
principle aimed at `SKILL.md`. `content/docs/tools.md` is titled *"Konva.js Tools and Plugins"*
and lists four framework bindings, while `konva/README.md:65` tells users to install the
extension. **The site contradicts its own README on the page named Tools.** 72 stars, in the
org, pushed 2026-07-08, 532 Chrome Web Store users. About 10 minutes. Also mention
`maitrungduc1410/konva-inspector` (45 stars, more capable, supports v9 and v10).

**Also reversed: correct the SVG claim.** `best-canvas-library.md:27` says *"Konva can't do
this"* about SVG import **and** export; `why-konva.md:46,56` repeat it. But
`SVG_On_Canvas.mdx` documents three working **import** routes (`Konva.Image.fromURL`,
`Konva.Path`, canvg). Export is genuinely absent; import is not. **About 30 minutes to split
the claim** — this is a factual error on the site's most-cited page, not a missing page.

---

## 9. The uncounted cost

**v1 budgeted ~20 days and budgeted zero for the Chinese mirror.** `check-i18n-drift.js`
walks all of `content/` (minus `api/`) and fails the build on any un-mirrored English edit.
Two reviewers costed it independently and agreed: **about 42 hours, roughly 5.3 working days,
a 26% overrun** — and more if the maintainer reviews the Chinese properly rather than trusting
machine translation.

The shape matters more than the number: D2 (68 demos) + D1 (185 pages) + edits (~55) means
**essentially the whole 272-page corpus gets touched twice**. This is not a plan that adds
pages; it is a plan that rewrites the site, and the site has a mandatory second copy.

**P2-1 (the allowlist) is the single highest-leverage item on the board** because it converts
that tax into a backlog.

**Also uncounted:** D2 has **four surfaces**, two of which no check covers — the hardcoded
English keys in `src/pages/docs/sandbox.html.tsx` and the `demos.item.*` ids in `code.json`
are explicitly exempted from `check-code-drift.js`, so retitling the pages leaves the gallery
showing old names in both locales **with the build green**.

---

## 10. Completed

| Date | Change |
|---|---|
| 2026-08-20 | Fixed `Stage_Data_URL.mdx` — it taught a `toDataURL()` callback for `Stage` that does not exist, contradicting both the API reference and its own code sample. |
| 2026-08-20 | Fixed a one-arg `Math.max` in `react/Transformer.mdx`. |
| 2026-08-20 | Retitled `Stage_Preview` (minimap), `Objects_Snapping` (alignment guides), `Custom_Font` (measure text width) to match MCP retrieval vocabulary. Additive; existing keywords kept. |
| 2026-08-20 | Rebuilt `llms-full.txt` from `content/docs/**` and added `llms-medium.txt`. **Committed, never deployed, and superseded by P3-1/P3-3.** Kept in history for the MDX-to-markdown conversion, which is reusable for P3-2. |

---

## 11. Known-unknown

**Ranked keywords fell 1,456 to 292 between March and August 2026; ETV -38%.** Not explained.
Ruled out: URL deletion (Wayback CDX — only 2 of 267 archived paths absent, both redirected),
canonical and hreflang (verified correct), URL duplication (`/Rect.html`, `/Rect.html/`,
`/Rect`, `/rect.html` all 200 with correct canonical). **Untested and plausible:** P0-3, which
invalidates structured data on 264 pages. Check Search Console before spending days on content.
