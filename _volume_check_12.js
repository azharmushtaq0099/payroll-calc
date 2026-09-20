// Focused volume check for 12 priority gap keywords
const https = require('https');
const fs = require('fs');

const TOKEN = process.env.APIFY_TOKEN || '';
const ACTOR = 'eDlqVN04IqlJpom0Z';

const KEYWORDS = [
  'ira rollover calculator',
  'roth ira conversion calculator',
  'student loan repayment calculator',
  '529 college savings calculator',
  'debt consolidation calculator',
  'social security benefits calculator',
  'savings goal calculator',
  'adjustable rate mortgage calculator',
  'how long will my money last calculator',
  'rate of return calculator',
  'section 179 deduction calculator',
  'auto refinance calculator',
];

function apifyPost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.apify.com',
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Length': Buffer.byteLength(data),
      },
    }, res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); }
        catch (e) { resolve({ raw: buf }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function apifyGet(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.apify.com',
      path,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${TOKEN}` },
    }, res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); }
        catch (e) { resolve({ raw: buf }); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function waitForRun(runId) {
  for (let i = 0; i < 60; i++) {
    await sleep(5000);
    const r = await apifyGet(`/v2/actor-runs/${runId}`);
    const status = r?.data?.status;
    process.stdout.write(`\r  Status: ${status} (${i * 5}s)`);
    if (status === 'SUCCEEDED') { console.log(''); return r.data.defaultDatasetId; }
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status)) {
      console.log(`\n  Run ${status}`);
      return null;
    }
  }
  console.log('\n  Timeout waiting for run');
  return null;
}

async function main() {
  console.log(`Checking volumes for ${KEYWORDS.length} keywords...\n`);

  const runResp = await apifyPost(
    `/v2/acts/${encodeURIComponent(ACTOR)}/runs?maxTotalChargeUsd=0.50`,
    {
      keywords: KEYWORDS,
      countryCode: 'us',
      languageCode: 'en',
    }
  );

  const runId = runResp?.data?.id;
  if (!runId) {
    console.error('Failed to start run:', JSON.stringify(runResp, null, 2));
    process.exit(1);
  }
  console.log(`Run started: ${runId}`);

  const datasetId = await waitForRun(runId);
  if (!datasetId) process.exit(1);

  const items = await apifyGet(`/v2/datasets/${datasetId}/items?limit=200`);
  const rows = Array.isArray(items) ? items : (items?.items || []);

  console.log(`\n${'KEYWORD'.padEnd(45)} VOLUME    CPC`);
  console.log('-'.repeat(70));

  const results = rows.map(item => ({
    keyword: item.keyword || item.search_term || '',
    volume: item.search_volume ?? item.searchVolume ?? item.monthlySearches ?? 0,
    cpc: item.cpc ?? item.avg_cpc ?? 0,
  })).sort((a, b) => b.volume - a.volume);

  results.forEach(r => {
    const vol = r.volume ? r.volume.toLocaleString() : '—';
    const cpc = r.cpc ? `$${r.cpc.toFixed(2)}` : '—';
    console.log(`${r.keyword.padEnd(45)} ${vol.padStart(8)}  ${cpc}`);
  });

  fs.writeFileSync('_volume_12.json', JSON.stringify(results, null, 2));
  console.log('\nSaved to _volume_12.json');
}

main().catch(err => { console.error(err); process.exit(1); });
