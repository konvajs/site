const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const sitemapPath = path.resolve(root, process.argv[2] || 'build/sitemap.xml');
const buildDirectory = path.resolve(root, 'build');
const forbiddenPaths = new Set([
  '/blog/authors',
  '/blog/authors/lavrton',
  '/kai',
  '/markdown-page',
  '/search',
]);

function outputCandidates(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, '');

  if (!cleanPath) {
    return [path.join(buildDirectory, 'index.html')];
  }

  const outputPath = path.join(buildDirectory, cleanPath);
  return pathname.endsWith('/')
    ? [path.join(outputPath, 'index.html')]
    : [outputPath, path.join(outputPath, 'index.html')];
}

function main() {
  if (!fs.existsSync(sitemapPath)) {
    console.error(`Sitemap does not exist: ${sitemapPath}`);
    process.exitCode = 1;
    return;
  }

  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1])
  );
  const failures = [];

  for (const url of urls) {
    const normalizedPath =
      url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : url.pathname;
    const pathWithoutLocale = normalizedPath.replace(/^\/zh-Hans(?=\/|$)/, '') || '/';
    if (forbiddenPaths.has(pathWithoutLocale)) {
      failures.push(`Forbidden sitemap URL: ${url.href}`);
      continue;
    }

    if (!outputCandidates(url.pathname).some((file) => fs.existsSync(file))) {
      failures.push(`No build output for: ${url.href}`);
    }
  }

  if (failures.length) {
    failures.forEach((failure) => console.error(failure));
    process.exitCode = 1;
    return;
  }

  console.log(`Sitemap contains ${urls.length} valid local URLs.`);
}

main();
