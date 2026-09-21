/**
 * Batch 3a: social security, student loan, money-last, auto refinance, rate of return, savings goal
 * node _build_new_tools_3a.js
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

const CSS = `.result-card{background:linear-gradient(135deg,rgba(27,79,216,.07),rgba(27,79,216,.02));border:2px solid rgba(27,79,216,.2);border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}.result-big{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}.result-label{font-size:13px;font-weight:700;color:var(--ink-2)}.result-sub{font-size:12px;color:var(--ink-3);margin-top:4px}.stat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}@media(max-width:640px){.stat-grid{grid-template-columns:1fr 1fr}}.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}.stat-num{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink-1);line-height:1;margin-bottom:3px}.stat-lbl{font-size:11px;color:var(--ink-3);font-weight:600}.breakdown-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);font-size:13px}.breakdown-row:last-child{border-bottom:none}.breakdown-row .val{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--ink-1)}.highlight-row{background:rgba(27,79,216,.04);border-radius:8px;padding:10px 14px;margin-top:4px;display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:var(--accent)}.plan-tab{display:inline-block;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;border:1px solid var(--border);cursor:pointer;margin:3px}.plan-tab.active{background:var(--accent);color:#fff;border-color:var(--accent)}.plan-block{border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px}`;

function wrap(slug,title,desc,schema,faqSchema,body){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="icon" href="/shared/favicon.svg" type="image/svg+xml"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${DOMAIN}/${slug}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta name="robots" content="index,follow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=8"><script type="application/ld+json">${schema}<\/script>${faqSchema?`<script type="application/ld+json">${faqSchema}<\/script>`:''}<style>${CSS}</style></head><body>${NAV}<main class="calc-page"><div class="container"><nav class="calc-breadcrumb"><a href="/">Home</a><span>&#x203A;</span><span aria-current="page">${title.split('|')[0].trim()}</span></nav><div class="ad-zone ad-zone--leaderboard"></div>${body}</div></main>${FTR}<script src="/shared/scripts.js?v=6" defer><\/script></body></html>`;
}

// ─── 1. SOCIAL SECURITY BENEFITS CALCULATOR ──────────────────────────────────
var ssHtml = wrap('social-security-benefits-calculator',
  'Social Security Benefits Calculator 2026 | Estimate Your Monthly Benefit',
  'Estimate your Social Security retirement benefit based on your earnings and claiming age. See how early or late claiming affects your lifetime benefit.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Social Security Benefits Calculator 2026","url":`${DOMAIN}/social-security-benefits-calculator`,"description":"Estimate your Social Security retirement benefit. Enter your average annual earnings and see your benefit at any claiming age from 62 to 70.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the full retirement age for Social Security?","acceptedAnswer":{"@type":"Answer","text":"For people born in 1960 or later, the full retirement age (FRA) is 67. For those born 1955-1959, it ranges from 66 years and 2 months to 66 years and 10 months."}},{"@type":"Question","name":"How much is Social Security reduced if you claim at 62?","acceptedAnswer":{"@type":"Answer","text":"If your FRA is 67 and you claim at 62, your benefit is reduced by 30% permanently. The reduction is 5/9 of 1% per month for the first 36 months before FRA, then 5/12 of 1% per month beyond that."}},{"@type":"Question","name":"How much does Social Security increase if you delay to 70?","acceptedAnswer":{"@type":"Answer","text":"For every year you delay claiming past your FRA (up to age 70), your benefit increases by 8% per year, or 2/3 of 1% per month. Delaying from FRA 67 to 70 increases your benefit by 24%."}},{"@type":"Question","name":"What is AIME in Social Security?","acceptedAnswer":{"@type":"Answer","text":"AIME stands for Average Indexed Monthly Earnings. Social Security takes your 35 highest-earning years (indexed for wage inflation), adds them up, and divides by 420 months to get your AIME. This AIME is then run through the PIA bend-point formula to determine your base benefit."}}]}),
  `<h1 class="calc-title" data-enter>Social Security Benefits Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Estimate your monthly Social Security retirement benefit based on your earnings history and chosen claiming age. Uses the 2026 PIA bend-point formula.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="ss-aime">Average Annual Earnings (career high-35 years)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ss-aime" class="calc-input" value="65000" min="10000" max="300000" step="1000"></div><div class="input-hint">Use your average from your 35 highest-earning years</div></div>
<div class="input-group"><label class="input-label" for="ss-birth">Birth Year</label><input type="number" id="ss-birth" class="calc-input" value="1965" min="1943" max="2002" step="1"></div>
<div class="input-group"><label class="input-label" for="ss-claim">Claiming Age</label><select id="ss-claim" class="calc-select" onchange="calcSS()"><option value="62">62 — Earliest (reduced)</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67" selected>67 — Full Retirement Age</option><option value="68">68</option><option value="69">69</option><option value="70">70 — Maximum benefit</option></select></div>
<button class="calc-btn" onclick="calcSS()">Calculate My Benefit</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="ss-result">$2,108</div><div class="result-label">Estimated Monthly Benefit</div><div class="result-sub" id="ss-sub">At age 67 (Full Retirement Age)</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="ss-annual">$25,296</div><div class="stat-lbl">Annual Benefit</div></div>
<div class="stat-card"><div class="stat-num" id="ss-fra-amt">$2,108</div><div class="stat-lbl">Benefit at FRA 67</div></div>
<div class="stat-card"><div class="stat-num" id="ss-age70">$2,614</div><div class="stat-lbl">Benefit at Age 70</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Estimated AIME</span><span class="val" id="ss-aime-disp">$5,417</span></div>
<div class="breakdown-row"><span>PIA at Full Retirement Age</span><span class="val" id="ss-pia">$2,108</span></div>
<div class="breakdown-row"><span>Your Full Retirement Age</span><span class="val" id="ss-fra-age">67</span></div>
<div class="breakdown-row"><span>Adjustment Factor</span><span class="val" id="ss-adj">0%</span></div>
<div class="breakdown-row"><span>Break-even vs. Claiming at 62</span><span class="val" id="ss-breakeven">~78</span></div>
<div class="highlight-row"><span>Monthly Benefit</span><span id="ss-monthly-final">$2,108</span></div>
</div>
</div></div>
<div class="calc-article"><h2>How Social Security Benefits Are Calculated</h2><p>The SSA uses a three-step process: (1) Index your historical earnings to today's wages using the National Average Wage Index. (2) Take your 35 highest-earning indexed years, sum them, and divide by 420 to get your AIME. (3) Apply the PIA bend-point formula to convert AIME into your base benefit.</p><h3>2026 PIA Bend Points</h3><p>The PIA formula replaces different percentages of income at different levels: <strong>90%</strong> of the first $1,174 of AIME, <strong>32%</strong> of AIME between $1,174 and $7,078, and <strong>15%</strong> of AIME above $7,078.</p><h3>When Should You Claim?</h3><p>Claiming at 62 gives you more years of payments but a permanently reduced benefit. Waiting until 70 maximizes your monthly amount. The break-even point (when lifetime benefits from waiting surpass lifetime benefits from early claiming) is typically around age 78–82. If you're in good health and have other income sources, delaying is usually advantageous.</p><p>Married couples should coordinate — often it makes sense for the higher earner to delay as long as possible to maximize the survivor benefit.</p></div>`
);
ssHtml = ssHtml.replace('</body>', `<script>
function fmtS(n){return '$'+Math.round(n).toLocaleString();}
function calcSS(){
  var ann=parseFloat(document.getElementById('ss-aime').value)||65000;
  var birth=parseInt(document.getElementById('ss-birth').value)||1965;
  var claimAge=parseInt(document.getElementById('ss-claim').value)||67;
  var fra=birth>=1960?67:birth>=1955?66+(birth-1955)*2/12:66;
  fra=Math.round(fra*12)/12;
  var fraDisp=birth>=1960?'67':birth>=1959?'66 yrs 10 mo':birth>=1958?'66 yrs 8 mo':birth>=1957?'66 yrs 6 mo':birth>=1956?'66 yrs 4 mo':birth>=1955?'66 yrs 2 mo':'66';
  var aime=ann/12;
  var pia=0;
  if(aime<=1174){pia=aime*0.90;}
  else if(aime<=7078){pia=1174*0.90+(aime-1174)*0.32;}
  else{pia=1174*0.90+(7078-1174)*0.32+(aime-7078)*0.15;}
  pia=Math.round(pia*10)/10;
  var fraMonths=Math.round((birth>=1960?67:birth>=1955?66+(birth-1955)*2/12:66)*12);
  var claimMonths=claimAge*12;
  var diffMonths=claimMonths-fraMonths;
  var adj=0;
  if(diffMonths<0){
    var early=Math.abs(diffMonths);
    var first36=Math.min(early,36);
    var beyond=Math.max(0,early-36);
    adj=-(first36*(5/9/100)+beyond*(5/12/100));
  } else {
    adj=diffMonths*(8/12/100);
  }
  var benefit=pia*(1+adj);
  var at70=pia*(1+(70*12-fraMonths)*(8/12/100));
  var at62=pia*(1-(Math.min(36,36)*(5/9/100)+Math.max(0,(fra>66?12:0))*(5/12/100)));
  var moEarly=(62-fra)*12; var first36e=Math.min(Math.abs(moEarly),36); var beyond36e=Math.max(0,Math.abs(moEarly)-36);
  at62=pia*(1-(first36e*(5/9/100)+beyond36e*(5/12/100)));
  var beDiff=benefit-at62;
  var beYears=beDiff>0?(62+(at62*12*100/(beDiff*12)/12)):0;
  document.getElementById('ss-result').textContent=fmtS(benefit);
  document.getElementById('ss-sub').textContent='At age '+claimAge+(claimAge==fra?' (Full Retirement Age)':claimAge<fra?' (reduced)':' (delayed credits)');
  document.getElementById('ss-annual').textContent=fmtS(benefit*12);
  document.getElementById('ss-fra-amt').textContent=fmtS(pia);
  document.getElementById('ss-age70').textContent=fmtS(at70);
  document.getElementById('ss-aime-disp').textContent=fmtS(aime);
  document.getElementById('ss-pia').textContent=fmtS(pia);
  document.getElementById('ss-fra-age').textContent=fraDisp;
  document.getElementById('ss-adj').textContent=(adj>=0?'+':'')+Math.round(adj*1000)/10+'%';
  document.getElementById('ss-breakeven').textContent=claimAge<67?'~'+Math.round(beYears):'N/A';
  document.getElementById('ss-monthly-final').textContent=fmtS(benefit);
}
calcSS();
<\/script></body>`);
fs.writeFileSync(B+'social-security-benefits-calculator.html', ssHtml);
console.log('Built: social-security-benefits-calculator');

// ─── 2. STUDENT LOAN REPAYMENT CALCULATOR ────────────────────────────────────
var slHtml = wrap('student-loan-repayment-calculator',
  'Student Loan Repayment Calculator 2026 | Standard, IBR, SAVE Plans',
  'Calculate monthly payments and total cost for all federal student loan repayment plans: Standard 10-year, Graduated, IBR, SAVE, PAYE, and Extended.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Student Loan Repayment Calculator 2026","url":`${DOMAIN}/student-loan-repayment-calculator`,"description":"Compare all federal student loan repayment plans. Enter your loan balance and income to see payments and total cost under Standard, IBR, SAVE, PAYE, and Extended plans.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the standard student loan repayment plan?","acceptedAnswer":{"@type":"Answer","text":"The Standard 10-year repayment plan divides your loan balance into 120 equal monthly payments over 10 years. It typically results in the lowest total interest paid but the highest monthly payment compared to income-driven plans."}},{"@type":"Question","name":"What is the SAVE repayment plan?","acceptedAnswer":{"@type":"Answer","text":"SAVE (Saving on a Valuable Education) is the newest income-driven repayment plan. Undergraduate loans are capped at 5% of discretionary income (income above 225% of the federal poverty line), graduate loans at 10%, and a weighted blend for mixed borrowers. After 20-25 years of payments, any remaining balance is forgiven."}},{"@type":"Question","name":"How does IBR (Income-Based Repayment) work?","acceptedAnswer":{"@type":"Answer","text":"Under IBR for new borrowers after July 2014, your payment is capped at 10% of your discretionary income (AGI minus 150% of the federal poverty guideline for your family size). After 20 years of payments, any remaining balance is forgiven. For older borrowers, the cap is 15% with forgiveness after 25 years."}},{"@type":"Question","name":"What happens to my student loans after 20-25 years?","acceptedAnswer":{"@type":"Answer","text":"Under income-driven plans (IBR, SAVE, PAYE, ICR), any remaining balance is forgiven after 20-25 years of qualifying payments. Under current law, this forgiven amount may be treated as taxable income in the year of forgiveness (the 'tax bomb'), though legislation has periodically changed this treatment."}}]}),
  `<h1 class="calc-title" data-enter>Student Loan Repayment Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Compare all federal repayment plans side-by-side: Standard 10-year, Graduated, IBR, SAVE, and Extended. See your monthly payment and total interest for each.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="sl-balance">Total Loan Balance</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="sl-balance" class="calc-input" value="35000" min="1000" max="500000" step="500"></div></div>
<div class="input-group"><label class="input-label" for="sl-rate">Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="sl-rate" class="calc-input" value="6.54" min="1" max="15" step="0.01"><span class="input-suffix">%</span></div><div class="input-hint">2024–25 federal rate: 6.54% undergrad, 8.08% grad</div></div>
<div class="input-group"><label class="input-label" for="sl-income">Adjusted Gross Income (AGI)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="sl-income" class="calc-input" value="55000" min="0" max="500000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="sl-family">Family Size</label><select id="sl-family" class="calc-select"><option value="1" selected>1 (single)</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div>
<button class="calc-btn" onclick="calcSL()">Compare Plans</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="sl-result">$392</div><div class="result-label">Standard 10-Year Monthly Payment</div><div class="result-sub" id="sl-sub">$12,000 total interest over 120 months</div></div>
<div id="sl-plans"></div>
</div></div>
<div class="calc-article"><h2>Which Repayment Plan Is Best?</h2><p><strong>Standard 10-year</strong> minimizes total interest — best if you can afford the payment and want to be debt-free fastest.</p><p><strong>SAVE</strong> offers the lowest income-driven payment for most borrowers and the best interest subsidy. If your payment doesn't cover accruing interest, the government covers the difference so your balance doesn't grow.</p><p><strong>IBR</strong> is a solid fallback — widely available and protects borrowers with high debt-to-income ratios. The 20/25-year forgiveness is a backstop if income stays low.</p><p><strong>Graduated</strong> makes sense if you expect income to grow significantly — lower payments now, rising payments every two years.</p><h3>Public Service Loan Forgiveness (PSLF)</h3><p>If you work for a government or qualifying nonprofit, PSLF forgives remaining balances tax-free after just 10 years (120 payments) on an income-driven plan. This is far more valuable than standard forgiveness and changes the math entirely — with PSLF eligible employment, maximize IDR plan enrollment.</p></div>`
);
slHtml = slHtml.replace('</body>', `<script>
function fmtM(n){return '$'+Math.round(n).toLocaleString();}
function pmt(P,r,n){if(r===0)return P/n;return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function calcSL(){
  var bal=parseFloat(document.getElementById('sl-balance').value)||35000;
  var rate=parseFloat(document.getElementById('sl-rate').value)/100/12;
  var income=parseFloat(document.getElementById('sl-income').value)||55000;
  var fam=parseInt(document.getElementById('sl-family').value)||1;
  var pov=[0,15060,20440,25820,31200,36580][fam]||15060;
  var disc10=Math.max(0,income-pov*1.5);
  var disc225=Math.max(0,income-pov*2.25);
  var std=pmt(bal,rate,120);
  var stdTotal=std*120;
  var grad0=pmt(bal,rate,120)*0.75;
  var gradTotal=0,gradBal=bal;
  for(var g=0;g<10;g++){var gp=grad0*Math.pow(1.1,g);for(var m=0;m<12;m++){gradBal=gradBal*(1+rate)-gp;} gradTotal+=gp*12;}
  var ibrMo=Math.max(Math.min(disc10*0.10/12,pmt(bal,rate,240)),0);
  var ibrTotal=ibrMo*240;
  var saveMo=Math.max(disc225*0.05/12,0);
  var saveTotal=saveMo*240;
  var extMo=pmt(bal,rate,300);
  var extTotal=extMo*300;
  document.getElementById('sl-result').textContent=fmtM(std);
  document.getElementById('sl-sub').textContent=fmtM(stdTotal-bal)+' total interest over 120 months';
  var plans=[
    {name:'Standard 10-Year',mo:std,total:stdTotal,n:120},
    {name:'Extended 25-Year',mo:extMo,total:extTotal,n:300},
    {name:'Graduated 10-Year',mo:grad0,moNote:'(starts low, rises)',total:gradTotal,n:120},
    {name:'IBR (10% discretionary)',mo:ibrMo,total:ibrTotal,n:240,note:'20-yr forgiveness'},
    {name:'SAVE (5% discretionary)',mo:saveMo,total:saveTotal,n:240,note:'20-yr forgiveness + interest subsidy'},
  ];
  var html='';
  plans.forEach(function(p){
    html+='<div class="plan-block"><div style="display:flex;justify-content:space-between;align-items:center"><strong>'+p.name+'</strong><span style="font-family:monospace;font-size:16px;font-weight:700;color:var(--accent)">'+fmtM(p.mo)+'/mo</span></div>';
    if(p.moNote)html+='<div style="font-size:11px;color:var(--ink-3)">'+p.moNote+'</div>';
    html+='<div style="font-size:12px;color:var(--ink-2);margin-top:6px">Total paid: '+fmtM(p.total)+' &nbsp;|&nbsp; Interest: '+fmtM(Math.max(0,p.total-bal))+'</div>';
    if(p.note)html+='<div style="font-size:11px;color:#16a34a;margin-top:3px;font-weight:600">'+p.note+'</div>';
    html+='</div>';
  });
  document.getElementById('sl-plans').innerHTML=html;
}
calcSL();
<\/script></body>`);
fs.writeFileSync(B+'student-loan-repayment-calculator.html', slHtml);
console.log('Built: student-loan-repayment-calculator');

// ─── 3. HOW LONG WILL MY MONEY LAST CALCULATOR ───────────────────────────────
var mlHtml = wrap('how-long-will-my-money-last-calculator',
  'How Long Will My Money Last Calculator 2026 | Retirement Drawdown',
  'Find out how long your savings will last in retirement. Enter your balance, monthly withdrawal, and expected investment return to see your depletion date.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"How Long Will My Money Last Calculator 2026","url":`${DOMAIN}/how-long-will-my-money-last-calculator`,"description":"Calculate how long your retirement savings will last based on monthly withdrawals and investment returns. Accounts for inflation to show real purchasing power over time.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long will $1 million last in retirement?","acceptedAnswer":{"@type":"Answer","text":"At a $4,000/month withdrawal ($48,000/year) with a 6% annual return, $1 million lasts approximately 37 years. At $5,000/month it lasts about 27 years. At $3,333/month (the 4% rule), it lasts indefinitely in most scenarios. Inflation reduces real purchasing power over time."}},{"@type":"Question","name":"What is the 4% rule for retirement withdrawals?","acceptedAnswer":{"@type":"Answer","text":"The 4% rule states that you can withdraw 4% of your portfolio in the first year of retirement, then adjust for inflation each year, and historically have a 95%+ chance of your money lasting 30 years. For a 30-year retirement, $1 million supports roughly $40,000/year in withdrawals."}},{"@type":"Question","name":"How does inflation affect retirement savings?","acceptedAnswer":{"@type":"Answer","text":"Inflation erodes purchasing power over time. At 3% annual inflation, $4,000 today will require $5,376 in 10 years to buy the same goods. Retirees who don't account for inflation risk running out of money even when nominal balances look adequate."}},{"@type":"Question","name":"What withdrawal rate is safe for retirement?","acceptedAnswer":{"@type":"Answer","text":"Most financial planners consider 3.5-4% annually as a safe withdrawal rate for a 30-year retirement. For longer retirements (35-40 years), consider 3-3.5%. At very low rates (under 3%), a balanced portfolio historically sustains withdrawals indefinitely."}}]}),
  `<h1 class="calc-title" data-enter>How Long Will My Money Last? <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Enter your current savings balance, monthly withdrawal amount, and expected investment return. See exactly when (or if) your money runs out.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="ml-balance">Current Savings / Portfolio Balance</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ml-balance" class="calc-input" value="500000" min="10000" step="5000"></div></div>
<div class="input-group"><label class="input-label" for="ml-withdraw">Monthly Withdrawal</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ml-withdraw" class="calc-input" value="2500" min="100" step="100"></div></div>
<div class="input-group"><label class="input-label" for="ml-return">Expected Annual Return</label><div class="input-prefix-wrap"><input type="number" id="ml-return" class="calc-input" value="6" min="0" max="15" step="0.25"><span class="input-suffix">%</span></div><div class="input-hint">Conservative: 4-5% &nbsp;|&nbsp; Moderate: 6-7% &nbsp;|&nbsp; Aggressive: 8-10%</div></div>
<div class="input-group"><label class="input-label" for="ml-inflation">Annual Inflation Rate</label><div class="input-prefix-wrap"><input type="number" id="ml-inflation" class="calc-input" value="3" min="0" max="10" step="0.25"><span class="input-suffix">%</span></div></div>
<button class="calc-btn" onclick="calcML()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="ml-result">37 yrs</div><div class="result-label" id="ml-result-label">Money Lasts Until Age</div><div class="result-sub" id="ml-sub">Balance depleted around year 2062</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="ml-rate-disp">6.0%</div><div class="stat-lbl">Annual Return</div></div>
<div class="stat-card"><div class="stat-num" id="ml-safe-rate">$1,667</div><div class="stat-lbl">4% Rule Safe Monthly</div></div>
<div class="stat-card"><div class="stat-num" id="ml-forever">$2,500</div><div class="stat-lbl">Forever Threshold</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Starting Balance</span><span class="val" id="ml-s-bal">$500,000</span></div>
<div class="breakdown-row"><span>Monthly Withdrawal (Year 1)</span><span class="val" id="ml-s-wd">$2,500</span></div>
<div class="breakdown-row"><span>Annual Withdrawal (Year 1)</span><span class="val" id="ml-s-annual-wd">$30,000</span></div>
<div class="breakdown-row"><span>Withdrawal Rate</span><span class="val" id="ml-s-pct">6.0%</span></div>
<div class="breakdown-row"><span>Inflation-Adjusted Monthly (Yr 20)</span><span class="val" id="ml-s-inf20">$4,515</span></div>
<div class="highlight-row"><span>Years Until Depletion</span><span id="ml-s-years">37 years</span></div>
</div>
</div></div>
<div class="calc-article"><h2>The 4% Rule Explained</h2><p>The 4% rule comes from the Trinity Study (1998), which found that a portfolio of 50-75% stocks could sustain a 4% initial withdrawal rate (inflation-adjusted) for 30 years with over 95% success historically. For a $500,000 portfolio, this means $20,000/year or about $1,667/month.</p><h3>What Can Make Your Money Last Longer</h3><ul style="padding-left:20px;line-height:1.8"><li>Delay Social Security to age 70 — replaces $1,000-$2,000+/month of withdrawals</li><li>Part-time income even for 5-7 years cuts the portfolio draw dramatically</li><li>Flexible spending — reduce withdrawals in down-market years</li><li>Bond/cash buffer — keep 1-2 years of expenses in cash to avoid selling stocks in downturns</li></ul></div>`
);
mlHtml = mlHtml.replace('</body>', `<script>
function fmtML(n){return '$'+Math.round(n).toLocaleString();}
function calcML(){
  var bal=parseFloat(document.getElementById('ml-balance').value)||500000;
  var wd=parseFloat(document.getElementById('ml-withdraw').value)||2500;
  var ret=parseFloat(document.getElementById('ml-return').value)/100;
  var inf=parseFloat(document.getElementById('ml-inflation').value)/100;
  var rMo=ret/12;
  var iMo=inf/12;
  var safe4pct=bal*0.04/12;
  var foreverThresh=bal*rMo;
  var years=0;
  if(wd<=foreverThresh){
    document.getElementById('ml-result').textContent='Forever';
    document.getElementById('ml-result-label').textContent='Your money grows or holds indefinitely';
    document.getElementById('ml-sub').textContent='Monthly income ('+fmtML(wd)+') is less than monthly growth ('+fmtML(foreverThresh)+')';
    years=999;
  } else {
    var b=bal,mo=0,maxMo=1200;
    while(b>0&&mo<maxMo){b=b*(1+rMo)-wd*Math.pow(1+iMo,mo);mo++;}
    years=mo/12;
    var yr=Math.round(new Date().getFullYear()+years);
    document.getElementById('ml-result').textContent=years>=100?'100+ yrs':Math.round(years)+' yrs';
    document.getElementById('ml-result-label').textContent='Money Lasts Until ~'+yr;
    document.getElementById('ml-sub').textContent='Balance depleted around year '+yr+' (inflation-adjusted)';
  }
  var inf20=wd*Math.pow(1+inf,20);
  document.getElementById('ml-rate-disp').textContent=ret*100+'%';
  document.getElementById('ml-safe-rate').textContent=fmtML(safe4pct);
  document.getElementById('ml-forever').textContent=fmtML(foreverThresh);
  document.getElementById('ml-s-bal').textContent=fmtML(bal);
  document.getElementById('ml-s-wd').textContent=fmtML(wd);
  document.getElementById('ml-s-annual-wd').textContent=fmtML(wd*12);
  document.getElementById('ml-s-pct').textContent=Math.round(wd*12/bal*1000)/10+'%';
  document.getElementById('ml-s-inf20').textContent=fmtML(inf20);
  document.getElementById('ml-s-years').textContent=years>=999?'Indefinitely':Math.round(years)+' years';
}
calcML();
<\/script></body>`);
fs.writeFileSync(B+'how-long-will-my-money-last-calculator.html', mlHtml);
console.log('Built: how-long-will-my-money-last-calculator');

// ─── 4. AUTO REFINANCE CALCULATOR ────────────────────────────────────────────
var arHtml = wrap('auto-refinance-calculator',
  'Auto Refinance Calculator 2026 | Monthly Savings & Break-Even',
  'Calculate how much you save by refinancing your car loan. Enter your current loan and new rate to see monthly savings, total interest saved, and break-even point.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Auto Refinance Calculator 2026","url":`${DOMAIN}/auto-refinance-calculator`,"description":"Compare your current auto loan vs a refinanced loan. See monthly payment savings, total interest savings, and how many months until you break even on refinancing costs.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When should you refinance a car loan?","acceptedAnswer":{"@type":"Answer","text":"Good times to refinance: your credit score has improved significantly since the original loan, interest rates have dropped, you got dealer financing at a high rate, or you're struggling with your current payment and want to extend the term. Avoid refinancing if you're close to paying off the loan — the savings rarely justify the costs."}},{"@type":"Question","name":"Does refinancing a car loan hurt your credit?","acceptedAnswer":{"@type":"Answer","text":"Refinancing causes a hard inquiry which may temporarily lower your score by a few points. If you're shopping multiple lenders, do so within a 14-45 day window — credit bureaus typically treat multiple auto loan inquiries within this period as a single inquiry."}},{"@type":"Question","name":"How much does it cost to refinance a car loan?","acceptedAnswer":{"@type":"Answer","text":"Most auto refinances have minimal fees: a title transfer fee ($25-$75 in most states) and potentially a loan origination fee (0.5-1% of the loan amount at some lenders). Many online lenders charge nothing. The key cost is if you extend your term — you may pay less per month but more total."}},{"@type":"Question","name":"Can you refinance a car loan with bad credit?","acceptedAnswer":{"@type":"Answer","text":"Yes, but options are limited and rates may not improve. Credit unions are often more flexible than banks. If you've made on-time payments for 12+ months on your current loan, some lenders will approve a refinance. If your score improved from the original loan, even modestly, you may qualify for a better rate."}}]}),
  `<h1 class="calc-title" data-enter>Auto Refinance Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">See exactly how much you'd save by refinancing your car loan at a lower rate. Compare monthly payment, total interest, and break-even timeline.</p>
<div class="calc-layout"><div class="calc-inputs">
<div style="font-size:13px;font-weight:700;color:var(--ink-2);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Current Loan</div>
<div class="input-group"><label class="input-label" for="ar-balance">Remaining Balance</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ar-balance" class="calc-input" value="18000" min="1000" max="100000" step="500"></div></div>
<div class="input-group"><label class="input-label" for="ar-cur-rate">Current Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="ar-cur-rate" class="calc-input" value="9.5" min="1" max="30" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="ar-months-left">Months Remaining</label><input type="number" id="ar-months-left" class="calc-input" value="48" min="6" max="84" step="1"></div>
<div style="font-size:13px;font-weight:700;color:var(--ink-2);margin:16px 0 8px;text-transform:uppercase;letter-spacing:.05em">New Loan</div>
<div class="input-group"><label class="input-label" for="ar-new-rate">New Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="ar-new-rate" class="calc-input" value="6.5" min="1" max="30" step="0.1"><span class="input-suffix">%</span></div></div>
<div class="input-group"><label class="input-label" for="ar-new-term">New Loan Term</label><select id="ar-new-term" class="calc-select"><option value="24">24 months</option><option value="36">36 months</option><option value="48" selected>48 months</option><option value="60">60 months</option><option value="72">72 months</option></select></div>
<div class="input-group"><label class="input-label" for="ar-fees">Refinancing Fees</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="ar-fees" class="calc-input" value="50" min="0" max="500" step="10"></div></div>
<button class="calc-btn" onclick="calcAR()">Calculate Savings</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="ar-result">$89</div><div class="result-label">Monthly Savings</div><div class="result-sub" id="ar-sub">Break-even in 1 month</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="ar-cur-pmt">$450</div><div class="stat-lbl">Current Payment</div></div>
<div class="stat-card"><div class="stat-num" id="ar-new-pmt">$361</div><div class="stat-lbl">New Payment</div></div>
<div class="stat-card"><div class="stat-num" id="ar-int-saved">$3,890</div><div class="stat-lbl">Interest Saved</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Current Remaining Interest</span><span class="val" id="ar-cur-int">$3,600</span></div>
<div class="breakdown-row"><span>New Total Interest</span><span class="val" id="ar-new-int">$2,300</span></div>
<div class="breakdown-row"><span>Refinancing Fees</span><span class="val" id="ar-fee-disp">$50</span></div>
<div class="breakdown-row"><span>Net Interest Saved</span><span class="val" id="ar-net-saved">$1,250</span></div>
<div class="breakdown-row"><span>Break-Even Point</span><span class="val" id="ar-breakeven">1 month</span></div>
<div class="highlight-row"><span>Total Lifetime Savings</span><span id="ar-total-saved">$1,250</span></div>
</div>
</div></div>
<div class="calc-article"><h2>How to Get the Best Refinance Rate</h2><p>Your credit score is the single biggest factor. Check your score before applying — if it's improved by 30+ points since your original loan, you almost certainly qualify for a lower rate. Credit unions typically offer the lowest auto loan rates, often 1-2% below banks and dealers.</p><p>The average new-car refinance rate in 2026 is around 5.5-7% for excellent credit (720+) and 7-12% for fair credit (580-680). If your original loan was dealer-arranged, you likely have significant room to refinance lower — dealers often mark up rates 2-3% for profit.</p></div>`
);
arHtml = arHtml.replace('</body>', `<script>
function fmtAR(n){return '$'+Math.round(n).toLocaleString();}
function pmtAR(P,r,n){if(r===0)return P/n;return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
function calcAR(){
  var bal=parseFloat(document.getElementById('ar-balance').value)||18000;
  var curR=parseFloat(document.getElementById('ar-cur-rate').value)/100/12;
  var moLeft=parseInt(document.getElementById('ar-months-left').value)||48;
  var newR=parseFloat(document.getElementById('ar-new-rate').value)/100/12;
  var newN=parseInt(document.getElementById('ar-new-term').value)||48;
  var fees=parseFloat(document.getElementById('ar-fees').value)||0;
  var curPmt=pmtAR(bal,curR,moLeft);
  var newPmt=pmtAR(bal,newR,newN);
  var curTotalInt=curPmt*moLeft-bal;
  var newTotalInt=newPmt*newN-bal;
  var intSaved=curTotalInt-newTotalInt;
  var netSaved=intSaved-fees;
  var moSave=curPmt-newPmt;
  var breakEven=moSave>0?Math.ceil(fees/moSave):999;
  document.getElementById('ar-result').textContent=moSave>=0?fmtAR(moSave):('+'+fmtAR(-moSave));
  document.getElementById('ar-sub').textContent=moSave>0?'Break-even in '+breakEven+' month'+(breakEven===1?'':'s'):'Payment increases — only justified if extending for lower payment';
  document.getElementById('ar-cur-pmt').textContent=fmtAR(curPmt);
  document.getElementById('ar-new-pmt').textContent=fmtAR(newPmt);
  document.getElementById('ar-int-saved').textContent=fmtAR(Math.max(0,intSaved));
  document.getElementById('ar-cur-int').textContent=fmtAR(curTotalInt);
  document.getElementById('ar-new-int').textContent=fmtAR(newTotalInt);
  document.getElementById('ar-fee-disp').textContent=fmtAR(fees);
  document.getElementById('ar-net-saved').textContent=fmtAR(netSaved);
  document.getElementById('ar-breakeven').textContent=breakEven>=999?'N/A':breakEven+' month'+(breakEven===1?'':'s');
  document.getElementById('ar-total-saved').textContent=fmtAR(netSaved);
}
calcAR();
<\/script></body>`);
fs.writeFileSync(B+'auto-refinance-calculator.html', arHtml);
console.log('Built: auto-refinance-calculator');

// ─── 5. RATE OF RETURN CALCULATOR ────────────────────────────────────────────
var rrHtml = wrap('rate-of-return-calculator',
  'Rate of Return Calculator 2026 | CAGR & Investment Growth',
  'Calculate your investment rate of return (CAGR) from any starting and ending value. Supports lump-sum and regular contribution scenarios.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Rate of Return Calculator 2026","url":`${DOMAIN}/rate-of-return-calculator`,"description":"Calculate compound annual growth rate (CAGR) for any investment. Enter starting value, ending value, and time period to see your annualized return. Supports contributions.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a good rate of return on investments?","acceptedAnswer":{"@type":"Answer","text":"The S&P 500 has averaged approximately 10% annually before inflation (7% after inflation) over the long run. A diversified stock/bond portfolio might average 6-8% annually. Most financial plans use 6-7% as a conservative estimate for a balanced portfolio, and 8-10% for stock-heavy portfolios."}},{"@type":"Question","name":"What is CAGR?","acceptedAnswer":{"@type":"Answer","text":"CAGR (Compound Annual Growth Rate) is the year-over-year growth rate of an investment over a specified period. Unlike a simple average, CAGR accounts for the compounding effect. Formula: CAGR = (Ending Value / Beginning Value)^(1/Years) - 1. A $10,000 investment growing to $25,000 over 10 years has a CAGR of 9.6%."}},{"@type":"Question","name":"How is rate of return different from interest rate?","acceptedAnswer":{"@type":"Answer","text":"Interest rate usually refers to a guaranteed fixed rate (like a savings account or bond coupon). Rate of return is a broader term that includes realized gains, dividends, and price appreciation on investments. It's calculated after-the-fact on actual results, while interest rates are stated upfront."}},{"@type":"Question","name":"What is the rule of 72?","acceptedAnswer":{"@type":"Answer","text":"The Rule of 72 is a quick mental math shortcut: divide 72 by your annual return rate to estimate how many years it takes to double your money. At 6%, money doubles in 12 years. At 9%, it doubles in 8 years. At 12%, it doubles in 6 years."}}]}),
  `<h1 class="calc-title" data-enter>Rate of Return Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your investment's compound annual growth rate (CAGR). Enter your starting value, ending value, and holding period to see your annualized return.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="rr-mode">Calculation Mode</label><select id="rr-mode" class="calc-select" onchange="toggleRRMode()"><option value="cagr" selected>CAGR (no contributions)</option><option value="contrib">With Monthly Contributions</option></select></div>
<div class="input-group"><label class="input-label" for="rr-start">Starting Value (Initial Investment)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="rr-start" class="calc-input" value="10000" min="0" step="100"></div></div>
<div class="input-group"><label class="input-label" for="rr-end">Ending Value (Current / Final Value)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="rr-end" class="calc-input" value="25000" min="1" step="100"></div></div>
<div class="input-group" id="rr-contrib-row" style="display:none"><label class="input-label" for="rr-contrib">Monthly Contribution</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="rr-contrib" class="calc-input" value="200" min="0" step="50"></div></div>
<div class="input-group"><label class="input-label" for="rr-years">Investment Period (Years)</label><input type="number" id="rr-years" class="calc-input" value="10" min="1" max="50" step="1"></div>
<button class="calc-btn" onclick="calcRR()">Calculate Return</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="rr-result">9.60%</div><div class="result-label">Annual Rate of Return (CAGR)</div><div class="result-sub" id="rr-sub">$10,000 → $25,000 over 10 years</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="rr-total-gain">$15,000</div><div class="stat-lbl">Total Gain</div></div>
<div class="stat-card"><div class="stat-num" id="rr-total-ret">150%</div><div class="stat-lbl">Total Return</div></div>
<div class="stat-card"><div class="stat-num" id="rr-double">7.5 yrs</div><div class="stat-lbl">Doubles Every</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Initial Investment</span><span class="val" id="rr-s-start">$10,000</span></div>
<div class="breakdown-row"><span>Final Value</span><span class="val" id="rr-s-end">$25,000</span></div>
<div class="breakdown-row"><span>Time Period</span><span class="val" id="rr-s-years">10 years</span></div>
<div class="breakdown-row"><span>Rule of 72 (doubles in)</span><span class="val" id="rr-s-r72">7.5 years</span></div>
<div class="highlight-row"><span>CAGR</span><span id="rr-s-cagr">9.60%</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Historical Rate of Return Benchmarks</h2><p>Knowing your CAGR is only useful if you have a benchmark. Here are historical average annualized returns (approximate, before taxes):</p><ul style="padding-left:20px;line-height:1.8"><li><strong>S&amp;P 500:</strong> ~10.5% (1926–2024), ~7.5% inflation-adjusted</li><li><strong>US Total Stock Market:</strong> ~10% annually long-term</li><li><strong>60/40 Portfolio:</strong> ~8% annually</li><li><strong>10-Year Treasury Bond:</strong> ~4-5% current yield</li><li><strong>High-Yield Savings:</strong> 4-5% (2024-2026)</li><li><strong>US Real Estate:</strong> ~4-6% annually (price appreciation only)</li></ul><h3>The Power of Compounding</h3><p>At 10% CAGR, $10,000 becomes: $25,937 in 10 years, $67,275 in 20 years, $174,494 in 30 years. The last 10 years generate more than the first 20 combined — which is why starting early matters far more than the amount.</p></div>`
);
rrHtml = rrHtml.replace('</body>', `<script>
function fmtRR(n){return '$'+Math.round(n).toLocaleString();}
function toggleRRMode(){
  var m=document.getElementById('rr-mode').value;
  document.getElementById('rr-contrib-row').style.display=m==='contrib'?'block':'none';
  calcRR();
}
function calcRR(){
  var mode=document.getElementById('rr-mode').value;
  var PV=parseFloat(document.getElementById('rr-start').value)||0;
  var FV=parseFloat(document.getElementById('rr-end').value)||1;
  var yrs=parseFloat(document.getElementById('rr-years').value)||10;
  var contrib=parseFloat(document.getElementById('rr-contrib').value)||0;
  var cagr;
  if(mode==='cagr'){
    cagr=Math.pow(FV/Math.max(PV,0.01),1/yrs)-1;
  } else {
    var lo=-0.5,hi=5,mid=0,n=yrs*12;
    for(var i=0;i<100;i++){mid=(lo+hi)/2;var r=mid/12;var fvCalc=PV*Math.pow(1+r,n)+contrib*((Math.pow(1+r,n)-1)/r);if(fvCalc<FV)lo=mid;else hi=mid;}
    cagr=Math.pow(1+mid/12,12)-1;
  }
  var totalInvested=mode==='contrib'?(PV+contrib*yrs*12):PV;
  var gain=FV-totalInvested;
  var totalRet=Math.round((FV-totalInvested)/totalInvested*1000)/10;
  var doubleYrs=cagr>0?Math.round(72/Math.round(cagr*1000)/10*10)/10:999;
  var cagrPct=Math.round(cagr*10000)/100;
  document.getElementById('rr-result').textContent=cagrPct+'%';
  document.getElementById('rr-sub').textContent=fmtRR(PV)+' → '+fmtRR(FV)+' over '+yrs+' years';
  document.getElementById('rr-total-gain').textContent=fmtRR(gain);
  document.getElementById('rr-total-ret').textContent=totalRet+'%';
  document.getElementById('rr-double').textContent=doubleYrs>=999?'N/A':doubleYrs+' yrs';
  document.getElementById('rr-s-start').textContent=fmtRR(PV);
  document.getElementById('rr-s-end').textContent=fmtRR(FV);
  document.getElementById('rr-s-years').textContent=yrs+' years';
  document.getElementById('rr-s-r72').textContent=doubleYrs>=999?'N/A':doubleYrs+' years';
  document.getElementById('rr-s-cagr').textContent=cagrPct+'%';
}
calcRR();
<\/script></body>`);
fs.writeFileSync(B+'rate-of-return-calculator.html', rrHtml);
console.log('Built: rate-of-return-calculator');

// ─── 6. SAVINGS GOAL CALCULATOR ──────────────────────────────────────────────
var sgHtml = wrap('savings-goal-calculator',
  'Savings Goal Calculator 2026 | Monthly Savings & Time to Goal',
  'Calculate exactly how much to save monthly to reach any financial goal. Or enter a fixed monthly savings amount to see when you\'ll reach your target.',
  JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Savings Goal Calculator 2026","url":`${DOMAIN}/savings-goal-calculator`,"description":"Two modes: find required monthly savings to hit a goal by a deadline, or find how long it takes to reach a goal with a set monthly contribution. Includes compound interest.","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}),
  JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much should I save each month?","acceptedAnswer":{"@type":"Answer","text":"A common guideline is the 50/30/20 rule: 50% of take-home pay to needs, 30% to wants, and 20% to savings. For specific goals: a 6-month emergency fund requires saving $1,000-$2,000/month for 1-3 years depending on income. For retirement, aim to save 15% of gross income starting in your 20s."}},{"@type":"Question","name":"How long does it take to save $10,000?","acceptedAnswer":{"@type":"Answer","text":"At $500/month with 4.5% annual interest (HYSA rate), it takes about 19 months. At $1,000/month, about 10 months. If you're starting from zero at $833/month, exactly 12 months (not accounting for interest). With $5,000 already saved, the same $500/month reaches $10,000 in under 10 months."}},{"@type":"Question","name":"What interest rate should I use for a savings goal calculator?","acceptedAnswer":{"@type":"Answer","text":"For money in a high-yield savings account (HYSA): use 4-5% (2024-2026 rates). For money invested in index funds over 5+ years: use 6-8% as a moderate estimate. For short-term goals (under 2 years), keep the money in a HYSA or CDs and use the current rate."}},{"@type":"Question","name":"What is compound interest and why does it matter for savings?","acceptedAnswer":{"@type":"Answer","text":"Compound interest means you earn interest on your interest. At 5% annual interest, $10,000 becomes $10,500 in year 1, then $11,025 in year 2 (not $11,000). Over long periods, this compounding effect dramatically accelerates growth — a key reason to start saving early."}}]}),
  `<h1 class="calc-title" data-enter>Savings Goal Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Two modes: find the monthly savings needed to reach a target by a deadline, or see how long it takes to reach a goal with a fixed monthly contribution.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="sg-mode">Mode</label><select id="sg-mode" class="calc-select" onchange="toggleSGMode()"><option value="amount" selected>How much to save monthly?</option><option value="time">How long will it take?</option></select></div>
<div class="input-group"><label class="input-label" for="sg-goal">Savings Goal</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="sg-goal" class="calc-input" value="20000" min="100" step="500"></div></div>
<div class="input-group"><label class="input-label" for="sg-current">Current Savings (Starting Balance)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="sg-current" class="calc-input" value="2000" min="0" step="100"></div></div>
<div class="input-group" id="sg-months-row"><label class="input-label" for="sg-months">Time to Reach Goal</label><select id="sg-months" class="calc-select"><option value="6">6 months</option><option value="12">1 year</option><option value="18">18 months</option><option value="24" selected>2 years</option><option value="36">3 years</option><option value="48">4 years</option><option value="60">5 years</option><option value="84">7 years</option><option value="120">10 years</option></select></div>
<div class="input-group" id="sg-monthly-row" style="display:none"><label class="input-label" for="sg-monthly">Monthly Contribution</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="sg-monthly" class="calc-input" value="500" min="1" step="50"></div></div>
<div class="input-group"><label class="input-label" for="sg-rate">Annual Interest Rate</label><div class="input-prefix-wrap"><input type="number" id="sg-rate" class="calc-input" value="4.5" min="0" max="20" step="0.25"><span class="input-suffix">%</span></div><div class="input-hint">HYSA: ~4.5% &nbsp;|&nbsp; Index funds (5+ yr): 7%</div></div>
<button class="calc-btn" onclick="calcSG()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="sg-result">$733</div><div class="result-label" id="sg-result-label">Monthly Savings Needed</div><div class="result-sub" id="sg-sub">To reach $20,000 in 24 months</div></div>
<div class="stat-grid">
<div class="stat-card"><div class="stat-num" id="sg-total-contrib">$17,592</div><div class="stat-lbl">Total Contributions</div></div>
<div class="stat-card"><div class="stat-num" id="sg-interest">$408</div><div class="stat-lbl">Interest Earned</div></div>
<div class="stat-card"><div class="stat-num" id="sg-final">$20,000</div><div class="stat-lbl">Final Balance</div></div>
</div>
<div class="calc-card">
<div class="breakdown-row"><span>Starting Balance</span><span class="val" id="sg-s-start">$2,000</span></div>
<div class="breakdown-row"><span>Monthly Contribution</span><span class="val" id="sg-s-monthly">$733</span></div>
<div class="breakdown-row"><span>Total Months</span><span class="val" id="sg-s-months">24</span></div>
<div class="breakdown-row"><span>Annual Interest Rate</span><span class="val" id="sg-s-rate">4.5%</span></div>
<div class="highlight-row"><span>Goal Reached</span><span id="sg-s-date">Sep 2028</span></div>
</div>
</div></div>
<div class="calc-article"><h2>Savings Goal Strategies</h2><p><strong>Emergency fund (3-6 months of expenses):</strong> Keep in a high-yield savings account. For most households, aim for $15,000-$30,000. At $500/month into a 4.5% HYSA, you reach $15,000 in about 28 months.</p><p><strong>Down payment (20% of home price):</strong> On a $350,000 home, you need $70,000. At $1,500/month in a HYSA, that's about 44 months. Consider I-bonds or a CD ladder for medium-term (2-5 year) savings goals.</p><p><strong>Vacation / big purchase:</strong> Use a dedicated sub-account or separate HYSA. Auto-transfer a fixed amount each paycheck. Seeing the specific balance grow toward a goal is more motivating than keeping it in a general account.</p></div>`
);
sgHtml = sgHtml.replace('</body>', `<script>
function fmtSG(n){return '$'+Math.round(n).toLocaleString();}
function toggleSGMode(){
  var m=document.getElementById('sg-mode').value;
  document.getElementById('sg-months-row').style.display=m==='amount'?'block':'none';
  document.getElementById('sg-monthly-row').style.display=m==='time'?'block':'none';
  calcSG();
}
function calcSG(){
  var mode=document.getElementById('sg-mode').value;
  var goal=parseFloat(document.getElementById('sg-goal').value)||20000;
  var cur=parseFloat(document.getElementById('sg-current').value)||0;
  var rate=parseFloat(document.getElementById('sg-rate').value)/100/12;
  var need=goal-cur*Math.pow(1+rate,1);
  if(mode==='amount'){
    var n=parseInt(document.getElementById('sg-months').value)||24;
    var fvCur=cur*Math.pow(1+rate,n);
    var fvNeed=goal-fvCur;
    var mo=rate>0?fvNeed*rate/(Math.pow(1+rate,n)-1):fvNeed/n;
    mo=Math.max(0,mo);
    var totalContrib=mo*n;
    var interest=goal-cur-totalContrib;
    var d=new Date();d.setMonth(d.getMonth()+n);
    document.getElementById('sg-result').textContent=fmtSG(mo);
    document.getElementById('sg-result-label').textContent='Monthly Savings Needed';
    document.getElementById('sg-sub').textContent='To reach '+fmtSG(goal)+' in '+n+' months';
    document.getElementById('sg-total-contrib').textContent=fmtSG(totalContrib);
    document.getElementById('sg-interest').textContent=fmtSG(Math.max(0,interest));
    document.getElementById('sg-final').textContent=fmtSG(goal);
    document.getElementById('sg-s-monthly').textContent=fmtSG(mo);
    document.getElementById('sg-s-months').textContent=n+' months';
    document.getElementById('sg-s-date').textContent=d.toLocaleString('en-US',{month:'short',year:'numeric'});
  } else {
    var mo2=parseFloat(document.getElementById('sg-monthly').value)||500;
    var bal=cur,months=0;
    while(bal<goal&&months<1200){bal=bal*(1+rate)+mo2;months++;}
    var totalContrib2=mo2*months;
    var interest2=goal-cur-totalContrib2;
    var d2=new Date();d2.setMonth(d2.getMonth()+months);
    document.getElementById('sg-result').textContent=Math.floor(months/12)+'y '+(months%12)+'m';
    document.getElementById('sg-result-label').textContent='Time to Reach '+fmtSG(goal);
    document.getElementById('sg-sub').textContent='Saving '+fmtSG(mo2)+'/month at '+document.getElementById('sg-rate').value+'%';
    document.getElementById('sg-total-contrib').textContent=fmtSG(totalContrib2);
    document.getElementById('sg-interest').textContent=fmtSG(Math.max(0,interest2));
    document.getElementById('sg-final').textContent=fmtSG(bal);
    document.getElementById('sg-s-monthly').textContent=fmtSG(mo2);
    document.getElementById('sg-s-months').textContent=months+' months';
    document.getElementById('sg-s-date').textContent=d2.toLocaleString('en-US',{month:'short',year:'numeric'});
  }
  document.getElementById('sg-s-start').textContent=fmtSG(cur);
  document.getElementById('sg-s-rate').textContent=document.getElementById('sg-rate').value+'%';
}
calcSG();
<\/script></body>`);
fs.writeFileSync(B+'savings-goal-calculator.html', sgHtml);
console.log('Built: savings-goal-calculator');

console.log('\nBatch 3a complete — 6 pages built.');
