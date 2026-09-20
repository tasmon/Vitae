import React, { useState } from 'react';
import { useResumeStore } from './store.js';
import { PhotoUploader } from './photoUploader.js';

const h = React.createElement;

function Field(props) {
  const { label, ...rest } = props;
  return h('label', { className: 'field' }, h('span', null, label), h('input', rest));
}

function PersonalForm() {
  const personal = useResumeStore((s) => s.resume.personal);
  const updatePersonal = useResumeStore((s) => s.updatePersonal);
  const errors = useResumeStore((s) => s.errors);
  const emailError = errors && errors.personal && errors.personal.email && errors.personal.email._errors[0];

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'About you'),
    h(PhotoUploader),
    h(
      'div',
      { className: 'field-grid' },
      h(Field, { label: 'Full name', value: personal.fullName, onChange: (e) => updatePersonal('fullName', e.target.value) }),
      h(Field, { label: 'Job title', value: personal.jobTitle, onChange: (e) => updatePersonal('jobTitle', e.target.value) }),
      h(Field, { label: 'Email', value: personal.email, onChange: (e) => updatePersonal('email', e.target.value) }),
      h(Field, { label: 'Phone', value: personal.phone, onChange: (e) => updatePersonal('phone', e.target.value) }),
      h(Field, { label: 'Location', value: personal.location, onChange: (e) => updatePersonal('location', e.target.value) })
    ),
    emailError && h('p', { className: 'error-text' }, emailError),
    h(
      'label',
      { className: 'field' },
      h('span', null, 'Summary'),
      h('textarea', { rows: 3, value: personal.summary, onChange: (e) => updatePersonal('summary', e.target.value) })
    )
  );
}

function ExperienceForm() {
  const experience = useResumeStore((s) => s.resume.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'Experience'),
    ...experience.map((e) =>
      h(
        'div',
        { key: e.id, className: 'entry-card' },
        h(
          'div',
          { className: 'field-grid' },
          h(Field, { label: 'Role', value: e.role, onChange: (ev) => updateExperience(e.id, 'role', ev.target.value) }),
          h(Field, { label: 'Company', value: e.company, onChange: (ev) => updateExperience(e.id, 'company', ev.target.value) }),
          h(Field, { label: 'Start', value: e.start, onChange: (ev) => updateExperience(e.id, 'start', ev.target.value) }),
          h(Field, { label: 'End', value: e.end, onChange: (ev) => updateExperience(e.id, 'end', ev.target.value) })
        ),
        h(
          'label',
          { className: 'field' },
          h('span', null, 'Description'),
          h('textarea', { rows: 2, value: e.description, onChange: (ev) => updateExperience(e.id, 'description', ev.target.value) })
        ),
        h('button', { type: 'button', className: 'link-btn', onClick: () => removeExperience(e.id) }, 'Remove role')
      )
    ),
    h('button', { type: 'button', onClick: addExperience }, '+ Add role')
  );
}

function EducationForm() {
  const education = useResumeStore((s) => s.resume.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'Education'),
    ...education.map((ed) =>
      h(
        'div',
        { key: ed.id, className: 'entry-card' },
        h(
          'div',
          { className: 'field-grid' },
          h(Field, { label: 'School', value: ed.school, onChange: (ev) => updateEducation(ed.id, 'school', ev.target.value) }),
          h(Field, { label: 'Degree', value: ed.degree, onChange: (ev) => updateEducation(ed.id, 'degree', ev.target.value) }),
          h(Field, { label: 'Start', value: ed.start, onChange: (ev) => updateEducation(ed.id, 'start', ev.target.value) }),
          h(Field, { label: 'End', value: ed.end, onChange: (ev) => updateEducation(ed.id, 'end', ev.target.value) })
        ),
        h('button', { type: 'button', className: 'link-btn', onClick: () => removeEducation(ed.id) }, 'Remove')
      )
    ),
    h('button', { type: 'button', onClick: addEducation }, '+ Add education')
  );
}

function CoCurricularForm() {
  const items = useResumeStore((s) => s.resume.coCurricular);
  const addItem = useResumeStore((s) => s.addCoCurricular);
  const updateItem = useResumeStore((s) => s.updateCoCurricular);
  const removeItem = useResumeStore((s) => s.removeCoCurricular);

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'Co-curricular activities'),
    ...items.map((c) =>
      h(
        'div',
        { key: c.id, className: 'entry-card' },
        h(
          'div',
          { className: 'field-grid' },
          h(Field, { label: 'Activity', value: c.title, onChange: (ev) => updateItem(c.id, 'title', ev.target.value) }),
          h(Field, { label: 'Your role', value: c.role, onChange: (ev) => updateItem(c.id, 'role', ev.target.value) }),
          h(Field, { label: 'Years', value: c.years, onChange: (ev) => updateItem(c.id, 'years', ev.target.value) })
        ),
        h(
          'label',
          { className: 'field' },
          h('span', null, 'Description'),
          h('textarea', { rows: 2, value: c.description, onChange: (ev) => updateItem(c.id, 'description', ev.target.value) })
        ),
        h('button', { type: 'button', className: 'link-btn', onClick: () => removeItem(c.id) }, 'Remove')
      )
    ),
    h('button', { type: 'button', onClick: addItem }, '+ Add activity')
  );
}

function AchievementsForm() {
  const achievements = useResumeStore((s) => s.resume.achievements);
  const addAchievement = useResumeStore((s) => s.addAchievement);
  const removeAchievement = useResumeStore((s) => s.removeAchievement);
  const [draft, setDraft] = useState('');

  function submit(e) {
    e.preventDefault();
    addAchievement(draft);
    setDraft('');
  }

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'Achievements'),
    h(
      'form',
      { onSubmit: submit, className: 'skill-form' },
      h('input', { value: draft, onChange: (e) => setDraft(e.target.value), placeholder: 'e.g. Winner, national coding hackathon 2024' }),
      h('button', { type: 'submit' }, 'Add')
    ),
    h(
      'div',
      { className: 'skill-tags' },
      ...achievements.map((a, i) =>
        h(
          'span',
          { key: i, className: 'skill-tag' },
          a,
          h('button', { type: 'button', onClick: () => removeAchievement(i), 'aria-label': `Remove ${a}` }, '×')
        )
      )
    )
  );
}

function SkillsForm() {
  const skills = useResumeStore((s) => s.resume.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const [draft, setDraft] = useState('');

  function submit(e) {
    e.preventDefault();
    addSkill(draft);
    setDraft('');
  }

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'Skills'),
    h(
      'form',
      { onSubmit: submit, className: 'skill-form' },
      h('input', { value: draft, onChange: (e) => setDraft(e.target.value), placeholder: 'e.g. Figma' }),
      h('button', { type: 'submit' }, 'Add')
    ),
    h(
      'div',
      { className: 'skill-tags' },
      ...skills.map((s, i) =>
        h(
          'span',
          { key: i, className: 'skill-tag' },
          s,
          h('button', { type: 'button', onClick: () => removeSkill(i), 'aria-label': `Remove ${s}` }, '×')
        )
      )
    )
  );
}

function LanguagesForm() {
  const languages = useResumeStore((s) => s.resume.languages);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'Languages'),
    ...languages.map((l) =>
      h(
        'div',
        { key: l.id, className: 'entry-card' },
        h(
          'div',
          { className: 'field-grid' },
          h(Field, { label: 'Language', value: l.name, onChange: (ev) => updateLanguage(l.id, 'name', ev.target.value) }),
          h(Field, {
            label: 'Level',
            value: l.level,
            placeholder: 'e.g. Fluent, Intermediate',
            onChange: (ev) => updateLanguage(l.id, 'level', ev.target.value),
          })
        ),
        h('button', { type: 'button', className: 'link-btn', onClick: () => removeLanguage(l.id) }, 'Remove')
      )
    ),
    h('button', { type: 'button', onClick: addLanguage }, '+ Add language')
  );
}

function ReferencesForm() {
  const references = useResumeStore((s) => s.resume.references);
  const addReference = useResumeStore((s) => s.addReference);
  const updateReference = useResumeStore((s) => s.updateReference);
  const removeReference = useResumeStore((s) => s.removeReference);

  return h(
    'section',
    { className: 'form-section' },
    h('h2', null, 'References'),
    ...references.map((r) =>
      h(
        'div',
        { key: r.id, className: 'entry-card' },
        h(
          'div',
          { className: 'field-grid' },
          h(Field, { label: 'Name', value: r.name, onChange: (ev) => updateReference(r.id, 'name', ev.target.value) }),
          h(Field, {
            label: 'Relation',
            value: r.relation,
            placeholder: 'e.g. Former manager',
            onChange: (ev) => updateReference(r.id, 'relation', ev.target.value),
          }),
          h(Field, {
            label: 'Contact',
            value: r.contact,
            placeholder: 'Email or phone',
            onChange: (ev) => updateReference(r.id, 'contact', ev.target.value),
          })
        ),
        h('button', { type: 'button', className: 'link-btn', onClick: () => removeReference(r.id) }, 'Remove')
      )
    ),
    h('button', { type: 'button', onClick: addReference }, '+ Add reference')
  );
}

export function FormPanel() {
  return h(
    'div',
    { className: 'form-panel' },
    h(PersonalForm),
    h(ExperienceForm),
    h(EducationForm),
    h(CoCurricularForm),
    h(AchievementsForm),
    h(SkillsForm),
    h(LanguagesForm),
    h(ReferencesForm)
  );
}
