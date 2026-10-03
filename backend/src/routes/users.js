const { Router } = require('express');
const { db, logAudit } = require('../store/memoryStore');
const { requireRole } = require('../middleware/requireRole');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();
const ROLES = ['Student', 'Research Coordinator', 'Adviser', 'System Administrator'];

router.get('/', requireRole('admin'), (_req, res) => res.json({ users: db.users, roles: ROLES }));

/** PATCH /api/users/:email  { role?, status? } */
router.patch('/:email', requireRole('admin'), (req, res, next) => {
  const user = db.users.find((u) => u.email === req.params.email);
  if (!user) return next(new HttpError(404, 'User not found'));
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) return next(new HttpError(400, 'Invalid role'));
    user.role = req.body.role;
    logAudit({ user: 'rocampo', role: 'Admin', action: 'ROLE_CHANGE', ip: req.ip });
  }
  if (req.body.status) user.status = req.body.status;
  res.json({ user });
});

module.exports = router;
