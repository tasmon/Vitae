import React from 'react';
import { useResumeStore } from './store.js';
import { getTemplate } from './templates.js';
import { getTheme } from './themes.js';

const h = React.createElement;

export function LivePreview() {
  const resume = useResumeStore((s) => s.resume);
  const template = getTemplate(resume.templateId);
  const theme = getTheme(resume.themeId);

  return h(
    'div',
    { className: 'preview-panel' },
    h(
      'div',
      { className: 'preview-toolbar' },
      h('h2', null, 'Live preview'),
      h('button', { type: 'button', onClick: () => window.print() }, 'Download / Print PDF')
    ),
    h('div', { id: 'preview-print-area', className: 'preview-page' }, h(template.Component, { resume, theme }))
  );
}
