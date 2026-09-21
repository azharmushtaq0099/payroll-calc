/**
 * Batch 3b: debt consolidation, roth ira conversion, ARM, section 179, IRA rollover, 529
 * node _build_new_tools_3b.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';
const DOMAIN = 'https://www.freepayrollcalc.com';

const NAV = `<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search tools"><div class="cmd-modal"><div class="cmd-search-row"><span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span><input class="cmd-input" id="cmd-input" type="text" placeholder="Search 70+ tools..." autocomplete="off" spellcheck="false"><kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd></div><div class="cmd-body" id="cmd-body"></div><div class="cmd-footer"><span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span><span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span><span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span></div></div></div>
<header class="site-header"><div class="container header-inner"><a href="/" class="site-logo">FreePayrollCalc</a>
<nav class="main-nav" aria-label="Main">
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Payroll <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/payroll-tax-calculator" class="nav-item">Payroll Tax</a><a href="/take-home-pay-calculator" class="nav-item">Take-Home Pay</a><a href="/salary-to-hourly-calculator" class="nav-item">Salary to Hourly</a><a href="/net-to-gross-calculator" class="nav-item">Net to Gross</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Tax <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/self-employment-tax-calculator" class="nav-item">Self-Employment Tax</a><a href="/capital-gains-tax-calculator" class="nav-item">Capital Gains Tax</a><a href="/income-tax-calculator" class="nav-item">Income Tax</a><a href="/section-179-deduction-calculator" class="nav-item">Section 179</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Home &amp; RE <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/mortgage-calculator" class="nav-item">Mortgage</a><a href="/mortgage-affordability-calculator" class="nav-item">Affordability</a><a href="/adjustable-rate-mortgage-calculator" class="nav-item">ARM Calculator</a><a href="/property-tax-calculator" class="nav-item">Property Tax</a><a href="/closing-costs-calculator" class="nav-item">Closing Costs</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Loans <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/student-loan-repayment-calculator" class="nav-item">Student Loans</a><a href="/auto-refinance-calculator" class="nav-item">Auto Refinance</a><a href="/debt-consolidation-calculator" class="nav-item">Debt Consolidation</a><a href="/car-loan-calculator" class="nav-item">Car Loan</a><a href="/personal-loan-calculator" class="nav-item">Personal Loan</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Retirement <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/social-security-benefits-calculator" class="nav-item">Social Security</a><a href="/how-long-will-my-money-last-calculator" class="nav-item">Money Last</a><a href="/roth-ira-conversion-calculator" class="nav-item">Roth Conversion</a><a href="/ira-rollover-calculator" class="nav-item">IRA Rollover</a><a href="/roth-ira-calculator" class="nav-item">Roth IRA</a><a href="/pension-calculator" class="nav-item">Pension</a></div></div>
</nav>
<div class="header-actions"><button class="btn-search" id="btn-search" aria-label="Search tools"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button><a href="/tools" class="btn-all-tools">All Tools</a></div>
</div></header>`;

const FTR = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreePayrollCalc</a><p class="footer-tagline">Free financial calculators. No sign-up required.</p></div><div><div class="footer-col-title">Retirement</div><nav class="footer-nav"><a href="/social-security-benefits-calculator">Social Security</a><a href="/roth-ira-conversion-calculator">Roth Conversion</a><a href="/how-long-will-my-money-last-calculator">Money Last</a><a href="/savings-goal-calculator">Savings Goal</a></nav></div><div><div class="footer-col-title">Loans</div><nav class="footer-nav"><a href="/student-loan-repayment-calculator">Student Loans</a><a href="/auto-refinance-calculator">Auto Refinance</a><a href="/debt-consolidation-calculator">Debt Consolidation</a><a href="/car-loan-calculator">Car Loan</a></nav></div><div><div class="footer-col-title">Tools</div><nav class="footer-nav"><a href="/rate-of-return-calculator">Rate of Return</a><a href="/section-179-deduction-calculator">Section 179</a><a href="/529-college-savings-calculator">529 Savings</a><a href="/ira-rollover-calculator">IRA Rollover</a></nav></div></div><div class="footer-bottom"><p>&copy; 2026 FreePayrollCalc.com &mdash; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a></p><p class="footer-disclaimer">For informational purposes only. Not financial advice.</p></div></div></footer>`;

const CSS = `.result-card{background:linear-gradient(135deg,rgba(27,79,216,.07),rgba(27,79,216,.02));border:2px solid rgba(27,79,216,.2);border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}.result-big{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}.result-label{font-size:13px;font-weight:700;color:var(--ink-2)}.result-sub{font-size:12px;color:var(--ink-3);margin-top:4px}.stat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}@media(max-width:640px){.stat-grid{grid-template-columns:1fr 1fr}}.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}.stat-num{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink-1);line-height:1;margin-bottom:3px}.stat-lbl{font-size:11px;color:var(--ink-3);font-weight:600}.breakdown-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);font-size:13px}.breakdown-row:last-child{border-bottom:none}.breakdown-row .val{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--ink-1)}.highlight-row{background:rgba(27,79,216,.04);border-radius:8px;padding:10px 14px;margin-top:4px;display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:var(--accent)}.debt-input-row{display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:8px;margin-bottom:8px;align-items:end}@media(max-width:640px){.debt-input-row{grid-template-columns:1fr 1fr;gap:6px}}`;

function wrap(slug,title,desc,schema,faqSchema,body){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="icon" href="/shared/favicon.svg" type="image/svg+xml"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${DOMAIN}/${slug}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta name="robots" content="index,follow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=9"><script type="application/ld+json">${schema}<\/script>${faqSchema?`<script type="application/ld+json">${faqSchema}<\/script>`:''}<style>${CSS}</style></head><body>${NAV}<main class="calc-page"><div class="container"><nav class="calc-breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">${title.split('|')[0].trim()}</span></nav><div class="ad-zone ad-zone--leaderboard"></div>${body}</div></main>${FTR}<script src="/shared/scripts.js?v=6" defer><\/script></body></html>`;
}

// ─── 7. DEBT CONSOLIDATION CALCULATOR ────────────────────────────────────────
var dcHtml = wrap('debt-consolidation-calculator',
  'Debt Consolidation Calculator 2026 | Compare Monthly Savings',
  'See if debt consolidation saves you money. Enter up to 5 debts and a consolidation loan rate to compare monthly payments, total interest, and payoff timeline.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Debt Consolidation Calculator 2026","url":`${DOMAIN}/debt-consolidation-calculator`,"description":"Compare the cost of keeping your current debts vs consolidating into a single loan. See monthly payment reduction, total interest saved, and payoff date comparison.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When does debt consolidation make sense?","acceptedAnswer":{"@type":"Answer","text":"Debt consolidation makes sense when: the consolidation loan rate is lower than your current average rate, you can qualify for the loan, and you won't accumulate new debt on the freed-up credit cards. It's especially effective for high-rate credit card debt (20-30% APR) consolidated into a personal loan at 8-15%."}},{"@type":"Question","name":"Does debt consolidation hurt your credit?","acceptedAnswer":{"@type":"Answer","text":"Short-term: yes, slightly. The hard inquiry and new account lower your average account age. Long-term: potentially yes, if it reduces your credit utilization (paying off revolving debt with an installment loan can be positive). Avoid closing paid-off credit cards, as this reduces your available credit and can raise utilization."}},{"@type":"Question","name":"What is the average interest rate on a debt consolidation loan?","acceptedAnswer":{"@type":"Answer","text":"In 2026, personal loan rates for debt consolidation range from about 6-8% for excellent credit (720+ FICO) to 15-25% for fair credit (580-660). Credit unions typically offer lower rates than banks. Some balance transfer cards offer 0% APR for 12-21 months, which can be better than a personal loan for amounts under $10,000."}},{"@type":"Question","name":"Is a balance transfer better than a personal loan for debt consolidation?","acceptedAnswer":{"@type":"Answer","text":"Balance transfers with 0% intro APR periods (12-21 months) are often the best option for smaller balances you can pay off within the promo period — you pay zero interest. For larger balances or if you need more than 21 months to pay off, a personal loan at a fixed low rate is usually better."}}]}),
  `<h1 class="calc-title" data-enter>Debt Consolidation Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Enter your current debts and a potential consolidation loan rate. See side-by-side totals to decide if consolidating saves you money.</p>
<div class="calc-layout"><div class="calc-inputs">
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Your Current Debts</div>
<div id="dc-debts">
<div class="debt-input-row"><div><div class="input-label" style="font-size:11px">Debt Name</div><input type="text" class="calc-input" placeholder="Credit Card 1" style="font-size:13px;padding:8px 10px"></div><div><div class="input-label" style="font-size:11px">Balance</div><input type="number" class="calc-input" placeholder="5000" value="5000" style="font-size:13px;padding:8px 10px"></div><div><div class="input-label" style="font-size:11px">APR %</div><input type="number" class="calc-input" placeholder="22" value="22.9" step="0.1" style="font-size:13px;padding:8px 10px"></div><div style="padding-top:18px"><input type="number" class="calc-input" placeholder="Min $" style="font-size:13px;padding:8px 10px;width:70px" title="Min payment (optional)"></div></div>
<div class="debt-input-row"><div><input type="text" class="calc-input" placeholder="Credit Card 2" style="font-size:13px;padding:8px 10px"></div><div><input type="number" class="calc-input" placeholder="3000" value="3200" style="font-size:13px;padding:8px 10px"></div><div><input type="number" class="calc-input" placeholder="APR" value="19.99" step="0.1" style="font-size:13px;padding:8px 10px"></div><div><input type="number" class="calc-input" placeholder="Min $" style="font-size:13px;padding:8px 10px;width:70px"></div></div>
<div class="debt-input-row"><div><input type="text" class="calc-input" placeholder="Personal Loan" style="font-size:13px;padding:8px 10px"></div><div><input type="number" class="calc-input" placeholder="0" value="0" style="font-size:13px;padding:8px 10px"></div><div><input type="number" class="calc-input" placeholder="APR" value="12" step="0.1" style="font-size:13px;padding:8px 10px"></div><div><input type="number" class="calc-input" placeholder="Min $" style="font-size:13px;padding:8px 10px;width:70px"></div></div>
</div>
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin:16px 0 8px;text-transform:uppercase;letter-spacing:.05em">Consolidation Loan</div>
<div class="input-group"><label class="input-label" for="dc-new-rate">New Loan APR</label><div class="input-prefix-wrap"><input type="number" id="dc-new-rate" class="calc-input" value="10.5" min="1" max="30" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="dc-new-term">Repayment Term</label><select id="dc-new-term" class="calc-select"><option value="24">2 years</option><option value="36" selected>3 years</option><option value="48">4 years</option><option value="60">5 years</option><option value="72">6 years</option></select></div>
<button class="calc-btn" onclick="calcDC()">Compare Options</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="dc-result">$264</div><div class="result-label">Monthly Savings</div><div class="result-sub" id="dc-sub">Consolidated vs minimum payments</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="dc-cur-pmt">$424</div><div class="stat-lbl">Current Min Payments</div></div>
<div class="stat-card"><div class="stat-num" id="dc-new-pmt">$266</div><div class="stat-lbl">New Consolidated Payment</div></div>
<div class="stat-card"><div class="stat-num" id="dc-int-saved">$2,840</div><div class="stat-lbl">Interest Saved</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Total Debt Balance</span><span class="val" id="dc-total-bal">$8,200</span></div>
<div class="breakdown-row"><span>Current Total Interest</span><span class="val" id="dc-cur-int">—</span></div>
<div class="breakdown-row"><span>Consolidated Total Interest</span><span class="val" id="dc-new-int">—</span></div>
<div class="breakdown-row"><span>Payoff Time (current min pmts)</span><span class="val" id="dc-cur-time">—</span></div>
<div class="breakdown-row"><span>Payoff Time (consolidated)</span><span class="val" id="dc-new-time">—</span></div>
<div class="highlight-row"><span>Net Interest Saved</span><span id="dc-net-saved">—</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Debt Consolidation Strategies Compared</h2><p><strong>Personal loan:</strong> Fixed rate, fixed term. Best for amounts over $5,000 where you need more than 21 months. Apply at credit unions first — they often have rates 2-5% lower than banks for members.</p><p><strong>0% balance transfer card:</strong> No interest for 12-21 months. Best for under $15,000 if you can pay it off within the promo period. Transfer fee is typically 3-5% of the amount. After the promo period ends, the rate jumps to 20-30%+.</p><p><strong>Home equity loan / HELOC:</strong> Lowest rates (prime + 0-2%), but your home is collateral. Best for large amounts ($20,000+) if you have equity. Risk: if you default, you lose your home.</p><p><strong>Debt management plan (nonprofit):</strong> Credit counseling agencies can negotiate rates down to 5-9%. No loan needed — they handle payments. Takes 3-5 years. Won't hurt credit as much as settlement.</p></div>`
);
dcHtml = dcHtml.replace('</body>', `<script>
function fmtDC(n){return '$'+Math.round(n).toLocaleString();}
function pmtDC(P,r,n){if(r===0)return P/n;return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function calcDC(){
  var rows=document.querySelectorAll('#dc-debts .debt-input-row');
  var debts=[];
  rows.forEach(function(row){
    var inputs=row.querySelectorAll('input[type=number]');
    var bal=parseFloat(inputs[0]&&inputs[0].value)||0;
    var apr=parseFloat(inputs[1]&&inputs[1].value)||0;
    if(bal>0&&apr>0)debts.push({bal:bal,apr:apr/100/12});
  });
  if(!debts.length)return;
  var totalBal=debts.reduce(function(s,d){return s+d.bal;},0);
  var curMinPmts=debts.reduce(function(s,d){return s+Math.max(d.bal*0.02,25,pmtDC(d.bal,d.apr,60));},0);
  var curTotalInt=0;
  debts.forEach(function(d){
    var mo=0,bal=d.bal,maxMo=600;
    var mp=Math.max(d.bal*0.02,25,pmtDC(d.bal,d.apr,60));
    while(bal>0.01&&mo<maxMo){bal=bal*(1+d.apr)-mp;mo++;}
    curTotalInt+=Math.max(0,mp*mo-d.bal);
  });
  var newR=parseFloat(document.getElementById('dc-new-rate').value)/100/12;
  var newN=parseInt(document.getElementById('dc-new-term').value)||36;
  var newPmt=pmtDC(totalBal,newR,newN);
  var newTotalInt=newPmt*newN-totalBal;
  var intSaved=curTotalInt-newTotalInt;
  var moSave=curMinPmts-newPmt;
  var curMoApprox=0;
  debts.forEach(function(d){var mp=Math.max(d.bal*0.02,25,pmtDC(d.bal,d.apr,60));var bal=d.bal,mo=0;while(bal>0.01&&mo<600){bal=bal*(1+d.apr)-mp;mo++;}curMoApprox=Math.max(curMoApprox,mo);});
  document.getElementById('dc-result').textContent=fmtDC(Math.abs(moSave));
  document.getElementById('dc-sub').textContent=moSave>=0?'You save '+fmtDC(moSave)+'/month by consolidating':'Your payment increases by '+fmtDC(-moSave)+'/month (shorter payoff)';
  document.getElementById('dc-cur-pmt').textContent=fmtDC(curMinPmts);
  document.getElementById('dc-new-pmt').textContent=fmtDC(newPmt);
  document.getElementById('dc-int-saved').textContent=fmtDC(Math.max(0,intSaved));
  document.getElementById('dc-total-bal').textContent=fmtDC(totalBal);
  document.getElementById('dc-cur-int').textContent=fmtDC(curTotalInt);
  document.getElementById('dc-new-int').textContent=fmtDC(Math.max(0,newTotalInt));
  document.getElementById('dc-cur-time').textContent=Math.ceil(curMoApprox/12)+' yrs';
  document.getElementById('dc-new-time').textContent=Math.ceil(newN/12)+' yrs';
  document.getElementById('dc-net-saved').textContent=fmtDC(intSaved);
}
calcDC();
<\/script></body>`);
fs.writeFileSync(B+'debt-consolidation-calculator.html', dcHtml);
console.log('Built: debt-consolidation-calculator');

// ─── 8. ROTH IRA CONVERSION CALCULATOR ───────────────────────────────────────
var rcHtml = wrap('roth-ira-conversion-calculator',
  'Roth IRA Conversion Calculator 2026 | Tax Cost & Future Value',
  'Calculate the tax cost of converting a Traditional IRA to a Roth IRA and see if the long-term tax-free growth justifies the conversion. 2026 tax brackets included.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Roth IRA Conversion Calculator 2026","url":`${DOMAIN}/roth-ira-conversion-calculator`,"description":"Calculate the upfront tax cost of a Roth IRA conversion and compare long-term after-tax wealth under Roth vs Traditional IRA with 2026 federal tax brackets.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When should you convert a Traditional IRA to a Roth?","acceptedAnswer":{"@type":"Answer","text":"Conversion makes most sense when: (1) you're in a lower tax bracket now than you expect to be in retirement, (2) you have cash outside the IRA to pay the conversion taxes so the full amount stays invested, (3) you have many years until retirement for tax-free growth to compound, or (4) you want to avoid Required Minimum Distributions (Roth IRAs have no RMDs during your lifetime)."}},{"@type":"Question","name":"How much do I owe in taxes on a Roth conversion?","acceptedAnswer":{"@type":"Answer","text":"The converted amount is added to your ordinary taxable income for the year. If you're in the 22% bracket and convert $30,000, you'll owe approximately $6,600 in federal taxes (plus state taxes if applicable). The entire converted amount is taxed at your marginal rates — it can push you into higher brackets."}},{"@type":"Question","name":"What is a backdoor Roth IRA conversion?","acceptedAnswer":{"@type":"Answer","text":"The backdoor Roth is for high earners who exceed Roth IRA income limits ($161,000 single / $240,000 MFJ in 2026). The strategy: (1) make a non-deductible contribution to a Traditional IRA, (2) immediately convert it to a Roth. Since the contribution was after-tax, only any earnings are taxable. The pro-rata rule applies if you have other Traditional IRA balances."}},{"@type":"Question","name":"What are the Roth IRA income limits for 2026?","acceptedAnswer":{"@type":"Answer","text":"For 2026, Roth IRA contributions phase out for single filers between $150,000-$165,000 MAGI and for married filing jointly between $236,000-$246,000 MAGI. Above these limits you cannot contribute directly but can use the backdoor Roth strategy."}}]}),
  `<h1 class="calc-title" data-enter>Roth IRA Conversion Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Find the tax cost of converting your Traditional IRA to a Roth, and compare the long-term after-tax value of Roth vs keeping it Traditional.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="rc-amount">Conversion Amount</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="rc-amount" class="calc-input" value="50000" min="1000" max="1000000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="rc-income">Other Taxable Income (before conversion)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="rc-income" class="calc-input" value="75000" min="0" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="rc-filing">Filing Status</label><select id="rc-filing" class="calc-select"><option value="single" selected>Single</option><option value="mfj">Married Filing Jointly</option></select></div>
<div class="input-group"><label class="input-label" for="rc-years">Years Until Withdrawal</label><input type="number" id="rc-years" class="calc-input" value="20" min="1" max="40" step="1"></div>
<div class="input-group"><label class="input-label" for="rc-return">Expected Annual Return</label><div class="input-prefix-wrap"><input type="number" id="rc-return" class="calc-input" value="7" min="1" max="15" step="0.5"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="rc-retrate">Estimated Retirement Tax Rate</label><div class="input-prefix-wrap"><input type="number" id="rc-retrate" class="calc-input" value="22" min="0" max="37" step="1"><span class="input-suffix">%</span></div></div>
<button class="calc-btn" onclick="calcRC()">Calculate Conversion</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="rc-result">$11,000</div><div class="result-label">Estimated Tax on Conversion</div><div class="result-sub" id="rc-sub">Marginal rate on converted amount</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="rc-roth-fv">$193,484</div><div class="stat-lbl">Roth Value (tax-free)</div></div>
<div class="stat-card"><div class="stat-num" id="rc-trad-fv">$150,917</div><div class="stat-lbl">Traditional (after-tax)</div></div>
<div class="stat-card"><div class="stat-num" id="rc-advantage">$42,567</div><div class="stat-lbl">Roth Advantage</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Conversion Amount</span><span class="val" id="rc-s-amt">$50,000</span></div>
<div class="breakdown-row"><span>Tax Owed Now</span><span class="val" id="rc-s-tax">$11,000</span></div>
<div class="breakdown-row"><span>Effective Rate on Conversion</span><span class="val" id="rc-s-eff">22.0%</span></div>
<div class="breakdown-row"><span>Roth Future Value (tax-free)</span><span class="val" id="rc-s-roth">$193,484</span></div>
<div class="breakdown-row"><span>Traditional Future Value (after-tax)</span><span class="val" id="rc-s-trad">$150,917</span></div>
<div class="highlight-row"><span>Roth Advantage After Taxes</span><span id="rc-s-adv">$42,567</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Is a Roth Conversion Right for You?</h2><p>The key question: will your tax rate be higher or lower in retirement? If you expect your rate to be higher in retirement (RMDs pushing you into a higher bracket, Social Security becoming taxable), converting now at a lower rate saves money long-term. If you expect to be in a lower bracket in retirement, the Traditional IRA may be better.</p><h3>Partial Conversions — The Smart Strategy</h3><p>Rather than converting everything at once, many advisors recommend converting only up to the top of your current bracket. For example, if you're at $75,000 income and the 22% bracket tops out at $103,350, you have $28,350 of "room" to convert at 22% without spilling into the 24% bracket.</p><p>Roth conversions are also irreversible as of 2018 — you can no longer "recharacterize" a conversion back to a Traditional IRA if markets drop.</p></div>`
);
rcHtml = rcHtml.replace('</body>', `<script>
function fmtRC(n){return '$'+Math.round(n).toLocaleString();}
function calcRC(){
  var amt=parseFloat(document.getElementById('rc-amount').value)||50000;
  var inc=parseFloat(document.getElementById('rc-income').value)||75000;
  var filing=document.getElementById('rc-filing').value;
  var yrs=parseInt(document.getElementById('rc-years').value)||20;
  var ret=parseFloat(document.getElementById('rc-return').value)/100;
  var retRate=parseFloat(document.getElementById('rc-retrate').value)/100;
  var singleB=[[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[9999999,.37]];
  var mfjB=[[23850,.10],[96950,.12],[206700,.22],[394600,.24],[501050,.32],[751600,.35],[9999999,.37]];
  var brackets=filing==='mfj'?mfjB:singleB;
  function fedTax(income){var t=0,prev=0;for(var i=0;i<brackets.length;i++){var top=brackets[i][0],r=brackets[i][1];if(income<=top){t+=(income-prev)*r;break;}t+=(top-prev)*r;prev=top;}return t;}
  var taxBefore=fedTax(inc);
  var taxAfter=fedTax(inc+amt);
  var convTax=taxAfter-taxBefore;
  var effRate=convTax/amt;
  var rothFV=amt*Math.pow(1+ret,yrs);
  var tradFV=amt*Math.pow(1+ret,yrs)*(1-retRate);
  var advantage=rothFV-tradFV;
  document.getElementById('rc-result').textContent=fmtRC(convTax);
  document.getElementById('rc-sub').textContent='Effective rate: '+Math.round(effRate*1000)/10+'% on converted amount';
  document.getElementById('rc-roth-fv').textContent=fmtRC(rothFV);
  document.getElementById('rc-trad-fv').textContent=fmtRC(tradFV);
  document.getElementById('rc-advantage').textContent=fmtRC(advantage);
  document.getElementById('rc-s-amt').textContent=fmtRC(amt);
  document.getElementById('rc-s-tax').textContent=fmtRC(convTax);
  document.getElementById('rc-s-eff').textContent=Math.round(effRate*1000)/10+'%';
  document.getElementById('rc-s-roth').textContent=fmtRC(rothFV);
  document.getElementById('rc-s-trad').textContent=fmtRC(tradFV);
  document.getElementById('rc-s-adv').textContent=fmtRC(advantage);
}
calcRC();
<\/script></body>`);
fs.writeFileSync(B+'roth-ira-conversion-calculator.html', rcHtml);
console.log('Built: roth-ira-conversion-calculator');

// ─── 9. ADJUSTABLE RATE MORTGAGE CALCULATOR ──────────────────────────────────
var armHtml = wrap('adjustable-rate-mortgage-calculator',
  'Adjustable Rate Mortgage Calculator 2026 | ARM vs Fixed Payment',
  'Calculate ARM payments across all adjustment periods. See your worst-case scenario and compare total cost vs a fixed-rate mortgage over the same term.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Adjustable Rate Mortgage Calculator 2026","url":`${DOMAIN}/adjustable-rate-mortgage-calculator`,"description":"Calculate adjustable rate mortgage (ARM) payments for 5/1, 7/1, and 10/1 ARMs. See initial, adjusted, and worst-case payments vs a 30-year fixed rate mortgage.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a 5/1 ARM mortgage?","acceptedAnswer":{"@type":"Answer","text":"A 5/1 ARM has a fixed interest rate for the first 5 years, then adjusts annually (the '1') based on a reference index (like SOFR) plus a margin. If the index rises, your rate rises. Most 5/1 ARMs have caps: typically 2% per adjustment period and 5% lifetime above the initial rate."}},{"@type":"Question","name":"When does an ARM make sense?","acceptedAnswer":{"@type":"Answer","text":"ARMs make sense when: (1) you plan to sell or refinance before the fixed period ends, (2) the initial ARM rate is significantly lower than fixed rates and you want lower payments now, (3) you expect interest rates to fall, making future adjustments favorable. They're riskier for long-term owners in rising-rate environments."}},{"@type":"Question","name":"What is the typical ARM cap structure?","acceptedAnswer":{"@type":"Answer","text":"Most ARMs use a 2/2/5 or 5/2/5 cap structure. The first number is the initial adjustment cap (how much the rate can jump at first reset), the second is the periodic cap (per-adjustment limit), and the third is the lifetime cap. A 5/1 ARM at 6% with 2/2/5 caps could reach a maximum of 11%."}},{"@type":"Question","name":"How much lower is an ARM rate vs a fixed rate?","acceptedAnswer":{"@type":"Answer","text":"Historically, a 5/1 ARM is 0.5-1.5% lower than a 30-year fixed at origination. In 2026, a 30-year fixed is around 6.5-7% while a 5/1 ARM may be 5.5-6.5%. On a $400,000 loan, that's $150-$300/month lower during the initial period — but that advantage disappears if rates rise after the fixed period."}}]}),
  `<h1 class="calc-title" data-enter>Adjustable Rate Mortgage Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate ARM payments across all phases — initial fixed period, adjustment caps, and worst-case maximum rate. Compare vs a 30-year fixed mortgage.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="arm-loan">Loan Amount</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="arm-loan" class="calc-input" value="400000" min="50000" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="arm-type">ARM Type</label><select id="arm-type" class="calc-select" onchange="calcARM()"><option value="5">5/1 ARM (fixed 5 yrs)</option><option value="7">7/1 ARM (fixed 7 yrs)</option><option value="10">10/1 ARM (fixed 10 yrs)</option></select></div>
<div class="input-group"><label class="input-label" for="arm-init-rate">Initial ARM Rate</label><div class="input-prefix-wrap"><input type="number" id="arm-init-rate" class="calc-input" value="5.875" min="1" max="15" step="0.125"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="arm-fixed-rate">30-Year Fixed Rate (to compare)</label><div class="input-prefix-wrap"><input type="number" id="arm-fixed-rate" class="calc-input" value="6.875" min="1" max="15" step="0.125"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="arm-caps">Cap Structure</label><select id="arm-caps" class="calc-select"><option value="2/2/5" selected>2/2/5 (most common)</option><option value="5/2/5">5/2/5</option><option value="2/1/5">2/1/5</option></select></div>
<div class="input-group"><label class="input-label" for="arm-index">Index + Margin (current estimate)</label><div class="input-prefix-wrap"><input type="number" id="arm-index" class="calc-input" value="7.5" min="1" max="15" step="0.25"><span class="input-suffix">%</span></div><div class="input-hint">SOFR (~5%) + margin (2-3%) = fully-indexed rate</div></div>
<button class="calc-btn" onclick="calcARM()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="arm-result">$2,362</div><div class="result-label">Initial Monthly Payment</div><div class="result-sub" id="arm-sub">Fixed for 5 years, then adjusts</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="arm-fixed-pmt">$2,631</div><div class="stat-lbl">Fixed-Rate Payment</div></div>
<div class="stat-card"><div class="stat-num" id="arm-worst">$3,200</div><div class="stat-lbl">Worst-Case Payment</div></div>
<div class="stat-card"><div class="stat-num" id="arm-savings5">$16,140</div><div class="stat-lbl">Savings (fixed period)</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Initial Rate / Payment</span><span class="val" id="arm-s-init">5.875% / $2,362</span></div>
<div class="breakdown-row"><span>First Adjustment (fully indexed)</span><span class="val" id="arm-s-adj1">—</span></div>
<div class="breakdown-row"><span>Cap Structure</span><span class="val" id="arm-s-caps">2/2/5</span></div>
<div class="breakdown-row"><span>Max Rate (lifetime cap)</span><span class="val" id="arm-s-max-rate">10.875%</span></div>
<div class="breakdown-row"><span>Worst-Case Payment</span><span class="val" id="arm-s-worst">$3,200</span></div>
<div class="highlight-row"><span>vs Fixed: 5-yr Savings</span><span id="arm-s-save">$16,140</span></div>
</div>
</div></div>
<div class="calc-article"><h2>ARM vs Fixed: When to Choose Each</h2><p><strong>Choose an ARM if:</strong> You plan to sell or refinance within the fixed period (5, 7, or 10 years). The payment savings during the initial period can be substantial — $200-$400/month on a typical loan — and if you're gone before the first adjustment, you capture all that savings with zero rate risk.</p><p><strong>Choose a fixed rate if:</strong> You plan to stay long-term (10+ years), you prefer payment certainty for budgeting, or you believe rates will rise significantly. The peace of mind of knowing your payment forever has real value.</p><p><strong>The break-even math:</strong> If an ARM saves you $250/month for 5 years ($15,000 total) but your first adjustment raises the payment by $300/month, you need to stay just 50 more months post-adjustment before the fixed rate would have been cheaper overall.</p></div>`
);
armHtml = armHtml.replace('</body>', `<script>
function fmtARM(n){return '$'+Math.round(n).toLocaleString();}
function pmtARM(P,r,n){if(r===0)return P/n;return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function calcARM(){
  var loan=parseFloat(document.getElementById('arm-loan').value)||400000;
  var fixYrs=parseInt(document.getElementById('arm-type').value)||5;
  var initRate=parseFloat(document.getElementById('arm-init-rate').value)/100;
  var fixedRate=parseFloat(document.getElementById('arm-fixed-rate').value)/100;
  var caps=document.getElementById('arm-caps').value.split('/').map(Number);
  var indexRate=parseFloat(document.getElementById('arm-index').value)/100;
  var totalMo=360;
  var initPmt=pmtARM(loan,initRate/12,totalMo);
  var fixedPmt=pmtARM(loan,fixedRate/12,totalMo);
  var savingsPeriod=(fixedPmt-initPmt)*fixYrs*12;
  var balAfterFixed=loan;
  for(var i=0;i<fixYrs*12;i++){balAfterFixed=balAfterFixed*(1+initRate/12)-initPmt;}
  var adj1Rate=Math.min(initRate+caps[0]/100,indexRate);
  adj1Rate=Math.min(adj1Rate,initRate+caps[2]/100);
  var moLeft=totalMo-fixYrs*12;
  var adj1Pmt=pmtARM(balAfterFixed,adj1Rate/12,moLeft);
  var maxRate=Math.min(initRate+caps[2]/100,0.20);
  var worstPmt=pmtARM(balAfterFixed,maxRate/12,moLeft);
  document.getElementById('arm-result').textContent=fmtARM(initPmt);
  document.getElementById('arm-sub').textContent='Fixed for '+fixYrs+' years at '+initRate*100+'%, then adjusts annually';
  document.getElementById('arm-fixed-pmt').textContent=fmtARM(fixedPmt);
  document.getElementById('arm-worst').textContent=fmtARM(worstPmt);
  document.getElementById('arm-savings5').textContent=fmtARM(savingsPeriod);
  document.getElementById('arm-s-init').textContent=(initRate*100).toFixed(3)+'% / '+fmtARM(initPmt);
  document.getElementById('arm-s-adj1').textContent=(adj1Rate*100).toFixed(3)+'% / '+fmtARM(adj1Pmt);
  document.getElementById('arm-s-caps').textContent=document.getElementById('arm-caps').value;
  document.getElementById('arm-s-max-rate').textContent=(maxRate*100).toFixed(3)+'%';
  document.getElementById('arm-s-worst').textContent=fmtARM(worstPmt);
  document.getElementById('arm-s-save').textContent=fmtARM(savingsPeriod);
}
calcARM();
<\/script></body>`);
fs.writeFileSync(B+'adjustable-rate-mortgage-calculator.html', armHtml);
console.log('Built: adjustable-rate-mortgage-calculator');

// ─── 10. SECTION 179 DEDUCTION CALCULATOR ────────────────────────────────────
var s179Html = wrap('section-179-deduction-calculator',
  'Section 179 Deduction Calculator 2026 | Business Equipment Tax Savings',
  'Calculate your Section 179 deduction and actual tax savings for business equipment purchases. 2026 limits: $1,220,000 deduction, $3,050,000 phase-out.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Section 179 Deduction Calculator 2026","url":`${DOMAIN}/section-179-deduction-calculator`,"description":"Calculate the Section 179 deduction for business equipment in 2026. Enter your equipment cost and taxable income to see your deduction, tax savings, and net equipment cost.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the Section 179 deduction limit for 2026?","acceptedAnswer":{"@type":"Answer","text":"The Section 179 deduction limit for 2026 is $1,220,000. The phase-out begins at $3,050,000 in total equipment purchases — for every dollar above $3,050,000, the deduction limit is reduced dollar-for-dollar. The deduction cannot exceed your business taxable income (though unused deductions can carry forward)."}},{"@type":"Question","name":"What equipment qualifies for Section 179?","acceptedAnswer":{"@type":"Answer","text":"Qualifying property includes: machinery, equipment, computers, office furniture, vehicles (with limitations), off-the-shelf software, and improvements to commercial property (HVAC, security, roofing, fire protection). Vehicles over 6,000 lbs GVWR have a higher deduction limit than standard passenger vehicles."}},{"@type":"Question","name":"What is bonus depreciation and how does it differ from Section 179?","acceptedAnswer":{"@type":"Answer","text":"Bonus depreciation allows you to deduct a percentage of an asset's cost in the first year — 40% for assets placed in service in 2026 (phasing down from 100% in 2022). Unlike Section 179, bonus depreciation can create or increase a net operating loss. Section 179 is limited to business income; bonus depreciation is not. They can be combined on the same asset."}},{"@type":"Question","name":"Can I use Section 179 on a vehicle?","acceptedAnswer":{"@type":"Answer","text":"Yes, with limits. Passenger vehicles (under 6,000 lbs GVWR) are capped at $12,400 for 2026 (luxury auto limits). SUVs between 6,001-14,000 lbs have a $30,500 Section 179 cap. Vehicles over 14,000 lbs (heavy work trucks) have no Section 179 limit and can be deducted in full."}}]}),
  `<h1 class="calc-title" data-enter>Section 179 Deduction Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your 2026 Section 179 deduction for business equipment. See your tax savings and the net after-tax cost of the equipment.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="s179-cost">Total Equipment / Asset Cost</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="s179-cost" class="calc-input" value="75000" min="1000" max="5000000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="s179-business-pct">Business Use Percentage</label><div class="input-prefix-wrap"><input type="number" id="s179-business-pct" class="calc-input" value="100" min="1" max="100" step="1"><span class="input-suffix">%</span></div><div class="input-hint">For mixed personal/business use (e.g. vehicle), enter % business use</div></div>
<div class="input-group"><label class="input-label" for="s179-income">Business Taxable Income (before deduction)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="s179-income" class="calc-input" value="200000" min="0" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="s179-tax-rate">Effective Tax Rate (federal + state)</label><div class="input-prefix-wrap"><input type="number" id="s179-tax-rate" class="calc-input" value="32" min="0" max="60" step="1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="s179-bonus">Also Claim Bonus Depreciation?</label><select id="s179-bonus" class="calc-select"><option value="yes">Yes — 40% bonus depreciation on remainder</option><option value="no" selected>No — straight-line on remainder</option></select></div>
<button class="calc-btn" onclick="calcS179()">Calculate Tax Savings</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="s179-result">$24,000</div><div class="result-label">Tax Savings This Year</div><div class="result-sub" id="s179-sub">Net equipment cost after deductions</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="s179-deduction">$75,000</div><div class="stat-lbl">Section 179 Deduction</div></div>
<div class="stat-card"><div class="stat-num" id="s179-bonus-ded">$0</div><div class="stat-lbl">Bonus Depreciation</div></div>
<div class="stat-card"><div class="stat-num" id="s179-net-cost">$51,000</div><div class="stat-lbl">Net Equipment Cost</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Equipment Cost</span><span class="val" id="s179-s-cost">$75,000</span></div>
<div class="breakdown-row"><span>Section 179 Deduction</span><span class="val" id="s179-s-ded">$75,000</span></div>
<div class="breakdown-row"><span>Bonus Depreciation (40%)</span><span class="val" id="s179-s-bonus">$0</span></div>
<div class="breakdown-row"><span>Total First-Year Write-Off</span><span class="val" id="s179-s-total-ded">$75,000</span></div>
<div class="breakdown-row"><span>Tax Savings</span><span class="val" id="s179-s-savings">$24,000</span></div>
<div class="highlight-row"><span>Net After-Tax Equipment Cost</span><span id="s179-s-net">$51,000</span></div>
</div>
</div></div>
<div class="calc-article"><h2>2026 Section 179 Key Numbers</h2><p><strong>Deduction limit:</strong> $1,220,000 &nbsp;|&nbsp; <strong>Phase-out threshold:</strong> $3,050,000 &nbsp;|&nbsp; <strong>Bonus depreciation:</strong> 40%</p><p>Section 179 is one of the most powerful tax tools for small businesses. Rather than depreciating equipment over 5-7 years, you deduct the full cost in year one — dramatically reducing your tax bill and improving cash flow in the year of purchase.</p><h3>Key Restrictions to Know</h3><ul style="padding-left:20px;line-height:1.8"><li>Deduction cannot exceed business taxable income (unused amount carries forward)</li><li>Must be placed in service during the tax year — ordered but not delivered doesn't count</li><li>Real property (land, buildings) does not qualify for Section 179 directly, but certain improvements do</li><li>Listed property (vehicles, cameras, etc.) used under 50% for business reverts to MACRS depreciation</li></ul></div>`
);
s179Html = s179Html.replace('</body>', `<script>
function fmtS179(n){return '$'+Math.round(n).toLocaleString();}
function calcS179(){
  var cost=parseFloat(document.getElementById('s179-cost').value)||75000;
  var bPct=parseFloat(document.getElementById('s179-business-pct').value)/100||1;
  var income=parseFloat(document.getElementById('s179-income').value)||200000;
  var taxRate=parseFloat(document.getElementById('s179-tax-rate').value)/100||0.32;
  var useBonus=document.getElementById('s179-bonus').value==='yes';
  var bizCost=cost*bPct;
  var limit179=1220000;
  var phaseOut=3050000;
  if(bizCost>phaseOut)limit179=Math.max(0,limit179-(bizCost-phaseOut));
  var ded179=Math.min(bizCost,limit179,income);
  var remainder=bizCost-ded179;
  var bonusDed=useBonus?remainder*0.40:0;
  var totalDed=ded179+bonusDed;
  var savings=totalDed*taxRate;
  var netCost=cost-savings;
  document.getElementById('s179-result').textContent=fmtS179(savings);
  document.getElementById('s179-sub').textContent='Net cost after deduction: '+fmtS179(netCost);
  document.getElementById('s179-deduction').textContent=fmtS179(ded179);
  document.getElementById('s179-bonus-ded').textContent=fmtS179(bonusDed);
  document.getElementById('s179-net-cost').textContent=fmtS179(netCost);
  document.getElementById('s179-s-cost').textContent=fmtS179(cost);
  document.getElementById('s179-s-ded').textContent=fmtS179(ded179);
  document.getElementById('s179-s-bonus').textContent=fmtS179(bonusDed);
  document.getElementById('s179-s-total-ded').textContent=fmtS179(totalDed);
  document.getElementById('s179-s-savings').textContent=fmtS179(savings);
  document.getElementById('s179-s-net').textContent=fmtS179(netCost);
}
calcS179();
<\/script></body>`);
fs.writeFileSync(B+'section-179-deduction-calculator.html', s179Html);
console.log('Built: section-179-deduction-calculator');

// ─── 11. IRA ROLLOVER CALCULATOR ─────────────────────────────────────────────
var irHtml = wrap('ira-rollover-calculator',
  'IRA Rollover Calculator 2026 | Tax Impact & Withholding Penalty',
  'Calculate the tax impact of an IRA rollover. Compare direct vs indirect rollover, see the 20% withholding penalty cost, and estimate your net rollover amount.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"IRA Rollover Calculator 2026","url":`${DOMAIN}/ira-rollover-calculator`,"description":"Calculate the tax and penalty impact of an IRA rollover. Shows the cost of indirect rollovers with 20% withholding, 10% early withdrawal penalty, and direct rollover comparison.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between a direct and indirect IRA rollover?","acceptedAnswer":{"@type":"Answer","text":"A direct rollover (trustee-to-trustee transfer) moves money directly from one retirement account to another. No taxes are withheld, and there's no 60-day deadline. An indirect rollover sends the check to you — the payer must withhold 20% for federal taxes. You have 60 days to deposit the full original amount (including the withheld 20%, which you must fund from other sources) into the new IRA or it's treated as a distribution."}},{"@type":"Question","name":"What is the 60-day IRA rollover rule?","acceptedAnswer":{"@type":"Answer","text":"For indirect rollovers, you have 60 days from receiving the funds to deposit them into another qualified retirement account. If you miss the 60-day window, the distribution is treated as taxable income and, if you're under 59½, subject to the 10% early withdrawal penalty. The IRS may grant waivers for medical emergencies or natural disasters."}},{"@type":"Question","name":"How many IRA rollovers can you do per year?","acceptedAnswer":{"@type":"Answer","text":"You're limited to one indirect (60-day) rollover per 12-month period across all your IRAs. This limit doesn't apply to direct trustee-to-trustee transfers, which are unlimited. Rollovers from employer plans (401k, 403b) to IRAs also don't count toward this limit."}},{"@type":"Question","name":"Can I roll over a 401k to a Roth IRA?","acceptedAnswer":{"@type":"Answer","text":"Yes — this is a Roth conversion rollover. The amount rolled from a pre-tax 401k to a Roth IRA is fully taxable as ordinary income in the year of the rollover. There's no 10% penalty regardless of age when the source is a 401k and the rollover goes directly to the Roth IRA. The converted amount adds to your taxable income for that year."}}]}),
  `<h1 class="calc-title" data-enter>IRA Rollover Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate the cost of an indirect IRA rollover with 20% withholding, and see how much you'd lose to taxes and penalties vs a direct (trustee-to-trustee) rollover.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="ir-balance">Account Balance to Roll Over</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ir-balance" class="calc-input" value="85000" min="1000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="ir-age">Your Age</label><input type="number" id="ir-age" class="calc-input" value="45" min="18" max="75" step="1"></div>
<div class="input-group"><label class="input-label" for="ir-income">Other Income (excluding rollover)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ir-income" class="calc-input" value="70000" min="0" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="ir-state-rate">State Income Tax Rate</label><div class="input-prefix-wrap"><input type="number" id="ir-state-rate" class="calc-input" value="5" min="0" max="15" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="ir-scenario">Scenario</label><select id="ir-scenario" class="calc-select"><option value="direct">Direct Rollover (trustee-to-trustee)</option><option value="indirect_complete">Indirect — Completed within 60 days (funded gap yourself)</option><option value="indirect_miss">Indirect — Missed 60-day window (full distribution)</option></select></div>
<button class="calc-btn" onclick="calcIR()">Calculate Impact</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="ir-result">$0</div><div class="result-label" id="ir-result-label">Taxes & Penalties</div><div class="result-sub" id="ir-sub">Direct rollover: no taxes owed</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="ir-withhold">$0</div><div class="stat-lbl">Amount Withheld (20%)</div></div>
<div class="stat-card"><div class="stat-num" id="ir-penalty">$0</div><div class="stat-lbl">Early Withdrawal Penalty</div></div>
<div class="stat-card"><div class="stat-num" id="ir-net-rolled">$85,000</div><div class="stat-lbl">Net Amount Rolled Over</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Starting Balance</span><span class="val" id="ir-s-bal">$85,000</span></div>
<div class="breakdown-row"><span>Federal Tax on Distribution</span><span class="val" id="ir-s-fed">$0</span></div>
<div class="breakdown-row"><span>State Tax</span><span class="val" id="ir-s-state">$0</span></div>
<div class="breakdown-row"><span>10% Early Withdrawal Penalty</span><span class="val" id="ir-s-pen">$0</span></div>
<div class="breakdown-row"><span>Total Lost to Taxes/Penalties</span><span class="val" id="ir-s-total-lost">$0</span></div>
<div class="highlight-row"><span>Net Amount in New Account</span><span id="ir-s-net">$85,000</span></div>
</div>
</div></div>
<div class="calc-article"><h2>The Right Way to Roll Over a Retirement Account</h2><p><strong>Always use a direct rollover (trustee-to-trustee transfer)</strong> when possible. Request your current custodian to send the funds directly to the new custodian — you never touch the money, no taxes are withheld, there's no 60-day deadline, and no risk of error.</p><h3>Indirect Rollover Traps</h3><p>If you take an indirect rollover from a 401k, your employer must withhold 20% for federal taxes. To avoid any tax, you must deposit 100% of the original balance (including the 20% that was withheld) within 60 days. If you can only deposit what you received, the withheld 20% is treated as a distribution — taxable income plus a 10% penalty if you're under 59½.</p><p>Example: $85,000 401k, indirect rollover. You receive $68,000 (after 20% withholding). To complete a tax-free rollover, you must deposit $85,000. If you only deposit $68,000, the $17,000 is a taxable distribution.</p></div>`
);
irHtml = irHtml.replace('</body>', `<script>
function fmtIR(n){return '$'+Math.round(n).toLocaleString();}
function calcIR(){
  var bal=parseFloat(document.getElementById('ir-balance').value)||85000;
  var age=parseInt(document.getElementById('ir-age').value)||45;
  var income=parseFloat(document.getElementById('ir-income').value)||70000;
  var stateR=parseFloat(document.getElementById('ir-state-rate').value)/100||0;
  var scenario=document.getElementById('ir-scenario').value;
  var brackets=[[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[9999999,.37]];
  function fedTax(inc){var t=0,p=0;for(var i=0;i<brackets.length;i++){var top=brackets[i][0],r=brackets[i][1];if(inc<=top){t+=(inc-p)*r;break;}t+=(top-p)*r;p=top;}return t;}
  if(scenario==='direct'){
    document.getElementById('ir-result').textContent='$0';
    document.getElementById('ir-result-label').textContent='No Taxes or Penalties';
    document.getElementById('ir-sub').textContent='Direct rollover: the full '+fmtIR(bal)+' rolls over tax-free';
    document.getElementById('ir-withhold').textContent='$0';
    document.getElementById('ir-penalty').textContent='$0';
    document.getElementById('ir-net-rolled').textContent=fmtIR(bal);
    document.getElementById('ir-s-bal').textContent=fmtIR(bal);
    document.getElementById('ir-s-fed').textContent='$0';
    document.getElementById('ir-s-state').textContent='$0';
    document.getElementById('ir-s-pen').textContent='$0';
    document.getElementById('ir-s-total-lost').textContent='$0';
    document.getElementById('ir-s-net').textContent=fmtIR(bal);
  } else if(scenario==='indirect_complete'){
    var withhold=bal*0.20;
    document.getElementById('ir-result').textContent='$0 taxes due';
    document.getElementById('ir-result-label').textContent='Taxes Due (if you fund the gap)';
    document.getElementById('ir-sub').textContent='You must deposit '+fmtIR(bal)+' within 60 days; '+fmtIR(withhold)+' must come from your own funds';
    document.getElementById('ir-withhold').textContent=fmtIR(withhold);
    document.getElementById('ir-penalty').textContent='$0';
    document.getElementById('ir-net-rolled').textContent=fmtIR(bal);
    document.getElementById('ir-s-bal').textContent=fmtIR(bal);
    document.getElementById('ir-s-fed').textContent='$0 (refunded at tax time)';
    document.getElementById('ir-s-state').textContent='$0';
    document.getElementById('ir-s-pen').textContent='$0';
    document.getElementById('ir-s-total-lost').textContent='$0 net (withholding refunded)';
    document.getElementById('ir-s-net').textContent=fmtIR(bal);
  } else {
    var withhold2=bal*0.20;
    var taxableAmt=bal;
    var totalInc=income+taxableAmt;
    var fedBefore=fedTax(income);
    var fedAfter=fedTax(totalInc);
    var fedDue=fedAfter-fedBefore;
    var stateDue=taxableAmt*stateR;
    var penalty=age<59.5?taxableAmt*0.10:0;
    var totalLost=fedDue+stateDue+penalty;
    var netReceived=bal-totalLost;
    document.getElementById('ir-result').textContent=fmtIR(totalLost);
    document.getElementById('ir-result-label').textContent='Total Lost to Taxes & Penalties';
    document.getElementById('ir-sub').textContent='Net amount remaining after all taxes: '+fmtIR(netReceived);
    document.getElementById('ir-withhold').textContent=fmtIR(withhold2);
    document.getElementById('ir-penalty').textContent=fmtIR(penalty);
    document.getElementById('ir-net-rolled').textContent=fmtIR(netReceived);
    document.getElementById('ir-s-bal').textContent=fmtIR(bal);
    document.getElementById('ir-s-fed').textContent=fmtIR(fedDue);
    document.getElementById('ir-s-state').textContent=fmtIR(stateDue);
    document.getElementById('ir-s-pen').textContent=fmtIR(penalty);
    document.getElementById('ir-s-total-lost').textContent=fmtIR(totalLost);
    document.getElementById('ir-s-net').textContent=fmtIR(netReceived);
  }
}
calcIR();
<\/script></body>`);
fs.writeFileSync(B+'ira-rollover-calculator.html', irHtml);
console.log('Built: ira-rollover-calculator');

// ─── 12. 529 COLLEGE SAVINGS CALCULATOR ──────────────────────────────────────
var c529Html = wrap('529-college-savings-calculator',
  '529 College Savings Calculator 2026 | Monthly Contributions Needed',
  'Calculate how much to save monthly in a 529 plan to cover college costs. See projected tuition inflation, your savings gap, and state tax deduction benefits.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"529 College Savings Calculator 2026","url":`${DOMAIN}/529-college-savings-calculator`,"description":"Calculate required 529 plan contributions to meet future college costs. Accounts for tuition inflation, investment returns, and state tax deductions on contributions.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much should I save in a 529 plan per month?","acceptedAnswer":{"@type":"Answer","text":"It depends on the child's age, target school, and contribution start date. For a newborn aiming at a 4-year public university (current cost ~$110,000 total), saving $300-$400/month at 7% return over 18 years typically covers the full cost. For a private university ($270,000+), $700-$900/month. The earlier you start, the less you need monthly."}},{"@type":"Question","name":"What is the 529 contribution limit for 2026?","acceptedAnswer":{"@type":"Answer","text":"There is no annual federal contribution limit for 529 plans. Contributions are treated as gifts for tax purposes — the annual gift tax exclusion is $18,000 per donor per beneficiary in 2026. Superfunding allows 5 years of contributions at once ($90,000 per person, $180,000 for couples) without gift tax implications."}},{"@type":"Question","name":"What expenses does a 529 plan cover?","acceptedAnswer":{"@type":"Answer","text":"529 qualified expenses include: tuition, fees, books, supplies, room and board, computers and software, and K-12 tuition up to $10,000/year. SECURE 2.0 (2024) added: apprenticeship programs and up to $35,000 in Roth IRA rollovers for unused 529 funds (after 15 years). Non-qualified withdrawals are subject to income tax plus a 10% penalty on earnings."}},{"@type":"Question","name":"Is a 529 plan worth it?","acceptedAnswer":{"@type":"Answer","text":"Yes for most families. Tax-free growth on decades of investment is significant — at 7% over 18 years, $300/month grows to $117,000 vs ~$78,000 in a taxable account (assuming 24% rate on gains). Many states also offer a state income tax deduction on contributions, which is an immediate return on investment. The 10% penalty on non-qualified withdrawals is a real risk if the child gets a scholarship or doesn't go to college, but the new Roth IRA rollover option provides a safety valve."}}]}),
  `<h1 class="calc-title" data-enter>529 College Savings Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate how much to save each month to cover projected college costs. Accounts for tuition inflation and investment growth over your savings horizon.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="c529-child-age">Child's Current Age</label><input type="number" id="c529-child-age" class="calc-input" value="3" min="0" max="17" step="1"></div>
<div class="input-group"><label class="input-label" for="c529-school">Target School Type</label><select id="c529-school" class="calc-select" onchange="calcC529()"><option value="110000">Public University (4-yr, ~$110,000 today)</option><option value="160000">Out-of-State Public (~$160,000 today)</option><option value="270000" selected>Private University (~$270,000 today)</option><option value="80000">Community College + Transfer (~$80,000 today)</option></select></div>
<div class="input-group"><label class="input-label" for="c529-current-saved">Amount Already Saved</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="c529-current-saved" class="calc-input" value="5000" min="0" step="500"></div></div>
<div class="input-group"><label class="input-label" for="c529-coverage">Coverage Goal</label><select id="c529-coverage" class="calc-select"><option value="1">100% — Full coverage</option><option value="0.75">75% — Save most, expect some loans/aid</option><option value="0.50" selected>50% — Partial coverage</option><option value="0.25">25% — Supplement aid/loans</option></select></div>
<div class="input-group"><label class="input-label" for="c529-return">Expected Annual Return</label><div class="input-prefix-wrap"><input type="number" id="c529-return" class="calc-input" value="7" min="1" max="12" step="0.5"><span class="input-suffix">%</span></div><div class="input-hint">Age-based 529 portfolios: ~7% early, ~4% near college</div></div>
<div class="input-group"><label class="input-label" for="c529-inflation">College Tuition Inflation Rate</label><div class="input-prefix-wrap"><input type="number" id="c529-inflation" class="calc-input" value="4.5" min="1" max="10" step="0.5"><span class="input-suffix">%</span></div><div class="input-hint">Historical average: ~4-5% annually</div></div>
<div class="input-group"><label class="input-label" for="c529-state-ded">State Tax Deduction on Contributions?</label><select id="c529-state-ded" class="calc-select"><option value="0" selected>No state deduction (or N/A)</option><option value="0.04">4% state income tax</option><option value="0.05">5% state income tax</option><option value="0.06">6% state income tax</option><option value="0.07">7% state income tax</option></select></div>
<button class="calc-btn" onclick="calcC529()">Calculate Monthly Savings</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="c529-result">$487</div><div class="result-label">Monthly Savings Needed</div><div class="result-sub" id="c529-sub">To cover 50% of projected college cost</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="c529-projected">$663,000</div><div class="stat-lbl">Projected College Cost</div></div>
<div class="stat-card"><div class="stat-num" id="c529-target">$331,500</div><div class="stat-lbl">Your Coverage Goal</div></div>
<div class="stat-card"><div class="stat-num" id="c529-years-left">15 yrs</div><div class="stat-lbl">Years to Save</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Today's College Cost (chosen)</span><span class="val" id="c529-s-today">$270,000</span></div>
<div class="breakdown-row"><span>Projected Cost (tuition inflation)</span><span class="val" id="c529-s-projected">$663,000</span></div>
<div class="breakdown-row"><span>Coverage Goal</span><span class="val" id="c529-s-target">50%</span></div>
<div class="breakdown-row"><span>Amount to Accumulate</span><span class="val" id="c529-s-need">$331,500</span></div>
<div class="breakdown-row"><span>Current Savings (future value)</span><span class="val" id="c529-s-cur-fv">$13,795</span></div>
<div class="highlight-row"><span>Monthly Contribution Needed</span><span id="c529-s-monthly">$487</span></div>
</div>
</div></div>
<div class="calc-article"><h2>529 Plan Tips to Maximize Your Savings</h2><p><strong>Start as early as possible.</strong> For a newborn, 18 years of compounding does most of the work — $300/month for 18 years at 7% is $117,000, but the same $300/month started at age 8 only grows to $50,000.</p><p><strong>Use age-based portfolios.</strong> Most 529 plans offer age-based options that automatically shift from aggressive (stocks) to conservative (bonds/cash) as college approaches. This prevents a market downturn in the year before college from devastating your balance.</p><p><strong>Check your state's tax deduction.</strong> Over 30 states offer a state income tax deduction or credit for 529 contributions. In a state with a 5% income tax and a $10,000 deduction cap, contributing $10,000/year saves $500 upfront — a guaranteed 5% return before investment gains.</p><p><strong>Grandparent contributions.</strong> Since 2024, grandparent-owned 529s no longer impact financial aid (FAFSA change). Grandparents can superfund ($90,000 one-time) without gift tax. This is one of the most efficient wealth transfer strategies available.</p></div>`
);
c529Html = c529Html.replace('</body>', `<script>
function fmtC529(n){return '$'+Math.round(n).toLocaleString();}
function calcC529(){
  var age=parseInt(document.getElementById('c529-child-age').value)||3;
  var todayCost=parseFloat(document.getElementById('c529-school').value)||270000;
  var cur=parseFloat(document.getElementById('c529-current-saved').value)||0;
  var coverage=parseFloat(document.getElementById('c529-coverage').value)||0.5;
  var ret=parseFloat(document.getElementById('c529-return').value)/100;
  var inf=parseFloat(document.getElementById('c529-inflation').value)/100;
  var stateDed=parseFloat(document.getElementById('c529-state-ded').value)||0;
  var yrs=18-age;
  var n=yrs*12;
  if(n<=0){document.getElementById('c529-result').textContent='Now!';return;}
  var projected=todayCost*Math.pow(1+inf,yrs);
  var goal=projected*coverage;
  var rMo=ret/12;
  var curFV=cur*Math.pow(1+rMo,n);
  var need=Math.max(0,goal-curFV);
  var mo=rMo>0?need*rMo/(Math.pow(1+rMo,n)-1):need/n;
  var stateBonus=mo*stateDed;
  var netMo=mo-stateBonus;
  document.getElementById('c529-result').textContent=fmtC529(mo);
  document.getElementById('c529-sub').textContent='To cover '+(coverage*100)+'% of projected cost in '+yrs+' years'+(stateDed>0?' ('+fmtC529(stateBonus)+'/mo state tax savings)':'');
  document.getElementById('c529-projected').textContent=fmtC529(projected);
  document.getElementById('c529-target').textContent=fmtC529(goal);
  document.getElementById('c529-years-left').textContent=yrs+' yrs';
  document.getElementById('c529-s-today').textContent=fmtC529(todayCost);
  document.getElementById('c529-s-projected').textContent=fmtC529(projected);
  document.getElementById('c529-s-target').textContent=(coverage*100)+'%';
  document.getElementById('c529-s-need').textContent=fmtC529(goal);
  document.getElementById('c529-s-cur-fv').textContent=fmtC529(curFV);
  document.getElementById('c529-s-monthly').textContent=fmtC529(mo);
}
calcC529();
<\/script></body>`);
fs.writeFileSync(B+'529-college-savings-calculator.html', c529Html);
console.log('Built: 529-college-savings-calculator');

console.log('\nBatch 3b complete — 6 pages built.');
