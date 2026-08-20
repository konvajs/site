#!/usr/bin/env node
'use strict';

/**
 * Runs the frozen prompt panel and writes one timestamped result file.
 *
 * The site's content plan assumes the payoff shows up as LLM citations, not as
 * search traffic. Nothing measured that, and an earlier plan set a "re-run the
 * prompt in 60-90 days" trigger that could never fire, because the first
 * answers were never written down. This script writes them down.
 *
 * What a stored record must always contain: prompt id, provider, the model
 * version the provider reported, an ISO timestamp, the verbatim answer text,
 * and every cited URL. A summary is not reproducible, so nothing here
 * summarises.
 *
 * Three ways to run it - see README.md:
 *   live    node scripts/llm-panel/run.js            (needs DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD)
 *   emit    node scripts/llm-panel/run.js --emit     (prints the exact calls to make by hand)
 *   ingest  node scripts/llm-panel/run.js --ingest <dir>  (folds hand-collected responses into a run file)
 *
 * No dependencies. This repo has none outside Docusaurus and that stays true.
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const crypto = require('node:crypto');

const HERE = __dirname;
const PANEL_PATH = path.join(HERE, 'prompts.json');
const RESULTS_DIR = path.join(HERE, 'results');
const API_HOST = 'api.dataforseo.com';

function readPanel() {
  const raw = fs.readFileSync(PANEL_PATH, 'utf8');
  return { panel: JSON.parse(raw), sha256: crypto.createHash('sha256').update(raw).digest('hex') };
}

function parseArgs(argv) {
  const args = { mode: 'live', ingestDir: null, only: null, note: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--emit') args.mode = 'emit';
    else if (arg === '--ingest') { args.mode = 'ingest'; args.ingestDir = argv[i + 1]; i += 1; }
    else if (arg === '--only') { args.only = argv[i + 1]; i += 1; }
    else if (arg === '--note') { args.note = argv[i + 1]; i += 1; }
    else if (arg === '--help' || arg === '-h') args.mode = 'help';
  }
  return args;
}

function jobs(panel, only) {
  const list = [];
  for (const prompt of panel.prompts) {
    if (only && prompt.id !== only) continue;
    for (const provider of panel.providers) list.push({ prompt, provider });
  }
  return list;
}

function requestPath(providerSpec) {
  return `/v3/ai_optimization/${providerSpec.provider}/llm_responses/live`;
}

function requestBody(prompt, providerSpec) {
  return [{
    user_prompt: prompt.prompt,
    model_name: providerSpec.model,
    web_search: providerSpec.web_search === true,
  }];
}

/**
 * Turn one DataForSEO task response into the stored record.
 * Works the same whether the JSON came off the wire or off the clipboard.
 */
function normalise(prompt, providerSpec, taskJson) {
  const task = (taskJson.tasks || [])[0];
  const result = task && (task.result || [])[0];

  if (!result) {
    const message = (task && task.status_message) || taskJson.status_message || 'no result in response';
    return failure(prompt, providerSpec, `provider returned no result: ${message}`);
  }

  const answerParts = [];
  const reasoningParts = [];
  const citations = [];

  for (const item of result.items || []) {
    for (const section of item.sections || []) {
      const text = section.text || '';
      if (item.type === 'reasoning') {
        if (text) reasoningParts.push(text);
        continue;
      }
      if (text) answerParts.push(text);
      for (const annotation of section.annotations || []) {
        if (annotation && annotation.url) citations.push({ url: annotation.url, title: annotation.title || null });
      }
    }
  }

  const answer = answerParts.join('\n\n');

  return {
    prompt_id: prompt.id,
    prompt: prompt.prompt,
    provider: providerSpec.provider,
    model_requested: providerSpec.model,
    model_version: result.model_name || null,
    queried_at: result.datetime || null,
    web_search_requested: providerSpec.web_search === true,
    web_search_used: result.web_search === true,
    answer: answer.length > 0 ? answer : null,
    reasoning: reasoningParts.length > 0 ? reasoningParts.join('\n\n') : null,
    citations,
    error: answer.length > 0 ? null : 'provider returned an empty answer',
    meta: {
      task_id: (task && task.id) || null,
      input_tokens: result.input_tokens ?? null,
      output_tokens: result.output_tokens ?? null,
      money_spent: result.money_spent ?? null,
      // What the provider searched for. Not scored, but it shows whether Konva
      // was looked at and then left out of the answer.
      fan_out_queries: result.fan_out_queries || null,
    },
  };
}

/** A recorded null. Never invent an answer for a provider that did not reply. */
function failure(prompt, providerSpec, message) {
  return {
    prompt_id: prompt.id,
    prompt: prompt.prompt,
    provider: providerSpec.provider,
    model_requested: providerSpec.model,
    model_version: null,
    queried_at: new Date().toISOString(),
    web_search_requested: providerSpec.web_search === true,
    web_search_used: false,
    answer: null,
    reasoning: null,
    citations: [],
    error: message,
    meta: {},
  };
}

function post(auth, urlPath, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const request = https.request({
      host: API_HOST,
      path: urlPath,
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 180000,
    }, (response) => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error(`could not parse the response (HTTP ${response.statusCode}): ${error.message}`));
        }
      });
    });
    request.on('timeout', () => request.destroy(new Error('request timed out after 180s')));
    request.on('error', reject);
    request.write(payload);
    request.end();
  });
}

function runId() {
  return new Date().toISOString().replace(/[:.]/g, '-').replace(/-\d{3}Z$/, 'Z');
}

function writeRun(record) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const file = path.join(RESULTS_DIR, `${record.run_id}.json`);
  fs.writeFileSync(file, `${JSON.stringify(record, null, 2)}\n`);
  return file;
}

function summarise(panel, record) {
  const { scoreRun } = require('./score.js');
  const scores = scoreRun(panel, record);
  const won = scores.filter((score) => score.win === true).length;
  const failed = scores.filter((score) => score.ok === false).length;
  console.log('');
  console.log(`run ${record.run_id}: ${scores.length} results, ${won} wins, ${failed} with no answer`);
  for (const score of scores) {
    if (!score.ok) {
      console.log(`  [fail] ${score.prompt_id} (${score.provider}): ${score.error}`);
      continue;
    }
    const rank = score.rank == null ? 'not named' : `rank ${score.rank} at ${score.first_mention_percent}% in`;
    console.log(`  [${score.win ? ' win' : 'loss'}] ${score.prompt_id} (${score.provider}): ${rank}${score.cited ? ', konvajs.org cited' : ''}`);
  }
}

function emit(panel) {
  console.log('# LLM panel - calls to run by hand');
  console.log('#');
  console.log('# Use this when the script cannot call the API itself, because there are');
  console.log('# no DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD in the environment. Run each');
  console.log('# call below, save each response as the named file, then fold them all');
  console.log('# into a run file with:');
  console.log('#');
  console.log('#   node scripts/llm-panel/run.js --ingest <dir>');
  console.log('#');
  console.log('# The file name carries the prompt id and the provider, so keep it exactly.');
  console.log('# Save the WHOLE response, not the answer text on its own.');
  console.log('');
  for (const job of jobs(panel, null)) {
    const file = `${job.prompt.id}__${job.provider.provider}.json`;
    console.log(`# -> ${file}`);
    console.log(`curl -s -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" \\`);
    console.log(`  -H 'Content-Type: application/json' \\`);
    console.log(`  -X POST 'https://${API_HOST}${requestPath(job.provider)}' \\`);
    console.log(`  -d '${JSON.stringify(requestBody(job.prompt, job.provider)).replace(/'/g, "'\\''")}' \\`);
    console.log(`  > ${file}`);
    console.log('');
  }
  console.log('# Any other LLM API works too, as long as the saved JSON keeps the');
  console.log('# verbatim answer and the citation URLs. See README.md for the record');
  console.log('# shape --ingest expects.');
}

function ingest(panel, sha256, directory, note) {
  if (!directory || !fs.existsSync(directory)) {
    console.error(`--ingest needs a directory of saved responses. Not found: ${directory}`);
    process.exit(1);
  }

  const results = [];
  const missing = [];

  for (const job of jobs(panel, null)) {
    const file = path.join(directory, `${job.prompt.id}__${job.provider.provider}.json`);
    if (!fs.existsSync(file)) {
      missing.push(path.basename(file));
      results.push(failure(job.prompt, job.provider, 'no saved response for this prompt and provider'));
      continue;
    }
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    results.push(normalise(job.prompt, job.provider, parsed));
  }

  if (missing.length > 0) {
    console.warn(`warning: ${missing.length} response file(s) missing, recorded as null results:`);
    for (const name of missing) console.warn(`  ${name}`);
  }

  const record = {
    run_id: runId(),
    started_at: new Date().toISOString(),
    finished_at: new Date().toISOString(),
    source: 'ingest',
    note: note || null,
    panel_version: panel.panel_version,
    panel_sha256: sha256,
    results,
  };
  const file = writeRun(record);
  console.log(`wrote ${file}`);
  summarise(panel, record);
}

async function live(panel, sha256, only, note) {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    console.error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD are not set, so no provider can be reached.');
    console.error('Run `node scripts/llm-panel/run.js --emit` to get the calls to make by hand.');
    process.exit(1);
  }

  const auth = Buffer.from(`${login}:${password}`).toString('base64');
  const started = new Date().toISOString();
  const list = jobs(panel, only);
  if (list.length === 0) {
    console.error(`--only ${only} matches no prompt id in prompts.json. Nothing to run.`);
    process.exit(1);
  }
  const results = [];

  for (const job of list) {
    const label = `${job.prompt.id} (${job.provider.provider}/${job.provider.model})`;
    process.stdout.write(`asking ${label} ... `);
    try {
      const response = await post(auth, requestPath(job.provider), requestBody(job.prompt, job.provider));
      const record = normalise(job.prompt, job.provider, response);
      results.push(record);
      console.log(record.error ? `no answer: ${record.error}` : 'ok');
    } catch (error) {
      results.push(failure(job.prompt, job.provider, `request failed: ${error.message}`));
      console.log(`unreachable: ${error.message}`);
    }
  }

  const record = {
    run_id: runId(),
    started_at: started,
    finished_at: new Date().toISOString(),
    source: 'dataforseo-live',
    note: note || null,
    panel_version: panel.panel_version,
    panel_sha256: sha256,
    results,
  };
  const file = writeRun(record);
  console.log(`wrote ${file}`);
  summarise(panel, record);
}

function help() {
  console.log(`
LLM prompt panel runner.

  node scripts/llm-panel/run.js                 run every prompt against every provider
  node scripts/llm-panel/run.js --only <id>     run one prompt only
  node scripts/llm-panel/run.js --note "day 0"  label the run
  node scripts/llm-panel/run.js --emit          print the calls to run by hand
  node scripts/llm-panel/run.js --ingest <dir>  fold hand-collected responses into a run file

The live path needs DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in the environment.
Results land in scripts/llm-panel/results/. See README.md.
`.trim());
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { panel, sha256 } = readPanel();

  if (args.mode === 'help') return help();
  if (args.mode === 'emit') return emit(panel);
  if (args.mode === 'ingest') return ingest(panel, sha256, args.ingestDir, args.note);
  return live(panel, sha256, args.only, args.note);
}

main();
