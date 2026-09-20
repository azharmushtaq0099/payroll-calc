/**
 * Injects a "Related Calculators" section into every calculator page.
 * Run: node _inject_related.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';

const TITLES = {
  'payroll-tax-calculator': 'Payroll Tax Calculator',
  'take-home-pay-calculator': 'Take-Home Pay Calculator',
  'salary-to-hourly-calculator': 'Salary to Hourly',
  'net-to-gross-calculator': 'Net to Gross Calculator',
  'income-tax-calculator': 'Income Tax Calculator',
  'bonus-tax-calculator': 'Bonus Tax Calculator',
  'capital-gains-tax-calculator': 'Capital Gains Tax',
  'self-employment-tax-calculator': 'Self-Employment Tax',
  'quarterly-tax-calculator': 'Quarterly Tax Calculator',
  'mileage-reimbursement-calculator': 'Mileage Reimbursement',
  'effective-tax-rate-calculator': 'Effective Tax Rate',
  'tax-refund-estimator': 'Tax Refund Estimator',
  'w4-withholding-calculator': 'W-4 Withholding Calculator',
  '1099-tax-calculator': '1099 Tax Calculator',
  '1099-vs-w2-calculator': '1099 vs W-2 Calculator',
  'section-179-deduction-calculator': 'Section 179 Deduction',
  'mortgage-calculator': 'Mortgage Calculator',
  'mortgage-affordability-calculator': 'Mortgage Affordability',
  'adjustable-rate-mortgage-calculator': 'ARM Calculator',
  'home-equity-loan-calculator': 'Home Equity Loan',
  'heloc-calculator': 'HELOC Calculator',
  'closing-costs-calculator': 'Closing Costs Calculator',
  'property-tax-calculator': 'Property Tax Calculator',
  'refinance-calculator': 'Refinance Calculator',
  'reverse-mortgage-calculator': 'Reverse Mortgage',
  'cap-rate-calculator': 'Cap Rate Calculator',
  'car-loan-calculator': 'Car Loan Calculator',
  'personal-loan-calculator': 'Personal Loan Calculator',
  'sba-loan-calculator': 'SBA Loan Calculator',
  'business-loan-calculator': 'Business Loan Calculator',
  'student-loan-repayment-calculator': 'Student Loan Repayment',
  'auto-refinance-calculator': 'Auto Refinance Calculator',
  'debt-consolidation-calculator': 'Debt Consolidation',
  'debt-payoff-calculator': 'Debt Payoff Calculator',
  'roth-ira-calculator': 'Roth IRA Calculator',
  'roth-ira-conversion-calculator': 'Roth IRA Conversion',
  'ira-rollover-calculator': 'IRA Rollover Calculator',
  'required-minimum-distribution-calculator': 'RMD Calculator',
  'pension-calculator': 'Pension Calculator',
  'annuity-calculator': 'Annuity Calculator',
  'life-insurance-calculator': 'Life Insurance Calculator',
  'compound-interest-calculator': 'Compound Interest',
  'retirement-calculator': 'Retirement Calculator',
  'social-security-benefits-calculator': 'Social Security Benefits',
  'how-long-will-my-money-last-calculator': 'How Long Will Money Last',
  'savings-goal-calculator': 'Savings Goal Calculator',
  'savings-calculator': 'Savings Calculator',
  'rate-of-return-calculator': 'Rate of Return (CAGR)',
  '529-college-savings-calculator': '529 College Savings',
  'roi-calculator': 'ROI Calculator',
  'break-even-calculator': 'Break-Even Calculator',
  'profit-margin-calculator': 'Profit Margin Calculator',
  'business-valuation-calculator': 'Business Valuation',
  'cogs-calculator': 'COGS Calculator',
  'markup-calculator': 'Markup Calculator',
  'burn-rate-calculator': 'Burn Rate Calculator',
  'cost-of-living-calculator': 'Cost of Living',
  'budget-calculator': 'Budget Calculator',
  'overtime-pay-calculator': 'Overtime Pay Calculator',
  'pto-accrual-calculator': 'PTO Accrual Calculator',
  'free-payroll-calculator': 'Free Payroll Calculator',
  'employer-tax-calculator': 'Employer Tax Calculator',
  'employee-cost-calculator': 'Employee Cost Calculator',
  'workers-comp-calculator': 'Workers Comp Calculator',
  'commission-pay-calculator': 'Commission Pay Calculator',
  'shift-differential-calculator': 'Shift Differential',
  'salary-increase-calculator': 'Salary Increase Calculator',
  'severance-pay-calculator': 'Severance Pay Calculator',
  'final-paycheck-calculator': 'Final Paycheck Calculator',
  'cobra-insurance-calculator': 'COBRA Insurance',
  'hours-worked-calculator': 'Hours Worked Calculator',
  'time-card-calculator': 'Time Card Calculator',
  'payroll-hours-calculator': 'Payroll Hours Calculator',
  'payroll-cost-calculator': 'Payroll Cost Calculator',
  'cost-per-hire-calculator': 'Cost Per Hire',
  'fmla-leave-calculator': 'FMLA Leave Calculator',
  'unemployment-benefits-calculator': 'Unemployment Benefits',
  'state-payroll-tax-rates': 'State Payroll Tax Rates',
  // Batch 4
  'cd-calculator': 'CD Calculator',
  'credit-card-payoff-calculator': 'Credit Card Payoff',
  'extra-mortgage-payment-calculator': 'Extra Mortgage Payment',
  '401k-loan-calculator': '401k Loan Calculator',
  'balance-transfer-calculator': 'Balance Transfer Calculator',
  'parent-plus-loan-calculator': 'Parent PLUS Loan Calculator',
  'estate-tax-calculator': 'Estate Tax Calculator',
  'dividend-yield-calculator': 'Dividend Yield Calculator',
  'total-compensation-calculator': 'Total Compensation',
  'fuel-savings-calculator': 'Fuel Savings Calculator',
};

const RELATED = {
  // ── Tax ──
  'payroll-tax-calculator': ['take-home-pay-calculator','income-tax-calculator','w4-withholding-calculator','net-to-gross-calculator'],
  'take-home-pay-calculator': ['payroll-tax-calculator','income-tax-calculator','net-to-gross-calculator','w4-withholding-calculator'],
  'income-tax-calculator': ['payroll-tax-calculator','self-employment-tax-calculator','capital-gains-tax-calculator','tax-refund-estimator'],
  'self-employment-tax-calculator': ['income-tax-calculator','quarterly-tax-calculator','1099-tax-calculator','1099-vs-w2-calculator'],
  'quarterly-tax-calculator': ['self-employment-tax-calculator','income-tax-calculator','1099-tax-calculator','effective-tax-rate-calculator'],
  'capital-gains-tax-calculator': ['income-tax-calculator','effective-tax-rate-calculator','rate-of-return-calculator','roth-ira-calculator'],
  'bonus-tax-calculator': ['payroll-tax-calculator','income-tax-calculator','take-home-pay-calculator','w4-withholding-calculator'],
  'effective-tax-rate-calculator': ['income-tax-calculator','capital-gains-tax-calculator','self-employment-tax-calculator','tax-refund-estimator'],
  'tax-refund-estimator': ['income-tax-calculator','w4-withholding-calculator','effective-tax-rate-calculator','payroll-tax-calculator'],
  'w4-withholding-calculator': ['payroll-tax-calculator','income-tax-calculator','tax-refund-estimator','take-home-pay-calculator'],
  '1099-tax-calculator': ['self-employment-tax-calculator','quarterly-tax-calculator','1099-vs-w2-calculator','income-tax-calculator'],
  '1099-vs-w2-calculator': ['1099-tax-calculator','self-employment-tax-calculator','payroll-tax-calculator','take-home-pay-calculator'],
  'mileage-reimbursement-calculator': ['self-employment-tax-calculator','quarterly-tax-calculator','payroll-tax-calculator','section-179-deduction-calculator'],
  'section-179-deduction-calculator': ['self-employment-tax-calculator','income-tax-calculator','business-loan-calculator','roi-calculator'],
  // ── Mortgage / RE ──
  'mortgage-calculator': ['mortgage-affordability-calculator','property-tax-calculator','closing-costs-calculator','adjustable-rate-mortgage-calculator'],
  'mortgage-affordability-calculator': ['mortgage-calculator','property-tax-calculator','closing-costs-calculator','income-tax-calculator'],
  'adjustable-rate-mortgage-calculator': ['mortgage-calculator','mortgage-affordability-calculator','refinance-calculator','home-equity-loan-calculator'],
  'home-equity-loan-calculator': ['heloc-calculator','mortgage-calculator','refinance-calculator','property-tax-calculator'],
  'heloc-calculator': ['home-equity-loan-calculator','mortgage-calculator','refinance-calculator','debt-consolidation-calculator'],
  'closing-costs-calculator': ['mortgage-calculator','mortgage-affordability-calculator','property-tax-calculator','adjustable-rate-mortgage-calculator'],
  'property-tax-calculator': ['mortgage-calculator','mortgage-affordability-calculator','closing-costs-calculator','home-equity-loan-calculator'],
  'refinance-calculator': ['mortgage-calculator','adjustable-rate-mortgage-calculator','home-equity-loan-calculator','auto-refinance-calculator'],
  'reverse-mortgage-calculator': ['mortgage-calculator','home-equity-loan-calculator','retirement-calculator','social-security-benefits-calculator'],
  'cap-rate-calculator': ['roi-calculator','mortgage-calculator','property-tax-calculator','profit-margin-calculator'],
  // ── Loans ──
  'car-loan-calculator': ['auto-refinance-calculator','personal-loan-calculator','debt-consolidation-calculator','budget-calculator'],
  'auto-refinance-calculator': ['car-loan-calculator','personal-loan-calculator','debt-consolidation-calculator','savings-goal-calculator'],
  'personal-loan-calculator': ['debt-consolidation-calculator','car-loan-calculator','debt-payoff-calculator','savings-goal-calculator'],
  'sba-loan-calculator': ['business-loan-calculator','break-even-calculator','roi-calculator','profit-margin-calculator'],
  'business-loan-calculator': ['sba-loan-calculator','break-even-calculator','roi-calculator','section-179-deduction-calculator'],
  'student-loan-repayment-calculator': ['debt-consolidation-calculator','debt-payoff-calculator','savings-goal-calculator','income-tax-calculator'],
  'debt-consolidation-calculator': ['debt-payoff-calculator','personal-loan-calculator','auto-refinance-calculator','student-loan-repayment-calculator'],
  'debt-payoff-calculator': ['debt-consolidation-calculator','personal-loan-calculator','budget-calculator','savings-goal-calculator'],
  // ── Retirement / Savings ──
  'roth-ira-calculator': ['roth-ira-conversion-calculator','compound-interest-calculator','retirement-calculator','social-security-benefits-calculator'],
  'roth-ira-conversion-calculator': ['roth-ira-calculator','ira-rollover-calculator','income-tax-calculator','compound-interest-calculator'],
  'ira-rollover-calculator': ['roth-ira-conversion-calculator','roth-ira-calculator','required-minimum-distribution-calculator','retirement-calculator'],
  'required-minimum-distribution-calculator': ['roth-ira-calculator','ira-rollover-calculator','pension-calculator','social-security-benefits-calculator'],
  'pension-calculator': ['social-security-benefits-calculator','annuity-calculator','retirement-calculator','how-long-will-my-money-last-calculator'],
  'annuity-calculator': ['pension-calculator','how-long-will-my-money-last-calculator','compound-interest-calculator','retirement-calculator'],
  'life-insurance-calculator': ['social-security-benefits-calculator','retirement-calculator','budget-calculator','income-tax-calculator'],
  'compound-interest-calculator': ['savings-goal-calculator','rate-of-return-calculator','roth-ira-calculator','529-college-savings-calculator'],
  'retirement-calculator': ['social-security-benefits-calculator','roth-ira-calculator','how-long-will-my-money-last-calculator','pension-calculator'],
  'social-security-benefits-calculator': ['retirement-calculator','how-long-will-my-money-last-calculator','pension-calculator','roth-ira-calculator'],
  'how-long-will-my-money-last-calculator': ['social-security-benefits-calculator','savings-goal-calculator','rate-of-return-calculator','retirement-calculator'],
  'savings-goal-calculator': ['compound-interest-calculator','rate-of-return-calculator','529-college-savings-calculator','budget-calculator'],
  'savings-calculator': ['savings-goal-calculator','compound-interest-calculator','rate-of-return-calculator','budget-calculator'],
  'rate-of-return-calculator': ['compound-interest-calculator','savings-goal-calculator','roth-ira-calculator','retirement-calculator'],
  '529-college-savings-calculator': ['savings-goal-calculator','compound-interest-calculator','rate-of-return-calculator','roth-ira-calculator'],
  // ── Business ──
  'roi-calculator': ['break-even-calculator','profit-margin-calculator','rate-of-return-calculator','business-valuation-calculator'],
  'break-even-calculator': ['roi-calculator','profit-margin-calculator','business-loan-calculator','cogs-calculator'],
  'profit-margin-calculator': ['markup-calculator','cogs-calculator','break-even-calculator','roi-calculator'],
  'business-valuation-calculator': ['roi-calculator','break-even-calculator','profit-margin-calculator','business-loan-calculator'],
  'cogs-calculator': ['profit-margin-calculator','markup-calculator','break-even-calculator','roi-calculator'],
  'markup-calculator': ['profit-margin-calculator','cogs-calculator','break-even-calculator','roi-calculator'],
  'burn-rate-calculator': ['break-even-calculator','business-loan-calculator','roi-calculator','budget-calculator'],
  'cost-of-living-calculator': ['budget-calculator','salary-to-hourly-calculator','take-home-pay-calculator','income-tax-calculator'],
  'budget-calculator': ['savings-goal-calculator','debt-payoff-calculator','take-home-pay-calculator','cost-of-living-calculator'],
  // ── Payroll/HR ──
  'overtime-pay-calculator': ['payroll-tax-calculator','salary-to-hourly-calculator','take-home-pay-calculator','hours-worked-calculator'],
  'pto-accrual-calculator': ['payroll-tax-calculator','overtime-pay-calculator','fmla-leave-calculator','hours-worked-calculator'],
  'free-payroll-calculator': ['payroll-tax-calculator','take-home-pay-calculator','employer-tax-calculator','net-to-gross-calculator'],
  'employer-tax-calculator': ['payroll-tax-calculator','workers-comp-calculator','employee-cost-calculator','payroll-cost-calculator'],
  'employee-cost-calculator': ['employer-tax-calculator','payroll-cost-calculator','workers-comp-calculator','cost-per-hire-calculator'],
  'workers-comp-calculator': ['employer-tax-calculator','payroll-tax-calculator','employee-cost-calculator','payroll-cost-calculator'],
  'commission-pay-calculator': ['payroll-tax-calculator','take-home-pay-calculator','salary-to-hourly-calculator','bonus-tax-calculator'],
  'shift-differential-calculator': ['payroll-tax-calculator','overtime-pay-calculator','take-home-pay-calculator','hours-worked-calculator'],
  'salary-increase-calculator': ['salary-to-hourly-calculator','take-home-pay-calculator','payroll-tax-calculator','cost-of-living-calculator'],
  'severance-pay-calculator': ['final-paycheck-calculator','payroll-tax-calculator','take-home-pay-calculator','cobra-insurance-calculator'],
  'final-paycheck-calculator': ['severance-pay-calculator','payroll-tax-calculator','take-home-pay-calculator','pto-accrual-calculator'],
  'cobra-insurance-calculator': ['severance-pay-calculator','final-paycheck-calculator','unemployment-benefits-calculator','budget-calculator'],
  'hours-worked-calculator': ['time-card-calculator','payroll-hours-calculator','overtime-pay-calculator','salary-to-hourly-calculator'],
  'time-card-calculator': ['hours-worked-calculator','payroll-hours-calculator','overtime-pay-calculator','payroll-tax-calculator'],
  'payroll-hours-calculator': ['hours-worked-calculator','time-card-calculator','overtime-pay-calculator','payroll-tax-calculator'],
  'payroll-cost-calculator': ['employer-tax-calculator','employee-cost-calculator','workers-comp-calculator','payroll-tax-calculator'],
  'cost-per-hire-calculator': ['employee-cost-calculator','payroll-cost-calculator','employer-tax-calculator','budget-calculator'],
  'fmla-leave-calculator': ['pto-accrual-calculator','payroll-tax-calculator','hours-worked-calculator','cobra-insurance-calculator'],
  'unemployment-benefits-calculator': ['cobra-insurance-calculator','severance-pay-calculator','final-paycheck-calculator','budget-calculator'],
  'salary-to-hourly-calculator': ['take-home-pay-calculator','payroll-tax-calculator','overtime-pay-calculator','net-to-gross-calculator'],
  'net-to-gross-calculator': ['payroll-tax-calculator','take-home-pay-calculator','income-tax-calculator','w4-withholding-calculator'],
  'percentage-calculator': ['markup-calculator','profit-margin-calculator','salary-increase-calculator','rate-of-return-calculator'],
  // Batch 4
  'cd-calculator': ['savings-goal-calculator','compound-interest-calculator','savings-calculator','rate-of-return-calculator'],
  'credit-card-payoff-calculator': ['balance-transfer-calculator','debt-consolidation-calculator','debt-payoff-calculator','personal-loan-calculator'],
  'extra-mortgage-payment-calculator': ['mortgage-calculator','refinance-calculator','mortgage-affordability-calculator','savings-goal-calculator'],
  '401k-loan-calculator': ['retirement-calculator','roth-ira-calculator','compound-interest-calculator','personal-loan-calculator'],
  'balance-transfer-calculator': ['credit-card-payoff-calculator','debt-consolidation-calculator','personal-loan-calculator','debt-payoff-calculator'],
  'parent-plus-loan-calculator': ['student-loan-repayment-calculator','debt-consolidation-calculator','personal-loan-calculator','savings-goal-calculator'],
  'estate-tax-calculator': ['income-tax-calculator','capital-gains-tax-calculator','roth-ira-calculator','retirement-calculator'],
  'dividend-yield-calculator': ['rate-of-return-calculator','compound-interest-calculator','roth-ira-calculator','savings-goal-calculator'],
  'total-compensation-calculator': ['take-home-pay-calculator','payroll-tax-calculator','salary-to-hourly-calculator','budget-calculator'],
  'fuel-savings-calculator': ['budget-calculator','cost-of-living-calculator','savings-goal-calculator','total-compensation-calculator'],
};

// State pages all get the same 4 related tools
const STATE_RELATED = ['state-payroll-tax-rates','payroll-tax-calculator','take-home-pay-calculator','income-tax-calculator'];

const RELATED_CSS = `<style>.related-section{margin-top:48px;padding-top:32px;border-top:1px solid var(--border)}.related-title{font-size:18px;font-weight:700;color:var(--ink-1);margin-bottom:16px}.related-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}@media(min-width:640px){.related-grid{grid-template-columns:repeat(4,1fr)}}.related-card{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-decoration:none;transition:border-color .15s,box-shadow .15s}.related-card:hover{border-color:var(--accent);box-shadow:0 2px 12px rgba(27,79,216,.1);text-decoration:none}.related-card-label{font-size:11px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}.related-card-name{font-size:14px;font-weight:600;color:var(--ink-1);line-height:1.3}.related-card-arrow{margin-top:auto;padding-top:10px;font-size:11px;color:var(--accent);font-weight:700}</style>`;

function buildRelatedHTML(slugs) {
  return `${RELATED_CSS}<section class="related-section"><h2 class="related-title">Related Calculators</h2><div class="related-grid">${
    slugs.map(s => {
      const name = TITLES[s] || s.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      return `<a href="/${s}" class="related-card"><div class="related-card-label">Calculator</div><div class="related-card-name">${name}</div><div class="related-card-arrow">Use tool →</div></a>`;
    }).join('')
  }</div></section>`;
}

const SKIP = new Set(['index','tools','about','privacy','terms','blog','direct-deposit-form','invoice-generator-free','pay-stub-generator','minimum-wage-by-state']);

let built = 0, skipped = 0, alreadyHas = 0;

const files = fs.readdirSync(B).filter(f => f.endsWith('.html') && !f.startsWith('_'));

files.forEach(file => {
  const slug = file.replace('.html','');
  if (SKIP.has(slug)) { skipped++; return; }

  let html = fs.readFileSync(B+file,'utf8');

  // Skip if already injected
  if (html.includes('related-section')) { alreadyHas++; return; }

  // Determine which related slugs to use
  let related;
  if (slug.endsWith('-payroll-tax-calculator') && slug !== 'payroll-tax-calculator') {
    related = STATE_RELATED;
  } else {
    related = RELATED[slug];
  }

  if (!related || !related.length) { skipped++; return; }

  // Filter to slugs that actually exist
  related = related.filter(s => fs.existsSync(B+s+'.html'));
  if (!related.length) { skipped++; return; }

  const section = buildRelatedHTML(related);

  // Insert before </main>
  if (html.includes('</main>')) {
    html = html.replace('</main>', section + '</main>');
    fs.writeFileSync(B+file, html);
    built++;
  } else {
    skipped++;
  }
});

console.log(`Related calculators injected: ${built} pages | skipped: ${skipped} | already had: ${alreadyHas}`);
