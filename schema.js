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
  skills: z.array(z.string().max(40)).default([]),
  templateId: z.string().default('classic'),
  themeId: z.string().default('azure'),
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
    skills: [],
    templateId: 'classic',
    themeId: 'azure',
  };
}
