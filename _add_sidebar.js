/* _add_sidebar.js — wrap blog articles in 2-col layout + inject sidebar */
const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

const SIDEBAR = `
    <aside class="blog-sidebar">
      <div class="sidebar-widget">
        <div class="sidebar-widget-title">Table of Contents</div>
        <div id="sidebar-toc"></div>
      </div>
      <div class="sidebar-cta">
        <div class="sidebar-cta-title">Free Payroll Tools</div>
        <div class="sidebar-cta-desc">Calculate payroll taxes, overtime, take-home pay and more — free, no sign-up needed.</div>
        <a href="/tools" class="sidebar-cta-btn">Browse All 41+ Tools →</a>
      </div>
      <div class="sidebar-widget">
        <div class="sidebar-widget-title">Popular Calculators</div>
        <ul class="sidebar-links">
          <li><a href="/payroll-tax-calculator">Payroll Tax Calculator</a></li>
          <li><a href="/take-home-pay-calculator">Take-Home Pay Calculator</a></li>
          <li><a href="/overtime-pay-calculator">Overtime Pay Calculator</a></li>
          <li><a href="/bonus-tax-calculator">Bonus Tax Calculator</a></li>
          <li><a href="/1099-vs-w2-calculator">1099 vs W-2 Calculator</a></li>
          <li><a href="/w4-withholding-calculator">W-4 Withholding Calculator</a></li>
          <li><a href="/quarterly-tax-calculator">Quarterly Tax Calculator</a></li>
          <li><a href="/pto-accrual-calculator">PTO Accrual Calculator</a></li>
          <li><a href="/workers-comp-calculator">Workers Comp Calculator</a></li>
          <li><a href="/self-employment-tax-calculator">Self-Employment Tax</a></li>
        </ul>
      </div>
      <div class="sidebar-widget">
        <div class="sidebar-widget-title">Recent Articles</div>
        <ul class="sidebar-links">
          <li><a href="/blog/how-to-calculate-payroll-taxes">How to Calculate Payroll Taxes in 2026</a></li>
          <li><a href="/blog/1099-vs-w2-tax-differences">1099 vs W-2: Tax Differences</a></li>
          <li><a href="/blog/overtime-rules-flsa-2026">FLSA Overtime Rules 2026</a></li>
          <li><a href="/blog/gross-vs-net-pay-explained">Gross Pay vs Net Pay Explained</a></li>
          <li><a href="/blog/quarterly-estimated-taxes-guide">Quarterly Estimated Taxes Guide</a></li>
          <li><a href="/blog/w4-withholding-guide-2026">W-4 Withholding Guide 2026</a></li>
          <li><a href="/blog/bonus-tax-withholding-methods">Bonus Tax Withholding Methods</a></li>
          <li><a href="/blog/minimum-wage-by-state-2026">Minimum Wage by State 2026</a></li>
          <li><a href="/blog/true-cost-of-an-employee">True Cost of an Employee</a></li>
          <li><a href="/blog/workers-comp-insurance-basics">Workers Comp Insurance Basics</a></li>
          <li><a href="/blog/pay-frequency-comparison">Pay Frequency Comparison</a></li>
          <li><a href="/blog/pto-accrual-methods">PTO Accrual Methods</a></li>
        </ul>
      </div>
    </aside>`;

let updated = 0, skipped = 0;

files.forEach(file => {
  const fp = path.join(blogDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  if (html.includes('blog-article-layout')) {
    console.log('SKIP (already done):', file);
    skipped++;
    return;
  }

  // 1. After <div class="container"> inside <main>, open the 2-col wrapper
  // Pattern: <main class="blog-article-page">\n  <div class="container">\n    <article
  html = html.replace(
    /<main class="blog-article-page">\n([ \t]*)<div class="container">\n([ \t]*)<article/,
    '<main class="blog-article-page">\n$1<div class="container">\n    <div class="blog-article-layout">\n    <div class="blog-article-main">\n$2<article'
  );

  // 2. Close blog-article-main, inject sidebar, close blog-article-layout
  // Pattern at end of main: "    </section>\n  </div>\n</main>"
  html = html.replace(
    /(\n    <\/section>)\n([ \t]*)<\/div>\n<\/main>/,
    '$1\n    </div>' + SIDEBAR + '\n    </div>\n$2</div>\n</main>'
  );

  fs.writeFileSync(fp, html);
  updated++;
  console.log('Updated:', file);
});

console.log('\nDone. Updated:', updated, '| Skipped:', skipped);
