/** Validates content files and publish gates. Fails on errors; prints warnings. Run: npm run check:content */
import { validateContent, allProducts, allDocuments } from '../lib/content';

const issues = validateContent();
const errors = issues.filter((i) => i.level === 'error');
const warnings = issues.filter((i) => i.level === 'warning');

console.log(
  `check-content: ${allProducts.length} product(s) (${allProducts.filter((p) => p.status === 'published').length} published), ${allDocuments.length} document(s) (${allDocuments.filter((d) => d.approved && d.public && d.status === 'published').length} public)`,
);
for (const w of warnings) console.warn(`  WARN  ${w.entity}: ${w.message}`);
for (const e of errors) console.error(`  ERROR ${e.entity}: ${e.message}`);
if (errors.length > 0) {
  console.error(`check-content: ${errors.length} error(s)`);
  process.exit(1);
}
console.log('check-content: ok');
