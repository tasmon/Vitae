import React from 'react';
import { useResumeStore } from './store.js';
import { templates } from './templates.js';
import { themes } from './themes.js';
import { fontPairings } from './fonts.js';

const h = React.createElement;

export function TemplateSelector() {
  const templateId = useResumeStore((s) => s.resume.templateId);
  const themeId = useResumeStore((s) => s.resume.themeId);
  const fontId = useResumeStore((s) => s.resume.fontId);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const setTheme = useResumeStore((s) => s.setTheme);
  const setFont = useResumeStore((s) => s.setFont);

  return h(
    'div',
    { className: 'template-selector' },
    h('h2', null, 'Template'),
    h(
      'div',
      { className: 'template-grid' },
      ...templates.map((t) =>
        h(
          'button',
          {
            key: t.id,
            type: 'button',
            className: 'template-option' + (t.id === templateId ? ' active' : ''),
            onClick: () => setTemplate(t.id),
          },
          h('span', null, t.name),
          h('small', null, t.atsSafe ? 'ATS-safe' : 'Design-forward')
        )
      )
    ),

    h('h2', null, 'Accent'),
    h(
      'div',
      { className: 'theme-row' },
      ...themes.map((th) =>
        h('button', {
          key: th.id,
          type: 'button',
          'aria-label': th.name,
          className: 'theme-swatch' + (th.id === themeId ? ' active' : ''),
          style: { background: th.accent },
          onClick: () => setTheme(th.id),
        })
      )
    ),

    h('h2', null, 'Font pairing'),
    h(
      'div',
      { className: 'font-list' },
      ...fontPairings.map((f) =>
        h(
          'button',
          {
            key: f.id,
            type: 'button',
            className: 'font-option' + (f.id === fontId ? ' active' : ''),
            style: { fontFamily: f.heading },
            onClick: () => setFont(f.id),
          },
          f.name
        )
      )
    )
  );
}
