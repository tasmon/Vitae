import React from 'react';

const h = React.createElement;

function initials(name) {
  return name.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

function Avatar({ photo, name, accent, size = 64 }) {
  if (photo) {
    return h('img', {
      src: photo,
      alt: '',
      style: { width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 },
    });
  }
  return h(
    'div',
    {
      style: {
        width: size,
        height: size,
        borderRadius: '50%',
        background: accent + '22',
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: size * 0.32,
        flexShrink: 0,
      },
    },
    initials(name || 'Your Name')
  );
}

function Section({ title, theme, children }) {
  return h(
    'div',
    { style: { marginBottom: 16 } },
    h(
      'h2',
      {
        style: {
          fontFamily: theme.headingFont,
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: theme.accent,
          borderBottom: `1.5px solid ${theme.accent}33`,
          paddingBottom: 4,
          marginBottom: 10,
        },
      },
      title
    ),
    children
  );
}

export function ClassicTemplate({ resume, theme }) {
  const { personal, experience, education, skills, photo } = resume;
  return h(
    'div',
    { style: { fontFamily: theme.bodyFont, color: '#1f2937', fontSize: 13, lineHeight: 1.5 } },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 } },
      h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 64 }),
      h(
        'div',
        null,
        h('h1', { style: { fontFamily: theme.headingFont, fontSize: 22, margin: 0, fontWeight: 700 } }, personal.fullName || 'Your Name'),
        h('p', { style: { margin: '4px 0 0', color: theme.accent, fontWeight: 600 } }, personal.jobTitle || 'Job title'),
        h(
          'p',
          { style: { margin: '4px 0 0', fontSize: 12, color: '#6b7280' } },
          [personal.email, personal.phone, personal.location].filter(Boolean).join('  ·  ')
        )
      )
    ),
    personal.summary && h('p', { style: { marginBottom: 18 } }, personal.summary),
    experience.length > 0 &&
      h(
        Section,
        { title: 'Experience', theme },
        ...experience.map((e) =>
          h(
            'div',
            { key: e.id, style: { marginBottom: 12 } },
            h(
              'div',
              { style: { display: 'flex', justifyContent: 'space-between' } },
              h('strong', null, e.role || 'Role', e.company ? ` · ${e.company}` : ''),
              h('span', { style: { color: '#6b7280', fontSize: 12 } }, [e.start, e.end].filter(Boolean).join(' – '))
            ),
            e.description && h('p', { style: { margin: '4px 0 0', color: '#374151' } }, e.description)
          )
        )
      ),
    education.length > 0 &&
      h(
        Section,
        { title: 'Education', theme },
        ...education.map((ed) =>
          h(
            'div',
            { key: ed.id, style: { marginBottom: 8, display: 'flex', justifyContent: 'space-between' } },
            h('span', null, h('strong', null, ed.school || 'School'), ed.degree ? ` · ${ed.degree}` : ''),
            h('span', { style: { color: '#6b7280', fontSize: 12 } }, [ed.start, ed.end].filter(Boolean).join(' – '))
          )
        )
      ),
    skills.length > 0 &&
      h(
        Section,
        { title: 'Skills', theme },
        h(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
          ...skills.map((s, i) =>
            h(
              'span',
              { key: i, style: { background: theme.accent + '18', color: theme.accent, padding: '3px 10px', borderRadius: 999, fontSize: 12 } },
              s
            )
          )
        )
      )
  );
}

export function SidebarTemplate({ resume, theme }) {
  const { personal, experience, education, skills, photo } = resume;
  return h(
    'div',
    { style: { display: 'grid', gridTemplateColumns: '34% 66%', minHeight: '100%', fontFamily: theme.bodyFont, fontSize: 13 } },
    h(
      'div',
      { style: { background: theme.accent, color: '#fff', padding: 20 } },
      h(Avatar, { photo, name: personal.fullName, accent: '#ffffff', size: 72 }),
      h('h1', { style: { fontFamily: theme.headingFont, fontSize: 18, margin: '14px 0 2px' } }, personal.fullName || 'Your Name'),
      h('p', { style: { margin: 0, opacity: 0.85, fontSize: 12 } }, personal.jobTitle || 'Job title'),
      h(
        'div',
        { style: { marginTop: 16, fontSize: 11.5, opacity: 0.9, lineHeight: 1.8 } },
        personal.email && h('div', null, personal.email),
        personal.phone && h('div', null, personal.phone),
        personal.location && h('div', null, personal.location)
      ),
      skills.length > 0 &&
        h(
          'div',
          { style: { marginTop: 20 } },
          h('p', { style: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, opacity: 0.8, marginBottom: 8 } }, 'Skills'),
          h(
            'div',
            { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
            ...skills.map((s, i) =>
              h('span', { key: i, style: { background: 'rgba(255,255,255,0.16)', padding: '3px 8px', borderRadius: 999, fontSize: 11 } }, s)
            )
          )
        )
    ),
    h(
      'div',
      { style: { padding: 20, color: '#1f2937' } },
      personal.summary && h('p', { style: { marginTop: 0 } }, personal.summary),
      experience.length > 0 &&
        h(
          Section,
          { title: 'Experience', theme },
          ...experience.map((e) =>
            h(
              'div',
              { key: e.id, style: { marginBottom: 12 } },
              h(
                'div',
                { style: { display: 'flex', justifyContent: 'space-between' } },
                h('strong', null, e.role || 'Role', e.company ? ` · ${e.company}` : ''),
                h('span', { style: { color: '#6b7280', fontSize: 12 } }, [e.start, e.end].filter(Boolean).join(' – '))
              ),
              e.description && h('p', { style: { margin: '4px 0 0', color: '#374151' } }, e.description)
            )
          )
        ),
      education.length > 0 &&
        h(
          Section,
          { title: 'Education', theme },
          ...education.map((ed) =>
            h(
              'div',
              { key: ed.id, style: { marginBottom: 8, display: 'flex', justifyContent: 'space-between' } },
              h('span', null, h('strong', null, ed.school || 'School'), ed.degree ? ` · ${ed.degree}` : ''),
              h('span', { style: { color: '#6b7280', fontSize: 12 } }, [ed.start, ed.end].filter(Boolean).join(' – '))
            )
          )
        )
    )
  );
}

export function CompactTemplate({ resume, theme }) {
  const { personal, experience, education, skills, photo } = resume;
  return h(
    'div',
    { style: { fontFamily: theme.bodyFont, fontSize: 12.5, color: '#1f2937' } },
    h(
      'div',
      { style: { borderLeft: `4px solid ${theme.accent}`, paddingLeft: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 } },
      h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 48 }),
      h(
        'div',
        null,
        h('h1', { style: { fontFamily: theme.headingFont, fontSize: 19, margin: 0 } }, personal.fullName || 'Your Name'),
        h('p', { style: { margin: '2px 0 0', color: theme.accent, fontSize: 12.5 } }, personal.jobTitle || 'Job title')
      )
    ),
    h(
      'div',
      { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 } },
      h(
        'div',
        null,
        personal.summary && h('p', { style: { marginTop: 0 } }, personal.summary),
        education.length > 0 &&
          h(
            Section,
            { title: 'Education', theme },
            ...education.map((ed) =>
              h(
                'div',
                { key: ed.id, style: { marginBottom: 8 } },
                h('strong', null, ed.school || 'School'),
                h('div', { style: { color: '#6b7280', fontSize: 11.5 } }, `${ed.degree} ${[ed.start, ed.end].filter(Boolean).join(' – ')}`)
              )
            )
          ),
        skills.length > 0 &&
          h(
            Section,
            { title: 'Skills', theme },
            h(
              'div',
              { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
              ...skills.map((s, i) =>
                h(
                  'span',
                  {
                    key: i,
                    style: { background: theme.accent + '18', color: theme.accent, padding: '3px 10px', borderRadius: 999, fontSize: 11.5 },
                  },
                  s
                )
              )
            )
          )
      ),
      h(
        'div',
        null,
        experience.length > 0 &&
          h(
            Section,
            { title: 'Experience', theme },
            ...experience.map((e) =>
              h(
                'div',
                { key: e.id, style: { marginBottom: 10 } },
                h('strong', null, e.role || 'Role'),
                h('div', { style: { color: '#6b7280', fontSize: 11.5 } }, `${e.company} ${[e.start, e.end].filter(Boolean).join(' – ')}`),
                e.description && h('p', { style: { margin: '4px 0 0' } }, e.description)
              )
            )
          )
      )
    )
  );
}

export const templates = [
  { id: 'classic', name: 'Classic', atsSafe: true, Component: ClassicTemplate },
  { id: 'sidebar', name: 'Sidebar', atsSafe: false, Component: SidebarTemplate },
  { id: 'compact', name: 'Compact two-column', atsSafe: false, Component: CompactTemplate },
];

export function getTemplate(id) {
  return templates.find((t) => t.id === id) || templates[0];
}
