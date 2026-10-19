/**
 * Lists unset site configuration fields. With --strict (used by `build:prod`), exits non-zero if any
 * field whose requirement level is 'block' is still null. Run: npm run check:config [-- --strict]
 */
import { site, requirements } from '../content/site.config';

function get(path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined),
      site,
    );
}

const strict = process.argv.includes('--strict');
const unset = Object.entries(requirements).filter(([path]) => get(path) === null || get(path) === undefined);

if (unset.length === 0) {
  console.log('check-config: all tracked fields are set.');
} else {
  console.log('check-config: unset fields');
  for (const [path, { level, question }] of unset)
    console.log(`  ${level.toUpperCase().padEnd(5)} ${path.padEnd(28)} (open question ${question})`);
}
const blocking = unset.filter(([, r]) => r.level === 'block');
if (strict && blocking.length > 0) {
  console.error(
    `\ncheck-config: ${blocking.length} BLOCK field(s) unset — production build refused. Fill them in content/site.config.ts.`,
  );
  process.exit(1);
}
