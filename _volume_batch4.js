// Volume check for Batch 4 calculator candidates (all from calcxml.com gaps)
const https = require('https');
const fs = require('fs');
const TOKEN = process.env.APIFY_TOKEN || '';

const KEYWORDS = [
  'credit card payoff calculator',
  'balance transfer calculator',
  'lease vs buy car calculator',
  'cd calculator',
  'dividend yield calculator',
  '401k loan calculator',
  'biweekly mortgage payment calculator',
  'estate tax calculator',
  'disability income calculator',
  'extra mortgage payment calculator',
  'college value calculator',
  'parent plus loan calculator',
  'lump sum vs annuity calculator',
  'double your money calculator',
  '457 plan calculator',
  'total compensation calculator',
  'fuel savings calculator',
  'coverdell esa calculator',
  'retirement savings sufficiency calculator',
  'certificate of deposit calculator',
];

function apifyPost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({ hostname:'api.apify.com', path, method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${TOKEN}`,'Content-Length':Buffer.byteLength(data)} },
      res=>{let b='';res.on('data',c=>b+=c);res.on('end',()=>{try{resolve(JSON.parse(b));}catch(e){resolve({raw:b});}});});
    req.on('error',reject);req.write(data);req.end();
  });
}
function apifyGet(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname:'api.apify.com', path, method:'GET', headers:{'Authorization':`Bearer ${TOKEN}`} },
      res=>{let b='';res.on('data',c=>b+=c);res.on('end',()=>{try{resolve(JSON.parse(b));}catch(e){resolve({raw:b});}});});
    req.on('error',reject);req.end();
  });
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function waitForRun(runId) {
  for(let i=0;i<60;i++){
    await sleep(5000);
    const r=await apifyGet(`/v2/actor-runs/${runId}`);
    const s=r?.data?.status;
    process.stdout.write(`\r  ${s} (${i*5}s)`);
    if(s==='SUCCEEDED'){console.log('');return r.data.defaultDatasetId;}
    if(['FAILED','ABORTED','TIMED-OUT'].includes(s)){console.log('\n  '+s);return null;}
  }
  return null;
}

async function main(){
  if(!TOKEN){console.error('Set APIFY_TOKEN');process.exit(1);}
  console.log(`Checking volumes for ${KEYWORDS.length} Batch 4 candidates...\n`);
  const run=await apifyPost(`/v2/acts/eDlqVN04IqlJpom0Z/runs?maxTotalChargeUsd=0.50`,
    {keywords:KEYWORDS,countryCode:'us',languageCode:'en'});
  const runId=run?.data?.id;
  if(!runId){console.error('Failed:',JSON.stringify(run));process.exit(1);}
  console.log('Run: '+runId);
  const dsId=await waitForRun(runId);
  if(!dsId)process.exit(1);
  const items=await apifyGet(`/v2/datasets/${dsId}/items?limit=200`);
  const rows=Array.isArray(items)?items:(items?.items||[]);
  const results=rows.map(r=>({
    keyword:r.keyword||r.search_term||'',
    volume:r.search_volume??r.searchVolume??r.monthlySearches??0,
    cpc:r.cpc??r.avg_cpc??0
  })).sort((a,b)=>b.volume-a.volume);
  console.log(`\n${'KEYWORD'.padEnd(45)} VOLUME    CPC`);
  console.log('-'.repeat(70));
  results.forEach(r=>{
    const vol=r.volume?r.volume.toLocaleString():'—';
    const cpc=r.cpc?`$${r.cpc.toFixed(2)}`:'—';
    console.log(`${r.keyword.padEnd(45)} ${vol.padStart(8)}  ${cpc}`);
  });
  fs.writeFileSync('_volume_batch4.json',JSON.stringify(results,null,2));
  console.log('\nSaved: _volume_batch4.json');
}
main().catch(e=>{console.error(e);process.exit(1);});
