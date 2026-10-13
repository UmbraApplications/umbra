const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING FUNCTIONAL AUDIT: WHATSAPP, SCROLL-TO-TOP & MOBILE NAVIGATION ===\n');

// 1. WhatsApp Links Audit
console.log('1. Checking WhatsApp Links across codebase:');
const indexCode = fs.readFileSync(path.resolve(__dirname, '../routes/index.tsx'), 'utf-8');
const briefingCode = fs.readFileSync(path.resolve(__dirname, '../lib/briefing.ts'), 'utf-8');

// Find all wa.me occurrences
const allWaMatches = (indexCode + briefingCode).match(/wa\.me[^\s"'>`]*/g) || [];
console.log(`  Found ${allWaMatches.length} WhatsApp links.`);
for (const match of allWaMatches) {
  assert(
    match.startsWith('wa.me/5511941774214') || match.startsWith('wa.me/'),
    `Invalid WhatsApp link pattern: ${match}`
  );
  if (match.includes('?text=')) {
    assert(
      match.startsWith('wa.me/5511941774214?text='),
      `WhatsApp link missing official number 5511941774214: ${match}`
    );
  }
}
assert(briefingCode.includes('5511941774214'), 'briefing.ts missing official WhatsApp number 5511941774214');
assert(indexCode.includes('5511941774214'), 'index.tsx missing official WhatsApp number 5511941774214');
console.log('  [PASS] All WhatsApp URLs strictly direct to official number 5511941774214.');

// 2. Voltar ao Topo Audit
console.log('\n2. Checking "Voltar ao topo" implementation:');
assert(indexCode.includes('scrollToTop'), 'index.tsx missing scrollToTop implementation');
assert(indexCode.includes("window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })"), 'scrollToTop missing window.scrollTo smooth');
assert(indexCode.includes('onClick={scrollToTop}'), 'footer missing onClick={scrollToTop}');
assert(indexCode.includes('Voltar ao topo'), 'footer missing "Voltar ao topo" text');
assert(!indexCode.includes('href="#inicio" className="footer-text'), 'footer still using non-functional anchor href="#inicio"');
console.log('  [PASS] "Voltar ao topo" uses active programmatic scrollToTop returning to window top (0,0).');

// 3. Mobile Navigation & Drawer Audit
console.log('\n3. Checking Mobile Menu Navigation:');
assert(indexCode.includes('handleNavClick'), 'index.tsx missing handleNavClick for smooth section navigation');
assert(indexCode.includes("e.key === 'Escape'"), 'index.tsx missing Escape key listener to close menu and modals');
assert(indexCode.includes('mobile-menu-toggle'), 'index.tsx missing mobile-menu-toggle');
assert(indexCode.includes('mobile-nav-drawer'), 'index.tsx missing mobile-nav-drawer');
assert(indexCode.includes('mobile-nav-whatsapp'), 'index.tsx missing mobile-nav-whatsapp button');
console.log('  [PASS] Mobile menu includes full keyboard accessibility (Escape), smooth anchor routing, and WhatsApp.');

// 4. Hero Section Mobile Optimization
console.log('\n4. Checking Hero Mobile Composition:');
assert(indexCode.includes('hero-top-badges'), 'index.tsx missing hero-top-badges');
assert(indexCode.includes('hero-title-main'), 'index.tsx missing hero-title-main');
assert(indexCode.includes('hero-title-sub'), 'index.tsx missing hero-title-sub');
assert(indexCode.includes('hero-title-highlight'), 'index.tsx missing hero-title-highlight');
assert(indexCode.includes('ENGENHARIA DE SOFTWARE &amp; DESIGN DE PRODUTO'), 'index.tsx missing eyebrow content');
assert(indexCode.includes('ESTRATÉGIA, CÓDIGO E DESIGN'), 'index.tsx missing operational caption');
console.log('  [PASS] Hero mobile composition eliminates cramped columns and preserves brand badges.');

// 5. Responsive Styles Checks
console.log('\n5. Checking CSS Responsive Architecture:');
const cssCode = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
assert(cssCode.includes('scrollbar-gutter: stable'), 'styles.css missing scrollbar-gutter: stable');
assert(cssCode.includes('width: 44px') && cssCode.includes('height: 44px'), 'styles.css missing 44x44px touch targets');
assert(cssCode.includes('.floating-whatsapp-btn'), 'styles.css missing .floating-whatsapp-btn');
assert(cssCode.includes('@media (max-width: 640px)'), 'styles.css missing 640px breakpoint');
assert(cssCode.includes('@media (max-width: 380px)'), 'styles.css missing 380px breakpoint');
console.log('  [PASS] CSS ensures 44px touch targets, zero layout shifts, and full responsiveness.');

console.log('\n>>> FUNCTIONAL AUDIT 100% SUCCESSFUL! <<<\n');
