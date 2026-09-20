// Accent color only — font pairing is a separate, independent choice (see
// fonts.js). Keeping these decoupled is what lets 15 templates × 8 colors
// × 6 font pairings multiply into hundreds of distinct-looking resumes
// without writing hundreds of components.
export const themes = [
  { id: 'azure', name: 'Azure', accent: '#2563eb' },
  { id: 'forest', name: 'Forest', accent: '#15803d' },
  { id: 'terracotta', name: 'Terracotta', accent: '#c2410c' },
  { id: 'plum', name: 'Plum', accent: '#7e22ce' },
  { id: 'slate', name: 'Slate', accent: '#334155' },
  { id: 'crimson', name: 'Crimson', accent: '#be123c' },
  { id: 'teal', name: 'Teal', accent: '#0f766e' },
  { id: 'amber', name: 'Amber', accent: '#b45309' },
];

export function getTheme(id) {
  return themes.find((t) => t.id === id) || themes[0];
}
