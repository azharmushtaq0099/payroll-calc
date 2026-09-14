/**
 * Google Indexing API Submitter — FreePayrollCalc
 *
 * SETUP (one-time):
 *  1. Go to https://console.cloud.google.com → New Project → Enable "Web Search Indexing API"
 *  2. IAM & Admin → Service Accounts → Create → download key as credentials.json → save here
 *  3. Search Console → Settings → Users & permissions → Add user → paste service account email → Owner
 *  4. npm install  (in this folder)
 *
 * USAGE:
 *  node submit-index.js              → submit all URLs in sitemap
 *  node submit-index.js --new-only   → submit only URLs changed in last git commit
 *  node submit-index.js https://...  → submit a single URL
 *
 * LIMITS: Google allows 200 URL_UPDATED requests per day per service account.
 */
const { google } = require('googleapis');
const fs   = require('fs');
const path = require('path');
const https = require('https');

const SITE_ROOT   = path.join(__dirname, '..');
const CREDS_FILE  = path.join(__dirname, 'credentials.json');
const SITEMAP     = path.join(SITE_ROOT, 'sitemap.xml');
const LOG_FILE    = path.join(__dirname, 'submission-log.json');
const DOMAIN      = 'https://www.freepayrollcalc.com';
const DAILY_LIMIT = 200;

// ── Auth ──────────────────────────────────────────────────────────────────────
function getAuthClient() {
  if (!fs.existsSync(CREDS_FILE)) {
    console.error('\n❌ credentials.json not found in indexing-api/');
    console.error('   Follow SETUP instructions at the top of this file.\n');
    process.exit(1);
  }
  const credentials = JSON.parse(fs.readFileSync(CREDS_FILE, 'utf8'));
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing']
  });
}

// ── Submit one URL ────────────────────────────────────────────────────────────
async function submitUrl(client, url, type = 'URL_UPDATED') {
  const res = await client.request({
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    method: 'POST',
    data: { url, type }
  });
  return res.data;
}

// ── Parse sitemap ─────────────────────────────────────────────────────────────
function getSitemapUrls() {
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map(m => m[1].trim()).filter(u => u.startsWith(DOMAIN));
}

// ── Get URLs changed in last git commit ───────────────────────────────────────
function getNewUrls() {
  const { execSync } = require('child_process');
  try {
    const diff = execSync('git diff --name-only HEAD~1 HEAD', { cwd: SITE_ROOT }).toString();
    const files = diff.split('\n').filter(f => f.endsWith('.html'));
    return files.map(f => {
      const slug = f.replace(/\.html$/, '').replace(/\/index$/, '');
      return `${DOMAIN}/${slug}`.replace('//', '/').replace('https:/', 'https://');
    });
  } catch {
    console.log('⚠ Could not read git diff. Submitting all URLs instead.');
    return getSitemapUrls();
  }
}

// ── Load / save log ───────────────────────────────────────────────────────────
function loadLog() {
  if (!fs.existsSync(LOG_FILE)) return { submitted: {}, dailyCounts: {} };
  return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
}
function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const newOnly = args.includes('--new-only');
  const singleUrl = args.find(a => a.startsWith('http'));

  const auth = getAuthClient();
  const client = await auth.getClient();

  let urls;
  if (singleUrl) {
    urls = [singleUrl];
  } else if (newOnly) {
    urls = getNewUrls();
  } else {
    urls = getSitemapUrls();
  }

  const log = loadLog();
  const today = new Date().toISOString().split('T')[0];
  log.dailyCounts[today] = log.dailyCounts[today] || 0;

  const remaining = DAILY_LIMIT - log.dailyCounts[today];
  if (remaining <= 0) {
    console.log(`❌ Daily limit (${DAILY_LIMIT}) reached for ${today}. Try again tomorrow.`);
    process.exit(0);
  }

  console.log(`\n🔍 Submitting ${Math.min(urls.length, remaining)} of ${urls.length} URLs to Google Indexing API\n`);

  let ok = 0, fail = 0;
  for (const url of urls.slice(0, remaining)) {
    try {
      await submitUrl(client, url);
      log.submitted[url] = { date: today, status: 'ok' };
      log.dailyCounts[today]++;
      console.log(`  ✓ ${url}`);
      ok++;
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message;
      log.submitted[url] = { date: today, status: 'error', msg };
      console.log(`  ✗ ${url}\n    ${msg}`);
      fail++;
    }
    // Spread requests: ~3/sec to stay within rate limits
    await new Promise(r => setTimeout(r, 350));
  }

  saveLog(log);
  console.log(`\n✅ Done — ${ok} submitted, ${fail} failed. Daily usage: ${log.dailyCounts[today]}/${DAILY_LIMIT}`);

  if (urls.length > remaining) {
    const leftover = urls.length - remaining;
    console.log(`⚠ ${leftover} URLs skipped due to daily limit. Run again tomorrow.`);
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
