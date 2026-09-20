/**
 * Build 50 state payroll tax calculator pages + state hub page
 * node _build_state_payroll_pages.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';
const DOMAIN = 'https://www.freepayrollcalc.com';

// ── State data ────────────────────────────────────────────────────────────────
// cfg: t=0 no tax | t=1 flat (r=rate,d=std_ded) | t=2 graduated (b=[[max,rate],...],d=std_ded)
// b: brackets as [maxIncome, marginalRate] — last entry uses 9999999
// sdi: employee SDI/PFML rate (0 if none)
// note: state-specific 1-2 sentence fact for no-tax states (blank for tax states)
const STATES = [
  {slug:'alabama',name:'Alabama',abbr:'AL',cfg:{t:2,b:[[500,.02],[3000,.04],[9999999,.05]],d:2500,sdi:0},top:'5%',ttype:'2%–5%',note:''},
  {slug:'alaska',name:'Alaska',abbr:'AK',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No state income tax',note:'Alaska is one of 9 states with no income tax. The state funds government primarily through oil revenues and pays residents an annual Permanent Fund Dividend.'},
  {slug:'arizona',name:'Arizona',abbr:'AZ',cfg:{t:1,r:.025,d:14600,sdi:0},top:'2.5%',ttype:'2.5% flat',note:''},
  {slug:'arkansas',name:'Arkansas',abbr:'AR',cfg:{t:2,b:[[4999,.02],[8399,.04],[9999999,.044]],d:2340,sdi:0},top:'4.4%',ttype:'2%–4.4%',note:''},
  {slug:'california',name:'California',abbr:'CA',cfg:{t:2,b:[[10412,.01],[24684,.02],[38959,.04],[54081,.06],[68350,.08],[349137,.093],[418961,.103],[698271,.113],[1000000,.123],[9999999,.133]],d:5202,sdi:.011},top:'13.3%',ttype:'1%–13.3%',note:''},
  {slug:'colorado',name:'Colorado',abbr:'CO',cfg:{t:1,r:.044,d:14600,sdi:0},top:'4.4%',ttype:'4.4% flat',note:''},
  {slug:'connecticut',name:'Connecticut',abbr:'CT',cfg:{t:2,b:[[10000,.02],[50000,.045],[100000,.055],[200000,.06],[250000,.065],[500000,.069],[9999999,.0699]],d:15000,sdi:0},top:'6.99%',ttype:'2%–6.99%',note:''},
  {slug:'delaware',name:'Delaware',abbr:'DE',cfg:{t:2,b:[[2000,0],[5000,.022],[10000,.039],[20000,.048],[25000,.052],[60000,.0555],[9999999,.066]],d:3250,sdi:0},top:'6.6%',ttype:'0%–6.6%',note:''},
  {slug:'florida',name:'Florida',abbr:'FL',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No state income tax',note:'Florida has no state income tax, making it one of the most tax-friendly states for earners. The state funds itself through a 6% sales tax plus local surtaxes and property taxes.'},
  {slug:'georgia',name:'Georgia',abbr:'GA',cfg:{t:1,r:.0539,d:12000,sdi:0},top:'5.39%',ttype:'5.39% flat',note:''},
  {slug:'hawaii',name:'Hawaii',abbr:'HI',cfg:{t:2,b:[[2400,.014],[4800,.032],[9600,.055],[14400,.064],[19200,.068],[24000,.072],[36000,.076],[48000,.079],[150000,.0825],[175000,.09],[200000,.10],[9999999,.11]],d:2200,sdi:0},top:'11%',ttype:'1.4%–11%',note:''},
  {slug:'idaho',name:'Idaho',abbr:'ID',cfg:{t:1,r:.058,d:14600,sdi:0},top:'5.8%',ttype:'5.8% flat',note:''},
  {slug:'illinois',name:'Illinois',abbr:'IL',cfg:{t:1,r:.0495,d:0,sdi:0},top:'4.95%',ttype:'4.95% flat',note:''},
  {slug:'indiana',name:'Indiana',abbr:'IN',cfg:{t:1,r:.0305,d:1000,sdi:0},top:'3.05%',ttype:'3.05% flat',note:''},
  {slug:'iowa',name:'Iowa',abbr:'IA',cfg:{t:1,r:.038,d:14600,sdi:0},top:'3.8%',ttype:'3.8% flat',note:''},
  {slug:'kansas',name:'Kansas',abbr:'KS',cfg:{t:2,b:[[15000,.031],[30000,.0525],[9999999,.057]],d:3500,sdi:0},top:'5.7%',ttype:'3.1%–5.7%',note:''},
  {slug:'kentucky',name:'Kentucky',abbr:'KY',cfg:{t:1,r:.04,d:2770,sdi:0},top:'4%',ttype:'4% flat',note:''},
  {slug:'louisiana',name:'Louisiana',abbr:'LA',cfg:{t:1,r:.03,d:4500,sdi:0},top:'3%',ttype:'3% flat',note:''},
  {slug:'maine',name:'Maine',abbr:'ME',cfg:{t:2,b:[[24500,.058],[58050,.0675],[9999999,.0715]],d:14600,sdi:0},top:'7.15%',ttype:'5.8%–7.15%',note:''},
  {slug:'maryland',name:'Maryland',abbr:'MD',cfg:{t:2,b:[[1000,.02],[2000,.03],[3000,.04],[100000,.0475],[125000,.05],[150000,.0525],[250000,.055],[9999999,.0575]],d:2350,sdi:0},top:'5.75%',ttype:'2%–5.75%',note:''},
  {slug:'massachusetts',name:'Massachusetts',abbr:'MA',cfg:{t:1,r:.05,d:0,sdi:.0056},top:'5%',ttype:'5% flat',note:''},
  {slug:'michigan',name:'Michigan',abbr:'MI',cfg:{t:1,r:.0425,d:5400,sdi:0},top:'4.25%',ttype:'4.25% flat',note:''},
  {slug:'minnesota',name:'Minnesota',abbr:'MN',cfg:{t:2,b:[[31690,.0535],[104090,.068],[193240,.0785],[9999999,.0985]],d:14575,sdi:0},top:'9.85%',ttype:'5.35%–9.85%',note:''},
  {slug:'mississippi',name:'Mississippi',abbr:'MS',cfg:{t:1,r:.047,d:2300,sdi:0},top:'4.7%',ttype:'4.7% flat',note:''},
  {slug:'missouri',name:'Missouri',abbr:'MO',cfg:{t:2,b:[[1207,0],[2414,.02],[3621,.025],[4828,.03],[6035,.035],[7242,.04],[8449,.045],[9999999,.048]],d:14600,sdi:0},top:'4.8%',ttype:'0%–4.8%',note:''},
  {slug:'montana',name:'Montana',abbr:'MT',cfg:{t:2,b:[[20500,.047],[9999999,.059]],d:2600,sdi:0},top:'5.9%',ttype:'4.7%–5.9%',note:''},
  {slug:'nebraska',name:'Nebraska',abbr:'NE',cfg:{t:2,b:[[3700,.0246],[22170,.0351],[35730,.0501],[9999999,.0584]],d:7900,sdi:0},top:'5.84%',ttype:'2.46%–5.84%',note:''},
  {slug:'nevada',name:'Nevada',abbr:'NV',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No state income tax',note:'Nevada has no state income tax. The state relies heavily on gaming and tourism taxes. Las Vegas and Reno workers keep 100% of wages at the state level.'},
  {slug:'new-hampshire',name:'New Hampshire',abbr:'NH',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No tax on wages',note:"New Hampshire does not tax wages or salary. The state's Interest and Dividends Tax was fully repealed effective January 1, 2025, making it a true no-income-tax state."},
  {slug:'new-jersey',name:'New Jersey',abbr:'NJ',cfg:{t:2,b:[[20000,.014],[35000,.0175],[40000,.0245],[75000,.035],[500000,.05525],[1000000,.0637],[9999999,.0897]],d:1000,sdi:.006},top:'8.97%',ttype:'1.4%–8.97%',note:''},
  {slug:'new-mexico',name:'New Mexico',abbr:'NM',cfg:{t:2,b:[[5500,.017],[11000,.032],[16000,.047],[9999999,.049]],d:14600,sdi:0},top:'4.9%',ttype:'1.7%–4.9%',note:''},
  {slug:'new-york',name:'New York',abbr:'NY',cfg:{t:2,b:[[8500,.04],[11700,.045],[13900,.0525],[21400,.055],[80650,.06],[215400,.0685],[1077550,.0965],[5000000,.103],[9999999,.109]],d:8000,sdi:.00511},top:'10.9%',ttype:'4%–10.9%',note:''},
  {slug:'north-carolina',name:'North Carolina',abbr:'NC',cfg:{t:1,r:.0399,d:12750,sdi:0},top:'3.99%',ttype:'3.99% flat',note:''},
  {slug:'north-dakota',name:'North Dakota',abbr:'ND',cfg:{t:2,b:[[44725,.011],[225975,.0204],[9999999,.0227]],d:14600,sdi:0},top:'2.27%',ttype:'1.1%–2.27%',note:''},
  {slug:'ohio',name:'Ohio',abbr:'OH',cfg:{t:2,b:[[26050,0],[100000,.0275],[115300,.035],[9999999,.0399]],d:2400,sdi:0},top:'3.99%',ttype:'0%–3.99%',note:''},
  {slug:'oklahoma',name:'Oklahoma',abbr:'OK',cfg:{t:2,b:[[1000,.0025],[2500,.0075],[3750,.0175],[4900,.0275],[7200,.0375],[9999999,.0475]],d:6350,sdi:0},top:'4.75%',ttype:'0.25%–4.75%',note:''},
  {slug:'oregon',name:'Oregon',abbr:'OR',cfg:{t:2,b:[[4050,.0475],[10200,.0675],[125000,.0875],[9999999,.099]],d:2745,sdi:0},top:'9.9%',ttype:'4.75%–9.9%',note:''},
  {slug:'pennsylvania',name:'Pennsylvania',abbr:'PA',cfg:{t:1,r:.0307,d:0,sdi:0},top:'3.07%',ttype:'3.07% flat',note:''},
  {slug:'rhode-island',name:'Rhode Island',abbr:'RI',cfg:{t:2,b:[[77450,.0375],[176050,.0475],[9999999,.0599]],d:10550,sdi:.011},top:'5.99%',ttype:'3.75%–5.99%',note:''},
  {slug:'south-carolina',name:'South Carolina',abbr:'SC',cfg:{t:2,b:[[3460,0],[17330,.03],[9999999,.064]],d:14600,sdi:0},top:'6.4%',ttype:'0%–6.4%',note:''},
  {slug:'south-dakota',name:'South Dakota',abbr:'SD',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No state income tax',note:'South Dakota has no state income tax and no corporate income tax. The state funds itself through sales and use taxes. It is a popular state for business formation.'},
  {slug:'tennessee',name:'Tennessee',abbr:'TN',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No tax on wages',note:'Tennessee eliminated the Hall Tax (on interest and dividends) in 2021. No wages or salary are taxed at the state level, making Tennessee one of the most paycheck-friendly states.'},
  {slug:'texas',name:'Texas',abbr:'TX',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No state income tax',note:'Texas has no state income tax. The state compensates with above-average property taxes (avg ~1.25% effective rate). Texas workers keep their full state share of every paycheck.'},
  {slug:'utah',name:'Utah',abbr:'UT',cfg:{t:1,r:.0465,d:14600,sdi:0},top:'4.65%',ttype:'4.65% flat',note:''},
  {slug:'vermont',name:'Vermont',abbr:'VT',cfg:{t:2,b:[[45400,.0335],[110050,.066],[229550,.076],[9999999,.0875]],d:6350,sdi:0},top:'8.75%',ttype:'3.35%–8.75%',note:''},
  {slug:'virginia',name:'Virginia',abbr:'VA',cfg:{t:2,b:[[3000,.02],[5000,.03],[17000,.05],[9999999,.0575]],d:8000,sdi:0},top:'5.75%',ttype:'2%–5.75%',note:''},
  {slug:'washington',name:'Washington',abbr:'WA',cfg:{t:0,d:0,sdi:.0074},top:'0%',ttype:'No income tax',note:'Washington has no state income tax. Workers do pay a Paid Family and Medical Leave (PFML) premium (~0.74% of wages). Washington also has a 7% capital gains tax on gains over $250,000.'},
  {slug:'west-virginia',name:'West Virginia',abbr:'WV',cfg:{t:2,b:[[10000,.0236],[25000,.0315],[40000,.0354],[60000,.0472],[9999999,.0512]],d:0,sdi:0},top:'5.12%',ttype:'2.36%–5.12%',note:''},
  {slug:'wisconsin',name:'Wisconsin',abbr:'WI',cfg:{t:2,b:[[14320,.0354],[28640,.0465],[315310,.053],[9999999,.0765]],d:11580,sdi:0},top:'7.65%',ttype:'3.54%–7.65%',note:''},
  {slug:'wyoming',name:'Wyoming',abbr:'WY',cfg:{t:0,d:0,sdi:0},top:'0%',ttype:'No state income tax',note:'Wyoming has no state income tax and no corporate income tax. The state funds public services through mineral extraction severance taxes.'},
];

// ── Shared strings ─────────────────────────────────────────────────────────────
const NAV = `<div class="cmd-overlay" id="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search tools"><div class="cmd-modal"><div class="cmd-search-row"><span class="cmd-search-icon"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></span><input class="cmd-input" id="cmd-input" type="text" placeholder="Search 60+ tools..." autocomplete="off" spellcheck="false"><kbd class="cmd-kbd-esc" onclick="closeCmd()">esc</kbd></div><div class="cmd-body" id="cmd-body"></div><div class="cmd-footer"><span class="cmd-hint"><kbd class="cmd-key">&uarr;&darr;</kbd> navigate</span><span class="cmd-hint"><kbd class="cmd-key">&#x21b5;</kbd> open</span><span class="cmd-hint"><kbd class="cmd-key">esc</kbd> close</span></div></div></div>
<header class="site-header"><div class="container header-inner"><a href="/" class="site-logo">FreePayrollCalc</a>
<nav class="main-nav" aria-label="Main">
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Payroll <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/payroll-tax-calculator" class="nav-item">Payroll Tax</a><a href="/take-home-pay-calculator" class="nav-item">Take-Home Pay</a><a href="/salary-to-hourly-calculator" class="nav-item">Salary to Hourly</a><a href="/net-to-gross-calculator" class="nav-item">Net to Gross</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Tax <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/income-tax-calculator" class="nav-item">Income Tax</a><a href="/self-employment-tax-calculator" class="nav-item">Self-Employment Tax</a><a href="/capital-gains-tax-calculator" class="nav-item">Capital Gains Tax</a><a href="/bonus-tax-calculator" class="nav-item">Bonus Tax</a><a href="/state-payroll-tax-rates" class="nav-item">By State &#x2192;</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Home &amp; RE <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/mortgage-calculator" class="nav-item">Mortgage</a><a href="/mortgage-affordability-calculator" class="nav-item">Affordability</a><a href="/home-equity-loan-calculator" class="nav-item">Home Equity Loan</a><a href="/heloc-calculator" class="nav-item">HELOC</a><a href="/closing-costs-calculator" class="nav-item">Closing Costs</a><a href="/property-tax-calculator" class="nav-item">Property Tax</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Loans <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/car-loan-calculator" class="nav-item">Car Loan</a><a href="/personal-loan-calculator" class="nav-item">Personal Loan</a><a href="/sba-loan-calculator" class="nav-item">SBA Loan</a><a href="/business-loan-calculator" class="nav-item">Business Loan</a></div></div>
<div class="nav-group"><button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Retirement <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg></button><div class="nav-dropdown"><a href="/roth-ira-calculator" class="nav-item">Roth IRA</a><a href="/required-minimum-distribution-calculator" class="nav-item">RMD Calculator</a><a href="/pension-calculator" class="nav-item">Pension</a><a href="/annuity-calculator" class="nav-item">Annuity</a><a href="/compound-interest-calculator" class="nav-item">Compound Interest</a></div></div>
</nav>
<div class="header-actions"><button class="btn-search" id="btn-search" aria-label="Search tools"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg></button><a href="/state-payroll-tax-rates" class="btn-all-tools">By State</a></div>
</div></header>`;

const FTR = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a href="/" class="footer-logo">FreePayrollCalc</a><p class="footer-tagline">Free financial calculators. No sign-up required.</p></div><div><div class="footer-col-title">By State</div><nav class="footer-nav"><a href="/california-payroll-tax-calculator">California</a><a href="/texas-payroll-tax-calculator">Texas</a><a href="/florida-payroll-tax-calculator">Florida</a><a href="/new-york-payroll-tax-calculator">New York</a><a href="/state-payroll-tax-rates">All 50 States →</a></nav></div><div><div class="footer-col-title">Retirement</div><nav class="footer-nav"><a href="/roth-ira-calculator">Roth IRA</a><a href="/pension-calculator">Pension</a><a href="/annuity-calculator">Annuity</a><a href="/required-minimum-distribution-calculator">RMD</a></nav></div><div><div class="footer-col-title">Home</div><nav class="footer-nav"><a href="/mortgage-calculator">Mortgage</a><a href="/closing-costs-calculator">Closing Costs</a><a href="/property-tax-calculator">Property Tax</a><a href="/mortgage-affordability-calculator">Affordability</a></nav></div></div><div class="footer-bottom"><p>&copy; 2026 FreePayrollCalc.com &mdash; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a></p><p class="footer-disclaimer">For informational purposes only. Not financial advice.</p></div></div></footer>`;

const CSS = `.ptable{width:100%;border-collapse:collapse;margin:16px 0;font-size:13px}.ptable th,.ptable td{padding:9px 12px;text-align:right;border-bottom:1px solid var(--border)}.ptable th:first-child,.ptable td:first-child{text-align:left}.ptable th{font-size:11px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.05em;background:var(--surface)}.ptable .net-row td{font-weight:800;font-size:15px;color:var(--accent);background:rgba(27,79,216,.04)}.ptable .total-row td{font-weight:700;color:var(--ink-1)}.ptable .zero-row{color:var(--ink-3)}.ptable td.mono{font-family:'JetBrains Mono',monospace;font-weight:600}.state-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin:24px 0}.state-card{display:block;padding:16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;text-decoration:none;transition:border-color .2s,transform .2s}.state-card:hover{border-color:var(--accent);transform:translateY(-2px)}.sc-name{font-size:14px;font-weight:700;color:var(--ink-1)}.sc-rate{font-size:12px;color:var(--ink-3);margin-top:2px}.sc-badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:700;margin-top:6px}.sc-notax{background:#d1fae5;color:#065f46}.sc-flat{background:#dbeafe;color:#1e40af}.sc-grad{background:#fef3c7;color:#92400e}.result-card{background:linear-gradient(135deg,rgba(27,79,216,.07),rgba(27,79,216,.02));border:2px solid rgba(27,79,216,.2);border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}.result-big{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}.result-label{font-size:13px;font-weight:700;color:var(--ink-2)}.result-sub{font-size:12px;color:var(--ink-3);margin-top:4px}.stat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}@media(max-width:640px){.stat-grid{grid-template-columns:1fr 1fr}}.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}.stat-num{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink-1);line-height:1;margin-bottom:3px}.stat-lbl{font-size:11px;color:var(--ink-3);font-weight:600}`;

function wrap(slug,title,desc,schema,faqSchema,body){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="icon" href="/shared/favicon.svg" type="image/svg+xml"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${DOMAIN}/${slug}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta name="robots" content="index,follow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"><link rel="stylesheet" href="/shared/styles.css?v=6"><script type="application/ld+json">${schema}<\/script>${faqSchema?`<script type="application/ld+json">${faqSchema}<\/script>`:''}<style>${CSS}</style></head><body>${NAV}<main class="calc-page"><div class="container"><nav class="calc-breadcrumb"><a href="/">Home</a><span>&#x203A;</span><a href="/state-payroll-tax-rates">By State</a><span>&#x203A;</span><span aria-current="page">${title.split('|')[0].trim()}</span></nav><div class="ad-zone ad-zone--leaderboard"></div>${body}</div></main>${FTR}<script src="/shared/scripts.js?v=6" defer><\/script></body></html>`;
}

// ── Per-state page builder ─────────────────────────────────────────────────────
function buildStatePage(s) {
  const noTax = s.cfg.t === 0;
  const hasSdi = s.cfg.sdi > 0;
  const stateLabel = noTax ? 'No state income tax' : `${s.ttype} state income tax`;
  const sdiNote = hasSdi ? ` + ${(s.cfg.sdi*100).toFixed(2)}% SDI/PFML` : '';

  const title = noTax
    ? `${s.name} Payroll Tax Calculator 2026 | No State Income Tax`
    : `${s.name} Payroll Tax Calculator 2026 | ${s.ttype} + Federal Withholding`;
  const desc = noTax
    ? `${s.name} has no state income tax. Calculate your exact take-home pay: federal income tax, Social Security (6.2%), and Medicare (1.45%) deductions for 2026.`
    : `Calculate ${s.name} payroll taxes for 2026. See state income tax (${s.ttype}), federal withholding, FICA deductions, and exact take-home pay. Free calculator.`;

  // FAQ answers
  const rateAns = noTax
    ? `${s.name} has no state income tax${s.note ? ' — ' + s.note : '.'}`
    : s.cfg.t === 1
      ? `${s.name} uses a flat income tax rate of ${s.top} on all taxable income for 2026.`
      : `${s.name} uses graduated income tax brackets ranging from ${s.ttype} for 2026. Higher incomes are taxed at higher marginal rates.`;

  const effectiveAns = `For a $65,000/year salary in ${s.name} (single filer, 2026): Federal income tax ~$8,200, ${noTax ? 'state income tax $0' : `${s.name} state tax ~$${Math.round(calcStateTaxNode(65000,s.cfg)).toLocaleString()}`}, Social Security ~$4,030, Medicare ~$943${hasSdi ? `, SDI ~$${Math.round(65000*s.cfg.sdi).toLocaleString()}` : ''}. Take-home: roughly $${Math.round(65000 - 8200 - (noTax?0:calcStateTaxNode(65000,s.cfg)) - 4030 - 943 - (hasSdi?Math.round(65000*s.cfg.sdi):0)).toLocaleString()}/year.`;

  const faqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":`What is the ${s.name} state income tax rate for 2026?`,"acceptedAnswer":{"@type":"Answer","text":rateAns}},
    {"@type":"Question","name":`How much of my paycheck goes to taxes in ${s.name}?`,"acceptedAnswer":{"@type":"Answer","text":effectiveAns}},
    {"@type":"Question","name":"What is Social Security tax in 2026?","acceptedAnswer":{"@type":"Answer","text":"Social Security tax in 2026 is 6.2% of wages up to the $176,100 wage base. Your employer also pays 6.2%. Once you hit the wage base, no additional Social Security is withheld for the rest of the year."}},
    {"@type":"Question","name":"What is FICA and what does it pay for?","acceptedAnswer":{"@type":"Answer","text":"FICA (Federal Insurance Contributions Act) covers Social Security (6.2%) and Medicare (1.45%), totaling 7.65% of your wages. Social Security funds retirement and disability benefits. Medicare funds healthcare for people 65+. Your employer matches the full 7.65%."}}
  ]});

  const schema = JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":`${s.name} Payroll Tax Calculator 2026`,"url":`${DOMAIN}/${s.slug}-payroll-tax-calculator`,"description":desc,"applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}});

  // Article section
  const rateInfo = noTax
    ? `<p>${s.note || `${s.name} has no state income tax, meaning workers pay $0 in state income tax on wages.`} Even without state income tax, federal deductions still apply to every paycheck.</p>`
    : s.cfg.t === 1
      ? `<p>${s.name} uses a <strong>flat income tax rate of ${s.top}</strong> on all taxable income above the state standard deduction ($${(s.cfg.d||0).toLocaleString()}). Every dollar of taxable income is taxed at the same rate, regardless of how much you earn.</p>`
      : `<p>${s.name} uses a <strong>graduated (progressive) income tax</strong> with rates from ${s.ttype}. Higher income brackets are taxed at higher marginal rates. Your effective rate will be lower than the top rate since only income above each threshold is taxed at that rate.</p>`;

  const article = `<div class="calc-article">
<h2>${s.name} Income Tax Rates 2026</h2>
${rateInfo}
<h3>All Payroll Deductions in ${s.name}</h3>
<ul>
<li><strong>Federal income tax:</strong> 10%–37% (2026 brackets, based on taxable income after $15,000 standard deduction for single filers)</li>
<li><strong>${s.name} state income tax:</strong> ${noTax ? 'None ($0)' : s.ttype}</li>
<li><strong>Social Security:</strong> 6.2% on wages up to $176,100</li>
<li><strong>Medicare:</strong> 1.45% on all wages (+ 0.9% on wages over $200,000)</li>
${hasSdi ? `<li><strong>SDI / PFML:</strong> ${(s.cfg.sdi*100).toFixed(2)}% employee contribution</li>` : ''}
</ul>
${noTax ? `<h3>Why ${s.name} Workers Take Home More</h3><p>Residents of ${s.name} save a significant amount each year compared to high-tax states. On a $75,000 salary, a California resident pays ~$6,400 in state income tax while a ${s.name} resident pays $0 — a difference of over $500/month in take-home pay.</p>` : `<h3>${s.name} vs Federal Tax: What's Different</h3><p>Your ${s.name} state tax is calculated on state taxable income (gross minus ${s.name}'s standard deduction of $${(s.cfg.d||0).toLocaleString()}). Federal tax uses a $15,000 standard deduction (single, 2026). The rates and brackets are independent — state tax is not a deduction from federal tax.</p>`}
<h3>About This Calculator</h3>
<p>This calculator uses 2026 federal and ${s.name} state tax rates. Results are estimates — actual withholding may differ based on W-4 elections, itemized deductions, tax credits, and local/county taxes not included here. Always verify with your payroll provider or a tax professional.</p>
</div>`;

  // Calculator JS (embedded)
  const calcJs = `var S=${JSON.stringify(s.cfg)};
var FS=[[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[9999999,.37]];
var FM=[[23850,.10],[96950,.12],[206700,.22],[394600,.24],[501050,.32],[751600,.35],[9999999,.37]];
function grad(ti,b){var t=0,p=0;for(var i=0;i<b.length;i++){if(ti<=p)break;t+=(Math.min(ti,b[i][0])-p)*b[i][1];p=b[i][0];}return t;}
function fedTax(g,mfj){var std=mfj?30000:15000,pt=parseFloat(document.getElementById('st-pretax').value)||0;return grad(Math.max(0,g-pt-std),mfj?FM:FS);}
function stTax(g){var pt=parseFloat(document.getElementById('st-pretax').value)||0,ti=Math.max(0,g-pt);if(S.t===0)return 0;if(S.t===1)return Math.max(0,ti-S.d)*S.r;return grad(Math.max(0,ti-S.d),S.b);}
function fmt(n){return'$'+Math.round(n).toLocaleString();}
function calcAll(){
  var sal=parseFloat(document.getElementById('st-sal').value)||60000;
  var per=document.getElementById('st-per').value;
  var mfj=document.getElementById('st-status').value==='m';
  var pp={'w':52,'b':26,'s':24,'m':12,'a':1}[per]||26;
  var gross=sal*pp;
  var ft=fedTax(gross,mfj),st=stTax(gross);
  var ss=Math.min(gross,176100)*.062,med=gross*.0145+Math.max(0,gross-200000)*.009;
  var sdi=gross*S.sdi;
  var total=ft+st+ss+med+sdi,net=gross-total;
  var eff=(gross>0?(total/gross*100):0).toFixed(1);
  function set(id,v){var el=document.getElementById(id);if(el)el.textContent=v;}
  set('r-net-pp',fmt(net/pp)); set('r-net-ann',fmt(net)); set('r-eff',eff+'%');
  set('r-gross-pp',fmt(sal)); set('r-gross-ann',fmt(gross));
  set('r-fed-pp',fmt(ft/pp)); set('r-fed-ann',fmt(ft));
  set('r-state-pp',fmt(st/pp)); set('r-state-ann',fmt(st));
  set('r-ss-pp',fmt(ss/pp)); set('r-ss-ann',fmt(ss));
  set('r-med-pp',fmt(med/pp)); set('r-med-ann',fmt(med));
  var sdiRow=document.getElementById('r-sdi-row');
  if(sdiRow){sdiRow.style.display=S.sdi>0?'':'none';set('r-sdi-pp',fmt(sdi/pp));set('r-sdi-ann',fmt(sdi));}
  set('r-total-pp',fmt(total/pp)); set('r-total-ann',fmt(total));
}
document.addEventListener('DOMContentLoaded',calcAll);
['st-sal','st-pretax'].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener('input',calcAll);});
['st-per','st-status'].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener('change',calcAll);});`;

  const stateLabel2 = noTax ? 'No State Tax' : `${s.name} State Tax`;

  const body = `<h1 class="calc-title" data-enter>${s.name} Payroll Tax Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026</span></h1>
<p class="calc-sub" data-enter data-delay="1">Calculate your exact ${s.name} take-home pay. ${noTax ? `${s.name} has <strong>no state income tax</strong> — ` : `State income tax: <strong>${s.ttype}</strong>. `}Includes federal taxes and FICA${sdiNote}.</p>
<div class="calc-layout"><div class="calc-inputs">
<div class="input-group"><label class="input-label" for="st-sal">Annual Salary (per paycheck × pay periods)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="st-sal" class="calc-input" value="60000" min="1000" step="1000"></div></div>
<div class="input-group"><label class="input-label" for="st-per">Pay Frequency</label><select id="st-per" class="calc-select"><option value="w">Weekly (52×/yr)</option><option value="b" selected>Bi-Weekly (26×/yr)</option><option value="s">Semi-Monthly (24×/yr)</option><option value="m">Monthly (12×/yr)</option><option value="a">Annual (lump sum)</option></select></div>
<div class="input-group"><label class="input-label" for="st-status">Filing Status</label><select id="st-status" class="calc-select"><option value="s" selected>Single</option><option value="m">Married Filing Jointly</option></select></div>
<div class="input-group"><label class="input-label" for="st-pretax">Annual Pre-Tax Deductions (401k, HSA, etc.)</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" id="st-pretax" class="calc-input" value="0" min="0" step="500"></div></div>
<button class="calc-btn" onclick="calcAll()">Calculate</button>
</div><div class="calc-results">
<div class="result-card"><div class="result-big" id="r-net-pp">—</div><div class="result-label">Net Take-Home Per Paycheck</div><div class="result-sub" id="r-eff">Loading...</div></div>
<div class="calc-card"><table class="ptable"><thead><tr><th>Deduction</th><th>Per Paycheck</th><th>Annual</th></tr></thead><tbody>
<tr><td>Gross Pay</td><td class="mono" id="r-gross-pp">—</td><td class="mono" id="r-gross-ann">—</td></tr>
<tr><td>Federal Income Tax</td><td class="mono" id="r-fed-pp">—</td><td class="mono" id="r-fed-ann">—</td></tr>
<tr${noTax?' class="zero-row"':''}><td>${stateLabel2}</td><td class="mono" id="r-state-pp">${noTax?'$0':'—'}</td><td class="mono" id="r-state-ann">${noTax?'$0':'—'}</td></tr>
<tr><td>Social Security (6.2%)</td><td class="mono" id="r-ss-pp">—</td><td class="mono" id="r-ss-ann">—</td></tr>
<tr><td>Medicare (1.45%)</td><td class="mono" id="r-med-pp">—</td><td class="mono" id="r-med-ann">—</td></tr>
<tr id="r-sdi-row" style="display:none"><td>SDI / PFML</td><td class="mono" id="r-sdi-pp">—</td><td class="mono" id="r-sdi-ann">—</td></tr>
<tr class="total-row"><td>Total Deductions</td><td class="mono" id="r-total-pp">—</td><td class="mono" id="r-total-ann">—</td></tr>
<tr class="net-row"><td><strong>Net Take-Home</strong></td><td class="mono" id="r-net-pp2">—</td><td class="mono" id="r-net-ann">—</td></tr>
</tbody></table></div>
</div></div>
${article}
<script>${calcJs.replace(/(set\('r-net-pp',fmt\(net\/pp\))/,'set(\'r-net-pp\',fmt(net/pp));set(\'r-net-pp2\',fmt(net/pp))')}<\/script>`;

  return wrap(`${s.slug}-payroll-tax-calculator`, title, desc, schema, faqSchema, body);
}

// ── Node-side tax calc (for FAQ answer generation) ─────────────────────────────
function calcStateTaxNode(gross, cfg) {
  function grad(ti,b){var t=0,p=0;for(var i=0;i<b.length;i++){if(ti<=p)break;t+=(Math.min(ti,b[i][0])-p)*b[i][1];p=b[i][0];}return t;}
  if(cfg.t===0) return 0;
  var ti=Math.max(0,gross-cfg.d);
  if(cfg.t===1) return ti*cfg.r;
  return grad(ti,cfg.b);
}

// ── State hub page ─────────────────────────────────────────────────────────────
function buildHubPage() {
  const cards = STATES.map(s => {
    const badgeClass = s.cfg.t===0?'sc-notax':s.cfg.t===1?'sc-flat':'sc-grad';
    const badgeText = s.cfg.t===0?'No Tax':s.cfg.t===1?'Flat Rate':'Graduated';
    return `<a href="/${s.slug}-payroll-tax-calculator" class="state-card">
<div class="sc-name">${s.name} (${s.abbr})</div>
<div class="sc-rate">${s.ttype}</div>
<span class="sc-badge ${badgeClass}">${badgeText}</span>
</a>`;
  }).join('');

  const noTaxList = STATES.filter(s=>s.cfg.t===0).map(s=>`<li><a href="/${s.slug}-payroll-tax-calculator">${s.name}</a> — No state income tax</li>`).join('');
  const topTaxList = [...STATES].filter(s=>s.cfg.t>0).sort((a,b)=>parseFloat(b.top)-parseFloat(a.top)).slice(0,5).map(s=>`<li><a href="/${s.slug}-payroll-tax-calculator">${s.name}</a> — Top rate ${s.top}</li>`).join('');

  const body = `<h1 class="calc-title" data-enter>State Payroll Tax Calculator <span style="color:var(--ink-3);font-weight:400;font-size:.65em">2026 — All 50 States</span></h1>
<p class="calc-sub" data-enter data-delay="1">Select your state to calculate exact take-home pay with state income tax, federal withholding, and FICA deductions. Updated for 2026 tax rates.</p>
<div class="state-grid">${cards}</div>
<div class="calc-article">
<h2>States With No Income Tax (2026)</h2>
<ul>${noTaxList}</ul>
<h2>Highest State Income Tax Rates</h2>
<ul>${topTaxList}</ul>
<h2>How State Payroll Taxes Work</h2>
<p>Every paycheck is subject to <strong>federal income tax</strong> (10%–37%), <strong>Social Security</strong> (6.2% up to $176,100), and <strong>Medicare</strong> (1.45%). On top of those, most states add their own income tax ranging from 0% to 13.3% (California). Nine states collect no income tax at all.</p>
<p>Your state tax is calculated independently from federal tax. Each uses its own brackets, standard deductions, and exemptions. Select your state above for a precise breakdown.</p>
</div>`;

  const schema = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"State Payroll Tax Calculator 2026 — All 50 States","url":`${DOMAIN}/state-payroll-tax-rates`,"description":"Compare state income tax rates and calculate take-home pay for all 50 states. Updated 2026 rates."});
  const faq = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which states have no income tax?","acceptedAnswer":{"@type":"Answer","text":"Nine states have no state income tax on wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire eliminated its tax on interest and dividends in 2025, making it a full no-income-tax state."}},{"@type":"Question","name":"Which state has the highest income tax?","acceptedAnswer":{"@type":"Answer","text":"California has the highest top marginal income tax rate at 13.3% (for incomes over $1 million). For most incomes, New Jersey (10.75%), Oregon (9.9%), Minnesota (9.85%), and New York (10.9%) also rank among the highest."}},{"@type":"Question","name":"How much is taken out of a paycheck in each state?","acceptedAnswer":{"@type":"Answer","text":"On a $60,000 salary, a Texas or Florida worker (no state tax) takes home about $47,200/year after federal taxes and FICA. The same salary in California results in about $44,800 take-home after state income tax. State taxes can reduce take-home pay by $1,000–$5,000+ per year depending on the state and income level."}},{"@type":"Question","name":"Are local taxes included in these calculators?","acceptedAnswer":{"@type":"Answer","text":"These calculators include state income tax and federal taxes only. Some cities and counties add their own income taxes on top — notably New York City, Philadelphia, Columbus, and Cincinnati. Check your local jurisdiction for any additional city or county taxes."}}]});

  return wrap('state-payroll-tax-rates','State Payroll Tax Calculator 2026 | All 50 States','Compare payroll taxes and take-home pay for all 50 states. See state income tax rates, federal withholding, and FICA for 2026.',schema,faq,body);
}

// ── Generate all files ─────────────────────────────────────────────────────────
console.log('Building 50 state payroll tax calculators + hub...\n');
STATES.forEach(s => {
  const html = buildStatePage(s);
  fs.writeFileSync(B + s.slug + '-payroll-tax-calculator.html', html);
  console.log('  ✓ ' + s.slug + '-payroll-tax-calculator.html — ' + (html.length/1024).toFixed(0) + 'KB');
});
const hub = buildHubPage();
fs.writeFileSync(B + 'state-payroll-tax-rates.html', hub);
console.log('  ✓ state-payroll-tax-rates.html (hub)');
console.log('\n✅ Done — ' + (STATES.length + 1) + ' pages written');
