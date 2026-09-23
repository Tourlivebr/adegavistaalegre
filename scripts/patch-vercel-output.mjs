import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';

const ROOT = process.cwd();
const OUTPUT_DIR = resolve(ROOT, '.vercel', 'output', 'functions');

const LEGACY_RUNTIME_RE = /^nodejs\d+(?:\.\w*)?$/;
const MODERN_RUNTIME = '@vercel/node@5';

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let s;
    try { s = statSync(full); } catch { continue; }
    if (s.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

let patched = 0;
const files = walk(OUTPUT_DIR).filter((f) => f.endsWith('.vc-config.json'));
for (const file of files) {
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    continue;
  }
  if (typeof data.runtime === 'string' && LEGACY_RUNTIME_RE.test(data.runtime)) {
    data.runtime = MODERN_RUNTIME;
    writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    patched++;
    console.log(`[postbuild] vc-config fixed: ${file} -> ${MODERN_RUNTIME}`);
  }
}

if (patched === 0 && files.length > 0) {
  console.log('[postbuild] No legacy runtime strings found in output (OK)');
}
