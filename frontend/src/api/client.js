/**
 * Thin fetch wrapper for the FH101 ORIGIN API.
 * All backend calls live here so screens/App never build URLs themselves.
 */
const BASE = import.meta.env.VITE_API_URL || '/api';

let demoRole = 'student';
let demoUser = 'svillarin';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'content-type': 'application/json', 'x-demo-role': demoRole, 'x-demo-user': demoUser, ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `${res.status} ${res.statusText}`);
  return data;
}

export const api = {
  /** Demo role switcher support — the real app will send a Supabase JWT instead. */
  setIdentity(role, user) { demoRole = role; if (user) demoUser = user; },

  bootstrap: () => request('/bootstrap'),
  health: () => request('/health'),

  // Account Management
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),

  // Repository
  listPapers: (params) => request('/papers?' + new URLSearchParams(params)),
  viewPaper: (code) => request(`/papers/${encodeURIComponent(code)}`),
  searchInPaper: (code, q) => request(`/papers/${encodeURIComponent(code)}/search?q=${encodeURIComponent(q)}`),
  publishPaper: (meta) => request('/papers', { method: 'POST', body: meta }),

  // Submission and Review
  listSubmissions: (params = {}) => request('/submissions?' + new URLSearchParams(params)),
  createSubmission: (meta) => request('/submissions', { method: 'POST', body: meta }),
  updateSubmission: (id, patch) => request(`/submissions/${id}`, { method: 'PATCH', body: patch }),
  approveSubmission: (id) => request(`/submissions/${id}/approve`, { method: 'POST' }),
  returnSubmission: (id, remarks) => request(`/submissions/${id}/return`, { method: 'POST', body: { remarks } }),
  resubmit: (id, file) => request(`/submissions/${id}/resubmit`, { method: 'POST', body: { file } }),

  // Citation
  citation: (code, format) => request(`/citations/${encodeURIComponent(code)}?format=${encodeURIComponent(format)}`),
  zoteroUrl: (code) => `${BASE}/citations/${encodeURIComponent(code)}/zotero`,

  // OCR
  startOcr: (file, pages) => request('/ocr/jobs', { method: 'POST', body: { file, pages } }),
  ocrJob: (id) => request(`/ocr/jobs/${id}`),
  ocrJobs: () => request('/ocr/jobs'),

  // System Management
  users: () => request('/users'),
  setUserRole: (email, role) => request(`/users/${encodeURIComponent(email)}`, { method: 'PATCH', body: { role } }),
  categories: () => request('/categories'),
  addArea: (name) => request('/categories/areas', { method: 'POST', body: { name } }),
  audit: (params = {}) => request('/audit?' + new URLSearchParams(params)),
  analytics: () => request('/analytics'),
  backupStatus: () => request('/backup'),
  runBackup: () => request('/backup/run', { method: 'POST' }),
};
