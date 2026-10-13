const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== AUDITING UMBRA APPLICATIONS: IMAGES & MOBILE CONFIG ===\n');

// 1. Audit Images
const publicImagesDir = path.resolve(__dirname, '../../public/images');
const requiredImages = [
  'umbra-symbol.png',
  'umbra-logo.png',
  'umbra-hero-2.jpg',
  'fundador-umbra.webp',
  'produto-ml.jpg',
  'produto-lileot.jpg'
];

console.log('1. Checking public/images/ files:');
for (const file of requiredImages) {
  const fullPath = path.join(publicImagesDir, file);
  assert(fs.existsSync(fullPath), `Missing file: ${file}`);
  const stats = fs.statSync(fullPath);
  assert(stats.size > 1000, `File ${file} has size <= 1000 bytes`);
  console.log(`  [OK] ${file} (${stats.size} bytes)`);
}

// Check case sensitivity
const actualFiles = fs.readdirSync(publicImagesDir);
for (const file of actualFiles) {
  assert.strictEqual(file, file.toLowerCase(), `File ${file} is not lowercase!`);
}
console.log('  [OK] All filenames in public/images are strictly lowercase.');

// 2. Audit asset.json files
console.log('\n2. Checking src/assets/*.asset.json files:');
const assetsDir = path.resolve(__dirname, '../../src/assets');
const assetJsonFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.asset.json'));
for (const f of assetJsonFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(assetsDir, f), 'utf-8'));
  assert(content.url.startsWith('/images/'), `Asset ${f} URL does not start with /images/`);
  assert(!content.url.includes('localhost'), `Asset ${f} URL contains localhost`);
  assert(!content.url.includes('__l5e'), `Asset ${f} URL contains __l5e`);
  assert(fs.existsSync(path.join(publicImagesDir, path.basename(content.url))), `Target image for ${f} not found`);
  console.log(`  [OK] ${f} -> ${content.url}`);
}

// 3. Audit styles.css for mobile-first rules
console.log('\n3. Checking styles.css mobile-first responsive rules:');
const css = fs.readFileSync(path.resolve(__dirname, '../../src/styles.css'), 'utf-8');
assert(css.includes('overflow-x: hidden'), 'styles.css missing overflow-x: hidden guard');
assert(css.includes('scrollbar-gutter: stable'), 'styles.css missing scrollbar-gutter: stable guard');
assert(css.includes('@media (max-width: 640px)'), 'styles.css missing 640px breakpoint');
assert(css.includes('@media (max-width: 380px)'), 'styles.css missing 380px breakpoint');
assert(css.includes('font-size: 16px !important'), 'styles.css missing iOS Safari 16px input zoom guard');
assert(css.includes('capabilities-grid'), 'styles.css missing capabilities-grid');
assert(css.includes('process-display-card'), 'styles.css missing process-display-card');
assert(css.includes('touch-action: manipulation'), 'styles.css missing touch-action manipulation');
assert(css.includes('floating-whatsapp-btn'), 'styles.css missing floating-whatsapp-btn');
assert(css.includes('mobile-nav-whatsapp'), 'styles.css missing mobile-nav-whatsapp');
console.log('  [OK] All mobile CSS guards, floating WhatsApp and breakpoints confirmed.');

// 4. Audit index.tsx & Navigation
console.log('\n4. Checking src/routes/index.tsx, Navigation & Voltar ao Topo:');
const indexTsx = fs.readFileSync(path.resolve(__dirname, '../../src/routes/index.tsx'), 'utf-8');
assert(indexTsx.includes('header-container'), 'index.tsx missing header-container');
assert(indexTsx.includes('header-nav'), 'index.tsx missing header-nav');
assert(indexTsx.includes('mobile-menu-toggle'), 'index.tsx missing mobile-menu-toggle');
assert(indexTsx.includes('mobile-nav-drawer'), 'index.tsx missing mobile-nav-drawer');
assert(indexTsx.includes('/images/umbra-hero-2.jpg'), 'index.tsx hero image path');
assert(indexTsx.includes('capabilities-grid'), 'index.tsx capabilities-grid class');
assert(indexTsx.includes('scrollToTop'), 'index.tsx missing scrollToTop function');
assert(indexTsx.includes('handleNavClick'), 'index.tsx missing handleNavClick function');
assert(indexTsx.includes('Voltar ao topo'), 'index.tsx missing Voltar ao topo button');
assert(indexTsx.includes('5511941774214'), 'index.tsx missing official WhatsApp number 5511941774214');
assert(indexTsx.includes('floating-whatsapp-btn'), 'index.tsx missing floating-whatsapp-btn');
assert(!indexTsx.includes('http://localhost'), 'index.tsx contains localhost');
console.log('  [OK] index.tsx header, hero, scrollToTop, WhatsApp 5511941774214 and drawer verified.');

// 5. Audit server email & official WhatsApp recipient
console.log('\n5. Checking briefing & WhatsApp configuration:');
const briefingTs = fs.readFileSync(path.resolve(__dirname, '../../src/lib/briefing.ts'), 'utf-8');
assert(briefingTs.includes('ofc.umbra@gmail.com'), 'briefing.ts official email');
assert(!briefingTs.includes('joaomanueloliveira@gmail.com'), 'briefing.ts still contains old email');
assert(briefingTs.includes('5511941774214'), 'briefing.ts official WhatsApp number 5511941774214');
assert(briefingTs.includes('generateWhatsAppUrl'), 'briefing.ts missing generateWhatsAppUrl');
assert(briefingTs.includes('generateWhatsAppGeneralUrl'), 'briefing.ts missing generateWhatsAppGeneralUrl');
console.log('  [OK] Official email ofc.umbra@gmail.com and WhatsApp 5511941774214 confirmed.');

console.log('\n>>> ALL AUDIT CHECKS PASSED SUCCESSFULLY! <<<\n');
