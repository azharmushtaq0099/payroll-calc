// Run: node gen-states.js
const fs = require('fs');
const path = require('path');

const base = fs.readFileSync(path.join(__dirname, 'california.html'), 'utf8');

const STATES = [
  {
    slug: 'texas',
    code: 'TX',
    name: 'Texas',
    title: 'Texas Take Home Pay Calculator 2026 — TX Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free Texas take home pay calculator for 2026. Texas has no state income tax — see your exact paycheck after federal taxes and FICA only. All pay frequencies. Great for remote workers and those relocating to TX.',
    h1: 'Texas Take Home Pay Calculator',
    intro: 'Texas has <strong>no state income tax</strong>, making it one of the most tax-friendly states for workers. Your paycheck deductions in Texas are limited to federal income tax, Social Security, and Medicare — no state withholding.',
    stateSection: `
<h2>About Texas Income Tax (There Is None)</h2>
<p>Texas is one of nine states with no individual income tax, alongside Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Washington, and Wyoming. Texas funds state government primarily through sales tax (6.25% base, up to 8.25% with local additions) and property taxes — not income taxes.</p>
<h3>Tax Facts for Texas Workers</h3>
<ul>
  <li>State income tax: <strong>0%</strong></li>
  <li>No SDI (state disability insurance)</li>
  <li>No local income taxes in Texas cities</li>
  <li>Texas sales tax: 6.25% state + local up to 2%</li>
</ul>
<h3>Example: $75,000 Annual Salary in Texas (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>Texas State Tax</td><td>$0</td><td>$0</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$15,254</strong></td><td><strong>$587</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$59,746</strong></td><td><strong>$2,298</strong></td></tr>
</tbody></table>
<p><strong>Effective federal + FICA rate:</strong> 20.3% — compared to 25–35% in high-tax states like California or New York.</p>`,
    preselect: 'TX'
  },
  {
    slug: 'florida',
    code: 'FL',
    name: 'Florida',
    title: 'Florida Take Home Pay Calculator 2026 — FL Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free Florida take home pay calculator for 2026. Florida has no state income tax — see your exact paycheck after federal taxes and FICA. All pay frequencies. Popular for retirees and remote workers.',
    h1: 'Florida Take Home Pay Calculator',
    intro: 'Florida has <strong>no state income tax</strong> — one of only nine states. Your Florida paycheck is reduced only by federal income tax, Social Security, and Medicare. No state withholding, ever.',
    stateSection: `
<h2>About Florida Income Tax (There Is None)</h2>
<p>Florida has had no personal income tax since 1855, making it a perennial top destination for retirees, high earners, and remote workers fleeing high-tax states. Florida raises revenue through its 6% state sales tax (up to 8.5% with county surcharges) and property taxes.</p>
<h3>Tax Facts for Florida Workers</h3>
<ul>
  <li>State income tax: <strong>0%</strong></li>
  <li>No SDI or state disability insurance</li>
  <li>No local income tax in any Florida city or county</li>
  <li>No Florida estate or inheritance tax</li>
</ul>
<h3>Example: $75,000 Annual Salary in Florida (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>Florida State Tax</td><td>$0</td><td>$0</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$15,254</strong></td><td><strong>$587</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$59,746</strong></td><td><strong>$2,298</strong></td></tr>
</tbody></table>`,
    preselect: 'FL'
  },
  {
    slug: 'illinois',
    code: 'IL',
    name: 'Illinois',
    title: 'Illinois Take Home Pay Calculator 2026 — IL Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free Illinois take home pay calculator for 2026. See your exact paycheck after Illinois flat 4.95% state income tax, federal taxes, and FICA. All pay frequencies. Updated for 2026 IL rates.',
    h1: 'Illinois Take Home Pay Calculator',
    intro: 'Illinois uses a <strong>flat 4.95% state income tax</strong> rate on all income — one of the simplest state tax structures in the country. Every dollar of income above the minimum is taxed at the same rate, making Illinois withholding highly predictable.',
    stateSection: `
<h2>About Illinois Income Tax</h2>
<p>Illinois is one of only a few states that taxes all income at a single flat rate. The 4.95% rate (increased from 3.75% in 2017) applies to all individual income regardless of amount. There is no standard deduction for Illinois income tax, though certain exemptions apply (personal exemption: $2,425 per return + $2,425 per dependent).</p>
<h3>Tax Facts for Illinois Workers</h3>
<ul>
  <li>State income tax rate: <strong>4.95% (flat)</strong></li>
  <li>Personal exemption: $2,425 per filer</li>
  <li>No local income tax for Chicago or other municipalities</li>
  <li>Social Security and retirement income exempt from IL tax</li>
</ul>
<h3>Example: $75,000 Annual Salary in Illinois (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>Illinois State Tax (4.95%)</td><td>$3,713</td><td>$143</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$18,967</strong></td><td><strong>$730</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$56,033</strong></td><td><strong>$2,155</strong></td></tr>
</tbody></table>`,
    preselect: 'IL'
  },
  {
    slug: 'pennsylvania',
    code: 'PA',
    name: 'Pennsylvania',
    title: 'Pennsylvania Take Home Pay Calculator 2026 — PA Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free Pennsylvania take home pay calculator for 2026. See your paycheck after PA flat 3.07% income tax, federal taxes, and FICA. Many PA cities also have local earned income tax. All pay frequencies.',
    h1: 'Pennsylvania Take Home Pay Calculator',
    intro: 'Pennsylvania uses a <strong>flat 3.07% state income tax</strong> rate — among the lowest flat rates in the nation. Note that many Pennsylvania cities and municipalities also impose a local earned income tax (typically 1–3.9%), which can significantly add to your total tax burden.',
    stateSection: `
<h2>About Pennsylvania Income Tax</h2>
<p>Pennsylvania taxes income at a flat 3.07% rate with no deductions or exemptions for wages (except certain tax-exempt income types). This is one of the lowest flat rates among states that have a personal income tax. However, Pennsylvania workers in Philadelphia, Pittsburgh, or other municipalities also pay local earned income tax on top of the state rate.</p>
<h3>Key Pennsylvania Tax Rates</h3>
<ul>
  <li>State income tax: <strong>3.07% (flat)</strong></li>
  <li>Philadelphia wage tax (residents): 3.75%</li>
  <li>Philadelphia wage tax (non-residents): 3.44%</li>
  <li>Pittsburgh earned income tax: 3% (city + school district)</li>
  <li>Other PA municipalities: 0% to 3.9% local EIT</li>
</ul>
<h3>Example: $75,000 Annual Salary in Pennsylvania (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>Pennsylvania State Tax (3.07%)</td><td>$2,303</td><td>$89</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$17,557</strong></td><td><strong>$675</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$57,443</strong></td><td><strong>$2,209</strong></td></tr>
</tbody></table>
<p><em>Note: Philadelphia or Pittsburgh workers should add local EIT (3–4%) to the above totals.</em></p>`,
    preselect: 'PA'
  },
  {
    slug: 'ohio',
    code: 'OH',
    name: 'Ohio',
    title: 'Ohio Take Home Pay Calculator 2026 — OH Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free Ohio take home pay calculator for 2026. See your exact paycheck after Ohio graduated income tax (up to 3.226%), federal taxes, and FICA. All pay frequencies. Updated for 2026 OH rates.',
    h1: 'Ohio Take Home Pay Calculator',
    intro: 'Ohio has a <strong>graduated income tax</strong> with a top rate of 3.226% — one of the lower state rates nationally. Many Ohio cities (Columbus, Cleveland, Cincinnati) also impose a local income tax that\'s automatically withheld from paychecks.',
    stateSection: `
<h2>About Ohio Income Tax</h2>
<p>Ohio taxes income on a graduated scale with three brackets for 2026. The state also eliminated the income tax on the first $26,050 of income in recent years, providing relief to lower earners. Many Ohio workers also face city income tax withheld by their employer.</p>
<h3>2026 Ohio Tax Brackets (Single)</h3>
<table class="state-tax-table"><thead><tr><th>Income</th><th>Rate</th></tr></thead><tbody>
<tr><td>$0 – $26,050</td><td>0%</td></tr>
<tr><td>$26,051 – $92,150</td><td>2.765%</td></tr>
<tr><td>Over $92,150</td><td>3.226%</td></tr>
</tbody></table>
<h3>Common Ohio City Income Tax Rates</h3>
<ul>
  <li>Columbus: 2.5%</li>
  <li>Cleveland: 2.5%</li>
  <li>Cincinnati: 1.8%</li>
  <li>Toledo: 2.25%</li>
</ul>
<h3>Example: $75,000 Annual Salary in Ohio (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>Ohio State Tax (~2.3%)</td><td>$1,735</td><td>$67</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$16,989</strong></td><td><strong>$654</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$58,011</strong></td><td><strong>$2,231</strong></td></tr>
</tbody></table>`,
    preselect: 'OH'
  },
  {
    slug: 'georgia',
    code: 'GA',
    name: 'Georgia',
    title: 'Georgia Take Home Pay Calculator 2026 — GA Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free Georgia take home pay calculator for 2026. See your paycheck after Georgia\'s flat 5.49% state income tax, federal taxes, and FICA. All pay frequencies. Updated for 2026 GA flat tax rates.',
    h1: 'Georgia Take Home Pay Calculator',
    intro: 'Georgia converted to a <strong>flat 5.49% state income tax</strong> rate in recent years, transitioning away from its graduated bracket system. The flat rate simplifies withholding calculations for Georgia workers and employers.',
    stateSection: `
<h2>About Georgia Income Tax</h2>
<p>Georgia enacted legislation to transition from a graduated income tax to a flat rate. For 2026, the rate is 5.49% on all taxable income. Georgia's flat tax makes it straightforward to estimate take-home pay — multiply any income by 5.49% for the state withholding amount.</p>
<h3>Tax Facts for Georgia Workers</h3>
<ul>
  <li>State income tax: <strong>5.49% (flat, 2026)</strong></li>
  <li>Rate scheduled to decrease further in future years</li>
  <li>Standard deduction: $5,400 (single) / $7,100 (MFJ) — but this calculator uses the flat rate method for withholding estimation</li>
  <li>No local income taxes in Georgia</li>
</ul>
<h3>Example: $75,000 Annual Salary in Georgia (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>Georgia State Tax (5.49%)</td><td>$4,118</td><td>$158</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$19,372</strong></td><td><strong>$745</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$55,628</strong></td><td><strong>$2,140</strong></td></tr>
</tbody></table>`,
    preselect: 'GA'
  },
  {
    slug: 'north-carolina',
    code: 'NC',
    name: 'North Carolina',
    title: 'North Carolina Take Home Pay Calculator 2026 — NC Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free North Carolina take home pay calculator for 2026. See your exact paycheck after NC flat 4.5% state income tax, federal taxes, and FICA. All pay frequencies. Updated 2026 NC tax rates.',
    h1: 'North Carolina Take Home Pay Calculator',
    intro: 'North Carolina taxes income at a <strong>flat 4.5% rate</strong> for 2026 — reduced from 4.75% in prior years. The flat structure makes NC withholding simple to calculate, and the state has been steadily lowering its rate in recent years.',
    stateSection: `
<h2>About North Carolina Income Tax</h2>
<p>North Carolina converted to a flat income tax rate and has been reducing it incrementally. The 2026 rate of 4.5% is part of a legislated phase-down schedule. This makes NC one of the more tax-friendly states in the Southeast, especially for higher earners who benefited most from the switch away from graduated brackets.</p>
<h3>Tax Facts for North Carolina Workers</h3>
<ul>
  <li>State income tax: <strong>4.5% (flat, 2026)</strong></li>
  <li>Rate scheduled to continue declining toward 3.99% by 2027</li>
  <li>Standard deduction: $10,750 (single) / $21,500 (MFJ)</li>
  <li>No local income taxes in NC cities</li>
</ul>
<h3>Example: $75,000 Annual Salary in North Carolina (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>NC State Tax (4.5%)</td><td>$3,375</td><td>$130</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$18,629</strong></td><td><strong>$717</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$56,371</strong></td><td><strong>$2,168</strong></td></tr>
</tbody></table>`,
    preselect: 'NC'
  },
  {
    slug: 'washington',
    code: 'WA',
    name: 'Washington',
    title: 'Washington State Take Home Pay Calculator 2026 — WA Paycheck After Taxes | FreePayrollCalc',
    desc: 'Free Washington state take home pay calculator for 2026. Washington has no state income tax — see your exact paycheck after federal taxes and FICA only. All pay frequencies. WA Cares Fund included.',
    h1: 'Washington State Take Home Pay Calculator',
    intro: 'Washington has <strong>no state income tax</strong> on wages. However, Washington workers pay into WA Cares Fund (0.58% long-term care insurance), and Seattle and other areas have a higher cost of living that partially offsets the tax advantage.',
    stateSection: `
<h2>About Washington State Income Tax</h2>
<p>Washington is one of nine US states with no individual income tax. The state relies on its 6.5% sales tax (up to 10.4% in some areas) and business and occupation (B&O) tax for revenue. In 2022, Washington enacted a 7% capital gains tax on long-term gains over $250,000 — but this does not apply to wages or ordinary income.</p>
<h3>Tax Facts for Washington Workers</h3>
<ul>
  <li>State income tax: <strong>0%</strong></li>
  <li>WA Cares Fund (long-term care): 0.58% — withheld from wages</li>
  <li>Paid Family and Medical Leave (PFML): 0.74% (split employer/employee)</li>
  <li>No local income tax in any Washington city</li>
  <li>Capital gains tax (7%) applies only to investment gains over $250,000</li>
</ul>
<h3>Example: $75,000 Annual Salary in Washington (Single, Biweekly)</h3>
<table class="state-tax-table"><thead><tr><th>Deduction</th><th>Annual</th><th>Per Paycheck</th></tr></thead><tbody>
<tr><td>Federal Income Tax</td><td>$9,516</td><td>$366</td></tr>
<tr><td>Social Security (6.2%)</td><td>$4,650</td><td>$179</td></tr>
<tr><td>Medicare (1.45%)</td><td>$1,088</td><td>$42</td></tr>
<tr><td>WA State Income Tax</td><td>$0</td><td>$0</td></tr>
<tr><td><strong>Total Deductions</strong></td><td><strong>$15,254</strong></td><td><strong>$587</strong></td></tr>
<tr class="net-row"><td><strong>Take Home Pay</strong></td><td><strong>$59,746</strong></td><td><strong>$2,298</strong></td></tr>
</tbody></table>
<p><em>Note: WA Cares Fund (0.58%) is a separate deduction not included in the tax totals above.</em></p>`,
    preselect: 'WA'
  }
];

const STATE_TABLE_STYLE = `
<style>
.state-tax-table{width:100%;border-collapse:collapse;margin:16px 0;font-size:14px}
.state-tax-table th{background:var(--bg);padding:10px 12px;text-align:left;font-weight:600;border-bottom:2px solid var(--border)}
.state-tax-table td{padding:10px 12px;border-bottom:1px solid var(--border)}
.state-tax-table .net-row{background:rgba(5,150,105,.06)}
.state-tax-table .net-row td{font-weight:700;color:var(--green)}
</style>`;

for (const st of STATES) {
  let html = base;

  // Title
  html = html.replace(
    /California Take Home Pay Calculator 2026 — CA Paycheck After Taxes \| FreePayrollCalc/g,
    st.title
  );
  // Meta desc
  html = html.replace(
    /Free California take home pay calculator for 2026[^"]+/,
    st.desc
  );
  // OG title
  html = html.replace(
    /California Take Home Pay Calculator 2026 — CA Paycheck After Taxes/g,
    st.title.replace(' | FreePayrollCalc','')
  );
  // Canonical
  html = html.replace(
    'https://www.freepayrollcalc.com/take-home-pay-calculator/california',
    `https://www.freepayrollcalc.com/take-home-pay-calculator/${st.slug}`
  );
  // H1
  html = html.replace(
    'California Take Home Pay Calculator',
    st.h1
  );
  // Breadcrumb text
  html = html.replace(
    /Take Home Pay Calculator › California/g,
    `Take Home Pay Calculator › ${st.name}`
  );
  html = html.replace(
    /aria-current="page">California/g,
    `aria-current="page">${st.name}`
  );
  // Intro paragraph
  html = html.replace(
    /California has[^<]+<\/strong>[^<]*(SDI[^<]+)?(<\/p>)?/,
    `${st.intro}</p>`
  );

  // Pre-select state
  html = html.replace(
    "document.getElementById('state').value = 'CA';",
    `document.getElementById('state').value = '${st.preselect}';`
  );

  // Replace the CA state info section with state-specific content
  // Look for the "About California Income Tax" section and replace it
  const caSection = html.indexOf('<h2>About California Income Tax</h2>');
  if (caSection !== -1) {
    // Find end of section (next h2 or the article-inner closing)
    const sectionEnd = html.indexOf('</section>', caSection);
    if (sectionEnd !== -1) {
      html = html.slice(0, caSection) + st.stateSection + html.slice(sectionEnd);
    }
  }

  // WebApplication schema name + url
  html = html.replace(
    '"name": "California Take Home Pay Calculator 2026"',
    `"name": "${st.name} Take Home Pay Calculator 2026"`
  );
  html = html.replace(
    /California 1%–13\.3% progressive state income tax/g,
    `${st.name} state income tax`
  );
  html = html.replace(
    /California SDI 1\.1% with no wage cap/g,
    `${st.name} state deductions`
  );

  // Add state table style after </style> in head
  html = html.replace('</style>', STATE_TABLE_STYLE + '\n</style>');

  fs.writeFileSync(path.join(__dirname, `${st.slug}.html`), html, 'utf8');
  console.log(`✓ Generated ${st.slug}.html`);
}

console.log('\nAll 8 state pages generated.');
