const { Router } = require('express');
const { db } = require('../store/memoryStore');
const { requireRole } = require('../middleware/requireRole');

const router = Router();

/** GET /api/audit?days=7|30|all&action=&user= */
router.get('/', requireRole('admin', 'coordinator'), (req, res) => {
  const { days = 'all', action, user } = req.query;
  const limit = days === 'all' ? Infinity : Number(days);
  const rows = db.audit.filter((r) => r.d <= limit && (!action || r.action === action) && (!user || r.user === user));
  res.json({
    total: rows.length,
    rows,
    actions: Array.from(new Set(db.audit.map((r) => r.action))),
    users: Array.from(new Set(db.audit.map((r) => r.user))),
  });
});

module.exports = router;
