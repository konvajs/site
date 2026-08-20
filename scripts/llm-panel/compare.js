#!/usr/bin/env node
'use strict';

/**
 * Reads run files and reports what changed.
 *
 *   node scripts/llm-panel/compare.js                    oldest run vs newest run
 *   node scripts/llm-panel/compare.js <run.json>         one run on its own
 *   node scripts/llm-panel/compare.js <base.json> <later.json>
 *
 * Everything printed is recomputed from the verbatim answers in the run files
 * by score.js, so an old run can be re-read under a newer scoring rule.
 */

const fs = require('node:fs');
const path = require('node:path');
const { scoreRun } = require('./score.js');

const HERE = __dirname;
const RESULTS_DIR = path.join(HERE, 'results');

function readPanel() {
  return JSON.parse(fs.readFileSync(path.join(HERE, 'prompts.json'), 'utf8'));
}

function listRuns() {
  if (!fs.existsSync(RESULTS_DIR)) return [];
  return fs.readdirSync(RESULTS_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .map((name) => path.join(RESULTS_DIR, name));
}

function loadRun(file) {
  const run = JSON.parse(fs.readFileSync(file, 'utf8'));
  run.file = file;
  return run;
}

function key(score) {
  return `${score.prompt_id}::${score.provider}`;
}

function indexScores(panel, run) {
  const map = new Map();
  for (const score of scoreRun(panel, run)) map.set(key(score), score);
  return map;
}

function cell(score) {
  if (!score) return 'not run';
  if (!score.ok) return `no answer (${score.error})`;
  const rank = score.rank == null ? 'not named' : `rank ${score.rank} (first named ${score.first_mention_percent}% into the answer)`;
  const cited = score.cited ? 'cited' : 'not cited';
  const search = score.web_search_used ? '' : ', no web search';
  return `${rank}, ${cited}${search}`;
}

function markerNote(score) {
  if (!score || !score.ok) return '';
  const misses = (score.must_include || []).filter((marker) => !marker.hit).map((marker) => marker.label);
  const wrong = (score.must_not_include || []).filter((marker) => marker.hit).map((marker) => marker.label);
  const notes = [];
  if (misses.length > 0) notes.push(`missing: ${misses.join('; ')}`);
  if (wrong.length > 0) notes.push(`wrong: ${wrong.join('; ')}`);
  return notes.join(' | ');
}

function verdict(before, after) {
  if (!before || !after || !before.ok || !after.ok) return 'no comparison';
  if (!before.named && after.named) return 'GAINED - Konva now named';
  if (before.named && !after.named) return 'LOST - Konva no longer named';
  if (before.rank != null && after.rank != null && after.rank < before.rank) return `improved ${before.rank} -> ${after.rank}`;
  if (before.rank != null && after.rank != null && after.rank > before.rank) return `slipped ${before.rank} -> ${after.rank}`;
  if (!before.cited && after.cited) return 'GAINED - konvajs.org now cited';
  if (before.cited && !after.cited) return 'LOST - konvajs.org no longer cited';
  if (before.win !== after.win) return after.win ? 'now a win' : 'no longer a win';
  return 'unchanged';
}

function printSingle(panel, run) {
  const scores = scoreRun(panel, run);
  console.log(`run ${run.run_id}  (${run.source}, panel v${run.panel_version})`);
  if (run.note) console.log(`note: ${run.note}`);
  console.log('');
  for (const category of ['canary', 'target', 'code']) {
    const rows = scores.filter((score) => score.category === category);
    if (rows.length === 0) continue;
    console.log(`${category.toUpperCase()} - ${panel.categories[category]}`);
    for (const score of rows) {
      console.log(`  [${score.win === true ? ' win' : score.ok ? 'loss' : 'fail'}] ${score.prompt_id} (${score.provider}): ${cell(score)}`);
      const note = markerNote(score);
      if (note) console.log(`         ${note}`);
    }
    console.log('');
  }
  const won = scores.filter((score) => score.win === true).length;
  console.log(`${won} of ${scores.length} results count as a win.`);
}

function printDiff(panel, base, later) {
  const before = indexScores(panel, base);
  const after = indexScores(panel, later);
  const keys = [...new Set([...before.keys(), ...after.keys()])];

  console.log(`baseline: ${path.basename(base.file)}  (${base.started_at})`);
  console.log(`current:  ${path.basename(later.file)}  (${later.started_at})`);
  if (base.panel_sha256 !== later.panel_sha256) {
    console.log('');
    console.log('WARNING: the two runs used different prompts.json content.');
    console.log('Prompts that changed text are not comparable. Check panel_sha256 in both files.');
  }
  console.log('');

  for (const category of ['canary', 'target', 'code']) {
    const rows = keys.filter((entry) => ((after.get(entry) || before.get(entry)).category === category));
    if (rows.length === 0) continue;
    console.log(`${category.toUpperCase()} - ${panel.categories[category]}`);
    for (const entry of rows) {
      const [promptId, provider] = entry.split('::');
      console.log(`  ${promptId} (${provider})`);
      console.log(`      was: ${cell(before.get(entry))}`);
      console.log(`      now: ${cell(after.get(entry))}`);
      console.log(`      ${verdict(before.get(entry), after.get(entry))}`);
      const note = markerNote(after.get(entry));
      if (note) console.log(`      ${note}`);
    }
    console.log('');
  }

  const wonBefore = [...before.values()].filter((score) => score.win === true).length;
  const wonAfter = [...after.values()].filter((score) => score.win === true).length;
  console.log(`wins: ${wonBefore} -> ${wonAfter} (out of ${keys.length} results)`);
}

function main() {
  const panel = readPanel();
  const args = process.argv.slice(2);

  if (args.length >= 2) return printDiff(panel, loadRun(args[0]), loadRun(args[1]));
  if (args.length === 1) return printSingle(panel, loadRun(args[0]));

  const runs = listRuns();
  if (runs.length === 0) {
    console.error('No run files in scripts/llm-panel/results/. Run the panel first - see README.md.');
    process.exit(1);
  }
  if (runs.length === 1) {
    console.log('Only one run so far, so there is nothing to compare against yet.');
    console.log('');
    return printSingle(panel, loadRun(runs[0]));
  }
  return printDiff(panel, loadRun(runs[0]), loadRun(runs[runs.length - 1]));
}

main();
