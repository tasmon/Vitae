import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.js';

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));

// Service workers require http(s) — guard so opening this over file://
// doesn't throw in the console.
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
