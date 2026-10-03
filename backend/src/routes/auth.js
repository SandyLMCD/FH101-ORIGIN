const { Router } = require('express');
const { db, logAudit } = require('../store/memoryStore');
const config = require('../config');
const { HttpError } = require('../middleware/errorHandler');

const router = Router();

/** Demo identities used by the role switcher. */
const DEMO = {
  student: { name: 'Sandy Villarin', email: 'svillarin@my.xu.edu.ph', role: 'Student' },
  coordinator: { name: 'Prof. Liezel Bartolome', email: 'lbartolome@xu.edu.ph', role: 'Research Coordinator' },
  adviser: { name: 'Engr. Ma. Teresa Salcedo', email: 'msalcedo@xu.edu.ph', role: 'Adviser' },
  admin: { name: 'Ramil Ocampo', email: 'rocampo@xu.edu.ph', role: 'System Administrator' },
};

/** POST /api/auth/login  { email, password } — XU-domain check only (Supabase Auth later). */
router.post('/login', (req, res, next) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const domain = email.split('@')[1];
  if (!config.allowedEmailDomains.includes(domain)) {
    return next(new HttpError(401, 'Sign in with your XU email (@xu.edu.ph or @my.xu.edu.ph)'));
  }
  const user = db.users.find((u) => u.email.toLowerCase() === email) || { ...DEMO.student, email };
  if (user.status === 'Suspended') return next(new HttpError(403, 'This account is suspended'));
  logAudit({ user: email.split('@')[0], role: user.role, action: 'LOGIN', ip: req.ip });
  res.json({ user, token: 'demo-token' });
});

/** POST /api/auth/register  { name, email, program, yearLevel } */
router.post('/register', (req, res, next) => {
  const { name, email } = req.body || {};
  const domain = String(email || '').split('@')[1];
  if (!name || !config.allowedEmailDomains.includes(domain)) {
    return next(new HttpError(400, 'Name and a valid XU email are required'));
  }
  const user = { name, email, role: 'Student', status: 'Active', last: '—' };
  db.users.push(user);
  res.status(201).json({ user, token: 'demo-token' });
});

/** GET /api/auth/demo/:role — profile for the demo role switcher (student|coordinator|adviser|admin). */
router.get('/demo/:role', (req, res, next) => {
  const u = DEMO[req.params.role];
  if (!u) return next(new HttpError(404, 'Unknown demo role'));
  res.json({ user: u });
});

module.exports = router;
