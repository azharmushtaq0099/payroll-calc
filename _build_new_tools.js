/**
 * Build script: 7 new high-CPC calculators
 * Run: node _build_new_tools.js
 *
 * 1. home-equity-loan-calculator  — 74K vol, $9.32 CPC
 * 2. heloc-calculator             — 49.5K vol, $8.13 CPC
 * 3. sba-loan-calculator          — 9.9K vol, $6.86 CPC
 * 4. capital-gains-tax-calculator — 49.5K vol, $1.41 CPC
 * 5. mileage-reimbursement-calculator — 8.1K vol, $3.24 CPC
 * 6. business-valuation-calculator    — 6.6K vol, $4.89 CPC
 * 7. required-minimum-distribution-calculator — 110K vol, $0.47 CPC
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';
const DOMAIN = 'https://www.freepayrollcalc.com';

// ── Shared nav / footer (matches existing site) ──────────────────────────────
const NAV = `<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search tools">
  <div class="cmd-modal">
    <div class="cmd-search-row">
      <span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span>
      <input class="cmd-input" id="cmd-input" type="text" placeholder="Search 50+ tools..." autocomplete="off" spellcheck="false">
      <kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd>
    </div>
    <div class="cmd-body" id="cmd-body"></div>
    <div class="cmd-footer">
      <span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span>
      <span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span>
      <span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="site-logo">FreePayrollCalc</a>
    <nav class="main-nav" aria-label="Main">
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Payroll <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/payroll-tax-calculator" class="nav-item">Payroll Tax</a>
          <a href="/take-home-pay-calculator" class="nav-item">Take-Home Pay</a>
          <a href="/payroll-hours-calculator" class="nav-item">Payroll Hours</a>
          <a href="/salary-to-hourly-calculator" class="nav-item">Salary to Hourly</a>
          <a href="/net-to-gross-calculator" class="nav-item">Net to Gross</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Tax <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/self-employment-tax-calculator" class="nav-item">Self-Employment Tax</a>
          <a href="/bonus-tax-calculator" class="nav-item">Bonus Tax</a>
          <a href="/quarterly-tax-calculator" class="nav-item">Quarterly Tax</a>
          <a href="/capital-gains-tax-calculator" class="nav-item">Capital Gains Tax</a>
          <a href="/income-tax-calculator" class="nav-item">Income Tax Estimator</a>
          <a href="/mileage-reimbursement-calculator" class="nav-item">Mileage Reimbursement</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Home &amp; RE <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/mortgage-calculator" class="nav-item">Mortgage Calculator</a>
          <a href="/home-equity-loan-calculator" class="nav-item">Home Equity Loan</a>
          <a href="/heloc-calculator" class="nav-item">HELOC Calculator</a>
          <a href="/refinance-calculator" class="nav-item">Refinance Calculator</a>
          <a href="/reverse-mortgage-calculator" class="nav-item">Reverse Mortgage</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Business <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/sba-loan-calculator" class="nav-item">SBA Loan Calculator</a>
          <a href="/business-loan-calculator" class="nav-item">Business Loan</a>
          <a href="/business-valuation-calculator" class="nav-item">Business Valuation</a>
          <a href="/break-even-calculator" class="nav-item">Break-Even</a>
          <a href="/profit-margin-calculator" class="nav-item">Profit Margin</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Retirement <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button>
        <div class="nav-dropdown">
          <a href="/retirement-calculator" class="nav-item">Retirement Calculator</a>
          <a href="/required-minimum-distribution-calculator" class="nav-item">RMD Calculator</a>
          <a href="/401k-withdrawal-calculator" class="nav-item">401k Withdrawal</a>
          <a href="/savings-calculator" class="nav-item">Savings Calculator</a>
        </div>
      </div>
    </nav>
    <div class="header-actions">
      <button class="btn-search" id="btn-search" aria-label="Search tools"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button>
      <a href="/tools" class="btn-all-tools">All Tools</a>
    </div>
  </div>
</header>`;

const FTR = `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="/" class="footer-logo">FreePayrollCalc</a>
        <p class="footer-tagline">Free financial &amp; payroll calculators. No sign-up required.</p>
      </div>
      <div>
        <div class="footer-col-title">Home &amp; Real Estate</div>
        <nav class="footer-nav">
          <a href="/mortgage-calculator">Mortgage Calculator</a>
          <a href="/home-equity-loan-calculator">Home Equity Loan</a>
          <a href="/heloc-calculator">HELOC Calculator</a>
          <a href="/refinance-calculator">Refinance Calculator</a>
        </nav>
      </div>
      <div>
        <div class="footer-col-title">Business &amp; Tax</div>
        <nav class="footer-nav">
          <a href="/sba-loan-calculator">SBA Loan Calculator</a>
          <a href="/capital-gains-tax-calculator">Capital Gains Tax</a>
          <a href="/business-valuation-calculator">Business Valuation</a>
          <a href="/mileage-reimbursement-calculator">Mileage Reimbursement</a>
        </nav>
      </div>
      <div>
        <div class="footer-col-title">Retirement</div>
        <nav class="footer-nav">
          <a href="/required-minimum-distribution-calculator">RMD Calculator</a>
          <a href="/401k-withdrawal-calculator">401k Withdrawal</a>
          <a href="/retirement-calculator">Retirement Calculator</a>
        </nav>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 FreePayrollCalc.com &mdash; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a></p>
      <p class="footer-disclaimer">For informational purposes only. Consult a financial professional for advice.</p>
    </div>
  </div>
</footer>`;

function wrap(slug, title, desc, schemaJson, faqSchemaJson, pageCSS, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" href="/shared/favicon.svg" type="image/svg+xml">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${DOMAIN}/${slug}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/shared/styles.css?v=9">
<script type="application/ld+json">${schemaJson}</script>
${faqSchemaJson ? `<script type="application/ld+json">${faqSchemaJson}</script>` : ''}
<style>
.result-card{background:linear-gradient(135deg,rgba(27,79,216,.07),rgba(27,79,216,.02));border:2px solid rgba(27,79,216,.2);border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}
.result-big{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}
.result-label{font-size:13px;font-weight:700;color:var(--ink-2)}
.result-sub{font-size:12px;color:var(--ink-3);margin-top:4px}
.stat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}
@media(max-width:640px){.stat-grid{grid-template-columns:1fr 1fr}}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink-1);line-height:1;margin-bottom:3px}
.stat-lbl{font-size:11px;color:var(--ink-3);font-weight:600}
.breakdown-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);font-size:13px}
.breakdown-row:last-child{border-bottom:none}
.breakdown-row .val{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--ink-1)}
.highlight-row{background:rgba(27,79,216,.04);border-radius:8px;padding:10px 14px;margin-top:4px;display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:var(--accent)}
.tag-chip{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:12px}
.tag-green{background:#dcfce7;color:#15803d}
.tag-yellow{background:#fef9c3;color:#854d0e}
.tag-red{background:#fee2e2;color:#dc2626}
.tag-blue{background:#dbeafe;color:#1d4ed8}
${pageCSS}
</style>
</head>
<body>
${NAV}
<main class="calc-page">
  <div class="container">
    <nav class="calc-breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">${title.split('|')[0].trim()}</span></nav>
    <div class="ad-zone ad-zone--leaderboard"></div>
    ${body}
  </div>
</main>
${FTR}
<script src="/shared/scripts.js?v=6" defer></script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HOME EQUITY LOAN CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function buildHomeEquity() {
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"Home Equity Loan Calculator 2026","url":`${DOMAIN}/home-equity-loan-calculator`,
    "description":"Calculate your home equity loan payment, available equity, and total interest. See how much you can borrow based on your home value and mortgage balance.",
    "applicationCategory":"FinanceApplication","operatingSystem":"Any",
    "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
  });
  const faq = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"How much can I borrow with a home equity loan?",
       "acceptedAnswer":{"@type":"Answer","text":"Most lenders allow you to borrow up to 85% of your home's appraised value, minus what you still owe on your mortgage. Example: $400,000 home × 85% = $340,000 − $220,000 mortgage balance = $120,000 maximum home equity loan."}},
      {"@type":"Question","name":"What is the difference between a home equity loan and a HELOC?",
       "acceptedAnswer":{"@type":"Answer","text":"A home equity loan gives you a lump sum at a fixed rate — predictable payments. A HELOC is a revolving line of credit with a variable rate — you draw as needed and pay interest only on what you use. Home equity loans are better for one-time expenses; HELOCs are better for ongoing projects."}},
      {"@type":"Question","name":"What credit score do I need for a home equity loan?",
       "acceptedAnswer":{"@type":"Answer","text":"Most lenders require a minimum credit score of 620, but the best rates go to borrowers with 740+. Lenders also look at your combined LTV (loan-to-value), debt-to-income ratio, and employment history."}},
      {"@type":"Question","name":"Are home equity loan interest payments tax deductible?",
       "acceptedAnswer":{"@type":"Answer","text":"Yes, if you use the loan to buy, build, or substantially improve the home securing the loan. Interest is not deductible if the money is used for personal expenses like vacations or paying off credit cards. Consult a tax advisor to confirm your situation."}}
    ]
  });
  const body = `<h1 class="calc-title" data-enter>Home Equity Loan Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Find out how much equity you can access, your monthly payment, and total interest for a fixed-rate home equity loan.</p>
<div class="calc-layout">
  <div class="calc-inputs">
    <div class="input-group">
      <label class="input-label" for="he-home-value">Home Value</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="he-home-value" class="calc-input" value="400000" min="50000" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="he-mortgage-balance">Current Mortgage Balance</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="he-mortgage-balance" class="calc-input" value="220000" min="0" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="he-loan-amount">Loan Amount You Want</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="he-loan-amount" class="calc-input" value="50000" min="5000" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="he-rate">Interest Rate (fixed)</label>
      <div class="input-prefix-wrap"><input type="number" id="he-rate" class="calc-input" value="8.5" min="3" max="20" step="0.05"><span class="input-suffix">%</span></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="he-term">Loan Term</label>
      <select id="he-term" class="calc-select">
        <option value="5">5 years</option>
        <option value="10" selected>10 years</option>
        <option value="15">15 years</option>
        <option value="20">20 years</option>
        <option value="30">30 years</option>
      </select>
    </div>
    <button class="calc-btn" onclick="calcHE()">Calculate</button>
  </div>
  <div class="calc-results" id="he-results">
    <div class="result-card">
      <div class="result-big" id="he-payment">$620</div>
      <div class="result-label">Monthly Payment</div>
      <div class="result-sub">Fixed for the life of the loan</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="he-equity">$120,000</div><div class="stat-lbl">Available Equity</div></div>
      <div class="stat-card"><div class="stat-num" id="he-ltv">55%</div><div class="stat-lbl">Combined LTV</div></div>
      <div class="stat-card"><div class="stat-num" id="he-total-int">$24,424</div><div class="stat-lbl">Total Interest</div></div>
    </div>
    <div class="calc-card">
      <div class="breakdown-row"><span>Home Value</span><span class="val" id="he-s-home">$400,000</span></div>
      <div class="breakdown-row"><span>Mortgage Balance</span><span class="val" id="he-s-bal">$220,000</span></div>
      <div class="breakdown-row"><span>Max Borrowable (85% LTV)</span><span class="val" id="he-s-max">$120,000</span></div>
      <div class="breakdown-row"><span>Loan Amount</span><span class="val" id="he-s-loan">$50,000</span></div>
      <div class="breakdown-row"><span>Term</span><span class="val" id="he-s-term">10 years (120 payments)</span></div>
      <div class="breakdown-row"><span>Total Repaid</span><span class="val" id="he-s-total">$74,424</span></div>
      <div class="highlight-row"><span>Monthly Payment</span><span id="he-s-payment">$620</span></div>
    </div>
    <div id="he-warn" class="calc-alert" style="display:none"></div>
  </div>
</div>
<div class="calc-article">
  <h2>How Home Equity Loans Work</h2>
  <p>A home equity loan lets you borrow against the equity in your home — the difference between what it's worth and what you still owe. You receive a lump sum at closing, repay it at a fixed interest rate over a set term (typically 5–30 years), and your home serves as collateral.</p>
  <h3>Maximum Loan Amount Formula</h3>
  <p>Most lenders cap your combined loan-to-value (CLTV) at 85%:</p>
  <p><strong>Max equity loan = (Home value × 0.85) − Mortgage balance</strong></p>
  <p>Example: $400,000 home × 0.85 = $340,000 − $220,000 balance = <strong>$120,000 maximum</strong>.</p>
  <h3>Current Home Equity Loan Rates (2026)</h3>
  <p>Home equity loan rates typically range from 7.5% to 10% for borrowers with good credit. Rates are fixed, unlike a HELOC which varies with prime rate. Shop at least 3 lenders — rate differences of 0.5% on a $80,000 loan save ~$2,500 over 10 years.</p>
  <h3>Home Equity Loan vs HELOC</h3>
  <p>Use a home equity loan when you need a lump sum for a one-time expense (renovation, debt consolidation, tuition). Use a <a href="/heloc-calculator">HELOC</a> when you need ongoing access to funds over several years and prefer to only borrow what you need.</p>
</div>`;

  const html = wrap(
    'home-equity-loan-calculator',
    'Home Equity Loan Calculator 2026 | Monthly Payment + Available Equity',
    'Calculate your home equity loan payment, available equity, and total interest. Enter home value, mortgage balance, loan amount, rate, and term — instant results.',
    schema, faq, '', body
  );

  // Append calculator JS
  return html.replace('</body>', `<script>
function fmt(n){return n<0?'-$'+Math.abs(Math.round(n)).toLocaleString():'$'+Math.round(n).toLocaleString();}
function calcHE(){
  var hv=parseFloat(document.getElementById('he-home-value').value)||400000;
  var mb=parseFloat(document.getElementById('he-mortgage-balance').value)||0;
  var la=parseFloat(document.getElementById('he-loan-amount').value)||50000;
  var r=parseFloat(document.getElementById('he-rate').value)/100/12;
  var n=parseInt(document.getElementById('he-term').value)*12;
  var maxBorrow=Math.max(0,hv*0.85-mb);
  var cltv=(mb+la)/hv*100;
  var pay=r>0?la*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):la/n;
  var totalPaid=pay*n;
  var totalInt=totalPaid-la;
  document.getElementById('he-payment').textContent=fmt(pay);
  document.getElementById('he-equity').textContent=fmt(maxBorrow);
  document.getElementById('he-ltv').textContent=cltv.toFixed(1)+'%';
  document.getElementById('he-total-int').textContent=fmt(totalInt);
  document.getElementById('he-s-home').textContent=fmt(hv);
  document.getElementById('he-s-bal').textContent=fmt(mb);
  document.getElementById('he-s-max').textContent=fmt(maxBorrow);
  document.getElementById('he-s-loan').textContent=fmt(la);
  document.getElementById('he-s-term').textContent=document.getElementById('he-term').value+' years ('+n+' payments)';
  document.getElementById('he-s-total').textContent=fmt(totalPaid);
  document.getElementById('he-s-payment').textContent=fmt(pay);
  var warn=document.getElementById('he-warn');
  if(la>maxBorrow){warn.style.display='block';warn.textContent='⚠ Requested amount ($'+la.toLocaleString()+') exceeds max borrowable ($'+Math.round(maxBorrow).toLocaleString()+'). Most lenders will cap at 85% combined LTV.';}
  else{warn.style.display='none';}
  if(cltv>80){document.getElementById('he-ltv').style.color='var(--danger,#dc2626)';}
  else{document.getElementById('he-ltv').style.color='';}
}
document.addEventListener('DOMContentLoaded',calcHE);
document.querySelectorAll('#he-home-value,#he-mortgage-balance,#he-loan-amount,#he-rate').forEach(function(el){el.addEventListener('input',calcHE);});
document.getElementById('he-term').addEventListener('change',calcHE);
</script></body>`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELOC CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function buildHELOC() {
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"HELOC Calculator 2026","url":`${DOMAIN}/heloc-calculator`,
    "description":"Calculate your HELOC payment during the draw period and repayment period. Find your available credit line, interest-only payment, and total cost.",
    "applicationCategory":"FinanceApplication","operatingSystem":"Any",
    "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
  });
  const faq = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"How is a HELOC payment calculated?",
       "acceptedAnswer":{"@type":"Answer","text":"During the draw period (usually 10 years), you pay interest only on the balance you've drawn. Payment = Outstanding balance × (Annual rate / 12). During the repayment period (usually 20 years), you pay principal + interest on the full outstanding balance at that time, often resulting in a significant payment increase."}},
      {"@type":"Question","name":"What is a HELOC draw period?",
       "acceptedAnswer":{"@type":"Answer","text":"The draw period is the time (typically 5–10 years) when you can borrow from your HELOC, pay back, and borrow again — like a credit card. You usually only pay interest on what you've drawn. After the draw period ends, the repayment period begins and you can no longer draw funds."}},
      {"@type":"Question","name":"What happens at the end of a HELOC draw period?",
       "acceptedAnswer":{"@type":"Answer","text":"At the end of the draw period, your HELOC enters the repayment phase. You can no longer borrow, and you must repay the outstanding balance — typically over 10–20 years at the then-current variable rate. Payments often jump significantly. Some lenders require a balloon payment."}},
      {"@type":"Question","name":"Is HELOC interest tax deductible?",
       "acceptedAnswer":{"@type":"Answer","text":"HELOC interest is tax deductible only if you use the funds to buy, build, or substantially improve the home that secures the line. If you use a HELOC to pay off credit cards or take a vacation, the interest is not deductible. Consult a tax advisor."}}
    ]
  });
  const body = `<h1 class="calc-title" data-enter>HELOC Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your HELOC credit line, draw-period payment (interest-only), and repayment-period payment. See what happens when the draw period ends.</p>
<div class="calc-layout">
  <div class="calc-inputs">
    <div class="input-group">
      <label class="input-label" for="hl-home-value">Home Value</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="hl-home-value" class="calc-input" value="450000" min="50000" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="hl-mortgage-balance">Current Mortgage Balance</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="hl-mortgage-balance" class="calc-input" value="280000" min="0" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="hl-draw">Amount You Plan to Draw</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="hl-draw" class="calc-input" value="50000" min="1000" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="hl-rate">Current Interest Rate (variable)</label>
      <div class="input-prefix-wrap"><input type="number" id="hl-rate" class="calc-input" value="9.0" min="3" max="25" step="0.05"><span class="input-suffix">%</span></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="hl-draw-years">Draw Period</label>
      <select id="hl-draw-years" class="calc-select">
        <option value="5">5 years</option>
        <option value="10" selected>10 years</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="hl-repay-years">Repayment Period</label>
      <select id="hl-repay-years" class="calc-select">
        <option value="10">10 years</option>
        <option value="15">15 years</option>
        <option value="20" selected>20 years</option>
      </select>
    </div>
    <button class="calc-btn" onclick="calcHL()">Calculate</button>
  </div>
  <div class="calc-results" id="hl-results">
    <div class="result-card">
      <div class="result-big" id="hl-draw-payment">$375</div>
      <div class="result-label">Monthly Draw-Period Payment</div>
      <div class="result-sub">Interest-only on drawn amount</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="hl-credit-line">$102,500</div><div class="stat-lbl">Credit Line Available</div></div>
      <div class="stat-card"><div class="stat-num" id="hl-repay-payment">$450</div><div class="stat-lbl">Repayment Payment</div></div>
      <div class="stat-card"><div class="stat-num" id="hl-total-int">$62,000</div><div class="stat-lbl">Est. Total Interest</div></div>
    </div>
    <div class="calc-card">
      <div class="breakdown-row"><span>Available Credit Line</span><span class="val" id="hl-s-line">$102,500</span></div>
      <div class="breakdown-row"><span>Amount Drawing</span><span class="val" id="hl-s-draw">$50,000</span></div>
      <div class="breakdown-row"><span>Draw Period Payment (interest only)</span><span class="val" id="hl-s-dp">$375/mo</span></div>
      <div class="breakdown-row"><span>Interest Paid During Draw Period</span><span class="val" id="hl-s-di">$45,000</span></div>
      <div class="breakdown-row"><span>Repayment Period Payment</span><span class="val" id="hl-s-rp">$450/mo</span></div>
      <div class="breakdown-row"><span>Repayment Period Interest</span><span class="val" id="hl-s-ri">$57,900</span></div>
      <div class="highlight-row"><span>Total Interest Cost</span><span id="hl-s-total">$102,900</span></div>
    </div>
    <div class="calc-info-box" style="background:#fef9c3;border:1px solid #fde047;border-radius:10px;padding:14px;margin-top:12px;font-size:13px;color:#854d0e">
      <strong>Rate Risk:</strong> HELOCs have <em>variable rates</em> tied to prime rate. If rates rise 2%, your repayment payment increases by <span id="hl-rate-risk">~$83/mo</span>.
    </div>
  </div>
</div>
<div class="calc-article">
  <h2>HELOC vs Home Equity Loan</h2>
  <p>A HELOC (Home Equity Line of Credit) works like a credit card secured by your home. You get a credit limit based on your equity, draw what you need, pay it back, and draw again — all during the draw period (typically 10 years). After the draw period, repayment begins on the balance you owe.</p>
  <p>Compare to a <a href="/home-equity-loan-calculator">home equity loan</a>: that gives you a fixed lump sum at a fixed rate. A HELOC's variable rate means your payment fluctuates with the prime rate — which adds risk but also means you can benefit if rates fall.</p>
  <h3>HELOC Credit Line Formula</h3>
  <p><strong>Max credit line = (Home value × 0.85) − Mortgage balance</strong></p>
  <h3>2026 HELOC Rates</h3>
  <p>HELOC rates are typically prime rate + 0–2%. As of 2026, expect rates of 8%–11% for most borrowers. Excellent credit (760+) may qualify for prime or below.</p>
</div>`;

  const html = wrap(
    'heloc-calculator',
    'HELOC Calculator 2026 | Draw Period Payment + Repayment Cost',
    'Calculate your HELOC credit line, draw-period interest-only payment, and repayment-period payment. See total interest cost and rate-change risk.',
    schema, faq, '', body
  );

  return html.replace('</body>', `<script>
function fmt(n){return n<0?'-$'+Math.abs(Math.round(n)).toLocaleString():'$'+Math.round(n).toLocaleString();}
function calcHL(){
  var hv=parseFloat(document.getElementById('hl-home-value').value)||450000;
  var mb=parseFloat(document.getElementById('hl-mortgage-balance').value)||0;
  var draw=parseFloat(document.getElementById('hl-draw').value)||50000;
  var annRate=parseFloat(document.getElementById('hl-rate').value)/100;
  var monRate=annRate/12;
  var drawYears=parseInt(document.getElementById('hl-draw-years').value);
  var repayYears=parseInt(document.getElementById('hl-repay-years').value);
  var creditLine=Math.max(0,hv*0.85-mb);
  var drawPayment=draw*monRate;
  var drawInterest=drawPayment*drawYears*12;
  var repayN=repayYears*12;
  var repayPayment=monRate>0?draw*monRate*Math.pow(1+monRate,repayN)/(Math.pow(1+monRate,repayN)-1):draw/repayN;
  var repayInterest=repayPayment*repayN-draw;
  var totalInt=drawInterest+repayInterest;
  var riskPayment=(annRate+0.02)/12;
  var riskDiff=Math.abs((draw*riskPayment*Math.pow(1+riskPayment,repayN)/(Math.pow(1+riskPayment,repayN)-1))-repayPayment);
  document.getElementById('hl-draw-payment').textContent=fmt(drawPayment);
  document.getElementById('hl-credit-line').textContent=fmt(creditLine);
  document.getElementById('hl-repay-payment').textContent=fmt(repayPayment);
  document.getElementById('hl-total-int').textContent=fmt(totalInt);
  document.getElementById('hl-s-line').textContent=fmt(creditLine);
  document.getElementById('hl-s-draw').textContent=fmt(draw);
  document.getElementById('hl-s-dp').textContent=fmt(drawPayment)+'/mo';
  document.getElementById('hl-s-di').textContent=fmt(drawInterest);
  document.getElementById('hl-s-rp').textContent=fmt(repayPayment)+'/mo';
  document.getElementById('hl-s-ri').textContent=fmt(repayInterest);
  document.getElementById('hl-s-total').textContent=fmt(totalInt);
  document.getElementById('hl-rate-risk').textContent='~'+fmt(riskDiff)+'/mo';
}
document.addEventListener('DOMContentLoaded',calcHL);
document.querySelectorAll('#hl-home-value,#hl-mortgage-balance,#hl-draw,#hl-rate').forEach(function(el){el.addEventListener('input',calcHL);});
document.getElementById('hl-draw-years').addEventListener('change',calcHL);
document.getElementById('hl-repay-years').addEventListener('change',calcHL);
</script></body>`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SBA LOAN CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function buildSBA() {
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"SBA Loan Calculator 2026","url":`${DOMAIN}/sba-loan-calculator`,
    "description":"Calculate monthly payments for SBA 7(a) and 504 loans. Enter loan amount, interest rate, and term to see your monthly payment, total interest, and guarantee fee.",
    "applicationCategory":"FinanceApplication","operatingSystem":"Any",
    "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
  });
  const faq = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"What are current SBA loan interest rates in 2026?",
       "acceptedAnswer":{"@type":"Answer","text":"SBA 7(a) loan rates are typically prime rate + 2.25%–4.75% depending on loan size and term. SBA 504 loans have fixed rates set monthly by the SBA, typically ranging from 6%–8% for the CDC portion. Check SBA.gov for current rate tables."}},
      {"@type":"Question","name":"What is the SBA guarantee fee?",
       "acceptedAnswer":{"@type":"Answer","text":"For SBA 7(a) loans, the guarantee fee is a percentage of the guaranteed portion: 0% for loans under $150K, 2% for $150K–$700K, 3% for $700K–$5M. The fee is typically financed into the loan. Small businesses in underserved communities may be exempt."}},
      {"@type":"Question","name":"How long can an SBA loan term be?",
       "acceptedAnswer":{"@type":"Answer","text":"SBA 7(a) loans: up to 10 years for working capital and equipment, up to 25 years for real estate. SBA 504 loans: 10, 20, or 25 years. SBA Microloans: up to 6 years."}},
      {"@type":"Question","name":"What credit score do I need for an SBA loan?",
       "acceptedAnswer":{"@type":"Answer","text":"Most SBA lenders require a minimum credit score of 650–680. The SBA itself doesn't set a minimum, but lenders do. Strong business financials, time in business (typically 2+ years), and collateral can compensate for a lower score."}},
      {"@type":"Question","name":"What is the maximum SBA 7(a) loan amount?",
       "acceptedAnswer":{"@type":"Answer","text":"The maximum SBA 7(a) loan is $5 million. SBA 504 loans can go up to $5.5 million (or $5.5 million for eligible energy projects). SBA Microloans max out at $50,000."}}
    ]
  });
  const body = `<h1 class="calc-title" data-enter>SBA Loan Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Estimate monthly payments for SBA 7(a) and 504 loans. See total interest, guarantee fee, and total cost of borrowing.</p>
<div class="calc-layout">
  <div class="calc-inputs">
    <div class="input-group">
      <label class="input-label" for="sba-type">Loan Type</label>
      <select id="sba-type" class="calc-select" onchange="setSBADefaults()">
        <option value="7a" selected>SBA 7(a) — Working Capital / General</option>
        <option value="504">SBA 504 — Real Estate / Equipment</option>
        <option value="micro">SBA Microloan (max $50,000)</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="sba-amount">Loan Amount</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="sba-amount" class="calc-input" value="250000" min="5000" max="5000000" step="5000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="sba-rate">Interest Rate</label>
      <div class="input-prefix-wrap"><input type="number" id="sba-rate" class="calc-input" value="11.0" min="4" max="20" step="0.25"><span class="input-suffix">%</span></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="sba-term">Loan Term</label>
      <select id="sba-term" class="calc-select">
        <option value="5">5 years</option>
        <option value="7">7 years</option>
        <option value="10" selected>10 years</option>
        <option value="15">15 years</option>
        <option value="20">20 years</option>
        <option value="25">25 years</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="sba-down">Down Payment (if any)</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="sba-down" class="calc-input" value="0" min="0" step="5000"></div>
    </div>
    <button class="calc-btn" onclick="calcSBA()">Calculate</button>
  </div>
  <div class="calc-results">
    <div class="result-card">
      <div class="result-big" id="sba-payment">$2,763</div>
      <div class="result-label">Monthly Payment</div>
      <div class="result-sub" id="sba-rate-note">At 11.0% for 10 years</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="sba-total-int">$81,560</div><div class="stat-lbl">Total Interest</div></div>
      <div class="stat-card"><div class="stat-num" id="sba-gfee">$5,625</div><div class="stat-lbl">Guarantee Fee</div></div>
      <div class="stat-card"><div class="stat-num" id="sba-total-cost">$336,560</div><div class="stat-lbl">Total Cost</div></div>
    </div>
    <div class="calc-card">
      <div class="breakdown-row"><span>Loan Amount</span><span class="val" id="sba-s-amount">$250,000</span></div>
      <div class="breakdown-row"><span>Down Payment</span><span class="val" id="sba-s-down">$0</span></div>
      <div class="breakdown-row"><span>Financed Amount</span><span class="val" id="sba-s-financed">$250,000</span></div>
      <div class="breakdown-row"><span>Interest Rate</span><span class="val" id="sba-s-rate">11.0%</span></div>
      <div class="breakdown-row"><span>Term</span><span class="val" id="sba-s-term">10 years (120 payments)</span></div>
      <div class="breakdown-row"><span>SBA Guarantee Fee (est.)</span><span class="val" id="sba-s-gfee">$5,625</span></div>
      <div class="breakdown-row"><span>Total Interest Paid</span><span class="val" id="sba-s-int">$81,560</span></div>
      <div class="highlight-row"><span>Total Cost of Loan</span><span id="sba-s-total">$336,560</span></div>
    </div>
    <div class="calc-info-box" style="background:#dbeafe;border:1px solid #93c5fd;border-radius:10px;padding:14px;margin-top:12px;font-size:13px;color:#1e40af">
      <strong>Note:</strong> SBA 7(a) rates are variable (prime + spread). This calculator uses a fixed rate for simplicity. Check SBA.gov for current prime rate and spreads.
    </div>
  </div>
</div>
<div class="calc-article">
  <h2>SBA Loan Types Compared</h2>
  <p><strong>SBA 7(a):</strong> The most common SBA loan. Used for working capital, equipment, inventory, or business acquisition. Max $5M, up to 10 years (25 years for real estate). Variable rate tied to prime rate.</p>
  <p><strong>SBA 504:</strong> Used for major fixed assets — real estate and heavy equipment. Lower down payment (10%), fixed rate on the CDC portion, max $5.5M. Requires a conventional lender (50%) + CDC (40%) + borrower down payment (10%).</p>
  <p><strong>SBA Microloan:</strong> Up to $50,000, up to 6-year term. Administered through nonprofit lenders. Rates typically 8%–13%.</p>
  <h3>SBA Guarantee Fee (2026)</h3>
  <p>The SBA charges lenders a guarantee fee based on the guaranteed portion of the loan (typically 75–85% of the loan amount):</p>
  <ul>
    <li>Loans ≤$150,000: <strong>0%</strong></li>
    <li>$150,001–$700,000: <strong>2%</strong> of guaranteed portion</li>
    <li>$700,001–$5,000,000: <strong>3%</strong> of guaranteed portion</li>
  </ul>
  <p>This fee is usually rolled into the loan. Lenders pass it to borrowers.</p>
</div>`;

  const html = wrap(
    'sba-loan-calculator',
    'SBA Loan Calculator 2026 | Monthly Payment + Guarantee Fee Estimate',
    'Calculate SBA 7(a) and 504 loan payments. Enter loan amount, rate, and term to see monthly payment, total interest, guarantee fee, and total cost.',
    schema, faq, '', body
  );

  return html.replace('</body>', `<script>
function fmt(n){return n<0?'-$'+Math.abs(Math.round(n)).toLocaleString():'$'+Math.round(n).toLocaleString();}
function gFee(amount, type){
  if(type==='micro') return 0;
  var gPct=type==='7a'?0.75:0.4;
  var gAmt=amount*gPct;
  if(gAmt<=150000) return 0;
  if(gAmt<=700000) return gAmt*0.02;
  return gAmt*0.03;
}
function setSBADefaults(){
  var t=document.getElementById('sba-type').value;
  if(t==='7a'){document.getElementById('sba-rate').value='11.0';document.getElementById('sba-term').value='10';}
  else if(t==='504'){document.getElementById('sba-rate').value='7.5';document.getElementById('sba-term').value='20';document.getElementById('sba-down').value='25000';}
  else{document.getElementById('sba-rate').value='10.0';document.getElementById('sba-term').value='5';document.getElementById('sba-amount').value='40000';}
  calcSBA();
}
function calcSBA(){
  var type=document.getElementById('sba-type').value;
  var amount=parseFloat(document.getElementById('sba-amount').value)||250000;
  var down=parseFloat(document.getElementById('sba-down').value)||0;
  var rate=parseFloat(document.getElementById('sba-rate').value)/100/12;
  var n=parseInt(document.getElementById('sba-term').value)*12;
  var financed=amount-down;
  var pay=rate>0?financed*rate*Math.pow(1+rate,n)/(Math.pow(1+rate,n)-1):financed/n;
  var totalPaid=pay*n;
  var totalInt=totalPaid-financed;
  var fee=gFee(amount, type);
  var totalCost=totalPaid+fee+down;
  document.getElementById('sba-payment').textContent=fmt(pay);
  document.getElementById('sba-rate-note').textContent='At '+document.getElementById('sba-rate').value+'% for '+document.getElementById('sba-term').value+' years';
  document.getElementById('sba-total-int').textContent=fmt(totalInt);
  document.getElementById('sba-gfee').textContent=fmt(fee);
  document.getElementById('sba-total-cost').textContent=fmt(totalCost);
  document.getElementById('sba-s-amount').textContent=fmt(amount);
  document.getElementById('sba-s-down').textContent=fmt(down);
  document.getElementById('sba-s-financed').textContent=fmt(financed);
  document.getElementById('sba-s-rate').textContent=document.getElementById('sba-rate').value+'%';
  document.getElementById('sba-s-term').textContent=document.getElementById('sba-term').value+' years ('+n+' payments)';
  document.getElementById('sba-s-gfee').textContent=fmt(fee);
  document.getElementById('sba-s-int').textContent=fmt(totalInt);
  document.getElementById('sba-s-total').textContent=fmt(totalCost);
}
document.addEventListener('DOMContentLoaded',calcSBA);
document.querySelectorAll('#sba-amount,#sba-rate,#sba-down').forEach(function(el){el.addEventListener('input',calcSBA);});
document.getElementById('sba-term').addEventListener('change',calcSBA);
</script></body>`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CAPITAL GAINS TAX CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function buildCapGains() {
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"Capital Gains Tax Calculator 2026","url":`${DOMAIN}/capital-gains-tax-calculator`,
    "description":"Calculate short-term and long-term capital gains tax on stocks, real estate, and other assets. Uses 2026 tax brackets. See net proceeds after tax.",
    "applicationCategory":"FinanceApplication","operatingSystem":"Any",
    "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
  });
  const faq = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"What is the capital gains tax rate for 2026?",
       "acceptedAnswer":{"@type":"Answer","text":"Long-term capital gains rates for 2026: 0% for taxable income up to $47,025 (single) / $94,050 (married); 15% for most taxpayers; 20% for income above $518,900 (single) / $583,750 (married). Short-term capital gains are taxed as ordinary income at your marginal rate (10%–37%)."}},
      {"@type":"Question","name":"How long do I need to hold an asset for long-term capital gains rates?",
       "acceptedAnswer":{"@type":"Answer","text":"You must hold the asset for more than 12 months (at least one year and one day) to qualify for long-term capital gains tax rates. Assets held 12 months or less are subject to short-term rates, which are the same as ordinary income tax rates."}},
      {"@type":"Question","name":"Is the capital gains tax rate 0% for some taxpayers?",
       "acceptedAnswer":{"@type":"Answer","text":"Yes. For 2026, if your taxable income is below $47,025 (single) or $94,050 (married filing jointly), your long-term capital gains rate is 0%. This means you could sell appreciated investments tax-free if your income is low enough."}},
      {"@type":"Question","name":"What is the Net Investment Income Tax (NIIT)?",
       "acceptedAnswer":{"@type":"Answer","text":"High earners may owe an additional 3.8% NIIT on investment income (including capital gains). This applies to single filers with modified AGI above $200,000 and married filers above $250,000. This calculator shows you whether NIIT may apply."}}
    ]
  });
  const body = `<h1 class="calc-title" data-enter>Capital Gains Tax Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your capital gains tax on stocks, real estate, crypto, or any asset. Uses 2026 IRS tax brackets. See your net proceeds after federal tax.</p>
<div class="calc-layout">
  <div class="calc-inputs">
    <div class="input-group">
      <label class="input-label" for="cg-purchase">Purchase Price (cost basis)</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cg-purchase" class="calc-input" value="50000" min="0" step="100"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="cg-sale">Sale Price</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cg-sale" class="calc-input" value="120000" min="0" step="100"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="cg-holding">Holding Period</label>
      <select id="cg-holding" class="calc-select">
        <option value="short">Short-term (12 months or less)</option>
        <option value="long" selected>Long-term (more than 12 months)</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="cg-income">Your Annual Taxable Income</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cg-income" class="calc-input" value="80000" min="0" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="cg-filing">Filing Status</label>
      <select id="cg-filing" class="calc-select">
        <option value="single" selected>Single</option>
        <option value="mfj">Married Filing Jointly</option>
        <option value="mfs">Married Filing Separately</option>
        <option value="hoh">Head of Household</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="cg-expenses">Selling Expenses (commissions, fees)</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cg-expenses" class="calc-input" value="0" min="0" step="100"></div>
    </div>
    <button class="calc-btn" onclick="calcCG()">Calculate</button>
  </div>
  <div class="calc-results">
    <div class="result-card">
      <div class="result-big" id="cg-tax-owed">$10,500</div>
      <div class="result-label">Estimated Federal Tax Owed</div>
      <div class="result-sub" id="cg-rate-note">Long-term 15% rate</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="cg-gain">$70,000</div><div class="stat-lbl">Capital Gain</div></div>
      <div class="stat-card"><div class="stat-num" id="cg-rate">15%</div><div class="stat-lbl">Tax Rate</div></div>
      <div class="stat-card"><div class="stat-num" id="cg-net">$109,500</div><div class="stat-lbl">Net Proceeds</div></div>
    </div>
    <div class="calc-card">
      <div class="breakdown-row"><span>Sale Price</span><span class="val" id="cg-s-sale">$120,000</span></div>
      <div class="breakdown-row"><span>Cost Basis</span><span class="val" id="cg-s-basis">$50,000</span></div>
      <div class="breakdown-row"><span>Selling Expenses</span><span class="val" id="cg-s-exp">$0</span></div>
      <div class="breakdown-row"><span>Net Capital Gain</span><span class="val" id="cg-s-gain">$70,000</span></div>
      <div class="breakdown-row"><span>Holding Period</span><span class="val" id="cg-s-hold">Long-term</span></div>
      <div class="breakdown-row"><span>Capital Gains Tax Rate</span><span class="val" id="cg-s-rate">15%</span></div>
      <div class="breakdown-row" id="cg-niit-row" style="display:none"><span>Net Investment Income Tax (3.8%)</span><span class="val" id="cg-s-niit">$0</span></div>
      <div class="breakdown-row"><span>Federal Tax Owed</span><span class="val" id="cg-s-tax">$10,500</span></div>
      <div class="highlight-row"><span>Net Proceeds After Tax</span><span id="cg-s-net">$109,500</span></div>
    </div>
    <p style="font-size:11px;color:var(--ink-3);margin-top:8px">Federal tax only. State capital gains tax not included. Consult a tax professional for your situation.</p>
  </div>
</div>
<div class="calc-article">
  <h2>2026 Capital Gains Tax Rates</h2>
  <h3>Long-Term Capital Gains (held &gt; 1 year)</h3>
  <table class="data-table">
    <thead><tr><th>Rate</th><th>Single Filers</th><th>Married Filing Jointly</th></tr></thead>
    <tbody>
      <tr><td>0%</td><td>Up to $47,025</td><td>Up to $94,050</td></tr>
      <tr><td>15%</td><td>$47,026–$518,900</td><td>$94,051–$583,750</td></tr>
      <tr><td>20%</td><td>Over $518,900</td><td>Over $583,750</td></tr>
    </tbody>
  </table>
  <p><em>Note: High earners may also owe 3.8% Net Investment Income Tax (NIIT) on top of the capital gains rate.</em></p>
  <h3>Short-Term Capital Gains</h3>
  <p>Assets held 12 months or less are taxed as ordinary income at your marginal bracket (10%, 12%, 22%, 24%, 32%, 35%, or 37%). There is no preferential rate for short-term gains.</p>
  <h3>Tax-Saving Strategies</h3>
  <ul>
    <li><strong>Hold longer than 1 year</strong> to qualify for long-term rates</li>
    <li><strong>Harvest tax losses</strong> to offset gains with losses from other investments</li>
    <li><strong>Timing the sale</strong> — selling in a low-income year can drop you into the 0% bracket</li>
    <li><strong>1031 exchange</strong> for real estate — defer all taxes by reinvesting in like-kind property</li>
  </ul>
</div>`;

  const html = wrap(
    'capital-gains-tax-calculator',
    'Capital Gains Tax Calculator 2026 | Short & Long-Term Rates',
    'Calculate capital gains tax on stocks, real estate, or crypto using 2026 IRS tax brackets. See your net proceeds after federal tax for short-term and long-term gains.',
    schema, faq, '', body
  );

  return html.replace('</body>', `<script>
function fmt(n){return n<0?'-$'+Math.abs(Math.round(n)).toLocaleString():'$'+Math.round(n).toLocaleString();}
var LT={single:[{max:47025,rate:0},{max:518900,rate:0.15},{max:Infinity,rate:0.20}],mfj:[{max:94050,rate:0},{max:583750,rate:0.15},{max:Infinity,rate:0.20}],mfs:[{max:47025,rate:0},{max:291850,rate:0.15},{max:Infinity,rate:0.20}],hoh:[{max:63000,rate:0},{max:551350,rate:0.15},{max:Infinity,rate:0.20}]};
var ST={single:[{max:11600,rate:0.10},{max:47150,rate:0.12},{max:100525,rate:0.22},{max:191950,rate:0.24},{max:243725,rate:0.32},{max:609350,rate:0.35},{max:Infinity,rate:0.37}],mfj:[{max:23200,rate:0.10},{max:94300,rate:0.12},{max:201050,rate:0.22},{max:383900,rate:0.24},{max:487450,rate:0.32},{max:731200,rate:0.35},{max:Infinity,rate:0.37}],mfs:[{max:11600,rate:0.10},{max:47150,rate:0.12},{max:100525,rate:0.22},{max:191950,rate:0.24},{max:243725,rate:0.32},{max:365600,rate:0.35},{max:Infinity,rate:0.37}],hoh:[{max:16550,rate:0.10},{max:63100,rate:0.12},{max:100500,rate:0.22},{max:191950,rate:0.24},{max:243700,rate:0.32},{max:609350,rate:0.35},{max:Infinity,rate:0.37}]};
function getRate(brackets,income){for(var i=0;i<brackets.length;i++){if(income<=brackets[i].max) return brackets[i].rate;}return 0.37;}
function calcCG(){
  var purchase=parseFloat(document.getElementById('cg-purchase').value)||0;
  var sale=parseFloat(document.getElementById('cg-sale').value)||0;
  var income=parseFloat(document.getElementById('cg-income').value)||0;
  var expenses=parseFloat(document.getElementById('cg-expenses').value)||0;
  var holding=document.getElementById('cg-holding').value;
  var filing=document.getElementById('cg-filing').value;
  var gain=Math.max(0,sale-purchase-expenses);
  var taxRate,tax,niit=0;
  if(holding==='short'){
    taxRate=getRate(ST[filing]||ST.single, income+gain);
    tax=gain*taxRate;
  } else {
    taxRate=getRate(LT[filing]||LT.single, income);
    tax=gain*taxRate;
  }
  var niitThresh={single:200000,mfj:250000,mfs:125000,hoh:200000};
  var thresh=niitThresh[filing]||200000;
  if(income>thresh){niit=gain*0.038;document.getElementById('cg-niit-row').style.display='flex';}
  else{niit=0;document.getElementById('cg-niit-row').style.display='none';}
  var totalTax=tax+niit;
  var netProceeds=sale-totalTax-expenses;
  document.getElementById('cg-tax-owed').textContent=fmt(totalTax);
  document.getElementById('cg-rate-note').textContent=(holding==='long'?'Long-term':'Short-term')+' '+Math.round(taxRate*100)+'% rate'+(niit>0?' + 3.8% NIIT':'');
  document.getElementById('cg-gain').textContent=fmt(gain);
  document.getElementById('cg-rate').textContent=Math.round(taxRate*100)+'%';
  document.getElementById('cg-net').textContent=fmt(netProceeds);
  document.getElementById('cg-s-sale').textContent=fmt(sale);
  document.getElementById('cg-s-basis').textContent=fmt(purchase);
  document.getElementById('cg-s-exp').textContent=fmt(expenses);
  document.getElementById('cg-s-gain').textContent=fmt(gain);
  document.getElementById('cg-s-hold').textContent=holding==='long'?'Long-term (>1 year)':'Short-term (≤1 year)';
  document.getElementById('cg-s-rate').textContent=Math.round(taxRate*100)+'%';
  document.getElementById('cg-s-niit').textContent=fmt(niit);
  document.getElementById('cg-s-tax').textContent=fmt(totalTax);
  document.getElementById('cg-s-net').textContent=fmt(netProceeds);
  var rateEl=document.getElementById('cg-rate');
  if(taxRate===0){rateEl.style.color='#15803d';}else if(taxRate>=0.35){rateEl.style.color='#dc2626';}else{rateEl.style.color='';}
}
document.addEventListener('DOMContentLoaded',calcCG);
document.querySelectorAll('#cg-purchase,#cg-sale,#cg-income,#cg-expenses').forEach(function(el){el.addEventListener('input',calcCG);});
document.getElementById('cg-holding').addEventListener('change',calcCG);
document.getElementById('cg-filing').addEventListener('change',calcCG);
</script></body>`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. MILEAGE REIMBURSEMENT CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function buildMileage() {
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"Mileage Reimbursement Calculator 2026","url":`${DOMAIN}/mileage-reimbursement-calculator`,
    "description":"Calculate IRS mileage reimbursement for business, medical, and charity driving using 2026 standard rates. See total reimbursement and tax deduction value.",
    "applicationCategory":"FinanceApplication","operatingSystem":"Any",
    "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
  });
  const faq = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"What is the IRS mileage rate for 2026?",
       "acceptedAnswer":{"@type":"Answer","text":"The IRS standard mileage rate for 2026 is 70 cents per mile for business use. Medical and military moving: 21 cents per mile. Charitable service: 14 cents per mile. These rates are set by the IRS and updated annually (sometimes mid-year). Check IRS.gov for the most current rates."}},
      {"@type":"Question","name":"Can employers reimburse at a rate higher than the IRS rate?",
       "acceptedAnswer":{"@type":"Answer","text":"Yes. Employers can reimburse at any rate. Reimbursements at or below the IRS standard rate are not taxable income to the employee and are deductible for the employer. Reimbursements above the IRS rate are taxable wages to the employee for the excess amount."}},
      {"@type":"Question","name":"How do I track mileage for reimbursement?",
       "acceptedAnswer":{"@type":"Answer","text":"The IRS requires a contemporaneous mileage log showing: date, destination, business purpose, and miles driven. Apps like MileIQ, Everlance, or Stride automatically track and log trips using GPS. Odometer readings at year-start and year-end are also required if using the standard mileage rate."}},
      {"@type":"Question","name":"Is mileage reimbursement taxable income?",
       "acceptedAnswer":{"@type":"Answer","text":"No, employer mileage reimbursements under an accountable plan (at or below IRS standard rate, with documentation) are not taxable income. Self-employed individuals claim the mileage deduction on Schedule C (Form 1040) to reduce self-employment tax."}}
    ]
  });
  const body = `<h1 class="calc-title" data-enter>Mileage Reimbursement Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate IRS standard mileage reimbursement for business, medical, or charity driving. Uses official 2026 rates.</p>
<div class="calc-layout">
  <div class="calc-inputs">
    <div class="input-group">
      <label class="input-label" for="mi-miles">Total Miles Driven</label>
      <input type="number" id="mi-miles" class="calc-input" value="5000" min="1" step="1">
    </div>
    <div class="input-group">
      <label class="input-label" for="mi-purpose">Driving Purpose</label>
      <select id="mi-purpose" class="calc-select" onchange="calcMileage()">
        <option value="business" selected>Business (standard)</option>
        <option value="medical">Medical / Military Moving</option>
        <option value="charity">Charitable Service</option>
        <option value="custom">Custom Rate</option>
      </select>
    </div>
    <div class="input-group" id="mi-custom-wrap" style="display:none">
      <label class="input-label" for="mi-custom-rate">Custom Rate (cents per mile)</label>
      <div class="input-prefix-wrap"><input type="number" id="mi-custom-rate" class="calc-input" value="70" min="1" max="200" step="0.5"><span class="input-suffix">¢</span></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="mi-year">Tax Year</label>
      <select id="mi-year" class="calc-select" onchange="calcMileage()">
        <option value="2026" selected>2026 — 70¢/mile (business)</option>
        <option value="2025">2025 — 70¢/mile (business)</option>
        <option value="2024">2024 — 67¢/mile (business)</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="mi-tax-rate">Your Tax Rate (for deduction value)</label>
      <div class="input-prefix-wrap"><input type="number" id="mi-tax-rate" class="calc-input" value="22" min="0" max="37" step="1"><span class="input-suffix">%</span></div>
    </div>
    <button class="calc-btn" onclick="calcMileage()">Calculate</button>
  </div>
  <div class="calc-results">
    <div class="result-card">
      <div class="result-big" id="mi-total">$3,500</div>
      <div class="result-label">Total Reimbursement</div>
      <div class="result-sub" id="mi-rate-used">At $0.70/mile (2026 IRS business rate)</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="mi-miles-out">5,000</div><div class="stat-lbl">Miles</div></div>
      <div class="stat-card"><div class="stat-num" id="mi-rate-out">$0.70</div><div class="stat-lbl">Rate per Mile</div></div>
      <div class="stat-card"><div class="stat-num" id="mi-tax-value">$770</div><div class="stat-lbl">Tax Deduction Value</div></div>
    </div>
    <div class="calc-card">
      <div class="breakdown-row"><span>Miles Driven</span><span class="val" id="mi-s-miles">5,000</span></div>
      <div class="breakdown-row"><span>IRS Rate (2026)</span><span class="val" id="mi-s-rate">$0.70/mile</span></div>
      <div class="breakdown-row"><span>Total Reimbursement</span><span class="val" id="mi-s-total">$3,500</span></div>
      <div class="breakdown-row"><span>Your Tax Rate</span><span class="val" id="mi-s-taxrate">22%</span></div>
      <div class="highlight-row"><span>Tax Savings (deduction value)</span><span id="mi-s-taxval">$770</span></div>
    </div>
    <div class="calc-card" style="margin-top:12px">
      <div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">All 2026 IRS Rates</div>
      <div class="breakdown-row"><span>Business</span><span class="val">$0.70/mile</span></div>
      <div class="breakdown-row"><span>Medical / Military Moving</span><span class="val">$0.21/mile</span></div>
      <div class="breakdown-row"><span>Charitable Service</span><span class="val">$0.14/mile</span></div>
    </div>
  </div>
</div>
<div class="calc-article">
  <h2>2026 IRS Mileage Rates</h2>
  <p>The IRS standard mileage rate is the per-mile amount the IRS considers reasonable for auto expenses. For 2026, the business rate is <strong>70 cents per mile</strong>.</p>
  <h3>Who Can Use the Standard Mileage Rate?</h3>
  <ul>
    <li><strong>Self-employed / freelancers:</strong> Deduct on Schedule C</li>
    <li><strong>Employees:</strong> Reimbursed by employer — not taxable if at or below IRS rate</li>
    <li><strong>Small business owners:</strong> Deduct on business return</li>
  </ul>
  <h3>Standard Mileage vs Actual Expense Method</h3>
  <p>You can choose the <strong>standard mileage rate</strong> (simple — just track miles) or the <strong>actual expense method</strong> (track gas, insurance, depreciation, repairs). The standard rate is simpler; the actual method can be larger if you drive a high-cost vehicle with lots of business use. You must choose the standard rate in year 1; you can switch to actual later but can't switch back to standard for that vehicle.</p>
  <h3>Mileage Log Requirements</h3>
  <p>The IRS requires a written record (contemporaneous log) for each trip: date, destination, business purpose, and miles. A mileage tracking app (MileIQ, Everlance, TripLog) is the easiest way to stay compliant.</p>
</div>`;

  const html = wrap(
    'mileage-reimbursement-calculator',
    'Mileage Reimbursement Calculator 2026 | IRS Standard Rate',
    'Calculate IRS mileage reimbursement using 2026 standard rates (70¢/mile business, 21¢ medical, 14¢ charity). See total reimbursement and tax deduction value.',
    schema, faq, '', body
  );

  return html.replace('</body>', `<script>
var RATES={2026:{business:0.70,medical:0.21,charity:0.14},2025:{business:0.70,medical:0.21,charity:0.14},2024:{business:0.67,medical:0.21,charity:0.14}};
function fmt(n){return '$'+n.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0});}
function calcMileage(){
  var miles=parseFloat(document.getElementById('mi-miles').value)||0;
  var purpose=document.getElementById('mi-purpose').value;
  var year=parseInt(document.getElementById('mi-year').value);
  var taxRate=parseFloat(document.getElementById('mi-tax-rate').value)/100;
  var customWrap=document.getElementById('mi-custom-wrap');
  var rate;
  if(purpose==='custom'){customWrap.style.display='block';rate=(parseFloat(document.getElementById('mi-custom-rate').value)||70)/100;}
  else{customWrap.style.display='none';rate=RATES[year][purpose]||RATES[year].business;}
  var total=miles*rate;
  var taxVal=total*taxRate;
  document.getElementById('mi-total').textContent=fmt(total);
  document.getElementById('mi-rate-used').textContent='At $'+rate.toFixed(2)+'/mile ('+year+' IRS '+purpose+' rate)';
  document.getElementById('mi-miles-out').textContent=miles.toLocaleString();
  document.getElementById('mi-rate-out').textContent='$'+rate.toFixed(2);
  document.getElementById('mi-tax-value').textContent=fmt(taxVal);
  document.getElementById('mi-s-miles').textContent=miles.toLocaleString();
  document.getElementById('mi-s-rate').textContent='$'+rate.toFixed(2)+'/mile';
  document.getElementById('mi-s-total').textContent=fmt(total);
  document.getElementById('mi-s-taxrate').textContent=Math.round(taxRate*100)+'%';
  document.getElementById('mi-s-taxval').textContent=fmt(taxVal);
}
document.addEventListener('DOMContentLoaded',calcMileage);
document.getElementById('mi-miles').addEventListener('input',calcMileage);
document.getElementById('mi-tax-rate').addEventListener('input',calcMileage);
document.getElementById('mi-custom-rate').addEventListener('input',calcMileage);
</script></body>`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. BUSINESS VALUATION CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function buildBizVal() {
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"Business Valuation Calculator 2026","url":`${DOMAIN}/business-valuation-calculator`,
    "description":"Estimate your business value using revenue multiples, EBITDA multiples, and asset-based methods. See valuation range by industry.",
    "applicationCategory":"FinanceApplication","operatingSystem":"Any",
    "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
  });
  const faq = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"How is a small business valued?",
       "acceptedAnswer":{"@type":"Answer","text":"Small businesses are typically valued using earnings multiples (1–4× SDE or EBITDA), revenue multiples (0.3–4× depending on industry), or asset-based methods. The most common method for main-street businesses is Seller's Discretionary Earnings (SDE) × a multiple between 1.5 and 3.5. SaaS and tech companies trade at much higher revenue multiples (3–10×)."}},
      {"@type":"Question","name":"What is Seller's Discretionary Earnings (SDE)?",
       "acceptedAnswer":{"@type":"Answer","text":"SDE = Net profit + owner's salary + personal expenses run through the business + depreciation + amortization + interest. It represents the true economic benefit to a single owner-operator. Most main-street business buyers use SDE as the earnings base when negotiating price."}},
      {"@type":"Question","name":"What multiple should I use to value my business?",
       "acceptedAnswer":{"@type":"Answer","text":"Typical SDE multiples by industry: Retail/restaurant 1.5–2.5×, Service businesses 2–3.5×, Professional services 1.5–3×, Technology/SaaS 3–8× (revenue), Manufacturing 2–4×, E-commerce 2–4×. Higher multiples go to businesses with recurring revenue, strong growth, documented processes, and no key-person dependency."}},
      {"@type":"Question","name":"What reduces a business valuation multiple?",
       "acceptedAnswer":{"@type":"Answer","text":"Factors that reduce multiples: key-person dependency (the business relies entirely on the owner), undocumented processes, customer concentration (one customer = 30%+ of revenue), declining revenue, unclean financial records, poor online reviews, and industry-specific risks."}}
    ]
  });
  const body = `<h1 class="calc-title" data-enter>Business Valuation Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Estimate your business value using revenue multiples and EBITDA/SDE multiples. See valuation range across different methods used by buyers and brokers.</p>
<div class="calc-layout">
  <div class="calc-inputs">
    <div class="input-group">
      <label class="input-label" for="bv-industry">Industry</label>
      <select id="bv-industry" class="calc-select" onchange="setIndustryDefaults()">
        <option value="services">Professional / Business Services</option>
        <option value="retail">Retail / Restaurant</option>
        <option value="saas" selected>SaaS / Technology</option>
        <option value="ecom">E-Commerce</option>
        <option value="manufacturing">Manufacturing</option>
        <option value="healthcare">Healthcare / Medical</option>
        <option value="construction">Construction / Trades</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="bv-revenue">Annual Revenue</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="bv-revenue" class="calc-input" value="1000000" min="10000" step="10000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="bv-ebitda">Annual EBITDA / SDE</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="bv-ebitda" class="calc-input" value="350000" min="0" step="5000"></div>
      <div class="input-hint">Net profit + owner salary + add-backs (depreciation, interest, personal expenses)</div>
    </div>
    <div class="input-group">
      <label class="input-label" for="bv-assets">Business Assets (equipment, inventory)</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="bv-assets" class="calc-input" value="100000" min="0" step="10000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="bv-growth">Annual Revenue Growth</label>
      <select id="bv-growth" class="calc-select">
        <option value="declining">Declining</option>
        <option value="flat">Flat (0–5%)</option>
        <option value="moderate" selected>Moderate (5–20%)</option>
        <option value="high">High (20%+)</option>
      </select>
    </div>
    <button class="calc-btn" onclick="calcBV()">Estimate Value</button>
  </div>
  <div class="calc-results">
    <div class="result-card">
      <div class="result-big" id="bv-midpoint">$2,450,000</div>
      <div class="result-label">Estimated Business Value</div>
      <div class="result-sub" id="bv-range">Range: $1,750,000 – $3,150,000</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="bv-rev-val">$4,000,000</div><div class="stat-lbl">Revenue Multiple</div></div>
      <div class="stat-card"><div class="stat-num" id="bv-ebitda-val">$2,450,000</div><div class="stat-lbl">EBITDA Multiple</div></div>
      <div class="stat-card"><div class="stat-num" id="bv-asset-val">$450,000</div><div class="stat-lbl">Asset-Based Floor</div></div>
    </div>
    <div class="calc-card">
      <div class="breakdown-row"><span>Revenue</span><span class="val" id="bv-s-rev">$1,000,000</span></div>
      <div class="breakdown-row"><span>Revenue Multiple (range)</span><span class="val" id="bv-s-rev-mult">3–5×</span></div>
      <div class="breakdown-row"><span>Revenue-based Valuation</span><span class="val" id="bv-s-rev-val">$3,000,000–$5,000,000</span></div>
      <div class="breakdown-row"><span>EBITDA / SDE</span><span class="val" id="bv-s-ebitda">$350,000</span></div>
      <div class="breakdown-row"><span>EBITDA Multiple (range)</span><span class="val" id="bv-s-ebitda-mult">5–9×</span></div>
      <div class="breakdown-row"><span>EBITDA-based Valuation</span><span class="val" id="bv-s-ebitda-val">$1,750,000–$3,150,000</span></div>
      <div class="breakdown-row"><span>Asset Floor (assets + EBITDA)</span><span class="val" id="bv-s-asset">$450,000</span></div>
      <div class="highlight-row"><span>Estimated Midpoint Value</span><span id="bv-s-mid">$2,450,000</span></div>
    </div>
    <p style="font-size:11px;color:var(--ink-3);margin-top:8px">Estimates only. Final value depends on due diligence, deal structure, buyer profile, and market conditions. Use a business broker or M&amp;A advisor for a formal valuation.</p>
  </div>
</div>
<div class="calc-article">
  <h2>Business Valuation Methods Explained</h2>
  <h3>1. Earnings Multiple (Most Common for SMBs)</h3>
  <p>Value = EBITDA (or SDE) × industry multiple. This is the most commonly used method for businesses under $10M. The multiple is driven by industry, growth, recurring revenue, and risk.</p>
  <h3>2. Revenue Multiple (Common for SaaS / Tech)</h3>
  <p>Value = Annual Revenue × multiple. Used for fast-growing tech companies, especially those with negative profit but strong revenue growth. SaaS ARR multiples range from 3× to 10× depending on growth and churn.</p>
  <h3>3. Asset-Based (Floor Value)</h3>
  <p>Value = Fair market value of assets − liabilities. Used as a floor — no buyer pays less than the liquidation value of assets. Common for asset-heavy businesses (manufacturing, real estate).</p>
</div>`;

  const html = wrap(
    'business-valuation-calculator',
    'Business Valuation Calculator 2026 | EBITDA & Revenue Multiples',
    'Estimate your business value using EBITDA multiples, revenue multiples, and asset-based methods. See valuation range by industry.',
    schema, faq, '', body
  );

  return html.replace('</body>', `<script>
var MULTS={services:{revLo:1.5,revHi:3,ebitdaLo:2.5,ebitdaHi:4},retail:{revLo:0.3,revHi:0.6,ebitdaLo:1.5,ebitdaHi:2.5},saas:{revLo:3,revHi:8,ebitdaLo:5,ebitdaHi:12},ecom:{revLo:1.5,revHi:4,ebitdaLo:2,ebitdaHi:5},manufacturing:{revLo:0.5,revHi:1.2,ebitdaLo:3,ebitdaHi:6},healthcare:{revLo:1,revHi:2.5,ebitdaLo:4,ebitdaHi:8},construction:{revLo:0.3,revHi:0.7,ebitdaLo:2,ebitdaHi:4}};
function fmt(n){return '$'+Math.round(n).toLocaleString();}
function fmtM(n){return n>=1000000?(n/1000000).toFixed(2)+'M':n>=1000?(n/1000).toFixed(0)+'K':n.toFixed(0);}
function setIndustryDefaults(){
  var i=document.getElementById('bv-industry').value;
  if(i==='saas'){document.getElementById('bv-revenue').value='1000000';document.getElementById('bv-ebitda').value='350000';}
  else if(i==='retail'){document.getElementById('bv-revenue').value='800000';document.getElementById('bv-ebitda').value='120000';}
  else if(i==='construction'){document.getElementById('bv-revenue').value='2000000';document.getElementById('bv-ebitda').value='200000';}
  calcBV();
}
function growthAdj(g){return g==='declining'?-0.2:g==='flat'?0:g==='moderate'?0.1:0.25;}
function calcBV(){
  var ind=document.getElementById('bv-industry').value;
  var rev=parseFloat(document.getElementById('bv-revenue').value)||1000000;
  var ebitda=parseFloat(document.getElementById('bv-ebitda').value)||0;
  var assets=parseFloat(document.getElementById('bv-assets').value)||0;
  var growth=document.getElementById('bv-growth').value;
  var m=MULTS[ind]||MULTS.services;
  var adj=1+growthAdj(growth);
  var revLo=rev*m.revLo*adj, revHi=rev*m.revHi*adj;
  var ebitdaLo=ebitda*m.ebitdaLo*adj, ebitdaHi=ebitda*m.ebitdaHi*adj;
  var assetFloor=assets+(ebitda>0?ebitda:0);
  var midpoint=(ebitdaLo+ebitdaHi)/2;
  document.getElementById('bv-midpoint').textContent='$'+fmtM(midpoint);
  document.getElementById('bv-range').textContent='Range: $'+fmtM(ebitdaLo)+' – $'+fmtM(ebitdaHi);
  document.getElementById('bv-rev-val').textContent='$'+fmtM((revLo+revHi)/2);
  document.getElementById('bv-ebitda-val').textContent='$'+fmtM(midpoint);
  document.getElementById('bv-asset-val').textContent='$'+fmtM(assetFloor);
  document.getElementById('bv-s-rev').textContent=fmt(rev);
  document.getElementById('bv-s-rev-mult').textContent=(m.revLo*adj).toFixed(1)+'–'+(m.revHi*adj).toFixed(1)+'×';
  document.getElementById('bv-s-rev-val').textContent='$'+fmtM(revLo)+' – $'+fmtM(revHi);
  document.getElementById('bv-s-ebitda').textContent=fmt(ebitda);
  document.getElementById('bv-s-ebitda-mult').textContent=(m.ebitdaLo*adj).toFixed(1)+'–'+(m.ebitdaHi*adj).toFixed(1)+'×';
  document.getElementById('bv-s-ebitda-val').textContent='$'+fmtM(ebitdaLo)+' – $'+fmtM(ebitdaHi);
  document.getElementById('bv-s-asset').textContent='$'+fmtM(assetFloor);
  document.getElementById('bv-s-mid').textContent='$'+fmtM(midpoint);
}
document.addEventListener('DOMContentLoaded',calcBV);
document.querySelectorAll('#bv-revenue,#bv-ebitda,#bv-assets').forEach(function(el){el.addEventListener('input',calcBV);});
document.getElementById('bv-growth').addEventListener('change',calcBV);
</script></body>`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. REQUIRED MINIMUM DISTRIBUTION CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
function buildRMD() {
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"Required Minimum Distribution (RMD) Calculator 2026","url":`${DOMAIN}/required-minimum-distribution-calculator`,
    "description":"Calculate your Required Minimum Distribution (RMD) from IRA, 401k, or 403b using 2026 IRS Uniform Lifetime Table. See annual withdrawal amount and deadline.",
    "applicationCategory":"FinanceApplication","operatingSystem":"Any",
    "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
  });
  const faq = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"At what age do RMDs start in 2026?",
       "acceptedAnswer":{"@type":"Answer","text":"Under the SECURE 2.0 Act (2022), Required Minimum Distributions begin at age 73 for anyone born between 1951 and 1959, and at age 75 for anyone born in 1960 or later. If you were born before 1951, your RMDs were already required starting at age 72 or 70.5."}},
      {"@type":"Question","name":"How is the RMD amount calculated?",
       "acceptedAnswer":{"@type":"Answer","text":"RMD = Account balance (as of December 31 of prior year) ÷ IRS life expectancy factor from the Uniform Lifetime Table. Example: Age 73, balance $500,000, life expectancy factor 26.5 → RMD = $500,000 ÷ 26.5 = $18,868."}},
      {"@type":"Question","name":"What happens if I miss my RMD deadline?",
       "acceptedAnswer":{"@type":"Answer","text":"The penalty for missing an RMD was reduced by SECURE 2.0 from 50% to 25% of the missed amount. If you correct the missed RMD within the correction window (2 years), the penalty drops to 10%. Always take your RMD by December 31 (or April 1 of the following year for your first RMD)."}},
      {"@type":"Question","name":"Do Roth IRAs require RMDs?",
       "acceptedAnswer":{"@type":"Answer","text":"No. Roth IRAs have no RMDs during the owner's lifetime. Roth 401(k)s did have RMDs until SECURE 2.0 eliminated them starting in 2024. Inherited Roth IRAs have RMD rules that depend on when you inherited and your relationship to the original owner."}}
    ]
  });
  // IRS Uniform Lifetime Table (age: distribution period)
  const body = `<h1 class="calc-title" data-enter>RMD Calculator — Required Minimum Distribution <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your annual Required Minimum Distribution from IRA, 401(k), or 403(b) using the 2026 IRS Uniform Lifetime Table. Avoid the 25% penalty.</p>
<div class="calc-layout">
  <div class="calc-inputs">
    <div class="input-group">
      <label class="input-label" for="rmd-balance">Account Balance (Dec 31 prior year)</label>
      <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="rmd-balance" class="calc-input" value="500000" min="1000" step="1000"></div>
    </div>
    <div class="input-group">
      <label class="input-label" for="rmd-age">Your Age (as of Dec 31 this year)</label>
      <input type="number" id="rmd-age" class="calc-input" value="73" min="70" max="115" step="1">
    </div>
    <div class="input-group">
      <label class="input-label" for="rmd-type">Account Type</label>
      <select id="rmd-type" class="calc-select">
        <option value="ira" selected>Traditional IRA</option>
        <option value="401k">401(k) / 403(b)</option>
        <option value="roth401k">Roth 401(k)</option>
        <option value="rothira">Roth IRA</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label" for="rmd-tax-rate">Tax Rate on Withdrawals</label>
      <div class="input-prefix-wrap"><input type="number" id="rmd-tax-rate" class="calc-input" value="22" min="0" max="37" step="1"><span class="input-suffix">%</span></div>
    </div>
    <button class="calc-btn" onclick="calcRMD()">Calculate RMD</button>
  </div>
  <div class="calc-results">
    <div class="result-card" id="rmd-main-card">
      <div class="result-big" id="rmd-amount">$18,868</div>
      <div class="result-label">Required Minimum Distribution</div>
      <div class="result-sub" id="rmd-deadline">Must withdraw by December 31</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="rmd-factor">26.5</div><div class="stat-lbl">Life Expectancy Factor</div></div>
      <div class="stat-card"><div class="stat-num" id="rmd-pct">3.77%</div><div class="stat-lbl">% of Balance</div></div>
      <div class="stat-card"><div class="stat-num" id="rmd-after-tax">$14,717</div><div class="stat-lbl">After-Tax Amount</div></div>
    </div>
    <div class="calc-card">
      <div class="breakdown-row"><span>Account Balance</span><span class="val" id="rmd-s-bal">$500,000</span></div>
      <div class="breakdown-row"><span>Your Age</span><span class="val" id="rmd-s-age">73</span></div>
      <div class="breakdown-row"><span>IRS Life Expectancy Factor</span><span class="val" id="rmd-s-factor">26.5</span></div>
      <div class="breakdown-row"><span>RMD Amount</span><span class="val" id="rmd-s-rmd">$18,868</span></div>
      <div class="breakdown-row"><span>Tax Rate</span><span class="val" id="rmd-s-tax">22%</span></div>
      <div class="breakdown-row"><span>Taxes Owed on RMD</span><span class="val" id="rmd-s-taxes">$4,151</span></div>
      <div class="highlight-row"><span>After-Tax Amount</span><span id="rmd-s-net">$14,717</span></div>
    </div>
    <div id="rmd-exempt-notice" style="display:none;background:#dcfce7;border:1px solid #86efac;border-radius:10px;padding:14px;margin-top:12px;font-size:13px;color:#15803d">
      <strong>No RMD Required:</strong> <span id="rmd-exempt-msg"></span>
    </div>
    <div class="calc-card" style="margin-top:12px">
      <div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">RMD Ages (SECURE 2.0)</div>
      <div class="breakdown-row"><span>Born before 1951</span><span class="val">RMDs started at 70.5 / 72</span></div>
      <div class="breakdown-row"><span>Born 1951–1959</span><span class="val">RMDs start at age 73</span></div>
      <div class="breakdown-row"><span>Born 1960 or later</span><span class="val">RMDs start at age 75</span></div>
    </div>
  </div>
</div>
<div class="calc-article">
  <h2>What Is a Required Minimum Distribution?</h2>
  <p>The IRS requires you to withdraw a minimum amount from traditional IRAs and employer retirement plans (401k, 403b) each year starting at age 73 (75 if born after 1959). The purpose is to ensure tax-deferred retirement savings eventually get taxed.</p>
  <h3>RMD Formula</h3>
  <p><strong>RMD = Prior year-end balance ÷ IRS life expectancy factor</strong></p>
  <p>The life expectancy factor comes from the IRS Uniform Lifetime Table (Publication 590-B). At age 73, the factor is 26.5. At 80, it's 20.2. The older you get, the smaller the factor — and the larger the percentage you must withdraw.</p>
  <h3>Penalty for Missing RMDs</h3>
  <p>Missing your RMD deadline triggers a 25% excise tax on the amount not withdrawn. If you fix the missed RMD within 2 years (the correction window), the penalty drops to 10%. Always take your RMD before December 31 — first-year RMDs can be delayed to April 1 of the following year.</p>
  <h3>Strategies to Reduce RMD Tax Impact</h3>
  <ul>
    <li><strong>Roth conversions</strong> before RMDs begin — convert pre-tax IRA funds to Roth while in a lower bracket</li>
    <li><strong>Qualified Charitable Distribution (QCD)</strong> — donate up to $105,000/year from IRA directly to charity; counts toward RMD and is not taxable income</li>
    <li><strong>Delay Social Security</strong> — lower income in early retirement years can mean lower tax on Roth conversions</li>
  </ul>
</div>`;

  const html = wrap(
    'required-minimum-distribution-calculator',
    'RMD Calculator 2026 | Required Minimum Distribution from IRA & 401k',
    'Calculate your Required Minimum Distribution (RMD) from IRA or 401k using 2026 IRS Uniform Lifetime Table. Avoid the 25% penalty by knowing your exact amount.',
    schema, faq, '', body
  );

  // IRS Uniform Lifetime Table 2026 (simplified)
  return html.replace('</body>', `<script>
var ULT={70:27.4,71:26.5,72:25.6,73:24.7,74:23.8,75:22.9,76:22.0,77:21.2,78:20.3,79:19.5,80:18.7,81:17.9,82:17.1,83:16.3,84:15.5,85:14.8,86:14.1,87:13.4,88:12.7,89:12.0,90:11.4,91:10.8,92:10.2,93:9.6,94:9.1,95:8.6,96:8.1,97:7.6,98:7.1,99:6.7,100:6.3,101:5.9,102:5.5,103:5.2,104:4.9,105:4.6,106:4.3,107:4.1,108:3.9,109:3.7,110:3.5,111:3.4,112:3.3,113:3.1,114:3.0,115:2.9};
function fmt(n){return '$'+Math.round(n).toLocaleString();}
function calcRMD(){
  var bal=parseFloat(document.getElementById('rmd-balance').value)||500000;
  var age=parseInt(document.getElementById('rmd-age').value)||73;
  var type=document.getElementById('rmd-type').value;
  var taxRate=parseFloat(document.getElementById('rmd-tax-rate').value)/100;
  var card=document.getElementById('rmd-main-card');
  var notice=document.getElementById('rmd-exempt-notice');
  var msgEl=document.getElementById('rmd-exempt-msg');
  if(type==='rothira'){
    notice.style.display='block';msgEl.textContent='Roth IRAs have no RMDs during the owner\'s lifetime.';
    card.style.opacity='0.4';return;
  }
  if(type==='roth401k'){
    notice.style.display='block';msgEl.textContent='Roth 401(k) accounts have no RMDs starting in 2024 (SECURE 2.0).';
    card.style.opacity='0.4';return;
  }
  notice.style.display='none';card.style.opacity='1';
  if(age<73){notice.style.display='block';msgEl.textContent='RMDs do not apply until age 73 (or 75 if born in 1960+). No withdrawal required yet.';card.style.opacity='0.4';return;}
  var factor=ULT[age]||ULT[115];
  var rmd=bal/factor;
  var taxes=rmd*taxRate;
  var afterTax=rmd-taxes;
  var pct=rmd/bal*100;
  document.getElementById('rmd-amount').textContent=fmt(rmd);
  document.getElementById('rmd-factor').textContent=factor;
  document.getElementById('rmd-pct').textContent=pct.toFixed(2)+'%';
  document.getElementById('rmd-after-tax').textContent=fmt(afterTax);
  document.getElementById('rmd-s-bal').textContent=fmt(bal);
  document.getElementById('rmd-s-age').textContent=age;
  document.getElementById('rmd-s-factor').textContent=factor;
  document.getElementById('rmd-s-rmd').textContent=fmt(rmd);
  document.getElementById('rmd-s-tax').textContent=Math.round(taxRate*100)+'%';
  document.getElementById('rmd-s-taxes').textContent=fmt(taxes);
  document.getElementById('rmd-s-net').textContent=fmt(afterTax);
  document.getElementById('rmd-deadline').textContent='Must withdraw '+fmt(rmd)+' by December 31';
}
document.addEventListener('DOMContentLoaded',calcRMD);
document.querySelectorAll('#rmd-balance,#rmd-age,#rmd-tax-rate').forEach(function(el){el.addEventListener('input',calcRMD);});
document.getElementById('rmd-type').addEventListener('change',calcRMD);
</script></body>`);
}

// ── Write all files ───────────────────────────────────────────────────────────
console.log('Building 7 new calculators...\n');

var pages = [
  ['home-equity-loan-calculator.html', buildHomeEquity()],
  ['heloc-calculator.html', buildHELOC()],
  ['sba-loan-calculator.html', buildSBA()],
  ['capital-gains-tax-calculator.html', buildCapGains()],
  ['mileage-reimbursement-calculator.html', buildMileage()],
  ['business-valuation-calculator.html', buildBizVal()],
  ['required-minimum-distribution-calculator.html', buildRMD()]
];

pages.forEach(function([file, html]) {
  fs.writeFileSync(B + file, html);
  console.log('  ✓ ' + file + ' — ' + (html.length/1024).toFixed(0) + 'KB');
});

console.log('\n✅ Done — 7 pages written. Run node _build_sitemap.js to update sitemap.');
