import React, { Fragment } from 'react';

const h = React.createElement;

// ============================================================
// Small utilities
// ============================================================

function initials(name) {
  return name.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

function levelToDots(level) {
  const map = {
    native: 5, fluent: 4, advanced: 4, intermediate: 3,
    conversational: 3, basic: 2, beginner: 1,
  };
  return map[(level || '').trim().toLowerCase()] || 3;
}

// ============================================================
// Shared building blocks — every template composes these, so
// adding a new section type (or fixing a bug in one) only has
// to happen once, not once per design.
// ============================================================

function Avatar({ photo, name, accent, size = 64, onColor }) {
  if (photo) {
    return h('img', {
      src: photo,
      alt: '',
      style: {
        width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
        border: onColor ? '2px solid rgba(255,255,255,0.6)' : 'none',
      },
    });
  }
  const bg = onColor ? 'rgba(255,255,255,0.22)' : accent + '22';
  const color = onColor ? '#fff' : accent;
  return h(
    'div',
    {
      style: {
        width: size, height: size, borderRadius: '50%', background: bg, color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 600, fontSize: size * 0.32, flexShrink: 0,
      },
    },
    initials(name || 'Your Name')
  );
}

function ContactLines({ personal, onColor }) {
  const color = onColor ? 'rgba(255,255,255,0.9)' : '#6b7280';
  return h(
    'div',
    { style: { fontSize: 11.5, color, lineHeight: 1.8 } },
    personal.email && h('div', null, personal.email),
    personal.phone && h('div', null, personal.phone),
    personal.location && h('div', null, personal.location)
  );
}

function SectionTitle({ title, theme, font, style }) {
  if (style === 'pill') {
    return h(
      'span',
      {
        style: {
          display: 'inline-block', background: theme.accent, color: '#fff', fontFamily: font.heading,
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6,
          padding: '4px 12px', borderRadius: 999, marginBottom: 10,
        },
      },
      title
    );
  }
  if (style === 'boxed') {
    return h(
      'div',
      {
        style: {
          borderLeft: `3px solid ${theme.accent}`, paddingLeft: 10, fontFamily: font.heading,
          fontSize: 13, fontWeight: 700, color: '#1f2937', marginBottom: 10,
        },
      },
      title
    );
  }
  if (style === 'plain') {
    return h(
      'div',
      { style: { fontFamily: font.heading, fontSize: 13, fontWeight: 700, letterSpacing: 0.4, color: '#1f2937', marginBottom: 10 } },
      title
    );
  }
  // 'underline' — the default
  return h(
    'h2',
    {
      style: {
        fontFamily: font.heading, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.6,
        color: theme.accent, borderBottom: `1.5px solid ${theme.accent}33`, paddingBottom: 4, marginBottom: 10,
      },
    },
    title
  );
}

function Section({ title, theme, font, style, cardWrap, children }) {
  const body = h(Fragment, null, h(SectionTitle, { title, theme, font, style }), children);
  if (cardWrap) {
    return h('div', { style: { border: '1px solid #e5e7eb', borderRadius: 10, padding: 14, marginBottom: 14 } }, body);
  }
  return h('div', { style: { marginBottom: 16 } }, body);
}

function SkillsBlock({ skills, theme, style }) {
  if (!skills || skills.length === 0) return null;
  if (style === 'inline') {
    return h('p', { style: { margin: 0, fontSize: 12.5, color: '#374151' } }, skills.join(' · '));
  }
  if (style === 'bars') {
    // Decorative only — no proficiency data is collected per skill, so
    // every bar renders at the same fill. It's a stylistic flourish some
    // templates use, not a claimed metric.
    return h(
      'div',
      null,
      ...skills.map((s, i) =>
        h(
          'div',
          { key: i, style: { marginBottom: 6 } },
          h('div', { style: { fontSize: 11.5, marginBottom: 2, color: '#374151' } }, s),
          h(
            'div',
            { style: { height: 5, borderRadius: 3, background: '#e5e7eb', overflow: 'hidden' } },
            h('div', { style: { height: '100%', width: '78%', background: theme.accent, borderRadius: 3 } })
          )
        )
      )
    );
  }
  return h(
    'div',
    { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
    ...skills.map((s, i) =>
      h('span', { key: i, style: { background: theme.accent + '18', color: theme.accent, padding: '3px 10px', borderRadius: 999, fontSize: 12 } }, s)
    )
  );
}

function ExperienceList({ experience, theme, style }) {
  if (!experience || experience.length === 0) return null;
  if (style === 'timeline') {
    return h(
      'div',
      { style: { borderLeft: `2px solid ${theme.accent}33`, paddingLeft: 16 } },
      ...experience.map((e) =>
        h(
          'div',
          { key: e.id, style: { position: 'relative', marginBottom: 14 } },
          h('div', { style: { position: 'absolute', left: -20.5, top: 3, width: 9, height: 9, borderRadius: '50%', background: theme.accent } }),
          h(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between' } },
            h('strong', null, e.role || 'Role', e.company ? ` · ${e.company}` : ''),
            h('span', { style: { color: '#6b7280', fontSize: 12 } }, [e.start, e.end].filter(Boolean).join(' – '))
          ),
          e.description && h('p', { style: { margin: '4px 0 0', color: '#374151' } }, e.description)
        )
      )
    );
  }
  return h(
    'div',
    null,
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
  );
}

function EducationList({ education, theme, style }) {
  if (!education || education.length === 0) return null;
  if (style === 'timeline') {
    return h(
      'div',
      { style: { borderLeft: `2px solid ${theme.accent}33`, paddingLeft: 16 } },
      ...education.map((ed) =>
        h(
          'div',
          { key: ed.id, style: { position: 'relative', marginBottom: 10 } },
          h('div', { style: { position: 'absolute', left: -20.5, top: 3, width: 9, height: 9, borderRadius: '50%', background: theme.accent } }),
          h(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between' } },
            h('span', null, h('strong', null, ed.school || 'School'), ed.degree ? ` · ${ed.degree}` : ''),
            h('span', { style: { color: '#6b7280', fontSize: 12 } }, [ed.start, ed.end].filter(Boolean).join(' – '))
          )
        )
      )
    );
  }
  return h(
    'div',
    null,
    ...education.map((ed) =>
      h(
        'div',
        { key: ed.id, style: { marginBottom: 8, display: 'flex', justifyContent: 'space-between' } },
        h('span', null, h('strong', null, ed.school || 'School'), ed.degree ? ` · ${ed.degree}` : ''),
        h('span', { style: { color: '#6b7280', fontSize: 12 } }, [ed.start, ed.end].filter(Boolean).join(' – '))
      )
    )
  );
}

function CoCurricularList({ items }) {
  if (!items || items.length === 0) return null;
  return h(
    'div',
    null,
    ...items.map((c) =>
      h(
        'div',
        { key: c.id, style: { marginBottom: 10 } },
        h(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between' } },
          h('strong', null, c.title || 'Activity', c.role ? ` · ${c.role}` : ''),
          c.years && h('span', { style: { color: '#6b7280', fontSize: 12 } }, c.years)
        ),
        c.description && h('p', { style: { margin: '4px 0 0', color: '#374151' } }, c.description)
      )
    )
  );
}

function AchievementsList({ achievements, theme, style }) {
  if (!achievements || achievements.length === 0) return null;
  if (style === 'badge') {
    return h(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
      ...achievements.map((a, i) =>
        h('span', { key: i, style: { background: theme.accent + '18', color: theme.accent, padding: '3px 10px', borderRadius: 999, fontSize: 12 } }, a)
      )
    );
  }
  return h(
    'ul',
    { style: { margin: 0, paddingLeft: 18 } },
    ...achievements.map((a, i) => h('li', { key: i, style: { marginBottom: 4, color: '#374151' } }, a))
  );
}

function LanguagesList({ languages, theme, style }) {
  if (!languages || languages.length === 0) return null;
  if (style === 'dots') {
    return h(
      'div',
      null,
      ...languages.map((l, i) => {
        const dots = levelToDots(l.level);
        return h(
          'div',
          { key: i, style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 12.5 } },
          h('span', null, l.name),
          h('span', { style: { letterSpacing: 2, color: theme.accent, fontSize: 10 } }, '●'.repeat(dots) + '○'.repeat(5 - dots))
        );
      })
    );
  }
  return h(
    'div',
    null,
    ...languages.map((l, i) => h('div', { key: i, style: { fontSize: 12.5, marginBottom: 4, color: '#374151' } }, l.name + (l.level ? ` — ${l.level}` : '')))
  );
}

function ReferencesList({ references, style }) {
  if (!references || references.length === 0) return null;
  if (style === 'card') {
    return h(
      'div',
      { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
      ...references.map((r, i) =>
        h(
          'div',
          { key: i, style: { border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, fontSize: 12 } },
          h('strong', null, r.name || 'Name'),
          r.relation && h('div', { style: { color: '#6b7280' } }, r.relation),
          r.contact && h('div', { style: { color: '#6b7280' } }, r.contact)
        )
      )
    );
  }
  return h(
    'div',
    null,
    ...references.map((r, i) =>
      h('p', { key: i, style: { margin: '0 0 6px', fontSize: 12.5, color: '#374151' } }, [r.name, r.relation, r.contact].filter(Boolean).join(' · '))
    )
  );
}

// Dispatches a section key to its renderer, honoring the per-template
// style knobs in `spec`. One switch statement instead of one bespoke
// block per template per section.
function renderSection(key, resume, theme, font, spec) {
  const titleStyle = spec.sectionTitleStyle || 'underline';
  const expStyle = spec.timelineStyle ? 'timeline' : 'plain';

  switch (key) {
    case 'summary':
      return resume.personal.summary ? h('p', { key, style: { marginBottom: 18, color: '#374151' } }, resume.personal.summary) : null;
    case 'experience':
      return resume.experience.length > 0
        ? h(Section, { key, title: 'Experience', theme, font, style: titleStyle, cardWrap: spec.cardWrap }, h(ExperienceList, { experience: resume.experience, theme, style: expStyle }))
        : null;
    case 'education':
      return resume.education.length > 0
        ? h(Section, { key, title: 'Education', theme, font, style: titleStyle, cardWrap: spec.cardWrap }, h(EducationList, { education: resume.education, theme, style: expStyle }))
        : null;
    case 'coCurricular':
      return resume.coCurricular.length > 0
        ? h(Section, { key, title: 'Co-Curricular Activities', theme, font, style: titleStyle, cardWrap: spec.cardWrap }, h(CoCurricularList, { items: resume.coCurricular }))
        : null;
    case 'achievements':
      return resume.achievements.length > 0
        ? h(Section, { key, title: 'Achievements', theme, font, style: titleStyle, cardWrap: spec.cardWrap }, h(AchievementsList, { achievements: resume.achievements, theme, style: spec.achievementStyle || 'list' }))
        : null;
    case 'skills':
      return resume.skills.length > 0
        ? h(Section, { key, title: 'Skills', theme, font, style: titleStyle, cardWrap: spec.cardWrap }, h(SkillsBlock, { skills: resume.skills, theme, style: spec.skillStyle || 'tags' }))
        : null;
    case 'languages':
      return resume.languages.length > 0
        ? h(Section, { key, title: 'Languages', theme, font, style: titleStyle, cardWrap: spec.cardWrap }, h(LanguagesList, { languages: resume.languages, theme, style: spec.languageStyle || 'plain' }))
        : null;
    case 'references':
      return resume.references.length > 0
        ? h(Section, { key, title: 'References', theme, font, style: titleStyle, cardWrap: spec.cardWrap }, h(ReferencesList, { references: resume.references, style: spec.referenceStyle || 'plain' }))
        : null;
    default:
      return null;
  }
}

// For sidebar layouts: same section keys, but styled to sit on a solid
// accent-colored panel (translucent-white tags/text instead of
// accent-tinted-on-white).
function renderSidebarSection(key, resume) {
  const titleStyle = { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, opacity: 0.85, marginBottom: 8, marginTop: 20 };
  if (key === 'skills' && resume.skills.length > 0) {
    return h(
      'div',
      { key },
      h('p', { style: titleStyle }, 'Skills'),
      h(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
        ...resume.skills.map((s, i) => h('span', { key: i, style: { background: 'rgba(255,255,255,0.16)', padding: '3px 8px', borderRadius: 999, fontSize: 11 } }, s))
      )
    );
  }
  if (key === 'languages' && resume.languages.length > 0) {
    return h(
      'div',
      { key },
      h('p', { style: titleStyle }, 'Languages'),
      ...resume.languages.map((l, i) => h('div', { key: i, style: { fontSize: 11.5, opacity: 0.9, marginBottom: 4 } }, l.name + (l.level ? ` — ${l.level}` : '')))
    );
  }
  if (key === 'references' && resume.references.length > 0) {
    return h(
      'div',
      { key },
      h('p', { style: titleStyle }, 'References'),
      ...resume.references.map((r, i) => h('div', { key: i, style: { fontSize: 11, opacity: 0.9, marginBottom: 6 } }, [r.name, r.contact].filter(Boolean).join(' · ')))
    );
  }
  if (key === 'achievements' && resume.achievements.length > 0) {
    return h(
      'div',
      { key },
      h('p', { style: titleStyle }, 'Achievements'),
      h('ul', { style: { margin: 0, paddingLeft: 16, opacity: 0.9, fontSize: 11.5 } }, ...resume.achievements.map((a, i) => h('li', { key: i, style: { marginBottom: 4 } }, a)))
    );
  }
  return null;
}

// ============================================================
// Header variants
// ============================================================

function HeaderInline({ resume, theme, font }) {
  const { personal, photo } = resume;
  return h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 } },
    h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 64 }),
    h(
      'div',
      null,
      h('h1', { style: { fontFamily: font.heading, fontSize: 22, margin: 0, fontWeight: 700 } }, personal.fullName || 'Your Name'),
      h('p', { style: { margin: '4px 0 0', color: theme.accent, fontWeight: 600 } }, personal.jobTitle || 'Job title'),
      h('p', { style: { margin: '4px 0 0', fontSize: 12, color: '#6b7280' } }, [personal.email, personal.phone, personal.location].filter(Boolean).join('  ·  '))
    )
  );
}

function HeaderCentered({ resume, theme, font }) {
  const { personal, photo } = resume;
  return h(
    'div',
    { style: { textAlign: 'center', marginBottom: 18, paddingBottom: 16, borderBottom: `1.5px solid ${theme.accent}33` } },
    h('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 10 } }, h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 56 })),
    h('h1', { style: { fontFamily: font.heading, fontSize: 24, margin: 0, fontWeight: 700, letterSpacing: 0.4 } }, personal.fullName || 'Your Name'),
    h('p', { style: { margin: '4px 0 8px', color: theme.accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 } }, personal.jobTitle || 'Job title'),
    h('p', { style: { margin: 0, fontSize: 12, color: '#6b7280' } }, [personal.email, personal.phone, personal.location].filter(Boolean).join('  ·  '))
  );
}

function HeaderBold({ resume, theme, font }) {
  const { personal, photo } = resume;
  return h(
    'div',
    { style: { marginBottom: 22 } },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 } },
      h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 52 }),
      h('h1', { style: { fontFamily: font.heading, fontSize: 32, margin: 0, fontWeight: 800, color: theme.accent, lineHeight: 1.05 } }, personal.fullName || 'Your Name')
    ),
    h('p', { style: { margin: '0 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, fontSize: 12, color: '#374151' } }, personal.jobTitle || 'Job title'),
    h('p', { style: { margin: 0, fontSize: 11.5, color: '#9ca3af' } }, [personal.email, personal.phone, personal.location].filter(Boolean).join('  ·  '))
  );
}

// Note: the negative margins here are sized to match .preview-page's
// 28px padding in styles.css, so the band bleeds to the page edge. If
// that padding value ever changes, adjust these to match.
function HeaderBanner({ resume, theme, font }) {
  const { personal, photo } = resume;
  return h(
    'div',
    { style: { background: theme.accent, color: '#fff', padding: '28px 28px 40px', margin: '-28px -28px 0', position: 'relative' } },
    h('h1', { style: { fontFamily: font.heading, fontSize: 24, margin: 0, fontWeight: 700 } }, personal.fullName || 'Your Name'),
    h('p', { style: { margin: '4px 0 0', opacity: 0.9, fontWeight: 500 } }, personal.jobTitle || 'Job title'),
    h('p', { style: { margin: '8px 0 0', fontSize: 11.5, opacity: 0.85 } }, [personal.email, personal.phone, personal.location].filter(Boolean).join('  ·  ')),
    h('div', { style: { position: 'absolute', left: 28, bottom: -28 } }, h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 64 }))
  );
}

function HeaderSplit({ resume, theme, font }) {
  const { personal, photo } = resume;
  return h(
    'div',
    { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 20, borderRadius: 8, overflow: 'hidden' } },
    h(
      'div',
      { style: { background: theme.accent, color: '#fff', padding: 18, display: 'flex', alignItems: 'center', gap: 12 } },
      h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 52, onColor: true }),
      h(
        'div',
        null,
        h('h1', { style: { fontFamily: font.heading, fontSize: 18, margin: 0, fontWeight: 700 } }, personal.fullName || 'Your Name'),
        h('p', { style: { margin: '2px 0 0', fontSize: 12, opacity: 0.9 } }, personal.jobTitle || 'Job title')
      )
    ),
    h('div', { style: { background: '#f3f4f6', padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center' } }, h(ContactLines, { personal, onColor: false }))
  );
}

// ============================================================
// Layout engines — six structural "shells". Every one of the
// 15 designs below is one of these, parameterized differently.
// ============================================================

function SingleColumnLayout({ resume, theme, font, spec }) {
  const HeaderComp = spec.headerVariant === 'centered' ? HeaderCentered : spec.headerVariant === 'bold' ? HeaderBold : HeaderInline;
  return h(
    'div',
    { style: { fontFamily: font.body, color: '#1f2937', fontSize: 13, lineHeight: 1.5 } },
    h(HeaderComp, { resume, theme, font }),
    ...spec.order.map((key) => renderSection(key, resume, theme, font, spec))
  );
}

function BannerLayout({ resume, theme, font, spec }) {
  return h(
    'div',
    { style: { fontFamily: font.body, color: '#1f2937', fontSize: 13, lineHeight: 1.5 } },
    h(HeaderBanner, { resume, theme, font }),
    h('div', { style: { paddingTop: 36 } }, ...spec.order.map((key) => renderSection(key, resume, theme, font, spec)))
  );
}

function SplitLayout({ resume, theme, font, spec }) {
  return h(
    'div',
    { style: { fontFamily: font.body, color: '#1f2937', fontSize: 13, lineHeight: 1.5 } },
    h(HeaderSplit, { resume, theme, font }),
    ...spec.order.map((key) => renderSection(key, resume, theme, font, spec))
  );
}

function TwoColumnBodyLayout({ resume, theme, font, spec }) {
  const { personal, photo } = resume;
  const fontSize = spec.density === 'compact' ? 12 : 12.5;
  return h(
    'div',
    { style: { fontFamily: font.body, fontSize, color: '#1f2937' } },
    h(
      'div',
      { style: { borderLeft: `4px solid ${theme.accent}`, paddingLeft: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 } },
      h(Avatar, { photo, name: personal.fullName, accent: theme.accent, size: 48 }),
      h(
        'div',
        null,
        h('h1', { style: { fontFamily: font.heading, fontSize: 19, margin: 0 } }, personal.fullName || 'Your Name'),
        h('p', { style: { margin: '2px 0 0', color: theme.accent, fontSize: 12.5 } }, personal.jobTitle || 'Job title')
      )
    ),
    h(
      'div',
      { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 } },
      h('div', null, ...spec.leftOrder.map((key) => renderSection(key, resume, theme, font, spec))),
      h('div', null, ...spec.rightOrder.map((key) => renderSection(key, resume, theme, font, spec)))
    )
  );
}

function SidebarLayout({ resume, theme, font, spec }) {
  const { personal, photo } = resume;
  const side = spec.side || 'left';
  const sidebar = h(
    'div',
    { style: { background: theme.accent, color: '#fff', padding: 20 } },
    h(Avatar, { photo, name: personal.fullName, accent: '#ffffff', size: 72, onColor: true }),
    h('h1', { style: { fontFamily: font.heading, fontSize: 18, margin: '14px 0 2px' } }, personal.fullName || 'Your Name'),
    h('p', { style: { margin: 0, opacity: 0.85, fontSize: 12 } }, personal.jobTitle || 'Job title'),
    h('div', { style: { marginTop: 16 } }, h(ContactLines, { personal, onColor: true })),
    ...(spec.sidebarKeys || []).map((key) => renderSidebarSection(key, resume))
  );
  const main = h('div', { style: { padding: 20, color: '#1f2937' } }, ...spec.mainOrder.map((key) => renderSection(key, resume, theme, font, spec)));
  return h(
    'div',
    { style: { display: 'grid', gridTemplateColumns: side === 'left' ? '34% 66%' : '66% 34%', minHeight: '100%', fontFamily: font.body, fontSize: 13 } },
    side === 'left' ? sidebar : main,
    side === 'left' ? main : sidebar
  );
}

function renderByKind(resume, theme, font, spec) {
  switch (spec.kind) {
    case 'sidebar':
      return h(SidebarLayout, { resume, theme, font, spec });
    case 'banner':
      return h(BannerLayout, { resume, theme, font, spec });
    case 'split':
      return h(SplitLayout, { resume, theme, font, spec });
    case 'twoColumnBody':
      return h(TwoColumnBodyLayout, { resume, theme, font, spec });
    default:
      return h(SingleColumnLayout, { resume, theme, font, spec });
  }
}

// ============================================================
// The 15 designs. Each is just data — a set of choices fed into
// the shared engines above. Adding design #16 means adding an
// object here, not writing a new component tree.
// ============================================================

const defaultOrder = ['summary', 'experience', 'education', 'coCurricular', 'achievements', 'skills', 'languages', 'references'];

export const templates = [
  { id: 'classic', name: 'Classic', atsSafe: true, kind: 'single', headerVariant: 'inline', sectionTitleStyle: 'underline', skillStyle: 'tags', order: defaultOrder },
  { id: 'minimalist', name: 'Minimalist', atsSafe: true, kind: 'single', headerVariant: 'inline', sectionTitleStyle: 'plain', skillStyle: 'inline', order: defaultOrder },
  { id: 'executive', name: 'Executive', atsSafe: true, kind: 'single', headerVariant: 'centered', sectionTitleStyle: 'plain', skillStyle: 'inline', order: defaultOrder },
  { id: 'elegant-serif', name: 'Elegant Serif', atsSafe: true, kind: 'single', headerVariant: 'inline', sectionTitleStyle: 'underline', skillStyle: 'inline', order: defaultOrder },
  { id: 'bold-header', name: 'Bold Header', atsSafe: false, kind: 'single', headerVariant: 'bold', sectionTitleStyle: 'pill', skillStyle: 'tags', order: defaultOrder },
  { id: 'card-sections', name: 'Card Sections', atsSafe: false, kind: 'single', headerVariant: 'inline', sectionTitleStyle: 'boxed', skillStyle: 'tags', cardWrap: true, order: defaultOrder },
  { id: 'modern-grid', name: 'Modern Grid', atsSafe: false, kind: 'single', headerVariant: 'inline', sectionTitleStyle: 'pill', skillStyle: 'bars', achievementStyle: 'badge', order: defaultOrder },
  { id: 'timeline', name: 'Timeline', atsSafe: true, kind: 'single', headerVariant: 'inline', sectionTitleStyle: 'underline', skillStyle: 'tags', timelineStyle: true, order: defaultOrder },
  { id: 'banner', name: 'Banner', atsSafe: false, kind: 'banner', sectionTitleStyle: 'underline', skillStyle: 'tags', order: defaultOrder },
  { id: 'two-tone', name: 'Two-Tone', atsSafe: false, kind: 'split', sectionTitleStyle: 'underline', skillStyle: 'tags', order: defaultOrder },
  {
    id: 'sidebar', name: 'Sidebar', atsSafe: false, kind: 'sidebar', side: 'left',
    sidebarKeys: ['skills', 'languages', 'references'],
    mainOrder: ['summary', 'experience', 'education', 'coCurricular', 'achievements'],
    sectionTitleStyle: 'underline',
  },
  {
    id: 'sidebar-right', name: 'Sidebar Right', atsSafe: false, kind: 'sidebar', side: 'right',
    sidebarKeys: ['skills', 'achievements', 'languages'],
    mainOrder: ['summary', 'experience', 'education', 'coCurricular', 'references'],
    sectionTitleStyle: 'underline',
  },
  {
    id: 'compact', name: 'Compact', atsSafe: true, kind: 'twoColumnBody',
    leftOrder: ['summary', 'education', 'skills', 'languages'],
    rightOrder: ['experience', 'coCurricular', 'achievements', 'references'],
    sectionTitleStyle: 'underline', skillStyle: 'tags',
  },
  {
    id: 'compact-dense', name: 'Compact Dense', atsSafe: true, kind: 'twoColumnBody', density: 'compact',
    leftOrder: ['summary', 'education', 'skills', 'languages'],
    rightOrder: ['experience', 'coCurricular', 'achievements', 'references'],
    sectionTitleStyle: 'plain', skillStyle: 'inline',
  },
  {
    id: 'infographic-lite', name: 'Infographic Lite', atsSafe: false, kind: 'sidebar', side: 'left',
    sidebarKeys: ['skills', 'languages'],
    mainOrder: ['summary', 'experience', 'education', 'coCurricular', 'achievements', 'references'],
    sectionTitleStyle: 'pill', skillStyle: 'bars', languageStyle: 'dots', achievementStyle: 'badge', referenceStyle: 'card',
  },
];

export function getTemplate(id) {
  return templates.find((t) => t.id === id) || templates[0];
}

export function TemplateRenderer({ resume, theme, font, spec }) {
  return renderByKind(resume, theme, font, spec);
}
