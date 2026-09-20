import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

// DOCX export intentionally ignores the chosen visual template and always
// produces a single clean, simply-formatted document. This mirrors how
// most resume tools treat Word exports: the PDF is the "designed" version
// people look at, the DOCX is the plain, easy-to-parse, easy-to-edit
// version — the same reasoning that makes the Classic template ATS-safe
// applies doubly here.

function headingParagraph(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } });
}

function textParagraph(text, opts) {
  const options = opts || {};
  return new Paragraph({
    children: [new TextRun({ text, bold: !!options.bold })],
    spacing: { after: options.after ?? 80 },
  });
}

export async function exportResumeToDocx(resume) {
  const { personal, experience, education, coCurricular, achievements, skills, languages, references } = resume;
  const children = [];

  children.push(new Paragraph({ text: personal.fullName || 'Your Name', heading: HeadingLevel.TITLE }));
  if (personal.jobTitle) children.push(textParagraph(personal.jobTitle, { bold: true }));
  const contactLine = [personal.email, personal.phone, personal.location].filter(Boolean).join('  |  ');
  if (contactLine) children.push(textParagraph(contactLine));

  if (personal.summary) {
    children.push(headingParagraph('Summary'));
    children.push(textParagraph(personal.summary));
  }

  if (experience.length > 0) {
    children.push(headingParagraph('Experience'));
    experience.forEach((e) => {
      const title = [e.role || 'Role', e.company].filter(Boolean).join(' · ');
      children.push(textParagraph(title, { bold: true, after: 20 }));
      const dates = [e.start, e.end].filter(Boolean).join(' – ');
      if (dates) children.push(textParagraph(dates, { after: 20 }));
      if (e.description) children.push(textParagraph(e.description));
    });
  }

  if (education.length > 0) {
    children.push(headingParagraph('Education'));
    education.forEach((ed) => {
      const title = [ed.school || 'School', ed.degree].filter(Boolean).join(' · ');
      children.push(textParagraph(title, { bold: true, after: 20 }));
      const dates = [ed.start, ed.end].filter(Boolean).join(' – ');
      if (dates) children.push(textParagraph(dates));
    });
  }

  if (coCurricular.length > 0) {
    children.push(headingParagraph('Co-Curricular Activities'));
    coCurricular.forEach((c) => {
      const title = [c.title || 'Activity', c.role].filter(Boolean).join(' · ');
      children.push(textParagraph(title, { bold: true, after: 20 }));
      if (c.years) children.push(textParagraph(c.years, { after: 20 }));
      if (c.description) children.push(textParagraph(c.description));
    });
  }

  if (achievements.length > 0) {
    children.push(headingParagraph('Achievements'));
    achievements.forEach((a) => children.push(textParagraph(`•  ${a}`)));
  }

  if (skills.length > 0) {
    children.push(headingParagraph('Skills'));
    children.push(textParagraph(skills.join(', ')));
  }

  if (languages.length > 0) {
    children.push(headingParagraph('Languages'));
    languages.forEach((l) => children.push(textParagraph(l.level ? `${l.name} — ${l.level}` : l.name)));
  }

  if (references.length > 0) {
    children.push(headingParagraph('References'));
    references.forEach((r) => {
      const line = [r.name, r.relation, r.contact].filter(Boolean).join(' · ');
      if (line) children.push(textParagraph(line));
    });
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const blob = await Packer.toBlob(doc);

  const filename = `${(personal.fullName || 'resume').trim().replace(/\s+/g, '-').toLowerCase()}.docx`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
