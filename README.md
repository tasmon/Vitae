# Vitae — Resume Builder (zero-build)

A local-first resume builder: fill in your details, switch between
templates and accent themes with an instant live preview, export to PDF
via the browser's print dialog. All data — including your photo — stays
on your device in `localStorage`; nothing is uploaded anywhere.

**This version has no build step.** There is no `package.json`, no `npm
install`, no bundler. Every file here is exactly what runs in the browser.
Upload the whole folder to any static host and it works.

## How to run it

**Deploy it (recommended):** upload every file in this folder — flat, no
subfolder — to any static host: GitHub Pages, Netlify (drag-and-drop the
folder onto their deploy page), Vercel, S3, nginx, your own server. Nothing
to configure. Open the site and it works.

**Preview it locally:** browsers block ES-module imports over `file://`
for security reasons (this is true of any zero-build ES-module app, not
specific to this one), so double-clicking `index.html` directly won't
load the app. Serve the folder instead — one command, no install needed:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Or `npx serve .`, or the VS Code "Live Server" extension — anything that
serves static files over `http://` works.)

## How dependencies work without a build step

`index.html` declares an **import map**:

```html
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@18.3.1",
    "react-dom/client": "https://esm.sh/react-dom@18.3.1/client?external=react",
    "zustand": "https://esm.sh/zustand@4.5.2?external=react",
    "zustand/middleware": "https://esm.sh/zustand@4.5.2/middleware?external=react",
    "zod": "https://esm.sh/zod@3.23.8"
  }
}
</script>
```

Every file below can write plain, ordinary `import React from 'react'` —
the browser itself resolves `"react"` to that CDN URL, no bundler
required. `esm.sh` serves real, browser-ready ES modules for npm packages.
The `?external=react` flag on `react-dom` and `zustand` tells esm.sh not
to bundle a private copy of React inside them, and instead resolve their
own internal `import ... from 'react'` through this same import map — so
there's only ever one copy of React loaded, which matters because two
copies loaded side by side is the classic cause of "Invalid hook call"
errors in setups like this.

Requires a reasonably current browser (Chrome/Edge 89+, Firefox 108+,
Safari 16.4+ — import maps landed a bit later in Safari). All evergreen
browsers from the last ~2 years are fine.

## File map (flat, no subfolders)

| File | Role |
|---|---|
| `index.html` | Import map + page shell. Loads `main.js` as an ES module. |
| `schema.js` | Zod schema — single source of truth for what a "resume" is. |
| `store.js` | Zustand store. Every mutation runs the resume through `resumeSchema.safeParse` and keeps any validation errors alongside the data. Persisted to `localStorage` automatically. |
| `formPanel.js` | The modular data-entry system — `PersonalForm`, `ExperienceForm`, `EducationForm`, `SkillsForm` only ever write to the store; they know nothing about templates. |
| `photoUploader.js` | File picker → `FileReader` → centered square crop on a `<canvas>` → resized/compressed JPEG data URL, stored in the resume object. Fully client-side. |
| `templates.js` | The template engine. `templates` is a registry of `{ id, name, atsSafe, Component }`. Each `Component` is a pure function of `(resume, theme)` — reads the schema-shaped data, never writes to it. Ships Classic (ATS-safe), Sidebar, and Compact two-column. |
| `themes.js` | Accent color + font-pairing tokens, applied independently of template choice, so template × theme combinations multiply instead of needing a new component per look. |
| `templateSelector.js` | Step 2 UI: pick a template, pick an accent. |
| `livePreview.js` | Renders the active template + theme against live store state; "Download / Print PDF" triggers `window.print()`, scoped by the `@media print` rule in `styles.css`. |
| `app.js` | Two-step shell (Data entry → Template & theme) with the preview always visible alongside. |
| `main.js` | Mounts the app; registers `sw.js`. |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Minimal installable-PWA shell: offline app-shell caching (same-origin files only — CDN modules are left to the browser's normal HTTP cache) + manifest metadata. |

## Why there's no JSX

JSX needs a compiler (Babel/TypeScript/etc.) to turn into real JavaScript
— that's a build step. Every component here is written with
`React.createElement` directly instead (aliased to `h` at the top of each
file for brevity), which is exactly what JSX compiles down to anyway. It
reads slightly more verbosely than JSX, but it's plain JavaScript the
browser can run as-is.

## The core architectural rule (unchanged from the build-based version)

**Forms only ever write to the schema-shaped resume object. Templates
only ever read from it.** That's what lets you add template #10 without
touching a form component, and add a new form field without breaking any
existing template.

## Natural next steps

- Move the photo from `localStorage` (as a base64 string) to IndexedDB as
  a `Blob` once you need multiple resumes or larger photos — cheaper
  storage, faster serialization.
- Multi-resume support: add a `resumes: { [id]: Resume }` map to the
  store plus a picker screen. Schema and templates don't need to change.
- If you want a bundler back later purely for JSX ergonomics or offline
  vendoring of React/Zustand/Zod (so the app works with zero network
  calls at all), that's a separate, optional step — this version
  intentionally trades a little verbosity for having no build tooling at
  all.
