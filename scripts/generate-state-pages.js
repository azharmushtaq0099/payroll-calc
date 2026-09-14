/**
 * Programmatic SEO — Payroll Tax Calculator State Pages
 * Generates /payroll-tax-calculator/[state].html for all 50 states + DC
 * Run: node scripts/generate-state-pages.js
 */
const fs = require('fs');
const path = require('path');

// ── STATE DATA ────────────────────────────────────────────────────────────────
const states = [
  // NO INCOME TAX (9 states)
  { slug:'alaska',       name:'Alaska',        abbr:'AK', type:'none',        topRate:0,     flat:null,
    special:[], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'Alaska is one of nine states with no state income tax. Workers keep significantly more of each paycheck.',
    highlight:'Alaska also has no statewide sales tax, making it one of the most tax-friendly states overall.' },
  { slug:'florida',      name:'Florida',       abbr:'FL', type:'none',        topRate:0,     flat:null,
    special:['Reemployment Tax (employer only, 0.10%–5.4%)'], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'Florida has no state income tax and no state disability insurance requirement for employees.',
    highlight:'Florida is one of the most popular states for remote workers and retirees because of its zero income tax.' },
  { slug:'nevada',       name:'Nevada',        abbr:'NV', type:'none',        topRate:0,     flat:null,
    special:[], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'Nevada has no state income tax. Combined with no corporate income tax, Nevada is a popular business-friendly state.',
    highlight:'Nevada makes up for lost income tax revenue through gaming taxes and sales tax (up to 8.375%).' },
  { slug:'new-hampshire',name:'New Hampshire', abbr:'NH', type:'none',        topRate:0,     flat:null,
    special:[], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'New Hampshire does not tax wages or salary. Historically it taxed interest and dividends, but that tax was fully repealed in 2025.',
    highlight:'New Hampshire is now fully income-tax-free for wages, making it unique among northeastern states.' },
  { slug:'south-dakota', name:'South Dakota',  abbr:'SD', type:'none',        topRate:0,     flat:null,
    special:[], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'South Dakota has no state income tax and no corporate income tax, making it one of the most business-friendly states in the country.',
    highlight:'South Dakota is a popular state for trust formation and financial company headquarters due to its tax structure.' },
  { slug:'tennessee',    name:'Tennessee',     abbr:'TN', type:'none',        topRate:0,     flat:null,
    special:[], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'Tennessee has no state income tax on wages. The Hall Income Tax on interest and dividends was fully repealed in 2021.',
    highlight:'Tennessee workers pay only federal income tax and FICA — no state income tax withholding is required on any paycheck.' },
  { slug:'texas',        name:'Texas',         abbr:'TX', type:'none',        topRate:0,     flat:null,
    special:[], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'Texas is the most populous no-income-tax state. With over 30 million residents, it proves large states can thrive without income tax.',
    highlight:'Texas compensates with property taxes (among the highest in the US) and a 6.25% state sales tax.' },
  { slug:'washington',   name:'Washington',    abbr:'WA', type:'none',        topRate:0,     flat:null,
    special:['Paid Family & Medical Leave (0.74% total, employee/employer split)', 'Long-Term Care Tax (0.58% employee, unless exempted)'], sdi:false, pfl:true, form:'Federal W-4 only',
    note:'Washington State has no income tax but does have mandatory Paid Family & Medical Leave and a Long-Term Care insurance payroll tax.',
    highlight:'Washington employees must pay 0.74% for PFML and 0.58% for the WA Cares (long-term care) fund unless they opt out.' },
  { slug:'wyoming',      name:'Wyoming',       abbr:'WY', type:'none',        topRate:0,     flat:null,
    special:[], sdi:false, pfl:false, form:'Federal W-4 only',
    note:'Wyoming has no state income tax, no corporate income tax, and no estate or inheritance tax. It is one of the most tax-competitive states.',
    highlight:'Wyoming funds state government primarily through mineral extraction taxes from oil, gas, and coal industries.' },

  // FLAT TAX STATES
  { slug:'arizona',       name:'Arizona',       abbr:'AZ', type:'flat', topRate:2.5,  flat:2.5,
    special:[], sdi:false, pfl:false, form:'Arizona Form A-4',
    note:'Arizona moved to a 2.5% flat income tax in 2023, one of the lowest flat rates in the US. All Arizona income is taxed at the same rate.',
    highlight:'Arizona\'s flat 2.5% rate replaced a tiered system with a top bracket of 8%, dramatically reducing taxes for higher earners.' },
  { slug:'colorado',      name:'Colorado',      abbr:'CO', type:'flat', topRate:4.4,  flat:4.4,
    special:['Family and Medical Leave Insurance (FAMLI) — 0.9% total, employee/employer split'], sdi:false, pfl:true, form:'Colorado DR 0004',
    note:'Colorado has a 4.4% flat income tax. Employees also pay into the FAMLI program for paid family leave coverage.',
    highlight:'Colorado\'s Proposition 121 reduced the flat rate from 4.55% to 4.4% effective 2022 and remains in effect for 2026.' },
  { slug:'georgia',       name:'Georgia',       abbr:'GA', type:'flat', topRate:5.49, flat:5.49,
    special:[], sdi:false, pfl:false, form:'Georgia Form G-4',
    note:'Georgia transitioned to a 5.49% flat income tax in 2024, with plans to reduce it to 4.99% by 2029.',
    highlight:'Georgia\'s flat tax rate applies to all taxable income, simplifying payroll calculations compared to the prior bracket system.' },
  { slug:'illinois',      name:'Illinois',      abbr:'IL', type:'flat', topRate:4.95, flat:4.95,
    special:[], sdi:false, pfl:false, form:'Illinois IL-W-4',
    note:'Illinois has a constitutionally mandated flat 4.95% income tax. All attempts to switch to a graduated tax have been rejected by voters.',
    highlight:'Illinois is unique in that its flat tax is written into the state constitution, requiring a voter referendum to change it.' },
  { slug:'indiana',       name:'Indiana',       abbr:'IN', type:'flat', topRate:3.05, flat:3.05,
    special:['County income tax (0.5%–3.38% depending on county)'], sdi:false, pfl:false, form:'Indiana WH-4',
    note:'Indiana has a 3.05% flat state income tax, but most counties also levy a local income tax ranging from 0.5% to 3.38%.',
    highlight:'Indiana\'s effective tax rate is often 4%–6% when county taxes are included. The county determines withholding based on where the employee lives.' },
  { slug:'kentucky',      name:'Kentucky',      abbr:'KY', type:'flat', topRate:4.0,  flat:4.0,
    special:[], sdi:false, pfl:false, form:'Kentucky K-4',
    note:'Kentucky moved to a 4.0% flat income tax in 2023, down from a top bracket of 6%. The rate is set to continue declining gradually.',
    highlight:'Kentucky aims to reduce its flat tax to 3.5% or lower by 2025–2026 as state revenues allow under its tax reform law.' },
  { slug:'louisiana',     name:'Louisiana',     abbr:'LA', type:'flat', topRate:3.0,  flat:3.0,
    special:[], sdi:false, pfl:false, form:'Louisiana L-4',
    note:'Louisiana moved to a 3.0% flat income tax in 2025, replacing a three-bracket system. This makes Louisiana one of the lowest flat-tax states.',
    highlight:'Louisiana\'s flat 3% rate is the result of a 2024 ballot measure that also lowered the corporate tax rate to a flat 5.5%.' },
  { slug:'massachusetts',  name:'Massachusetts', abbr:'MA', type:'flat', topRate:5.0,  flat:5.0,
    special:['Paid Family & Medical Leave (0.88% total)', 'Note: 9% surtax on income over $1 million'], sdi:false, pfl:true, form:'Massachusetts M-4',
    note:'Massachusetts has a 5.0% flat income tax plus a 4% surtax on income over $1 million. Employees also pay into Paid Family & Medical Leave.',
    highlight:'Massachusetts PFML requires employee contributions of up to 0.88% of wages, split between medical leave and family leave.' },
  { slug:'michigan',      name:'Michigan',      abbr:'MI', type:'flat', topRate:4.25, flat:4.25,
    special:['City income tax in Detroit (2.4% residents, 1.2% non-residents) and some other cities'], sdi:false, pfl:false, form:'Michigan MI-W4',
    note:'Michigan has a 4.25% flat state income tax. Detroit and several other cities also levy a local income tax on wages.',
    highlight:'Michigan employers must withhold both state and city income taxes. Detroit\'s 2.4% city tax applies to all residents regardless of where they work.' },
  { slug:'mississippi',   name:'Mississippi',   abbr:'MS', type:'flat', topRate:4.7,  flat:4.7,
    special:[], sdi:false, pfl:false, form:'Mississippi 89-350',
    note:'Mississippi moved to a 4.7% flat income tax in 2024 as part of a phased reform plan, with further reductions planned through 2030.',
    highlight:'Mississippi eliminated its 4% bracket and is on track to reduce the flat rate to 4.0% by 2030 under current law.' },
  { slug:'north-carolina', name:'North Carolina', abbr:'NC', type:'flat', topRate:3.99, flat:3.99,
    special:[], sdi:false, pfl:false, form:'North Carolina NC-4',
    note:'North Carolina has a 3.99% flat income tax for 2026. Session Law 2021-180 legislated annual cuts: 4.75% (2023) → 4.5% (2024) → 4.25% (2025) → 3.99% (2026).',
    highlight:'NC\'s 3.99% rate is confirmed in current law for 2026. Further cuts to 3.5% are planned for 2027–2030 if revenue triggers are met.' },
  { slug:'pennsylvania',  name:'Pennsylvania',  abbr:'PA', type:'flat', topRate:3.07, flat:3.07,
    special:['Local Earned Income Tax (1%–3.93% depending on municipality)', 'Philadelphia wage tax (3.75% residents, 3.44% non-residents)'], sdi:false, pfl:false, form:'Pennsylvania REV-419 (if claiming exemption)',
    note:'Pennsylvania has a 3.07% flat state income tax, but local earned income taxes add 1%–4% depending on municipality.',
    highlight:'Philadelphia has the highest local wage tax at 3.75% for residents — employers must register and withhold both state and city taxes.' },
  { slug:'utah',          name:'Utah',          abbr:'UT', type:'flat', topRate:4.65, flat:4.65,
    special:[], sdi:false, pfl:false, form:'Utah TC-40B (withholding certificate)',
    note:'Utah has a 4.65% flat income tax and does not have a state disability insurance or paid family leave tax.',
    highlight:'Utah reduced its flat rate from 4.85% to 4.65% in 2023, part of ongoing tax-cutting efforts in the state legislature.' },

  // PROGRESSIVE TAX STATES
  { slug:'alabama',       name:'Alabama',       abbr:'AL', type:'progressive', topRate:5.0,
    special:[], sdi:false, pfl:false, form:'Alabama A-4',
    note:'Alabama has a progressive income tax with three brackets: 2% up to $500, 4% on $501–$3,000, and 5% on income over $3,000. Most workers hit the 5% top bracket quickly.',
    highlight:'Alabama\'s low bracket thresholds mean most full-time workers pay the full 5% rate on almost all of their income.' },
  { slug:'arkansas',      name:'Arkansas',      abbr:'AR', type:'progressive', topRate:4.9,
    special:[], sdi:false, pfl:false, form:'Arkansas AR4EC',
    note:'Arkansas cut its top income tax rate to 4.9% in 2023, down from 5.9%. It uses a graduated bracket system for lower incomes.',
    highlight:'Arkansas has one of the most aggressive income tax reduction paths in the South, targeting a 4.4% top rate by 2026.' },
  { slug:'california',    name:'California',    abbr:'CA', type:'progressive', topRate:13.3,
    special:['SDI (State Disability Insurance): 0.9% on all wages', 'Paid Family Leave: covered under SDI', 'ETT (Employment Training Tax): employer only, 0.1%'], sdi:true, pfl:true, form:'California DE 4',
    note:'California has the highest state income tax in the US, with 10 brackets and a top rate of 13.3% on income over $1 million. Employees also pay 0.9% SDI.',
    highlight:'California SDI (0.9%) has no wage cap, meaning high earners pay SDI on every dollar they earn.' },
  { slug:'connecticut',   name:'Connecticut',   abbr:'CT', type:'progressive', topRate:6.99,
    special:['Paid Family & Medical Leave: 0.5% employee contribution'], sdi:false, pfl:true, form:'Connecticut CT-W4',
    note:'Connecticut has a progressive income tax with 7 brackets up to 6.99% and a 0.5% employee PFML contribution.',
    highlight:'Connecticut applies a "benefit recapture" rule that can effectively increase taxes on middle-income earners through a phased rate system.' },
  { slug:'delaware',      name:'Delaware',      abbr:'DE', type:'progressive', topRate:6.6,
    special:[], sdi:false, pfl:false, form:'Delaware W-4',
    note:'Delaware has a progressive income tax with 7 brackets ranging from 0% to 6.6%. The top rate kicks in at $60,001 of taxable income.',
    highlight:'Delaware is a popular corporate headquarters state due to its business-friendly laws, but individual income tax rates are relatively moderate.' },
  { slug:'hawaii',        name:'Hawaii',        abbr:'HI', type:'progressive', topRate:11.0,
    special:['Temporary Disability Insurance (TDI): 0.5% on first $63,048/year (2026 est.)'], sdi:true, pfl:false, form:'Hawaii HW-4',
    note:'Hawaii has the second-highest top income tax rate in the US at 11%, with 12 tax brackets. Employees also pay TDI.',
    highlight:'Hawaii\'s TDI program provides short-term disability benefits, funded partly by employee contributions.' },
  { slug:'idaho',         name:'Idaho',         abbr:'ID', type:'progressive', topRate:5.8,
    special:[], sdi:false, pfl:false, form:'Idaho ID W-4',
    note:'Idaho has a simplified two-bracket income tax: 5.8% on income over $2,500 (single) with a 0% rate below that threshold.',
    highlight:'Idaho is reducing its income tax rate — it was 6.5% in 2021 and has been cut to 5.8%, with further cuts likely.' },
  { slug:'iowa',          name:'Iowa',          abbr:'IA', type:'flat',        topRate:3.9,  flat:3.9,
    special:[], sdi:false, pfl:false, form:'Iowa IA W-4',
    note:'Iowa moved to a flat 3.9% income tax in 2026 under SF 2442 (2022 tax reform). The prior multi-bracket system with rates up to 8.53% was fully phased out.',
    highlight:'Iowa\'s shift to a flat 3.9% rate is one of the most significant state tax reforms in recent years — a drop from a top rate of 8.53% as recently as 2022.' },
  { slug:'kansas',        name:'Kansas',        abbr:'KS', type:'progressive', topRate:5.7,
    special:[], sdi:false, pfl:false, form:'Kansas K-4',
    note:'Kansas has three income tax brackets with a top rate of 5.7% on income over $30,000 (single) or $60,000 (married filing jointly).',
    highlight:'Kansas has attempted several income tax reforms; the current 5.7% top rate is a compromise between flat-tax proposals and the prior structure.' },
  { slug:'maine',         name:'Maine',         abbr:'ME', type:'progressive', topRate:7.15,
    special:[], sdi:false, pfl:false, form:'Maine W-4ME',
    note:'Maine has three income tax brackets with a top rate of 7.15% on income over $55,650 (single). Maine uses its own withholding form.',
    highlight:'Maine requires employees to complete a state-specific Form W-4ME in addition to the federal W-4.' },
  { slug:'maryland',      name:'Maryland',      abbr:'MD', type:'progressive', topRate:5.75,
    special:['Local income tax: 2.25%–3.2% depending on county', 'Total effective rate can reach 8.95%'], sdi:false, pfl:false, form:'Maryland MW507',
    note:'Maryland has a state income tax up to 5.75% plus a mandatory county income tax (2.25%–3.2%). Total rates can exceed 8%.',
    highlight:'Every Maryland employer must withhold both state and county income taxes. The county tax is based on where the employee lives, not where they work.' },
  { slug:'minnesota',     name:'Minnesota',     abbr:'MN', type:'progressive', topRate:9.85,
    special:[], sdi:false, pfl:false, form:'Minnesota W-4MN',
    note:'Minnesota has four income tax brackets with a top rate of 9.85% on income over $183,341 (single). It is among the highest-taxed states.',
    highlight:'Minnesota requires a separate state withholding form (W-4MN) because it does not conform to the 2020 federal W-4 redesign.' },
  { slug:'missouri',      name:'Missouri',      abbr:'MO', type:'progressive', topRate:4.95,
    special:[], sdi:false, pfl:false, form:'Missouri MO W-4',
    note:'Missouri cut its top income tax rate to 4.95% in 2023, down from 5.3%. It has nine brackets with rates rising in 0.5% increments.',
    highlight:'Missouri allows a deduction for federal income taxes paid, effectively reducing the state income tax burden for most workers.' },
  { slug:'montana',       name:'Montana',       abbr:'MT', type:'progressive', topRate:6.75,
    special:[], sdi:false, pfl:false, form:'Montana MW-4',
    note:'Montana has seven income tax brackets with a top rate of 6.75% on income over $20,500 (single). Montana has relatively low income thresholds for its top rate.',
    highlight:'Montana does not have a state sales tax, so income tax is a primary revenue source — explaining why rates are moderate to high.' },
  { slug:'nebraska',      name:'Nebraska',      abbr:'NE', type:'progressive', topRate:4.55,
    special:[], sdi:false, pfl:false, form:'Nebraska W-4N',
    note:'Nebraska\'s top income tax rate is approximately 4.55% for 2026 under the LB 754 (2023) schedule: 6.84% → 5.84% (2024) → 5.2% (2025) → 4.55% (2026).',
    highlight:'Nebraska is on track for a 3.99% top rate by 2027. Verify the exact 2026 rate against the Nebraska Department of Revenue — it changes each January.' },
  { slug:'new-jersey',    name:'New Jersey',    abbr:'NJ', type:'progressive', topRate:10.75,
    special:['SDI: employee 0.14% + employer', 'FLI (Family Leave Insurance): 0.09% employee', 'UI: employee 0.3825%'], sdi:true, pfl:true, form:'New Jersey NJ-W4',
    note:'New Jersey has seven income tax brackets with a top rate of 10.75%. Employees also pay SDI, FLI, and UI contributions.',
    highlight:'New Jersey employees pay 4 separate payroll deductions: income tax, SDI, FLI, and unemployment insurance — making NJ one of the most complex payroll states.' },
  { slug:'new-mexico',    name:'New Mexico',    abbr:'NM', type:'progressive', topRate:5.9,
    special:[], sdi:false, pfl:false, form:'New Mexico RPD-41283',
    note:'New Mexico has five income tax brackets with a top rate of 5.9% on income over $210,000 (single). Rates were revised in 2021.',
    highlight:'New Mexico added new lower brackets in 2021, reducing taxes for lower-income workers while maintaining higher rates for top earners.' },
  { slug:'new-york',      name:'New York',      abbr:'NY', type:'progressive', topRate:10.9,
    special:['SDI: employee $0.60/week (capped)', 'Paid Family Leave: 0.373% on wages up to $89,343 (2026 est.)', 'NYC income tax: 3.078%–3.876% for NYC residents'], sdi:true, pfl:true, form:'New York IT-2104',
    note:'New York has nine income tax brackets with a top rate of 10.9%. New York City residents pay an additional 3.1%–3.9% city tax.',
    highlight:'NYC residents can face combined state + city + federal marginal rates exceeding 50% at high income levels.' },
  { slug:'north-dakota',  name:'North Dakota',  abbr:'ND', type:'progressive', topRate:2.5,
    special:[], sdi:false, pfl:false, form:'North Dakota NDW-R',
    note:'North Dakota has one of the lowest progressive income tax rates in the US, with a top rate of just 2.5% on income over $225,000 (single).',
    highlight:'North Dakota\'s low top rate means most workers pay 1.1%–2.04% effective state tax — extremely competitive for a progressive-tax state.' },
  { slug:'ohio',          name:'Ohio',          abbr:'OH', type:'progressive', topRate:3.5,
    special:['Municipal income tax: typically 1%–3% depending on city', 'School district income tax: 0.25%–2.75% depending on district'], sdi:false, pfl:false, form:'Ohio IT 4',
    note:'Ohio has a relatively low top state income tax rate of 3.5%, but municipal and school district taxes add 1%–6% on top for most workers.',
    highlight:'Ohio has over 600 municipal taxing entities. Employers must determine and withhold both state and applicable municipal income taxes.' },
  { slug:'oklahoma',      name:'Oklahoma',      abbr:'OK', type:'progressive', topRate:4.75,
    special:[], sdi:false, pfl:false, form:'Oklahoma W-4',
    note:'Oklahoma uses the standard federal W-4 and has five income tax brackets with a top rate of 4.75% on income over $7,200 (single).',
    highlight:'Oklahoma\'s top rate of 4.75% kicks in at just $7,200 of taxable income, meaning most full-time workers pay the top marginal rate.' },
  { slug:'oregon',        name:'Oregon',        abbr:'OR', type:'progressive', topRate:9.9,
    special:['Statewide Transit Tax: 0.1% on wages (employee paid)', 'Tri-County Metro Transit: 0.8037% (employer only in TriMet district)', 'Paid Leave Oregon: 1% total (employee 60%, employer 40%)'], sdi:false, pfl:true, form:'Oregon OR-W-4',
    note:'Oregon has four income tax brackets with a top rate of 9.9%. Employees also pay Paid Leave Oregon (0.6%) and the Statewide Transit Tax (0.1%).',
    highlight:'Oregon has no state sales tax, so income tax is the primary funding mechanism — contributing to one of the higher top rates in the US.' },
  { slug:'rhode-island',  name:'Rhode Island',  abbr:'RI', type:'progressive', topRate:5.99,
    special:['TDI (Temporary Disability Insurance): 1.1% on wages up to $84,000 (2026 est.)'], sdi:true, pfl:false, form:'Rhode Island RI W-4',
    note:'Rhode Island has three income tax brackets with a top rate of 5.99% and mandatory TDI contributions from employees.',
    highlight:'Rhode Island TDI provides up to 85% of average weekly wages for workers who are temporarily disabled and unable to work.' },
  { slug:'south-carolina', name:'South Carolina', abbr:'SC', type:'progressive', topRate:6.2,
    special:[], sdi:false, pfl:false, form:'South Carolina SC W-4',
    note:'South Carolina reduced its top income tax rate to 6.2% in 2024, part of a plan to cut to 6.0% in 2027. It has six income tax brackets.',
    highlight:'South Carolina is phasing down its top rate from 7% to 6% over several years — check current rates before processing payroll each year.' },
  { slug:'vermont',       name:'Vermont',       abbr:'VT', type:'progressive', topRate:8.75,
    special:[], sdi:false, pfl:false, form:'Vermont W-4VT',
    note:'Vermont has four income tax brackets with a top rate of 8.75% on income over $213,150 (single). Vermont requires a state-specific withholding form.',
    highlight:'Vermont conforms to federal AGI as its income tax starting point but has its own deductions and credits that differ from federal rules.' },
  { slug:'virginia',      name:'Virginia',      abbr:'VA', type:'progressive', topRate:5.75,
    special:[], sdi:false, pfl:false, form:'Virginia VA-4',
    note:'Virginia has four income tax brackets with rates from 2% to 5.75%. The top rate applies to income over $17,000 — meaning most workers pay 5.75%.',
    highlight:'Virginia\'s top bracket starts at just $17,000 of taxable income, so virtually all full-time workers pay the 5.75% top rate.' },
  { slug:'west-virginia', name:'West Virginia',  abbr:'WV', type:'progressive', topRate:5.12,
    special:[], sdi:false, pfl:false, form:'West Virginia IT-104',
    note:'West Virginia is cutting its income tax aggressively — the top rate was 6.5% in 2023 and has been reduced to 5.12%, with further cuts expected.',
    highlight:'West Virginia Governor Justice signed a 21.25% across-the-board income tax cut effective 2024. More reductions are expected through 2026.' },
  { slug:'wisconsin',     name:'Wisconsin',     abbr:'WI', type:'progressive', topRate:7.65,
    special:[], sdi:false, pfl:false, form:'Wisconsin WT-4',
    note:'Wisconsin has four income tax brackets with a top rate of 7.65% on income over $374,600 (single).',
    highlight:'Wisconsin\'s income tax brackets were last significantly restructured in 2022. The state also has a manufacturing and agricultural credit that benefits those sectors.' },
  { slug:'washington-dc', name:'Washington D.C.', abbr:'DC', type:'progressive', topRate:10.75,
    special:['Paid Family Leave: employer-funded (0.26%–0.62% of wages)'], sdi:false, pfl:true, form:'D.C. D-4',
    note:'Washington D.C. has nine income tax brackets with a top rate of 10.75% on income over $1 million. DC residents pay both DC income tax and all federal taxes.',
    highlight:'D.C. residents pay federal income tax despite having no voting representation in Congress — a long-standing political issue for district residents.' },
];

// ── HTML GENERATOR ────────────────────────────────────────────────────────────
function taxSummary(s) {
  if (s.type === 'none') return `No state income tax`;
  if (s.type === 'flat')  return `${s.flat}% flat rate`;
  return `Up to ${s.topRate}% (progressive)`;
}
function taxDetail(s) {
  if (s.type === 'none')
    return `${s.name} is one of nine states with <strong>no state income tax</strong>. Employees only pay federal income tax and FICA — there is no state withholding required.`;
  if (s.type === 'flat')
    return `${s.name} uses a <strong>flat ${s.flat}% income tax rate</strong>. All taxable income is taxed at the same percentage, regardless of how much you earn. This makes payroll calculations straightforward.`;
  return `${s.name} uses a <strong>progressive income tax</strong> with a top rate of ${s.topRate}%. Higher earners pay a larger percentage of their income — different brackets apply to different income ranges.`;
}
function specialTaxSection(s) {
  if (!s.special.length) return '';
  return `<div style="margin-top:12px"><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:6px">Additional Payroll Taxes</div>${s.special.map(t=>`<div style="display:flex;gap:8px;align-items:flex-start;font-size:13px;padding:6px 0;border-bottom:1px solid var(--border)"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;margin-top:1px"><polyline points="20 6 9 17 4 12"/></svg>${t}</div>`).join('')}</div>`;
}
function generateFAQs(s) {
  const q1 = s.type === 'none'
    ? { q:`Does ${s.name} have a state income tax in 2026?`, a:`No. ${s.name} is one of nine states with no state income tax. Employees who live and work in ${s.name} pay zero state income tax on their wages. They still owe federal income tax and FICA (Social Security and Medicare).` }
    : s.type === 'flat'
    ? { q:`What is the ${s.name} income tax rate for 2026?`, a:`${s.name} uses a flat ${s.flat}% income tax rate on all taxable income. Unlike progressive-tax states, the same rate applies whether you earn $30,000 or $300,000. This makes ${s.name} payroll tax calculations simple and predictable.` }
    : { q:`What is the top ${s.name} income tax rate for 2026?`, a:`${s.name}'s top income tax rate is ${s.topRate}% for 2026. This is a marginal rate — it only applies to income above the top bracket threshold. Lower income falls into lower brackets. Use the calculator above to see your effective rate.` };
  const q2 = { q:`What taxes do ${s.name} employees pay on their paycheck?`,
    a:`${s.name} employees pay: (1) Federal income tax (based on W-4 withholding); (2) Social Security tax (6.2% on wages up to $176,100); (3) Medicare tax (1.45%, plus 0.9% on income over $200,000); ${s.type!=='none'?`(4) ${s.name} state income tax (${taxSummary(s)});`:''} ${s.special.length?`(${s.type!=='none'?5:4}) ${s.special[0].split(':')[0]}.`:''} The employer matches the Social Security and Medicare portions.` };
  const q3 = { q:`What payroll withholding form do ${s.name} employees use?`,
    a:`${s.type==='none' ? `${s.name} employees only need to complete the federal W-4 form — there is no state income tax withholding form because ${s.name} has no income tax.` : `${s.name} employees complete ${s.form} for state withholding in addition to the federal W-4. Employers use both forms to calculate the correct combined withholding amount.`}` };
  return [q1, q2, q3];
}
function generatePage(s) {
  const title = `${s.name} Payroll Tax Calculator 2026 | FreePayrollCalc`;
  let desc;
  if (s.type === 'none')
    desc = `Free ${s.name} payroll tax calculator 2026. ${s.name} has no state income tax — estimate federal FICA and net pay for any salary. Instant, no signup.`;
  else if (s.type === 'flat')
    desc = `Free ${s.name} payroll tax calculator 2026. Calculate the ${s.flat}% flat state income tax, federal withholding, FICA, and exact net pay. Instant.`;
  else
    desc = `Free ${s.name} payroll tax calculator 2026. State income tax up to ${s.topRate}%. Calculate federal + state withholding and net take-home pay. Free.`;
  if (desc.length > 155) desc = desc.slice(0, 152) + '...';
  const canonical = `https://www.freepayrollcalc.com/payroll-tax-calculator/${s.slug}`;
  const faqs = generateFAQs(s);
  const faqSchema = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity": faqs.map(f=>({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a} }))
  });
  const bcSchema = JSON.stringify({
    "@context":"https://schema.org","@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.freepayrollcalc.com"},
      {"@type":"ListItem","position":2,"name":"Payroll Tax Calculator","item":"https://www.freepayrollcalc.com/payroll-tax-calculator"},
      {"@type":"ListItem","position":3,"name":`${s.name} Payroll Tax`,"item":canonical}
    ]
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" href="/shared/favicon.svg" type="image/svg+xml">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${s.name} Payroll Tax Calculator 2026">
<meta property="og:type" content="website">
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/shared/styles.css">
<script type="application/ld+json">${faqSchema}</script>
<script type="application/ld+json">${bcSchema}</script>
</head>
<body>
<nav class="site-nav" aria-label="Main navigation">
  <div class="container">
    <div class="nav-inner">
      <a href="/" class="nav-logo"><div class="nav-logo-mark"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4M7 13h2"/></svg></div>FreePayrollCalc</a>
      <div class="nav-links">
        <a href="/payroll-tax-calculator">Payroll Tax</a>
        <a href="/take-home-pay-calculator">Take Home Pay</a>
        <a href="/free-payroll-calculator">Full Payroll</a>
        <a href="/#all-tools">All Tools</a>
      </div>
      <a href="/free-payroll-calculator" class="nav-cta">Free Calculator</a>
    </div>
  </div>
</nav>
<main class="calc-page">
  <div class="container">
    <nav class="calc-breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/payroll-tax-calculator">Payroll Tax Calculator</a><span>›</span>
      <span aria-current="page">${s.name}</span>
    </nav>
    <h1 class="calc-title" data-enter>${s.name} Payroll Tax Calculator 2026</h1>
    <p class="calc-subtitle" data-enter data-delay="1">${s.type === 'none' ? `${s.name} has no state income tax. Employees pay federal income tax and FICA only.` : `Calculate ${s.name} state income tax, federal withholding, Social Security, Medicare, and net take-home pay.`}</p>
    <div class="calc-updated"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>2026 ${s.name} tax rates · FICA · ${s.form}</div>

    <!-- State fact cards -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin:24px 0" data-enter data-delay="1">
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:6px">State Income Tax</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:${s.type==='none'?'var(--green)':'var(--accent)'}">${taxSummary(s)}</div>
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:6px">Social Security</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:var(--accent)">6.2%</div>
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:6px">Medicare</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:var(--accent)">1.45%</div>
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:6px">State Form</div>
        <div style="font-size:15px;font-weight:700;color:var(--ink-1)">${s.form}</div>
      </div>
    </div>

    <!-- CTA to main calculator -->
    <div class="calc-card" style="text-align:center;padding:28px" data-enter data-delay="2">
      <div style="font-size:20px;font-weight:700;margin-bottom:8px">Calculate Your ${s.name} Paycheck</div>
      <p style="color:var(--ink-2);font-size:14px;margin-bottom:20px">Enter your salary or hourly rate and get a full breakdown: ${s.name} state tax, federal income tax, Social Security, Medicare, and exact net pay.</p>
      <a href="/payroll-tax-calculator" class="calc-btn" style="display:inline-block;text-decoration:none;max-width:300px">Open ${s.name} Payroll Tax Calculator</a>
      <div style="font-size:12px;color:var(--ink-3);margin-top:12px">Free · No signup · 2026 IRS & ${s.abbr} rates</div>
    </div>

    <!-- State tax detail article -->
    <section style="margin:32px 0">
      <div class="section-header" data-enter>
        <p class="section-eyebrow">${s.name} Tax Guide</p>
        <h2 class="section-title">${s.name} Payroll Tax Overview 2026</h2>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start" data-enter data-delay="1">
        <div>
          <p style="font-size:14px;line-height:1.7;color:var(--ink-2);margin-bottom:16px">${taxDetail(s)}</p>
          <p style="font-size:14px;line-height:1.7;color:var(--ink-2);margin-bottom:16px">${s.note}</p>
          <p style="font-size:14px;line-height:1.7;color:var(--ink-2)">${s.highlight}</p>
        </div>
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px">
          <div style="font-weight:700;font-size:13px;margin-bottom:14px">${s.name} Payroll Tax Summary</div>
          ${[
            ['State Income Tax', taxSummary(s)],
            ['Tax Type', s.type === 'none' ? 'No income tax' : s.type === 'flat' ? 'Flat rate' : 'Progressive (brackets)'],
            ['Social Security', '6.2% on first $176,100'],
            ['Medicare', '1.45% (+ 0.9% over $200K)'],
            ['FUTA (employer)', '0.6% on first $7,000'],
            ['Employee Form', s.form],
          ].map(([l,v]) => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--ink-2)">${l}</span><span style="font-weight:700">${v}</span></div>`).join('')}
          ${specialTaxSection(s)}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header" data-enter>
          <p class="section-eyebrow">FAQ</p>
          <h2 class="section-title">${s.name} payroll tax questions</h2>
        </div>
        <div class="faq-list">
          ${faqs.map((f,i) => `<details class="faq-item" data-enter data-delay="${i+1}"><summary class="faq-q">${f.q}</summary><div class="faq-a">${f.a}</div></details>`).join('\n          ')}
        </div>
      </div>
    </section>

    <!-- Related states -->
    <section style="margin:32px 0" data-enter>
      <div class="section-header"><p class="section-eyebrow">Other States</p><h2 class="section-title">Payroll tax calculators by state</h2></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${states.filter(x=>x.slug!==s.slug).slice(0,20).map(x=>`<a href="/payroll-tax-calculator/${x.slug}" style="padding:6px 14px;background:var(--surface);border:1px solid var(--border);border-radius:20px;font-size:12px;font-weight:600;color:var(--ink-2);text-decoration:none" onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-2)'">${x.name}</a>`).join('\n        ')}
        <a href="/payroll-tax-calculator" style="padding:6px 14px;background:var(--accent);border:1px solid var(--accent);border-radius:20px;font-size:12px;font-weight:700;color:#fff;text-decoration:none">All States →</a>
      </div>
    </section>
  </div>
</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div><div class="footer-brand-name">FreePayrollCalc</div><div class="footer-brand-desc">Free 2026 payroll tax calculators for every US state.</div></div>
      <div><div class="footer-col-title">Payroll Tools</div><ul class="footer-links"><li><a href="/payroll-tax-calculator">Payroll Tax Calculator</a></li><li><a href="/take-home-pay-calculator">Take Home Pay</a></li><li><a href="/free-payroll-calculator">Free Payroll Calculator</a></li><li><a href="/bonus-tax-calculator">Bonus Tax Calculator</a></li></ul></div>
      <div><div class="footer-col-title">Other Calculators</div><ul class="footer-links"><li><a href="/salary-to-hourly-calculator">Salary to Hourly</a></li><li><a href="/overtime-pay-calculator">Overtime Pay</a></li><li><a href="/pto-accrual-calculator">PTO Accrual</a></li><li><a href="/">All Calculators</a></li></ul></div>
    </div>
    <div class="footer-bottom"><span class="footer-copy">&copy; 2026 FreePayrollCalc. Estimates only — not tax or legal advice. Verify rates with your state tax agency.</span><div class="footer-legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div>
  </div>
</footer>
<script src="/shared/scripts.js" defer></script>
</body>
</html>`;
}

// ── RUN GENERATOR ─────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, '..', 'payroll-tax-calculator');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

let generated = 0;
for (const s of states) {
  const html = generatePage(s);
  fs.writeFileSync(path.join(outDir, `${s.slug}.html`), html, 'utf8');
  generated++;
  process.stdout.write(`\r  Generated ${generated}/${states.length}: ${s.name}            `);
}
console.log(`\n\n✓ Generated ${generated} state pages → payroll-tax-calculator/[state].html`);

// ── UPDATE SITEMAP ────────────────────────────────────────────────────────────
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
// Remove any existing state entries to avoid duplicates on re-run
sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/www\.freepayrollcalc\.com\/payroll-tax-calculator\/[a-z-]+<\/loc>[^<]*<changefreq>[^<]+<\/changefreq>[^<]*<priority>[^<]+<\/priority>\s*<\/url>/g, '');
const stateUrls = states.map(s => `  <url>
    <loc>https://www.freepayrollcalc.com/payroll-tax-calculator/${s.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n');
sitemap = sitemap.replace('</urlset>', stateUrls + '\n</urlset>');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`✓ Sitemap updated with ${states.length} state URLs`);
