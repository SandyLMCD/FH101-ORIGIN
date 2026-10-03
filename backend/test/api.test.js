const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server, base;
test.before(() => new Promise((r) => { server = app.listen(0, () => { base = `http://localhost:${server.address().port}`; r(); }); }));
test.after(() => server.close());

test('bootstrap returns seeded collections', async () => {
  const res = await fetch(`${base}/api/bootstrap`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.ok(body.papers.length >= 12);
  assert.equal(body.categories.programs.length, 4);
});

test('papers search filters by keyword', async () => {
  const res = await fetch(`${base}/api/papers?q=flood`);
  const body = await res.json();
  assert.equal(body.total, 1);
  assert.equal(body.papers[0].code, 'THE-0100-0045-2021');
});

test('citation endpoint renders APA 7', async () => {
  const res = await fetch(`${base}/api/citations/THE-0100-0045-2021?format=APA%207`);
  const body = await res.json();
  assert.match(body.citation, /^Roa, A\. J\., & Neri, P\. M\. \(2021\)/);
});

test('students cannot approve submissions', async () => {
  const res = await fetch(`${base}/api/submissions/1/approve`, { method: 'POST', headers: { 'x-demo-role': 'student' } });
  assert.equal(res.status, 403);
});

test('coordinator can return a submission with remarks', async () => {
  const res = await fetch(`${base}/api/submissions/2/return`, {
    method: 'POST', headers: { 'x-demo-role': 'coordinator', 'content-type': 'application/json' },
    body: JSON.stringify({ remarks: 'Fix the abstract' }),
  });
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.submission.status, 'Returned');
});
