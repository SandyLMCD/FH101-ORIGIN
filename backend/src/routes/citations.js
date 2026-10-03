const { Router } = require('express');
const { db } = require('../store/memoryStore');
const { FORMATS, cite, toCslJson } = require('../services/citation');
const { HttpError } = require('../middleware/errorHandler');
const { logAudit } = require('../store/memoryStore');

const router = Router();

/** GET /api/citations/:code?format=APA%207 */
router.get('/:code', (req, res, next) => {
  const paper = db.papers.find((p) => p.code === req.params.code);
  if (!paper) return next(new HttpError(404, 'Paper not found'));
  const format = FORMATS.includes(req.query.format) ? req.query.format : 'APA 7';
  res.json({ code: paper.code, format, formats: FORMATS, citation: cite(paper, format) });
});

/** GET /api/citations/:code/zotero — CSL-JSON download for Zotero import. */
router.get('/:code/zotero', (req, res, next) => {
  const paper = db.papers.find((p) => p.code === req.params.code);
  if (!paper) return next(new HttpError(404, 'Paper not found'));
  logAudit({ user: req.get('x-demo-user') || 'svillarin', role: 'Student', action: 'CITE_EXPORT', code: paper.code, ip: req.ip });
  res.setHeader('Content-Disposition', `attachment; filename="${paper.code}.json"`);
  res.json([toCslJson(paper)]);
});

module.exports = router;
