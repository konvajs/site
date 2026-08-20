const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
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

function checkSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) {
    console.error(`Sitemap does not exist: ${sitemapPath}`);
    return false;
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
    return false;
  }

  console.log(`Sitemap contains ${urls.length} valid local URLs.`);
  return true;
}

function main() {
  const requested = process.argv[2];
  const sitemapPaths = requested
    ? [path.resolve(root, requested)]
    : [
        path.join(buildDirectory, 'sitemap.xml'),
        ...(fs.existsSync(path.join(root, 'i18n', 'zh-Hans'))
          ? [path.join(buildDirectory, 'zh-Hans', 'sitemap.xml')]
          : []),
      ];

  if (!sitemapPaths.every(checkSitemap)) {
    process.exitCode = 1;
  }
}

main();
