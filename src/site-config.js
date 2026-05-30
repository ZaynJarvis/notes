const DEFAULT_SITE_URL = 'https://notes.zaynjarvis.com';
const DEFAULT_COUNTER_API_URL = 'https://cloud.zaynjarvis.com/counter/api';

export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
export const COUNTER_API_URL = (import.meta.env.VITE_COUNTER_API_URL || DEFAULT_COUNTER_API_URL).trim();
export const COUNTER_KEY = (import.meta.env.VITE_COUNTER_KEY || 'zayn_key').trim();
export const COUNTER_ENABLED = !['0', 'false', 'no', 'off'].includes(
  String(import.meta.env.VITE_COUNTER_ENABLED ?? 'true').trim().toLowerCase()
);
