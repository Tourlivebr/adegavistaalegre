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

const RUNTIME = '@vercel/node@5';
const OLD_PATTERNS = [
  /return 'nodejs\d+(?:\.\w*)?';/g,
  /return `nodejs\$\{major\}(?:\.\w*)?`;/g,
];

let modified = false;
let out = src;
for (const re of OLD_PATTERNS) {
  out = out.replace(re, () => {
    modified = true;
    return `return '${RUNTIME}';`;
  });
}

if (modified) {
  writeFileSync(ADAPTER_PATH, out, 'utf8');
  console.log(`[postinstall] Patched @astrojs/vercel runtime -> ${RUNTIME}`);
}
