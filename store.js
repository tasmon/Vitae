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

      setTemplate: (templateId) => set((state) => ({ resume: { ...state.resume, templateId } })),
      setTheme: (themeId) => set((state) => ({ resume: { ...state.resume, themeId } })),
      resetResume: () => set({ resume: createBlankResume(), errors: null }),
    }),
    { name: 'vitae-resume-storage' }
  )
);
