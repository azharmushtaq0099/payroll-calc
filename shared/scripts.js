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
