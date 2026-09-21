/**
 * GEO / AEO upgrade script
 * Adds: quick-answer boxes, Speakable schema, HowTo schema
 * Targets all calculator pages for AI engine citation readiness
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/mastr/claude co/payroll-calc';

// ── Quick answer data keyed by slug ───────────────────────────────────────────
const QA = {
  'payroll-tax-calculator': 'Payroll taxes in 2026 consist of 6.2% Social Security (on wages up to $176,100), 1.45% Medicare, plus federal income tax withheld per IRS Publication 15-T based on your W-4 filing status and allowances. Both the employee and employer each pay the 7.65% FICA share.',
  'free-payroll-calculator': 'To calculate payroll, multiply gross wages by the employee\'s hours, subtract pre-tax deductions (401k, HSA), then apply FICA (7.65% employee share) and federal income tax withholding from IRS Publication 15-T tables. State income tax is withheld separately using each state\'s withholding tables.',
  'employer-tax-calculator': 'Employers pay 7.65% FICA (6.2% Social Security + 1.45% Medicare) on all employee wages, 0.6% FUTA federal unemployment on the first $7,000 per employee annually (after the state credit), and a state SUTA rate that varies by state and your unemployment experience rating.',
  'net-to-gross-calculator': 'To gross up net pay, divide the desired take-home amount by (1 − combined tax rate). For $3,000 net with a 30% total tax rate, the required gross is $3,000 ÷ 0.70 = $4,286. Gross-up is used when employers want to fully cover an employee\'s tax burden on a bonus or relocation payment.',
  '1099-vs-w2-calculator': '1099 contractors pay both halves of FICA (15.3% self-employment tax) while W-2 employees only pay 7.65% — the employer covers the other half. However, contractors can deduct half of SE tax and legitimate business expenses. At the same gross pay, W-2 workers typically net more after tax.',
  'workers-comp-calculator': 'Workers\' compensation premiums equal your payroll × classification rate (per $100 of payroll) × experience modification factor (EMR). Office workers average $0.35–$0.75 per $100 payroll; construction workers can exceed $15/$100. EMR below 1.0 earns discounts; above 1.0 means surcharges.',
  'take-home-pay-calculator': 'Take-home pay is gross salary minus federal income tax (using 2026 IRS brackets), FICA taxes (7.65%), state income tax, and pre-tax deductions like 401(k) and health insurance. A $75,000 salary in Texas yields approximately $55,000–$58,000 annually; the same salary in California yields $49,000–$52,000.',
  'income-tax-calculator': '2026 federal income tax brackets range from 10% (income up to $11,925 for single filers) to 37% (income over $626,350). These are marginal rates — each bracket only applies to income within that range. A single filer earning $85,000 pays roughly $14,775 in federal income tax (17.4% effective rate).',
  'tax-refund-estimator': 'Your federal tax refund equals total withholding minus actual tax liability. The average 2025 refund was $3,170. To reduce a large refund (interest-free loan to the IRS), increase your W-4 allowances; to reduce a bill, claim fewer allowances or make additional withholding elections on line 4c.',
  'bonus-tax-calculator': 'The IRS requires 22% flat-rate withholding on supplemental wages (bonuses, commissions) under $1 million, and 37% above that threshold. Employers can alternatively use the aggregate method, which adds the bonus to regular pay and withholds at your marginal rate — often resulting in higher withholding.',
  '1099-tax-calculator': '1099 workers owe 15.3% self-employment tax on net earnings (12.4% Social Security up to $176,100 + 2.9% Medicare), plus regular federal income tax. You can deduct 50% of SE tax from adjusted gross income. Quarterly estimated payments are due April 15, June 15, September 15, and January 15.',
  'self-employment-tax-calculator': 'Self-employment tax is 15.3% on the first $176,100 of 2026 net SE income, then 2.9% above that (plus 0.9% additional Medicare for income over $200,000 single/$250,000 joint). The IRS allows you to deduct 50% of your total SE tax when calculating adjusted gross income — reducing your income tax bill.',
  'quarterly-tax-calculator': 'To avoid underpayment penalties, pay the lesser of 90% of current-year tax or 100% of last year\'s tax (110% if prior AGI exceeded $150,000). 2026 estimated payment due dates: April 15 (Q1+Q2), June 16 (Q2), September 15 (Q3), January 15, 2027 (Q4). Underpayments incur ~8% annualized interest.',
  'effective-tax-rate-calculator': 'Effective tax rate = total federal income tax ÷ total taxable income. A single filer with $80,000 taxable income in 2026 pays $13,693 in federal tax — a 17.1% effective rate, even though they fall in the 22% marginal bracket. Effective rate is always lower than your highest bracket.',
  'capital-gains-tax-calculator': 'Long-term capital gains (assets held 12+ months) are taxed at 0%, 15%, or 20% in 2026 — the 0% rate applies to single filers with taxable income up to $47,025. Short-term gains are taxed as ordinary income. Selling in a year with lower income can significantly reduce capital gains tax.',
  'estate-tax-calculator': 'The 2026 federal estate tax exemption is $13.99 million per person ($27.98M for married couples with portability election). Only amounts above the exemption are taxed, at rates from 18% to 40%. Note: the exemption is scheduled to drop to approximately $7M in 2026 absent new legislation — plan accordingly.',
  'mortgage-calculator': 'Monthly mortgage payment = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P = principal, r = monthly rate, n = total payments. On a $400,000 loan at 6.8% APR for 30 years, the payment is $2,612/month. Total interest paid over 30 years is $540,320 — more than the original loan amount.',
  'refinance-calculator': 'Refinancing break-even = closing costs ÷ monthly savings. If you save $200/month and closing costs are $4,000, break-even is 20 months. Refinancing makes sense if you plan to stay in the home beyond that point. A 0.75% rate reduction on a $350,000 balance saves roughly $150/month.',
  'mortgage-affordability-calculator': 'Lenders use the 28/36 rule: housing costs should not exceed 28% of gross monthly income, and total debt payments should not exceed 36% (DTI ratio). With $8,000 gross monthly income, maximum housing payment is $2,240 and total debts $2,880. FHA loans allow up to 43% DTI with compensating factors.',
  'property-tax-calculator': 'Property taxes are calculated as assessed value × local mill rate. The US average is 1.07% of assessed value — on a $350,000 home, that\'s $3,745/year ($312/month). Rates range from 0.27% in Hawaii to 2.46% in New Jersey. Assessed value may differ from market value based on local assessment ratios.',
  'retirement-calculator': 'The 4% safe withdrawal rule says you can withdraw 4% of your portfolio annually in retirement with a high probability of funds lasting 30+ years. To retire on $60,000/year, you need $1.5 million (60,000 ÷ 0.04). Saving $1,500/month from age 30 at 7% average return reaches $1.8M by age 65.',
  'roth-ira-calculator': '2026 Roth IRA contribution limits are $7,000 ($8,000 if age 50+). Income phase-outs begin at $150,000 for single filers and $236,000 for married filing jointly. Roth contributions are after-tax, but all growth and qualified withdrawals (age 59½ + 5-year rule) are permanently tax-free — including on earnings.',
  'compound-interest-calculator': 'Compound interest formula: A = P(1 + r/n)^(nt). $10,000 invested at 7% annually for 30 years grows to $76,123 — $66,123 in interest on a $10,000 principal. Compounding frequency matters: daily vs annual compounding at 5% APR results in 5.13% vs 5.00% effective annual yield.',
  'required-minimum-distribution-calculator': 'RMDs from traditional IRAs and 401(k)s are required starting at age 73 (per SECURE 2.0 Act). Your annual RMD = December 31 account balance ÷ IRS Uniform Lifetime Table factor for your age. A 73-year-old with a $500,000 IRA divides by 26.5 for a $18,868 minimum distribution. Failure to take RMDs triggers a 25% excise tax.',
  'savings-calculator': 'Savings future value = PV × (1+r)^n + PMT × [(1+r)^n − 1] ÷ r. Saving $500/month at 4.75% APY for 10 years yields $75,900 total ($15,900 interest on $60,000 contributed). High-yield savings accounts in 2026 average 4.5%–5.25% APY — significantly more than the 0.5% national average at traditional banks.',
  'profit-margin-calculator': 'Gross profit margin = (Revenue − COGS) ÷ Revenue × 100. Net profit margin = Net Income ÷ Revenue × 100. A 20%+ net margin is strong for most businesses; SaaS companies target 20–30%, retail averages 2–5%, and restaurants 3–5%. Operating margin (EBIT ÷ Revenue) excludes financing costs for apples-to-apples comparison.',
  'roi-calculator': 'ROI = (Net Profit ÷ Cost of Investment) × 100. A $5,000 ad campaign generating $15,000 revenue with $7,000 in costs yields ROI of ($8,000 ÷ $5,000) × 100 = 160%. Annualized ROI accounts for time: a 50% return over 2 years = 22.5% annualized (using compound growth formula). Always include all direct and indirect costs.',
  'break-even-calculator': 'Break-even (units) = Fixed Costs ÷ (Unit Price − Variable Cost per Unit). A product with $20,000 fixed costs, $50 price, and $20 variable cost breaks even at 667 units ($33,333 revenue). Contribution margin = Price − Variable Cost = $30/unit. Revenue break-even = Fixed Costs ÷ Contribution Margin %.',
  'burn-rate-calculator': 'Net burn rate = monthly expenses − monthly revenue. A startup with $500,000 cash, $60,000 expenses, and $15,000 revenue burns $45,000/month — giving 11.1 months of runway. Investors generally require 18–24 months of runway post-funding. Gross burn measures total cash out before revenue offsets.',
  'car-loan-calculator': 'Car loan monthly payments use the standard amortization formula. A $35,000 auto loan at 6.5% for 60 months costs $684/month and $6,040 in total interest. The average new car loan rate in 2026 is 7.1% for 60-month terms. Putting 20% down saves $140/month on a $35,000 vehicle at current rates.',
  'personal-loan-calculator': 'Personal loan APRs in 2026 range from 8% (excellent credit, 760+) to 36% (poor credit). A $15,000 loan at 12% APR for 36 months costs $498/month and $2,935 in total interest. Always compare APR — not interest rate — because origination fees (1%–8%) can raise your true cost significantly above the advertised rate.',
  'debt-payoff-calculator': 'The avalanche method (highest-rate debt first) saves the most interest. The snowball method (lowest balance first) provides faster psychological wins. On $20,000 of 22% APR credit card debt, avalanche saves ~$3,100 vs snowball. Any extra monthly payment above the minimum dramatically reduces total interest paid.',
  'student-loan-repayment-calculator': 'Under the SAVE Plan (2026), undergraduate loan payments are capped at 5% of discretionary income above 225% of the federal poverty line. A borrower with $40,000 income and $30,000 in loans might pay $0–$60/month on SAVE vs $345/month on the standard 10-year plan. Forgiveness after 10–25 years depending on loan type.',
  'overtime-pay-calculator': 'Under the FLSA, non-exempt employees earn 1.5× their regular rate for all hours over 40 in a workweek. Regular rate includes base wages, most bonuses, and shift differentials — but excludes overtime premiums and certain gifts. California mandates daily overtime (over 8 hrs/day) and double time (over 12 hrs/day or 7th day).',
  'salary-to-hourly-calculator': 'Divide annual salary by 2,080 (52 weeks × 40 hours) for the equivalent hourly rate. A $65,000 salary equals $31.25/hour. When comparing a salaried offer to hourly, add the value of benefits: employer 401k match (avg. $2,300/yr), health insurance contribution (avg. $7,200/yr), and PTO (avg. $6,200/yr for 3 weeks).',
  'time-card-calculator': 'Time card hours are calculated by subtracting start from end time, minus unpaid breaks. Federal law allows rounding to the nearest 5, 10, or 15 minutes if done consistently and not systematically in the employer\'s favor. A 15-minute round means 7–22 minutes worked rounds to 15; 23–37 rounds to 30.',
  'hours-worked-calculator': 'FLSA overtime applies per workweek (not pay period). A bi-weekly payroll of 90 hours with 45 hours in one week and 45 in another requires overtime for 5 hours each week — 10 hours total at 1.5× rate. Employers cannot average hours across weeks to avoid overtime calculations under federal law.',
  'mileage-reimbursement-calculator': 'The 2026 IRS standard business mileage rate is 70 cents per mile. For 1,200 business miles, reimbursement is $840 tax-free. Employers may reimburse more than the IRS rate, but amounts above are considered taxable wages. Employees using a personal vehicle for business can deduct actual expenses or the standard rate on Schedule C.',
  'cost-of-living-calculator': 'Cost of living indexes compare cities relative to the national average (100). San Francisco scores ~193; Dallas ~96; New York ~187; Austin ~120. A $70,000 Dallas salary is equivalent to $134,000 in San Francisco for the same standard of living. Housing accounts for 30–40% of total cost of living differences between cities.',
  'compound-interest-calculator': 'Compound interest formula: A = P(1 + r/n)^(nt). $10,000 at 7% compounded annually for 30 years grows to $76,123. With monthly compounding at the same rate, it grows to $76,123 — the difference from compounding frequency is minimal at moderate rates but significant at high rates over long periods.',
  'savings-goal-calculator': 'To find the monthly savings needed to reach a goal, use: PMT = FV × r ÷ [(1+r)^n − 1]. To save $50,000 in 5 years at 4.5% APY, you need $740/month. Starting earlier has dramatic impact: $200/month from age 25 at 7% yields $525,000 by 65; starting at 35 yields only $243,000 — half as much with the same monthly amount.',
  'debt-consolidation-calculator': 'Debt consolidation makes sense when the new loan rate is lower than your weighted average interest rate across all debts. To find your weighted average rate, multiply each balance by its rate, sum them, then divide by total debt. If your $25,000 in debts averages 19%, a consolidation loan at 11% saves $2,000+ per year in interest.',
};

// ── HowTo schema data ─────────────────────────────────────────────────────────
const HOWTO = {
  'payroll-tax-calculator': {
    name: 'How to Calculate Payroll Taxes in 2026',
    description: 'Step-by-step process for calculating federal payroll taxes for an employee.',
    steps: [
      { name: 'Determine gross wages', text: 'Calculate total gross wages for the pay period: hourly employees × hours worked, or salary ÷ pay periods per year.' },
      { name: 'Subtract pre-tax deductions', text: 'Deduct 401(k) contributions, HSA contributions, and pre-tax health insurance premiums. These reduce the taxable wage base.' },
      { name: 'Calculate FICA taxes', text: 'Multiply adjusted gross wages by 6.2% for Social Security (up to $176,100 annual wage base) and 1.45% for Medicare. No wage cap on Medicare.' },
      { name: 'Withhold federal income tax', text: 'Use IRS Publication 15-T Percentage Method Tables. Find the table matching your payroll period (weekly, bi-weekly, monthly) and employee W-4 filing status.' },
      { name: 'Apply state income tax', text: 'Use your state\'s withholding tables from the state revenue department. Nine states have no income tax: AK, FL, NV, NH, SD, TN, TX, WA, WY.' },
      { name: 'Calculate net pay', text: 'Subtract all taxes and post-tax deductions (Roth 401k, garnishments, benefits) from gross wages to arrive at the employee\'s net take-home pay.' },
    ]
  },
  'overtime-pay-calculator': {
    name: 'How to Calculate Overtime Pay',
    description: 'How to calculate overtime wages for non-exempt employees under FLSA.',
    steps: [
      { name: 'Identify the workweek', text: 'Confirm your fixed 7-day workweek period (e.g., Sunday–Saturday). Overtime is calculated per workweek — not pay period — under FLSA.' },
      { name: 'Count hours worked over 40', text: 'Total all hours worked in the workweek. Hours in excess of 40 are eligible for overtime. California also has daily overtime for 8+ hours/day.' },
      { name: 'Calculate the regular rate', text: 'Regular rate = total compensation (excluding OT premiums, gifts, expenses) ÷ total hours worked. Must include all remuneration paid for employment.' },
      { name: 'Apply the 1.5x multiplier', text: 'Overtime pay = regular rate × 1.5 × overtime hours. Example: $20/hr regular rate × 1.5 × 5 OT hours = $150 overtime premium.' },
      { name: 'Add straight-time wages', text: 'Total pay = (regular rate × 40 hours) + (regular rate × 1.5 × OT hours). Or alternatively: (regular rate × total hours) + (regular rate × 0.5 × OT hours).' },
    ]
  },
  'mortgage-calculator': {
    name: 'How to Calculate a Mortgage Payment',
    description: 'Step-by-step calculation of monthly mortgage principal and interest payment.',
    steps: [
      { name: 'Gather loan details', text: 'Note your loan amount (P), annual interest rate (convert to monthly: r = annual rate ÷ 12), and loan term in months (n = years × 12).' },
      { name: 'Apply the amortization formula', text: 'Monthly P&I = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. Example: $400,000 at 6.8% for 30 years = $400,000 × [0.005667 × (1.005667)^360] ÷ [(1.005667)^360 − 1] = $2,612.' },
      { name: 'Add escrow (PITI)', text: 'Total monthly payment = P&I + property taxes ÷ 12 + homeowners insurance ÷ 12 + PMI (if down payment < 20%). PMI typically costs 0.5%–1.5% of loan amount annually.' },
      { name: 'Verify with amortization table', text: 'In month 1, most payment goes to interest (6.8% ÷ 12 × $400,000 = $2,267 interest, only $345 principal). This reverses over time — by year 25, most goes to principal.' },
    ]
  },
  'compound-interest-calculator': {
    name: 'How to Calculate Compound Interest',
    description: 'Step-by-step guide to calculating compound interest growth on savings or investments.',
    steps: [
      { name: 'Identify variables', text: 'Note principal (P), annual interest rate as decimal (r), compounding frequency per year (n: 1=annual, 12=monthly, 365=daily), and time in years (t).' },
      { name: 'Apply the formula', text: 'A = P × (1 + r/n)^(n×t). Example: $10,000 at 7% compounded monthly for 20 years = $10,000 × (1 + 0.07/12)^(12×20) = $10,000 × 4.0387 = $40,387.' },
      { name: 'Calculate interest earned', text: 'Interest earned = Final Amount (A) − Principal (P). From the example: $40,387 − $10,000 = $30,387 in interest earned on a $10,000 investment.' },
      { name: 'Add regular contributions', text: 'With monthly deposits (PMT), use: A = P(1+r/n)^(nt) + PMT × [(1+r/n)^(nt) − 1] ÷ (r/n). Adding $200/month to the example above yields $148,200 after 20 years.' },
    ]
  },
  'self-employment-tax-calculator': {
    name: 'How to Calculate Self-Employment Tax',
    description: 'Step-by-step calculation of self-employment tax for Schedule SE.',
    steps: [
      { name: 'Calculate net SE income', text: 'Start with gross self-employment income from all 1099s and business income. Subtract business expenses to arrive at net profit from Schedule C.' },
      { name: 'Multiply by 92.35%', text: 'Multiply net profit by 0.9235. This accounts for the employer-equivalent deduction. Example: $75,000 × 0.9235 = $69,263 SE income subject to tax.' },
      { name: 'Apply SE tax rates', text: 'Apply 15.3% to the first $176,100 of net SE income, then 2.9% on the excess. Example: $69,263 × 15.3% = $10,597 in SE tax.' },
      { name: 'Deduct half of SE tax', text: 'You may deduct 50% of SE tax ($5,299 in the example) from adjusted gross income on Form 1040 Schedule 1 — reducing your income tax bill.' },
      { name: 'Calculate quarterly payments', text: 'Divide estimated annual SE tax + income tax by 4 for quarterly estimated payments due April 15, June 16, September 15, and January 15.' },
    ]
  },
  'retirement-calculator': {
    name: 'How to Calculate How Much You Need to Retire',
    description: 'Step-by-step retirement savings goal calculation using the 4% rule.',
    steps: [
      { name: 'Estimate annual retirement expenses', text: 'Project your annual spending in retirement. Many financial planners use 70–80% of pre-retirement income as a baseline. Include healthcare costs, which average $315,000 per couple in retirement.' },
      { name: 'Subtract guaranteed income', text: 'Deduct Social Security (check your estimate at SSA.gov), pension income, and any rental income from your annual expenses. This is your "income gap" — what savings must cover.' },
      { name: 'Apply the 4% rule', text: 'Divide your annual income gap by 0.04 (multiply by 25) to find your target portfolio. If the gap is $40,000/year, target nest egg = $40,000 ÷ 0.04 = $1,000,000.' },
      { name: 'Calculate monthly savings needed', text: 'Use future value formula: PMT = FV × r ÷ [(1+r)^n − 1]. To reach $1M in 30 years at 7% returns, save $984/month.' },
      { name: 'Adjust for inflation', text: 'Real (inflation-adjusted) returns average 4–5% historically. For conservative planning, use 5–6% nominal or 3–4% real return in your projections.' },
    ]
  },
  'roi-calculator': {
    name: 'How to Calculate Return on Investment (ROI)',
    description: 'Step-by-step ROI calculation for business and investment decisions.',
    steps: [
      { name: 'Calculate total investment cost', text: 'Include all direct costs: purchase price, setup fees, training, opportunity cost, and any ongoing costs during the investment period. Don\'t overlook indirect costs.' },
      { name: 'Determine net profit', text: 'Net profit = total revenue generated − total costs (including the original investment). Be precise about the time period covered.' },
      { name: 'Apply the ROI formula', text: 'ROI = (Net Profit ÷ Investment Cost) × 100. Example: $8,000 net profit ÷ $5,000 invested × 100 = 160% ROI.' },
      { name: 'Annualize for comparison', text: 'For multi-year investments, annualize: Annualized ROI = [(1 + ROI)^(1/years) − 1] × 100. A 160% ROI over 3 years = 37.5% annualized ROI.' },
      { name: 'Compare to benchmark', text: 'Compare to your cost of capital or hurdle rate. If you can earn 10% elsewhere, projects below 10% annualized ROI destroy value even if ROI is positive.' },
    ]
  },
};

// ── CSS for quick-answer box ───────────────────────────────────────────────────
const QA_CSS = `
/* ── Quick Answer box (GEO/AEO) ── */
.quick-answer{
  background:linear-gradient(135deg,rgba(27,79,216,.05),rgba(27,79,216,.02));
  border:1.5px solid rgba(27,79,216,.18);
  border-left:4px solid var(--accent);
  border-radius:10px;
  padding:16px 20px;
  margin-bottom:28px;
  display:flex;gap:14px;align-items:flex-start;
}
.qa-label{
  font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;
  color:var(--accent);background:rgba(27,79,216,.1);
  border-radius:6px;padding:3px 9px;white-space:nowrap;margin-top:1px;flex-shrink:0;
}
.qa-text{font-size:14px;line-height:1.65;color:var(--ink-2);margin:0}
.qa-text strong{color:var(--ink);font-weight:600}
`;

// ── Helper: extract slug from filename ───────────────────────────────────────
function slugFrom(filename) {
  return filename.replace('.html', '');
}

// ── Main ─────────────────────────────────────────────────────────────────────
let qaAdded = 0, speakableAdded = 0, howtoAdded = 0;

// 1. Add CSS to styles.css
const cssPath = path.join(ROOT, 'shared/styles.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.quick-answer{')) {
  css += '\n' + QA_CSS;
  fs.writeFileSync(cssPath, css);
  console.log('✅ Quick-answer CSS added to styles.css');
}

// 2. Process HTML files
const files = fs.readdirSync(ROOT).filter(f =>
  f.endsWith('.html') &&
  !f.startsWith('google') &&
  !['index.html', 'tools.html', 'about.html', 'blog.html', 'privacy.html', 'terms.html', 'minimum-wage-by-state.html', 'state-payroll-tax-rates.html'].includes(f)
);

for (const file of files) {
  const slug = slugFrom(file);
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  // Skip state payroll pages (50 pages, different structure)
  if (slug.includes('-payroll-tax-calculator') && slug !== 'payroll-tax-calculator') {
    continue;
  }

  // ── A. Add quick-answer box ─────────────────────────────────────────────
  if (!html.includes('quick-answer') && QA[slug]) {
    const answer = QA[slug];
    const qaBox = `<div class="quick-answer" role="note" aria-label="Quick answer">
  <span class="qa-label">Quick Answer</span>
  <p class="qa-text">${answer}</p>
</div>\n`;

    // Insert after .calc-sub paragraph or after .calc-breadcrumb nav
    const subMatch = html.match(/<p class="calc-sub"[^>]*>[\s\S]*?<\/p>/);
    const adMatch = html.match(/<div class="ad-zone[^"]*"><\/div>/);

    if (subMatch) {
      html = html.replace(subMatch[0], subMatch[0] + '\n' + qaBox);
      qaAdded++;
    } else if (adMatch) {
      // Insert after ad-zone div before h1
      const h1Match = html.match(/<h1[^>]*class="calc-title"[^>]*>/);
      if (h1Match) {
        html = html.replace(h1Match[0], qaBox + h1Match[0]);
        qaAdded++;
      }
    }
  }

  // ── B. Add Speakable schema ─────────────────────────────────────────────
  if (!html.includes('"Speakable"') && !html.includes('speakable')) {
    const speakable = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","speakable":{"@type":"SpeakableSpecification","cssSelector":["h1.calc-title","h1","p.calc-sub",".quick-answer",".qa-text"]},"url":"https://www.freepayrollcalc.xyz/${slug}"}</script>`;
    html = html.replace('</head>', speakable + '\n</head>');
    speakableAdded++;
  }

  // ── C. Add HowTo schema ──────────────────────────────────────────────────
  if (!html.includes('"HowTo"') && HOWTO[slug]) {
    const d = HOWTO[slug];
    const stepsJson = d.steps.map((s, i) =>
      `{"@type":"HowToStep","position":${i + 1},"name":"${s.name.replace(/"/g, '\\"')}","text":"${s.text.replace(/"/g, '\\"')}"}`
    ).join(',');
    const howto = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"HowTo","name":"${d.name}","description":"${d.description}","step":[${stepsJson}]}</script>`;
    html = html.replace('</head>', howto + '\n</head>');
    howtoAdded++;
  }

  if (html !== orig) fs.writeFileSync(fp, html);
}

console.log(`✅ Quick-answer boxes added: ${qaAdded} pages`);
console.log(`✅ Speakable schema added:   ${speakableAdded} pages`);
console.log(`✅ HowTo schema added:       ${howtoAdded} pages`);
console.log('\nAll GEO/AEO upgrades complete.');
