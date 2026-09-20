import React, { useState } from 'react';
import { useResumeStore } from './store.js';
import { getTemplate, TemplateRenderer } from './templates.js';
import { getTheme } from './themes.js';
import { getFontPairing } from './fonts.js';
import { exportResumeToDocx } from './exportDocx.js';

const h = React.createElement;

export function LivePreview() {
  const resume = useResumeStore((s) => s.resume);
  const [exportingDocx, setExportingDocx] = useState(false);
  const [docxError, setDocxError] = useState('');

  const spec = getTemplate(resume.templateId);
  const theme = getTheme(resume.themeId);
  const font = getFontPairing(resume.fontId);

  async function handleDocxExport() {
    setDocxError('');
    setExportingDocx(true);
    try {
      await exportResumeToDocx(resume);
    } catch (err) {
      setDocxError('Could not generate the Word document. Try again.');
    } finally {
      setExportingDocx(false);
    }
  }

  return h(
    'div',
    { className: 'preview-panel' },
    h(
      'div',
      { className: 'preview-toolbar' },
      h('h2', null, 'Live preview'),
      h(
        'div',
        { className: 'preview-actions' },
        h('button', { type: 'button', onClick: () => window.print() }, 'Print / Save PDF'),
        h('button', { type: 'button', onClick: handleDocxExport, disabled: exportingDocx }, exportingDocx ? 'Exporting…' : 'Export .docx')
      )
    ),
    docxError && h('p', { className: 'error-text', style: { textAlign: 'right' } }, docxError),
    h('div', { id: 'preview-print-area', className: 'preview-page' }, h(TemplateRenderer, { resume, theme, font, spec }))
  );
}
