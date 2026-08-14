const fs = require('fs');
const path = 'test-results/results.json';
if (!fs.existsSync(path)) {
  console.log('REGRESSION SUMMARY: results file was not produced.');
  process.exit(0);
}
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
let passed=0, failed=0, skipped=0, flaky=0, total=0;
const failures=[];
function walk(suites=[]){
  for(const suite of suites){
    for(const spec of suite.specs||[]){
      for(const test of spec.tests||[]){
        const results=test.results||[];
        for(const r of results){
          total++;
          if(r.status==='passed') passed++;
          else if(r.status==='skipped') skipped++;
          else { failed++; failures.push(`${spec.title}: ${r.error?.message||r.status}`); }
        }
        if(test.status==='flaky') flaky++;
      }
    }
    walk(suite.suites||[]);
  }
}
walk(data.suites||[]);
const summary=[
  '## Cardbound Regression Summary',
  '',
  `- Executions: **${total}**`,
  `- Passed: **${passed}**`,
  `- Failed: **${failed}**`,
  `- Skipped: **${skipped}**`,
  `- Flaky tests: **${flaky}**`,
  '',
  failed ? '### Failures\n'+failures.slice(0,50).map(x=>`- ${x.replace(/\n/g,' ')}`).join('\n') : '✅ All executed regression tests passed.'
].join('\n');
console.log(summary);
if(process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary+'\n');
