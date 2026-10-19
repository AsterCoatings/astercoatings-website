import { z } from 'zod';

/** Shared by client and server. Keep messages human: they are shown next to fields. */

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const required = (label: string, max = 200) => trimmed(max).min(1, `${label} is required.`);
const email = z.string().trim().toLowerCase().email('Enter a valid email address.').max(254);
const phone = trimmed(40).optional().or(z.literal(''));

export const inquiryTypes = ['quote', 'sample', 'technical', 'contact'] as const;
export type InquiryType = (typeof inquiryTypes)[number];

const base = {
  name: required('Your name', 120),
  company: required('Company', 160),
  email,
  phone,
  message: trimmed(4000).optional().or(z.literal('')),
  consent: z.literal('on', { error: 'Please confirm you have read the privacy policy.' }),
  // Anti-abuse (hidden fields)
  website: z.string().max(200).optional().or(z.literal('')), // honeypot: any content means a bot
  ts: z.coerce.number().int().positive(), // page load timestamp (ms)
  // Attribution (hidden, optional)
  productId: trimmed(80).optional().or(z.literal('')),
  landingPage: trimmed(500).optional().or(z.literal('')),
  referrer: trimmed(500).optional().or(z.literal('')),
  utm: trimmed(500).optional().or(z.literal('')),
};

export const substrateValues = [
  'cold-rolled-steel',
  'hot-rolled-steel',
  'galvanized-steel',
  'aluminum',
  'other',
  '',
] as const;
export const methodValues = [
  'conventional-spray',
  'airless-spray',
  'electrostatic',
  'dip-and-flow',
  'brush-and-roll',
  'other',
  '',
] as const;
export const volumeValues = ['under-50', '50-250', '250-1000', 'over-1000', 'unknown', ''] as const;
export const timelineValues = ['immediate', '1-3-months', '3-6-months', 'planning', ''] as const;
export const sampleSizeValues = ['quart', 'gallon', 'unknown', ''] as const;

export const quoteSchema = z.object({
  ...base,
  productInterest: trimmed(200).optional().or(z.literal('')),
  application: required('Part or application', 1000),
  substrate: z.enum(substrateValues).optional(),
  substrateOther: trimmed(120).optional().or(z.literal('')),
  method: z.enum(methodValues).optional(),
  volume: z.enum(volumeValues).optional(),
  timeline: z.enum(timelineValues).optional(),
  location: trimmed(120).optional().or(z.literal('')),
});

export const sampleSchema = z.object({
  ...base,
  productInterest: required('Product', 200),
  application: required('Intended use', 1000),
  sampleSize: z.enum(sampleSizeValues).optional(),
  currentCoating: trimmed(200).optional().or(z.literal('')),
});

export const technicalSchema = z.object({
  ...base,
  productInterest: trimmed(200).optional().or(z.literal('')),
  question: required('Your question', 4000),
});

export const contactSchema = z.object({
  ...base,
  subject: required('Subject', 160),
  message: required('Message', 4000),
});

export const schemas = {
  quote: quoteSchema,
  sample: sampleSchema,
  technical: technicalSchema,
  contact: contactSchema,
} as const;

export type QuoteInput = z.infer<typeof quoteSchema>;
export type SampleInput = z.infer<typeof sampleSchema>;
export type TechnicalInput = z.infer<typeof technicalSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type InquiryInput = QuoteInput | SampleInput | TechnicalInput | ContactInput;

/** Flattens Zod issues to { fieldName: message }. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '_form');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export const volumeLabels: Record<string, string> = {
  'under-50': 'Under 50 gal / year',
  '50-250': '50–250 gal / year',
  '250-1000': '250–1,000 gal / year',
  'over-1000': 'Over 1,000 gal / year',
  unknown: 'Not sure yet',
};
export const substrateLabels: Record<string, string> = {
  'cold-rolled-steel': 'Cold-rolled steel',
  'hot-rolled-steel': 'Hot-rolled steel',
  'galvanized-steel': 'Galvanized steel',
  aluminum: 'Aluminum',
  other: 'Other / mixed',
};
export const methodLabels: Record<string, string> = {
  'conventional-spray': 'Conventional / HVLP spray',
  'airless-spray': 'Airless spray',
  electrostatic: 'Electrostatic',
  'dip-and-flow': 'Dip or flow coat',
  'brush-and-roll': 'Brush and roll',
  other: 'Other / not sure',
};
export const sampleSizeLabels: Record<string, string> = {
  quart: 'Quart',
  gallon: 'Gallon',
  unknown: 'Let us suggest',
};
export const timelineLabels: Record<string, string> = {
  immediate: 'Immediately',
  '1-3-months': 'Within 1–3 months',
  '3-6-months': 'Within 3–6 months',
  planning: 'Planning / budgeting',
};
