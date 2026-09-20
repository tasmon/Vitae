export const themes = [
  { id: 'azure', name: 'Azure', accent: '#2563eb', headingFont: "'Inter', sans-serif", bodyFont: "'Inter', sans-serif" },
  { id: 'forest', name: 'Forest', accent: '#15803d', headingFont: "'Inter', sans-serif", bodyFont: "'Inter', sans-serif" },
  { id: 'terracotta', name: 'Terracotta', accent: '#c2410c', headingFont: "'Inter', sans-serif", bodyFont: "'Inter', sans-serif" },
  { id: 'plum', name: 'Plum', accent: '#7e22ce', headingFont: "'Georgia', serif", bodyFont: "'Inter', sans-serif" },
  { id: 'slate', name: 'Slate', accent: '#334155', headingFont: "'Inter', sans-serif", bodyFont: "'Inter', sans-serif" },
];

export function getTheme(id) {
  return themes.find((t) => t.id === id) || themes[0];
}
