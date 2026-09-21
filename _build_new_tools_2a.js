/**
 * Build batch 2a: car loan, compound interest, personal loan, Roth IRA, closing costs
 * Run: node _build_new_tools_2a.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';
const DOMAIN = 'https://www.freepayrollcalc.com';

const NAV = `<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search tools"><div class="cmd-modal"><div class="cmd-search-row"><span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span><input class="cmd-input" id="cmd-input" type="text" placeholder="Search 60+ tools..." autocomplete="off" spellcheck="false"><kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd></div><div class="cmd-body" id="cmd-body"></div><div class="cmd-footer"><span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span><span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span><span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span></div></div></div>
<header class="site-header"><div class="container header-inner"><a href="/" class="site-logo">FreePayrollCalc</a>
<nav class="main-nav" aria-label="Main">
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Payroll <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/payroll-tax-calculator" class="nav-item">Payroll Tax</a><a href="/take-home-pay-calculator" class="nav-item">Take-Home Pay</a><a href="/payroll-hours-calculator" class="nav-item">Payroll Hours</a><a href="/salary-to-hourly-calculator" class="nav-item">Salary to Hourly</a><a href="/net-to-gross-calculator" class="nav-item">Net to Gross</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Tax <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/self-employment-tax-calculator" class="nav-item">Self-Employment Tax</a><a href="/capital-gains-tax-calculator" class="nav-item">Capital Gains Tax</a><a href="/bonus-tax-calculator" class="nav-item">Bonus Tax</a><a href="/mileage-reimbursement-calculator" class="nav-item">Mileage Reimbursement</a><a href="/income-tax-calculator" class="nav-item">Income Tax</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Home &amp; RE <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/mortgage-calculator" class="nav-item">Mortgage</a><a href="/mortgage-affordability-calculator" class="nav-item">Affordability</a><a href="/home-equity-loan-calculator" class="nav-item">Home Equity Loan</a><a href="/heloc-calculator" class="nav-item">HELOC</a><a href="/closing-costs-calculator" class="nav-item">Closing Costs</a><a href="/property-tax-calculator" class="nav-item">Property Tax</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Loans <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/car-loan-calculator" class="nav-item">Car Loan</a><a href="/personal-loan-calculator" class="nav-item">Personal Loan</a><a href="/sba-loan-calculator" class="nav-item">SBA Loan</a><a href="/business-loan-calculator" class="nav-item">Business Loan</a><a href="/debt-payoff-calculator" class="nav-item">Debt Payoff</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Retirement <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/roth-ira-calculator" class="nav-item">Roth IRA</a><a href="/required-minimum-distribution-calculator" class="nav-item">RMD Calculator</a><a href="/pension-calculator" class="nav-item">Pension</a><a href="/annuity-calculator" class="nav-item">Annuity</a><a href="/retirement-calculator" class="nav-item">Retirement</a><a href="/compound-interest-calculator" class="nav-item">Compound Interest</a></div></div>
</nav>
<div class="header-actions"><button class="btn-search" id="btn-search" aria-label="Search tools"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button><a href="/tools" class="btn-all-tools">All Tools</a></div>
</div></header>`;

const FTR = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreePayrollCalc</a><p class="footer-tagline">Free financial calculators. No sign-up required.</p></div><div><div class="footer-col-title">Loans</div><nav class="footer-nav"><a href="/car-loan-calculator">Car Loan</a><a href="/personal-loan-calculator">Personal Loan</a><a href="/sba-loan-calculator">SBA Loan</a><a href="/mortgage-calculator">Mortgage</a></nav></div><div><div class="footer-col-title">Retirement</div><nav class="footer-nav"><a href="/roth-ira-calculator">Roth IRA</a><a href="/compound-interest-calculator">Compound Interest</a><a href="/required-minimum-distribution-calculator">RMD Calculator</a><a href="/annuity-calculator">Annuity</a></nav></div><div><div class="footer-col-title">Home</div><nav class="footer-nav"><a href="/closing-costs-calculator">Closing Costs</a><a href="/property-tax-calculator">Property Tax</a><a href="/home-equity-loan-calculator">Home Equity</a><a href="/mortgage-affordability-calculator">Affordability</a></nav></div></div><div class="footer-bottom"><p>&copy; 2026 FreePayrollCalc.com &mdash; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a></p><p class="footer-disclaimer">For informational purposes only. Not financial advice.</p></div></div></footer>`;

const CSS = `.result-card{background:linear-gradient(135deg,rgba(27,79,216,.07),rgba(27,79,216,.02));border:2px solid rgba(27,79,216,.2);border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}.result-big{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}.result-label{font-size:13px;font-weight:700;color:var(--ink-2)}.result-sub{font-size:12px;color:var(--ink-3);margin-top:4px}.stat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}@media(max-width:640px){.stat-grid{grid-template-columns:1fr 1fr}}.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}.stat-num{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink-1);line-height:1;margin-bottom:3px}.stat-lbl{font-size:11px;color:var(--ink-3);font-weight:600}.breakdown-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);font-size:13px}.breakdown-row:last-child{border-bottom:none}.breakdown-row .val{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--ink-1)}.highlight-row{background:rgba(27,79,216,.04);border-radius:8px;padding:10px 14px;margin-top:4px;display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:var(--accent)}`;

function wrap(slug, title, desc, schema, faqSchema, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="icon" href="/shared/favicon.svg" type="image/svg+xml"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${DOMAIN}/${slug}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta name="robots" content="index,follow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=8"><script type="application/ld+json">${schema}<\/script>${faqSchema?`<script type="application/ld+json">${faqSchema}<\/script>`:''}<style>${CSS}</style></head><body>${NAV}<main class="calc-page"><div class="container"><nav class="calc-breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">${title.split('|')[0].trim()}</span></nav><div class="ad-zone ad-zone--leaderboard"></div>${body}</div></main>${FTR}<script src="/shared/scripts.js?v=6" defer><\/script></body></html>`;
}

function fmtD(n) { return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString(); }

// ─────────────────────────────────────────────────────────────────────────────
// 1. CAR LOAN CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var carHtml = wrap('car-loan-calculator',
  'Car Loan Calculator 2026 | Monthly Payment + Total Cost',
  'Calculate your car loan monthly payment, total interest, and true cost of the vehicle. Enter price, down payment, trade-in, tax, rate, and term — instant results.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Car Loan Calculator 2026","url":`${DOMAIN}/car-loan-calculator`,"description":"Calculate monthly car loan payments, total interest, and vehicle total cost. Includes trade-in, sales tax, and down payment.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a good interest rate for a car loan in 2026?","acceptedAnswer":{"@type":"Answer","text":"For new cars, excellent credit (720+) typically qualifies for 5%–7% APR from banks or credit unions. Dealer financing averages 7%–10%. For used cars, rates are typically 1%–3% higher than new. Credit unions consistently offer the lowest rates — check before visiting the dealer."}},{"@type":"Question","name":"How much car can I afford?","acceptedAnswer":{"@type":"Answer","text":"The 20/4/10 rule: put 20% down, finance for no more than 4 years, keep total vehicle costs (payment + insurance) under 10% of monthly gross income. On $60,000/year income, that's $500/month maximum for payment + insurance combined."}},{"@type":"Question","name":"Should I pay cash or finance a car?","acceptedAnswer":{"@type":"Answer","text":"If you can earn more on investments than the loan rate (e.g., 7%+ in index funds vs 6% car loan), financing makes mathematical sense. But most people benefit from paying cash or making a large down payment to reduce the total interest paid and avoid being underwater on the loan."}},{"@type":"Question","name":"What is the dealer markup on car loans?","acceptedAnswer":{"@type":"Answer","text":"Dealers are allowed to mark up the rate your lender approves — typically 1%–2.5% above the buy rate. This markup is pure dealer profit. Always get pre-approved by your bank or credit union before visiting the dealership so you have a rate to beat."}}]}),
  `<h1 class="calc-title" data-enter>Car Loan Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your exact monthly payment, total interest, and true vehicle cost including tax, trade-in, and fees.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="cl-price">Vehicle Price</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cl-price" class="calc-input" value="35000" min="1000" step="500"></div></div>
<div class="input-group"><label class="input-label" for="cl-down">Down Payment</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cl-down" class="calc-input" value="5000" min="0" step="500"></div></div>
<div class="input-group"><label class="input-label" for="cl-trade">Trade-In Value</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cl-trade" class="calc-input" value="0" min="0" step="500"></div></div>
<div class="input-group"><label class="input-label" for="cl-tax">Sales Tax Rate</label><div class="input-prefix-wrap"><input type="number" id="cl-tax" class="calc-input" value="8.5" min="0" max="15" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="cl-rate">Interest Rate (APR)</label><div class="input-prefix-wrap"><input type="number" id="cl-rate" class="calc-input" value="7.5" min="0" max="30" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="cl-term">Loan Term</label><select id="cl-term" class="calc-select"><option value="24">24 months (2 yr)</option><option value="36">36 months (3 yr)</option><option value="48">48 months (4 yr)</option><option value="60" selected>60 months (5 yr)</option><option value="72">72 months (6 yr)</option><option value="84">84 months (7 yr)</option></select></div>
<button class="calc-btn" onclick="calcCar()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="cl-payment">$594</div><div class="result-label">Monthly Payment</div><div class="result-sub" id="cl-sub">7.5% APR · 60 months</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="cl-loan-amt">$32,975</div><div class="stat-lbl">Loan Amount</div></div>
<div class="stat-card"><div class="stat-num" id="cl-total-int">$6,627</div><div class="stat-lbl">Total Interest</div></div>
<div class="stat-card"><div class="stat-num" id="cl-total-cost">$42,602</div><div class="stat-lbl">True Vehicle Cost</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Vehicle Price</span><span class="val" id="cl-s-price">$35,000</span></div>
<div class="breakdown-row"><span>Sales Tax (8.5%)</span><span class="val" id="cl-s-tax">$2,975</span></div>
<div class="breakdown-row"><span>Down Payment</span><span class="val" id="cl-s-down">-$5,000</span></div>
<div class="breakdown-row"><span>Trade-In</span><span class="val" id="cl-s-trade">-$0</span></div>
<div class="breakdown-row"><span>Loan Amount</span><span class="val" id="cl-s-loan">$32,975</span></div>
<div class="breakdown-row"><span>Total Interest Paid</span><span class="val" id="cl-s-int">$6,627</span></div>
<div class="highlight-row"><span>True Vehicle Cost</span><span id="cl-s-total">$42,602</span></div>
</div>
</div></div>
<div class="calc-article"><h2>How Car Loan Payments Are Calculated</h2><p>Your monthly car loan payment is determined by three factors: the loan amount (vehicle price + tax − down payment − trade-in), the interest rate (APR), and the loan term. The formula is identical to any amortizing loan: <strong>M = P × r(1+r)^n / [(1+r)^n − 1]</strong>.</p><h3>The 20/4/10 Rule</h3><p>A widely used guideline: put at least <strong>20% down</strong>, finance for no more than <strong>4 years</strong>, and keep total vehicle expenses (payment + insurance) under <strong>10% of gross monthly income</strong>. Following this rule prevents being underwater on your loan and keeps car costs from dominating your budget.</p><h3>New vs Used Car Loan Rates (2026)</h3><p>New car rates: 5%–9% for good credit. Used car rates: typically 2%–4% higher than new because used cars depreciate faster, increasing lender risk. Credit unions offer rates 1%–2% below bank rates on average. Always get pre-approved before visiting a dealership.</p><h3>Trade-In Strategy</h3><p>Trade-in value reduces your loan amount directly. Get your trade-in appraised separately (Carmax, Carvana) before visiting the dealer — dealers often lowball the trade-in to make up margin elsewhere. Selling privately almost always yields more money than a dealer trade-in.</p></div>`
);
carHtml = carHtml.replace('</body>', `<script>
function fmtC(n){return(n<0?'-$':'$')+Math.abs(Math.round(n)).toLocaleString();}
function calcCar(){
  var price=parseFloat(document.getElementById('cl-price').value)||35000;
  var down=parseFloat(document.getElementById('cl-down').value)||0;
  var trade=parseFloat(document.getElementById('cl-trade').value)||0;
  var tax=parseFloat(document.getElementById('cl-tax').value)/100;
  var r=parseFloat(document.getElementById('cl-rate').value)/100/12;
  var n=parseInt(document.getElementById('cl-term').value);
  var taxAmt=price*tax;
  var loan=price+taxAmt-down-trade;
  var pay=r>0?loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):loan/n;
  var totalPaid=pay*n;
  var totalInt=totalPaid-loan;
  var trueCost=totalPaid+down+trade;
  document.getElementById('cl-payment').textContent=fmtC(pay);
  document.getElementById('cl-sub').textContent=document.getElementById('cl-rate').value+'% APR · '+n+' months';
  document.getElementById('cl-loan-amt').textContent=fmtC(loan);
  document.getElementById('cl-total-int').textContent=fmtC(totalInt);
  document.getElementById('cl-total-cost').textContent=fmtC(trueCost);
  document.getElementById('cl-s-price').textContent=fmtC(price);
  document.getElementById('cl-s-tax').textContent=fmtC(taxAmt);
  document.getElementById('cl-s-down').textContent='-'+fmtC(down);
  document.getElementById('cl-s-trade').textContent=trade>0?'-'+fmtC(trade):fmtC(0);
  document.getElementById('cl-s-loan').textContent=fmtC(loan);
  document.getElementById('cl-s-int').textContent=fmtC(totalInt);
  document.getElementById('cl-s-total').textContent=fmtC(trueCost);
}
document.addEventListener('DOMContentLoaded',calcCar);
['cl-price','cl-down','cl-trade','cl-tax','cl-rate'].forEach(function(id){document.getElementById(id).addEventListener('input',calcCar);});
document.getElementById('cl-term').addEventListener('change',calcCar);
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 2. COMPOUND INTEREST CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var ciHtml = wrap('compound-interest-calculator',
  'Compound Interest Calculator 2026 | Growth + Total Interest Earned',
  'Calculate compound interest on any investment or savings account. Choose daily, monthly, or yearly compounding. Add monthly contributions. See your money grow year by year.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Compound Interest Calculator 2026","url":`${DOMAIN}/compound-interest-calculator`,"description":"Calculate compound interest with optional monthly contributions. Supports daily, monthly, quarterly, and annual compounding. Shows year-by-year growth table.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is compound interest?","acceptedAnswer":{"@type":"Answer","text":"Compound interest is interest calculated on both the initial principal AND the accumulated interest from previous periods. Unlike simple interest (principal × rate × time), compound interest grows exponentially. Einstein allegedly called it the 'eighth wonder of the world' — $10,000 at 8% for 30 years grows to $100,627 with annual compounding."}},{"@type":"Question","name":"How often does compound interest compound?","acceptedAnswer":{"@type":"Answer","text":"Savings accounts and money market accounts typically compound daily. CDs compound daily or monthly. Most investment accounts compound annually (reinvested dividends). The more frequent the compounding, the faster the growth — but the difference between daily and monthly compounding is small over short periods."}},{"@type":"Question","name":"What is the Rule of 72?","acceptedAnswer":{"@type":"Answer","text":"The Rule of 72 estimates how long it takes to double your money: divide 72 by the annual interest rate. At 8% annual return, money doubles in 72/8 = 9 years. At 6%, it doubles in 12 years. This works because of compound interest — you're not just earning interest on your principal, but on your accumulated interest too."}},{"@type":"Question","name":"What is the difference between APY and APR?","acceptedAnswer":{"@type":"Answer","text":"APR (Annual Percentage Rate) is the stated rate without compounding. APY (Annual Percentage Yield) includes the effect of compounding and is always higher than APR (except when compounded annually, where they're equal). Banks advertise APY for savings accounts (higher number looks better) and APR for loans (lower number looks better)."}}]}),
  `<h1 class="calc-title" data-enter>Compound Interest Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">See how your money grows with compound interest. Add monthly contributions and compare compounding frequencies side by side.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="ci-principal">Starting Amount</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ci-principal" class="calc-input" value="10000" min="0" step="100"></div></div>
<div class="input-group"><label class="input-label" for="ci-rate">Annual Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="ci-rate" class="calc-input" value="8" min="0.1" max="50" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="ci-years">Time Period</label><div class="input-prefix-wrap"><input type="number" id="ci-years" class="calc-input" value="20" min="1" max="50" step="1"><span class="input-suffix">yrs</span></div></div>
<div class="input-group"><label class="input-label" for="ci-contrib">Monthly Contribution</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ci-contrib" class="calc-input" value="200" min="0" step="50"></div></div>
<div class="input-group"><label class="input-label" for="ci-freq">Compounding Frequency</label><select id="ci-freq" class="calc-select"><option value="365">Daily</option><option value="12" selected>Monthly</option><option value="4">Quarterly</option><option value="2">Semi-Annually</option><option value="1">Annually</option></select></div>
<button class="calc-btn" onclick="calcCI()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="ci-final">$155,797</div><div class="result-label">Final Balance</div><div class="result-sub" id="ci-sub">After 20 years at 8%</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="ci-principal-total">$58,000</div><div class="stat-lbl">Total Contributed</div></div>
<div class="stat-card"><div class="stat-num" id="ci-interest-earned">$97,797</div><div class="stat-lbl">Interest Earned</div></div>
<div class="stat-card"><div class="stat-num" id="ci-multiplier">2.69×</div><div class="stat-lbl">Money Multiplied</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Starting Amount</span><span class="val" id="ci-s-start">$10,000</span></div>
<div class="breakdown-row"><span>Monthly Contributions × <span id="ci-s-mos">240</span></span><span class="val" id="ci-s-contrib">$48,000</span></div>
<div class="breakdown-row"><span>Total Contributed</span><span class="val" id="ci-s-total-in">$58,000</span></div>
<div class="breakdown-row"><span>Interest Earned</span><span class="val" id="ci-s-int">$97,797</span></div>
<div class="highlight-row"><span>Final Balance</span><span id="ci-s-final">$155,797</span></div>
</div>
<div id="ci-growth-table" style="max-height:280px;overflow-y:auto;margin-top:12px;border:1px solid var(--border);border-radius:10px"></div>
</div></div>
<div class="calc-article"><h2>The Power of Compound Interest</h2><p>Compound interest means earning interest on your interest. Each period, your accumulated balance — not just the original principal — earns returns. Over decades, this creates exponential growth that simple interest cannot match.</p><h3>Daily vs Monthly Compounding</h3><p>The difference between daily and monthly compounding on $10,000 at 8% over 20 years: daily = $49,268, monthly = $49,268. The gap is less than $50 — compounding frequency matters far less than rate and time.</p><h3>The Real Variable: Time</h3><p>Starting 10 years earlier has a more powerful effect than increasing your return by 2%. $10,000 at 8% for 30 years = $100,627. For 40 years = $217,245. The last 10 years add more than the first 30 combined — that is compound interest at work.</p></div>`
);
ciHtml = ciHtml.replace('</body>', `<script>
function fmtCI(n){return(n<0?'-$':'$')+Math.abs(Math.round(n)).toLocaleString();}
function calcCI(){
  var P=parseFloat(document.getElementById('ci-principal').value)||0;
  var r=parseFloat(document.getElementById('ci-rate').value)/100;
  var t=parseInt(document.getElementById('ci-years').value)||1;
  var pmt=parseFloat(document.getElementById('ci-contrib').value)||0;
  var n=parseInt(document.getElementById('ci-freq').value);
  var rows='<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="background:var(--surface);padding:8px 12px;text-align:left;font-weight:700;color:var(--ink-3);font-size:11px;position:sticky;top:0">Year</th><th style="background:var(--surface);padding:8px 12px;text-align:right;font-weight:700;color:var(--ink-3);font-size:11px;position:sticky;top:0">Balance</th><th style="background:var(--surface);padding:8px 12px;text-align:right;font-weight:700;color:var(--ink-3);font-size:11px;position:sticky;top:0">Interest</th><th style="background:var(--surface);padding:8px 12px;text-align:right;font-weight:700;color:var(--ink-3);font-size:11px;position:sticky;top:0">Contributed</th></tr></thead><tbody>';
  var bal=P,totalInt=0,totalContrib=P;
  for(var y=1;y<=t;y++){
    var startBal=bal;
    bal=bal*Math.pow(1+r/n,n)+pmt*12*(Math.pow(1+r/n,n)-1)/(r/n>0?r/n:1);
    var yearInt=bal-startBal-pmt*12;
    totalInt+=yearInt;totalContrib+=pmt*12;
    rows+='<tr><td style="padding:7px 12px;border-top:1px solid var(--border);font-weight:600;color:var(--ink-1)">'+y+'</td><td style="padding:7px 12px;border-top:1px solid var(--border);text-align:right;font-family:monospace;color:var(--ink-2)">'+fmtCI(bal)+'</td><td style="padding:7px 12px;border-top:1px solid var(--border);text-align:right;font-family:monospace;color:var(--ink-2)">'+fmtCI(totalInt)+'</td><td style="padding:7px 12px;border-top:1px solid var(--border);text-align:right;font-family:monospace;color:var(--ink-2)">'+fmtCI(totalContrib)+'</td></tr>';
  }
  rows+='</tbody></table>';
  document.getElementById('ci-final').textContent=fmtCI(bal);
  document.getElementById('ci-sub').textContent='After '+t+' years at '+document.getElementById('ci-rate').value+'%';
  document.getElementById('ci-principal-total').textContent=fmtCI(totalContrib);
  document.getElementById('ci-interest-earned').textContent=fmtCI(totalInt);
  document.getElementById('ci-multiplier').textContent=(bal/Math.max(totalContrib,1)).toFixed(2)+'x';
  document.getElementById('ci-s-start').textContent=fmtCI(P);
  document.getElementById('ci-s-mos').textContent=t*12;
  document.getElementById('ci-s-contrib').textContent=fmtCI(pmt*12*t);
  document.getElementById('ci-s-total-in').textContent=fmtCI(totalContrib);
  document.getElementById('ci-s-int').textContent=fmtCI(totalInt);
  document.getElementById('ci-s-final').textContent=fmtCI(bal);
  document.getElementById('ci-growth-table').innerHTML=rows;
}
document.addEventListener('DOMContentLoaded',calcCI);
['ci-principal','ci-rate','ci-years','ci-contrib'].forEach(function(id){document.getElementById(id).addEventListener('input',calcCI);});
document.getElementById('ci-freq').addEventListener('change',calcCI);
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 3. PERSONAL LOAN CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var plHtml = wrap('personal-loan-calculator',
  'Personal Loan Calculator 2026 | Monthly Payment + APR',
  'Calculate personal loan monthly payments, total interest, and true APR including origination fees. Compare loan terms side by side.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Personal Loan Calculator 2026","url":`${DOMAIN}/personal-loan-calculator`,"description":"Calculate personal loan payments including origination fees and true APR. Compare 3-year vs 5-year terms. See total cost of borrowing.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a good interest rate for a personal loan in 2026?","acceptedAnswer":{"@type":"Answer","text":"Personal loan rates in 2026 range from about 8% to 36% APR depending on credit score. Excellent credit (760+): 8%–13%. Good credit (700–759): 13%–18%. Fair credit (640–699): 18%–28%. Poor credit (<640): 28%–36% or no approval. Credit unions often offer 1%–3% lower rates than online lenders."}},{"@type":"Question","name":"What is the origination fee on a personal loan?","acceptedAnswer":{"@type":"Answer","text":"An origination fee is a one-time charge deducted from your loan disbursement (or added to your balance), typically 1%–8% of the loan amount. On a $15,000 loan with a 5% fee, you'd receive $14,250 but owe $15,000. Always factor in the origination fee when comparing lenders — it can significantly raise the true APR."}},{"@type":"Question","name":"Can I pay off a personal loan early?","acceptedAnswer":{"@type":"Answer","text":"Most personal loans allow early repayment, but some lenders charge a prepayment penalty (typically 2%–5% of the remaining balance). Always check the loan terms before signing. Paying extra each month toward principal reduces your total interest paid significantly."}},{"@type":"Question","name":"Personal loan vs credit card: which is better for debt?","acceptedAnswer":{"@type":"Answer","text":"If you have credit card debt at 20%+ APR, a personal loan at 12%–15% saves significant interest. The key advantage: fixed payments and a defined payoff date. Credit cards keep you in a revolving cycle. The personal loan wins for disciplined payoff — but only if you don't re-charge the cards after consolidating."}}]}),
  `<h1 class="calc-title" data-enter>Personal Loan Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate monthly payments, true APR (including fees), and total interest. Compare 3-year vs 5-year terms instantly.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="pl-amount">Loan Amount</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="pl-amount" class="calc-input" value="15000" min="500" step="500"></div></div>
<div class="input-group"><label class="input-label" for="pl-rate">Interest Rate (APR)</label><div class="input-prefix-wrap"><input type="number" id="pl-rate" class="calc-input" value="12" min="1" max="40" step="0.25"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="pl-term">Loan Term</label><select id="pl-term" class="calc-select"><option value="12">12 months (1 yr)</option><option value="24">24 months (2 yr)</option><option value="36" selected>36 months (3 yr)</option><option value="48">48 months (4 yr)</option><option value="60">60 months (5 yr)</option><option value="84">84 months (7 yr)</option></select></div>
<div class="input-group"><label class="input-label" for="pl-fee">Origination Fee</label><div class="input-prefix-wrap"><input type="number" id="pl-fee" class="calc-input" value="0" min="0" max="10" step="0.5"><span class="input-suffix">%</span></div><div class="input-hint">Deducted from disbursement. Common range: 1%–6%.</div></div>
<button class="calc-btn" onclick="calcPL()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="pl-payment">$498</div><div class="result-label">Monthly Payment</div><div class="result-sub" id="pl-sub">12% APR · 36 months</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="pl-total-int">$2,935</div><div class="stat-lbl">Total Interest</div></div>
<div class="stat-card"><div class="stat-num" id="pl-true-apr">12.0%</div><div class="stat-lbl">True APR</div></div>
<div class="stat-card"><div class="stat-num" id="pl-total-cost">$17,935</div><div class="stat-lbl">Total Cost</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Loan Amount</span><span class="val" id="pl-s-amount">$15,000</span></div>
<div class="breakdown-row"><span>Origination Fee</span><span class="val" id="pl-s-fee">$0</span></div>
<div class="breakdown-row"><span>Amount Received</span><span class="val" id="pl-s-received">$15,000</span></div>
<div class="breakdown-row"><span>Total Interest</span><span class="val" id="pl-s-int">$2,935</span></div>
<div class="breakdown-row"><span>True APR (with fee)</span><span class="val" id="pl-s-apr">12.0%</span></div>
<div class="highlight-row"><span>Total Repaid</span><span id="pl-s-total">$17,935</span></div>
</div>
<div class="calc-card" style="margin-top:12px">
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Term Comparison</div>
<div class="breakdown-row"><span>3 Years</span><span class="val" id="pl-cmp-3">—</span></div>
<div class="breakdown-row"><span>5 Years</span><span class="val" id="pl-cmp-5">—</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Personal Loan Rates by Credit Score (2026)</h2><table class="data-table"><thead><tr><th>Credit Score</th><th>Typical APR Range</th><th>Monthly (15K/3yr)</th></tr></thead><tbody><tr><td>760+ (Excellent)</td><td>8%–13%</td><td>$470–$505</td></tr><tr><td>700–759 (Good)</td><td>13%–18%</td><td>$505–$542</td></tr><tr><td>640–699 (Fair)</td><td>18%–28%</td><td>$542–$615</td></tr><tr><td>&lt;640 (Poor)</td><td>28%–36%</td><td>$615–$674</td></tr></tbody></table><h3>Origination Fee Impact</h3><p>A 5% origination fee on a $15,000 loan means you receive $14,250 but repay $15,000 — raising your true APR by 2%–4% above the stated rate. Always compare lenders by APR (which includes fees), not just the interest rate.</p></div>`
);
plHtml = plHtml.replace('</body>', `<script>
function fmtPL(n){return(n<0?'-$':'$')+Math.abs(Math.round(n)).toLocaleString();}
function pmtCalc(p,r,n){var mr=r/12;return mr>0?p*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1):p/n;}
function calcPL(){
  var amount=parseFloat(document.getElementById('pl-amount').value)||15000;
  var rate=parseFloat(document.getElementById('pl-rate').value)/100;
  var n=parseInt(document.getElementById('pl-term').value);
  var feePct=parseFloat(document.getElementById('pl-fee').value)/100;
  var fee=amount*feePct;
  var received=amount-fee;
  var pay=pmtCalc(amount,rate,n);
  var totalPaid=pay*n;
  var totalInt=totalPaid-amount;
  // Approximate true APR using Newton's method
  var mr=rate/12;
  for(var i=0;i<50;i++){
    var f=mr>0?pmtCalc(received,mr*12,n)-pay:0;
    var df=0.0001;
    var f2=pmtCalc(received,(mr+df)*12,n)-pay;
    if(Math.abs(f)<0.001) break;
    mr-=f/((f2-f)/df);
  }
  var trueAPR=mr*12*100;
  var pay3=pmtCalc(amount,rate,36), int3=pay3*36-amount;
  var pay5=pmtCalc(amount,rate,60), int5=pay5*60-amount;
  document.getElementById('pl-payment').textContent=fmtPL(pay);
  document.getElementById('pl-sub').textContent=document.getElementById('pl-rate').value+'% APR · '+n+' months';
  document.getElementById('pl-total-int').textContent=fmtPL(totalInt);
  document.getElementById('pl-true-apr').textContent=(feePct>0?trueAPR.toFixed(1):rate*100).toFixed(1)+'%';
  document.getElementById('pl-total-cost').textContent=fmtPL(totalPaid+fee);
  document.getElementById('pl-s-amount').textContent=fmtPL(amount);
  document.getElementById('pl-s-fee').textContent=fmtPL(fee);
  document.getElementById('pl-s-received').textContent=fmtPL(received);
  document.getElementById('pl-s-int').textContent=fmtPL(totalInt);
  document.getElementById('pl-s-apr').textContent=(feePct>0?trueAPR.toFixed(1):(rate*100).toFixed(1))+'%';
  document.getElementById('pl-s-total').textContent=fmtPL(totalPaid);
  document.getElementById('pl-cmp-3').textContent=fmtPL(pay3)+'/mo — '+fmtPL(int3)+' interest';
  document.getElementById('pl-cmp-5').textContent=fmtPL(pay5)+'/mo — '+fmtPL(int5)+' interest';
}
document.addEventListener('DOMContentLoaded',calcPL);
['pl-amount','pl-rate','pl-fee'].forEach(function(id){document.getElementById(id).addEventListener('input',calcPL);});
document.getElementById('pl-term').addEventListener('change',calcPL);
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 4. ROTH IRA CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var rothHtml = wrap('roth-ira-calculator',
  'Roth IRA Calculator 2026 | Tax-Free Growth Projector',
  'Calculate your Roth IRA balance at retirement. See tax-free growth, total contributions, and how much you save vs a taxable account. Uses 2026 contribution limits.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Roth IRA Calculator 2026","url":`${DOMAIN}/roth-ira-calculator`,"description":"Project your Roth IRA balance at retirement with tax-free growth. Shows year-by-year growth, total contributions, and tax savings vs taxable account.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the Roth IRA contribution limit for 2026?","acceptedAnswer":{"@type":"Answer","text":"For 2026, you can contribute up to $7,000 to a Roth IRA ($8,000 if you're age 50 or older). Income limits apply: contributions phase out for single filers with MAGI between $150,000–$165,000 and married filers between $236,000–$246,000. Above these limits, you cannot contribute directly to a Roth IRA."}},{"@type":"Question","name":"What is the difference between a Roth IRA and traditional IRA?","acceptedAnswer":{"@type":"Answer","text":"Roth IRA: contributions are after-tax (no deduction now), but all growth and withdrawals in retirement are tax-free. Traditional IRA: contributions may be tax-deductible now, but withdrawals in retirement are taxed as ordinary income. Roth wins if you expect a higher tax rate in retirement; traditional wins if you expect a lower rate."}},{"@type":"Question","name":"When can I withdraw from a Roth IRA tax-free?","acceptedAnswer":{"@type":"Answer","text":"Roth IRA earnings can be withdrawn tax-free and penalty-free after age 59½, as long as the account has been open for at least 5 years (the 5-year rule). Contributions (not earnings) can be withdrawn at any time without penalty. No required minimum distributions during the owner's lifetime."}},{"@type":"Question","name":"What is the backdoor Roth IRA?","acceptedAnswer":{"@type":"Answer","text":"High earners above Roth IRA income limits can use the backdoor Roth: make a non-deductible traditional IRA contribution, then convert it to Roth. This is legal under current law. The Pro-Rata rule applies if you have other traditional IRA balances — consult a tax advisor before executing."}}]}),
  `<h1 class="calc-title" data-enter>Roth IRA Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Project your Roth IRA balance at retirement. See tax-free growth, how much you'd pay in taxes on a taxable account, and your net advantage.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="ri-current-balance">Current Roth IRA Balance</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ri-current-balance" class="calc-input" value="25000" min="0" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="ri-annual-contrib">Annual Contribution</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ri-annual-contrib" class="calc-input" value="7000" min="0" max="8000" step="500"></div><div class="input-hint">2026 limit: $7,000 ($8,000 if age 50+)</div></div>
<div class="input-group"><label class="input-label" for="ri-current-age">Current Age</label><input type="number" id="ri-current-age" class="calc-input" value="35" min="18" max="70" step="1"></div>
<div class="input-group"><label class="input-label" for="ri-retire-age">Retirement Age</label><input type="number" id="ri-retire-age" class="calc-input" value="65" min="50" max="80" step="1"></div>
<div class="input-group"><label class="input-label" for="ri-return">Expected Annual Return</label><div class="input-prefix-wrap"><input type="number" id="ri-return" class="calc-input" value="8" min="1" max="20" step="0.5"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="ri-tax-rate">Expected Tax Rate in Retirement</label><div class="input-prefix-wrap"><input type="number" id="ri-tax-rate" class="calc-input" value="22" min="10" max="37" step="1"><span class="input-suffix">%</span></div></div>
<button class="calc-btn" onclick="calcRoth()">Calculate</button>
</div><div class="calc-results">
<div class="result-card" style="background:linear-gradient(135deg,rgba(5,150,105,.08),rgba(5,150,105,.02));border-color:rgba(5,150,105,.3)"><div class="result-big" style="color:#059669" id="ri-balance">$1,083,942</div><div class="result-label">Tax-Free Balance at Retirement</div><div class="result-sub" id="ri-sub">After 30 years</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="ri-contrib-total">$235,000</div><div class="stat-lbl">Total Contributed</div></div>
<div class="stat-card"><div class="stat-num" id="ri-growth">$848,942</div><div class="stat-lbl">Tax-Free Growth</div></div>
<div class="stat-card"><div class="stat-num" id="ri-tax-saved">$186,767</div><div class="stat-lbl">Taxes Saved vs Taxable</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Years Until Retirement</span><span class="val" id="ri-s-years">30</span></div>
<div class="breakdown-row"><span>Total Contributions</span><span class="val" id="ri-s-contrib">$235,000</span></div>
<div class="breakdown-row"><span>Tax-Free Growth</span><span class="val" id="ri-s-growth">$848,942</span></div>
<div class="breakdown-row"><span>Roth IRA Balance (tax-free)</span><span class="val" id="ri-s-roth">$1,083,942</span></div>
<div class="breakdown-row"><span>Equivalent Taxable Account</span><span class="val" id="ri-s-taxable">$897,175</span></div>
<div class="highlight-row" style="background:rgba(5,150,105,.06);color:#059669"><span>Roth Advantage</span><span id="ri-s-advantage">$186,767</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Roth IRA vs Traditional IRA: Which Is Better?</h2><p>The core question: will your tax rate be higher or lower in retirement? If higher → Roth wins (pay tax now at lower rate, withdraw tax-free later). If lower → Traditional wins (deduct now at higher rate, pay tax in retirement at lower rate).</p><p>For most people in their 20s–40s who expect income to grow over their career, the Roth is the better choice. The tax-free growth for 30+ years compounds dramatically.</p><h3>2026 Roth IRA Rules</h3><ul><li>Contribution limit: $7,000/year ($8,000 if 50+)</li><li>Income phase-out: $150,000–$165,000 (single) / $236,000–$246,000 (MFJ)</li><li>No required minimum distributions during owner's lifetime</li><li>Contributions (not earnings) can be withdrawn anytime penalty-free</li></ul></div>`
);
rothHtml = rothHtml.replace('</body>', `<script>
function fmtR(n){return(n<0?'-$':'$')+Math.abs(Math.round(n)).toLocaleString();}
function calcRoth(){
  var bal=parseFloat(document.getElementById('ri-current-balance').value)||0;
  var contrib=parseFloat(document.getElementById('ri-annual-contrib').value)||0;
  var age=parseInt(document.getElementById('ri-current-age').value)||35;
  var retAge=parseInt(document.getElementById('ri-retire-age').value)||65;
  var ret=parseFloat(document.getElementById('ri-return').value)/100;
  var tax=parseFloat(document.getElementById('ri-tax-rate').value)/100;
  var years=Math.max(retAge-age,1);
  // Roth balance
  var rothBal=bal;
  for(var y=0;y<years;y++){rothBal=rothBal*(1+ret)+contrib;}
  // Taxable equivalent (tax drag on dividends ~1.5%/yr, CGT on gains at retirement)
  var taxDrag=0.015;
  var taxBal=bal;
  for(var y=0;y<years;y++){taxBal=taxBal*(1+ret-taxDrag)+contrib*(1-tax);}
  taxBal=taxBal*(1-0.15); // 15% CGT on gains at exit
  var taxSaved=rothBal-taxBal;
  var totalContrib=bal+contrib*years;
  var growth=rothBal-totalContrib;
  document.getElementById('ri-balance').textContent=fmtR(rothBal);
  document.getElementById('ri-sub').textContent='After '+years+' years at '+document.getElementById('ri-return').value+'%';
  document.getElementById('ri-contrib-total').textContent=fmtR(totalContrib);
  document.getElementById('ri-growth').textContent=fmtR(growth);
  document.getElementById('ri-tax-saved').textContent=fmtR(taxSaved);
  document.getElementById('ri-s-years').textContent=years;
  document.getElementById('ri-s-contrib').textContent=fmtR(totalContrib);
  document.getElementById('ri-s-growth').textContent=fmtR(growth);
  document.getElementById('ri-s-roth').textContent=fmtR(rothBal);
  document.getElementById('ri-s-taxable').textContent=fmtR(taxBal);
  document.getElementById('ri-s-advantage').textContent=fmtR(taxSaved);
}
document.addEventListener('DOMContentLoaded',calcRoth);
['ri-current-balance','ri-annual-contrib','ri-current-age','ri-retire-age','ri-return','ri-tax-rate'].forEach(function(id){document.getElementById(id).addEventListener('input',calcRoth);});
</script></body>`);

// ─────────────────────────────────────────────────────────────────────────────
// 5. CLOSING COSTS CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
var ccHtml = wrap('closing-costs-calculator',
  'Closing Costs Calculator 2026 | Estimate Home Buying Fees',
  'Estimate closing costs when buying a home. See lender fees, title insurance, escrow, prepaid items, and transfer taxes broken down line by line.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Closing Costs Calculator 2026","url":`${DOMAIN}/closing-costs-calculator`,"description":"Estimate closing costs on a home purchase. Breaks down lender fees, title insurance, escrow, prepaid interest, and transfer taxes by state.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much are closing costs on a home purchase in 2026?","acceptedAnswer":{"@type":"Answer","text":"Closing costs typically range from 2%–5% of the purchase price. On a $400,000 home, expect $8,000–$20,000 in closing costs. Lender fees account for about half; title insurance, escrow, and prepaid items account for the rest. States with transfer taxes (NY, NJ, PA) skew higher."}},{"@type":"Question","name":"Can closing costs be rolled into the mortgage?","acceptedAnswer":{"@type":"Answer","text":"In most cases, no — closing costs must be paid at closing. However, some lenders offer 'no-closing-cost' mortgages where the costs are rolled into a higher interest rate. FHA loans allow closing costs to be financed if the appraised value supports it. VA loans limit the types of closing costs veterans can pay."}},{"@type":"Question","name":"What closing costs can be negotiated?","acceptedAnswer":{"@type":"Answer","text":"Lender fees (origination, underwriting, application fees) are negotiable. You can also shop for your own title company in most states. The seller can agree to pay some or all closing costs as part of the purchase negotiation — called a seller concession. Transfer taxes and recording fees are set by law and cannot be negotiated."}},{"@type":"Question","name":"What is the difference between closing costs and prepaids?","acceptedAnswer":{"@type":"Answer","text":"Closing costs are one-time fees for services rendered (lender origination, title, attorney). Prepaids are funds collected in advance for recurring expenses: homeowners insurance premium (first year), prepaid mortgage interest (days between closing and first payment), and initial escrow reserves (2–3 months of property tax and insurance)."}}]}),
  `<h1 class="calc-title" data-enter>Closing Costs Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Estimate every closing cost line-item for your home purchase. Know exactly what to budget before you get to the closing table.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="cc-price">Home Purchase Price</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cc-price" class="calc-input" value="400000" min="50000" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="cc-loan">Loan Amount</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="cc-loan" class="calc-input" value="320000" min="10000" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="cc-rate">Mortgage Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="cc-rate" class="calc-input" value="7.0" min="3" max="15" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="cc-state">State</label><select id="cc-state" class="calc-select"><option value="low">Low transfer tax state (TX, FL, CO, WA)</option><option value="med" selected>Moderate (CA, IL, AZ, OR, MN)</option><option value="high">High transfer tax (NY, NJ, PA, MD, DC)</option></select></div>
<div class="input-group"><label class="input-label" for="cc-days">Days to First Payment</label><input type="number" id="cc-days" class="calc-input" value="15" min="1" max="31" step="1"></div>
<button class="calc-btn" onclick="calcCC()">Estimate Costs</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="cc-total">$11,400</div><div class="result-label">Estimated Total Closing Costs</div><div class="result-sub" id="cc-sub">2.9% of purchase price</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="cc-lender">$3,200</div><div class="stat-lbl">Lender Fees</div></div>
<div class="stat-card"><div class="stat-num" id="cc-title">$3,100</div><div class="stat-lbl">Title &amp; Escrow</div></div>
<div class="stat-card"><div class="stat-num" id="cc-prepaid">$5,100</div><div class="stat-lbl">Prepaids</div></div>
</div>
<div class="calc-card">
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.06em">Lender Fees</div>
<div class="breakdown-row"><span>Origination Fee (1%)</span><span class="val" id="cc-orig">$3,200</span></div>
<div class="breakdown-row"><span>Underwriting / Processing</span><span class="val">$1,200</span></div>
<div class="breakdown-row"><span>Appraisal</span><span class="val">$550</span></div>
<div class="breakdown-row"><span>Credit Report</span><span class="val">$50</span></div>
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin:14px 0 8px;text-transform:uppercase;letter-spacing:.06em">Title &amp; Escrow</div>
<div class="breakdown-row"><span>Title Insurance (lender)</span><span class="val" id="cc-title-lender">$700</span></div>
<div class="breakdown-row"><span>Title Insurance (owner)</span><span class="val" id="cc-title-owner">$1,100</span></div>
<div class="breakdown-row"><span>Escrow / Settlement Fee</span><span class="val" id="cc-escrow">$900</span></div>
<div class="breakdown-row"><span>Recording Fees</span><span class="val">$250</span></div>
<div class="breakdown-row"><span>Transfer Tax (est.)</span><span class="val" id="cc-transfer">$800</span></div>
<div style="font-size:12px;font-weight:700;color:var(--ink-3);margin:14px 0 8px;text-transform:uppercase;letter-spacing:.06em">Prepaids &amp; Reserves</div>
<div class="breakdown-row"><span>Prepaid Interest</span><span class="val" id="cc-prepint">$1,867</span></div>
<div class="breakdown-row"><span>Homeowners Insurance (1st yr)</span><span class="val" id="cc-hoi">$1,400</span></div>
<div class="breakdown-row"><span>Escrow Reserves (3 mo tax+ins)</span><span class="val" id="cc-reserves">$1,833</span></div>
<div class="highlight-row"><span>Total Closing Costs</span><span id="cc-s-total">$11,400</span></div>
</div>
</div></div>
<div class="calc-article"><h2>What Are Closing Costs?</h2><p>Closing costs are fees paid at settlement when you purchase a home. They cover the services required to complete the mortgage and transfer ownership: lender charges, title search and insurance, escrow services, government recording fees, and upfront insurance and interest payments.</p><h3>Typical Ranges by Category</h3><ul><li><strong>Lender fees:</strong> 0.5%–1.5% of loan amount — origination, underwriting, processing</li><li><strong>Title &amp; escrow:</strong> $1,500–$4,000 — varies by state and purchase price</li><li><strong>Prepaids:</strong> $3,000–$6,000 — first-year homeowners insurance, prepaid interest, escrow reserves</li><li><strong>Transfer taxes:</strong> 0%–2%+ of price — varies dramatically by state/county</li></ul><h3>How to Reduce Closing Costs</h3><p>Shop for title insurance (you can choose your own in most states). Negotiate seller concessions. Compare at least 3 lenders using Loan Estimates. Ask about lender credits (accepting a slightly higher rate in exchange for lender covering some costs).</p></div>`
);
ccHtml = ccHtml.replace('</body>', `<script>
function fmtCC(n){return '$'+Math.round(n).toLocaleString();}
function calcCC(){
  var price=parseFloat(document.getElementById('cc-price').value)||400000;
  var loan=parseFloat(document.getElementById('cc-loan').value)||320000;
  var rate=parseFloat(document.getElementById('cc-rate').value)/100;
  var state=document.getElementById('cc-state').value;
  var days=parseInt(document.getElementById('cc-days').value)||15;
  var orig=loan*0.01;
  var underwriting=1200, appraisal=550, credit=50;
  var titleLender=Math.round(loan*0.002);
  var titleOwner=Math.round(price*0.003);
  var escrow=Math.round(loan*0.003);
  var recording=250;
  var transferPct={low:0.001,med:0.002,high:0.015};
  var transfer=price*(transferPct[state]||0.002);
  var prepInt=(loan*rate/365)*days;
  var hoi=price*0.0035;
  var propTax=price*0.012/12*3;
  var insReserve=hoi/12*3;
  var reserves=propTax+insReserve;
  var lender=orig+underwriting+appraisal+credit;
  var title=titleLender+titleOwner+escrow+recording+transfer;
  var prepaid=prepInt+hoi+reserves;
  var total=lender+title+prepaid;
  document.getElementById('cc-total').textContent=fmtCC(total);
  document.getElementById('cc-sub').textContent=(total/price*100).toFixed(1)+'% of purchase price';
  document.getElementById('cc-lender').textContent=fmtCC(lender);
  document.getElementById('cc-title').textContent=fmtCC(title);
  document.getElementById('cc-prepaid').textContent=fmtCC(prepaid);
  document.getElementById('cc-orig').textContent=fmtCC(orig);
  document.getElementById('cc-title-lender').textContent=fmtCC(titleLender);
  document.getElementById('cc-title-owner').textContent=fmtCC(titleOwner);
  document.getElementById('cc-escrow').textContent=fmtCC(escrow);
  document.getElementById('cc-transfer').textContent=fmtCC(transfer);
  document.getElementById('cc-prepint').textContent=fmtCC(prepInt);
  document.getElementById('cc-hoi').textContent=fmtCC(hoi);
  document.getElementById('cc-reserves').textContent=fmtCC(reserves);
  document.getElementById('cc-s-total').textContent=fmtCC(total);
}
document.addEventListener('DOMContentLoaded',calcCC);
['cc-price','cc-loan','cc-rate','cc-days'].forEach(function(id){document.getElementById(id).addEventListener('input',calcCC);});
document.getElementById('cc-state').addEventListener('change',calcCC);
</script></body>`);

// ── Write files ───────────────────────────────────────────────────────────────
var pages=[['car-loan-calculator.html',carHtml],['compound-interest-calculator.html',ciHtml],['personal-loan-calculator.html',plHtml],['roth-ira-calculator.html',rothHtml],['closing-costs-calculator.html',ccHtml]];
console.log('Building batch 2a...\n');
pages.forEach(function([f,h]){fs.writeFileSync(B+f,h);console.log('  ✓ '+f+' — '+(h.length/1024).toFixed(0)+'KB');});
console.log('\n✅ Batch 2a done — 5 pages written');
