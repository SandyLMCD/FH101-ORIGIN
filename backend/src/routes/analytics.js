const { Router } = require('express');
const { db } = require('../store/memoryStore');
const { requireRole } = require('../middleware/requireRole');

const router = Router();

/** GET /api/analytics — figures for the coordinator analytics and admin paper-access panels. */
router.get('/', requireRole('coordinator', 'admin'), (_req, res) => {
  const weekVol = [['Mon', 132], ['Tue', 171], ['Wed', 149], ['Thu', 204], ['Fri', 186], ['Sat', 63], ['Sun', 41]];
  const monthVol = [['Feb', 2410], ['Mar', 3105], ['Apr', 2760], ['May', 1930], ['Jun', 2245], ['Jul', 2891]];

  const topPapers = db.papers.slice().sort((a, b) => b.views - a.views).slice(0, 5)
    .map((p) => ({ code: p.code, title: p.title.split(':')[0], views: p.views }));

  const syCount = {};
  db.papers.forEach((p) => { syCount[p.sy] = (syCount[p.sy] || 0) + 1; });
  const papersBySchoolYear = Object.keys(syCount).sort().map((k) => [k, syCount[k]]);

  const pa = {};
  db.audit.forEach((r) => {
    if (r.action === 'VIEW_PAPER' && r.code !== '—') {
      if (!pa[r.code]) pa[r.code] = { n: 0, last: r.ts, users: {} };
      pa[r.code].n++; pa[r.code].users[r.user] = 1;
    }
  });
  const paperAccess = Object.keys(pa).map((c) => {
    const p = db.papers.find((x) => x.code === c);
    return { code: c, title: p ? p.title.split(':')[0] : c, n: pa[c].n, users: Object.keys(pa[c].users).length, last: pa[c].last };
  }).sort((a, b) => b.n - a.n);

  res.json({ weekVol, monthVol, topPapers, papersBySchoolYear, paperAccess });
});

module.exports = router;
