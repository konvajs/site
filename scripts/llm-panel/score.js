'use strict';

/**
 * Scoring rules for the LLM prompt panel.
 *
 * Scores are NOT stored in a run file. A run file holds the verbatim answer and
 * the citation list only, and every number below is recomputed from that text
 * each time you compare. That way a better scoring rule can be applied to old
 * runs, instead of invalidating them.
 *
 * Three things are measured per answer:
 *   named  - does the answer say "Konva" at all
 *   rank   - among the TRACKED libraries the answer names (see LIBRARIES), which
 *            one is Konva, counted by first mention (1 = the first one named).
 *            An untracked library is invisible to the rank, and a Konva mention
 *            in a closing aside still counts as a mention, so read the rank
 *            beside first_mention_percent - how far into the answer Konva first
 *            appears. Rank 2 at 95% is a throwaway, not a recommendation.
 *   cited  - does any citation, or any URL in the answer, point at konvajs.org
 *
 * Code prompts are scored differently: they check for markers of a correct
 * answer, and for markers of the known wrong answer.
 */

/**
 * Libraries the panel counts when it works out a rank. Only real library names
 * belong here - a generic word such as "canvas" would match everywhere and make
 * every rank meaningless.
 */
const LIBRARIES = [
  ['Konva', /\bkonva\b/i],
  ['Fabric.js', /\bfabric(?:\.js|js)?\b/i],
  ['PixiJS', /\bpixi(?:\.js|js)?\b/i],
  ['Paper.js', /\bpaper\.js\b/i],
  ['Two.js', /\btwo\.js\b/i],
  ['p5.js', /\bp5(?:\.js)?\b/i],
  ['Three.js', /\bthree\.js\b/i],
  ['Excalidraw', /\bexcalidraw\b/i],
  ['tldraw', /\btldraw\b/i],
  ['React Flow', /\b(?:react[\s-]?flow|reactflow|xyflow)\b/i],
  ['JointJS', /\bjoint(?:\.js|js)\b/i],
  ['GoJS', /\bgojs\b/i],
  ['mxGraph', /\bmxgraph\b/i],
  ['Cytoscape.js', /\bcytoscape(?:\.js)?\b/i],
  ['D3', /\bd3(?:\.js)?\b/i],
  ['Rough.js', /\brough(?:\.js|js)\b/i],
  ['EaselJS', /\b(?:easel(?:\.js|js)|createjs)\b/i],
  ['Leaflet', /\bleaflet\b/i],
  ['OpenSeadragon', /\bopenseadragon\b/i],
  ['SVG.js', /\bsvg\.js\b/i],
  ['ZRender', /\bzrender\b/i],
  ['Annotorious', /\bannotorious\b/i],
  ['Chart.js', /\bchart\.js\b/i],
  ['ECharts', /\becharts\b/i],
  ['Sketch.js', /\bsketch\.js\b/i],
  ['Zwibbler', /\bzwibbler\b/i],
  ['Rete.js', /\brete(?:\.js|js)\b/i],
  ['AntV X6', /\b(?:antv\s*)?x6\b|\bxflow\b/i],
  ['Floorplan.js', /\bfloorplan\.?js\b|\bsmplrspace\b/i],
  ['Archilogic', /\barchilogic\b/i],
  ['Syncfusion', /\bsyncfusion\b/i],
  ['Mapplic', /\bmapplic\b/i],
  ['Mappedin', /\bmappedin\b/i],
  ['Mapbox GL JS', /\bmapbox\b/i],
  ['marker.js', /\bmarker\.?js\s*\d?\b/i],
  ['react-image-annotate', /\breact-image-annotat/i],
  ['IMG.LY', /\bimg\.ly\b/i],
  ['ZIM', /\bZIM\b/],
  ['Imagine.js', /\bimagine\.js\b/i],
  ['Snap.svg', /\bsnap\.svg\b/i],
  ['Phaser', /\bphaser\b/i],
  ['CanvasKit', /\bcanvaskit\b/i],
  ['jsPlumb', /\bjsplumb\b/i],
  ['Panzoom', /\bpanzoom\b/i],
  ['LEADTOOLS', /\bleadtools\b/i],
];

const SITE = /konvajs\.org/i;

/** Order the libraries an answer names by where each one first appears. */
function libraryOrder(text) {
  const found = [];
  for (const [name, pattern] of LIBRARIES) {
    const match = pattern.exec(text);
    if (match) found.push({ name, at: match.index });
  }
  found.sort((a, b) => a.at - b.at);
  return found.map((entry) => entry.name);
}

function citedUrls(result) {
  const urls = (result.citations || []).map((citation) => citation.url).filter(Boolean);
  // Some providers put bare URLs in the prose instead of in a citation list.
  const inText = (result.answer || '').match(/https?:\/\/[^\s)\]"'<>]+/g) || [];
  return { citation_urls: urls, urls_in_text: inText };
}

function checkMarkers(text, markers) {
  return (markers || []).map((marker) => ({
    label: marker.label,
    hit: new RegExp(marker.pattern, 'i').test(text),
  }));
}

/**
 * Score one stored result against its prompt definition.
 * Returns null-ish fields rather than guesses when the provider failed.
 */
function scoreResult(prompt, result) {
  if (result.error || result.answer == null) {
    return {
      prompt_id: prompt.id,
      category: prompt.category,
      provider: result.provider,
      ok: false,
      error: result.error || 'no answer recorded',
      named: null,
      rank: null,
      cited: null,
      win: null,
    };
  }

  const text = result.answer;
  const order = libraryOrder(text);
  const named = order.includes('Konva');
  const rank = named ? order.indexOf('Konva') + 1 : null;

  const konvaAt = /\bkonva\b/i.exec(text);
  const firstMentionPercent = konvaAt ? Math.round((konvaAt.index / text.length) * 100) : null;

  const { citation_urls, urls_in_text } = citedUrls(result);
  const cited = citation_urls.some((url) => SITE.test(url)) || urls_in_text.some((url) => SITE.test(url));

  const includeHits = checkMarkers(text, prompt.win.must_include);
  const excludeHits = checkMarkers(text, prompt.win.must_not_include);

  // A win must satisfy every criterion the prompt actually declares.
  // site_cited is only held against a run where the provider searched the web;
  // a model answering from memory cannot cite anything, and failing it for that
  // would report a loss that is not one.
  const checks = [];
  if (prompt.win.konva_named) checks.push(named);
  if (prompt.win.rank_at_most != null) checks.push(rank != null && rank <= prompt.win.rank_at_most);
  // A library named in the closing sign-off was not recommended. Without this,
  // a trailing "or try Konva" scores the same as a first-line recommendation.
  if (prompt.win.first_mention_before_percent != null) {
    checks.push(firstMentionPercent != null && firstMentionPercent <= prompt.win.first_mention_before_percent);
  }
  if (prompt.win.site_cited && result.web_search_used) checks.push(cited);
  for (const hit of includeHits) checks.push(hit.hit);
  for (const hit of excludeHits) checks.push(!hit.hit);

  return {
    prompt_id: prompt.id,
    category: prompt.category,
    provider: result.provider,
    ok: true,
    error: null,
    named,
    rank,
    rank_target: prompt.win.rank_at_most != null ? prompt.win.rank_at_most : null,
    cited,
    first_mention_percent: firstMentionPercent,
    web_search_used: result.web_search_used === true,
    libraries: order,
    must_include: includeHits,
    must_not_include: excludeHits,
    win: checks.length > 0 && checks.every(Boolean),
  };
}

/** Score a whole run file. */
function scoreRun(panel, run) {
  const byId = new Map(panel.prompts.map((prompt) => [prompt.id, prompt]));
  return run.results
    .filter((result) => byId.has(result.prompt_id))
    .map((result) => scoreResult(byId.get(result.prompt_id), result));
}

module.exports = { LIBRARIES, libraryOrder, scoreResult, scoreRun };
