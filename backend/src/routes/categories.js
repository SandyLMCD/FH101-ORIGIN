const { Router } = require('express');
const { db, logAudit } = require('../store/memoryStore');
const { requireRole } = require('../middleware/requireRole');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

/** GET /api/categories — programs, areas, semesters, school years + paper counts. */
router.get('/', (_req, res) => {
  const c = db.categories;
  res.json({
    ...c,
    programRows: c.programs.map((p) => ({ name: p, code: c.programCodes[p], count: db.papers.filter((x) => x.program === p).length })),
    areaRows: c.areas.map((a) => ({ name: a, count: db.papers.filter((x) => x.area === a).length })),
  });
});

/** POST /api/categories/areas  { name } — admin adds a research area. */
router.post('/areas', requireRole('admin'), (req, res, next) => {
  const name = String(req.body?.name || '').trim();
  if (!name) return next(new HttpError(400, 'Area name is required'));
  if (!db.categories.areas.includes(name)) db.categories.areas.push(name);
  logAudit({ user: 'rocampo', role: 'Admin', action: 'CATEGORY_ADD', ip: req.ip });
  res.status(201).json({ areas: db.categories.areas });
});

module.exports = router;
