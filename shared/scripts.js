/* FreePayrollCalc — Shared Scripts */
'use strict';

/* ── Scroll-aware nav ── */
(function(){
  var nav = document.querySelector('.site-nav');
  if(!nav) return;
  function tick(){ nav.classList.toggle('scrolled', window.scrollY > 48) }
  window.addEventListener('scroll', tick, {passive:true});
  tick();
})();

/* ── Mobile nav ── */
(function(){
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('nav-mobile');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', function(e){
    if(!toggle.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
  });
})();

/* ── Mobile nav accordion ── */
function toggleMobSection(id){
  var section = document.getElementById(id);
  if(!section) return;
  section.classList.toggle('open');
}

/* ── Entrance animations ── */
(function(){
  var els = document.querySelectorAll('[data-enter]');
  if(!els.length) return;
  var vh = window.innerHeight;
  els.forEach(function(el){
    if(el.getBoundingClientRect().top < vh - 40) el.classList.add('entered');
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('entered'); io.unobserve(e.target); }
    });
  }, {threshold:.06, rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){ if(!el.classList.contains('entered')) io.observe(el); });
})();

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(function(btn){
  btn.addEventListener('click', function(){
    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    /* close all */
    document.querySelectorAll('.faq-q').forEach(function(b){
      b.setAttribute('aria-expanded','false');
      b.nextElementSibling.classList.remove('open');
    });
    if(!isOpen){
      btn.setAttribute('aria-expanded','true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

/* ── Number counter animation ── */
function animateCount(el, from, to, duration, prefix, suffix){
  var start = null;
  var range = to - from;
  function step(ts){
    if(!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var ease = 1 - Math.pow(1 - progress, 3);
    var val = Math.round(from + range * ease);
    el.textContent = prefix + val.toLocaleString() + suffix;
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Format currency ── */
function fmtUSD(n){
  return '$' + Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
}

/* ── Copy results ── */
document.querySelectorAll('[data-copy-results]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var results = document.querySelector('.results-body');
    if(!results) return;
    var rows = results.querySelectorAll('.breakdown-row');
    var text = 'Payroll Calculation Results\n';
    rows.forEach(function(r){
      var label = r.querySelector('.breakdown-row-label');
      var amount = r.querySelector('.breakdown-row-amount');
      if(label && amount) text += (label.textContent.trim() + ': ' + amount.textContent.trim() + '\n');
    });
    var netEl = results.querySelector('.net-pay-amount');
    if(netEl) text += 'NET PAY: ' + netEl.textContent.trim() + '\n';
    navigator.clipboard.writeText(text).then(function(){
      btn.textContent = '✓ Copied';
      setTimeout(function(){ btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8" y="8" width="10" height="10" rx="2"/><path d="M5 8V5a2 2 0 012-2h7"/></svg> Copy'; }, 2000);
    });
  });
});

/* ── Stats counter (fires once when element enters viewport) ── */
(function(){
  var counter = document.getElementById('fpc-counter');
  if(!counter) return;
  var triggered = false;
  var io = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !triggered){
      triggered = true;
      animateCount(counter, 0, 2400000, 1800, '', '+');
      io.disconnect();
    }
  }, {threshold: 0.5});
  io.observe(counter);
})();

/* ── Command palette ── */
var TOOLS_DATA = [
  {name:'Payroll Tax Calculator',url:'/payroll-tax-calculator',cat:'Payroll',desc:'Federal, state, FICA withholding per paycheck'},
  {name:'Free Payroll Calculator',url:'/free-payroll-calculator',cat:'Payroll',desc:'Gross-to-net with pre-tax deductions'},
  {name:'Employer Payroll Tax Calculator',url:'/employer-tax-calculator',cat:'Payroll',desc:'FICA match, FUTA, SUTA, workers comp'},
  {name:'1099 vs W-2 Tax Calculator',url:'/1099-vs-w2-calculator',cat:'Payroll',desc:'Side-by-side contractor vs employee tax'},
  {name:'Workers Comp Calculator',url:'/workers-comp-calculator',cat:'Payroll',desc:'Insurance premium by state & job code'},
  {name:'Cost Per Hire Calculator',url:'/cost-per-hire-calculator',cat:'Payroll',desc:'True total cost of each new hire'},
  {name:'Net to Gross Calculator',url:'/net-to-gross-calculator',cat:'Payroll',desc:'Gross-up a desired net pay amount'},
  {name:'Pay Stub Generator',url:'/pay-stub-generator',cat:'HR & Documents',desc:'Print-to-PDF pay stub, no watermark'},
  {name:'Gross Pay Calculator',url:'/gross-pay-calculator',cat:'Payroll',desc:'Gross pay from hourly, salary, or tips'},
  {name:'Bonus Tax Calculator',url:'/bonus-tax-calculator',cat:'Income & Tax',desc:'Flat 22% or aggregate withholding method'},
  {name:'Take-Home Pay Calculator',url:'/take-home-pay-calculator',cat:'Income & Tax',desc:'Net pay after all taxes and deductions'},
  {name:'Salary to Hourly Calculator',url:'/salary-to-hourly-calculator',cat:'Income & Tax',desc:'Annual salary to hourly / weekly / monthly'},
  {name:'Commission Pay Calculator',url:'/commission-pay-calculator',cat:'Income & Tax',desc:'Straight, tiered, or residual commission'},
  {name:'Final Paycheck Calculator',url:'/final-paycheck-calculator',cat:'Income & Tax',desc:'Last paycheck including accrued PTO'},
  {name:'Self-Employment Tax Calculator',url:'/self-employment-tax-calculator',cat:'Income & Tax',desc:'Schedule SE plus deductible half'},
  {name:'W-4 Withholding Calculator',url:'/w4-withholding-calculator',cat:'Income & Tax',desc:'2026 W-4 line-by-line guide'},
  {name:'Quarterly Tax Calculator',url:'/quarterly-tax-calculator',cat:'Income & Tax',desc:'Estimated quarterly payments for freelancers'},
  {name:'Effective Tax Rate Calculator',url:'/effective-tax-rate-calculator',cat:'Income & Tax',desc:'Blended vs marginal federal tax rate'},
  {name:'Salary Increase Calculator',url:'/salary-increase-calculator',cat:'Income & Tax',desc:'Raise amount and after-tax impact'},
  {name:'Taxable Income Calculator',url:'/taxable-income-calculator',cat:'Income & Tax',desc:'AGI minus standard deduction'},
  {name:'FUTA Tax Calculator',url:'/futa-tax-calculator',cat:'Income & Tax',desc:'Federal unemployment tax per employee'},
  {name:'PTO Accrual Calculator',url:'/pto-accrual-calculator',cat:'Time & Hours',desc:'PTO balance, accrual rate, year-end projection'},
  {name:'Overtime Pay Calculator',url:'/overtime-pay-calculator',cat:'Time & Hours',desc:'FLSA 1.5x, double time, California rules'},
  {name:'Time Card Calculator',url:'/time-card-calculator',cat:'Time & Hours',desc:'Weekly timesheet with OT auto-calculation'},
  {name:'Hours Worked Calculator',url:'/hours-worked-calculator',cat:'Time & Hours',desc:'Total hours from clock-in/clock-out pairs'},
  {name:'Shift Differential Calculator',url:'/shift-differential-calculator',cat:'Time & Hours',desc:'Night/weekend premium pay amounts'},
  {name:'Direct Deposit Form',url:'/direct-deposit-form',cat:'HR & Documents',desc:'Printable bank direct deposit authorization'},
  {name:'Free Invoice Generator',url:'/invoice-generator-free',cat:'HR & Documents',desc:'Professional invoice PDF, no login'},
  {name:'Minimum Wage by State',url:'/minimum-wage-by-state',cat:'HR & Documents',desc:'2026 rates for all 50 states'},
  {name:'Profit Margin Calculator',url:'/profit-margin-calculator',cat:'Business',desc:'Gross, operating, and net margin'},
  {name:'ROI Calculator',url:'/roi-calculator',cat:'Business',desc:'Return on investment percentage'},
  {name:'Break-Even Calculator',url:'/break-even-calculator',cat:'Business',desc:'Units and revenue to cover fixed costs'},
  {name:'Business Loan Calculator',url:'/business-loan-calculator',cat:'Business',desc:'Monthly payments and total interest'},
  {name:'COGS Calculator',url:'/cogs-calculator',cat:'Business',desc:'Cost of goods sold for product businesses'},
  {name:'Debt Payoff Calculator',url:'/debt-payoff-calculator',cat:'Business',desc:'Payoff timeline with extra payments'},
  {name:'Cost of Living Calculator',url:'/cost-of-living-calculator',cat:'Business',desc:'75+ US cities salary equivalency'},
  {name:'Markup Calculator',url:'/markup-calculator',cat:'Business',desc:'Price from cost plus desired margin'},
  {name:'Cap Rate Calculator',url:'/cap-rate-calculator',cat:'Business',desc:'Property capitalization rate for investors'},
  {name:'Cash Flow Calculator',url:'/cash-flow-calculator',cat:'Business',desc:'Operating cash flow from income statement'},
  {name:'Burn Rate Calculator',url:'/burn-rate-calculator',cat:'Business',desc:'Monthly spend and runway for startups'},
  {name:'SaaS Revenue Calculator',url:'/saas-revenue-calculator',cat:'Business',desc:'MRR, ARR, churn impact projections'},
  {name:'1099 Tax Calculator',url:'/1099-tax-calculator',cat:'Income & Tax',desc:'Self-employment tax estimator for freelancers'},
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
  {name:'Fuel Savings Calculator',url:'/fuel-savings-calculator',cat:'Business',desc:'Gas cost comparison and break-even MPG'},
];

function openCmd(){
  var overlay = document.getElementById('cmd-overlay');
  var input = document.getElementById('cmd-input');
  if(!overlay) return;
  overlay.classList.add('open');
  if(input){ input.value = ''; renderCmd(''); setTimeout(function(){ input.focus(); }, 50); }
  document.body.style.overflow = 'hidden';
}
function closeCmd(){
  var overlay = document.getElementById('cmd-overlay');
  if(overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

(function(){
  var overlay = document.getElementById('cmd-overlay');
  var input   = document.getElementById('cmd-input');
  if(!overlay || !input) return;

  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeCmd(); });

  document.addEventListener('keydown', function(e){
    if((e.ctrlKey || e.metaKey) && e.key === 'k'){ e.preventDefault(); openCmd(); return; }
    if(e.key === 'Escape'){ closeCmd(); return; }
    if(!overlay.classList.contains('open')) return;
    var items = overlay.querySelectorAll('.cmd-item');
    var active = overlay.querySelector('.cmd-item.cmd-active');
    var idx = active ? Array.from(items).indexOf(active) : -1;
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      var next = items[Math.min(idx + 1, items.length - 1)];
      if(next){ if(active) active.classList.remove('cmd-active'); next.classList.add('cmd-active'); next.scrollIntoView({block:'nearest'}); }
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      var prev = items[Math.max(idx - 1, 0)];
      if(prev){ if(active) active.classList.remove('cmd-active'); prev.classList.add('cmd-active'); prev.scrollIntoView({block:'nearest'}); }
    } else if(e.key === 'Enter'){
      var cur = overlay.querySelector('.cmd-item.cmd-active');
      if(cur){ window.location.href = cur.getAttribute('data-url'); closeCmd(); }
    }
  });

  input.addEventListener('input', function(){ renderCmd(input.value); });
})();

function renderCmd(q){
  var body = document.getElementById('cmd-body');
  if(!body) return;
  var query = q.trim().toLowerCase();
  var matches = query
    ? TOOLS_DATA.filter(function(t){ return t.name.toLowerCase().indexOf(query) > -1 || t.cat.toLowerCase().indexOf(query) > -1 || t.desc.toLowerCase().indexOf(query) > -1; })
    : TOOLS_DATA.slice(0, 8);
  if(!matches.length){
    body.innerHTML = '<div class="cmd-empty">No tools match "' + q + '"</div>';
    return;
  }
  body.innerHTML = matches.map(function(t, i){
    return '<a class="cmd-item' + (i === 0 ? ' cmd-active' : '') + '" data-url="' + t.url + '" href="' + t.url + '">' +
      '<span class="cmd-item-name">' + t.name + '</span>' +
      '<span class="cmd-item-cat">' + t.cat + '</span>' +
      '</a>';
  }).join('');
}

/* ── Category filter tabs ── */
(function(){
  var tabs  = document.querySelectorAll('.filter-tab');
  var cards = document.querySelectorAll('.tool-card[data-category]');
  if(!tabs.length || !cards.length) return;

  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      var filter = tab.getAttribute('data-filter');

      /* update active tab */
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');

      /* show/hide cards */
      cards.forEach(function(card){
        var cat = card.getAttribute('data-category');
        if(filter === 'all' || cat === filter){
          card.removeAttribute('data-hidden');
        } else {
          card.setAttribute('data-hidden', '');
        }
      });

      /* handle featured card (no data-category) */
      var featured = document.querySelector('.tool-card--featured');
      if(featured){
        if(filter === 'all' || filter === 'payroll'){
          featured.removeAttribute('data-hidden');
        } else {
          featured.setAttribute('data-hidden', '');
        }
      }

      /* remove empty state if present */
      var empty = document.querySelector('.tool-grid-empty');
      if(empty) empty.remove();

      /* check if grid is empty after filter */
      var grid = document.querySelector('.tool-grid');
      if(grid){
        var visible = grid.querySelectorAll('.tool-card:not([data-hidden])');
        if(!visible.length){
          var msg = document.createElement('p');
          msg.className = 'tool-grid-empty';
          msg.textContent = 'No tools in this category yet.';
          grid.appendChild(msg);
        }
      }
    });
  });
})();

/* ── Cookie consent banner ── */
(function(){
  if(localStorage.getItem('fpc-cookie-ok')) return;
  var bar = document.createElement('div');
  bar.className = 'cookie-bar';
  bar.innerHTML =
    '<p class="cookie-bar-text">We use cookies to analyze traffic and improve your experience. By using this site you agree to our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a>.</p>' +
    '<div class="cookie-bar-btns">' +
    '<button class="cookie-accept">Accept All</button>' +
    '<button class="cookie-decline">Decline</button>' +
    '</div>';
  document.body.appendChild(bar);
  function dismiss(accepted){
    if(accepted) localStorage.setItem('fpc-cookie-ok','1');
    else localStorage.setItem('fpc-cookie-ok','declined');
    bar.classList.add('cookie-hide');
    setTimeout(function(){ if(bar.parentNode) bar.parentNode.removeChild(bar); }, 400);
  }
  bar.querySelector('.cookie-accept').addEventListener('click', function(){ dismiss(true); });
  bar.querySelector('.cookie-decline').addEventListener('click', function(){ dismiss(false); });
})();

/* ── Blog sidebar TOC + scrollspy ── */
(function(){
  var tocEl = document.getElementById('sidebar-toc');
  if(!tocEl) return;
  var headings = document.querySelectorAll('.blog-article-body h2');
  if(headings.length < 2){ tocEl.closest('.sidebar-widget').style.display='none'; return; }
  var list = document.createElement('ul');
  list.className = 'toc-list';
  headings.forEach(function(h,i){
    if(!h.id) h.id = 'sec-'+i;
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#'+h.id;
    a.textContent = h.textContent;
    li.appendChild(a); list.appendChild(li);
  });
  tocEl.appendChild(list);
  var links = list.querySelectorAll('a');
  if(!window.IntersectionObserver) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){ l.classList.toggle('toc-active', l.hash==='#'+e.target.id); });
      }
    });
  },{rootMargin:'-10% 0px -80% 0px'});
  headings.forEach(function(h){ io.observe(h); });
})();
