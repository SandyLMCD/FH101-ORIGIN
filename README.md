# FH101 ORIGIN

**A Knowledge Management Repository for the College of Computer Studies**
Xavier University – Ateneo de Cagayan

This repository splits the single-file `FH101-ORIGIN-Prototype_v1.html` into a proper two-tier project:

- `frontend/` — ReactJS (Vite) single-page app. Every screen from the prototype, one component per screen.
- `backend/` — Node.js / Express REST API. Owns the data, the citation engine, the accession-code generator, role checks, OCR and backup job handling, and the audit log.

```
fh101-origin/
├── README.md
├── package.json                 # convenience scripts for both halves
├── .gitignore
├── .github/workflows/ci.yml     # runs backend tests + frontend build on push/PR
│
├── backend/                     # Node.js / Express API  (port 4000)
│   ├── package.json
│   ├── .env.example
│   ├── README.md
│   ├── src/
│   │   ├── server.js            # entry point
│   │   ├── app.js               # express app (cors, json, logging, routes, errors)
│   │   ├── config.js            # env settings
│   │   ├── data/seed.js         # mock dataset moved out of the UI
│   │   ├── store/memoryStore.js # in-memory DB + audit logger (Supabase goes here later)
│   │   ├── services/
│   │   │   ├── citation.js      # APA 7 / IEEE / Harvard / MLA + CSL-JSON (Zotero)
│   │   │   └── accession.js     # [THE/CAP]-[PROGRAM]-[KEY]-[YEAR]
│   │   ├── middleware/
│   │   │   ├── requireRole.js   # role guard (x-demo-role header → JWT later)
│   │   │   └── errorHandler.js
│   │   └── routes/
│   │       ├── index.js         # mounts everything under /api
│   │       ├── auth.js          # Account Management
│   │       ├── papers.js        # Repository
│   │       ├── submissions.js   # Submission and Review
│   │       ├── citations.js     # Citation
│   │       ├── ocr.js           # OCR jobs (simulated Scribe.js pipeline)
│   │       ├── users.js         # System Management
│   │       ├── categories.js
│   │       ├── audit.js
│   │       ├── analytics.js
│   │       └── backup.js
│   └── test/api.test.js         # node:test smoke tests
│
└── frontend/                    # ReactJS + Vite  (port 5173)
    ├── package.json
    ├── vite.config.js           # dev proxy: /api → http://localhost:4000
    ├── index.html               # Google Fonts (Inter, Inter Tight, Instrument Serif, JetBrains Mono)
    ├── .env.example
    ├── README.md
    └── src/
        ├── main.jsx
        ├── App.jsx              # state + API calls + renderVals() view-model
        ├── AppView.jsx          # composes screens/components
        ├── api/client.js        # all fetch calls to the backend
        ├── styles/global.css    # design tokens, themes, hover states
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── CiteModal.jsx
        │   ├── RoleSwitcher.jsx # demo "view as" bar
        │   └── Toasts.jsx
        └── screens/
            ├── LandingScreen.jsx
            ├── RegisterScreen.jsx
            ├── RepositoryScreen.jsx
            ├── PaperDetailScreen.jsx
            ├── ReaderScreen.jsx
            ├── BookmarksScreen.jsx
            ├── SubmitYourPaperScreen.jsx
            ├── MySubmissionsScreen.jsx
            ├── SubmissionDetailScreen.jsx
            ├── ProfileScreen.jsx
            ├── ReviewQueueScreen.jsx
            ├── SubmissionReviewScreen.jsx
            ├── UploadAndIndexScreen.jsx
            ├── CoordinatorAnalyticsScreen.jsx
            ├── UsersAndRolesScreen.jsx
            ├── CategoriesScreen.jsx
            ├── AuditLogScreen.jsx
            └── BackupAndSystemScreen.jsx
```

## Run it locally

Requires Node.js 18+.

```bash
# 1. install both halves
npm run install:all

# 2. backend (terminal 1)
cd backend && cp .env.example .env && npm run dev     # http://localhost:4000

# 3. frontend (terminal 2)
cd frontend && npm run dev                            # http://localhost:5173
```

Open http://localhost:5173. The Vite dev server proxies `/api/*` to the Express server, so no CORS setup is needed in development.

Run the backend tests with `npm test` (from the root or from `backend/`).

## How the prototype maps to the split

| Prototype (single HTML) | Now lives in |
|---|---|
| Hard-coded `papers`, `subs`, `users`, audit rows, OCR jobs, programs/areas | `backend/src/data/seed.js`, served by `GET /api/bootstrap` and per-module routes |
| `citeStr()` | `backend/src/services/citation.js` → `GET /api/citations/:code?format=` |
| Accession code generation in `publishUpload()` | `backend/src/services/accession.js` → `POST /api/papers` |
| `approve()`, `sendReturn()`, resubmit, `submitPaper()` | `backend/src/routes/submissions.js` |
| `startOcr()` timer | `POST /api/ocr/jobs` + polling `GET /api/ocr/jobs/:id` |
| `runBackup()` timer | `POST /api/backup/run` + polling `GET /api/backup` |
| Role switching | `api.setIdentity()` sets `x-demo-role`; backend `requireRole` enforces it (students get **403** on reviewer actions) |
| Template DSL (`sc-if`, `sc-for`, `{{…}}`, `style-hover`) | Plain JSX in `frontend/src/screens/*`; hover styles became `.hv-N` classes in `global.css` |
| Logic class (`renderVals()`) | `frontend/src/App.jsx` — same method names, so the two can be diffed |

## What is still prototype behaviour

- **Store is in-memory** — data resets when the backend restarts. `memoryStore.js` is the single file to replace with Supabase (PostgreSQL + RLS).
- **Auth is a domain check** (`@xu.edu.ph`, `@my.xu.edu.ph`), not real authentication. Swap for Supabase Auth and verify JWTs in `requireRole`.
- **OCR and backup are simulated** with timers. Real work: Scribe.js pipeline behind `POST /api/ocr/jobs`; `googleapis` Drive upload behind `POST /api/backup/run`.
- **Reader pages are placeholders** — `GET /api/papers/:code/pages/:n` is where server-side rasterizing + `sharp` watermarking goes (view-only delivery, deterrence not prevention).
- **Bookmarks and folders** are still client state; add a `bookmarks` route when the schema is ready.

## Push to a new GitHub repository

Create an empty repo on GitHub first (no README, no .gitignore), then:

```bash
cd fh101-origin

git init
git add .
git commit -m "feat: split FH101 ORIGIN prototype into React frontend and Express backend"
git branch -M main
git remote add origin https://github.com/<your-username>/fh101-origin.git
git push -u origin main
```

Suggested branch protection for the team: PRs into `main`, CI must pass (`.github/workflows/ci.yml`).

## Team

| Name | Role |
|---|---|
| Sandy Lumacad | Team lead, paper lead, Account Management module |
| Joshua Argel B. Detchaca | Diagrams (architecture / wireframes), ReactJS scaffolding |
| Ethan Dale B. Dosdos | Diagrams (ERD / data flow), schema / RLS |
| Emma Lene G. Ejera | Development lead — infrastructure, OCR spike, CI setup |

Adviser: Sir Patrick Oliva · Client: College of Computer Studies Admin
