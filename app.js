import React from 'react';
import { useResumeStore } from './store.js';
import { FormPanel } from './formPanel.js';
import { TemplateSelector } from './templateSelector.js';
import { LivePreview } from './livePreview.js';

const h = React.createElement;

export function App() {
  const step = useResumeStore((s) => s.step);
  const setStep = useResumeStore((s) => s.setStep);

  return h(
    'div',
    { className: 'app-shell' },
    h(
      'header',
      { className: 'app-header' },
      h('span', { className: 'logo' }, 'Vitae'),
      h(
        'nav',
        { className: 'step-nav' },
        h('button', { className: step === 'form' ? 'active' : '', onClick: () => setStep('form') }, '1. Data entry'),
        h('button', { className: step === 'design' ? 'active' : '', onClick: () => setStep('design') }, '2. Template & theme')
      )
    ),
    h(
      'main',
      { className: 'app-main' },
      h('div', { className: 'left-pane' }, step === 'form' ? h(FormPanel) : h(TemplateSelector)),
      h('div', { className: 'right-pane' }, h(LivePreview))
    )
  );
}
