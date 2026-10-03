const { Router } = require('express');
const { db, stamp } = require('../store/memoryStore');
const config = require('../config');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();
const live = new Map(); // jobId -> job (in-flight simulated jobs)

/**
 * POST /api/ocr/jobs  { file, pages }
 * Starts an OCR job. The prototype simulates the Scribe.js pipeline with a timer;
 * the real implementation accepts a multipart PDF upload, runs OCR, and stores
 * the extracted text for full-text search.
 */
router.post('/jobs', (req, res) => {
  const id = String(Date.now());
  const job = { id, file: req.body?.file || 'upload.pdf', pages: String(req.body?.pages || '—'), status: 'Processing', dur: '—', when: stamp().short.replace(' ', ', ') };
  live.set(id, job);
  const started = Date.now();
  setTimeout(() => {
    const secs = Math.round((Date.now() - started) / 1000);
    Object.assign(job, { status: 'Complete', dur: `0m ${String(secs).padStart(2, '0')}s` });
    db.ocrJobs.unshift({ ...job });
    live.delete(id);
  }, config.ocrSeconds * 1000);
  res.status(202).json({ job });
});

router.get('/jobs', (_req, res) => res.json({ jobs: [...live.values(), ...db.ocrJobs] }));

router.get('/jobs/:id', (req, res, next) => {
  const job = live.get(req.params.id) || db.ocrJobs.find((j) => j.id === req.params.id);
  if (!job) return next(new HttpError(404, 'OCR job not found'));
  res.json({ job });
});

module.exports = router;
