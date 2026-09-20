import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { resumeSchema, createBlankResume, createId } from './schema.js';

function validate(resume) {
  const result = resumeSchema.safeParse(resume);
  return result.success ? null : result.error.format();
}

export const useResumeStore = create(
  persist(
    (set) => ({
      resume: createBlankResume(),
      errors: null,
      step: 'form',
      setStep: (step) => set({ step }),

      updatePersonal: (field, value) =>
        set((state) => {
          const resume = { ...state.resume, personal: { ...state.resume.personal, [field]: value } };
          return { resume, errors: validate(resume) };
        }),

      setPhoto: (dataUrl) =>
        set((state) => {
          const resume = { ...state.resume, photo: dataUrl };
          return { resume, errors: validate(resume) };
        }),

      // ---- experience ----
      addExperience: () =>
        set((state) => {
          const entry = { id: createId(), role: '', company: '', start: '', end: '', description: '' };
          const resume = { ...state.resume, experience: [...state.resume.experience, entry] };
          return { resume, errors: validate(resume) };
        }),
      updateExperience: (id, field, value) =>
        set((state) => {
          const experience = state.resume.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e));
          const resume = { ...state.resume, experience };
          return { resume, errors: validate(resume) };
        }),
      removeExperience: (id) =>
        set((state) => {
          const experience = state.resume.experience.filter((e) => e.id !== id);
          const resume = { ...state.resume, experience };
          return { resume, errors: validate(resume) };
        }),

      // ---- education ----
      addEducation: () =>
        set((state) => {
          const entry = { id: createId(), school: '', degree: '', start: '', end: '' };
          const resume = { ...state.resume, education: [...state.resume.education, entry] };
          return { resume, errors: validate(resume) };
        }),
      updateEducation: (id, field, value) =>
        set((state) => {
          const education = state.resume.education.map((e) => (e.id === id ? { ...e, [field]: value } : e));
          const resume = { ...state.resume, education };
          return { resume, errors: validate(resume) };
        }),
      removeEducation: (id) =>
        set((state) => {
          const education = state.resume.education.filter((e) => e.id !== id);
          const resume = { ...state.resume, education };
          return { resume, errors: validate(resume) };
        }),

      // ---- co-curricular activities ----
      addCoCurricular: () =>
        set((state) => {
          const entry = { id: createId(), title: '', role: '', years: '', description: '' };
          const resume = { ...state.resume, coCurricular: [...state.resume.coCurricular, entry] };
          return { resume, errors: validate(resume) };
        }),
      updateCoCurricular: (id, field, value) =>
        set((state) => {
          const coCurricular = state.resume.coCurricular.map((c) => (c.id === id ? { ...c, [field]: value } : c));
          const resume = { ...state.resume, coCurricular };
          return { resume, errors: validate(resume) };
        }),
      removeCoCurricular: (id) =>
        set((state) => {
          const coCurricular = state.resume.coCurricular.filter((c) => c.id !== id);
          const resume = { ...state.resume, coCurricular };
          return { resume, errors: validate(resume) };
        }),

      // ---- achievements (plain strings, like skills) ----
      addAchievement: (text) =>
        set((state) => {
          const trimmed = text.trim();
          if (!trimmed) return state;
          const resume = { ...state.resume, achievements: [...state.resume.achievements, trimmed] };
          return { resume, errors: validate(resume) };
        }),
      removeAchievement: (index) =>
        set((state) => {
          const achievements = state.resume.achievements.filter((_, i) => i !== index);
          const resume = { ...state.resume, achievements };
          return { resume, errors: validate(resume) };
        }),

      // ---- skills (plain strings) ----
      addSkill: (skill) =>
        set((state) => {
          const trimmed = skill.trim();
          if (!trimmed) return state;
          const resume = { ...state.resume, skills: [...state.resume.skills, trimmed] };
          return { resume, errors: validate(resume) };
        }),
      removeSkill: (index) =>
        set((state) => {
          const skills = state.resume.skills.filter((_, i) => i !== index);
          const resume = { ...state.resume, skills };
          return { resume, errors: validate(resume) };
        }),

      // ---- languages ----
      addLanguage: () =>
        set((state) => {
          const entry = { id: createId(), name: '', level: '' };
          const resume = { ...state.resume, languages: [...state.resume.languages, entry] };
          return { resume, errors: validate(resume) };
        }),
      updateLanguage: (id, field, value) =>
        set((state) => {
          const languages = state.resume.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l));
          const resume = { ...state.resume, languages };
          return { resume, errors: validate(resume) };
        }),
      removeLanguage: (id) =>
        set((state) => {
          const languages = state.resume.languages.filter((l) => l.id !== id);
          const resume = { ...state.resume, languages };
          return { resume, errors: validate(resume) };
        }),

      // ---- references ----
      addReference: () =>
        set((state) => {
          const entry = { id: createId(), name: '', relation: '', contact: '' };
          const resume = { ...state.resume, references: [...state.resume.references, entry] };
          return { resume, errors: validate(resume) };
        }),
      updateReference: (id, field, value) =>
        set((state) => {
          const references = state.resume.references.map((r) => (r.id === id ? { ...r, [field]: value } : r));
          const resume = { ...state.resume, references };
          return { resume, errors: validate(resume) };
        }),
      removeReference: (id) =>
        set((state) => {
          const references = state.resume.references.filter((r) => r.id !== id);
          const resume = { ...state.resume, references };
          return { resume, errors: validate(resume) };
        }),

      // ---- design ----
      setTemplate: (templateId) => set((state) => ({ resume: { ...state.resume, templateId } })),
      setTheme: (themeId) => set((state) => ({ resume: { ...state.resume, themeId } })),
      setFont: (fontId) => set((state) => ({ resume: { ...state.resume, fontId } })),

      resetResume: () => set({ resume: createBlankResume(), errors: null }),
    }),
    { name: 'vitae-resume-storage' }
  )
);
