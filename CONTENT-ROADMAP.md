# Content roadmap

A decision log for konvajs.org content work. Each item records **what** it is, **why**
it might be worth doing, the **evidence**, and the **decision**. Written so that work can
resume after a context reset without re-running the research or re-arguing settled calls.

Last updated: 2026-08-20.

---

## 1. Why this exists — the strategic picture

Five parallel research agents audited the site in August 2026 (keyword demand, competitor
gaps, developer pain, the LLM channel, and interactive tools). They converged on one
finding from four independent directions.

**Konva does not have an awareness problem or a content problem. It has a structure problem.**

| Measure | Value |
|---|---|
| npm installs / month | **10,066,327** — 2.7× Fabric (3,746,745) and PixiJS (3,762,872) |
| Named in relevant LLM answers | **89%** (28 live answers across ChatGPT, Gemini, Perplexity) |
| US organic visits / month | ~1,416 |
| Sitemap pages / pages that rank | 540 / 84 |
| Referring domains pointing at the homepage | ~74% of 931 |
| `content/` pages with zero inbound contextual links | **185 of 306** |

Konva is the #1 recommendation for "best javascript canvas library", "fabric.js alternative",
and "canvas library for drag and drop shapes". It cannot convert that, because 306 pages of
good documentation sit in a flat, unlinked structure.

### The pattern behind every loss

**Konva wins capability queries and loses application queries.** It is #1 for
"canvas library" and absent for "react node-based flowchart editor". It has an excellent
page for every application it loses.

`Infinite_Canvas.mdx` is titled *"Infinite Canvas with Zoom and Pan — Build with JavaScript"*,
a verbatim match for a query where the model named **no library at all**. It has 2 inbound
internal links. Meanwhile `best-canvas-library.html` — 7 inbound links, the most of any
content page — is the single most-cited Konva URL in the study and an AI Overview source.

**Guides rank and get cited. Demos do neither. There are 68 demos and 2 guides.**

---

## 2. The scoring reframe (important — this overrides the raw research)

The maintainer's correction to the research, adopted as the governing principle:

> In the era of AI all "tech questions" traffic is going down. Developers don't search.
> They use AI. But our posts still go into AI searches. Our own post "best js canvas
> library" is a possible proof. No traffic, still very used by AI.

This is correct and it changes how ideas score:

| | Old scoring | Current scoring |
|---|---|---|
| "~150 searches/mo, don't build it" | kills use-case pages | **weak objection** — citation is the payoff |
| Comparison / build-vs-buy guides | nice to have | **highest-value format on the site** |
| Canonical task pages | SEO content | **directly changes the code AI writes for users** |
| Backlink-chasing, tool pages for volume | worth doing | **mostly obsolete** |
| Titles matching literal phrasing | SEO hygiene | **still matters — retrieval needs it** |

**The nuance worth keeping:** Perplexity is near-pure retrieval. It cited Konva wherever a
page targeted the literal phrase and dropped Konva entirely on "javascript whiteboard
library" because no page targets that word. The gap was *keyword-shaped, not
authority-shaped.* So search volume is a bad proxy for value, while page titles remain a
good proxy for findability.

**Highest-ranked consideration:** content that makes models emit **correct** Konva. Where a
canonical page exists, GPT-5.5 got Konva right in 12/12 samples. Where none exists it
invented `stage.on('scale change')` — an event that does not exist, in a handler that
silently never fires.

---

## 3. Claims that were checked and found FALSE

Recorded so nobody rebuilds a case on them. All were produced by research agents and
contradicted by direct inspection.

| Claim | Reality |
|---|---|
| "Next.js/SSR is documented nowhere" | `react-konva/README.md:143` has a full section, correctly stating v10 works out of the box |
| "v10 breaking changes have no migration page" | `konva/CHANGELOG.md` documents all three with before/after code and motivation |
| "The React docs are a strict subset of the vanilla docs" | **89% of demo pages (204/227) already include React tabs** |
| "No page tells you to stop calling `draw()`" | `Batch_Draw.mdx` opens with an "Update: … `konva@8` batches automatically" note |
| "No scaling/performance guide exists" | `All_Performance_Tips.mdx` is thorough — layers, caching, `listening(false)`, drag costs |
| "No page mentions `pixelRatio`" | 39 files do. (The *blurry-display* framing is genuinely absent — that part held.) |
| "The `new.konvajs.org` redirect is undeployed" | Reported by two agents. It is deployed; every path 301s correctly. |
| "Pages lose because of titling" | False for `Infinite_Canvas` and `Connected_Objects`, which are already titled verbatim against the queries they lose. The cause is internal authority. |

**The pattern underneath:** almost nothing is *missing*. It is **in the wrong place for
retrieval** — in a README, in a CHANGELOG, or buried as an "Update:" note. Neither the
README nor the CHANGELOG is included in `llms.txt` / `llms-full.txt`, and nothing on the
site links to them.

### Also settled, do not re-propose

- **The `/build` section.** Eight tutorial pages, created and deleted. No search demand
  (~150/mo across all eight topics) and it duplicated six existing demos with zero
  cross-links. Redirects live in `static/_redirects`.
- **React Native support.** Impossible — no DOM, no `<canvas>`. `react/index.mdx` carries a
  short honest note pointing at React Native Skia.
- **A dedicated "Konva vs Fabric" page.** 10–20 searches/month, and `faq.html` already holds
  #2 on both query variants.
- **Consumer "free online tool" pages** (meme generator, QR code, image resizer, curved
  text). Every one is owned by exact-match-domain tool farms at KD 47–77, and the audience
  never installs an npm package.
- **A Yjs/CRDT adapter package.** Weave.js (Inditex) already occupies the space, and
  `Multiplayer_Whiteboard.mdx` already ships a Yjs example.

---

## 4. Decision log

Status: **DONE** · **QUEUED** (approved, not yet built) · **PENDING** (not yet discussed) ·
**REJECTED**.

### Group A — Developer-pain pages

All approved 2026-08-20. Effort estimates are post-verification, after several items shrank.

| ID | Idea | Why | Effort | Status |
|---|---|---|---|---|
| A1–A3 | **Pull `react-konva/README.md` + `konva/CHANGELOG.md` into the llms sets, and cross-link them from the site.** Replaces three proposed pages (Next.js, Nuxt, v10 migration). | The content already exists and is good; it is simply invisible to retrieval on konvajs.org. Writing pages would duplicate content maintained in two places. This also auto-updates. | ~2h | QUEUED — ship first, no dependencies |
| A4 | **`docs/react/Testing.mdx`** — testing react-konva components. Narrow, not a testing section. | See §5 below. Justified on *severity*, not volume. | ~1d | QUEUED |
| A5 | **TypeScript guide**, scoped to event-handler types and refs. | `KonvaEventObject` appears in 2 files site-wide. The SO question "Specifying onClick event type with TypeScript + react-konva" has **544,551 views** — the highest in the ecosystem. Scoped tightly because TS surface churns. | ~1d | QUEUED |
| A6 | Add React tabs to the **7 genuinely React-less demos**: `Image_Resize`, `Gestures`, `Rich_Text`, `Physics_Simulator`, `Wheel_of_Fortune`, `Image_Border`, `Web_Worker`. | Shrunk from "port six vanilla demos" after finding 89% already have React. `Image_Resize` maps to a 10,739-view SO question with a weak accepted answer. | ~0.5d | QUEUED |
| A7 | **Mobile tap/click double-firing** — `click` after `dragend`, `tap`+`click` both firing. | ~7 distinct MCP queries in 90 days. `Mobile_Events.mdx` lists the events and says nothing about this. | ~0.4d | QUEUED |
| A8 | **Reframe `Batch_Draw.mdx`** so the "you no longer need `draw()`" message is the page, not a footnote. | 10 of 12 model samples emit redundant `layer.draw()`. Harmless but universal. | ~1h | QUEUED |
| A9 | **Blurry canvas / crisp rendering** — `devicePixelRatio`, CSS size vs bitmap size, 0.5px offsets, Safari high-DPI. | The rare item both scorings agree on: 880/mo at KD 2 with a clean developer SERP (SO #1, MDN, dev.to) **and** ~5 MCP queries. "blurry" appears in 0 files. | ~0.5d | QUEUED |
| A10 | **Zoom-invariant UI** — keeping a label or handle at constant screen size while the stage zooms. | 3–4 MCP queries, no page — and precisely where GPT-4o invented `stage.on('scale change')`. A documented hallucination with a documented cause. | ~0.4d | QUEUED |
| A11 | **Extend `All_Performance_Tips.mdx`** with hit-canvas opt-out, viewport culling, and real numbers. Absorbs A12. | Shrunk from a new page. Issue #2024 (Konva vs Figma at 100k nodes) resolved in-thread with `listening:false`; #2009 open. Answers the evaluation-stage question "can Konva handle our scale?" | ~3h | QUEUED |
| A12 | **iOS 256 MB / 16.7 Mpx canvas ceiling** → a section inside A11. | SO 3,231 views, **zero answers**; konva #571 (13 comments). | ~2h | QUEUED (in A11) |

### Groups B–H — not yet discussed

Full idea inventory preserved so the discussion can resume. ~68 ideas total.

| Group | Theme | Count | Status |
|---|---|---|---|
| **B** | Positioning & comparison guides — Konva vs React Flow, whiteboard build-vs-buy (tldraw/Excalidraw), floor-plan build-vs-buy (seats.io), annotation vs Annotorious, `/fabric-js-alternative`, `/react-flow-alternative`, extend `best-canvas-library` with D3/Paper, year-date the comparison page, MIT-vs-tldraw-licensing counter-position | 9 | PENDING |
| **C** | Canvas-task pages — `canvas blurry` (moved to A9), html5 canvas coordinates / rotate image / drawImage / grid / text / arc, signature pad, node.js canvas, OffscreenCanvas, eraser tool, data grid, audio waveform, timeline | 12 | PENDING |
| **D** | Site structure — internal linking for 185 orphans, demo slug/title renaming to task language, showcase gallery, changelog page, component registry, per-method API pages, dark mode | 8 | PENDING |
| **E** | Tools & link assets — the canvas benchmark, `/play` playground, filters explorer, sprite-sheet slicer, `/tools/*` pages | 5 | PENDING |
| **F** | Packages — promote existing `konva-devtool`, SVG export bridge, testing helper, snapping utility, `konva-components`, MCP server / `SKILL.md` | 7 | PENDING |
| **G** | AI channel — `.md` page variants, JSON-LD (`FAQPage`, `TechArticle`, duplicate-breadcrumb fix), CrawlChat re-crawl, delete `ai-plugin.json`, fix `/zh-Hans/llms.txt`, SO answer campaign, DEV.to posts | 8 | PENDING |
| **H** | Small fixes & credibility — replace unverifiable social proof, license/commercial-use page, "what Konva does not do" page, accessibility guide | 9 | PENDING |

**Known cross-group dependencies** — these are why Group A is queued rather than built:

1. **D gates A.** Renaming demo slugs to task language breaks links written before the
   rename, and new pages must be included in the internal-linking pass.
2. **G overlaps A.** A `SKILL.md` / LLM cheatsheet is the same content as A3, A8 and A10,
   condensed. Decide whether those become pages, cheatsheet entries, or both.
3. **B overlaps A11.** A whiteboard or flowchart build-vs-buy guide is the natural home for
   part of the scaling material.

---

## 5. Research notes worth keeping

### Testing — why A4 is justified despite weak demand

An agent **executed** the code rather than reasoning about it. Findings:

- **Models are already correct** for plain Konva in Node and for Playwright E2E drag. Both
  ran verbatim, first try, green. Konva 10's own error message self-corrects an agent in one
  turn. **No page needed for either.**
- **Models fail on react-konva in jsdom, silently.** With the setup gpt-5.5 prescribes,
  these four tests *pass green*: `getIntersection` returns `null` instead of the shape; text
  measures `11` instead of ~140; `toDataURL()` returns a 24-char stub; pixel readback returns
  transparent. The model warned about the last two only.
- This is **the one failure mode a coding agent cannot self-correct** — it writes the test,
  the test goes green, the loop terminates.
- **The working approach is to split environments**: jsdom for store and model logic, a real
  browser (Vitest browser mode + Playwright) for anything touching a Stage. jsdom is not
  merely misconfigured for Konva — it is the wrong tool.
- Non-obvious knowledge the page should carry: `Konva.stages` as the test handle (documented
  nowhere on the site); `data-testid` is swallowed by react-konva's `Stage`, so Testing
  Library queries never find shapes; drag needs mousedown on the container but
  mousemove/mouseup on `window` (see `konva/src/DragAndDrop.ts:167`); dispatch both
  PointerEvent and MouseEvent, because Transformer anchors ignore pointer-only moves;
  `await tick()` between synthetic events, because react-konva >= 19.2.4 commits async;
  scale `getImageData` by the layer's pixel ratio or you sample the wrong pixel.
- **Honest caveat:** demand is historical. react-konva testing issues are all 2019–2022,
  nothing since; two konva issues total.
- **Do not document** `stage._pointerdown`, `Konva.DD._drag`, or layer pixel-diffing — those
  are library-internal, not app-developer patterns.

### Measurement caveats

- **Three contaminants pollute every "canvas X" keyword**: Canva the design tool, Canvas LMS
  by Instructure, and physical canvas prints. Anything above ~1,000/mo in this niche is
  almost certainly one of them. Always check the `core_keyword` clustering field.
  `dataforseo_labs_google_keyword_ideas` is unusable for this domain — 600 returned ideas
  were nearly all university LMS logins.
- **Close-variant inflation.** DataForSEO reports Google Ads volume, which buckets plurals
  and word-order variants. Four phrasings each reporting 390 are one bucket of ~390.
- **DataForSEO's LLM-mentions corpus is unusable here** — 8 total records for "konva",
  including "is jschlatt merch good quality". Share-of-voice came from 28 live model answers.
- **US-only** except one India pull. India shows 1,185 ETV from just 20 ranking keywords.

### Unexplained

**Ranked keywords fell 1,456 → 292 between March and August 2026; ETV −38%.** The Docusaurus
migration was tested as a cause and cleared: all nine `/build` redirects, the short URLs, and
a sitemap sample all resolve correctly. Most losses were positions 51–100. The drop is real
and unexplained — worth checking Search Console before investing in new pages.

---

## 6. Completed

| Date | Change |
|---|---|
| 2026-08-20 | `llms-full.txt` rebuilt from `content/docs/**` — was 157 KB of API signatures with zero prose, now 272 doc pages. Added `llms-medium.txt` (~160 KB) as the tier that fits a context window. Merged a duplicate section in `llms.txt` and made the tiers discoverable. |
| 2026-08-20 | Fixed `Stage_Data_URL.mdx` — it taught a `toDataURL()` callback for `Stage` that does not exist, contradicting both the API reference and its own code sample. |
| 2026-08-20 | Fixed a one-arg `Math.max` in `react/Transformer.mdx`. |
| 2026-08-20 | Retitled `Stage_Preview` (→ minimap), `Objects_Snapping` (→ alignment guides), `Custom_Font` (→ measure text width) to match the vocabulary in the MCP retrieval logs. Additive — existing keywords kept. |

**Open, needs the maintainer:** re-point the CrawlChat crawl from `new.konvajs.org` to
`konvajs.org` and re-index. The redirect is deployed and working, but a 301 does not rebuild
an existing index, and the Ask-AI widget and public MCP server still hand out staging URLs.
