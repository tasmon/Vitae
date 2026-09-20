import { create } from 'zustand';

// Separate from the resume store on purpose: this is app-shell UI state
// (dark/light), not resume content, and it applies immediately to
// document.documentElement rather than waiting on a React re-render.

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('vitae-ui-theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (err) {
    // localStorage unavailable (e.g. private browsing) — fall through.
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export const useUiStore = create((set, get) => ({
  theme: getInitialTheme(),

  // Call once, before the first render, so there's no flash of the wrong
  // theme while React mounts.
  initTheme: () => {
    document.documentElement.setAttribute('data-theme', get().theme);
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('vitae-ui-theme', next);
    } catch (err) {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', next);
    set({ theme: next });
  },
}));
