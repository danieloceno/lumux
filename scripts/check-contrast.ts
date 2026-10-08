// Checks every legal pairing in vocabulary.ts against every theme. Exits 1 on
// any failure. There is no exception list: a failing pair is fixed in the
// theme, never here.

import { PAIRS } from '../src/tokens/vocabulary.ts';
import { THEMES } from '../src/tokens/sets/index.ts';

function rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

function luminance(hex: string): number {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failures = 0;
let total = 0;

for (const [theme, { scheme, colors }] of Object.entries(THEMES)) {
  console.log(`\n${theme} (${scheme})`);
  for (const p of PAIRS) {
    const r = ratio(colors[p.fg], colors[p.bg]);
    const ok = r >= p.min;
    total++;
    if (!ok) failures++;
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)} ≥ ${p.min}  ${p.fg} on ${p.bg}  (${p.use})`,
    );
  }
}

console.log(`\n${total - failures}/${total} pairs pass.`);
if (failures) {
  console.error(`${failures} pair(s) below threshold.`);
  process.exit(1);
}
