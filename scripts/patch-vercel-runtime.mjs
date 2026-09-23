import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ADAPTER_PATH = resolve(
  process.cwd(),
  'node_modules',
  '@astrojs',
  'vercel',
  'dist',
  'serverless',
  'adapter.js'
);

let src;
try {
  src = readFileSync(ADAPTER_PATH, 'utf8');
} catch {
  process.exit(0);
}

let modified = false;
const patched = src.replace(/return 'nodejs(\d+)\.x';/g, (_, v) => {
  modified = true;
  return `return 'nodejs${v}';`;
}).replace(/return `nodejs\$\{major\}\.x`;/g, () => {
  modified = true;
  return 'return `nodejs${major}`;';
});

if (modified) {
  writeFileSync(ADAPTER_PATH, patched, 'utf8');
  console.log('[postinstall] Patched @astrojs/vercel runtime format (removed trailing .x)');
}
