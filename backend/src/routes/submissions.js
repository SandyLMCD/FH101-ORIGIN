const { Router } = require('express');
const { db, stamp, logAudit } = require('../store/memoryStore');
const { requireRole } = require('../middleware/requireRole');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

const REVIEWER = {
  coordinator: 'Prof. Liezel Bartolome (Coordinator)',
  adviser: 'Engr. Ma. Teresa Salcedo (Adviser)',
};

function find(id, next) {
  const sub = db.submissions.find((s) => String(s.id) === String(id));
  if (!sub) next(new HttpError(404, 'Submission not found'));
  return sub;
}

/** GET /api/submissions?status=&mine=1&adviser= */
router.get('/', (req, res) => {
  const { status, mine, adviser } = req.query;
  let list = db.submissions;
  if (status) list = list.filter((s) => s.status === status);
  if (mine) list = list.filter((s) => s.mine);
  if (adviser) list = list.filter((s) => s.adviser === adviser);
  res.json({ submissions: list });
});

router.get('/:id', (req, res, next) => {
  const sub = find(req.params.id, next);
  if (sub) res.json({ submission: sub });
});

/** POST /api/submissions — student self-submission (metadata + OCR'd file reference). */
router.post('/', requireRole('student'), (req, res) => {
  const m = req.body || {};
  const area = m.area === 'Others' ? ((m.areaOther || '').trim() || 'Others') : m.area;
  const now = stamp().date;
  const sub = {
    id: Date.now(), submitter: m.submitter || 'Sandy Villarin', mine: true,
    title: m.title || 'Untitled manuscript', authors: m.authors || m.submitter || 'Sandy Villarin',
    program: m.program, sy: m.sy, sem: m.sem, area, adviser: m.adviser || '—',
    keywords: m.keywords || '', abstract: m.abstract || '—', file: m.file || '',
    date: now, status: 'Under review', remarks: '', attempt: 1,
    history: [{ ts: now, label: 'Submitted · attempt 1', by: m.submitter || 'Sandy Villarin' }],
  };
  db.submissions.unshift(sub);
  logAudit({ user: 'svillarin', role: 'Student', action: 'SUBMIT_PAPER', ip: req.ip });
  res.status(201).json({ submission: sub });
});

/** PATCH /api/submissions/:id — reviewer edits metadata before approving. */
router.patch('/:id', requireRole('coordinator', 'adviser'), (req, res, next) => {
  const sub = find(req.params.id, next); if (!sub) return;
  const allowed = ['title', 'authors', 'program', 'sy', 'sem', 'area', 'adviser', 'keywords', 'abstract'];
  for (const k of allowed) if (k in req.body) sub[k] = req.body[k];
  res.json({ submission: sub });
});

/** POST /api/submissions/:id/approve — publishes to the repository. */
router.post('/:id/approve', requireRole('coordinator', 'adviser'), (req, res, next) => {
  const sub = find(req.params.id, next); if (!sub) return;
  const by = REVIEWER[req.role] || REVIEWER.coordinator;
  sub.status = 'Approved';
  sub.history = (sub.history || []).concat({ ts: stamp().date, label: 'Approved and published', by });
  logAudit({ user: req.role === 'adviser' ? 'msalcedo' : 'lbartolome', role: req.role === 'adviser' ? 'Adviser' : 'Coordinator', action: 'APPROVE_SUBMISSION', code: String(sub.id), ip: req.ip });
  res.json({ submission: sub });
});

/** POST /api/submissions/:id/return  { remarks } */
router.post('/:id/return', requireRole('coordinator', 'adviser'), (req, res, next) => {
  const sub = find(req.params.id, next); if (!sub) return;
  const remarks = String(req.body?.remarks || '').trim();
  if (!remarks) return next(new HttpError(400, 'Add remarks before returning'));
  const by = REVIEWER[req.role] || REVIEWER.coordinator;
  sub.status = 'Returned'; sub.remarks = remarks;
  sub.history = (sub.history || []).concat({ ts: stamp().date, label: 'Returned for revision', by, remarks });
  logAudit({ user: 'lbartolome', role: 'Coordinator', action: 'RETURN_SUBMISSION', code: String(sub.id), ip: req.ip });
  res.json({ submission: sub });
});

/** POST /api/submissions/:id/resubmit  { file } — student uploads a revision. */
router.post('/:id/resubmit', requireRole('student'), (req, res, next) => {
  const sub = find(req.params.id, next); if (!sub) return;
  const attempt = (sub.attempt || 1) + 1;
  const now = stamp().date;
  Object.assign(sub, { status: 'Under review', attempt, date: now, file: req.body?.file || sub.file });
  sub.history = (sub.history || []).concat({ ts: now, label: 'Revision submitted · attempt ' + attempt, by: sub.submitter });
  logAudit({ user: 'svillarin', role: 'Student', action: 'SUBMIT_PAPER', code: String(sub.id), ip: req.ip });
  res.json({ submission: sub });
});

module.exports = router;
