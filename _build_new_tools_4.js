/**
 * Batch 4: CD, credit card payoff, extra mortgage payment, 401k loan,
 *          balance transfer, parent PLUS loan, estate tax, dividend yield,
 *          total compensation, fuel savings
 * node _build_new_tools_4.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';
const DOMAIN = 'https://www.freepayrollcalc.xyz';

const NAV = `<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search tools"><div class="cmd-modal"><div class="cmd-search-row"><span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span><input class="cmd-input" id="cmd-input" type="text" placeholder="Search 150+ tools..." autocomplete="off" spellcheck="false"><kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd></div><div class="cmd-body" id="cmd-body"></div><div class="cmd-footer"><span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span><span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span><span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span></div></div></div>
<header class="site-header"><div class="container header-inner"><a href="/" class="site-logo">FreePayrollCalc</a>
<nav class="main-nav" aria-label="Main">
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Payroll <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/payroll-tax-calculator" class="nav-item">Payroll Tax</a><a href="/take-home-pay-calculator" class="nav-item">Take-Home Pay</a><a href="/salary-to-hourly-calculator" class="nav-item">Salary to Hourly</a><a href="/net-to-gross-calculator" class="nav-item">Net to Gross</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Tax <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/self-employment-tax-calculator" class="nav-item">Self-Employment Tax</a><a href="/income-tax-calculator" class="nav-item">Income Tax</a><a href="/estate-tax-calculator" class="nav-item">Estate Tax</a><a href="/section-179-deduction-calculator" class="nav-item">Section 179</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Loans <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/credit-card-payoff-calculator" class="nav-item">Credit Card Payoff</a><a href="/balance-transfer-calculator" class="nav-item">Balance Transfer</a><a href="/extra-mortgage-payment-calculator" class="nav-item">Extra Mortgage Payment</a><a href="/401k-loan-calculator" class="nav-item">401k Loan</a><a href="/parent-plus-loan-calculator" class="nav-item">Parent PLUS Loan</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Savings <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/cd-calculator" class="nav-item">CD Calculator</a><a href="/dividend-yield-calculator" class="nav-item">Dividend Yield</a><a href="/savings-goal-calculator" class="nav-item">Savings Goal</a><a href="/compound-interest-calculator" class="nav-item">Compound Interest</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Retirement <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/social-security-benefits-calculator" class="nav-item">Social Security</a><a href="/how-long-will-my-money-last-calculator" class="nav-item">Money Last</a><a href="/roth-ira-calculator" class="nav-item">Roth IRA</a><a href="/pension-calculator" class="nav-item">Pension</a></div></div>
</nav>
<div class="header-actions"><button class="btn-search" id="btn-search" aria-label="Search tools"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button><a href="/tools" class="btn-all-tools">All Tools</a></div>
</div></header>`;

const FTR = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreePayrollCalc</a><p class="footer-tagline">Free financial calculators. No sign-up required.</p></div><div><div class="footer-col-title">Savings & CD</div><nav class="footer-nav"><a href="/cd-calculator">CD Calculator</a><a href="/savings-goal-calculator">Savings Goal</a><a href="/compound-interest-calculator">Compound Interest</a><a href="/dividend-yield-calculator">Dividend Yield</a></nav></div><div><div class="footer-col-title">Loans & Debt</div><nav class="footer-nav"><a href="/credit-card-payoff-calculator">Credit Card Payoff</a><a href="/balance-transfer-calculator">Balance Transfer</a><a href="/extra-mortgage-payment-calculator">Extra Mortgage Payment</a><a href="/401k-loan-calculator">401k Loan</a></nav></div><div><div class="footer-col-title">Retirement</div><nav class="footer-nav"><a href="/social-security-benefits-calculator">Social Security</a><a href="/how-long-will-my-money-last-calculator">Money Last</a><a href="/roth-ira-calculator">Roth IRA</a><a href="/pension-calculator">Pension</a></nav></div></div><div class="footer-bottom"><p>&copy; 2026 FreePayrollCalc.xyz &mdash; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a></p><p class="footer-disclaimer">For informational purposes only. Not financial advice.</p></div></div></footer>`;

const CSS = `.result-card{background:linear-gradient(135deg,rgba(27,79,216,.07),rgba(27,79,216,.02));border:2px solid rgba(27,79,216,.2);border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}.result-big{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}.result-label{font-size:13px;font-weight:700;color:var(--ink-2)}.result-sub{font-size:12px;color:var(--ink-3);margin-top:4px}.stat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}@media(max-width:640px){.stat-grid{grid-template-columns:1fr 1fr}}.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}.stat-num{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink-1);line-height:1;margin-bottom:3px}.stat-lbl{font-size:11px;color:var(--ink-3);font-weight:600}.breakdown-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);font-size:13px}.breakdown-row:last-child{border-bottom:none}.breakdown-row .val{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--ink-1)}.highlight-row{background:rgba(27,79,216,.04);border-radius:8px;padding:10px 14px;margin-top:4px;display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:var(--accent)}`;

function wrap(slug,title,desc,schema,faqSchema,body){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="icon" href="/shared/favicon.svg" type="image/svg+xml"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${DOMAIN}/${slug}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta name="robots" content="index,follow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=6"><script type="application/ld+json">${schema}<\/script>${faqSchema?`<script type="application/ld+json">${faqSchema}<\/script>`:''}<style>${CSS}</style></head><body>${NAV}<main class="calc-page"><div class="container"><nav class="calc-breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">${title.split('|')[0].trim()}</span></nav><div class="ad-zone ad-zone--leaderboard"></div>${body}</div></main>${FTR}<script src="/shared/scripts.js?v=6" defer><\/script></body></html>`;
}

// ─── 1. CD CALCULATOR (165K vol) ─────────────────────────────────────────────
var cdHtml = wrap('cd-calculator',
  'CD Calculator 2026 | Certificate of Deposit Interest & APY',
  'Calculate certificate of deposit earnings with compound interest. See interest earned, APY vs APR, and compare CD laddering strategies across multiple terms.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"CD Calculator 2026","url":`${DOMAIN}/cd-calculator`,"description":"Calculate CD interest, APY, and maturity value for any certificate of deposit. Supports monthly, quarterly, and daily compounding.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a CD (Certificate of Deposit)?","acceptedAnswer":{"@type":"Answer","text":"A certificate of deposit (CD) is a savings product offered by banks and credit unions that pays a fixed interest rate for a specific term — typically 3 months to 5 years. In exchange for leaving your money untouched, you receive a higher rate than a regular savings account. Early withdrawal typically incurs a penalty."}},{"@type":"Question","name":"What is a good CD rate in 2026?","acceptedAnswer":{"@type":"Answer","text":"In 2026, competitive CD rates range from 4.0-5.5% APY for 6-month to 2-year terms at online banks and credit unions. Traditional brick-and-mortar banks often offer 0.5-2% lower rates. High-yield CDs from online banks (Ally, Marcus, Discover, etc.) consistently outperform national averages."}},{"@type":"Question","name":"What is APY vs APR on a CD?","acceptedAnswer":{"@type":"Answer","text":"APR (Annual Percentage Rate) is the stated interest rate. APY (Annual Percentage Yield) includes the effect of compounding and is always higher than or equal to APR. For daily compounding, a 5% APR becomes approximately 5.13% APY. Banks are required to advertise APY so you can compare apples to apples."}},{"@type":"Question","name":"What is CD laddering?","acceptedAnswer":{"@type":"Answer","text":"CD laddering is a strategy where you split your money across multiple CDs with different maturity dates (e.g., 3-month, 6-month, 1-year, 2-year, 3-year). As each CD matures, you reinvest at the current rate. This gives you regular access to funds while maximizing long-term yields and reducing reinvestment risk."}}]}),
  `<h1 class="calc-title" data-enter>CD Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate interest earned and APY on any certificate of deposit. Compare compounding frequencies and see your exact maturity value.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="cd-principal">Deposit Amount (Principal)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cd-principal" class="calc-input" value="10000" min="500" step="500"></div></div>
<div class="input-group"><label class="input-label" for="cd-rate">Annual Interest Rate (APR)</label><div class="input-prefix-wrap"><input type="number" id="cd-rate" class="calc-input" value="4.75" min="0.1" max="15" step="0.05"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="cd-term">CD Term</label><select id="cd-term" class="calc-select"><option value="0.25">3 months</option><option value="0.5">6 months</option><option value="1" selected>1 year</option><option value="1.5">18 months</option><option value="2">2 years</option><option value="3">3 years</option><option value="4">4 years</option><option value="5">5 years</option></select></div>
<div class="input-group"><label class="input-label" for="cd-compound">Compounding Frequency</label><select id="cd-compound" class="calc-select"><option value="365" selected>Daily</option><option value="12">Monthly</option><option value="4">Quarterly</option><option value="2">Semi-annually</option><option value="1">Annually</option></select></div>
<button class="calc-btn" onclick="calcCD()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="cd-result">$487</div><div class="result-label">Interest Earned</div><div class="result-sub" id="cd-sub">$10,487 at maturity (1 year at 4.75%)</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="cd-maturity">$10,487</div><div class="stat-lbl">Maturity Value</div></div>
<div class="stat-card"><div class="stat-num" id="cd-apy">4.86%</div><div class="stat-lbl">APY (with compounding)</div></div>
<div class="stat-card"><div class="stat-num" id="cd-monthly">$40.06</div><div class="stat-lbl">Interest / Month</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Principal</span><span class="val" id="cd-s-principal">$10,000</span></div>
<div class="breakdown-row"><span>APR (stated rate)</span><span class="val" id="cd-s-apr">4.75%</span></div>
<div class="breakdown-row"><span>APY (effective yield)</span><span class="val" id="cd-s-apy">4.86%</span></div>
<div class="breakdown-row"><span>CD Term</span><span class="val" id="cd-s-term">1 year</span></div>
<div class="breakdown-row"><span>Interest Earned</span><span class="val" id="cd-s-interest">$487</span></div>
<div class="highlight-row"><span>Maturity Value</span><span id="cd-s-maturity">$10,487</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Best CD Strategy in 2026</h2><p>With rates still elevated, locking in a 1-2 year CD at 4.5-5%+ makes sense for money you won't need soon. The key risk: if rates rise after you lock in, you're stuck at the lower rate (or pay an early withdrawal penalty to exit).</p><h3>CD Laddering — Beat the Rate Risk</h3><p>Instead of putting everything in one CD, split it across 5 CDs: 1-year, 2-year, 3-year, 4-year, and 5-year. Each year, as one matures, you reinvest at the current best rate. You always have access to 20% of your money every 12 months, and you average out the interest rate cycle.</p><h3>CD vs High-Yield Savings Account</h3><p>HYSAs offer flexibility (withdraw anytime) but rates are variable. CDs lock your rate for the term. If you're confident you won't need the money and rates are high, a CD wins. If you might need funds, HYSA gives you optionality.</p></div>`
);
cdHtml = cdHtml.replace('</body>', `<script>
function fmtCD(n){return '$'+(Math.round(n*100)/100).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0});}
function calcCD(){
  var P=parseFloat(document.getElementById('cd-principal').value)||10000;
  var r=parseFloat(document.getElementById('cd-rate').value)/100;
  var t=parseFloat(document.getElementById('cd-term').value)||1;
  var n=parseInt(document.getElementById('cd-compound').value)||365;
  var termLabel=document.getElementById('cd-term').options[document.getElementById('cd-term').selectedIndex].text;
  var FV=P*Math.pow(1+r/n,n*t);
  var interest=FV-P;
  var apy=Math.pow(1+r/n,n)-1;
  var moInterest=interest/(t*12);
  document.getElementById('cd-result').textContent=fmtCD(interest);
  document.getElementById('cd-sub').textContent=fmtCD(FV)+' at maturity ('+termLabel+' at '+r*100+'%)';
  document.getElementById('cd-maturity').textContent=fmtCD(FV);
  document.getElementById('cd-apy').textContent=Math.round(apy*10000)/100+'%';
  document.getElementById('cd-monthly').textContent='$'+(Math.round(moInterest*100)/100).toFixed(2);
  document.getElementById('cd-s-principal').textContent=fmtCD(P);
  document.getElementById('cd-s-apr').textContent=r*100+'%';
  document.getElementById('cd-s-apy').textContent=Math.round(apy*10000)/100+'%';
  document.getElementById('cd-s-term').textContent=termLabel;
  document.getElementById('cd-s-interest').textContent=fmtCD(interest);
  document.getElementById('cd-s-maturity').textContent=fmtCD(FV);
}
calcCD();
<\/script></body>`);
fs.writeFileSync(B+'cd-calculator.html',cdHtml);
console.log('Built: cd-calculator');

// ─── 2. CREDIT CARD PAYOFF CALCULATOR (27K vol) ───────────────────────────────
var ccHtml = wrap('credit-card-payoff-calculator',
  'Credit Card Payoff Calculator 2026 | Pay Off Date & Interest Saved',
  'Calculate how long to pay off your credit card and total interest paid. Compare minimum payments vs fixed payments vs avalanche/snowball strategies.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Credit Card Payoff Calculator 2026","url":`${DOMAIN}/credit-card-payoff-calculator`,"description":"See how long it takes to pay off your credit card balance and how much interest you'll pay. Compare minimum payment vs fixed payment strategies.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does it take to pay off a credit card with minimum payments?","acceptedAnswer":{"@type":"Answer","text":"Paying only the minimum on a $5,000 balance at 22% APR can take over 20 years and cost more than $7,000 in interest — more than the original balance. Minimum payments are typically 1-2% of the balance, which barely covers interest accruing each month."}},{"@type":"Question","name":"What is the avalanche method for paying off credit cards?","acceptedAnswer":{"@type":"Answer","text":"The avalanche method prioritizes paying off the card with the highest interest rate first while making minimum payments on others. This minimizes total interest paid. The snowball method (lowest balance first) pays less efficiently but provides psychological wins that motivate continued payoff."}},{"@type":"Question","name":"How much should I pay monthly to pay off my credit card in 1 year?","acceptedAnswer":{"@type":"Answer","text":"For a $5,000 balance at 22% APR, you need to pay about $471/month to be debt-free in 12 months. You'd pay approximately $650 in total interest. Use the calculator above to find the exact monthly payment for your balance, rate, and target payoff date."}},{"@type":"Question","name":"Does paying more than the minimum improve my credit score?","acceptedAnswer":{"@type":"Answer","text":"Yes, indirectly. Paying more than the minimum reduces your credit utilization ratio (balance ÷ credit limit), which is the second-largest factor in your credit score. Keeping utilization under 30% (ideally under 10%) significantly boosts your score."}}]}),
  `<h1 class="calc-title" data-enter>Credit Card Payoff Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">See how long it takes and how much it costs to pay off your credit card. Compare minimum payments vs a fixed monthly payment.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="cc-balance">Current Balance</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cc-balance" class="calc-input" value="5000" min="100" step="100"></div></div>
<div class="input-group"><label class="input-label" for="cc-apr">Annual Interest Rate (APR)</label><div class="input-prefix-wrap"><input type="number" id="cc-apr" class="calc-input" value="22.99" min="1" max="36" step="0.01"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="cc-mode">Payment Strategy</label><select id="cc-mode" class="calc-select" onchange="toggleCCMode()"><option value="fixed" selected>Fixed monthly payment</option><option value="minimum">Minimum payment only</option><option value="target">Pay off by target date</option></select></div>
<div class="input-group" id="cc-pmt-row"><label class="input-label" for="cc-payment">Monthly Payment</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cc-payment" class="calc-input" value="200" min="10" step="10"></div></div>
<div class="input-group" id="cc-months-row" style="display:none"><label class="input-label" for="cc-target-months">Pay Off In</label><select id="cc-target-months" class="calc-select"><option value="6">6 months</option><option value="12" selected>12 months</option><option value="18">18 months</option><option value="24">24 months</option><option value="36">36 months</option></select></div>
<button class="calc-btn" onclick="calcCC()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="cc-result">29 mo</div><div class="result-label" id="cc-result-label">Months to Pay Off</div><div class="result-sub" id="cc-sub">$5,000 at $200/month</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="cc-total-interest">$770</div><div class="stat-lbl">Total Interest</div></div>
<div class="stat-card"><div class="stat-num" id="cc-total-paid">$5,770</div><div class="stat-lbl">Total Paid</div></div>
<div class="stat-card"><div class="stat-num" id="cc-payoff-date">Jan 2029</div><div class="stat-lbl">Payoff Date</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Balance</span><span class="val" id="cc-s-bal">$5,000</span></div>
<div class="breakdown-row"><span>APR</span><span class="val" id="cc-s-apr">22.99%</span></div>
<div class="breakdown-row"><span>Monthly Payment</span><span class="val" id="cc-s-pmt">$200</span></div>
<div class="breakdown-row"><span>Months to Payoff</span><span class="val" id="cc-s-months">29</span></div>
<div class="breakdown-row"><span>Interest if Minimum Only</span><span class="val" id="cc-s-min-int">$7,400+</span></div>
<div class="highlight-row"><span>Interest Saved vs Minimum</span><span id="cc-s-saved">$6,630+</span></div>
</div>
</div></div>
<div class="calc-article"><h2>The True Cost of Minimum Payments</h2><p>Credit card companies set minimum payments low on purpose — it maximizes the interest you pay. On a $5,000 balance at 23% APR, making a $100 minimum payment takes <strong>8+ years</strong> and costs over $8,000 total. Doubling your payment cuts both the time and interest by more than half.</p><h3>Best Ways to Pay Off Credit Card Debt Faster</h3><ul style="padding-left:20px;line-height:1.9"><li><strong>Balance transfer:</strong> Move to a 0% intro APR card. You have 12-21 months of zero interest to pay down principal.</li><li><strong>Debt avalanche:</strong> Put every extra dollar toward the highest-rate card first. Mathematically optimal.</li><li><strong>Debt snowball:</strong> Pay smallest balance first for motivational wins. Costs slightly more interest but higher completion rates.</li><li><strong>Negotiate a lower rate:</strong> Call your issuer and ask. Customers with good payment history can often get 3-5% reductions.</li></ul></div>`
);
ccHtml = ccHtml.replace('</body>', `<script>
function fmtCC(n){return '$'+Math.round(n).toLocaleString();}
function toggleCCMode(){
  var m=document.getElementById('cc-mode').value;
  document.getElementById('cc-pmt-row').style.display=m==='target'?'none':'block';
  document.getElementById('cc-months-row').style.display=m==='target'?'block':'none';
  calcCC();
}
function calcCC(){
  var bal=parseFloat(document.getElementById('cc-balance').value)||5000;
  var apr=parseFloat(document.getElementById('cc-apr').value)/100/12;
  var mode=document.getElementById('cc-mode').value;
  var pmt,months,totalInt;
  if(mode==='minimum'){
    var b=bal,mo=0,tot=0;
    while(b>0.01&&mo<600){var mp=Math.max(b*0.02,25);tot+=mp;b=b*(1+apr)-mp;mo++;}
    pmt=Math.max(bal*0.02,25);months=mo;totalInt=tot-bal;
  } else if(mode==='target'){
    var n=parseInt(document.getElementById('cc-target-months').value)||12;
    pmt=apr>0?bal*apr*Math.pow(1+apr,n)/(Math.pow(1+apr,n)-1):bal/n;
    months=n;totalInt=pmt*n-bal;
  } else {
    pmt=parseFloat(document.getElementById('cc-payment').value)||200;
    var b2=bal,mo2=0,tot2=0;
    while(b2>0.01&&mo2<600){tot2+=Math.min(pmt,b2*(1+apr));b2=b2*(1+apr)-pmt;mo2++;}
    months=mo2;totalInt=tot2-bal;
  }
  var minInt=(function(){var b=bal,mo=0,tot=0;while(b>0.01&&mo<600){var mp=Math.max(b*0.02,25);tot+=mp;b=b*(1+apr)-mp;mo++;}return tot-bal;})();
  var d=new Date();d.setMonth(d.getMonth()+months);
  document.getElementById('cc-result').textContent=months<600?months+' mo':'20+ yrs';
  document.getElementById('cc-result-label').textContent=months<600?'Months to Pay Off':'Years to Pay Off';
  document.getElementById('cc-sub').textContent=fmtCC(bal)+' at '+fmtCC(pmt)+'/month ('+apr*1200+'% APR)';
  document.getElementById('cc-total-interest').textContent=fmtCC(Math.max(0,totalInt));
  document.getElementById('cc-total-paid').textContent=fmtCC(bal+Math.max(0,totalInt));
  document.getElementById('cc-payoff-date').textContent=months<600?d.toLocaleString('en-US',{month:'short',year:'numeric'}):'20+ yrs';
  document.getElementById('cc-s-bal').textContent=fmtCC(bal);
  document.getElementById('cc-s-apr').textContent=apr*1200+'%';
  document.getElementById('cc-s-pmt').textContent=fmtCC(pmt);
  document.getElementById('cc-s-months').textContent=months<600?months:'240+';
  document.getElementById('cc-s-min-int').textContent=fmtCC(minInt);
  document.getElementById('cc-s-saved').textContent=fmtCC(Math.max(0,minInt-totalInt));
}
calcCC();
<\/script></body>`);
fs.writeFileSync(B+'credit-card-payoff-calculator.html',ccHtml);
console.log('Built: credit-card-payoff-calculator');

// ─── 3. EXTRA MORTGAGE PAYMENT CALCULATOR (33K vol) ───────────────────────────
var empHtml = wrap('extra-mortgage-payment-calculator',
  'Extra Mortgage Payment Calculator 2026 | Interest Saved & Payoff Early',
  'Calculate how much interest you save and how many years you cut off your mortgage by making extra payments. Works for monthly, annual, or one-time extra payments.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Extra Mortgage Payment Calculator 2026","url":`${DOMAIN}/extra-mortgage-payment-calculator`,"description":"See how extra mortgage payments reduce your loan term and total interest. Calculate savings from monthly extra payments, annual lump sums, or one-time extra payments.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does an extra $100/month save on a mortgage?","acceptedAnswer":{"@type":"Answer","text":"On a $300,000 30-year mortgage at 7%, paying an extra $100/month saves approximately $34,000 in interest and cuts 3.5 years off the loan. The higher your balance and rate, the more dramatic the savings from extra payments."}},{"@type":"Question","name":"Is it better to make extra mortgage payments or invest?","acceptedAnswer":{"@type":"Answer","text":"It depends on your mortgage rate vs expected investment return. If your mortgage rate is 7% and you expect 8-10% from index funds, investing often wins mathematically. But paying off the mortgage provides a guaranteed, risk-free return equal to your interest rate, plus psychological benefits of being debt-free."}},{"@type":"Question","name":"Do extra mortgage payments go to principal?","acceptedAnswer":{"@type":"Answer","text":"Yes, if directed correctly. Extra payments applied to principal directly reduce your loan balance, which reduces future interest charges. Always label extra payments as 'principal only' when submitting — some servicers apply them to future scheduled payments instead, which doesn't reduce principal as efficiently."}},{"@type":"Question","name":"What is the biweekly payment strategy?","acceptedAnswer":{"@type":"Answer","text":"Instead of 12 monthly payments, you make 26 biweekly payments (half your monthly payment every two weeks). This results in one extra full payment per year — equivalent to 13 months of payments. On a 30-year mortgage, this typically saves 4-5 years and tens of thousands in interest."}}]}),
  `<h1 class="calc-title" data-enter>Extra Mortgage Payment Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">See how much interest you save and how early you pay off your mortgage by making extra payments monthly, annually, or as a one-time lump sum.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="emp-balance">Current Loan Balance</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="emp-balance" class="calc-input" value="280000" min="10000" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="emp-rate">Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="emp-rate" class="calc-input" value="7.0" min="1" max="15" step="0.125"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="emp-months-left">Remaining Term</label><select id="emp-months-left" class="calc-select"><option value="360" selected>30 years</option><option value="300">25 years</option><option value="240">20 years</option><option value="180">15 years</option><option value="120">10 years</option></select></div>
<div class="input-group"><label class="input-label" for="emp-extra">Extra Monthly Payment</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="emp-extra" class="calc-input" value="200" min="0" step="50"></div></div>
<div class="input-group"><label class="input-label" for="emp-lump">One-Time Lump Sum (optional)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="emp-lump" class="calc-input" value="0" min="0" step="1000"></div></div>
<button class="calc-btn" onclick="calcEMP()">Calculate Savings</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="emp-result">$47,312</div><div class="result-label">Total Interest Saved</div><div class="result-sub" id="emp-sub">Pay off 5 yrs 4 mo early</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="emp-years-saved">5 yrs 4 mo</div><div class="stat-lbl">Time Saved</div></div>
<div class="stat-card"><div class="stat-num" id="emp-new-payoff">Jun 2051</div><div class="stat-lbl">New Payoff Date</div></div>
<div class="stat-card"><div class="stat-num" id="emp-base-int">$385,000</div><div class="stat-lbl">Interest (no extra)</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Current Balance</span><span class="val" id="emp-s-bal">$280,000</span></div>
<div class="breakdown-row"><span>Regular Payment</span><span class="val" id="emp-s-pmt">$1,863</span></div>
<div class="breakdown-row"><span>Extra Monthly Payment</span><span class="val" id="emp-s-extra">$200</span></div>
<div class="breakdown-row"><span>Original Payoff Date</span><span class="val" id="emp-s-orig">Jun 2056</span></div>
<div class="breakdown-row"><span>New Payoff Date</span><span class="val" id="emp-s-new">Feb 2051</span></div>
<div class="highlight-row"><span>Interest Saved</span><span id="emp-s-saved">$47,312</span></div>
</div>
</div></div>
<div class="calc-article"><h2>The Most Efficient Way to Make Extra Payments</h2><p>Extra payments are most powerful early in your loan when your balance is highest. A $200 extra payment in year 1 of a 30-year mortgage saves nearly twice as much as the same payment in year 15, because it prevents compounding on a larger balance for a longer period.</p><p><strong>Key rule:</strong> Always specify "apply to principal" on extra payments. Some servicers apply extra funds to future scheduled payments instead, which doesn't reduce principal efficiently.</p></div>`
);
empHtml = empHtml.replace('</body>', `<script>
function fmtEMP(n){return '$'+Math.round(n).toLocaleString();}
function pmtEMP(P,r,n){if(r===0)return P/n;return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function calcEMP(){
  var bal=parseFloat(document.getElementById('emp-balance').value)||280000;
  var r=parseFloat(document.getElementById('emp-rate').value)/100/12;
  var n=parseInt(document.getElementById('emp-months-left').value)||360;
  var extra=parseFloat(document.getElementById('emp-extra').value)||0;
  var lump=parseFloat(document.getElementById('emp-lump').value)||0;
  var basePmt=pmtEMP(bal,r,n);
  var b1=bal-lump,mo1=0,int1=0;
  while(b1>0.01&&mo1<600){int1+=b1*r;b1=b1*(1+r)-(basePmt+extra);mo1++;}
  var b2=bal,mo2=0,int2=0;
  while(b2>0.01&&mo2<600){int2+=b2*r;b2=b2*(1+r)-basePmt;mo2++;}
  var saved=int2-int1;
  var moDiff=mo2-mo1;
  var yrSaved=Math.floor(moDiff/12);var moSaved=moDiff%12;
  var d1=new Date();d1.setMonth(d1.getMonth()+mo1);
  var d2=new Date();d2.setMonth(d2.getMonth()+mo2);
  document.getElementById('emp-result').textContent=fmtEMP(saved);
  document.getElementById('emp-sub').textContent='Pay off '+yrSaved+' yr'+(yrSaved!==1?'s':'')+' '+(moSaved>0?moSaved+' mo ':'')+' early';
  document.getElementById('emp-years-saved').textContent=yrSaved+'y '+(moSaved>0?moSaved+'m':'');
  document.getElementById('emp-new-payoff').textContent=d1.toLocaleString('en-US',{month:'short',year:'numeric'});
  document.getElementById('emp-base-int').textContent=fmtEMP(int2);
  document.getElementById('emp-s-bal').textContent=fmtEMP(bal);
  document.getElementById('emp-s-pmt').textContent=fmtEMP(basePmt);
  document.getElementById('emp-s-extra').textContent=fmtEMP(extra);
  document.getElementById('emp-s-orig').textContent=d2.toLocaleString('en-US',{month:'short',year:'numeric'});
  document.getElementById('emp-s-new').textContent=d1.toLocaleString('en-US',{month:'short',year:'numeric'});
  document.getElementById('emp-s-saved').textContent=fmtEMP(saved);
}
calcEMP();
<\/script></body>`);
fs.writeFileSync(B+'extra-mortgage-payment-calculator.html',empHtml);
console.log('Built: extra-mortgage-payment-calculator');

// ─── 4. 401K LOAN CALCULATOR ($5 CPC) ──────────────────────────────────────────
var k401Html = wrap('401k-loan-calculator',
  '401k Loan Calculator 2026 | True Cost of Borrowing from Retirement',
  'Calculate the real cost of a 401k loan including lost investment growth, double taxation on repayment, and how it compares to a personal loan.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"401k Loan Calculator 2026","url":`${DOMAIN}/401k-loan-calculator`,"description":"See the true cost of borrowing from your 401k. Calculate lost investment returns, net cost vs personal loan alternatives, and the tax implications of defaulting.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much can I borrow from my 401k?","acceptedAnswer":{"@type":"Answer","text":"You can borrow up to 50% of your vested 401k balance or $50,000, whichever is less. Some plans have a minimum loan amount ($1,000 is common). You must repay within 5 years (or longer for a primary residence purchase)."}},{"@type":"Question","name":"What happens if I don't repay my 401k loan?","acceptedAnswer":{"@type":"Answer","text":"If you default (fail to repay on schedule), the remaining balance is treated as a distribution — it becomes taxable income for that year. If you're under 59½, you also owe a 10% early withdrawal penalty. Leaving your job while you have an outstanding 401k loan usually accelerates repayment — you typically have until your tax filing deadline to repay in full or face the same distribution treatment."}},{"@type":"Question","name":"Is a 401k loan a good idea?","acceptedAnswer":{"@type":"Answer","text":"Generally no — you lose the investment growth on the borrowed amount, you repay with after-tax dollars (so you're taxed twice on that money), and if you leave your job you may face an immediate tax bill. Better options include a HELOC, personal loan, or 0% balance transfer. The main exception: if you're in a genuine financial emergency with no other options and need to avoid predatory high-rate borrowing."}},{"@type":"Question","name":"Do 401k loans affect your credit score?","acceptedAnswer":{"@type":"Answer","text":"No — 401k loans are not reported to credit bureaus. They don't appear on your credit report and won't affect your credit score, whether you take one out or default on one (though defaulting triggers taxes and penalties from the IRS)."}}]}),
  `<h1 class="calc-title" data-enter>401k Loan Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate the real cost of borrowing from your 401k — including lost investment growth that doesn't show up in your loan statement.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="k4-amount">Loan Amount</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="k4-amount" class="calc-input" value="20000" min="1000" max="50000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="k4-rate">401k Loan Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="k4-rate" class="calc-input" value="9.0" min="1" max="15" step="0.25"><span class="input-suffix">%</span></div><div class="input-hint">Typically prime rate + 1% (currently ~9-10%)</div></div>
<div class="input-group"><label class="input-label" for="k4-term">Repayment Term</label><select id="k4-term" class="calc-select"><option value="12">1 year</option><option value="24">2 years</option><option value="36">3 years</option><option value="48">4 years</option><option value="60" selected>5 years (max)</option></select></div>
<div class="input-group"><label class="input-label" for="k4-return">Expected 401k Annual Return</label><div class="input-prefix-wrap"><input type="number" id="k4-return" class="calc-input" value="8" min="1" max="15" step="0.5"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="k4-tax">Marginal Tax Rate (federal + state)</label><div class="input-prefix-wrap"><input type="number" id="k4-tax" class="calc-input" value="28" min="10" max="60" step="1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="k4-alt-rate">Alternative Loan Rate (personal loan/HELOC)</label><div class="input-prefix-wrap"><input type="number" id="k4-alt-rate" class="calc-input" value="11" min="1" max="30" step="0.25"><span class="input-suffix">%</span></div></div>
<button class="calc-btn" onclick="calcK4()">Calculate True Cost</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="k4-result">$7,200</div><div class="result-label">True Cost of 401k Loan</div><div class="result-sub" id="k4-sub">vs $3,040 for a personal loan at 11%</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="k4-pmt">$415</div><div class="stat-lbl">Monthly Payment</div></div>
<div class="stat-card"><div class="stat-num" id="k4-int-paid">$4,900</div><div class="stat-lbl">Interest Paid (to self)</div></div>
<div class="stat-card"><div class="stat-num" id="k4-lost-growth">$5,200</div><div class="stat-lbl">Lost Investment Growth</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Loan Amount</span><span class="val" id="k4-s-amt">$20,000</span></div>
<div class="breakdown-row"><span>Interest Paid (goes back to you)</span><span class="val" id="k4-s-int">$4,900</span></div>
<div class="breakdown-row"><span>Lost Investment Growth</span><span class="val" id="k4-s-lost">$5,200</span></div>
<div class="breakdown-row"><span>Double-Tax Cost on Interest</span><span class="val" id="k4-s-tax">$2,000</span></div>
<div class="breakdown-row"><span>Alternative Loan Total Interest</span><span class="val" id="k4-s-alt">$3,040</span></div>
<div class="highlight-row"><span>True Net Cost (401k vs alternative)</span><span id="k4-s-net">+$4,160 more</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Why 401k Loans Cost More Than They Appear</h2><p>The interest rate on a 401k loan is misleadingly appealing — "you're paying yourself." But the real costs are invisible on the statement: (1) <strong>Lost compounding</strong> on the borrowed amount during repayment. (2) <strong>Double taxation</strong> — you repay with after-tax dollars, then pay taxes again on withdrawals in retirement. (3) <strong>Job change risk</strong> — lose your job and the full balance may be due by your next tax filing date.</p></div>`
);
k401Html = k401Html.replace('</body>', `<script>
function fmtK4(n){return '$'+Math.round(n).toLocaleString();}
function pmtK4(P,r,n){if(r===0)return P/n;return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function calcK4(){
  var amt=parseFloat(document.getElementById('k4-amount').value)||20000;
  var r=parseFloat(document.getElementById('k4-rate').value)/100/12;
  var n=parseInt(document.getElementById('k4-term').value)||60;
  var ret=parseFloat(document.getElementById('k4-return').value)/100;
  var tax=parseFloat(document.getElementById('k4-tax').value)/100;
  var altR=parseFloat(document.getElementById('k4-alt-rate').value)/100/12;
  var pmt=pmtK4(amt,r,n);
  var totalIntPaid=pmt*n-amt;
  var doubleTaxCost=totalIntPaid*tax;
  var lostGrowth=amt*Math.pow(1+ret/12,n)-amt-(pmt-amt*r)*((Math.pow(1+ret/12,n)-1)/(ret/12));
  lostGrowth=Math.max(0,lostGrowth);
  var trueCost=lostGrowth+doubleTaxCost;
  var altPmt=pmtK4(amt,altR,n);
  var altInt=altPmt*n-amt;
  var netVsAlt=trueCost-altInt;
  document.getElementById('k4-result').textContent=fmtK4(trueCost);
  document.getElementById('k4-sub').textContent='vs '+fmtK4(altInt)+' for a personal loan at '+document.getElementById('k4-alt-rate').value+'%';
  document.getElementById('k4-pmt').textContent=fmtK4(pmt);
  document.getElementById('k4-int-paid').textContent=fmtK4(totalIntPaid);
  document.getElementById('k4-lost-growth').textContent=fmtK4(lostGrowth);
  document.getElementById('k4-s-amt').textContent=fmtK4(amt);
  document.getElementById('k4-s-int').textContent=fmtK4(totalIntPaid);
  document.getElementById('k4-s-lost').textContent=fmtK4(lostGrowth);
  document.getElementById('k4-s-tax').textContent=fmtK4(doubleTaxCost);
  document.getElementById('k4-s-alt').textContent=fmtK4(altInt);
  document.getElementById('k4-s-net').textContent=(netVsAlt>=0?'+':'')+fmtK4(netVsAlt)+' '+(netVsAlt>=0?'more expensive':'cheaper');
}
calcK4();
<\/script></body>`);
fs.writeFileSync(B+'401k-loan-calculator.html',k401Html);
console.log('Built: 401k-loan-calculator');

// ─── 5. BALANCE TRANSFER CALCULATOR ($5.14 CPC) ───────────────────────────────
var btHtml = wrap('balance-transfer-calculator',
  'Balance Transfer Calculator 2026 | 0% APR Savings & Break-Even',
  'Calculate how much you save by moving credit card debt to a 0% intro APR balance transfer card. Includes transfer fee, payoff timeline, and break-even analysis.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Balance Transfer Calculator 2026","url":`${DOMAIN}/balance-transfer-calculator`,"description":"Calculate savings from transferring credit card debt to a 0% intro APR card. See total interest saved, transfer fee payback, and whether you can pay off before the promo ends.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is a balance transfer worth it?","acceptedAnswer":{"@type":"Answer","text":"Yes, for most people with high-rate credit card debt. A 0% APR for 15-21 months means every payment goes to principal — no interest. On a $5,000 balance at 22% APR, you save $1,200-$1,800 in interest during the promo period. The 3-5% transfer fee ($150-$250) is typically paid back within 1-2 months of interest savings."}},{"@type":"Question","name":"What credit score do you need for a balance transfer card?","acceptedAnswer":{"@type":"Answer","text":"Most 0% balance transfer cards require good to excellent credit (670+ FICO, ideally 720+). Cards with the longest 0% periods (18-21 months) from Chase, Citi, or Wells Fargo generally require 720+. Some cards accept scores as low as 640 but offer shorter promo periods."}},{"@type":"Question","name":"What happens if I don't pay off the balance transfer before the promo period ends?","acceptedAnswer":{"@type":"Answer","text":"The remaining balance starts accruing interest at the regular APR (usually 20-29%), retroactively from the transfer date on some older cards, or just going forward on newer ones. No retroactive interest on most current cards — but the rate jumps significantly. Always try to pay off the full balance before the promo period ends."}},{"@type":"Question","name":"Can you transfer a balance from one card to another at the same bank?","acceptedAnswer":{"@type":"Answer","text":"No — banks don't allow balance transfers between their own cards. You must transfer from a card at one bank to a new card at a different bank. For example, you can transfer a Chase balance to a Citi card, but not to another Chase card."}}]}),
  `<h1 class="calc-title" data-enter>Balance Transfer Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate how much you save by moving high-rate debt to a 0% APR balance transfer card. See if you can pay it off before the promo period ends.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="bt-balance">Balance to Transfer</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="bt-balance" class="calc-input" value="6000" min="500" step="500"></div></div>
<div class="input-group"><label class="input-label" for="bt-cur-apr">Current Card APR</label><div class="input-prefix-wrap"><input type="number" id="bt-cur-apr" class="calc-input" value="22.99" min="1" max="36" step="0.01"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="bt-promo">0% APR Promo Period</label><select id="bt-promo" class="calc-select"><option value="12">12 months</option><option value="15">15 months</option><option value="18" selected>18 months</option><option value="21">21 months</option></select></div>
<div class="input-group"><label class="input-label" for="bt-fee">Balance Transfer Fee</label><div class="input-prefix-wrap"><input type="number" id="bt-fee" class="calc-input" value="3" min="0" max="5" step="0.5"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="bt-monthly">Monthly Payment You Can Make</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="bt-monthly" class="calc-input" value="400" min="50" step="50"></div></div>
<button class="calc-btn" onclick="calcBT()">Calculate Savings</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="bt-result">$1,180</div><div class="result-label">Interest Saved</div><div class="result-sub" id="bt-sub">Net of $180 transfer fee</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="bt-fee-amt">$180</div><div class="stat-lbl">Transfer Fee</div></div>
<div class="stat-card"><div class="stat-num" id="bt-payoff">15 mo</div><div class="stat-lbl">Months to Payoff</div></div>
<div class="stat-card"><div class="stat-num" id="bt-remaining">$0</div><div class="stat-lbl">Balance at Promo End</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Transfer Amount</span><span class="val" id="bt-s-amt">$6,000</span></div>
<div class="breakdown-row"><span>Transfer Fee</span><span class="val" id="bt-s-fee">$180</span></div>
<div class="breakdown-row"><span>Interest if Kept on Old Card</span><span class="val" id="bt-s-old-int">$1,360</span></div>
<div class="breakdown-row"><span>Interest After Promo Ends</span><span class="val" id="bt-s-new-int">$0</span></div>
<div class="breakdown-row"><span>Will You Pay Off in Time?</span><span class="val" id="bt-s-payoff-q">Yes ✓</span></div>
<div class="highlight-row"><span>Net Savings (interest saved - fee)</span><span id="bt-s-net">$1,180</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Best Balance Transfer Cards in 2026</h2><p>Top options for 0% balance transfers include cards with 15-21 month promo periods at 3-5% transfer fees. Compare: a 3% fee on $6,000 is $180, but you save hundreds more in interest during the promo — nearly always worth it if you can realistically pay off the balance.</p><p><strong>Critical rule:</strong> Don't use the balance transfer card for new purchases during the promo. Payments often go to the 0% balance first, leaving new purchases accruing interest at 25%+. Keep the old card for small regular purchases and pay it in full.</p></div>`
);
btHtml = btHtml.replace('</body>', `<script>
function fmtBT(n){return '$'+Math.round(n).toLocaleString();}
function calcBT(){
  var bal=parseFloat(document.getElementById('bt-balance').value)||6000;
  var curApr=parseFloat(document.getElementById('bt-cur-apr').value)/100/12;
  var promo=parseInt(document.getElementById('bt-promo').value)||18;
  var feeR=parseFloat(document.getElementById('bt-fee').value)/100;
  var mo=parseFloat(document.getElementById('bt-monthly').value)||400;
  var fee=bal*feeR;
  var totalBal=bal+fee;
  var oldInt=0,b2=bal,mo2=0;
  while(b2>0.01&&mo2<promo){oldInt+=b2*curApr;b2=b2*(1+curApr)-mo;mo2++;}
  var remaining=Math.max(0,totalBal-mo*promo);
  var paidInPromo=Math.min(totalBal,mo*promo);
  var moToPayoff=Math.ceil(totalBal/mo);
  var paidOnTime=totalBal<=mo*promo;
  var netSaved=oldInt-fee-(remaining>0?remaining*curApr*3:0);
  document.getElementById('bt-result').textContent=fmtBT(Math.max(0,oldInt-fee));
  document.getElementById('bt-sub').textContent='Net of '+fmtBT(fee)+' transfer fee';
  document.getElementById('bt-fee-amt').textContent=fmtBT(fee);
  document.getElementById('bt-payoff').textContent=moToPayoff+' mo';
  document.getElementById('bt-remaining').textContent=fmtBT(remaining);
  document.getElementById('bt-s-amt').textContent=fmtBT(bal);
  document.getElementById('bt-s-fee').textContent=fmtBT(fee);
  document.getElementById('bt-s-old-int').textContent=fmtBT(oldInt);
  document.getElementById('bt-s-new-int').textContent=fmtBT(remaining>0?remaining*curApr*12:'0');
  document.getElementById('bt-s-payoff-q').textContent=paidOnTime?'Yes — paid off in '+moToPayoff+' mo ✓':'⚠ No — '+fmtBT(remaining)+' remains at promo end';
  document.getElementById('bt-s-payoff-q').style.color=paidOnTime?'#16a34a':'#dc2626';
  document.getElementById('bt-s-net').textContent=fmtBT(Math.max(0,oldInt-fee));
}
calcBT();
<\/script></body>`);
fs.writeFileSync(B+'balance-transfer-calculator.html',btHtml);
console.log('Built: balance-transfer-calculator');

// ─── 6. PARENT PLUS LOAN CALCULATOR ($14 CPC) ─────────────────────────────────
var ppHtml = wrap('parent-plus-loan-calculator',
  'Parent PLUS Loan Calculator 2026 | Monthly Payment & Total Cost',
  'Calculate Parent PLUS loan monthly payments, total interest, and repayment options. 2026 rate: 9.08%. Compare standard, extended, and income-contingent plans.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Parent PLUS Loan Calculator 2026","url":`${DOMAIN}/parent-plus-loan-calculator`,"description":"Calculate Parent PLUS loan payments at the 2026 federal rate of 9.08%. Compare standard 10-year, extended, and income-contingent repayment plans.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the Parent PLUS loan interest rate for 2026?","acceptedAnswer":{"@type":"Answer","text":"The Parent PLUS loan interest rate for loans disbursed between July 1, 2025 and June 30, 2026 is 9.08% fixed. This rate is set each year based on the 10-year Treasury note rate plus 4.6%."}},{"@type":"Question","name":"What are the repayment options for Parent PLUS loans?","acceptedAnswer":{"@type":"Answer","text":"Parent PLUS loans qualify for the Standard 10-year plan, Graduated repayment, and Extended repayment (25 years). They do NOT directly qualify for income-driven repayment plans — but they can if consolidated into a Direct Consolidation Loan, which then qualifies for Income-Contingent Repayment (ICR). PSLF is also available after consolidation."}},{"@type":"Question","name":"Can Parent PLUS loans be transferred to the student?","acceptedAnswer":{"@type":"Answer","text":"Not directly through federal programs. Some private lenders will refinance the Parent PLUS loan into the student's name, but this converts the federal loan to a private loan, losing federal protections and repayment options. The parent remains the legal borrower on a Parent PLUS loan unless privately refinanced."}},{"@type":"Question","name":"Is there forgiveness for Parent PLUS loans?","acceptedAnswer":{"@type":"Answer","text":"Yes, but with steps. After consolidating into a Direct Consolidation Loan and enrolling in ICR, you qualify for PSLF after 120 qualifying payments (10 years) if you work for a government or nonprofit. You also qualify for ICR forgiveness after 25 years. Recent Biden-era relief programs have been challenged legally."}}]}),
  `<h1 class="calc-title" data-enter>Parent PLUS Loan Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate Parent PLUS loan monthly payments and total cost. 2026 federal rate: 9.08%. Compare all repayment plan options.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="pp-balance">Total Loan Amount</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="pp-balance" class="calc-input" value="45000" min="1000" max="500000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="pp-rate">Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="pp-rate" class="calc-input" value="9.08" min="1" max="15" step="0.01"><span class="input-suffix">%</span></div><div class="input-hint">2025–26 federal Parent PLUS rate: 9.08%</div></div>
<div class="input-group"><label class="input-label" for="pp-plan">Repayment Plan</label><select id="pp-plan" class="calc-select"><option value="120" selected>Standard 10-Year</option><option value="180">Extended 15-Year</option><option value="240">Extended 20-Year</option><option value="300">Extended 25-Year</option></select></div>
<button class="calc-btn" onclick="calcPP()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="pp-result">$573</div><div class="result-label">Monthly Payment</div><div class="result-sub" id="pp-sub">Standard 10-year at 9.08%</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="pp-total-paid">$68,760</div><div class="stat-lbl">Total Paid</div></div>
<div class="stat-card"><div class="stat-num" id="pp-total-int">$23,760</div><div class="stat-lbl">Total Interest</div></div>
<div class="stat-card"><div class="stat-num" id="pp-payoff">Sep 2036</div><div class="stat-lbl">Payoff Date</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Loan Balance</span><span class="val" id="pp-s-bal">$45,000</span></div>
<div class="breakdown-row"><span>Interest Rate</span><span class="val" id="pp-s-rate">9.08%</span></div>
<div class="breakdown-row"><span>Repayment Plan</span><span class="val" id="pp-s-plan">Standard 10-Year</span></div>
<div class="breakdown-row"><span>Monthly Payment</span><span class="val" id="pp-s-pmt">$573</span></div>
<div class="breakdown-row"><span>Total Interest</span><span class="val" id="pp-s-int">$23,760</span></div>
<div class="highlight-row"><span>Total Cost</span><span id="pp-s-total">$68,760</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Parent PLUS Loan Repayment Strategy</h2><p>At 9.08%, Parent PLUS loans are expensive. Key strategies to reduce total cost:</p><ul style="padding-left:20px;line-height:1.9"><li><strong>Pay during school:</strong> Interest accrues immediately, even while the student is enrolled. Making interest-only payments during the 4 years of college can save thousands.</li><li><strong>Refinance privately:</strong> Parents with excellent credit can refinance to 5-7%, cutting total interest by 30-40%. Trade-off: lose federal protections.</li><li><strong>PSLF after consolidation:</strong> If you work in public service, consolidate to a Direct Loan and enroll in ICR. 10 years of payments = full forgiveness, tax-free.</li></ul></div>`
);
ppHtml = ppHtml.replace('</body>', `<script>
function fmtPP(n){return '$'+Math.round(n).toLocaleString();}
function pmtPP(P,r,n){if(r===0)return P/n;return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function calcPP(){
  var bal=parseFloat(document.getElementById('pp-balance').value)||45000;
  var r=parseFloat(document.getElementById('pp-rate').value)/100/12;
  var n=parseInt(document.getElementById('pp-plan').value)||120;
  var planLabel=document.getElementById('pp-plan').options[document.getElementById('pp-plan').selectedIndex].text;
  var pmt=pmtPP(bal,r,n);
  var totalPaid=pmt*n;
  var totalInt=totalPaid-bal;
  var d=new Date();d.setMonth(d.getMonth()+n);
  document.getElementById('pp-result').textContent=fmtPP(pmt);
  document.getElementById('pp-sub').textContent=planLabel+' at '+document.getElementById('pp-rate').value+'%';
  document.getElementById('pp-total-paid').textContent=fmtPP(totalPaid);
  document.getElementById('pp-total-int').textContent=fmtPP(totalInt);
  document.getElementById('pp-payoff').textContent=d.toLocaleString('en-US',{month:'short',year:'numeric'});
  document.getElementById('pp-s-bal').textContent=fmtPP(bal);
  document.getElementById('pp-s-rate').textContent=document.getElementById('pp-rate').value+'%';
  document.getElementById('pp-s-plan').textContent=planLabel;
  document.getElementById('pp-s-pmt').textContent=fmtPP(pmt);
  document.getElementById('pp-s-int').textContent=fmtPP(totalInt);
  document.getElementById('pp-s-total').textContent=fmtPP(totalPaid);
}
calcPP();
<\/script></body>`);
fs.writeFileSync(B+'parent-plus-loan-calculator.html',ppHtml);
console.log('Built: parent-plus-loan-calculator');

// ─── 7–10: estate tax, dividend yield, total compensation, fuel savings ────────
// Estate tax calculator
var etHtml = wrap('estate-tax-calculator',
  'Estate Tax Calculator 2026 | Federal Estate Tax Exemption & Liability',
  'Calculate federal estate tax liability for 2026. Includes the $13.99M exemption, portability, unlimited marital deduction, and stepped-up basis rules.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Estate Tax Calculator 2026","url":`${DOMAIN}/estate-tax-calculator`,"description":"Calculate federal estate tax for 2026 with the $13.99M exemption. Shows taxable estate, tax owed, and strategies to reduce estate tax.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the federal estate tax exemption for 2026?","acceptedAnswer":{"@type":"Answer","text":"The federal estate tax exemption for 2026 is $13.99 million per person ($27.98 million for married couples using portability). Estates below this threshold pay no federal estate tax. This elevated exemption is set to sunset after 2025 — it was extended by the One Big Beautiful Bill Act of 2025."}},{"@type":"Question","name":"What is the federal estate tax rate?","acceptedAnswer":{"@type":"Answer","text":"The federal estate tax uses progressive rates from 18% to 40% on the taxable estate (the amount above the exemption). The top 40% rate applies to taxable estates over $1 million above the exemption. State estate taxes (12 states + DC) have lower exemptions and rates of 8-20%."}},{"@type":"Question","name":"What is portability in estate tax?","acceptedAnswer":{"@type":"Answer","text":"Portability allows a surviving spouse to use the deceased spouse's unused estate tax exemption. If a spouse dies with a $5 million estate (below the $13.99M exemption), the surviving spouse can inherit that unused $8.99M exemption, effectively doubling their exemption to ~$22.98M. A timely estate tax return (Form 706) must be filed to elect portability, even if no tax is owed."}}]}),
  `<h1 class="calc-title" data-enter>Estate Tax Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your potential federal estate tax liability. The 2026 exemption is $13.99M per person. Most estates owe nothing.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="et-estate">Gross Estate Value</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="et-estate" class="calc-input" value="5000000" min="100000" step="100000"></div></div>
<div class="input-group"><label class="input-label" for="et-debts">Debts & Deductible Expenses</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="et-debts" class="calc-input" value="200000" min="0" step="10000"></div></div>
<div class="input-group"><label class="input-label" for="et-marital">Marital Deduction (spouse inheritance)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="et-marital" class="calc-input" value="0" min="0" step="100000"></div></div>
<div class="input-group"><label class="input-label" for="et-charity">Charitable Deductions</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="et-charity" class="calc-input" value="0" min="0" step="10000"></div></div>
<div class="input-group"><label class="input-label" for="et-prior">Prior Taxable Gifts (cumulative)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="et-prior" class="calc-input" value="0" min="0" step="10000"></div></div>
<button class="calc-btn" onclick="calcET()">Calculate Estate Tax</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="et-result">$0</div><div class="result-label">Federal Estate Tax Owed</div><div class="result-sub" id="et-sub">Below the $13.99M exemption</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="et-taxable">$0</div><div class="stat-lbl">Taxable Estate</div></div>
<div class="stat-card"><div class="stat-num" id="et-exemption-used">$4.8M</div><div class="stat-lbl">Exemption Used</div></div>
<div class="stat-card"><div class="stat-num" id="et-exemption-left">$9.19M</div><div class="stat-lbl">Exemption Remaining</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Gross Estate</span><span class="val" id="et-s-gross">$5,000,000</span></div>
<div class="breakdown-row"><span>Less: Debts & Expenses</span><span class="val" id="et-s-debts">($200,000)</span></div>
<div class="breakdown-row"><span>Less: Marital Deduction</span><span class="val" id="et-s-marital">$0</span></div>
<div class="breakdown-row"><span>Less: Charitable Deductions</span><span class="val" id="et-s-charity">$0</span></div>
<div class="breakdown-row"><span>Adjusted Gross Estate</span><span class="val" id="et-s-adj">$4,800,000</span></div>
<div class="breakdown-row"><span>2026 Exemption</span><span class="val">$13,990,000</span></div>
<div class="highlight-row"><span>Estate Tax Owed</span><span id="et-s-tax">$0</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Who Actually Pays Federal Estate Tax?</h2><p>Fewer than 0.2% of estates owe federal estate tax. With a $13.99M exemption per person ($27.98M for couples), only the very wealthy face this tax. The exemption is set to continue post-2025 based on current law.</p><p><strong>State estate taxes:</strong> 12 states and DC levy their own estate taxes with lower exemptions ($1M-$7M). If you live in Massachusetts, Oregon, or Washington, your estate could owe state tax even if federal tax doesn't apply.</p></div>`
);
etHtml = etHtml.replace('</body>', `<script>
function fmtET(n){return '$'+Math.round(n).toLocaleString();}
function calcET(){
  var gross=parseFloat(document.getElementById('et-estate').value)||5000000;
  var debts=parseFloat(document.getElementById('et-debts').value)||0;
  var marital=parseFloat(document.getElementById('et-marital').value)||0;
  var charity=parseFloat(document.getElementById('et-charity').value)||0;
  var prior=parseFloat(document.getElementById('et-prior').value)||0;
  var adj=Math.max(0,gross-debts-marital-charity);
  var taxable=Math.max(0,adj+prior-13990000);
  var brackets=[[10000,.18],[20000,.20],[20000,.22],[20000,.24],[20000,.26],[20000,.28],[250000,.30],[250000,.32],[500000,.34],[750000,.35],[250000,.37],[9999999,.40]];
  var tax=0,prev=0;
  for(var i=0;i<brackets.length;i++){
    var top=prev+brackets[i][0];
    if(taxable<=prev)break;
    tax+=(Math.min(taxable,top)-prev)*brackets[i][1];
    prev=top;
  }
  document.getElementById('et-result').textContent=fmtET(tax);
  document.getElementById('et-sub').textContent=taxable>0?'On '+fmtET(taxable)+' taxable estate (above exemption)':'Below the $13.99M exemption — no federal estate tax';
  document.getElementById('et-taxable').textContent=fmtET(taxable);
  document.getElementById('et-exemption-used').textContent=fmtET(Math.min(adj+prior,13990000));
  document.getElementById('et-exemption-left').textContent=fmtET(Math.max(0,13990000-(adj+prior)));
  document.getElementById('et-s-gross').textContent=fmtET(gross);
  document.getElementById('et-s-debts').textContent='('+fmtET(debts)+')';
  document.getElementById('et-s-marital').textContent=marital>0?'('+fmtET(marital)+')':'$0';
  document.getElementById('et-s-charity').textContent=charity>0?'('+fmtET(charity)+')':'$0';
  document.getElementById('et-s-adj').textContent=fmtET(adj);
  document.getElementById('et-s-tax').textContent=fmtET(tax);
}
calcET();
<\/script></body>`);
fs.writeFileSync(B+'estate-tax-calculator.html',etHtml);
console.log('Built: estate-tax-calculator');

// Dividend yield calculator
var dvHtml = wrap('dividend-yield-calculator',
  'Dividend Yield Calculator 2026 | Annual Income & Yield on Cost',
  'Calculate dividend yield, annual income, and yield on cost for any stock. Compare dividend stocks and see how dividend reinvestment compounds over time.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Dividend Yield Calculator 2026","url":`${DOMAIN}/dividend-yield-calculator`,"description":"Calculate dividend yield, annual income from dividends, and yield on cost. Compare stocks by dividend income and see DRIP compounding projections.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is dividend yield?","acceptedAnswer":{"@type":"Answer","text":"Dividend yield is the annual dividend per share divided by the current stock price, expressed as a percentage. A $50 stock paying $2/year in dividends has a 4% yield. Yield changes as the stock price changes — a falling stock price increases yield (yield trap risk) while a rising price decreases yield."}},{"@type":"Question","name":"What is a good dividend yield?","acceptedAnswer":{"@type":"Answer","text":"A yield of 2-6% is generally considered healthy for dividend stocks. Yields above 6-7% may signal a 'yield trap' — the market may be pricing in a dividend cut. The S&P 500 average dividend yield is around 1.3-1.5% (2024-2026). REITs and utilities commonly yield 3-6%."}},{"@type":"Question","name":"What is yield on cost?","acceptedAnswer":{"@type":"Answer","text":"Yield on cost (YOC) is your annual dividend income divided by your original purchase price (not current price). If you bought a stock at $20 and it now pays $2/year, your YOC is 10%, even if the current yield is only 4% at today's $50 price. YOC grows over time as companies raise dividends."}},{"@type":"Question","name":"How does dividend reinvestment (DRIP) work?","acceptedAnswer":{"@type":"Answer","text":"DRIP automatically uses dividend payments to purchase additional shares. Over time, this creates a compounding effect — more shares earn more dividends, which buy more shares. On a $10,000 investment at 4% yield growing 5% annually, 20-year DRIP compounding can produce 30-40% more total return than taking dividends as cash."}}]}),
  `<h1 class="calc-title" data-enter>Dividend Yield Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate annual dividend income, yield on cost, and long-term DRIP compounding for any stock or portfolio.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="dv-shares">Number of Shares</label><input type="number" id="dv-shares" class="calc-input" value="200" min="1" step="1"></div>
<div class="input-group"><label class="input-label" for="dv-price">Current Stock Price</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="dv-price" class="calc-input" value="52.50" min="0.01" step="0.01"></div></div>
<div class="input-group"><label class="input-label" for="dv-annual-div">Annual Dividend Per Share</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="dv-annual-div" class="calc-input" value="2.10" min="0.01" step="0.01"></div></div>
<div class="input-group"><label class="input-label" for="dv-cost-basis">Your Original Cost Per Share</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="dv-cost-basis" class="calc-input" value="38.00" min="0.01" step="0.01"></div></div>
<div class="input-group"><label class="input-label" for="dv-growth">Annual Dividend Growth Rate</label><div class="input-prefix-wrap"><input type="number" id="dv-growth" class="calc-input" value="5" min="0" max="20" step="0.5"><span class="input-suffix">%</span></div></div>
<button class="calc-btn" onclick="calcDV()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="dv-result">$420</div><div class="result-label">Annual Dividend Income</div><div class="result-sub" id="dv-sub">$35.00/month from 200 shares</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="dv-yield">4.00%</div><div class="stat-lbl">Current Yield</div></div>
<div class="stat-card"><div class="stat-num" id="dv-yoc">5.53%</div><div class="stat-lbl">Yield on Cost</div></div>
<div class="stat-card"><div class="stat-num" id="dv-10yr">$685</div><div class="stat-lbl">Annual Income in 10 Yrs</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Portfolio Value</span><span class="val" id="dv-s-port">$10,500</span></div>
<div class="breakdown-row"><span>Annual Dividend Income</span><span class="val" id="dv-s-annual">$420</span></div>
<div class="breakdown-row"><span>Monthly Dividend Income</span><span class="val" id="dv-s-monthly">$35.00</span></div>
<div class="breakdown-row"><span>Dividend Yield</span><span class="val" id="dv-s-yield">4.00%</span></div>
<div class="breakdown-row"><span>Yield on Cost</span><span class="val" id="dv-s-yoc">5.53%</span></div>
<div class="highlight-row"><span>10-Year Annual Income (5% growth)</span><span id="dv-s-10yr">$685</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Dividend Income vs Growth Investing</h2><p>Dividend investing works best for: income-focused retirees who need cash flow, investors who want lower volatility, or those building a DRIP portfolio over decades. Growth investing (no dividends) works best for long-term wealth building in tax-advantaged accounts where reinvestment is automatic.</p><p>The key advantage of dividend growth stocks: companies that consistently raise their dividend tend to have strong fundamentals and compound wealth through both price appreciation and rising income.</p></div>`
);
dvHtml = dvHtml.replace('</body>', `<script>
function fmtDV(n){return '$'+(Math.round(n*100)/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
function calcDV(){
  var sh=parseFloat(document.getElementById('dv-shares').value)||200;
  var pr=parseFloat(document.getElementById('dv-price').value)||52.5;
  var div=parseFloat(document.getElementById('dv-annual-div').value)||2.10;
  var cb=parseFloat(document.getElementById('dv-cost-basis').value)||38;
  var gr=parseFloat(document.getElementById('dv-growth').value)/100;
  var annual=sh*div;
  var yld=div/pr;
  var yoc=div/cb;
  var port=sh*pr;
  var div10=div*Math.pow(1+gr,10);
  var ann10=sh*div10;
  document.getElementById('dv-result').textContent='$'+Math.round(annual).toLocaleString();
  document.getElementById('dv-sub').textContent='$'+(Math.round(annual/12*100)/100).toFixed(2)+'/month from '+sh+' shares';
  document.getElementById('dv-yield').textContent=Math.round(yld*10000)/100+'%';
  document.getElementById('dv-yoc').textContent=Math.round(yoc*10000)/100+'%';
  document.getElementById('dv-10yr').textContent='$'+Math.round(ann10).toLocaleString();
  document.getElementById('dv-s-port').textContent='$'+Math.round(port).toLocaleString();
  document.getElementById('dv-s-annual').textContent='$'+Math.round(annual).toLocaleString();
  document.getElementById('dv-s-monthly').textContent='$'+(Math.round(annual/12*100)/100).toFixed(2);
  document.getElementById('dv-s-yield').textContent=Math.round(yld*10000)/100+'%';
  document.getElementById('dv-s-yoc').textContent=Math.round(yoc*10000)/100+'%';
  document.getElementById('dv-s-10yr').textContent='$'+Math.round(ann10).toLocaleString();
}
calcDV();
<\/script></body>`);
fs.writeFileSync(B+'dividend-yield-calculator.html',dvHtml);
console.log('Built: dividend-yield-calculator');

// Total compensation calculator
var tcHtml = wrap('total-compensation-calculator',
  'Total Compensation Calculator 2026 | Salary + Benefits Package Value',
  'Calculate the full value of your compensation package including salary, health insurance, 401k match, PTO, bonuses, and other benefits.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Total Compensation Calculator 2026","url":`${DOMAIN}/total-compensation-calculator`,"description":"Calculate total compensation beyond salary. Add health insurance, 401k match, PTO value, bonus, equity, and other benefits to compare job offers.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is included in total compensation?","acceptedAnswer":{"@type":"Answer","text":"Total compensation includes: base salary, cash bonuses (signing, annual, performance), equity (stock options, RSUs), health/dental/vision insurance employer contribution, 401k employer match, PTO (calculated at your hourly rate), life and disability insurance, HSA contributions, tuition reimbursement, and other perquisites."}},{"@type":"Question","name":"How do I calculate the value of my benefits?","acceptedAnswer":{"@type":"Answer","text":"Health insurance: employer typically pays $7,000-$16,000/year for employee coverage. 401k match: usually 3-6% of salary. PTO: (salary ÷ 2,080) × PTO days × 8. Signing bonus: full cash value in year 1. Equity: vesting schedule value divided by vesting years. Adding all these typically increases compensation 25-40% above base salary."}},{"@type":"Question","name":"What is a competitive total compensation package?","acceptedAnswer":{"@type":"Answer","text":"At a large company, benefits typically add 30-40% to base salary. A $100,000 salary might come with $15,000 in health coverage, $4,500 in 401k match, $7,700 in PTO value (20 days), plus bonuses — totaling $130,000-$145,000 in total compensation. Tech companies with equity can reach 2-3x base salary in total comp."}}]}),
  `<h1 class="calc-title" data-enter>Total Compensation Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate the full value of your job offer. Add salary, benefits, 401k match, PTO, and bonuses to compare offers on a true apples-to-apples basis.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="tc-salary">Base Salary</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="tc-salary" class="calc-input" value="95000" min="20000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="tc-bonus">Annual Bonus (expected)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="tc-bonus" class="calc-input" value="8000" min="0" step="500"></div></div>
<div class="input-group"><label class="input-label" for="tc-health">Employer Health Insurance Contribution</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="tc-health" class="calc-input" value="12000" min="0" step="500"></div><div class="input-hint">Avg employer pays $7,000–$16,000/yr for single coverage</div></div>
<div class="input-group"><label class="input-label" for="tc-401k-pct">401k Employer Match (%)</label><div class="input-prefix-wrap"><input type="number" id="tc-401k-pct" class="calc-input" value="4" min="0" max="15" step="0.5"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="tc-pto">PTO Days Per Year</label><input type="number" id="tc-pto" class="calc-input" value="20" min="0" max="60" step="1"></div>
<div class="input-group"><label class="input-label" for="tc-equity">Annual Equity / RSU Value (vested/yr)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="tc-equity" class="calc-input" value="0" min="0" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="tc-other">Other Benefits (HSA, tuition, etc.)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="tc-other" class="calc-input" value="1500" min="0" step="500"></div></div>
<button class="calc-btn" onclick="calcTC()">Calculate Total Comp</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="tc-result">$128,300</div><div class="result-label">Total Compensation</div><div class="result-sub" id="tc-sub">35% above base salary</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="tc-benefits-total">$33,300</div><div class="stat-lbl">Benefits Value</div></div>
<div class="stat-card"><div class="stat-num" id="tc-benefits-pct">35%</div><div class="stat-lbl">Benefits as % of Salary</div></div>
<div class="stat-card"><div class="stat-num" id="tc-hourly">$61.68</div><div class="stat-lbl">Effective Hourly Rate</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Base Salary</span><span class="val" id="tc-s-sal">$95,000</span></div>
<div class="breakdown-row"><span>Annual Bonus</span><span class="val" id="tc-s-bonus">$8,000</span></div>
<div class="breakdown-row"><span>Health Insurance</span><span class="val" id="tc-s-health">$12,000</span></div>
<div class="breakdown-row"><span>401k Match</span><span class="val" id="tc-s-401k">$3,800</span></div>
<div class="breakdown-row"><span>PTO Value</span><span class="val" id="tc-s-pto">$7,308</span></div>
<div class="breakdown-row"><span>Equity / RSUs</span><span class="val" id="tc-s-equity">$0</span></div>
<div class="breakdown-row"><span>Other Benefits</span><span class="val" id="tc-s-other">$1,500</span></div>
<div class="highlight-row"><span>Total Compensation</span><span id="tc-s-total">$127,608</span></div>
</div>
</div></div>
<div class="calc-article"><h2>What Benefits Are Worth the Most?</h2><p><strong>401k match:</strong> 100% instant return on contributed dollars — always maximize this first. A 4% match on $95K is $3,800/year in free money.</p><p><strong>Health insurance:</strong> Often the largest hidden benefit. Employer-sponsored family coverage can be worth $20,000+/year. Comparing offers? Calculate the employer contribution difference, not just premiums you pay.</p><p><strong>Equity (RSUs/options):</strong> Can dwarf salary at growth companies. At tech firms, $50K salary + $200K in RSUs vesting over 4 years = $100K total comp annually.</p></div>`
);
tcHtml = tcHtml.replace('</body>', `<script>
function fmtTC(n){return '$'+Math.round(n).toLocaleString();}
function calcTC(){
  var sal=parseFloat(document.getElementById('tc-salary').value)||95000;
  var bonus=parseFloat(document.getElementById('tc-bonus').value)||0;
  var health=parseFloat(document.getElementById('tc-health').value)||0;
  var k4pct=parseFloat(document.getElementById('tc-401k-pct').value)/100||0;
  var pto=parseFloat(document.getElementById('tc-pto').value)||0;
  var equity=parseFloat(document.getElementById('tc-equity').value)||0;
  var other=parseFloat(document.getElementById('tc-other').value)||0;
  var k4val=sal*k4pct;
  var ptoVal=sal/2080*pto*8;
  var benefits=health+k4val+ptoVal+equity+other;
  var total=sal+bonus+benefits;
  var bPct=Math.round(benefits/sal*100);
  var hourly=total/2080;
  document.getElementById('tc-result').textContent=fmtTC(total);
  document.getElementById('tc-sub').textContent=bPct+'% above base salary';
  document.getElementById('tc-benefits-total').textContent=fmtTC(benefits+bonus);
  document.getElementById('tc-benefits-pct').textContent=bPct+'%';
  document.getElementById('tc-hourly').textContent='$'+(Math.round(hourly*100)/100).toFixed(2);
  document.getElementById('tc-s-sal').textContent=fmtTC(sal);
  document.getElementById('tc-s-bonus').textContent=fmtTC(bonus);
  document.getElementById('tc-s-health').textContent=fmtTC(health);
  document.getElementById('tc-s-401k').textContent=fmtTC(k4val);
  document.getElementById('tc-s-pto').textContent=fmtTC(ptoVal);
  document.getElementById('tc-s-equity').textContent=fmtTC(equity);
  document.getElementById('tc-s-other').textContent=fmtTC(other);
  document.getElementById('tc-s-total').textContent=fmtTC(total);
}
calcTC();
<\/script></body>`);
fs.writeFileSync(B+'total-compensation-calculator.html',tcHtml);
console.log('Built: total-compensation-calculator');

// Fuel savings calculator
var fsHtml = wrap('fuel-savings-calculator',
  'Fuel Savings Calculator 2026 | Gas Cost & MPG Comparison',
  'Calculate annual fuel savings by switching to a more fuel-efficient vehicle or EV. Compare monthly gas costs, break-even point, and 5-year savings.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Fuel Savings Calculator 2026","url":`${DOMAIN}/fuel-savings-calculator`,"description":"Calculate annual fuel cost and compare gas savings between vehicles. See break-even on a more efficient car and 5-year total savings.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much do I save per year with a more fuel-efficient car?","acceptedAnswer":{"@type":"Answer","text":"Switching from 20 MPG to 35 MPG saves about $950/year at $3.50/gallon and 15,000 miles/year driven. Switching from 20 MPG to an EV (equivalent ~120 MPGe) saves $1,800-$2,400/year in fuel costs alone. The savings depend heavily on your annual mileage and local gas/electricity prices."}},{"@type":"Question","name":"How do you calculate gas cost per mile?","acceptedAnswer":{"@type":"Answer","text":"Gas cost per mile = gas price ÷ MPG. At $3.50/gallon and 30 MPG, it costs $0.117 per mile ($11.67 per 100 miles). The IRS standard mileage rate of $0.67/mile (2024) covers gas plus other vehicle costs. Use the calculator above to see your exact cost per mile."}},{"@type":"Question","name":"How long does it take to break even on a fuel-efficient car?","acceptedAnswer":{"@type":"Answer","text":"Break-even = price premium ÷ annual fuel savings. A hybrid that costs $4,000 more than a comparable non-hybrid but saves $1,200/year in gas breaks even in 3.3 years. EVs with $8,000-$12,000 premiums and $1,800-$2,400/year savings typically break even in 4-6 years. Federal EV tax credits ($3,750-$7,500) significantly shorten break-even."}}]}),
  `<h1 class="calc-title" data-enter>Fuel Savings Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Compare annual gas costs between two vehicles and see how long it takes to break even on a more fuel-efficient upgrade.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="fs-miles">Annual Miles Driven</label><input type="number" id="fs-miles" class="calc-input" value="15000" min="1000" max="100000" step="1000"></div>
<div class="input-group"><label class="input-label" for="fs-gas-price">Gas Price Per Gallon</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="fs-gas-price" class="calc-input" value="3.50" min="1" max="8" step="0.05"></div></div>
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin:12px 0 8px;text-transform:uppercase;letter-spacing:.05em">Current Vehicle</div>
<div class="input-group"><label class="input-label" for="fs-cur-mpg">Current MPG</label><input type="number" id="fs-cur-mpg" class="calc-input" value="24" min="5" max="200" step="1"></div>
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin:12px 0 8px;text-transform:uppercase;letter-spacing:.05em">New Vehicle</div>
<div class="input-group"><label class="input-label" for="fs-new-mpg">New MPG (or MPGe for EV)</label><input type="number" id="fs-new-mpg" class="calc-input" value="40" min="5" max="250" step="1"></div>
<div class="input-group"><label class="input-label" for="fs-price-diff">Price Premium of New Vehicle</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="fs-price-diff" class="calc-input" value="5000" min="0" step="500"></div></div>
<button class="calc-btn" onclick="calcFS()">Calculate Savings</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="fs-result">$875</div><div class="result-label">Annual Fuel Savings</div><div class="result-sub" id="fs-sub">Break-even in 5.7 years</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="fs-cur-cost">$2,188</div><div class="stat-lbl">Current Annual Fuel</div></div>
<div class="stat-card"><div class="stat-num" id="fs-new-cost">$1,313</div><div class="stat-lbl">New Annual Fuel</div></div>
<div class="stat-card"><div class="stat-num" id="fs-5yr">$4,375</div><div class="stat-lbl">5-Year Savings</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Miles Per Year</span><span class="val" id="fs-s-miles">15,000</span></div>
<div class="breakdown-row"><span>Gas Price</span><span class="val" id="fs-s-gas">$3.50</span></div>
<div class="breakdown-row"><span>Current Cost/Mile</span><span class="val" id="fs-s-cpm">$0.146</span></div>
<div class="breakdown-row"><span>New Cost/Mile</span><span class="val" id="fs-s-npm">$0.088</span></div>
<div class="breakdown-row"><span>Price Premium</span><span class="val" id="fs-s-prem">$5,000</span></div>
<div class="highlight-row"><span>Break-Even</span><span id="fs-s-be">5.7 years</span></div>
</div>
</div></div>
<div class="calc-article"><h2>EV vs Hybrid vs Gas: Real Numbers</h2><p>At $3.50/gallon and 15,000 miles/year: a 24 MPG gas car costs $2,188/year in fuel. A 40 MPG hybrid costs $1,313/year ($875 savings). A Tesla Model 3 at ~$0.04/mile in electricity costs about $600/year ($1,588 savings). The EV wins on fuel costs once the price premium is recovered.</p><p>The biggest variable: electricity cost. At $0.12/kWh, EVs are dramatically cheaper. At $0.30/kWh (California peak rates), the gap narrows significantly. Home charging at off-peak rates gives the best results.</p></div>`
);
fsHtml = fsHtml.replace('</body>', `<script>
function fmtFS(n){return '$'+Math.round(n).toLocaleString();}
function calcFS(){
  var mi=parseFloat(document.getElementById('fs-miles').value)||15000;
  var gas=parseFloat(document.getElementById('fs-gas-price').value)||3.5;
  var curMpg=parseFloat(document.getElementById('fs-cur-mpg').value)||24;
  var newMpg=parseFloat(document.getElementById('fs-new-mpg').value)||40;
  var prem=parseFloat(document.getElementById('fs-price-diff').value)||0;
  var curCost=mi/curMpg*gas;
  var newCost=mi/newMpg*gas;
  var saved=curCost-newCost;
  var be=saved>0?prem/saved:999;
  document.getElementById('fs-result').textContent=fmtFS(saved);
  document.getElementById('fs-sub').textContent=prem>0&&saved>0?'Break-even in '+(Math.round(be*10)/10)+' years':'No price premium — immediate savings';
  document.getElementById('fs-cur-cost').textContent=fmtFS(curCost);
  document.getElementById('fs-new-cost').textContent=fmtFS(newCost);
  document.getElementById('fs-5yr').textContent=fmtFS(saved*5);
  document.getElementById('fs-s-miles').textContent=mi.toLocaleString();
  document.getElementById('fs-s-gas').textContent='$'+gas;
  document.getElementById('fs-s-cpm').textContent='$'+(Math.round(gas/curMpg*1000)/1000).toFixed(3);
  document.getElementById('fs-s-npm').textContent='$'+(Math.round(gas/newMpg*1000)/1000).toFixed(3);
  document.getElementById('fs-s-prem').textContent=fmtFS(prem);
  document.getElementById('fs-s-be').textContent=prem>0&&saved>0?(Math.round(be*10)/10)+' years':'Immediate';
}
calcFS();
<\/script></body>`);
fs.writeFileSync(B+'fuel-savings-calculator.html',fsHtml);
console.log('Built: fuel-savings-calculator');

console.log('\nBatch 4 complete — 10 pages built.');
