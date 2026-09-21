/**
 * Advanced SEO Fix Script
 * Fixes: homepage H1, retirement title, visible FAQ on batch 4 pages,
 *        BreadcrumbList schema on all pages, TOOLS_DATA completeness in scripts.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'C:/Users/mastr/claude co/payroll-calc/';

// ── 1. Fix Homepage H1 ─────────────────────────────────────────────────────
function fixHomepageH1() {
  let html = fs.readFileSync(ROOT + 'index.html', 'utf8');
  // Current H1 is "Tools for real-life" — replace with keyword-rich H1
  html = html.replace(
    /(<h1[^>]*>)\s*Tools for real-life\s*(<\/h1>)/,
    '$1Free Payroll &amp; Financial Calculators 2026$2'
  );
  // Also fix the subtitle if present
  html = html.replace(
    'Free US payroll and HR calculators',
    'Free US payroll, tax, and financial calculators'
  );
  fs.writeFileSync(ROOT + 'index.html', html);
  console.log('✅ Homepage H1 fixed');
}

// ── 2. Fix Retirement Calculator Title ────────────────────────────────────
function fixRetirementTitle() {
  let html = fs.readFileSync(ROOT + 'retirement-calculator.html', 'utf8');
  html = html.replace(
    '<title>Retirement Calculator | FreePayrollCalc</title>',
    '<title>Retirement Calculator 2026 | Portfolio Growth &amp; 4% Rule</title>'
  );
  html = html.replace(
    '<meta property="og:title" content="Retirement Calculator | FreePayrollCalc">',
    '<meta property="og:title" content="Retirement Calculator 2026 | Portfolio Growth &amp; 4% Rule">'
  );
  fs.writeFileSync(ROOT + 'retirement-calculator.html', html);
  console.log('✅ Retirement calculator title fixed');
}

// ── 3. Add visible FAQ HTML to batch 4 pages ──────────────────────────────
const BATCH4_FAQ = {
  'cd-calculator': [
    { q: 'What is a good CD rate in 2026?', a: 'Competitive CD rates in 2026 range from 4.0–5.5% APY for 6-month to 2-year terms at online banks and credit unions. Traditional banks typically offer 0.5–2% less. Always compare APY (not APR) since APY includes the effect of compounding.' },
    { q: 'What is the difference between APY and APR on a CD?', a: 'APR is the stated interest rate. APY includes compounding and is always higher than or equal to APR. For a 5% APR with daily compounding, the APY is approximately 5.13%. Banks are required to advertise APY so you can compare products accurately.' },
    { q: 'What happens if I withdraw a CD early?', a: 'Most CDs charge an early withdrawal penalty — typically 60–150 days of interest for short-term CDs and 6–12 months of interest for 2–5 year terms. Some no-penalty CDs exist but pay lower rates. Always check the penalty terms before opening a CD.' },
    { q: 'What is CD laddering?', a: 'CD laddering splits your money across multiple CDs with different maturity dates (e.g. 1-year, 2-year, 3-year). As each CD matures, you reinvest at the current best rate. This gives regular access to funds while maximizing long-term yield and reducing reinvestment risk.' }
  ],
  '401k-loan-calculator': [
    { q: 'How much can I borrow from my 401k?', a: 'You can borrow up to 50% of your vested balance or $50,000, whichever is less. Most plans require a minimum of $1,000. The loan must be repaid within 5 years (or longer if used to purchase a primary residence).' },
    { q: 'What is the true cost of a 401k loan?', a: 'The true cost includes: interest paid (which goes back to your account), lost investment growth on the borrowed amount, and the double-taxation effect (you repay with after-tax dollars, then pay taxes again on withdrawal). On a $20,000 loan at 8% expected market return, you lose roughly $8,000–$12,000 in long-term retirement value.' },
    { q: 'What happens if I leave my job with an outstanding 401k loan?', a: 'If you leave your employer, the full outstanding balance typically becomes due by the tax filing deadline (including extensions) for that year. If you cannot repay, the balance is treated as a distribution — subject to income tax and a 10% early withdrawal penalty if you are under 59½.' },
    { q: 'Is a 401k loan better than a personal loan?', a: 'Usually no. While 401k loan interest rates are lower, the true cost — lost investment compounding — often exceeds what you would pay in interest on a personal loan. A HELOC, personal loan, or balance transfer card is typically cheaper when you account for opportunity cost.' }
  ],
  'balance-transfer-calculator': [
    { q: 'How does a balance transfer work?', a: 'A balance transfer moves existing credit card debt to a new card — usually one offering a 0% introductory APR for 12–21 months. You pay a transfer fee (typically 3–5%) upfront, then pay down the balance interest-free during the promo period. Any remaining balance after the promo ends accrues interest at the regular rate (often 20–29%).' },
    { q: 'What is a good balance transfer fee?', a: 'Most balance transfer fees are 3–5% of the amount transferred. Some cards offer 0% transfer fee promotions. Compare the transfer fee against the interest you would save — even a 3% fee is usually worth it if you are paying 20%+ APR on your current card and can pay off the balance within the promo period.' },
    { q: 'Will I pay off my balance before the 0% period ends?', a: 'Divide your balance by the number of promo months. Example: $6,000 balance ÷ 18 months = $333/month minimum to pay off before interest kicks in. Use this calculator to see your exact required monthly payment and whether the transfer makes financial sense.' },
    { q: 'Does a balance transfer hurt your credit score?', a: 'Opening a new card causes a small, temporary dip (hard inquiry). However, the lower utilization on your existing cards can improve your score over time. Avoid closing old cards after the transfer — the available credit keeps your utilization ratio healthy.' }
  ],
  'estate-tax-calculator': [
    { q: 'What is the federal estate tax exemption for 2026?', a: 'The federal estate tax exemption for 2026 is $13.99 million per individual ($27.98 million for married couples with portability election). Estates below this threshold owe zero federal estate tax. The exemption is indexed to inflation annually.' },
    { q: 'What are the federal estate tax rates in 2026?', a: 'Federal estate tax rates are progressive: 18% on taxable estates under $10,000, scaling up to 40% on the taxable amount above $1 million. Only the amount above the exemption is taxed — the exemption itself is always tax-free.' },
    { q: 'Does my state have its own estate tax?', a: 'Yes — 12 states and Washington D.C. have separate estate taxes with lower exemptions than the federal threshold. States with estate tax include Massachusetts (exemption $1M), Oregon ($1M), Washington state ($2.193M), and others. Some states also have inheritance taxes paid by beneficiaries.' },
    { q: 'How can I reduce estate tax liability?', a: 'Common strategies include: annual gift tax exclusion ($18,000/person in 2026), irrevocable life insurance trusts (ILITs), charitable remainder trusts, qualified personal residence trusts (QPRTs), and family limited partnerships. A licensed estate planning attorney should coordinate any strategy.' }
  ],
  'total-compensation-calculator': [
    { q: 'What counts as total compensation?', a: 'Total compensation includes base salary plus all employer-provided benefits: health/dental/vision insurance premiums paid by employer, 401k match, PTO monetary value (hourly rate × days), bonuses, equity/stock grants (vested value), life insurance, HSA contributions, commuter benefits, and any professional development allowances.' },
    { q: 'How do I calculate the value of employer health insurance?', a: 'The average employer health insurance contribution in 2026 is approximately $7,000–$8,000 per year for individual coverage and $18,000–$20,000 for family coverage. Check your benefits summary for your employer\'s exact contribution — this is often the single largest non-salary benefit.' },
    { q: 'How much is a 401k match worth?', a: 'A common match is 50% up to 6% of salary. On a $70,000 salary contributing 6% ($4,200/year), your employer adds $2,100/year — worth $2,100 in direct compensation plus significant long-term compounding. Full 100% matches up to 4% of salary are also common and worth approximately $2,800/year on that salary.' },
    { q: 'Should I compare job offers by salary or total compensation?', a: 'Always compare by total compensation. A job offering $80,000 salary with full health coverage, 6% 401k match, and 20 PTO days may be worth $15,000–$25,000 more than a $90,000 offer with minimal benefits. Use this calculator to build a true side-by-side comparison.' }
  ],
  'fuel-savings-calculator': [
    { q: 'How do I calculate how much I spend on gas per year?', a: 'Annual fuel cost = (annual miles driven ÷ MPG) × price per gallon. Example: 12,000 miles/year ÷ 28 MPG × $3.50/gallon = $1,500/year. The national average is approximately 12,000–15,000 miles/year and $3.20–$3.80/gallon depending on region and fuel grade.' },
    { q: 'How many years to break even switching to a more fuel-efficient vehicle?', a: 'Break-even years = price premium of the efficient vehicle ÷ annual fuel savings. Example: if the new vehicle costs $3,000 more but saves $600/year in fuel, break-even is 5 years. Account for any difference in insurance, maintenance, and tax incentives (EVs may qualify for a $7,500 federal tax credit).' },
    { q: 'How much does one extra MPG save per year?', a: 'It depends on your driving. At 12,000 miles/year and $3.50/gallon: going from 25 to 26 MPG saves about $65/year. Going from 30 to 35 MPG saves about $200/year. The lower your starting MPG, the more each incremental MPG is worth.' },
    { q: 'What is the fuel savings for an EV vs gas car?', a: 'A typical EV costs about $0.03–$0.05 per mile in electricity vs $0.12–$0.18 per mile for a gas car. On 12,000 miles/year, that\'s $1,080–$1,560 annual savings. Home charging off-peak rates reduce costs further. Federal and state EV incentives can significantly reduce the upfront premium.' }
  ],
  'credit-card-payoff-calculator': [
    { q: 'How long does it take to pay off credit card debt with minimum payments?', a: 'On a $5,000 balance at 22% APR with 2% minimum payment, it takes approximately 27 years to pay off and costs over $6,500 in interest — more than the original balance. Minimum payments are designed to maximize interest paid, not to help you get out of debt.' },
    { q: 'What is the debt avalanche vs debt snowball method?', a: 'Avalanche: pay minimums on all cards, put extra money toward the highest-interest card first. Saves the most money. Snowball: pay minimums on all cards, put extra money toward the smallest balance first. Provides psychological wins faster. Mathematically, avalanche saves more; psychologically, snowball keeps more people on track.' },
    { q: 'How much extra per month to pay off credit card debt in 2 years?', a: 'Divide your balance by 24 (for 2 years) — that is your minimum monthly payment needed ignoring interest. Add roughly 10–15% for interest coverage. Example: $4,800 ÷ 24 = $200/month + ~$30 for interest = $230/month needed to clear in 2 years.' },
    { q: 'Should I do a balance transfer to pay off credit card debt?', a: 'If you qualify for a 0% APR balance transfer card, it is usually the fastest and cheapest payoff path. A 3–5% transfer fee is far less than 20–29% annual interest. The key: you must pay off the full balance before the promotional period ends, or the remaining balance accrues interest at the regular rate.' }
  ],
  'extra-mortgage-payment-calculator': [
    { q: 'How much interest do extra mortgage payments save?', a: 'On a $300,000 30-year mortgage at 7%, paying $200 extra per month saves approximately $87,000 in interest and pays off the loan 6 years early. The savings are front-loaded — extra payments early in the loan save far more than the same payments made later.' },
    { q: 'Is it better to make extra principal payments or invest the money?', a: 'It depends on your mortgage rate vs expected investment return. If your mortgage is 7% and you expect 8–10% stock market returns, investing has a higher expected return. If your mortgage is 3–4%, the math clearly favors investing. However, paying off the mortgage provides a guaranteed, risk-free return equal to your interest rate.' },
    { q: 'How do I make sure extra payments go toward principal?', a: 'When submitting extra payments, include a note specifying "apply to principal only." Online banking systems usually have a payment type selector. Call your servicer to confirm — some automatically apply overpayments to next month\'s payment instead of reducing principal, which eliminates the interest-saving benefit.' },
    { q: 'What is biweekly mortgage payment and how much does it save?', a: 'Biweekly payments mean you pay half your monthly payment every two weeks. Since there are 26 biweekly periods per year, you make the equivalent of 13 monthly payments per year instead of 12 — one extra full payment annually. On a 30-year, $300,000 mortgage at 7%, this saves approximately $40,000 in interest and cuts 4–5 years off the loan.' }
  ],
  'parent-plus-loan-calculator': [
    { q: 'What is the Parent PLUS loan interest rate for 2026?', a: 'The Parent PLUS loan interest rate for loans disbursed in the 2025-2026 academic year is 9.08% — fixed for the life of the loan. This is one of the highest rates in the federal student loan program. The origination fee is 4.228% deducted from each disbursement.' },
    { q: 'What repayment plans are available for Parent PLUS loans?', a: 'Parent PLUS loans qualify for Standard (10-year), Graduated, and Extended Repayment (up to 25 years). They do NOT directly qualify for income-driven repayment (IDR) plans — but if consolidated into a Direct Consolidation Loan, they can access Income-Contingent Repayment (ICR), which caps payments at 20% of discretionary income.' },
    { q: 'Can Parent PLUS loans be transferred to the student?', a: 'Federal Parent PLUS loans cannot be transferred to the student through the federal system. However, some private lenders (SoFi, Earnest, etc.) allow the student to refinance Parent PLUS loans in their own name. Note: refinancing to private forfeits all federal protections including deferment and Public Service Loan Forgiveness eligibility.' },
    { q: 'What is the maximum Parent PLUS loan amount?', a: 'There is no annual maximum — you can borrow up to the full cost of attendance minus any other financial aid the student receives. The cost of attendance is set by the school and includes tuition, fees, room and board, books, and personal expenses.' }
  ],
  'dividend-yield-calculator': [
    { q: 'What is a good dividend yield?', a: 'A yield of 2–4% is generally considered healthy for a stable dividend-paying company. Yields above 6–8% may signal that the stock price has fallen sharply (raising the yield) or that the dividend is at risk of being cut. Always check the payout ratio (dividends ÷ earnings) — below 60% is generally sustainable.' },
    { q: 'What is yield on cost?', a: 'Yield on cost is your dividend income divided by your original purchase price — not today\'s stock price. If you bought stock at $40 that now trades at $100 and pays a $4 annual dividend, your current yield is 4% but your yield on cost is 10%. This metric shows the long-term value of dividend growth for original shareholders.' },
    { q: 'How much do I need to invest to earn $1,000 per month in dividends?', a: 'At a 4% annual yield, you need $300,000 invested ($300,000 × 4% = $12,000/year = $1,000/month). At 6% yield, you need $200,000. Higher yields require less capital but carry more risk. A diversified portfolio of dividend ETFs typically yields 2–4% with lower individual stock risk.' },
    { q: 'Are dividends taxed?', a: 'Qualified dividends (from US companies held 60+ days) are taxed at 0%, 15%, or 20% depending on your income — the same as long-term capital gains. Ordinary dividends are taxed as regular income. REIT dividends are mostly ordinary income. In tax-advantaged accounts (Roth IRA, 401k), dividends grow tax-free or tax-deferred.' }
  ]
};

function addVisibleFAQ(slug, faqs) {
  const file = ROOT + slug + '.html';
  let html = fs.readFileSync(file, 'utf8');

  if (html.includes('faq-item') || html.includes('<details')) {
    console.log(`  ⏭ ${slug} — already has visible FAQ`);
    return;
  }

  const faqHtml = `
<section class="faq-section" data-enter>
  <div class="container">
    <h2 class="section-title" style="margin-bottom:24px">Frequently Asked Questions</h2>
    <div class="faq-list">
${faqs.map(f => `      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">${f.q}</button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('\n')}
    </div>
  </div>
</section>`;

  // Inject before the related section
  html = html.replace('<section class="related-section">', faqHtml + '\n<section class="related-section">');
  fs.writeFileSync(file, html);
  console.log(`  ✅ ${slug} — visible FAQ added`);
}

// ── 4. Add BreadcrumbList schema to all calculator pages ──────────────────
function addBreadcrumbSchema(file) {
  let html = fs.readFileSync(ROOT + file, 'utf8');
  if (html.includes('BreadcrumbList')) return false;

  const slug = file.replace('.html', '');
  const title = (html.match(/<h1[^>]*>([^<]+)/) || [])[1] || slug;
  const cleanTitle = title.replace(/<[^>]+>/g, '').trim();

  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freepayrollcalc.xyz/"},{"@type":"ListItem","position":2,"name":"${cleanTitle}","item":"https://www.freepayrollcalc.xyz/${slug}"}]}</script>`;

  html = html.replace('</head>', schema + '\n</head>');
  fs.writeFileSync(ROOT + file, html);
  return true;
}

// ── 5. Update TOOLS_DATA in scripts.js with all missing tools ─────────────
function updateToolsData() {
  let scripts = fs.readFileSync(ROOT + 'shared/scripts.js', 'utf8');

  const newTools = `  {name:'1099 Tax Calculator',url:'/1099-tax-calculator',cat:'Income & Tax',desc:'Self-employment tax estimator for freelancers'},
  {name:'Capital Gains Tax Calculator',url:'/capital-gains-tax-calculator',cat:'Income & Tax',desc:'Short and long-term capital gains tax'},
  {name:'Income Tax Calculator',url:'/income-tax-calculator',cat:'Income & Tax',desc:'Federal income tax for 2026'},
  {name:'Tax Refund Estimator',url:'/tax-refund-estimator',cat:'Income & Tax',desc:'Estimate your 2026 federal tax refund'},
  {name:'Mileage Reimbursement Calculator',url:'/mileage-reimbursement-calculator',cat:'Income & Tax',desc:'2026 IRS rate: 70 cents per mile'},
  {name:'Section 179 Deduction Calculator',url:'/section-179-deduction-calculator',cat:'Income & Tax',desc:'Equipment deduction for small businesses'},
  {name:'Overtime Pay Calculator',url:'/overtime-pay-calculator',cat:'Time & Hours',desc:'FLSA 1.5x, double time, California rules'},
  {name:'Payroll Hours Calculator',url:'/payroll-hours-calculator',cat:'Time & Hours',desc:'Convert payroll hours to wages'},
  {name:'Severance Pay Calculator',url:'/severance-pay-calculator',desc:'Weeks of pay by tenure and salary',cat:'Time & Hours'},
  {name:'FMLA Leave Calculator',url:'/fmla-leave-calculator',cat:'Time & Hours',desc:'12-week FMLA eligibility and dates'},
  {name:'COBRA Insurance Calculator',url:'/cobra-insurance-calculator',cat:'Time & Hours',desc:'Monthly COBRA premium estimator'},
  {name:'Unemployment Benefits Calculator',url:'/unemployment-benefits-calculator',cat:'Time & Hours',desc:'Weekly benefit amount by state'},
  {name:'Employee Cost Calculator',url:'/employee-cost-calculator',cat:'Payroll',desc:'True total employer cost per employee'},
  {name:'Payroll Cost Calculator',url:'/payroll-cost-calculator',cat:'Payroll',desc:'Full payroll cost for a team'},
  {name:'Employer Tax Calculator',url:'/employer-tax-calculator',cat:'Payroll',desc:'FICA match, FUTA, SUTA breakdown'},
  {name:'Mortgage Calculator',url:'/mortgage-calculator',cat:'Mortgage',desc:'Monthly payment + full amortization schedule'},
  {name:'Refinance Calculator',url:'/refinance-calculator',cat:'Mortgage',desc:'Break-even and savings from refinancing'},
  {name:'Mortgage Affordability Calculator',url:'/mortgage-affordability-calculator',cat:'Mortgage',desc:'Max home price by income and debt'},
  {name:'Closing Costs Calculator',url:'/closing-costs-calculator',cat:'Mortgage',desc:'Estimated closing costs by state'},
  {name:'HELOC Calculator',url:'/heloc-calculator',cat:'Mortgage',desc:'Home equity line of credit payments'},
  {name:'Home Equity Loan Calculator',url:'/home-equity-loan-calculator',cat:'Mortgage',desc:'Fixed-rate home equity loan payments'},
  {name:'Reverse Mortgage Calculator',url:'/reverse-mortgage-calculator',cat:'Mortgage',desc:'Reverse mortgage eligibility and payout'},
  {name:'Extra Mortgage Payment Calculator',url:'/extra-mortgage-payment-calculator',cat:'Mortgage',desc:'Interest saved with extra principal payments'},
  {name:'Adjustable Rate Mortgage Calculator',url:'/adjustable-rate-mortgage-calculator',cat:'Mortgage',desc:'ARM payment and rate adjustment scenarios'},
  {name:'Retirement Calculator',url:'/retirement-calculator',cat:'Retirement',desc:'Portfolio growth with 4% rule projection'},
  {name:'Roth IRA Calculator',url:'/roth-ira-calculator',cat:'Retirement',desc:'Tax-free growth projection for Roth IRA'},
  {name:'Roth IRA Conversion Calculator',url:'/roth-ira-conversion-calculator',cat:'Retirement',desc:'Tax cost and break-even of Roth conversion'},
  {name:'IRA Rollover Calculator',url:'/ira-rollover-calculator',cat:'Retirement',desc:'Traditional vs Roth rollover comparison'},
  {name:'Required Minimum Distribution Calculator',url:'/required-minimum-distribution-calculator',cat:'Retirement',desc:'RMD amounts by age and account balance'},
  {name:'Social Security Benefits Calculator',url:'/social-security-benefits-calculator',cat:'Retirement',desc:'Estimated SS benefit at 62, 67, 70'},
  {name:'Pension Calculator',url:'/pension-calculator',cat:'Retirement',desc:'Defined benefit pension monthly income'},
  {name:'Annuity Calculator',url:'/annuity-calculator',cat:'Retirement',desc:'Annuity income and present value'},
  {name:'How Long Will My Money Last Calculator',url:'/how-long-will-my-money-last-calculator',cat:'Retirement',desc:'Drawdown timeline at various spend rates'},
  {name:'529 College Savings Calculator',url:'/529-college-savings-calculator',cat:'Retirement',desc:'College fund growth and coverage projection'},
  {name:'Rate of Return Calculator',url:'/rate-of-return-calculator',cat:'Retirement',desc:'Annualized investment return (CAGR)'},
  {name:'CD Calculator',url:'/cd-calculator',cat:'Savings',desc:'Certificate of deposit interest and APY'},
  {name:'Compound Interest Calculator',url:'/compound-interest-calculator',cat:'Savings',desc:'Growth with daily, monthly, annual compounding'},
  {name:'Savings Goal Calculator',url:'/savings-goal-calculator',cat:'Savings',desc:'Monthly savings needed to hit a target'},
  {name:'Dividend Yield Calculator',url:'/dividend-yield-calculator',cat:'Savings',desc:'Annual dividend income and yield on cost'},
  {name:'Personal Loan Calculator',url:'/personal-loan-calculator',cat:'Loans & Debt',desc:'Monthly payment and total interest'},
  {name:'Car Loan Calculator',url:'/car-loan-calculator',cat:'Loans & Debt',desc:'Auto loan payment and total cost'},
  {name:'SBA Loan Calculator',url:'/sba-loan-calculator',cat:'Loans & Debt',desc:'SBA 7(a) and 504 loan payments'},
  {name:'Auto Refinance Calculator',url:'/auto-refinance-calculator',cat:'Loans & Debt',desc:'Savings from refinancing your car loan'},
  {name:'Debt Consolidation Calculator',url:'/debt-consolidation-calculator',cat:'Loans & Debt',desc:'One payment vs multiple debt payoff'},
  {name:'Credit Card Payoff Calculator',url:'/credit-card-payoff-calculator',cat:'Loans & Debt',desc:'Payoff time and interest with extra payments'},
  {name:'Balance Transfer Calculator',url:'/balance-transfer-calculator',cat:'Loans & Debt',desc:'0% APR savings vs transfer fee'},
  {name:'401k Loan Calculator',url:'/401k-loan-calculator',cat:'Loans & Debt',desc:'True cost of borrowing from retirement'},
  {name:'Parent PLUS Loan Calculator',url:'/parent-plus-loan-calculator',cat:'Loans & Debt',desc:'9.08% 2026 rate, all repayment plans'},
  {name:'Student Loan Repayment Calculator',url:'/student-loan-repayment-calculator',cat:'Loans & Debt',desc:'Standard, IBR, PAYE, SAVE repayment plans'},
  {name:'Life Insurance Calculator',url:'/life-insurance-calculator',cat:'Business',desc:'Coverage needs by income and dependents'},
  {name:'Property Tax Calculator',url:'/property-tax-calculator',cat:'Business',desc:'Annual property tax by state and value'},
  {name:'Workers Comp Calculator',url:'/workers-comp-calculator',cat:'Payroll',desc:'Insurance premium by state and job class'},
  {name:'Body Fat Calculator',url:'/body-fat-calculator',cat:'Other',desc:'Body fat percentage by Navy method'},
  {name:'TDEE Calculator',url:'/tdee-calculator',cat:'Other',desc:'Total daily energy expenditure'},
  {name:'GPA Calculator',url:'/gpa-calculator',cat:'Other',desc:'Cumulative GPA calculator'},
  {name:'Estate Tax Calculator',url:'/estate-tax-calculator',cat:'Income & Tax',desc:'Federal estate tax with $13.99M exemption'},
  {name:'Total Compensation Calculator',url:'/total-compensation-calculator',cat:'Payroll',desc:'Salary + benefits true package value'},
  {name:'Fuel Savings Calculator',url:'/fuel-savings-calculator',cat:'Business',desc:'Gas cost comparison and break-even MPG'},`;

  // Insert new tools before the closing ];
  scripts = scripts.replace(
    `  {name:'Burn Rate Calculator',url:'/burn-rate-calculator',cat:'Business',desc:'Monthly spend and runway for startups'},
  {name:'SaaS Revenue Calculator',url:'/saas-revenue-calculator',cat:'Business',desc:'MRR, ARR, churn impact projections'}
];`,
    `  {name:'Burn Rate Calculator',url:'/burn-rate-calculator',cat:'Business',desc:'Monthly spend and runway for startups'},
  {name:'SaaS Revenue Calculator',url:'/saas-revenue-calculator',cat:'Business',desc:'MRR, ARR, churn impact projections'},
${newTools}
];`
  );

  fs.writeFileSync(ROOT + 'shared/scripts.js', scripts);
  console.log('✅ TOOLS_DATA updated with all missing tools');
}

// ── Run all fixes ─────────────────────────────────────────────────────────

console.log('\n🔧 Fix 1: Homepage H1');
fixHomepageH1();

console.log('\n🔧 Fix 2: Retirement calculator title');
fixRetirementTitle();

console.log('\n🔧 Fix 3: Visible FAQ sections on batch 4 pages');
for (const [slug, faqs] of Object.entries(BATCH4_FAQ)) {
  addVisibleFAQ(slug, faqs);
}

console.log('\n🔧 Fix 4: BreadcrumbList schema on all calculator pages');
const htmlFiles = fs.readdirSync(ROOT).filter(f =>
  f.endsWith('.html') && !f.startsWith('google') &&
  !['index.html','tools.html','about.html','privacy.html','terms.html','blog.html'].includes(f)
);
let breadcrumbCount = 0;
for (const f of htmlFiles) {
  if (addBreadcrumbSchema(f)) breadcrumbCount++;
}
console.log(`  ✅ BreadcrumbList added to ${breadcrumbCount} pages`);

console.log('\n🔧 Fix 5: Update TOOLS_DATA in scripts.js');
updateToolsData();

console.log('\n✅ All advanced SEO fixes complete\n');
