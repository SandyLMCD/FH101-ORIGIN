const { Router } = require('express');
const { db, stamp, logAudit } = require('../store/memoryStore');
const { requireRole } = require('../middleware/requireRole');

const router = Router();

router.get('/', requireRole('admin'), (_req, res) => res.json({ ...db.system }));

/**
 * POST /api/backup/run — triggers a backup.
 * Production: dump the database + storage bucket and upload to the institutional
 * Google Drive via the `googleapis` client. Simulated with a short delay here.
 */
router.post('/run', requireRole('admin'), (req, res) => {
  if (db.system.backing) return res.status(409).json({ error: 'A backup is already running' });
  db.system.backing = true;
  setTimeout(() => {
    db.system.backing = false;
    db.system.lastBackup = stamp().full;
    logAudit({ action: 'BACKUP_RUN', ip: req.ip });
  }, 1800);
  res.status(202).json({ ...db.system });
});

module.exports = router;
