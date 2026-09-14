# Google Indexing API — One-Time Setup

Follow these steps **once**. After that, every git push auto-submits changed pages.

---

## Step 1 — Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click **Select a project** → **New Project**
3. Name it `freepayrollcalc-indexing` → Create

---

## Step 2 — Enable the Indexing API

1. In your new project, go to **APIs & Services → Library**
2. Search for **"Web Search Indexing API"**
3. Click it → **Enable**

---

## Step 3 — Create Service Account + Download Key

1. Go to **IAM & Admin → Service Accounts**
2. Click **Create Service Account**
3. Name: `indexing-submitter` → Continue → Done
4. Click on the new service account email
5. Go to **Keys** tab → **Add Key → Create new key → JSON**
6. A file downloads — rename it `credentials.json`
7. Place it in this folder: `indexing-api/credentials.json`

> ⚠️ Never commit credentials.json to git. It's already in .gitignore.

---

## Step 4 — Add Service Account to Search Console

1. Go to https://search.google.com/search-console
2. Select your freepayrollcalc.com property
3. **Settings → Users and permissions → Add user**
4. Paste the service account email (looks like `indexing-submitter@your-project.iam.gserviceaccount.com`)
5. Set permission to **Owner** → Add

---

## Step 5 — Add GitHub Secret (for auto-indexing on deploy)

1. Go to your GitHub repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `GOOGLE_INDEXING_CREDENTIALS`
4. Value: paste the entire contents of credentials.json
5. Save

---

## Step 6 — Test It

```bash
cd indexing-api
npm install
node submit-index.js https://www.freepayrollcalc.com/savings-calculator
```

You should see:
```
✓ https://www.freepayrollcalc.com/savings-calculator
Done — 1 submitted, 0 failed.
```

---

## Usage

```bash
# Submit all 90+ URLs in sitemap (first time)
node submit-index.js

# Submit only URLs changed in last git commit
node submit-index.js --new-only

# Submit a single URL
node submit-index.js https://www.freepayrollcalc.com/new-page

# Via npm
npm run submit
npm run submit-new
```

**Daily limit: 200 URLs.** Submission log saved to `submission-log.json`.

---

## After Setup: Automatic Flow

```
You push HTML to GitHub
    ↓
GitHub Action triggers (auto-index.yml)
    ↓
Only changed HTML files are detected via git diff
    ↓
URLs submitted to Google Indexing API
    ↓
Google indexes new pages within 2–4 hours
```

No manual steps needed after the one-time setup.
