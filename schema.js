import { z } from 'zod';

export const experienceSchema = z.object({
  id: z.string(),
  role: z.string().max(120).default(''),
  company: z.string().max(120).default(''),
  start: z.string().max(40).default(''),
  end: z.string().max(40).default(''),
  description: z.string().max(1000).default(''),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().max(120).default(''),
  degree: z.string().max(120).default(''),
  start: z.string().max(40).default(''),
  end: z.string().max(40).default(''),
});

export const coCurricularSchema = z.object({
  id: z.string(),
  title: z.string().max(120).default(''),
  role: z.string().max(120).default(''),
  years: z.string().max(60).default(''),
  description: z.string().max(500).default(''),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().max(60).default(''),
  level: z.string().max(40).default(''),
});

export const referenceSchema = z.object({
  id: z.string(),
  name: z.string().max(100).default(''),
  relation: z.string().max(100).default(''),
  contact: z.string().max(150).default(''),
});

export const personalSchema = z.object({
  fullName: z.string().max(80).default(''),
  jobTitle: z.string().max(80).default(''),
  email: z.string().email('Enter a valid email').or(z.literal('')).default(''),
  phone: z.string().max(40).default(''),
  location: z.string().max(80).default(''),
  summary: z.string().max(600).default(''),
});

export const resumeSchema = z.object({
  personal: personalSchema,
  photo: z.string().nullable().default(null),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  coCurricular: z.array(coCurricularSchema).default([]),
  achievements: z.array(z.string().max(200)).default([]),
  skills: z.array(z.string().max(40)).default([]),
  languages: z.array(languageSchema).default([]),
  references: z.array(referenceSchema).default([]),
  templateId: z.string().default('classic'),
  themeId: z.string().default('azure'),
  fontId: z.string().default('inter'),
});

export function createId() {
  return Math.random().toString(36).slice(2, 10);
}

export function createBlankResume() {
  return {
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    photo: null,
    experience: [],
    education: [],
    coCurricular: [],
    achievements: [],
    skills: [],
    languages: [],
    references: [],
    templateId: 'classic',
    themeId: 'azure',
    fontId: 'inter',
  };
}
