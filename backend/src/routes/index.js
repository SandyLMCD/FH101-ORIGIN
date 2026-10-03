const { Router } = require('express');
const { db } = require('../store/memoryStore');

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true, service: 'fh101-origin-api', time: new Date().toISOString() }));

/** GET /api/bootstrap — everything the SPA needs on first load (one round-trip). */
router.get('/bootstrap', (_req, res) => {
  res.json({
    categories: db.categories,
    papers: db.papers,
    submissions: db.submissions,
    users: db.users,
    audit: db.audit,
    ocrJobs: db.ocrJobs,
    system: db.system,
  });
});

router.use('/auth', require('./auth'));
router.use('/categories', require('./categories'));
router.use('/papers', require('./papers'));
router.use('/submissions', require('./submissions'));
router.use('/users', require('./users'));
router.use('/audit', require('./audit'));
router.use('/analytics', require('./analytics'));
router.use('/ocr', require('./ocr'));
router.use('/backup', require('./backup'));
router.use('/citations', require('./citations'));

module.exports = router;
