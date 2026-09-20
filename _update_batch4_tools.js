/**
 * Adds Batch 4 calculator links to tools.html category sections
 * and updates counts to 151+
 * node _update_batch4_tools.js
 */
const fs = require('fs');
const B = 'C:/Users/mastr/claude co/payroll-calc/';

const iconBank = {
  dollar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  trend: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  home: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  piggy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 6.37A9 9 0 1 0 21 12h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1A9 9 0 0 0 19 6.37z"/><path d="M12 8v4l3 3"/></svg>`,
  car: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
};

function row(href, color, iconKey, name, desc) {
  return `\n          <a href="${href}" class="tool-row" data-enter>\n            <div class="tool-row-icon tc-${color}">${iconBank[iconKey]||iconBank.dollar}</div>\n            <div class="tool-row-body"><div class="tool-row-name">${name}</div><div class="tool-row-desc">${desc}</div></div>\n          </a>`;
}

let tools = fs.readFileSync(B+'tools.html','utf8');

// ── Add 5 new loan/debt tools to the Loans & Debt section ───────────────────
// Find the end of the Loans block (after business-loan-calculator row)
tools = tools.replace(
  `<span class="tool-list-count">8 tools</span>`,
  `<span class="tool-list-count">13 tools</span>`
);
tools = tools.replace(
  `row('/business-loan-calculator','green','dollar','Business Loan Calculator','Business loan payment schedule with principal/interest breakdown.')\n        }</div>`,
  `row('/business-loan-calculator','green','dollar','Business Loan Calculator','Business loan payment schedule with principal/interest breakdown.')\n        }</div>`
);

// Insert 5 new loan rows before the closing </div></div> of loans section
const loansInsert =
  row('/credit-card-payoff-calculator','amber','dollar','Credit Card Payoff Calculator','Months to pay off any card balance at fixed or minimum payment. Shows interest saved vs minimum.') +
  row('/balance-transfer-calculator','green','dollar','Balance Transfer Calculator','0% APR savings, transfer fee payback, and whether you\'ll pay off before promo ends.') +
  row('/extra-mortgage-payment-calculator','blue','home','Extra Mortgage Payment Calculator','Interest saved and years cut by making extra monthly or lump-sum mortgage payments.') +
  row('/401k-loan-calculator','amber','shield','401k Loan Calculator','True cost of borrowing from your 401k — including lost investment growth.') +
  row('/parent-plus-loan-calculator','blue','dollar','Parent PLUS Loan Calculator','Monthly payment and total cost at 2026 federal rate (9.08%). All repayment plans.');

tools = tools.replace(
  `row('/business-loan-calculator','green','dollar','Business Loan Calculator','Business loan payment schedule with principal/interest breakdown.')
        }</div>
      </div>`,
  `row('/business-loan-calculator','green','dollar','Business Loan Calculator','Business loan payment schedule with principal/interest breakdown.')${loansInsert}
        }</div>
      </div>`
);

// ── Add 4 new savings/investment tools to the Retirement & Savings section ──
tools = tools.replace(
  `<span class="tool-list-count">15 tools</span>`,
  `<span class="tool-list-count">19 tools</span>`
);
const savingsInsert =
  row('/cd-calculator','green','piggy','CD Calculator','Certificate of deposit earnings, APY vs APR, and CD laddering strategy. 165K monthly searches.') +
  row('/dividend-yield-calculator','blue','trend','Dividend Yield Calculator','Annual income, yield on cost, and DRIP compounding for any stock or portfolio.') +
  row('/estate-tax-calculator','amber','shield','Estate Tax Calculator','Federal estate tax with 2026\'s $13.99M exemption. Progressive bracket calculation.') +
  row('/total-compensation-calculator','blue','dollar','Total Compensation Calculator','Full job offer value: salary + health insurance + 401k match + PTO + equity + bonus.');

tools = tools.replace(
  `row('/life-insurance-calculator','amber','shield','Life Insurance Calculator','Coverage needed using DIME method (debt, income, mortgage, education).')
        }</div>
      </div>`,
  `row('/life-insurance-calculator','amber','shield','Life Insurance Calculator','Coverage needed using DIME method (debt, income, mortgage, education).')${savingsInsert}
        }</div>
      </div>`
);

// ── Add fuel savings to mortgage section ────────────────────────────────────
// Update mortgage count
tools = tools.replace(
  `<span class="tool-list-count">10 tools</span>`,
  `<span class="tool-list-count">11 tools</span>`
);
tools = tools.replace(
  `row('/cap-rate-calculator','green','trend','Cap Rate Calculator','Capitalization rate and NOI for rental property investment analysis.')
        }</div>
      </div>`,
  `row('/cap-rate-calculator','green','trend','Cap Rate Calculator','Capitalization rate and NOI for rental property investment analysis.')${
    row('/fuel-savings-calculator','amber','car','Fuel Savings Calculator','Annual gas savings and break-even for switching to a hybrid or EV. Compare any two vehicles.')
  }
        }</div>
      </div>`
);

// ── Update all counts to 151+ ────────────────────────────────────────────────
tools = tools.replace(/140\+/g, '151+');
fs.writeFileSync(B+'tools.html', tools);
console.log('tools.html updated with Batch 4 tools');

// ── Update homepage ──────────────────────────────────────────────────────────
let home = fs.readFileSync(B+'index.html','utf8');
home = home.replace(/140\+/g, '151+');
fs.writeFileSync(B+'index.html', home);
console.log('index.html updated');
