import React from 'react';
import { useResumeStore } from './store.js';
import { templates } from './templates.js';
import { themes } from './themes.js';

const h = React.createElement;

export function TemplateSelector() {
  const templateId = useResumeStore((s) => s.resume.templateId);
  const themeId = useResumeStore((s) => s.resume.themeId);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const setTheme = useResumeStore((s) => s.setTheme);

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
    )
  );
}
