# FH101 ORIGIN — Backend (Node.js / Express)

```
cp .env.example .env
npm install
npm run dev        # http://localhost:4000 (restarts on change)
npm test           # node:test suite in test/
```

## Layout

| Path | Role |
|---|---|
| `src/server.js` | Boots the HTTP server. |
| `src/app.js` | Express app: CORS, JSON, logging, `/api` router, error handling. |
| `src/config.js` | Env-driven settings (port, CORS origins, OCR timing, allowed XU email domains). |
| `src/routes/*.js` | One router per module (see table below). |
| `src/services/` | Pure domain logic: `citation.js` (APA 7 / IEEE / Harvard / MLA + CSL-JSON for Zotero), `accession.js` (`[THE/CAP]-[PROGRAM]-[KEY]-[YEAR]`). |
| `src/store/memoryStore.js` | In-memory data store + audit logger. Swap for a Supabase-backed module with the same exports. |
| `src/data/seed.js` | Mock dataset lifted from the prototype. |
| `src/middleware/` | `requireRole` (reads `x-demo-role` until Supabase Auth/JWT lands) and error handlers. |

## API

| Module | Endpoints |
|---|---|
| Bootstrap | `GET /api/health`, `GET /api/bootstrap` |
| Account Management | `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/demo/:role` |
| Repository | `GET /api/papers?q&program&sy&sem&area&sort`, `GET /api/papers/:code`, `GET /api/papers/:code/pages/:n`, `GET /api/papers/:code/search?q`, `POST /api/papers` (coordinator/admin) |
| Submission & Review | `GET /api/submissions`, `POST /api/submissions` (student), `PATCH /api/submissions/:id`, `POST /api/submissions/:id/approve`, `POST /api/submissions/:id/return`, `POST /api/submissions/:id/resubmit` |
| Citation | `GET /api/citations/:code?format=`, `GET /api/citations/:code/zotero` |
| OCR | `POST /api/ocr/jobs`, `GET /api/ocr/jobs`, `GET /api/ocr/jobs/:id` |
| System Management | `GET/PATCH /api/users/:email`, `GET /api/categories`, `POST /api/categories/areas`, `GET /api/audit`, `GET /api/analytics`, `GET /api/backup`, `POST /api/backup/run` |

The role guard reads the `x-demo-role` header (`student`, `coordinator`, `adviser`, `admin`). The frontend's demo role switcher sets it.
