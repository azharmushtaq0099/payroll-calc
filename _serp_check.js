// SERP difficulty check — are the top 10 results dominated by big brands or weak sites?
const https = require('https');

const TOKEN = process.env.APIFY_TOKEN || '';
const KEYWORDS = [
  'debt consolidation calculator',
  'social security benefits calculator',
  'student loan repayment calculator',
  'how long will my money last calculator',
];

// Known big brands — if they dominate top 5, harder to crack
const BIG_BRANDS = new Set([
  'nerdwallet.com','bankrate.com','investopedia.com','calculator.net','calculatorsoup.com',
  'smartasset.com','thebalancemoney.com','forbes.com','cnbc.com','kiplinger.com',
  'money.usnews.com','creditkarma.com','lendingtree.com','experian.com',
  'ssa.gov','studentaid.gov','consumerfinance.gov',
]);

function apifyPost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.apify.com', path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}`, 'Content-Length': Buffer.byteLength(data) },
    }, res => { let b=''; res.on('data',c=>b+=c); res.on('end',()=>{ try{resolve(JSON.parse(b));}catch(e){resolve({raw:b});} }); });
    req.on('error', reject); req.write(data); req.end();
  });
}
function apifyGet(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.apify.com', path, method: 'GET',
      headers: { 'Authorization': `Bearer ${TOKEN}` },
    }, res => { let b=''; res.on('data',c=>b+=c); res.on('end',()=>{ try{resolve(JSON.parse(b));}catch(e){resolve({raw:b});} }); });
    req.on('error', reject); req.end();
  });
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function waitForRun(runId) {
  for (let i = 0; i < 60; i++) {
    await sleep(4000);
    const r = await apifyGet(`/v2/actor-runs/${runId}`);
    const status = r?.data?.status;
    process.stdout.write(`\r  waiting... ${i*4}s`);
    if (status === 'SUCCEEDED') { console.log(''); return r.data.defaultDatasetId; }
    if (['FAILED','ABORTED','TIMED-OUT'].includes(status)) { console.log('\n  run '+status); return null; }
  }
  return null;
}

function getDomain(url) {
  try { return new URL(url).hostname.replace(/^www\./,''); } catch(e) { return ''; }
}

async function main() {
  if (!TOKEN) { console.error('Set APIFY_TOKEN env var'); process.exit(1); }

  const run = await apifyPost(
    '/v2/acts/apify~google-search-scraper/runs?maxTotalChargeUsd=0.50',
    { queries: KEYWORDS.join('\n'), countryCode: 'us', resultsPerPage: 10, maxPagesPerQuery: 1 }
  );
  const runId = run?.data?.id;
  if (!runId) { console.error('Failed:', JSON.stringify(run)); process.exit(1); }
  console.log('Run started: ' + runId);

  const datasetId = await waitForRun(runId);
  if (!datasetId) process.exit(1);

  const items = await apifyGet(`/v2/datasets/${datasetId}/items?limit=200`);
  const rows = Array.isArray(items) ? items : (items?.items || []);

  // Group by keyword
  const byKw = {};
  rows.forEach(item => {
    const kw = item.searchQuery?.term || item.query || '';
    if (!byKw[kw]) byKw[kw] = [];
    (item.organicResults || []).forEach(r => byKw[kw].push(r));
  });

  console.log('\n' + '='.repeat(70));
  KEYWORDS.forEach(kw => {
    const results = byKw[kw] || [];
    const top10 = results.slice(0, 10);
    const weakSites = top10.filter(r => {
      const d = getDomain(r.url || r.link || '');
      return d && !BIG_BRANDS.has(d);
    });

    console.log(`\n"${kw}"`);
    console.log(`  Weak/unknown sites in top 10: ${weakSites.length}/10`);

    top10.forEach((r, i) => {
      const d = getDomain(r.url || r.link || '');
      const isBig = BIG_BRANDS.has(d);
      const marker = isBig ? '  [BIG]' : '  [WEAK]';
      console.log(`  ${i+1}.${marker} ${d}`);
    });

    if (weakSites.length >= 3) {
      console.log(`  → SERP IS SOFT — ${weakSites.length} weak sites ranking. Good target.`);
    } else if (weakSites.length === 2) {
      console.log(`  → MODERATE — 2 weak sites. Rankable with good content.`);
    } else {
      console.log(`  → HARD — top 10 dominated by big brands.`);
    }
  });
}

main().catch(err => { console.error(err); process.exit(1); });
