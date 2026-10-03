/**
 * In-memory data store for the prototype.
 *
 * Every route module talks to this store instead of touching the seed arrays
 * directly, so swapping in Supabase later means replacing this one file with
 * a module that exposes the same functions backed by `@supabase/supabase-js`.
 */
const seed = require('../data/seed');

const clone = (x) => JSON.parse(JSON.stringify(x));

const db = {
  categories: clone(seed.categories),
  papers: clone(seed.papers),
  submissions: clone(seed.submissions),
  users: clone(seed.users),
  audit: clone(seed.audit),
  ocrJobs: clone(seed.ocrJobs),
  system: { lastBackup: 'Jul 24, 2026 02:00', backing: false },
};

function stamp() {
  const t = new Date();
  const mon = t.toLocaleString('en-US', { month: 'short' });
  const hh = String(t.getHours()).padStart(2, '0');
  const mm = String(t.getMinutes()).padStart(2, '0');
  return {
    date: `${mon} ${String(t.getDate()).padStart(2, '0')}, ${t.getFullYear()}`,
    short: `${mon} ${String(t.getDate()).padStart(2, '0')} ${hh}:${mm}`,
    full: `${mon} ${String(t.getDate()).padStart(2, '0')}, ${t.getFullYear()} ${hh}:${mm}`,
  };
}

function logAudit({ user = 'system', role = 'System', action, code = '—', ip = '127.0.0.1' }) {
  const entry = { ts: stamp().short, user, role, action, code, ip, d: 0 };
  db.audit.unshift(entry);
  return entry;
}

module.exports = { db, stamp, logAudit };
