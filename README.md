# Vitae — Resume Builder (zero-build)

A local-first resume builder: fill in your details across eight sections,
switch between 15 templates, 8 accent colors, and 6 font pairings with an
instant live preview, then export to PDF (print) or a Word document. All
data — including your photo — stays on your device in `localStorage`;
nothing is uploaded anywhere.

**No build step.** No `package.json`, no bundler. Every file here is
exactly what runs in the browser. Upload the whole folder to any static
host and it works.

## How to run it

**Deploy it:** upload every file in this folder — flat, no subfolder — to
any static host: GitHub Pages, Netlify (drag-and-drop the folder onto
their deploy page), Vercel, S3, nginx, your own server. Nothing to
configure.

**Preview it locally:** browsers block ES-module imports over `file://`,
so double-clicking `index.html` won't load the app. Serve the folder
instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## What's in it

### Sections (data entry)
Personal info + photo, Experience, Education, Co-Curricular Activities,
Achievements, Skills, Languages, References. Each is an independent form
component in `formPanel.js` that only ever writes to the store — none of
them know templates exist.

### 15 templates, built from 6 shared layout engines
Rather than 15 separate hand-built component trees, `templates.js` has:

- **Shared section renderers** (`ExperienceList`, `SkillsBlock`,
  `LanguagesList`, etc.) — each supports a couple of style variants
  (e.g. skills as tags, a comma-separated line, or decorative bars).
- **Six layout engines** — `SingleColumnLayout`, `SidebarLayout`,
  `BannerLayout`, `SplitLayout`, `TwoColumnBodyLayout` — that assemble
  those renderers into a page.
- **15 template specs** — plain data objects (`{ id, name, atsSafe, kind,
  sectionTitleStyle, skillStyle, order, ... }`) that pick a layout engine
  and a combination of style variants.

Adding template #16 means adding one spec object, not writing a new
component tree. The 15: Classic, Minimalist, Executive, Elegant Serif,
Bold Header, Card Sections, Modern Grid, Timeline, Banner, Two-Tone,
Sidebar, Sidebar Right, Compact, Compact Dense, Infographic Lite.

### Colors and fonts, decoupled from templates
`themes.js` holds 8 accent colors; `fonts.js` holds 6 font pairings
(loaded from Google Fonts in `index.html`). Neither knows which template
is active — so 15 templates × 8 colors × 6 fonts multiply into hundreds
of distinct-looking resumes without extra code.

### Exports
- **PDF** — `window.print()`, scoped to the preview page by the
  `@media print` rule in `styles.css`. Uses whichever visual template is
  selected.
- **DOCX** — `exportDocx.js`, using the `docx` library (loaded via the
  import map, generated fully client-side). This intentionally *ignores*
  the visual template and always produces one clean, simply-formatted
  document — the same reasoning that makes some templates "ATS-safe"
  applies doubly to the Word export.

### Dark mode
`uiStore.js` is a separate, tiny store for app-shell theme only (not
resume data), persisted to `localStorage` and applied via a
`data-theme` attribute on `<html>`, set before first paint to avoid a
flash of the wrong theme. Toggle is in the header. The resume preview
page itself (`.preview-page` in `styles.css`) stays literal white
regardless of the toggle — it's meant to be printed/exported, so it
should look like paper, not follow your OS theme.

## How dependencies work without a build step

`index.html` declares an **import map** so every file can write plain
`import React from 'react'`, `import { z } from 'zod'`, etc. — the
browser resolves those bare names to CDN URLs (`esm.sh`), no bundler
needed. `?external=react` on `react-dom` and `zustand` keeps everything
resolving to a single shared copy of React (two copies loaded at once is
the classic cause of "Invalid hook call" errors in setups like this).

If the pinned `docx@8.5.0` build ever 404s on `esm.sh` (package versions
do get superseded over time), drop the version pin in the import map —
`"docx": "https://esm.sh/docx"` resolves to whatever's current.

Requires a reasonably current browser (Chrome/Edge 89+, Firefox 108+,
Safari 16.4+ for import maps).

## File map (flat, no subfolders)

| File | Role |
|---|---|
| `index.html` | Import map, Google Fonts link, page shell. |
| `schema.js` | Zod schema for all eight resume sections — single source of truth. |
| `store.js` | Zustand store; every mutation re-validates via `resumeSchema.safeParse`; persisted to `localStorage`. |
| `uiStore.js` | Separate store for dark/light mode only. |
| `formPanel.js` | The eight data-entry section forms. |
| `photoUploader.js` | Client-side crop-to-square + compress for the profile photo. |
| `themes.js` | 8 accent colors. |
| `fonts.js` | 6 font pairings. |
| `templates.js` | The template engine: shared section renderers, 6 layout engines, 15 design specs. |
| `templateSelector.js` | Step 2 UI: template grid, accent swatches, font list. |
| `livePreview.js` | Renders the active template/theme/font; Print-PDF and Export-DOCX buttons. |
| `exportDocx.js` | Generates a plain, ATS-friendly `.docx` client-side. |
| `app.js` | App shell: step nav + dark-mode toggle. |
| `main.js` | Mounts the app; sets initial theme attribute; registers `sw.js`. |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Installable-PWA shell. |

## The core rule (unchanged)

**Forms only ever write to the schema-shaped resume object. Templates
only ever read from it.** New section? Add it to the schema, the store,
one form component, and the `renderSection` switch in `templates.js` —
every one of the 15 templates picks it up automatically wherever it
appears in their `order`/`sidebarKeys`.

## Natural next steps

- Move the photo to IndexedDB as a `Blob` once you need multiple resumes
  or larger photos.
- Multi-resume support: a `resumes: { [id]: Resume }` map in the store
  plus a picker screen — schema, templates, and the DOCX exporter don't
  need to change.
- A real ATS-content checker (bullet length, missing dates) independent
  of which of the 15 templates is chosen.
