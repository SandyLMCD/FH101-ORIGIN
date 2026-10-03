const { Router } = require('express');
const { db, logAudit } = require('../store/memoryStore');
const { requireRole } = require('../middleware/requireRole');
const { nextAccessionCode } = require('../services/accession');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

/**
 * GET /api/papers?q=&program=&sy=&sem=&area=&sort=
 * Server-side search/filter/sort mirroring the prototype's filteredPapers().
 */
router.get('/', (req, res) => {
  const { q = '', program, sy, sem, area, sort = 'Newest first' } = req.query;
  const needle = String(q).trim().toLowerCase();
  let list = db.papers.filter((p) => {
    if (program && p.program !== program) return false;
    if (sy && p.sy !== sy) return false;
    if (sem && p.sem !== sem) return false;
    if (area && p.area !== area) return false;
    if (!needle) return true;
    return p.title.toLowerCase().includes(needle) ||
      p.authors.join(' ').toLowerCase().includes(needle) ||
      p.keywords.join(' ').toLowerCase().includes(needle);
  });
  const yr = (p) => parseInt(p.sy.slice(0, 4), 10);
  if (sort === 'Newest first') list = list.slice().sort((a, b) => yr(b) - yr(a));
  else if (sort === 'Oldest first') list = list.slice().sort((a, b) => yr(a) - yr(b));
  else if (sort === 'Title A–Z') list = list.slice().sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'Most accessed') list = list.slice().sort((a, b) => b.views - a.views);
  res.json({ total: list.length, papers: list });
});

/** GET /api/papers/:code — paper detail; logs a VIEW_PAPER audit event. */
router.get('/:code', (req, res, next) => {
  const paper = db.papers.find((p) => p.code === req.params.code);
  if (!paper) return next(new HttpError(404, 'Paper not found'));
  paper.views += 1;
  logAudit({ user: req.get('x-demo-user') || 'svillarin', role: req.get('x-demo-role') || 'Student', action: 'VIEW_PAPER', code: paper.code, ip: req.ip });
  res.json({
    paper,
    contacts: paper.authors.map((n) => {
      const parts = n.toLowerCase().split(' ');
      return { name: n, email: parts[0].charAt(0) + parts[parts.length - 1] + '@my.xu.edu.ph' };
    }),
  });
});

/**
 * GET /api/papers/:code/pages/:n
 * View-only delivery: in production this rasterizes the page server-side,
 * watermarks it per user with `sharp`, and streams a PNG. The prototype returns
 * the same deterministic "page lines" the UI already draws.
 */
router.get('/:code/pages/:n', (req, res, next) => {
  const paper = db.papers.find((p) => p.code === req.params.code);
  if (!paper) return next(new HttpError(404, 'Paper not found'));
  const page = Math.max(1, Math.min(paper.pages, parseInt(req.params.n, 10) || 1));
  res.json({ code: paper.code, page, pages: paper.pages, watermark: req.get('x-demo-user') || 'svillarin' });
});

/** GET /api/papers/:code/search?q= — full-text hits inside a paper (OCR text in production). */
router.get('/:code/search', (req, res, next) => {
  const paper = db.papers.find((p) => p.code === req.params.code);
  if (!paper) return next(new HttpError(404, 'Paper not found'));
  const q = String(req.query.q || '').trim().toLowerCase();
  if (!q) return res.json({ pages: [] });
  const seed = q.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 7;
  const pages = [];
  for (let p = 1; p <= paper.pages; p++) if ((p + seed) % 7 === 3) pages.push(p);
  res.json({ pages });
});

/** POST /api/papers — coordinator "Upload & index": publishes a digitized manuscript. */
router.post('/', requireRole('coordinator', 'admin'), (req, res, next) => {
  const m = req.body || {};
  if (!m.program || !m.sy) return next(new HttpError(400, 'program and sy are required'));
  const paper = {
    code: nextAccessionCode({ kind: m.kind || 'CAP', program: m.program, sy: m.sy, programCodes: db.categories.programCodes, existingCount: db.papers.length }),
    title: m.title || 'Untitled manuscript',
    authors: String(m.authors || 'Unknown').split(',').map((x) => x.trim()).filter(Boolean),
    program: m.program, sy: m.sy, sem: m.sem, area: m.area,
    adviser: m.adviser || '—',
    abstract: m.abstract || 'Abstract pending encoding.',
    keywords: String(m.keywords || '').split(',').map((x) => x.trim()).filter(Boolean),
    pages: Number(m.pages) || 88,
    views: 0,
  };
  db.papers.unshift(paper);
  logAudit({ user: 'lbartolome', role: 'Coordinator', action: 'UPLOAD_MANUSCRIPT', code: paper.code, ip: req.ip });
  res.status(201).json({ paper });
});

module.exports = router;
