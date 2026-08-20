# LLM prompt panel

## Why this exists

The content plan for this site has one thesis: developers ask an AI assistant instead
of a search engine, so good documentation pays off as **LLM citations**, not as search
traffic.

Nothing measured that. An earlier plan said "re-run the prompt in 60-90 days and see if
it changed", but no one wrote down the first answers. That trigger could never fire.

This folder is the instrument. It asks a frozen set of developer questions, stores every
answer word for word, and tells you what changed since the day-0 baseline.

## The parts

| File | What it is |
|---|---|
| `prompts.json` | The frozen panel: 12 prompts, and the win condition for each |
| `run.js` | Asks every prompt, writes one timestamped file to `results/` |
| `score.js` | The scoring rules. Shared by `run.js` and `compare.js` |
| `compare.js` | Diffs two runs and reports what changed |
| `results/` | One JSON file per run. Never edit these |

There are no dependencies. Node 18 or later is sufficient.

## When to run it

Run the panel on **day 0**, **day 45**, and **day 90**.

Day 0 is done: `results/2026-08-20T19-41-21Z.json`.

Do not run it more often. LLM answers move on their own, and a short interval shows you
that noise instead of your work.

## How to run it

### With API credentials (preferred)

The panel speaks to the DataForSEO LLM endpoints. Put your credentials in the
environment, then run:

```bash
export DATAFORSEO_LOGIN=...
export DATAFORSEO_PASSWORD=...
npm run panel:run
```

Each run makes 24 calls (12 prompts x 2 providers) and costs approximately 0.50 USD.
A run takes 5 to 10 minutes, because the providers are slow.

To run one prompt again after a failure:

```bash
node scripts/llm-panel/run.js --only target-whiteboard
```

### Without API credentials

```bash
node scripts/llm-panel/run.js --emit
```

This prints the exact call for every prompt and provider, and the file name to save each
response as. Make the calls by hand, put the response files in one directory, then:

```bash
node scripts/llm-panel/run.js --ingest <that-directory>
```

`--ingest` reads files named `<prompt-id>__<provider>.json`. It expects the DataForSEO
response shape. If a file is missing, the prompt is recorded as a null result with the
reason. **The script never invents an answer.** A provider you cannot reach becomes
`"answer": null` with an `"error"` string.

## How to read the output

```bash
npm run panel:compare                    # oldest run vs newest run
node scripts/llm-panel/compare.js <file> # one run on its own
node scripts/llm-panel/compare.js <base> <later>
```

The report groups the prompts in three categories:

- **CANARY** — Konva wins these today. They catch a regression. If a canary slips, stop
  and find out why before you read anything else.
- **TARGET** — Konva loses these today. These are what the content work must move.
- **CODE** — Correctness probes. They do not ask if Konva is recommended. They ask if the
  model writes correct Konva code.

For each prompt you get three measurements:

- **named** — the answer says "Konva".
- **rank** — Konva's position among the libraries the answer names, counted by first
  mention. 1 means Konva is the first library named.
- **cited** — a citation, or a URL in the answer, points at konvajs.org.

### What the numbers do not tell you

**The rank only counts libraries in the `LIBRARIES` list in `score.js`.** A library that
is not in that list is invisible to the rank. In the day-0 run, one answer named three
floor-plan products before Konva, but only one of them was tracked, so the raw rank
flattered Konva. Add a competitor to the list when you see it beat Konva in an answer.

**A mention is not a recommendation.** The report also prints how far into the answer
Konva first appears. Rank 2 at 99% is a closing aside, not advice. For canary and target
prompts, a win needs Konva in the first 60% of the answer.

**konvajs.org cannot be cited if the model did not search.** The report says
`no web search` when this happened. On those results, the citation criterion is skipped
instead of counted as a failure.

## Changing the panel

**Do not edit the text or the id of an existing prompt.** A changed prompt is a different
question, and every comparison against the baseline stops meaning anything. To ask
something new, add a prompt with a new id and raise `panel_version`.

Every run stores `panel_sha256`, the hash of `prompts.json` at the time. `compare.js`
prints a warning when two runs used different panel content.

You **may** improve `score.js`. Runs store the raw answer text and the citation list only.
Every number is recomputed at compare time, so a better rule applies to old runs as well.

## What the day-0 baseline says

24 results, 13 wins.

- Every canary is a win on both providers. Konva ranks 1 or 2 for "best javascript canvas
  library", "fabric.js alternative", "canvas library for drag and drop shapes", and
  "how to add resize handles to canvas shapes in react".
- Every target is a loss, except "javascript whiteboard library" on ChatGPT. For
  "react library for a node based flowchart editor" and "best library for an image
  annotation tool in the browser", neither provider names Konva at all. For "infinite
  canvas with pan and zoom", both providers name Konva in the closing sentence only.
- Both providers get the retina question wrong. Each one tells you to size the stage in
  device pixels and to counter-scale it. Konva already applies `devicePixelRatio`, so
  that recipe scales twice. This is the clearest thing a documentation page could fix.

The day-0 file records how it was captured, in its `capture` field. The answer text is
verbatim. Reasoning traces and Perplexity citation titles were not captured in that run;
`run.js` records both from day 45 on.
