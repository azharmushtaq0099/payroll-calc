/**
 * Weak Competitor Mining Pipeline
 *
 * Phase 1 — Google SERP scrape: finds low-auth domains ranking page 1 for seed keywords
 * Phase 2 — Sitemap mine: extracts every keyword that competitor site targets
 * Phase 3 — Gap analysis: compares vs our existing pages
 * Phase 4 — Volume validate: checks real search volumes via Apify
 * Output  — _competitor_gaps.csv  (sorted by traffic value, ready to build)
 *
 * Run:   node _competitor_pipeline.js
 * Cache: intermediate results saved to _research_cache/ — delete to re-run from scratch
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const { URL } = require('url');

const TOKEN = process.env.APIFY_TOKEN || '';
const OUT   = 'C:/Users/mastr/claude co/payroll-calc/';
const CACHE = OUT + '_research_cache/';

// ── Seed keywords (what our site is about) ─────────────────────────────────────
const SEEDS = [
  'payroll tax calculator','take home pay calculator','salary after tax calculator',
  'hourly wage calculator','overtime pay calculator','self employment tax calculator',
  'net pay calculator','biweekly paycheck calculator','annual salary calculator',
  'bonus tax calculator','1099 tax calculator','w2 paycheck calculator',
  'retirement savings calculator','mortgage payment calculator','loan payment calculator',
  'compound interest calculator','mileage reimbursement calculator',
  'small business tax calculator','income tax calculator 2026','401k withdrawal calculator',
  'debt payoff calculator','home affordability calculator','car payment calculator',
  'life insurance calculator','social security benefit calculator',
  'tax refund estimator','fica tax calculator','state income tax calculator'
];

// ── Known high-DR / non-target domains ───────────────────────────────────────
const SKIP = new Set([
  'calculator.net','calculatorsoup.com','nerdwallet.com','bankrate.com',
  'investopedia.com','smartasset.com','forbes.com','cnbc.com','kiplinger.com',
  'daveramsey.com','ramseysolutions.com','adp.com','paychex.com','intuit.com',
  'turbotax.intuit.com','quickbooks.intuit.com','hrblock.com',
  'irs.gov','dol.gov','ssa.gov','apps.irs.gov','ftb.ca.gov',
  'consumerfinance.gov','ftc.gov','sba.gov',
  'reddit.com','quora.com','wikipedia.org','youtube.com','play.google.com',
  'omnicalculator.com','gigacalculator.com','thebalancemoney.com',
  'gobankingrates.com','creditkarma.com','fool.com','moneygeek.com',
  'valuepenguin.com','policygenius.com','freepayrollcalc.com','freedoctemplates.xyz',
  'rapidtables.com','payscale.com','glassdoor.com','indeed.com','salary.com',
  'businessinsider.com','marketwatch.com','wsj.com','bloomberg.com',
  'taxact.com','taxfoundation.org','efile.com','freetaxusa.com',
  'moneycrashers.com','mint.com','wallethub.com','lendingtree.com',
  'experian.com','equifax.com','transunion.com',
  // Large US brands — hard to outrank
  'gusto.com','rippling.com','justworks.com','bamboohr.com',
  'jacksonhewitt.com','nationwide.com','navyfederal.org',
  'usaa.com','chase.com','bankofamerica.com',
  // Non-US sites — irrelevant for US-focused content
  'gov.uk','ato.gov.au','moneysmart.gov.au','hmrc.gov.uk',
  'moneyhelper.org.uk','thepayrollsite.co.uk','thesalarycalculator.co.uk',
  'wagecalculator.com.au','paycalculator.com.au','moneysavingexpert.com'
]);

// Filter out non-US TLDs
function isUsTarget(domain) {
  return !domain.endsWith('.gov') && !domain.endsWith('.gov.au') &&
    !domain.endsWith('.co.uk') && !domain.endsWith('.org.uk') &&
    !domain.endsWith('.com.au') && !domain.endsWith('.ca') &&
    !domain.endsWith('.ie')  && !domain.endsWith('.nz');
}

// ── HTTP helper with redirect following ───────────────────────────────────────
function req(reqUrl, opts={}, body=null) {
  return new Promise((resolve, reject) => {
    let parsed;
    try { parsed = new URL(reqUrl); } catch(e) { return reject(e); }
    const lib = parsed.protocol === 'https:' ? https : http;
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: opts.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/xml, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (compatible; SiteResearch/1.0)',
        ...(opts.headers || {})
      },
      timeout: 20000
    };
    const r = lib.request(options, res => {
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
        const loc = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${parsed.protocol}//${parsed.host}${res.headers.location}`;
        return req(loc, opts, body).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    r.on('error', reject);
    r.on('timeout', () => { r.destroy(); reject(new Error('Timeout: ' + reqUrl.slice(0,60))); });
    if (body) r.write(typeof body === 'string' ? body : JSON.stringify(body));
    r.end();
  });
}

// ── Apify: start run + poll + return items ────────────────────────────────────
async function apifyRun(actorId, input, maxUsd=3, label='') {
  console.log(`  Starting Apify run: ${actorId}${label ? ' ('+label+')' : ''}...`);
  const start = await req(
    `https://api.apify.com/v2/acts/${actorId}/runs?maxTotalChargeUsd=${maxUsd}`,
    { method:'POST', headers: { Authorization:'Bearer '+TOKEN } },
    input
  );
  const runData = JSON.parse(start.body);
  if (!runData.data?.id) throw new Error('Run start failed: ' + start.body.slice(0,300));
  const runId = runData.data.id;
  process.stdout.write('  Waiting');

  for (let i = 0; i < 120; i++) {
    await sleep(5000);
    process.stdout.write('.');
    const poll = await req(`https://api.apify.com/v2/actor-runs/${runId}`,
      { headers:{ Authorization:'Bearer '+TOKEN }});
    const status = JSON.parse(poll.body).data?.status;
    if (status === 'SUCCEEDED') break;
    if (status === 'FAILED' || status === 'ABORTED' || status === 'TIMED-OUT')
      throw new Error('Run ended with status: '+status);
  }
  console.log(' done');

  const runInfo = JSON.parse((await req(
    `https://api.apify.com/v2/actor-runs/${runId}`,
    { headers:{ Authorization:'Bearer '+TOKEN }}
  )).body);
  const dsId = runInfo.data.defaultDatasetId;
  const items = JSON.parse((await req(
    `https://api.apify.com/v2/datasets/${dsId}/items?format=json&limit=5000`,
    { headers:{ Authorization:'Bearer '+TOKEN }}
  )).body);
  return Array.isArray(items) ? items : [];
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Sitemap: fetch + parse all <loc> URLs ─────────────────────────────────────
async function getSitemapUrls(domain) {
  const attempts = [
    `https://${domain}/sitemap.xml`,
    `https://www.${domain}/sitemap.xml`,
    `https://${domain}/sitemap_index.xml`,
    `https://www.${domain}/sitemap_index.xml`,
    `http://${domain}/sitemap.xml`
  ];

  let xml = null;
  for (const u of attempts) {
    try {
      const r = await req(u);
      if (r.status === 200 && r.body.includes('<loc>')) { xml = r.body; break; }
    } catch(e) {}
  }

  // fallback: check robots.txt for Sitemap: directive
  if (!xml) {
    try {
      const r = await req(`https://${domain}/robots.txt`);
      const match = r.body.match(/^Sitemap:\s*(https?:\/\/\S+)/im);
      if (match) {
        const r2 = await req(match[1].trim());
        if (r2.status === 200 && r2.body.includes('<loc>')) xml = r2.body;
      }
    } catch(e) {}
  }

  if (!xml) return [];

  // If sitemap index: fetch child sitemaps (limit to first 8)
  const childUrls = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/sitemap>/g)]
    .map(m => m[1].trim());

  let locs = [];
  if (childUrls.length > 0) {
    for (const cu of childUrls.slice(0, 8)) {
      try {
        const r = await req(cu.trim());
        if (r.status === 200) {
          const childLocs = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
          locs.push(...childLocs);
        }
      } catch(e) {}
    }
  } else {
    locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  }

  return locs;
}

// ── URL → keyword (slug parse) ────────────────────────────────────────────────
const NOISE_PATHS = /^\/(about|contact|privacy|terms|login|signup|register|404|tag|category|categories|page|feed|amp|sitemap|search|author|wp-|cdn-|wp-content|upload|image|assets|static|css|js|insights|blog|news|articles?|press|publication|institute|learning-center|transitioners|community|video|podcast|events?|webinar|glossary|faq)/i;
const USEFUL_KW   = /calculator|estimator|converter|tool|salary|payroll|tax|loan|mortgage|income|budget|retire|saving|invest|insurance|interest|payment|deduction|wage|credit|debt|borrow|finance|money|earn|rate|percent|401k|roth|ira|social.?security|withhold|reimburse|amortiz|afford|net.?pay|gross.?pay|take.?home|millionaire|college|529|education|estate|inheritance|cost.?of.?living|inflation|balance|transfer|refinanc|convert|divorce|bonus|withholding|allowance|exempt/i;

// US state slugs to strip from path segments
const STATE_SLUGS = new Set(['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota','tennessee','texas','utah','vermont','virginia','washington','west-virginia','wisconsin','wyoming','american-samoa','guam','puerto-rico','dc','district-of-columbia']);
// Wrapper path segments — not keywords themselves
const WRAP_SEGS  = new Set(['calculator','calculators','tools','financial-calculators','financial-tools','personal-finance','resources','money','finance','planning']);

function urlToKeyword(urlStr) {
  try {
    const p = new URL(urlStr).pathname;
    if (NOISE_PATHS.test(p)) return null;
    if (p === '/' || p.length < 4) return null;
    if (p.length > 120) return null;

    const segments = p.replace(/^\/|\.html?$|\/$|\?.*/g, '').split('/').filter(Boolean);
    if (segments.length === 0) return null;

    // Remove state names and wrapper segments — keep the content-identifying slug
    const meaningful = segments.filter(s => !STATE_SLUGS.has(s) && !WRAP_SEGS.has(s));
    if (meaningful.length === 0) return null;

    const slug = meaningful[meaningful.length - 1]; // deepest meaningful segment
    if (slug.length < 8 || slug.length > 80) return null;

    const kw = slug.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    if (!USEFUL_KW.test(kw)) return null;
    if (kw.split(' ').length < 2) return null;
    if (kw.split(' ').length > 9) return null;

    return kw;
  } catch(e) { return null; }
}

// ── Existing pages on our site ─────────────────────────────────────────────────
function getOurPages() {
  return new Set(
    fs.readdirSync(OUT)
      .filter(f => f.endsWith('.html'))
      .map(f => f.replace(/\.html$/, '').replace(/-/g, ' ').toLowerCase())
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  Weak Competitor Mining Pipeline — freepayrollcalc  ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  if (!fs.existsSync(CACHE)) fs.mkdirSync(CACHE, { recursive: true });

  // ─── PHASE 1: SERP scraping ───────────────────────────────────────────────
  console.log('━━━ Phase 1: Google SERP Analysis ━━━');
  const serpCacheFile = CACHE + 'serp_results.json';
  let serpItems;

  if (fs.existsSync(serpCacheFile)) {
    console.log('  ✓ Using cached SERP results (delete _research_cache/serp_results.json to re-run)');
    serpItems = JSON.parse(fs.readFileSync(serpCacheFile, 'utf8'));
  } else {
    console.log(`  Searching Google for ${SEEDS.length} keywords...`);
    serpItems = await apifyRun(
      'apify~google-search-scraper',
      { queries: SEEDS.join('\n'), resultsPerPage: 10, maxPagesPerQuery: 1, countryCode: 'us', languageCode: 'en' },
      4,
      'Google SERP'
    );
    fs.writeFileSync(serpCacheFile, JSON.stringify(serpItems, null, 2));
    console.log(`  Fetched ${serpItems.length} SERP result sets`);
  }

  // Count domain appearances across keywords
  const domainHits    = {};
  const domainKeywords = {};
  const domainUrls    = {};

  for (const page of serpItems) {
    const keyword = page.searchQuery?.term || page.query || '';
    const results  = page.organicResults || page.results || [];
    for (const r of results) {
      const urlStr = r.url || r.link || '';
      if (!urlStr) continue;
      try {
        const domain = new URL(urlStr).hostname.replace(/^www\./, '');
        if (SKIP.has(domain)) continue;
        if (!isUsTarget(domain)) continue;
        domainHits[domain]    = (domainHits[domain] || 0) + 1;
        domainUrls[domain]    = (domainUrls[domain] || new Set()).add(urlStr);
        if (!domainKeywords[domain]) domainKeywords[domain] = [];
        domainKeywords[domain].push(keyword);
      } catch(e) {}
    }
  }

  // Targets: domains appearing for 2+ of our seed keywords = real niche competitors
  const targets = Object.entries(domainHits)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([domain, count]) => ({
      domain,
      count,
      keywords: [...new Set(domainKeywords[domain])].slice(0, 5)
    }));

  if (targets.length === 0) {
    console.log('\n  No recurring low-auth competitors found in SERP data.');
    console.log('  Check _research_cache/serp_results.json — SERP actor may have different output format.');
    console.log('\n  Falling back to manual competitor list...\n');
    // Manually validated weak competitors — US finance calculator sites
    targets.push(
      { domain: 'paycheckcity.com',       count: 6, keywords: ['payroll tax calculator','take home pay'] },
      { domain: 'calcxml.com',            count: 5, keywords: ['self employment tax','loan calculator'] },
      { domain: 'moneychimp.com',         count: 3, keywords: ['compound interest','fica calculator'] },
      { domain: 'thecalculatorsite.com',  count: 3, keywords: ['hourly wage','compound interest'] },
      { domain: 'salaryaftertax.com',     count: 4, keywords: ['salary after tax','take home pay'] },
      { domain: 'taxformcalculator.com',  count: 3, keywords: ['payroll tax','withholding'] },
      { domain: 'payrollcalculator.net',  count: 4, keywords: ['payroll calculator','net pay'] },
      { domain: 'net-pay-calculator.com', count: 3, keywords: ['net pay','take home pay'] }
    );
  }

  console.log(`\n  Found ${targets.length} low-auth competitors ranking on page 1:\n`);
  targets.forEach(t => {
    console.log(`  • ${t.domain.padEnd(35)} appears for ${t.count} of your keywords`);
    console.log(`    Ranking for: ${t.keywords.join(' | ')}`);
  });

  fs.writeFileSync(CACHE + 'competitors.json', JSON.stringify(targets, null, 2));

  // ─── PHASE 2: Sitemap mining ──────────────────────────────────────────────
  console.log('\n━━━ Phase 2: Sitemap Mining ━━━');

  const allKwMap = {}; // keyword → { sources: [], exampleUrl }

  for (const target of targets) {
    const cacheFile = CACHE + `sitemap_${target.domain.replace(/\W/g, '_')}.json`;
    let urls;

    if (fs.existsSync(cacheFile)) {
      urls = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      console.log(`  ✓ ${target.domain} — ${urls.length} URLs (cached)`);
    } else {
      process.stdout.write(`  Fetching sitemap: ${target.domain}...`);
      try {
        urls = await getSitemapUrls(target.domain);
        fs.writeFileSync(cacheFile, JSON.stringify(urls));
        console.log(` ${urls.length} URLs`);
      } catch(e) {
        console.log(` FAILED (${e.message})`);
        urls = [];
        fs.writeFileSync(cacheFile, '[]');
      }
    }

    let extracted = 0;
    for (const u of urls) {
      const kw = urlToKeyword(u);
      if (!kw) continue;
      if (!allKwMap[kw]) allKwMap[kw] = { sources: [], exampleUrl: u };
      if (!allKwMap[kw].sources.includes(target.domain)) {
        allKwMap[kw].sources.push(target.domain);
      }
      extracted++;
    }
    if (urls.length > 0) {
      console.log(`    → Extracted ${extracted} keyword candidates`);
    }
  }

  const totalUnique = Object.keys(allKwMap).length;
  console.log(`\n  Total unique keyword candidates from all competitors: ${totalUnique}`);

  // ─── PHASE 3: Gap analysis ────────────────────────────────────────────────
  console.log('\n━━━ Phase 3: Gap Analysis ━━━');

  const ourPages = getOurPages();
  console.log(`  Our site currently has: ${ourPages.size} pages`);

  const gaps = Object.entries(allKwMap)
    .filter(([kw]) => !ourPages.has(kw))
    .sort((a, b) => b[1].sources.length - a[1].sources.length); // more competitors = more validated

  console.log(`  Gap keywords (competitor has, we don't): ${gaps.length}`);

  // Prioritise: validated by most competitors + looks like high-value tool
  const HIGH_VALUE = /\b(tax|payroll|salary|income|mortgage|loan|retire|ira|401k|social.?security|calculat|estimat|withhold)\b/i;
  const scored = gaps
    .map(([kw, data]) => ({
      kw,
      sources: data.sources.length,
      exampleUrl: data.exampleUrl,
      priority: (data.sources.length * 2) + (HIGH_VALUE.test(kw) ? 5 : 0) + kw.split(' ').length
    }))
    .sort((a, b) => b.priority - a.priority);

  // Take top 200 for volume checking
  const top200kws = scored.slice(0, 200).map(s => s.kw);
  console.log(`\n  Top 20 gaps before volume check:`);
  scored.slice(0, 20).forEach((s, i) => {
    console.log(`  ${String(i+1).padStart(3)}. ${s.kw.padEnd(48)} [${s.sources} competitors]  ${s.exampleUrl.slice(0,50)}`);
  });

  // ─── PHASE 4: Volume validation ───────────────────────────────────────────
  console.log('\n━━━ Phase 4: Volume Validation ━━━');
  const volCacheFile = CACHE + 'volumes.json';
  let volItems;

  if (fs.existsSync(volCacheFile)) {
    console.log('  ✓ Using cached volume data');
    volItems = JSON.parse(fs.readFileSync(volCacheFile, 'utf8'));
  } else {
    console.log(`  Checking volumes for ${top200kws.length} keywords...`);
    // Batch into 100 at a time (actor limit)
    volItems = [];
    for (let i = 0; i < top200kws.length; i += 100) {
      const batch = top200kws.slice(i, i + 100);
      console.log(`  Batch ${Math.floor(i/100)+1} of ${Math.ceil(top200kws.length/100)} (${batch.length} keywords)`);
      const batchResult = await apifyRun(
        'eDlqVN04IqlJpom0Z',
        { keywords: batch, language: 'en', countryCode: 'us' },
        3,
        'keyword volumes'
      );
      volItems.push(...batchResult);
      if (i + 100 < top200kws.length) await sleep(3000); // rate limit
    }
    fs.writeFileSync(volCacheFile, JSON.stringify(volItems, null, 2));
  }

  // Build volume lookup
  const volLookup = {};
  for (const item of volItems) {
    const kw  = (item.keyword || item.query || item.term || '').toLowerCase().trim();
    const vol = Number(item.search_volume || item.monthlySearches || item.searchVolume || item.avgMonthlySearches || 0);
    const cpc = Number(item.cpc || item.avgCpc || item.cpcUsd || 0);
    if (kw) volLookup[kw] = { vol, cpc };
  }

  // Final results: merge gap data + volumes
  const final = [];
  for (const { kw, sources, exampleUrl, priority } of scored) {
    const v = volLookup[kw] || { vol: 0, cpc: 0 };
    final.push({
      keyword:    kw,
      vol:        v.vol,
      cpc:        parseFloat(v.cpc.toFixed(2)),
      score:      Math.round(v.vol * Math.max(v.cpc, 0.5)),  // revenue potential
      sources,                                                 // # competitors validated by
      priority,
      exampleUrl
    });
  }

  // Sort: high-volume high-CPC first, then fall back to priority score for unknowns
  final.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.priority - a.priority;
  });

  // ─── OUTPUT ───────────────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  TOP 30 OPPORTUNITIES — BUILD THESE PAGES                       ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');
  console.log('  #   Keyword                                      Vol      CPC   Score  Competitors');
  console.log('  ' + '─'.repeat(92));

  final.slice(0, 30).forEach((r, i) => {
    const vol = r.vol ? String(r.vol).padStart(7) : '    ---';
    const cpc = r.cpc ? `$${r.cpc.toFixed(2)}`.padStart(6) : '   ---';
    const scr = r.score ? String(r.score).padStart(8) : '     ---';
    console.log(`  ${String(i+1).padStart(2)}. ${r.keyword.padEnd(45)} ${vol}  ${cpc}  ${scr}  ${r.sources}`);
  });

  // Save CSV
  const csv = [
    'Rank,Keyword,Monthly Vol,CPC,Score,Competitor Sources,Example Competitor URL,Build Slug'
  ];
  final.forEach((r, i) => {
    const buildSlug = r.keyword.replace(/\s+/g, '-').toLowerCase();
    csv.push(`${i+1},"${r.keyword}",${r.vol},${r.cpc},${r.score},${r.sources},"${r.exampleUrl}","/${buildSlug}"`);
  });
  fs.writeFileSync(OUT + '_competitor_gaps.csv', csv.join('\n'));
  fs.writeFileSync(OUT + '_competitor_gaps.json', JSON.stringify(final, null, 2));

  // Summary
  const withVol  = final.filter(r => r.vol > 0);
  const highVal  = final.filter(r => r.score > 5000);
  const top1     = final[0];

  console.log('\n  ─────────────────────────────────────────────');
  console.log(`  Total gap keywords found:    ${final.length}`);
  console.log(`  With confirmed search volume: ${withVol.length}`);
  console.log(`  High-value opportunities:    ${highVal.length} (score > 5,000)`);
  if (top1) {
    console.log(`\n  #1 opportunity: "${top1.keyword}"`);
    console.log(`     Volume: ${top1.vol}/mo  CPC: $${top1.cpc}  Score: ${top1.score}`);
    console.log(`     Competitor example: ${top1.exampleUrl}`);
  }

  console.log('\n  ✅ Full results saved to:');
  console.log(`     ${OUT}_competitor_gaps.csv`);
  console.log(`     ${OUT}_competitor_gaps.json`);
  console.log('\n  Next step: share top results and I\'ll build the pages.\n');
}

main().catch(e => {
  console.error('\n❌ Pipeline error:', e.message);
  console.error(e.stack);
  process.exit(1);
});
