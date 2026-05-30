import { COUNTER_API_URL, COUNTER_ENABLED, COUNTER_KEY } from './site-config';

let visitCounterPromise = null;

export function buildVisitCounterUrl(origin = 'https://notes.zaynjarvis.com') {
  const url = new URL(COUNTER_API_URL, origin);
  url.searchParams.set('key', COUNTER_KEY);
  return url.toString();
}

export function incrementVisitCounter() {
  if (!COUNTER_ENABLED || !COUNTER_API_URL || !COUNTER_KEY || typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (!visitCounterPromise) {
    visitCounterPromise = fetch(buildVisitCounterUrl(window.location.origin), {
      method: 'POST',
      cache: 'no-store',
      keepalive: true,
    }).then(async (response) => {
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || 'Counter request failed.');
      }
      return payload;
    });
  }

  return visitCounterPromise;
}
