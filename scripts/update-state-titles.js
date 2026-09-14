const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'payroll-tax-calculator');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let updated = 0;

files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  // 1. <title>: "[State] Payroll Tax Calculator 2026 | FreePayrollCalc"
  //          -> "[State] Payroll Calculator 2026 — Tax Rates & Net Pay | FreePayrollCalc"
  html = html.replace(
    /(<title>)([\w\s\.]+) Payroll Tax Calculator 2026 \| FreePayrollCalc(<\/title>)/g,
    '$1$2 Payroll Calculator 2026 — Tax Rates & Net Pay | FreePayrollCalc$3'
  );

  // 2. H1: "[State] Payroll Tax Calculator 2026</h1>"
  //     -> "[State] Payroll Calculator 2026</h1>"
  html = html.replace(
    /([\w\s\.]+) Payroll Tax Calculator 2026(<\/h1>)/g,
    '$1 Payroll Calculator 2026$2'
  );

  // 3. Meta description: "Free [state] payroll tax calculator 2026."
  //                   -> "Free [state] payroll calculator 2026."
  html = html.replace(
    /Free ([\w\s\.]+) payroll tax calculator 2026\./gi,
    'Free $1 payroll calculator 2026.'
  );

  // 4. OG title: "[State] Payroll Tax Calculator 2026"
  //           -> "[State] Payroll Calculator 2026 — Tax Rates & Net Pay"
  html = html.replace(
    /(og:title" content=")([\w\s\.]+) Payroll Tax Calculator 2026(")/g,
    '$1$2 Payroll Calculator 2026 — Tax Rates & Net Pay$3'
  );

  // 5. JSON-LD name field
  html = html.replace(
    /"name":"([\w\s\.]+) Payroll Tax Calculator 2026"/g,
    '"name":"$1 Payroll Calculator 2026"'
  );

  if (html !== orig) {
    fs.writeFileSync(fp, html, 'utf8');
    updated++;
    console.log('Updated:', file);
  }
});

console.log('\nTotal updated:', updated, 'of', files.length, 'state pages');
