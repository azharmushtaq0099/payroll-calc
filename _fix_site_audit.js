/**
 * Site Audit Fix Script
 * Fixes: old nav → new mega nav (96 pages), outdated tool counts, missing og:image,
 *        missing twitter meta, index.html meta description, "41+" → "151+"
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OG_IMAGE = 'https://images.unsplash.com/photo-1746221331496-a87689fc8eb9?w=1200&h=630&q=85&auto=format&fit=crop';

// ── New nav block (from index.html, canonical version) ─────────────────────
const NEW_NAV = `<nav class="site-nav" aria-label="Main navigation">
  <div class="container">
    <div class="nav-inner">
      <a href="/" class="nav-logo" aria-label="FreePayrollCalc home">
        <div class="nav-logo-mark" aria-hidden="true"></div>
        FreePayrollCalc
      </a>

      <div class="nav-links">
        <div class="nav-dropdown">
          <button class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false">
            Calculators
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>
          </button>
          <div class="nav-mega-panel" role="menu">
            <div class="nav-mega-col">
              <div class="nav-mega-col-label">Payroll</div>
              <a href="/payroll-tax-calculator">Payroll Tax Calculator</a>
              <a href="/free-payroll-calculator">Free Payroll Calculator</a>
              <a href="/employer-tax-calculator">Employer Tax Calculator</a>
              <a href="/1099-vs-w2-calculator">1099 vs W-2 Calculator</a>
              <a href="/net-to-gross-calculator">Net to Gross</a>
              <a href="/workers-comp-calculator">Workers Comp</a>
              <a href="/tools?cat=payroll" class="nav-mega-view-all">All Payroll &rarr;</a>
            </div>
            <div class="nav-mega-col">
              <div class="nav-mega-col-label">Income &amp; Tax</div>
              <a href="/take-home-pay-calculator">Take-Home Pay</a>
              <a href="/tax-refund-estimator">Tax Refund Estimator</a>
              <a href="/income-tax-calculator">Income Tax Calculator</a>
              <a href="/mortgage-calculator">Mortgage Calculator</a>
              <a href="/refinance-calculator">Refinance Calculator</a>
              <a href="/1099-tax-calculator">1099 Tax Calculator</a>
              <a href="/self-employment-tax-calculator">Self-Employment Tax</a>
              <a href="/bonus-tax-calculator">Bonus Tax</a>
              <a href="/tools?cat=income" class="nav-mega-view-all">All Income &amp; Tax &rarr;</a>
            </div>
            <div class="nav-mega-col">
              <div class="nav-mega-col-label">Time &amp; HR</div>
              <a href="/time-card-calculator">Time Card</a>
              <a href="/overtime-pay-calculator">Overtime Pay</a>
              <a href="/payroll-hours-calculator">Payroll Hours</a>
              <a href="/severance-pay-calculator">Severance Pay</a>
              <a href="/fmla-leave-calculator">FMLA Leave</a>
              <a href="/cobra-insurance-calculator">COBRA Insurance</a>
              <a href="/unemployment-benefits-calculator">Unemployment Benefits</a>
            </div>
            <div class="nav-mega-col">
              <div class="nav-mega-col-label">Business &amp; Finance</div>
              <a href="/profit-margin-calculator">Profit Margin</a>
              <a href="/roi-calculator">ROI Calculator</a>
              <a href="/break-even-calculator">Break-Even</a>
              <a href="/cd-calculator">CD Calculator</a>
              <a href="/retirement-calculator">Retirement</a>
              <a href="/savings-calculator">Savings</a>
              <a href="/tools?cat=business" class="nav-mega-view-all">All Business &rarr;</a>
            </div>
            <div class="nav-mega-footer">
              <div class="nav-mega-footer-links">
                <a href="/about">About</a>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
              </div>
              <a href="/tools" class="nav-mega-footer-cta">
                View all 151+ tools
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </a>
            </div>
          </div>
        </div>

        <a href="/blog">Blog</a>
        <a href="/about">About</a>

        <button class="nav-search-btn" onclick="openCmd()" aria-label="Search calculators">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg>
          Search
          <kbd>Ctrl K</kbd>
        </button>
      </div>

      <a href="/tools" class="nav-cta">All 151+ Tools</a>

      <button id="nav-toggle" class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-mobile">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M3 5h14M3 10h14M3 15h14"/>
        </svg>
      </button>
    </div>
  </div>

  <div id="nav-mobile" class="nav-mobile" aria-label="Mobile navigation">
    <div class="nav-mobile-section" id="mob-payroll">
      <div class="nav-mobile-section-hdr" onclick="toggleMobSection('mob-payroll')">
        Payroll
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>
      </div>
      <div class="nav-mobile-links">
        <a href="/payroll-tax-calculator">Payroll Tax</a>
        <a href="/free-payroll-calculator">Free Payroll</a>
        <a href="/employer-tax-calculator">Employer Tax</a>
        <a href="/1099-vs-w2-calculator">1099 vs W-2</a>
        <a href="/net-to-gross-calculator">Net to Gross</a>
        <a href="/workers-comp-calculator">Workers Comp</a>
      </div>
    </div>
    <div class="nav-mobile-section" id="mob-income">
      <div class="nav-mobile-section-hdr" onclick="toggleMobSection('mob-income')">
        Income &amp; Tax
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>
      </div>
      <div class="nav-mobile-links">
        <a href="/take-home-pay-calculator">Take-Home Pay</a>
        <a href="/bonus-tax-calculator">Bonus Tax</a>
        <a href="/salary-to-hourly-calculator">Salary to Hourly</a>
        <a href="/w4-withholding-calculator">W-4 Calculator</a>
        <a href="/self-employment-tax-calculator">Self-Employment</a>
        <a href="/quarterly-tax-calculator">Quarterly Tax</a>
      </div>
    </div>
    <div class="nav-mobile-section" id="mob-time">
      <div class="nav-mobile-section-hdr" onclick="toggleMobSection('mob-time')">
        Time, HR &amp; Business
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>
      </div>
      <div class="nav-mobile-links">
        <a href="/time-card-calculator">Time Card</a>
        <a href="/overtime-pay-calculator">Overtime Pay</a>
        <a href="/pto-accrual-calculator">PTO Accrual</a>
        <a href="/pay-stub-generator">Pay Stub</a>
        <a href="/profit-margin-calculator">Profit Margin</a>
        <a href="/retirement-calculator">Retirement</a>
      </div>
    </div>
    <div class="nav-mobile-static">
      <a href="/tools">All 151+ Tools</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </div>
    <a href="/tools" class="nav-mobile-cta">Browse All Calculators &rarr;</a>
  </div>
</nav>`;

// ── Helpers ────────────────────────────────────────────────────────────────

function fixToolCounts(html) {
  return html
    .replace(/Search 150\+ tools/g, 'Search 151+ tools')
    .replace(/Search 40\+ tools/g, 'Search 151+ tools')
    .replace(/Search 41\+ tools/g, 'Search 151+ tools')
    .replace(/View all 41\+ tools/g, 'View all 151+ tools')
    .replace(/All 41\+ Tools/g, 'All 151+ Tools')
    .replace(/40\+ tools\. Instant/g, '151+ tools. Instant')
    .replace(/and 40\+ tools/g, 'and 151+ tools');
}

function addOgImage(html) {
  if (html.includes('og:image')) return html;
  const ogUrl = html.match(/<meta property="og:url"[^>]+>/);
  if (!ogUrl) return html;
  const insert = `<meta property="og:image" content="${OG_IMAGE}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="${OG_IMAGE}">\n`;
  return html.replace(ogUrl[0], ogUrl[0] + '\n' + insert);
}

function addTwitterMeta(html) {
  if (html.includes('twitter:card')) return html;
  const ogImage = html.match(/<meta property="og:image"[^>]+>/);
  if (!ogImage) return html;
  const insert = `<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="${OG_IMAGE}">\n`;
  return html.replace(ogImage[0], ogImage[0] + '\n' + insert);
}

function replaceOldNav(html) {
  // Old nav: <header class="site-header">...</header>
  const oldNavStart = html.indexOf('<header class="site-header">');
  if (oldNavStart === -1) return { html, changed: false };
  const oldNavEnd = html.indexOf('</header>', oldNavStart) + '</header>'.length;
  const newHtml = html.substring(0, oldNavStart) + NEW_NAV + html.substring(oldNavEnd);
  return { html: newHtml, changed: true };
}

function fixNewNavCounts(html) {
  // Fix "41+" counts in pages that already have new nav
  if (!html.includes('site-nav')) return html;
  return html
    .replace(/View all 41\+ tools/g, 'View all 151+ tools')
    .replace(/All 41\+ Tools/g, 'All 151+ Tools')
    .replace(/All 151\+ Tools/g, 'All 151+ Tools'); // no-op to normalize
}

// ── Process all HTML files ─────────────────────────────────────────────────

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !f.startsWith('google'));

let navFixed = 0, countFixed = 0, ogFixed = 0, twitterFixed = 0;
const skipped = ['index.html', 'tools.html']; // already correct

for (const file of files) {
  if (skipped.includes(file)) {
    // Still fix tool counts and meta in these
    let html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const orig = html;
    html = fixToolCounts(html);
    html = addTwitterMeta(html);
    if (html !== orig) fs.writeFileSync(path.join(ROOT, file), html);
    continue;
  }

  let html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const orig = html;

  // 1. Replace old nav
  const { html: navHtml, changed } = replaceOldNav(html);
  if (changed) { html = navHtml; navFixed++; }

  // 2. Fix tool counts in nav + cmd palette
  const beforeCount = html;
  html = fixToolCounts(html);
  html = fixNewNavCounts(html);
  if (html !== beforeCount) countFixed++;

  // 3. Add og:image where missing
  const beforeOg = html;
  html = addOgImage(html);
  if (html !== beforeOg) ogFixed++;

  // 4. Add twitter meta where missing
  const beforeTw = html;
  html = addTwitterMeta(html);
  if (html !== beforeTw) twitterFixed++;

  if (html !== orig) {
    fs.writeFileSync(path.join(ROOT, file), html);
  }
}

console.log(`✅ Nav upgraded:      ${navFixed} pages`);
console.log(`✅ Counts fixed:      ${countFixed} pages`);
console.log(`✅ og:image added:    ${ogFixed} pages`);
console.log(`✅ Twitter meta added:${twitterFixed} pages`);
console.log(`\nTotal files processed: ${files.length}`);
