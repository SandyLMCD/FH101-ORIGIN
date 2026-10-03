# FH101 ORIGIN — Frontend (React + Vite)

```
npm install
npm run dev        # http://localhost:5173 — proxies /api to http://localhost:4000
npm run build      # production bundle in dist/
```

## How the code is organized

| Path | Role |
|---|---|
| `src/App.jsx` | Application controller: all UI state, API calls, and the `renderVals()` view-model builder (ported from the prototype's logic class). |
| `src/AppView.jsx` | Pure composition of screens/components, in the same order as the prototype. |
| `src/screens/*.jsx` | One file per screen (18). Each receives the view-model bag `v` and renders markup only. |
| `src/components/*.jsx` | Sidebar, CiteModal, RoleSwitcher (demo), Toasts. |
| `src/api/client.js` | Every call to the Express backend. Nothing else builds URLs. |
| `src/styles/global.css` | Design tokens (`--ink-*`, `--azure-*`, …), light/dark themes, generated hover classes. |

Set `VITE_API_URL` (see `.env.example`) when the API is not on the same origin, e.g. for Netlify → Render.
