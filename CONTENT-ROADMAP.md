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

### Group B — Positioning and comparison guides

Decided 2026-08-20. This group scores highest under the reframe in §2: `best-canvas-library.html`
has near-zero traffic and is the most-cited Konva URL in the study.

| ID | Idea | Why | Effort | Status |
|---|---|---|---|---|
| B1 | Konva vs React Flow guide | **DEFERRED — measure first.** Konva scored zero on the flowchart prompt across all three providers, and the original reasoning was "models answer category questions with category products". That was an unsupported assertion. `Connected_Objects.mdx` got its "React Flowchart" title on 2026-04-10 and is too new to be in training corpora. Re-run the prompt in 60–90 days; only write the guide if it still does not surface. | 1d | DEFERRED to ~Nov 2026 |
| B2 | Whiteboard positioning | **Scaled down to a section inside B7**, not a page and not a competitor comparison. The maintainer uses and respects tldraw. The real problem is narrow: Perplexity dropped Konva entirely on "javascript whiteboard library" because no page contains the word in a findable position. An honest paragraph — buy tldraw/Excalidraw for a product, build on Konva to own it — closes the retrieval gap. | 2h | QUEUED (inside B7) |
| B3 | Floor plan / seat map build-vs-buy | Konva ranks #4–7 behind three commercial SaaS products. Two good demos exist. Name seats.io as the buy option honestly. Cover hit-testing rooms, zoom-to-fit, 10k seats, and saving logical coordinates — the last is a real unanswered MCP query. | 0.75d | QUEUED |
| B4 | Annotation comparison | An added section on the existing `Image_Labeling.mdx`, not a new page. Annotorious is #1 on all three providers; being second to a purpose-built library is defensible and worth saying plainly. | 2h | QUEUED |
| B5 | `/fabric-js-alternative` | Defensive and offensive. IMG.LY ranks #3 for `konvajs-alternative` with a page targeting Konva by name and there is no reply. Tone: honest, with some irony — explicitly requested. | 0.5d | QUEUED |
| B6 | `/react-flow-alternative` | Overlaps B1 too heavily to justify separately. | 0.5d | REJECTED |
| B7 | Add D3 and Paper.js to `best-canvas-library` | Extends the page that already works rather than betting on a new one. SO: "Pixi.js vs Konva.js vs D3.js" 18,747 views **no accepted answer**; "Advantages of Konva over Paper.js" 2,150 views **zero answers**. Also absorbs B2. | 3h | QUEUED |
| B8 | Year-date the comparison page | velt.dev — a collaboration SaaS with no canvas library — owns #1 for `html5 canvas library 2026` with a dated listicle. Konva's page is undated. Add the year, a maintenance line, and a table with npm counts and bundle sizes. | 1h | QUEUED |
| B9 | License / commercial-use page | Reframed away from competitor licensing. The MCP logs show "Konva license commercial use / MIT / pricing" asked **five separate times** by humans, plus "react-konva license and pricing". MIT is in `faq.md` and `about.md` but nothing answers "can I use this commercially" directly. | 2h | QUEUED |

**Standing note on tone:** these pages work *because* they are honest. `best-canvas-library.html`
earns its citations by saying "use PixiJS for games, use Fabric for SVG". A guide that concludes
"use Konva" every time reads as marketing and stops being cited.

### Group C — Canvas-task pages

Decided 2026-08-20. **Weakest group under the reframe in §2** — C1–C4 are pure search plays
against declining keywords. What survived was judged on two other axes: does it make models
emit correct code, and does it prove a capability Konva actually has users for.

Three agent claims were checked and withdrawn: `Signature_Pad` is 1,015 words (not "a bare
demo"), `Web_Worker` is 886 words and substantive (its low ranking is an authority problem
that Group D addresses), and `getRelativePointerPosition` already appears in 23 files.

| ID | Idea | Why | Effort | Status |
|---|---|---|---|---|
| C1 | `html5 canvas coordinates` page | Coverage already exists in 23 files. Keyword play for a dying keyword. | — | REJECTED |
| C2 | `html5 canvas rotate image` page | Only the `html5` prefix is clean — bare `canvas rotate image` is Canva-contaminated. Links naturally to the orphaned `Position_vs_Offset` post. | 0.5d | DEFERRED — only if it falls out of C5/C6 cheaply |
| C3 | `html5 canvas drawImage` page | ~200/mo and `Konva.Image` users rarely touch raw `drawImage`. | — | REJECTED |
| C4 | `html5 canvas grid` page | Cheap and uncontested; would be a real entry point to `Objects_Snapping` and `Infinite_Canvas`, both nearly orphaned. | 0.3d | DEFERRED — same condition as C2 |
| C5 | **Strengthen `shapes/Text.mdx`** | 455 words, ranks p22 for a clean ~390/mo cluster, and opens with the Konva.Text API instead of answering "how do I draw text on canvas". Text measurement is also a top MCP gap cluster (~7–8 queries). Best item in the group. | 0.5d | QUEUED |
| C6 | Strengthen `shapes/Arc.mdx` | 383 words, ranks p9. Opens with `innerRadius`/`outerRadius` when the query wants `ctx.arc()` and the radians gotcha. **Justified on the clean SERP and the existing p9 — not on the reported 2,900/mo, which is 7× "html5 canvas" itself and implausible.** | 0.4d | QUEUED |
| C7 | Strengthen `Signature_Pad` | Already 1,015 words. Agent claim was false. | — | WITHDRAWN |
| C8 | **Strengthen `nodejs/index.mdx`** | 381 words. Real pain is install friction — native build deps, Docker, Lambda, font registration. Also the most natural home for the v10 `import 'konva/canvas-backend'` change, so it compounds with A1–A3. | 0.5d | QUEUED |
| C9 | OffscreenCanvas page | 886 words, substantive. Ranking problem, not a content problem. | — | WITHDRAWN |
| C10 | **Eraser tool demo** | SO "Eraser without destination-out" — 2,591 views, **zero answers**. konva #1937, #1656; react-konva #794. Only 2 files mention it. Erasing is table stakes in any drawing app. | 0.5d | QUEUED |
| C11 | **Data grid / spreadsheet demo** | A category with real production usage and zero demo pages: `rowsncolumns/grid` 634★ / 2,759 dl-mo, `react-konva-grid` 2,262 dl-mo. SO "Spreadsheet-like grid in Konva" 3,552 views, no accepted answer. Demonstrates Konva's real strength — 100k cells without dying. | 1d | QUEUED |
| C12 | Timeline demo | Video-editor timelines are an active 2026 category currently choosing Fabric.js. `melfore/konva-timeline` 78★ plus several others. **Waveform (BBC peaks.js, 3,403★) and DICOM (DWV, 1,841★) are better served by the showcase page in Group D**, where "the BBC uses Konva" is the entire message. | 1d | QUEUED (timeline only) |

### Group D — Site structure

Decided 2026-08-20. **Honest reframe applied:** §1 calls internal linking the central finding.
Under the §2 reframe that is weaker than originally presented — sidebar links already suffice
for crawling, and retrieval systems weight content and titles far above link graphs. D1 is
mostly a classic-SEO play, so it was demoted. **D2 is the item that actually matters**, because
titles are the retrieval key.

Two agent claims corrected: dark mode is not missing, it is deliberately disabled
(`docusaurus.config.ts:153` — `defaultMode: 'light'`, `disableSwitch: true`); and
`CompaniesSection` / `KonvaUsersSection` do exist, inside `src/pages/index.tsx`.

| ID | Idea | Why | Effort | Status |
|---|---|---|---|---|
| D8 | **`<RelatedPages>` MDX component** | The mechanism for D1. Cross-links declared in frontmatter and rendered consistently, instead of hand-written prose links that rot. Without it D1 is a one-time manual pass that decays. **Build before D1.** | 0.5d | QUEUED — first |
| D2 | **Retitle demos to task language** | Best item in the group. Perplexity dropped Konva purely on missing vocabulary. `Wheel_of_Fortune`, `Jumping_Bunnies`, `Shape_Tango`, `Quantum_Squiggle`, `Elastic_Stars` are product names, not tasks. **Retitle without changing slugs** — titles carry the retrieval signal, slug changes would need redirects and would break the links D1 writes. | 0.5d | QUEUED |
| D3 | **`/showcase` page** | Currently homepage-only, not crawlable, no submission loop. Scores high under the reframe: "BBC peaks.js 3,403★, Label Studio 28,099★, Inditex Weave.js, DWV 1,841★" is exactly the verifiable fact an LLM repeats for "is Konva production-ready?". Absorbs the waveform and DICOM entries dropped from C12. Honest ceiling: reactflow.dev's showcase earns ~20 referring domains, and curation is recurring. | 2d | QUEUED |
| D1 | Internal linking pass — 185 orphans | Demoted from headline finding. Surviving argument is navigational, not SEO: 53 of 68 demos are dead ends, so a reader on `Transformer` cannot reach `Objects_Snapping`. | 1.5d | QUEUED — after D8 |
| D4 | Changelog / "what's new" page | Models already answer "actively maintained, recent 2026 release" by reading the GitHub release feed. Solves a problem that does not exist. | — | REJECTED unless A1–A3 makes it free |
| D5 | Component registry (`/ui` equivalent) | Highest strategic value on the board — it is what turns "a canvas library" into "a canvas platform", and reactflow.dev's `/ui/components/zoom-slider` ranks #1 for a generic UI keyword. But it is a product commitment with permanent maintenance cost for a solo maintainer. **Revisit if Konva gains a second maintainer.** | 1–2w | NOT NOW |
| D6 | Per-method API pages | p5.js has 557 ranking pages this way. But API pages barely surface in LLM citations — only `Konva.Text` and `Konva.Transformer` appear in the CrawlChat top ten. Pure SEO play at high effort; biggest effort-to-value mismatch in the group. | — | REJECTED |
| D7 | Dark mode | Deliberately disabled, asked for 3× in the logs. Pure UX, no measured effect on anything in this audit. | — | REJECTED |

### Groups E–H — not yet discussed

Full idea inventory preserved so the discussion can resume. ~68 ideas total.

| Group | Theme | Count | Status |
|---|---|---|---|
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
