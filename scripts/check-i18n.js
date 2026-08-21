#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const LOCALE_ROOT = path.join(ROOT, 'i18n', 'zh-Hans');

if (!fs.existsSync(LOCALE_ROOT)) {
  console.log('Chinese translation is not installed; nothing to check.');
  process.exit(0);
}

function npmRun(script) {
  execFileSync('npm', ['run', script], { cwd: ROOT, stdio: 'inherit' });
}

try {
  npmRun('check:i18n-drift');
  npmRun('check:code-drift');
  execFileSync('node', ['scripts/check-fences.js', '--translations'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  execFileSync('node', ['scripts/check-demo-gallery.js', '--translations'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  npmRun('build');
  execFileSync('node', ['scripts/check-performance.js', '--translations'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  execFileSync('node', ['checksitemap.js', 'build/zh-Hans/sitemap.xml'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  execFileSync('node', ['scripts/check-llms.js', '--translations'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
} catch (error) {
  process.exitCode = error.status || 1;
}
