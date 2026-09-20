/**
 * Build batch 2b: annuity, mortgage affordability, pension, property tax, life insurance
 * Run: node _build_new_tools_2b.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';
const DOMAIN = 'https://www.freepayrollcalc.com';

const NAV = `<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search tools"><div class="cmd-modal"><div class="cmd-search-row"><span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span><input class="cmd-input" id="cmd-input" type="text" placeholder="Search 60+ tools..." autocomplete="off" spellcheck="false"><kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd></div><div class="cmd-body" id="cmd-body"></div><div class="cmd-footer"><span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span><span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span><span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span></div></div></div>
<header class="site-header"><div class="container header-inner"><a href="/" class="site-logo">FreePayrollCalc</a>
<nav class="main-nav" aria-label="Main">
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Payroll <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/payroll-tax-calculator" class="nav-item">Payroll Tax</a><a href="/take-home-pay-calculator" class="nav-item">Take-Home Pay</a><a href="/salary-to-hourly-calculator" class="nav-item">Salary to Hourly</a><a href="/net-to-gross-calculator" class="nav-item">Net to Gross</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Tax <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/self-employment-tax-calculator" class="nav-item">Self-Employment Tax</a><a href="/capital-gains-tax-calculator" class="nav-item">Capital Gains Tax</a><a href="/income-tax-calculator" class="nav-item">Income Tax</a><a href="/mileage-reimbursement-calculator" class="nav-item">Mileage Reimbursement</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Home &amp; RE <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/mortgage-calculator" class="nav-item">Mortgage</a><a href="/mortgage-affordability-calculator" class="nav-item">Affordability</a><a href="/home-equity-loan-calculator" class="nav-item">Home Equity Loan</a><a href="/heloc-calculator" class="nav-item">HELOC</a><a href="/closing-costs-calculator" class="nav-item">Closing Costs</a><a href="/property-tax-calculator" class="nav-item">Property Tax</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Loans <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/car-loan-calculator" class="nav-item">Car Loan</a><a href="/personal-loan-calculator" class="nav-item">Personal Loan</a><a href="/sba-loan-calculator" class="nav-item">SBA Loan</a><a href="/business-loan-calculator" class="nav-item">Business Loan</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Retirement <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/roth-ira-calculator" class="nav-item">Roth IRA</a><a href="/required-minimum-distribution-calculator" class="nav-item">RMD Calculator</a><a href="/pension-calculator" class="nav-item">Pension</a><a href="/annuity-calculator" class="nav-item">Annuity</a><a href="/life-insurance-calculator" class="nav-item">Life Insurance</a><a href="/compound-interest-calculator" class="nav-item">Compound Interest</a></div></div>
</nav>
<div class="header-actions"><button class="btn-search" id="btn-search" aria-label="Search tools"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button><a href="/tools" class="btn-all-tools">All Tools</a></div>
</div></header>`;

const FTR = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreePayrollCalc</a><p class="footer-tagline">Free financial calculators. No sign-up required.</p></div><div><div class="footer-col-title">Home Buying</div><nav class="footer-nav"><a href="/mortgage-affordability-calculator">Affordability</a><a href="/closing-costs-calculator">Closing Costs</a><a href="/property-tax-calculator">Property Tax</a><a href="/mortgage-calculator">Mortgage</a></nav></div><div><div class="footer-col-title">Retirement</div><nav class="footer-nav"><a href="/annuity-calculator">Annuity</a><a href="/pension-calculator">Pension</a><a href="/roth-ira-calculator">Roth IRA</a><a href="/life-insurance-calculator">Life Insurance</a></nav></div><div><div class="footer-col-title">Loans</div><nav class="footer-nav"><a href="/car-loan-calculator">Car Loan</a><a href="/personal-loan-calculator">Personal Loan</a><a href="/home-equity-loan-calculator">Home Equity</a><a href="/heloc-calculator">HELOC</a></nav></div></div><div class="footer-bottom"><p>&copy; 2026 FreePayrollCalc.com &mdash; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a></p><p class="footer-disclaimer">For informational purposes only. Not financial advice.</p></div></div></footer>`;

const CSS = `.result-card{background:linear-gradient(135deg,rgba(27,79,216,.07),rgba(27,79,216,.02));border:2px solid rgba(27,79,216,.2);border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}.result-big{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}.result-label{font-size:13px;font-weight:700;color:var(--ink-2)}.result-sub{font-size:12px;color:var(--ink-3);margin-top:4px}.stat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}@media(max-width:640px){.stat-grid{grid-template-columns:1fr 1fr}}.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}.stat-num{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink-1);line-height:1;margin-bottom:3px}.stat-lbl{font-size:11px;color:var(--ink-3);font-weight:600}.breakdown-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);font-size:13px}.breakdown-row:last-child{border-bottom:none}.breakdown-row .val{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--ink-1)}.highlight-row{background:rgba(27,79,216,.04);border-radius:8px;padding:10px 14px;margin-top:4px;display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:var(--accent)}`;

function wrap(slug,title,desc,schema,faqSchema,body){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="icon" href="/shared/favicon.svg" type="image/svg+xml"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${DOMAIN}/${slug}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta name="robots" content="index,follow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=6"><script type="application/ld+json">${schema}<\/script>${faqSchema?`<script type="application/ld+json">${faqSchema}<\/script>`:''}<style>${CSS}</style></head><body>${NAV}<main class="calc-page"><div class="container"><nav class="calc-breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">${title.split('|')[0].trim()}</span></nav><div class="ad-zone ad-zone--leaderboard"></div>${body}</div></main>${FTR}<script src="/shared/scripts.js?v=6" defer><\/script></body></html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ANNUITY CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var annHtml = wrap('annuity-calculator',
  'Annuity Calculator 2026 | Monthly Income + Lump Sum Value',
  'Calculate annuity payments from a lump sum, or how much you need to fund a target monthly income. Supports fixed, immediate, and deferred annuities.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Annuity Calculator 2026","url":`${DOMAIN}/annuity-calculator`,"description":"Calculate annuity monthly income from a lump sum, or find the lump sum needed for a target income. Covers immediate and deferred annuities.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is an annuity?","acceptedAnswer":{"@type":"Answer","text":"An annuity is a contract with an insurance company where you make a lump sum payment (or series of payments) in exchange for regular income payments starting immediately or at a future date. Annuities can provide guaranteed income for life, a fixed period, or a combination."}},{"@type":"Question","name":"How much does a $500,000 annuity pay per month?","acceptedAnswer":{"@type":"Answer","text":"A $500,000 immediate annuity for a 65-year-old can pay approximately $2,500–$3,000/month for life, depending on the insurer, current interest rates, and payout option chosen. The rate varies significantly by age, gender (in some states), and whether you choose single or joint life coverage."}},{"@type":"Question","name":"What is the difference between an immediate and deferred annuity?","acceptedAnswer":{"@type":"Answer","text":"An immediate annuity starts paying income within a year of purchase — you pay a lump sum and income begins almost immediately. A deferred annuity accumulates value over time (the accumulation phase) before converting to income payments. Deferred annuities include fixed, variable, and indexed types."}},{"@type":"Question","name":"Are annuity payments taxable?","acceptedAnswer":{"@type":"Answer","text":"The taxability depends on how the annuity was funded. If purchased with pre-tax money (e.g., from a traditional IRA), 100% of payments are taxable as ordinary income. If purchased with after-tax money, only the earnings portion is taxable. The exclusion ratio determines how much of each payment is a return of principal (not taxed) vs earnings (taxed)."}}]}),
  `<h1 class="calc-title" data-enter>Annuity Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate monthly income from a lump sum annuity, or find how much you need to fund a target monthly income in retirement.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="an-mode">Calculate</label><select id="an-mode" class="calc-select" onchange="calcAnn()"><option value="income" selected>Monthly income from lump sum</option><option value="lump">Lump sum needed for target income</option></select></div>
<div class="input-group" id="an-lump-row"><label class="input-label" for="an-principal">Lump Sum / Annuity Purchase Price</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="an-principal" class="calc-input" value="500000" min="10000" step="5000"></div></div>
<div class="input-group" id="an-target-row" style="display:none"><label class="input-label" for="an-target">Target Monthly Income</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="an-target" class="calc-input" value="2500" min="100" step="100"></div></div>
<div class="input-group"><label class="input-label" for="an-rate">Annual Interest / Payout Rate</label><div class="input-prefix-wrap"><input type="number" id="an-rate" class="calc-input" value="6" min="1" max="15" step="0.25"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="an-years">Payout Period</label><select id="an-years" class="calc-select"><option value="10">10 years</option><option value="15">15 years</option><option value="20" selected>20 years</option><option value="25">25 years</option><option value="30">30 years</option><option value="life">Life (to age 90)</option></select></div>
<div class="input-group"><label class="input-label" for="an-age">Current Age (for life annuity)</label><input type="number" id="an-age" class="calc-input" value="65" min="50" max="85" step="1"></div>
<button class="calc-btn" onclick="calcAnn()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="an-result">$3,582</div><div class="result-label" id="an-result-label">Monthly Income</div><div class="result-sub" id="an-sub">From $500,000 over 20 years at 6%</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="an-annual">$42,984</div><div class="stat-lbl">Annual Income</div></div>
<div class="stat-card"><div class="stat-num" id="an-total-out">$859,680</div><div class="stat-lbl">Total Payments</div></div>
<div class="stat-card"><div class="stat-num" id="an-gain">$359,680</div><div class="stat-lbl">Total Interest Earned</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Annuity Purchase Price</span><span class="val" id="an-s-principal">$500,000</span></div>
<div class="breakdown-row"><span>Monthly Payout</span><span class="val" id="an-s-monthly">$3,582</span></div>
<div class="breakdown-row"><span>Annual Income</span><span class="val" id="an-s-annual">$42,984</span></div>
<div class="breakdown-row"><span>Payout Period</span><span class="val" id="an-s-period">20 years (240 payments)</span></div>
<div class="breakdown-row"><span>Total Received</span><span class="val" id="an-s-total">$859,680</span></div>
<div class="highlight-row"><span>Interest Earned</span><span id="an-s-gain">$359,680</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Types of Annuities</h2><p><strong>Immediate annuity:</strong> You pay a lump sum and income starts within 12 months. Best for retirees who need income now. Rates are competitive when interest rates are high.</p><p><strong>Fixed deferred annuity:</strong> Like a CD inside an insurance wrapper. Your money grows at a guaranteed rate during the accumulation phase, then you can convert to income or withdraw. Offers principal protection.</p><p><strong>Variable annuity:</strong> Your principal is invested in sub-accounts (like mutual funds). Growth is not guaranteed — you can earn more or lose money. Usually comes with high fees and surrender charges.</p><p><strong>Fixed indexed annuity (FIA):</strong> Growth is linked to a market index (like the S&P 500) with a floor (you can't lose principal) and a cap (limits your upside). Balances protection and growth potential.</p><h3>Annuity vs Investing the Same Money</h3><p>The key annuity advantage: longevity insurance. If you live to 95, an annuity keeps paying — a personal portfolio might be depleted. The disadvantage: if you die early, the insurance company keeps the remainder (unless you choose a period-certain or return-of-premium rider).</p></div>`
);
annHtml = annHtml.replace('</body>', `<script>
function fmtA(n){return '$'+Math.round(n).toLocaleString();}
function calcAnn(){
  var mode=document.getElementById('an-mode').value;
  document.getElementById('an-lump-row').style.display=mode==='income'?'block':'none';
  document.getElementById('an-target-row').style.display=mode==='lump'?'block':'none';
  var rate=parseFloat(document.getElementById('an-rate').value)/100/12;
  var yearsVal=document.getElementById('an-years').value;
  var age=parseInt(document.getElementById('an-age').value)||65;
  var n=yearsVal==='life'?Math.max(1,(90-age))*12:parseInt(yearsVal)*12;
  var periodLabel=yearsVal==='life'?('Life (est. '+(90-age)+' yrs, '+n+' payments)'):yearsVal+' years ('+n+' payments)';
  if(mode==='income'){
    var P=parseFloat(document.getElementById('an-principal').value)||500000;
    var pay=rate>0?P*rate*Math.pow(1+rate,n)/(Math.pow(1+rate,n)-1):P/n;
    var totalOut=pay*n, gain=totalOut-P;
    document.getElementById('an-result').textContent=fmtA(pay);
    document.getElementById('an-result-label').textContent='Monthly Income';
    document.getElementById('an-sub').textContent='From '+fmtA(P)+' over '+(n/12).toFixed(0)+' years at '+document.getElementById('an-rate').value+'%';
    document.getElementById('an-annual').textContent=fmtA(pay*12);
    document.getElementById('an-total-out').textContent=fmtA(totalOut);
    document.getElementById('an-gain').textContent=fmtA(gain);
    document.getElementById('an-s-principal').textContent=fmtA(P);
    document.getElementById('an-s-monthly').textContent=fmtA(pay);
    document.getElementById('an-s-annual').textContent=fmtA(pay*12);
    document.getElementById('an-s-period').textContent=periodLabel;
    document.getElementById('an-s-total').textContent=fmtA(totalOut);
    document.getElementById('an-s-gain').textContent=fmtA(gain);
  } else {
    var target=parseFloat(document.getElementById('an-target').value)||2500;
    var lump=rate>0?target*(Math.pow(1+rate,n)-1)/(rate*Math.pow(1+rate,n)):target*n;
    var totalOut=target*n, gain=totalOut-lump;
    document.getElementById('an-result').textContent=fmtA(lump);
    document.getElementById('an-result-label').textContent='Lump Sum Needed';
    document.getElementById('an-sub').textContent='To fund $'+target.toLocaleString()+'/mo for '+(n/12).toFixed(0)+' years at '+document.getElementById('an-rate').value+'%';
    document.getElementById('an-annual').textContent=fmtA(target*12);
    document.getElementById('an-total-out').textContent=fmtA(totalOut);
    document.getElementById('an-gain').textContent=fmtA(gain);
    document.getElementById('an-s-principal').textContent=fmtA(lump);
    document.getElementById('an-s-monthly').textContent=fmtA(target);
    document.getElementById('an-s-annual').textContent=fmtA(target*12);
    document.getElementById('an-s-period').textContent=periodLabel;
    document.getElementById('an-s-total').textContent=fmtA(totalOut);
    document.getElementById('an-s-gain').textContent=fmtA(gain);
  }
}
document.addEventListener('DOMContentLoaded',calcAnn);
['an-principal','an-target','an-rate','an-age'].forEach(function(id){document.getElementById(id).addEventListener('input',calcAnn);});
document.getElementById('an-years').addEventListener('change',calcAnn);
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 7. MORTGAGE AFFORDABILITY CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var maHtml = wrap('mortgage-affordability-calculator',
  'Mortgage Affordability Calculator 2026 | Max Home Price',
  'Calculate how much house you can afford based on income, debts, and down payment. Uses 28/36 rule and 43% DTI limit for qualified mortgages.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Mortgage Affordability Calculator 2026","url":`${DOMAIN}/mortgage-affordability-calculator`,"description":"Find the maximum home price you can afford based on annual income, monthly debts, and down payment. Uses 28/36 rule and DTI analysis.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much house can I afford on my income?","acceptedAnswer":{"@type":"Answer","text":"A common rule: spend no more than 28% of gross monthly income on housing (the 'front-end ratio'). On $80,000/year ($6,667/month), that's $1,867/month for mortgage, taxes, and insurance. With a 7% rate and 20% down, that income supports roughly a $250,000 home purchase."}},{"@type":"Question","name":"What is the 28/36 rule for mortgages?","acceptedAnswer":{"@type":"Answer","text":"The 28/36 rule: your monthly housing costs (PITI — principal, interest, taxes, insurance) should not exceed 28% of gross monthly income, and total monthly debt payments (housing + car loans, student loans, credit cards) should not exceed 36%. Most conventional lenders use these as guidelines, though many allow up to 43% total DTI."}},{"@type":"Question","name":"What is a debt-to-income ratio (DTI) for a mortgage?","acceptedAnswer":{"@type":"Answer","text":"DTI is your total monthly debt payments divided by gross monthly income. Most lenders require a DTI under 43% for a qualified mortgage (QM). Some FHA loans allow up to 50% DTI. Conventional loans with strong compensating factors (large down payment, excellent credit) may go to 45–50%."}},{"@type":"Question","name":"Does pre-approval mean I can afford the house?","acceptedAnswer":{"@type":"Answer","text":"Pre-approval shows you qualify for the loan — not that the payment is comfortable. Lenders approve based on DTI ratios that can leave very little money for savings, emergencies, or lifestyle. Many financial advisors recommend borrowing 10%–20% less than the pre-approval amount to maintain financial flexibility."}}]}),
  `<h1 class="calc-title" data-enter>Mortgage Affordability Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Find the maximum home price you can afford based on income, existing debts, and down payment. See your DTI and front-end ratios.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="ma-income">Annual Gross Income</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ma-income" class="calc-input" value="95000" min="20000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="ma-debts">Monthly Debt Payments (car, student, etc.)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ma-debts" class="calc-input" value="400" min="0" step="50"></div></div>
<div class="input-group"><label class="input-label" for="ma-down">Down Payment</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ma-down" class="calc-input" value="60000" min="0" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="ma-rate">Mortgage Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="ma-rate" class="calc-input" value="7.0" min="3" max="15" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="ma-term">Loan Term</label><select id="ma-term" class="calc-select"><option value="30" selected>30 years</option><option value="20">20 years</option><option value="15">15 years</option></select></div>
<div class="input-group"><label class="input-label" for="ma-tax-rate">Annual Property Tax Rate</label><div class="input-prefix-wrap"><input type="number" id="ma-tax-rate" class="calc-input" value="1.1" min="0.1" max="4" step="0.1"><span class="input-suffix">%</span></div></div>
<button class="calc-btn" onclick="calcMA()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="ma-max-price">$378,000</div><div class="result-label">Maximum Home Price</div><div class="result-sub" id="ma-sub">Based on 36% back-end DTI</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="ma-max-payment">$2,212</div><div class="stat-lbl">Max Monthly Payment</div></div>
<div class="stat-card"><div class="stat-num" id="ma-dti">36%</div><div class="stat-lbl">Back-End DTI</div></div>
<div class="stat-card"><div class="stat-num" id="ma-front">27%</div><div class="stat-lbl">Front-End DTI</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Gross Monthly Income</span><span class="val" id="ma-s-income">$7,917</span></div>
<div class="breakdown-row"><span>Max Housing (28% front-end)</span><span class="val" id="ma-s-front-max">$2,217</span></div>
<div class="breakdown-row"><span>Existing Monthly Debts</span><span class="val" id="ma-s-debts">$400</span></div>
<div class="breakdown-row"><span>Max Housing (36% back-end)</span><span class="val" id="ma-s-back-max">$2,450</span></div>
<div class="breakdown-row"><span>Binding Limit Used</span><span class="val" id="ma-s-binding">28% front-end</span></div>
<div class="breakdown-row"><span>Max Loan Amount</span><span class="val" id="ma-s-loan">$318,000</span></div>
<div class="highlight-row"><span>Max Home Price (with down payment)</span><span id="ma-s-price">$378,000</span></div>
</div>
<div id="ma-warn" style="display:none;background:#fee2e2;border:1px solid #fca5a5;border-radius:10px;padding:14px;margin-top:12px;font-size:13px;color:#dc2626"></div>
</div></div>
<div class="calc-article"><h2>The 28/36 Rule Explained</h2><p>Lenders use two DTI ratios to assess mortgage affordability:</p><ul><li><strong>Front-end ratio (28%):</strong> Monthly housing costs (PITI) ÷ gross monthly income. Should not exceed 28%.</li><li><strong>Back-end ratio (36%):</strong> Total monthly debt payments (housing + all other debts) ÷ gross monthly income. Should not exceed 36%.</li></ul><p>The lower of the two binding limits determines your maximum monthly housing payment. Then, working backward through the mortgage formula, you arrive at the maximum purchase price.</p><h3>FHA vs Conventional Limits</h3><p>Conventional loans: typically 28/36, flexible to 45–50% with strong credit. FHA loans: up to 31/43%, flexible to 50% with compensating factors. VA and USDA loans focus primarily on residual income rather than DTI ratios.</p></div>`
);
maHtml = maHtml.replace('</body>', `<script>
function fmtMA(n){return '$'+Math.round(n).toLocaleString();}
function calcMA(){
  var income=parseFloat(document.getElementById('ma-income').value)||95000;
  var debts=parseFloat(document.getElementById('ma-debts').value)||0;
  var down=parseFloat(document.getElementById('ma-down').value)||0;
  var rate=parseFloat(document.getElementById('ma-rate').value)/100/12;
  var n=parseInt(document.getElementById('ma-term').value)*12;
  var taxRate=parseFloat(document.getElementById('ma-tax-rate').value)/100;
  var monthlyIncome=income/12;
  var frontMax=monthlyIncome*0.28;
  var backMax=monthlyIncome*0.36-debts;
  var maxPITI=Math.min(frontMax,Math.max(0,backMax));
  var binding=frontMax<=backMax?'28% front-end':'36% back-end';
  // Estimate P&I portion (deduct ~tax&ins estimate of 0.2%/month of home value)
  // Iterative: max home price where PITI = maxPITI
  var guess=maxPITI*100, homePrice=guess;
  for(var i=0;i<30;i++){
    var loan=homePrice-down;
    var pi=loan>0&&rate>0?loan*rate*Math.pow(1+rate,n)/(Math.pow(1+rate,n)-1):0;
    var taxes=homePrice*taxRate/12;
    var ins=homePrice*0.0035/12;
    var piti=pi+taxes+ins;
    homePrice=homePrice*(maxPITI/piti);
    if(Math.abs(piti-maxPITI)<1) break;
  }
  homePrice=Math.max(0,homePrice);
  var finalLoan=Math.max(0,homePrice-down);
  var finalPI=finalLoan>0&&rate>0?finalLoan*rate*Math.pow(1+rate,n)/(Math.pow(1+rate,n)-1):0;
  var finalTax=homePrice*taxRate/12;
  var finalIns=homePrice*0.0035/12;
  var finalPITI=finalPI+finalTax+finalIns;
  var frontDTI=(finalPITI/monthlyIncome*100);
  var backDTI=((finalPITI+debts)/monthlyIncome*100);
  document.getElementById('ma-max-price').textContent=fmtMA(homePrice);
  document.getElementById('ma-sub').textContent='Based on '+binding+' limit';
  document.getElementById('ma-max-payment').textContent=fmtMA(finalPITI);
  document.getElementById('ma-dti').textContent=backDTI.toFixed(1)+'%';
  document.getElementById('ma-front').textContent=frontDTI.toFixed(1)+'%';
  document.getElementById('ma-s-income').textContent=fmtMA(monthlyIncome);
  document.getElementById('ma-s-front-max').textContent=fmtMA(frontMax);
  document.getElementById('ma-s-debts').textContent=fmtMA(debts);
  document.getElementById('ma-s-back-max').textContent=fmtMA(Math.max(0,backMax));
  document.getElementById('ma-s-binding').textContent=binding;
  document.getElementById('ma-s-loan').textContent=fmtMA(finalLoan);
  document.getElementById('ma-s-price').textContent=fmtMA(homePrice);
  var warn=document.getElementById('ma-warn');
  if(backMax<=0){warn.style.display='block';warn.textContent='⚠ Your existing debts ($'+debts.toLocaleString()+'/mo) exceed the 36% DTI limit at this income. You may not qualify for a conventional mortgage. Consider paying down debts first.';}
  else{warn.style.display='none';}
}
document.addEventListener('DOMContentLoaded',calcMA);
['ma-income','ma-debts','ma-down','ma-rate','ma-tax-rate'].forEach(function(id){document.getElementById(id).addEventListener('input',calcMA);});
document.getElementById('ma-term').addEventListener('change',calcMA);
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 8. PENSION CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var penHtml = wrap('pension-calculator',
  'Pension Calculator 2026 | Monthly Benefit + Lump Sum Value',
  'Calculate your defined benefit pension payout based on years of service, final salary, and plan multiplier. Compare monthly income vs lump sum options.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Pension Calculator 2026","url":`${DOMAIN}/pension-calculator`,"description":"Calculate your defined benefit pension monthly income, annual benefit, and lump sum equivalent. Compare survivor benefit options.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is a defined benefit pension calculated?","acceptedAnswer":{"@type":"Answer","text":"The standard formula is: Annual pension = Years of service × Final average salary × Benefit multiplier. Example: 30 years × $75,000 × 2% = $45,000/year ($3,750/month). The multiplier varies by plan — public school teachers often use 2%–2.5%, government employees 1.5%–2%, private plans often 1%–1.5%."}},{"@type":"Question","name":"What is the difference between a pension and a 401k?","acceptedAnswer":{"@type":"Answer","text":"A pension (defined benefit plan) guarantees a fixed monthly income in retirement, calculated by a formula. The employer bears the investment risk. A 401(k) (defined contribution plan) depends on how much you contribute and how well your investments perform. You bear the investment risk. Pensions are increasingly rare in private sector; still common in government and military."}},{"@type":"Question","name":"Should I take a lump sum or monthly pension payments?","acceptedAnswer":{"@type":"Answer","text":"This depends on your health, investment ability, and need for guaranteed income. Monthly payments are safer if you expect to live a long time and want predictable income. A lump sum is better if you're in poor health, have a spouse who doesn't need survivor income, or are confident in your ability to invest. Most financial advisors favor monthly payments unless the lump sum is unusually large."}},{"@type":"Question","name":"What is a pension multiplier?","acceptedAnswer":{"@type":"Answer","text":"The benefit multiplier (or accrual rate) is the percentage of final salary credited per year of service. A 2% multiplier with 30 years of service = 60% of final salary. Common multipliers: 1.25%–1.5% (private plans), 2%–2.5% (state/local government teachers), up to 2.5%–3% (military, some police/fire plans)."}}]}),
  `<h1 class="calc-title" data-enter>Pension Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your defined benefit pension monthly income. Compare single-life vs joint-and-survivor options, and monthly income vs lump sum.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="pen-salary">Final Average Salary</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="pen-salary" class="calc-input" value="75000" min="10000" step="1000"></div><div class="input-hint">Typically average of final 3–5 years</div></div>
<div class="input-group"><label class="input-label" for="pen-years">Years of Service</label><input type="number" id="pen-years" class="calc-input" value="30" min="1" max="50" step="1"></div>
<div class="input-group"><label class="input-label" for="pen-mult">Benefit Multiplier</label><div class="input-prefix-wrap"><input type="number" id="pen-mult" class="calc-input" value="2.0" min="0.5" max="3.5" step="0.25"><span class="input-suffix">%</span></div><div class="input-hint">Per year of service. Teachers: 2–2.5%. Govt: 1.5–2%. Private: 1–1.5%.</div></div>
<div class="input-group"><label class="input-label" for="pen-cola">Annual COLA Increase</label><div class="input-prefix-wrap"><input type="number" id="pen-cola" class="calc-input" value="2" min="0" max="5" step="0.5"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="pen-retire-age">Retirement Age</label><input type="number" id="pen-retire-age" class="calc-input" value="62" min="50" max="75" step="1"></div>
<button class="calc-btn" onclick="calcPen()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="pen-monthly">$3,750</div><div class="result-label">Monthly Pension (single life)</div><div class="result-sub" id="pen-sub">30 yrs × $75K × 2.0%</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="pen-annual">$45,000</div><div class="stat-lbl">Annual Benefit</div></div>
<div class="stat-card"><div class="stat-num" id="pen-pct">60%</div><div class="stat-lbl">Replacement Rate</div></div>
<div class="stat-card"><div class="stat-num" id="pen-lump">$675,000</div><div class="stat-lbl">Lump Sum Equiv.</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Final Avg. Salary</span><span class="val" id="pen-s-salary">$75,000</span></div>
<div class="breakdown-row"><span>Years of Service</span><span class="val" id="pen-s-years">30</span></div>
<div class="breakdown-row"><span>Benefit Multiplier</span><span class="val" id="pen-s-mult">2.0%</span></div>
<div class="breakdown-row"><span>Annual Benefit</span><span class="val" id="pen-s-annual">$45,000</span></div>
<div class="breakdown-row"><span>Monthly — Single Life</span><span class="val" id="pen-s-single">$3,750</span></div>
<div class="breakdown-row"><span>Monthly — 100% Survivor (est.)</span><span class="val" id="pen-s-joint">$3,188</span></div>
<div class="breakdown-row"><span>Monthly — 50% Survivor (est.)</span><span class="val" id="pen-s-joint50">$3,450</span></div>
<div class="highlight-row"><span>Lump Sum Equivalent (15× annual)</span><span id="pen-s-lump">$675,000</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Pension Benefit Formula</h2><p><strong>Annual pension = Final average salary × Years of service × Benefit multiplier</strong></p><p>On a 2% multiplier: 30 years of service = 60% income replacement. 40 years = 80% replacement. Most financial planners target 70%–80% income replacement in retirement (from pension + Social Security combined).</p><h3>Single Life vs Survivor Benefits</h3><p>A <strong>single-life annuity</strong> pays the highest monthly amount but stops at death — your spouse receives nothing. A <strong>joint-and-survivor annuity</strong> reduces your monthly payment by 5%–20% but continues paying your spouse (at 50%–100% of your benefit) after you die. If your spouse is significantly younger or in poor health, the single-life option may make more financial sense.</p><h3>Lump Sum vs Monthly Payments</h3><p>The lump sum is typically valued at 15–20× the annual benefit. At 15× and a $45,000/year pension, the lump sum equivalent is $675,000. If you can invest that sum and earn 6%+ consistently, the lump sum may be better. Most people benefit more from the guaranteed monthly income — especially as a complement to Social Security.</p></div>`
);
penHtml = penHtml.replace('</body>', `<script>
function fmtP(n){return '$'+Math.round(n).toLocaleString();}
function calcPen(){
  var sal=parseFloat(document.getElementById('pen-salary').value)||75000;
  var yrs=parseFloat(document.getElementById('pen-years').value)||30;
  var mult=parseFloat(document.getElementById('pen-mult').value)/100;
  var annual=sal*yrs*mult;
  var monthly=annual/12;
  var pct=yrs*mult*100;
  var lump=annual*15;
  document.getElementById('pen-monthly').textContent=fmtP(monthly);
  document.getElementById('pen-sub').textContent=yrs+' yrs × $'+sal.toLocaleString()+' × '+document.getElementById('pen-mult').value+'%';
  document.getElementById('pen-annual').textContent=fmtP(annual);
  document.getElementById('pen-pct').textContent=pct.toFixed(0)+'%';
  document.getElementById('pen-lump').textContent=fmtP(lump);
  document.getElementById('pen-s-salary').textContent=fmtP(sal);
  document.getElementById('pen-s-years').textContent=yrs;
  document.getElementById('pen-s-mult').textContent=document.getElementById('pen-mult').value+'%';
  document.getElementById('pen-s-annual').textContent=fmtP(annual);
  document.getElementById('pen-s-single').textContent=fmtP(monthly);
  document.getElementById('pen-s-joint').textContent=fmtP(monthly*0.85);
  document.getElementById('pen-s-joint50').textContent=fmtP(monthly*0.92);
  document.getElementById('pen-s-lump').textContent=fmtP(lump);
}
document.addEventListener('DOMContentLoaded',calcPen);
['pen-salary','pen-years','pen-mult'].forEach(function(id){document.getElementById(id).addEventListener('input',calcPen);});
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 9. PROPERTY TAX CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var ptHtml = wrap('property-tax-calculator',
  'Property Tax Calculator 2026 | Annual Tax + Monthly Escrow',
  'Calculate annual property tax and monthly escrow payment by state or custom mill rate. See effective tax rate and how assessed value affects your bill.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Property Tax Calculator 2026","url":`${DOMAIN}/property-tax-calculator`,"description":"Calculate annual property tax by state or custom rate. See monthly escrow amount and effective tax rate. Includes all 50 state average rates.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What states have the highest property taxes?","acceptedAnswer":{"@type":"Answer","text":"The highest effective property tax rates are in New Jersey (2.23%), Illinois (2.08%), Connecticut (1.92%), New Hampshire (1.89%), and Vermont (1.83%). These states often have higher home values and more robust public services funded by property taxes."}},{"@type":"Question","name":"What states have the lowest property taxes?","acceptedAnswer":{"@type":"Answer","text":"States with the lowest effective property tax rates: Hawaii (0.32%), Alabama (0.40%), Colorado (0.48%), Nevada (0.48%), and Louisiana (0.51%). Hawaii's low rate is offset by very high home values, so actual dollar amounts can still be significant."}},{"@type":"Question","name":"How is property tax calculated?","acceptedAnswer":{"@type":"Answer","text":"Property tax = Assessed value × Mill rate. Many counties assess at less than full market value (e.g., 80% assessment ratio). So: $300,000 home × 80% assessment = $240,000 assessed value × 1.5% tax rate = $3,600/year. Your assessment notice shows both the assessed value and the mill rate."}},{"@type":"Question","name":"Can I appeal my property tax assessment?","acceptedAnswer":{"@type":"Answer","text":"Yes. If you believe your home's assessed value is higher than its market value, you can file an appeal with your county assessor's office. You typically need comparable sales (similar homes that sold recently for less). About 30%–50% of appeals result in reductions. Filing deadlines vary by county, typically within 60–90 days of assessment notice."}}]}),
  `<h1 class="calc-title" data-enter>Property Tax Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Estimate your annual property tax and monthly escrow payment. Select your state or enter a custom rate.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="pt-value">Home Market Value</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="pt-value" class="calc-input" value="350000" min="10000" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="pt-mode">Rate Source</label><select id="pt-mode" class="calc-select" onchange="calcPT()"><option value="state" selected>Select by State</option><option value="custom">Custom Rate</option></select></div>
<div class="input-group" id="pt-state-row"><label class="input-label" for="pt-state">State</label><select id="pt-state" class="calc-select"><option value="0.32">Hawaii — 0.32%</option><option value="0.40">Alabama — 0.40%</option><option value="0.48">Colorado — 0.48%</option><option value="0.48">Nevada — 0.48%</option><option value="0.51">Louisiana — 0.51%</option><option value="0.52">South Carolina — 0.52%</option><option value="0.55">West Virginia — 0.55%</option><option value="0.56">Wyoming — 0.56%</option><option value="0.59">Arkansas — 0.59%</option><option value="0.60">Utah — 0.60%</option><option value="0.66">Delaware — 0.66%</option><option value="0.67">Arizona — 0.67%</option><option value="0.68">Tennessee — 0.68%</option><option value="0.68">Idaho — 0.68%</option><option value="0.74">Mississippi — 0.74%</option><option value="0.74">Kentucky — 0.74%</option><option value="0.75">Oklahoma — 0.75%</option><option value="0.77">New Mexico — 0.77%</option><option value="0.79">Virginia — 0.79%</option><option value="0.80">California — 0.80%</option><option value="0.81">North Carolina — 0.81%</option><option value="0.82">Montana — 0.82%</option><option value="0.84">Florida — 0.84%</option><option value="0.85">Indiana — 0.85%</option><option value="0.86">Georgia — 0.86%</option><option value="0.89">Missouri — 0.89%</option><option value="0.90">Washington — 0.90%</option><option value="0.95">Oregon — 0.95%</option><option value="0.96">Maryland — 0.96%</option><option value="0.98">Minnesota — 0.98%</option><option value="1.00">Massachusetts — 1.00%</option><option value="1.03">South Dakota — 1.03%</option><option value="1.04">Maine — 1.04%</option><option value="1.04">Alaska — 1.04%</option><option value="1.07">North Dakota — 1.07%</option><option value="1.09">Kansas — 1.09%</option><option value="1.10">Iowa — 1.10%</option><option value="1.11">Pennsylvania — 1.11%</option><option value="1.12">Nebraska — 1.12%</option><option value="1.13">Michigan — 1.13%</option><option value="1.17">Ohio — 1.17%</option><option value="1.18">Rhode Island — 1.18%</option><option value="1.19">New York — 1.19%</option><option value="1.25">Texas — 1.25%</option><option value="1.37">Wisconsin — 1.37%</option><option value="1.43">Nebraska — 1.43%</option><option value="1.53">Vermont — 1.53%</option><option value="1.89">New Hampshire — 1.89%</option><option value="1.92">Connecticut — 1.92%</option><option value="2.08">Illinois — 2.08%</option><option value="2.23">New Jersey — 2.23%</option></select></div>
<div class="input-group" id="pt-custom-row" style="display:none"><label class="input-label" for="pt-custom">Custom Tax Rate</label><div class="input-prefix-wrap"><input type="number" id="pt-custom" class="calc-input" value="1.2" min="0.1" max="5" step="0.05"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="pt-assess">Assessment Ratio</label><div class="input-prefix-wrap"><input type="number" id="pt-assess" class="calc-input" value="100" min="10" max="100" step="5"><span class="input-suffix">%</span></div><div class="input-hint">Many counties assess at 80–100% of market value</div></div>
<button class="calc-btn" onclick="calcPT()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="pt-annual">$4,200</div><div class="result-label">Annual Property Tax</div><div class="result-sub" id="pt-sub">1.2% effective rate</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="pt-monthly">$350</div><div class="stat-lbl">Monthly Escrow</div></div>
<div class="stat-card"><div class="stat-num" id="pt-assessed">$350,000</div><div class="stat-lbl">Assessed Value</div></div>
<div class="stat-card"><div class="stat-num" id="pt-rate-show">1.20%</div><div class="stat-lbl">Effective Rate</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Market Value</span><span class="val" id="pt-s-market">$350,000</span></div>
<div class="breakdown-row"><span>Assessment Ratio</span><span class="val" id="pt-s-ratio">100%</span></div>
<div class="breakdown-row"><span>Assessed Value</span><span class="val" id="pt-s-assessed">$350,000</span></div>
<div class="breakdown-row"><span>Tax Rate</span><span class="val" id="pt-s-rate">1.20%</span></div>
<div class="breakdown-row"><span>Annual Tax</span><span class="val" id="pt-s-annual">$4,200</span></div>
<div class="highlight-row"><span>Monthly Escrow Payment</span><span id="pt-s-monthly">$350</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Property Tax Rates by State (2026 Averages)</h2><p>Effective property tax rates range from Hawaii's 0.32% to New Jersey's 2.23%. States with no income tax (Texas, Florida) often have higher property taxes to compensate. California's rates are low (0.80%) due to Proposition 13, which limits increases on existing homes.</p><h3>How to Lower Your Property Tax Bill</h3><ul><li><strong>Homestead exemption:</strong> Most states offer a reduction for primary residences — can save $200–$1,500/year</li><li><strong>Senior exemption:</strong> Many counties freeze assessments or reduce taxes for seniors 65+</li><li><strong>Appeal your assessment:</strong> If your assessed value exceeds market value, file an appeal. About 30–50% of appeals succeed</li><li><strong>Veteran/disability exemptions:</strong> Often significant — check your county assessor's website</li></ul></div>`
);
ptHtml = ptHtml.replace('</body>', `<script>
function fmtPT(n){return '$'+Math.round(n).toLocaleString();}
function calcPT(){
  var mode=document.getElementById('pt-mode').value;
  document.getElementById('pt-state-row').style.display=mode==='state'?'block':'none';
  document.getElementById('pt-custom-row').style.display=mode==='custom'?'block':'none';
  var value=parseFloat(document.getElementById('pt-value').value)||350000;
  var rate=mode==='state'?parseFloat(document.getElementById('pt-state').value)/100:parseFloat(document.getElementById('pt-custom').value)/100;
  var assessRatio=parseFloat(document.getElementById('pt-assess').value)/100;
  var assessed=value*assessRatio;
  var annual=assessed*rate;
  var monthly=annual/12;
  document.getElementById('pt-annual').textContent=fmtPT(annual);
  document.getElementById('pt-sub').textContent=(rate*100).toFixed(2)+'% effective rate';
  document.getElementById('pt-monthly').textContent=fmtPT(monthly);
  document.getElementById('pt-assessed').textContent=fmtPT(assessed);
  document.getElementById('pt-rate-show').textContent=(rate*100).toFixed(2)+'%';
  document.getElementById('pt-s-market').textContent=fmtPT(value);
  document.getElementById('pt-s-ratio').textContent=Math.round(assessRatio*100)+'%';
  document.getElementById('pt-s-assessed').textContent=fmtPT(assessed);
  document.getElementById('pt-s-rate').textContent=(rate*100).toFixed(2)+'%';
  document.getElementById('pt-s-annual').textContent=fmtPT(annual);
  document.getElementById('pt-s-monthly').textContent=fmtPT(monthly);
}
document.addEventListener('DOMContentLoaded',calcPT);
['pt-value','pt-assess','pt-custom'].forEach(function(id){document.getElementById(id).addEventListener('input',calcPT);});
document.getElementById('pt-state').addEventListener('change',calcPT);
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 10. LIFE INSURANCE CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var liHtml = wrap('life-insurance-calculator',
  'Life Insurance Calculator 2026 | How Much Coverage Do You Need?',
  'Calculate how much life insurance you need using the DIME method. See term life vs whole life cost estimates and coverage gap analysis.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Life Insurance Calculator 2026","url":`${DOMAIN}/life-insurance-calculator`,"description":"Calculate life insurance coverage needs using the DIME method. Estimate term life insurance cost by age and health. Find your coverage gap.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much life insurance do I need?","acceptedAnswer":{"@type":"Answer","text":"A common rule: 10–12× your annual income. A more precise method is DIME: Debt (all debts except mortgage) + Income (annual income × years until youngest child is 18) + Mortgage (remaining balance) + Education (estimated college costs per child). This gives a personalized coverage figure based on your actual obligations."}},{"@type":"Question","name":"How much does term life insurance cost in 2026?","acceptedAnswer":{"@type":"Answer","text":"A healthy 30-year-old can get $500,000 of 20-year term life insurance for $20–$30/month. A 40-year-old pays $35–$55/month. A 50-year-old pays $80–$130/month. Rates vary significantly by health classification (preferred plus, preferred, standard plus, standard). Smokers pay 2–4× more."}},{"@type":"Question","name":"Term life vs whole life insurance: which should I buy?","acceptedAnswer":{"@type":"Answer","text":"Term life is pure insurance: lower cost, fixed period (10–30 years), no cash value. Whole life is permanent: higher cost (5–10× term), builds cash value, lasts your lifetime. Most financial advisors recommend term life + investing the premium difference. Whole life makes sense for estate planning, covering permanent needs (special needs dependent), or if you've maxed all other tax-advantaged accounts."}},{"@type":"Question","name":"What is the underwriting process for life insurance?","acceptedAnswer":{"@type":"Answer","text":"Most policies require a medical exam (blood draw, urine, weight/height, blood pressure). Results determine your health class: Preferred Plus (best rates, no major health issues), Preferred (minor issues), Standard Plus, Standard (average health). No-exam policies exist but cost 20–40% more. The exam is free and done at your home or office."}}]}),
  `<h1 class="calc-title" data-enter>Life Insurance Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate how much life insurance you need using the DIME method. See your coverage gap and estimated monthly premium for term life insurance.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="li-income">Annual Income</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="li-income" class="calc-input" value="85000" min="0" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="li-income-years">Years of Income to Replace</label><input type="number" id="li-income-years" class="calc-input" value="20" min="1" max="40" step="1"></div>
<div class="input-group"><label class="input-label" for="li-mortgage">Mortgage Balance</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="li-mortgage" class="calc-input" value="280000" min="0" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="li-debts">Other Debts (car, student, credit cards)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="li-debts" class="calc-input" value="40000" min="0" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="li-education">Education Costs (est. per child × children)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="li-education" class="calc-input" value="60000" min="0" step="10000"></div></div>
<div class="input-group"><label class="input-label" for="li-existing">Existing Coverage</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="li-existing" class="calc-input" value="0" min="0" step="10000"></div></div>
<div class="input-group"><label class="input-label" for="li-age">Your Age</label><input type="number" id="li-age" class="calc-input" value="35" min="18" max="70" step="1"></div>
<button class="calc-btn" onclick="calcLI()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="li-needed">$1,680,000</div><div class="result-label">Coverage Needed (DIME Method)</div><div class="result-sub" id="li-gap">Gap: $1,680,000 uncovered</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="li-income-need">$1,700,000</div><div class="stat-lbl">Income Replacement</div></div>
<div class="stat-card"><div class="stat-num" id="li-debt-total">$380,000</div><div class="stat-lbl">Total Debts</div></div>
<div class="stat-card"><div class="stat-num" id="li-term-premium">~$32/mo</div><div class="stat-lbl">Est. 20yr Term Cost</div></div>
</div>
<div class="calc-card">
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.06em">DIME Breakdown</div>
<div class="breakdown-row"><span>D — Other Debts</span><span class="val" id="li-s-debt">$40,000</span></div>
<div class="breakdown-row"><span>I — Income Replacement</span><span class="val" id="li-s-income">$1,700,000</span></div>
<div class="breakdown-row"><span>M — Mortgage Balance</span><span class="val" id="li-s-mortgage">$280,000</span></div>
<div class="breakdown-row"><span>E — Education</span><span class="val" id="li-s-education">$60,000</span></div>
<div class="breakdown-row"><span>Total Needed</span><span class="val" id="li-s-total">$2,080,000</span></div>
<div class="breakdown-row"><span>Existing Coverage</span><span class="val" id="li-s-existing">-$0</span></div>
<div class="highlight-row"><span>Coverage Gap</span><span id="li-s-gap">$2,080,000</span></div>
</div>
<div class="calc-card" style="margin-top:12px">
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Est. Monthly Premium (Healthy Non-Smoker)</div>
<div class="breakdown-row"><span>Term Life — 20 Year</span><span class="val" id="li-p-20">~$32/mo</span></div>
<div class="breakdown-row"><span>Term Life — 30 Year</span><span class="val" id="li-p-30">~$52/mo</span></div>
</div>
</div></div>
<div class="calc-article"><h2>The DIME Method for Life Insurance</h2><p>DIME is the most thorough method for calculating life insurance needs:</p><ul><li><strong>D — Debt:</strong> All debts excluding the mortgage (car loans, student loans, credit cards, personal loans)</li><li><strong>I — Income:</strong> Annual income × number of years your family needs it (typically until youngest child finishes college)</li><li><strong>M — Mortgage:</strong> Remaining mortgage balance to allow family to pay off the home</li><li><strong>E — Education:</strong> Estimated college costs per child × number of children</li></ul><p>DIME coverage = D + I + M + E − existing coverage.</p><h3>Term Life Insurance Cost by Age (2026)</h3><table class="data-table"><thead><tr><th>Age</th><th>$500K / 20yr (healthy male)</th><th>$1M / 20yr</th></tr></thead><tbody><tr><td>25</td><td>$18–$25/mo</td><td>$28–$40/mo</td></tr><tr><td>30</td><td>$20–$30/mo</td><td>$32–$50/mo</td></tr><tr><td>35</td><td>$25–$38/mo</td><td>$40–$65/mo</td></tr><tr><td>40</td><td>$35–$55/mo</td><td>$60–$95/mo</td></tr><tr><td>45</td><td>$55–$85/mo</td><td>$95–$150/mo</td></tr><tr><td>50</td><td>$80–$130/mo</td><td>$140–$225/mo</td></tr></tbody></table></div>`
);
liHtml = liHtml.replace('</body>', `<script>
function fmtLI(n){return(n<0?'-$':'$')+Math.abs(Math.round(n)).toLocaleString();}
// Rough term life premium per $1M coverage (20yr), by age, healthy non-smoker
var RATES_20={18:24,25:28,30:34,35:42,40:65,45:100,50:165,55:270,60:430,65:700,70:1100};
var RATES_30={18:30,25:35,30:46,35:62,40:105,45:168,50:290,55:480,60:800};
function getRate(table,age){var ages=Object.keys(table).map(Number).sort((a,b)=>a-b);for(var i=0;i<ages.length-1;i++){if(age>=ages[i]&&age<ages[i+1]){var t=(age-ages[i])/(ages[i+1]-ages[i]);return table[ages[i]]*(1-t)+table[ages[i+1]]*t;}}return table[ages[ages.length-1]]||999;}
function calcLI(){
  var income=parseFloat(document.getElementById('li-income').value)||0;
  var years=parseFloat(document.getElementById('li-income-years').value)||20;
  var mortgage=parseFloat(document.getElementById('li-mortgage').value)||0;
  var debts=parseFloat(document.getElementById('li-debts').value)||0;
  var education=parseFloat(document.getElementById('li-education').value)||0;
  var existing=parseFloat(document.getElementById('li-existing').value)||0;
  var age=parseInt(document.getElementById('li-age').value)||35;
  var incomeNeed=income*years;
  var total=debts+incomeNeed+mortgage+education;
  var gap=Math.max(0,total-existing);
  // Premium estimate: scale from per-$1M rate
  var rate20=getRate(RATES_20,age)/1000000;
  var rate30=age<=60?getRate(RATES_30,age)/1000000:null;
  var prem20=gap>0?Math.round(gap*rate20):0;
  var prem30=gap>0&&rate30?Math.round(gap*rate30):null;
  document.getElementById('li-needed').textContent=fmtLI(gap);
  document.getElementById('li-gap').textContent=gap>0?'Gap: '+fmtLI(gap)+' uncovered':'✓ Fully covered by existing policy';
  document.getElementById('li-income-need').textContent=fmtLI(incomeNeed);
  document.getElementById('li-debt-total').textContent=fmtLI(debts+mortgage);
  document.getElementById('li-term-premium').textContent=gap>0?'~$'+prem20+'/mo':'N/A';
  document.getElementById('li-s-debt').textContent=fmtLI(debts);
  document.getElementById('li-s-income').textContent=fmtLI(incomeNeed);
  document.getElementById('li-s-mortgage').textContent=fmtLI(mortgage);
  document.getElementById('li-s-education').textContent=fmtLI(education);
  document.getElementById('li-s-total').textContent=fmtLI(total);
  document.getElementById('li-s-existing').textContent='-'+fmtLI(existing);
  document.getElementById('li-s-gap').textContent=fmtLI(gap);
  document.getElementById('li-p-20').textContent=gap>0?'~$'+prem20+'/mo':'N/A';
  document.getElementById('li-p-30').textContent=gap>0&&prem30?'~$'+prem30+'/mo':'N/A (age limit)';
}
document.addEventListener('DOMContentLoaded',calcLI);
['li-income','li-income-years','li-mortgage','li-debts','li-education','li-existing','li-age'].forEach(function(id){document.getElementById(id).addEventListener('input',calcLI);});
</script></body>`);

// ── Write files ───────────────────────────────────────────────────────────────
var pages=[['annuity-calculator.html',annHtml],['mortgage-affordability-calculator.html',maHtml],['pension-calculator.html',penHtml],['property-tax-calculator.html',ptHtml],['life-insurance-calculator.html',liHtml]];
console.log('Building batch 2b...\n');
pages.forEach(function([f,h]){fs.writeFileSync(B+f,h);console.log('  ✓ '+f+' — '+(h.length/1024).toFixed(0)+'KB');});
console.log('\n✅ Batch 2b done — 5 pages written');
