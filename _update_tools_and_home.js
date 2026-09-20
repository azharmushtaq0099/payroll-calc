/**
 * 1. Adds Mortgage, Loans, Retirement, State categories to tools.html
 * 2. Updates all "50+" counts to "140+"
 * 3. Upgrades homepage hero stats and featured section
 * Run: node _update_tools_and_home.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';

const iconBank = {
  home: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  dollar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  trend: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  map: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  calc: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`,
  piggy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 6.37A9 9 0 1 0 21 12h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1A9 9 0 0 0 19 6.37z"/><path d="M12 8v4l3 3"/></svg>`,
};

function row(href, color, iconKey, name, desc) {
  return `\n          <a href="${href}" class="tool-row" data-enter>\n            <div class="tool-row-icon tc-${color}">${iconBank[iconKey]||iconBank.calc}</div>\n            <div class="tool-row-body"><div class="tool-row-name">${name}</div><div class="tool-row-desc">${desc}</div></div>\n          </a>`;
}

// ── New category blocks ──────────────────────────────────────────────────────
const mortgageBlock = `
      <!-- MORTGAGE & REAL ESTATE -->
      <div class="tool-list-section" id="cat-mortgage" data-cat="mortgage">
        <div class="tool-list-header">
          <span class="tool-list-cat-label">Mortgage &amp; Real Estate</span>
          <span class="tool-list-count">10 tools</span>
        </div>
        <div class="tool-list">${
  row('/mortgage-calculator','blue','home','Mortgage Calculator','Monthly payment, total interest, and full amortization table for any home loan.')+
  row('/mortgage-affordability-calculator','blue','home','Mortgage Affordability Calculator','Max home price based on income, debts, and down payment using 28/36 DTI rules.')+
  row('/adjustable-rate-mortgage-calculator','amber','home','ARM Calculator','5/1, 7/1 ARM payments with cap structure and worst-case scenario vs fixed rate.')+
  row('/home-equity-loan-calculator','green','home','Home Equity Loan Calculator','Fixed-rate lump sum loan payments and total cost based on your equity.')+
  row('/heloc-calculator','green','home','HELOC Calculator','Home equity line of credit payments during draw and repayment periods.')+
  row('/closing-costs-calculator','amber','home','Closing Costs Calculator','Estimated closing costs broken down by lender, title, and government fees.')+
  row('/property-tax-calculator','amber','home','Property Tax Calculator','Annual and monthly property tax estimate using all 50 state rates.')+
  row('/refinance-calculator','blue','home','Refinance Calculator','New payment, interest saved, and break-even months for any refinance.')+
  row('/reverse-mortgage-calculator','amber','home','Reverse Mortgage Calculator','Monthly payout estimate for HECM reverse mortgage based on age and home value.')+
  row('/cap-rate-calculator','green','trend','Cap Rate Calculator','Capitalization rate and NOI for rental property investment analysis.')
        }</div>
      </div>`;

const loansBlock = `
      <!-- LOANS -->
      <div class="tool-list-section" id="cat-loans" data-cat="loans">
        <div class="tool-list-header">
          <span class="tool-list-cat-label">Loans &amp; Debt</span>
          <span class="tool-list-count">8 tools</span>
        </div>
        <div class="tool-list">${
  row('/student-loan-repayment-calculator','blue','dollar','Student Loan Repayment Calculator','Compare Standard, IBR, SAVE, PAYE plans side-by-side. 40K+ monthly searches.')+
  row('/debt-consolidation-calculator','amber','dollar','Debt Consolidation Calculator','Enter up to 5 debts and see if consolidating saves you money and time.')+
  row('/auto-refinance-calculator','blue','dollar','Auto Refinance Calculator','Monthly savings, total interest saved, and break-even months for car loan refi.')+
  row('/car-loan-calculator','blue','dollar','Car Loan Calculator','Monthly payment, total interest, and amortization for any auto loan.')+
  row('/personal-loan-calculator','blue','dollar','Personal Loan Calculator','Monthly payment and total cost for any personal loan amount and rate.')+
  row('/debt-payoff-calculator','amber','dollar','Debt Payoff Calculator','Months to pay off any debt and total interest using avalanche or snowball method.')+
  row('/sba-loan-calculator','green','dollar','SBA Loan Calculator','Monthly payments and total cost for SBA 7(a) and 504 loans.')+
  row('/business-loan-calculator','green','dollar','Business Loan Calculator','Business loan payment schedule with principal/interest breakdown.')
        }</div>
      </div>`;

const retirementBlock = `
      <!-- RETIREMENT & SAVINGS -->
      <div class="tool-list-section" id="cat-retirement" data-cat="retirement">
        <div class="tool-list-header">
          <span class="tool-list-cat-label">Retirement &amp; Savings</span>
          <span class="tool-list-count">15 tools</span>
        </div>
        <div class="tool-list">${
  row('/social-security-benefits-calculator','blue','shield','Social Security Benefits Calculator','Monthly SS benefit at any claiming age (62–70) using 2026 PIA bend-point formula.')+
  row('/how-long-will-my-money-last-calculator','amber','piggy','How Long Will My Money Last?','Retirement drawdown: see exactly when your savings run out given withdrawals and returns.')+
  row('/retirement-calculator','blue','trend','Retirement Calculator','Projected nest egg by retirement age with contribution and growth modeling.')+
  row('/roth-ira-calculator','green','piggy','Roth IRA Calculator','Tax-free growth projection with contribution limits and compound returns.')+
  row('/roth-ira-conversion-calculator','green','piggy','Roth IRA Conversion Calculator','Tax cost of converting Traditional IRA plus long-term Roth vs Traditional comparison.')+
  row('/ira-rollover-calculator','amber','piggy','IRA Rollover Calculator','Tax and penalty impact of direct vs indirect rollovers including 20% withholding trap.')+
  row('/required-minimum-distribution-calculator','amber','calc','RMD Calculator','Required minimum distribution from IRA/401k based on account balance and life expectancy.')+
  row('/pension-calculator','blue','shield','Pension Calculator','Annual pension benefit using years of service, salary, and multiplier.')+
  row('/annuity-calculator','blue','dollar','Annuity Calculator','Monthly income from lump sum or lump sum needed for target income.')+
  row('/compound-interest-calculator','green','trend','Compound Interest Calculator','Future value of any investment with compound growth and regular contributions.')+
  row('/savings-goal-calculator','green','piggy','Savings Goal Calculator','Monthly savings needed to hit any goal, or time to reach a goal at fixed contributions.')+
  row('/savings-calculator','green','piggy','Savings Calculator','Simple savings growth over time with interest compounding.')+
  row('/rate-of-return-calculator','blue','trend','Rate of Return (CAGR) Calculator','Annualized return from any starting and ending investment value over any period.')+
  row('/529-college-savings-calculator','amber','piggy','529 College Savings Calculator','Monthly contribution needed to cover college costs with tuition inflation.')+
  row('/life-insurance-calculator','amber','shield','Life Insurance Calculator','Coverage needed using DIME method (debt, income, mortgage, education).')
        }</div>
      </div>`;

const statesBlock = `
      <!-- BY STATE -->
      <div class="tool-list-section" id="cat-states" data-cat="states">
        <div class="tool-list-header">
          <span class="tool-list-cat-label">Payroll Tax by State</span>
          <span class="tool-list-count">51 calculators</span>
        </div>
        <div class="tool-list">
          <a href="/state-payroll-tax-rates" class="tool-row" data-enter>
            <div class="tool-row-icon tc-blue">${iconBank.map}</div>
            <div class="tool-row-body"><div class="tool-row-name">All 50 States — Tax Rate Hub</div><div class="tool-row-desc">Compare payroll tax rates across all US states. No-tax states, flat-rate states, and graduated brackets.</div></div>
          </a>
${['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'].map(s=>{
  const slug = s.toLowerCase().replace(/ /g,'-')+'-payroll-tax-calculator';
  return `          <a href="/${slug}" class="tool-row" data-enter>\n            <div class="tool-row-icon tc-amber">${iconBank.map}</div>\n            <div class="tool-row-body"><div class="tool-row-name">${s} Payroll Tax Calculator</div><div class="tool-row-desc">${s} state income tax, FICA, and take-home pay for any salary.</div></div>\n          </a>`;
}).join('\n')}
        </div>
      </div>`;

// ── Sidebar additions ──
const newSidebarItems = `          <a href="#cat-mortgage" class="sidebar-item" data-filter="mortgage" role="listitem">
            Mortgage &amp; RE
            <span class="sidebar-item-count">10</span>
          </a>
          <a href="#cat-loans" class="sidebar-item" data-filter="loans" role="listitem">
            Loans &amp; Debt
            <span class="sidebar-item-count">8</span>
          </a>
          <a href="#cat-retirement" class="sidebar-item" data-filter="retirement" role="listitem">
            Retirement
            <span class="sidebar-item-count">15</span>
          </a>
          <a href="#cat-states" class="sidebar-item" data-filter="states" role="listitem">
            By State
            <span class="sidebar-item-count">51</span>
          </a>`;

// ── Apply to tools.html ──────────────────────────────────────────────────────
let tools = fs.readFileSync(B+'tools.html','utf8');

// Update counts
tools = tools.replace(/50\+/g, '140+').replace(/41<\/span>/,'140+</span>');

// Add sidebar items before </nav>
tools = tools.replace(
  `          <a href="#cat-business" class="sidebar-item" data-filter="business" role="listitem">
            Business
            <span class="sidebar-item-count">12</span>
          </a>
        </nav>`,
  `          <a href="#cat-business" class="sidebar-item" data-filter="business" role="listitem">
            Business
            <span class="sidebar-item-count">12</span>
          </a>
${newSidebarItems}
        </nav>`
);

// Add new category blocks after the business block closing </div></div>
// Find the end of business section: </div>\n      </div>\n\n      <!-- MAIN TOOL LIST -->
// Actually insert before </main>
const insertPoint = '    </main>';
tools = tools.replace(insertPoint, mortgageBlock + loansBlock + retirementBlock + statesBlock + '\n    </main>');

fs.writeFileSync(B+'tools.html', tools);
console.log('tools.html updated');

// ── Apply to homepage (index.html) ───────────────────────────────────────────
let home = fs.readFileSync(B+'index.html','utf8');

// Update stat numbers in the hero
home = home
  .replace(/Search 50\+ tools/g,'Search 140+ tools')
  .replace(/View all 50\+ tools/g,'View all 140+ tools')
  .replace(/All 50\+ Tools/g,'All 140+ Tools')
  .replace(/>50\+</g,'>140+<')
  .replace(/50\+ free/g,'140+ free')
  .replace(/50\+ tools/g,'140+ tools')
  .replace(/placeholder="Search 50\+ tools/g,'placeholder="Search 140+ tools');

// Add a "Top Calculators" featured strip after the first <main> opening
// Find the ad zone div and add a featured section after it
const featuredStrip = `
<section style="margin:32px 0 40px">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);margin-bottom:16px">Most Popular This Month</div>
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px" id="featured-grid">
    <a href="/social-security-benefits-calculator" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;text-decoration:none;transition:border-color .15s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(27,79,216,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--accent)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
      <div><div style="font-size:13px;font-weight:600;color:var(--ink-1)">Social Security Benefits</div><div style="font-size:11px;color:var(--ink-3)">60,500 searches/mo</div></div>
    </a>
    <a href="/student-loan-repayment-calculator" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;text-decoration:none;transition:border-color .15s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(22,163,74,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#16a34a"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
      <div><div style="font-size:13px;font-weight:600;color:var(--ink-1)">Student Loan Repayment</div><div style="font-size:11px;color:var(--ink-3)">40,500 searches/mo</div></div>
    </a>
    <a href="/debt-consolidation-calculator" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;text-decoration:none;transition:border-color .15s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(245,158,11,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#d97706"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
      <div><div style="font-size:13px;font-weight:600;color:var(--ink-1)">Debt Consolidation</div><div style="font-size:11px;color:var(--ink-3)">$13.98 avg CPC</div></div>
    </a>
    <a href="/how-long-will-my-money-last-calculator" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;text-decoration:none;transition:border-color .15s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(27,79,216,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--accent)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
      <div><div style="font-size:13px;font-weight:600;color:var(--ink-1)">How Long Will Money Last</div><div style="font-size:11px;color:var(--ink-3)">18,100 searches/mo</div></div>
    </a>
  </div>
  <style>@media(min-width:640px){#featured-grid{grid-template-columns:repeat(4,1fr)}}</style>
</section>`;

// Insert after the leaderboard ad zone
home = home.replace(
  '<div class="ad-zone ad-zone--leaderboard"></div>',
  '<div class="ad-zone ad-zone--leaderboard"></div>' + featuredStrip
);

fs.writeFileSync(B+'index.html', home);
console.log('index.html updated');
console.log('\nAll done.');
